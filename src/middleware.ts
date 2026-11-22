import { defineMiddleware } from "astro:middleware";
import { verifyAdminSessionToken } from "./lib/auth";
import { supabase } from "./lib/supabase";

// ─── Bounded In-Memory Rate Limiter ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_API = 60;       // 60 req/min for APIs
const RATE_LIMIT_MAX_LOGIN = 5;      // 5 attempts/min for admin login
const MAX_RATE_LIMIT_KEYS = 10_000;  // Hard ceiling against spoofed-IP OOM

function getClientIP(request: Request): string {
    return (
        request.headers.get("cf-connecting-ip") ||
        request.headers.get("x-real-ip") ||
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown"
    );
}

function isRateLimited(key: string, maxRequests: number): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now > entry.resetAt) {
        if (rateLimitMap.size >= MAX_RATE_LIMIT_KEYS) {
            const oldestKey = rateLimitMap.keys().next().value;
            if (oldestKey) rateLimitMap.delete(oldestKey);
        }
        rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    entry.count++;
    return entry.count > maxRequests;
}

// ─── Hostname Redirect Cache ───
const hostnameRedirectCache = new Map<string, { targetUrl: string | null; expiresAt: number }>();
const CACHE_TTL_MS = 60_000; // 1 minute

async function lookupCustomHostnameRedirect(hostname: string): Promise<string | null> {
    const normalized = hostname.toLowerCase().split(":")[0];
    if (
        normalized === "localhost" ||
        normalized === "127.0.0.1" ||
        normalized.endsWith(".vercel.app") ||
        normalized === "dear.is-a.dev" ||
        normalized === "kinbo.tech" ||
        normalized === "kinbosoft.com"
    ) {
        return null;
    }

    const cached = hostnameRedirectCache.get(normalized);
    if (cached && Date.now() < cached.expiresAt) {
        return cached.targetUrl;
    }

    if (!supabase) return null;

    try {
        const { data } = await supabase
            .from("redirects")
            .select("target_url")
            .eq("fqdn", normalized)
            .maybeSingle();

        const target = data?.target_url || null;
        hostnameRedirectCache.set(normalized, {
            targetUrl: target,
            expiresAt: Date.now() + CACHE_TTL_MS
        });
        return target;
    } catch {
        return null;
    }
}

// ─── Security Headers ───
const SECURITY_HEADERS: Record<string, string> = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(self)",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' https://va.vercel-scripts.com 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://checkout.razorpay.com https://apis.google.com https://*.firebaseapp.com https://*.googleapis.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
        "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
        "img-src 'self' data: blob: https: http:",
        "media-src 'self' https: blob:",
        "connect-src 'self' https://vitals.vercel-insights.com https://*.supabase.co https://api.cloudinary.com https://wa.me https://www.google-analytics.com https://lumberjack.razorpay.com https://api.razorpay.com https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://firebaseinstalls.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com",
        "frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com https://*.firebaseapp.com https://accounts.google.com https://*.googleapis.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
    ].join("; "),
};

const PUBLIC_PAYMENT_ROUTES = new Set([
    "/api/payments/create-order",
    "/api/payments/verify-payment",
    "/api/payments/create-lead",
]);

const ADMIN_PROTECTED_ROUTES = [
    { path: "/api/config", methods: ["POST", "PUT", "DELETE"] },
    { path: "/api/upload", methods: ["POST", "DELETE"] },
    { path: "/api/redirects", methods: ["GET", "POST", "DELETE"] },
    { path: "/api/blog", methods: ["POST", "PUT", "DELETE"] },
    { path: "/api/products", methods: ["POST", "PUT", "DELETE"] },
    { path: "/api/showcase", methods: ["POST", "PUT", "DELETE"] },
    { path: "/api/ideas", methods: ["GET", "DELETE", "PATCH"] },
    { path: "/api/service-leads", methods: ["GET", "DELETE", "PATCH"] },
    { path: "/api/leads", methods: ["GET", "DELETE", "PATCH"] },
    { path: "/api/google/search-console", methods: ["GET", "POST"] },
    { path: "/api/payments", methods: ["GET", "POST", "DELETE", "PUT", "PATCH"] },
];

function normalizePath(pathname: string): string {
    return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

function requiresAdminAuth(rawPathname: string, method: string): boolean {
    const pathname = normalizePath(rawPathname);
    const upperMethod = method.toUpperCase();

    if (PUBLIC_PAYMENT_ROUTES.has(pathname) && upperMethod === "POST") {
        return false;
    }

    return ADMIN_PROTECTED_ROUTES.some(
        (route) =>
            (pathname === route.path || pathname.startsWith(`${route.path}/`)) &&
            route.methods.includes(upperMethod)
    );
}

export const onRequest = defineMiddleware(async ({ request, cookies, url }, next) => {
    // ─── Custom Hostname Dynamic Redirect ───
    const redirectTarget = await lookupCustomHostnameRedirect(url.hostname);
    if (redirectTarget) {
        return Response.redirect(redirectTarget, 301);
    }

    const pathname = normalizePath(url.pathname);
    const method = request.method.toUpperCase();
    const clientIP = getClientIP(request);

    // ─── Rate Limiting ───
    if (pathname.startsWith("/api/")) {
        const rateLimitKey = `api:${clientIP}`;
        if (isRateLimited(rateLimitKey, RATE_LIMIT_MAX_API)) {
            return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
                status: 429,
                headers: { "Content-Type": "application/json", "Retry-After": "60" },
            });
        }
    }

    // Admin login rate limiting
    if (pathname === "/admin" && method === "POST") {
        const loginKey = `login:${clientIP}`;
        if (isRateLimited(loginKey, RATE_LIMIT_MAX_LOGIN)) {
            return new Response("Too many login attempts. Please wait 1 minute.", {
                status: 429,
                headers: { "Retry-After": "60" },
            });
        }
    }

    // ─── Admin Auth Guard for Protected API Routes ───
    if (requiresAdminAuth(pathname, method)) {
        const adminSessionToken = cookies.get("admin_session")?.value;
        const isValidAdmin = await verifyAdminSessionToken(adminSessionToken);
        if (!isValidAdmin) {
            return new Response(JSON.stringify({ error: "Unauthorized. Valid admin session required." }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }
    }

    // ─── Honeypot Check for Public Form Submissions ───
    if (method === "POST" && (pathname === "/api/ideas" || pathname === "/api/service-leads" || pathname === "/api/leads")) {
        try {
            const clonedRequest = request.clone();
            const body = await clonedRequest.json();
            if (body && typeof body._hp_company === "string" && body._hp_company.trim() !== "") {
                return new Response(JSON.stringify({ success: true }), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                });
            }
        } catch {
            // Let downstream route handler return 400 on malformed JSON
        }
    }

    // ─── Proceed to route handler ───
    const response = await next();

    // ─── Inject Security Headers ───
    const newResponse = new Response(response.body, response);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
        newResponse.headers.set(key, value);
    }

    const contentType = newResponse.headers.get("content-type");
    if (contentType && contentType.includes("text/html") && !contentType.includes("charset")) {
        newResponse.headers.set("content-type", `${contentType}; charset=utf-8`);
    }

    return newResponse;
});
