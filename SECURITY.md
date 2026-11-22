# Security Policy & Hardening Standard

**Project**: KINBO TECHNOLOGIES PRIVATE LIMITED (`kinbosoft.com`)  
**Status**: Production / Enterprise Hardened  
**Last Updated**: November 2026

---

## 1. Reporting a Vulnerability

KINBO takes the security of its infrastructure, clients, and user data seriously. If you discover a security vulnerability, we appreciate your cooperation in disclosing it to us responsibly.

- **Primary Contact**: `security@kinbosoft.com` / `contact@kinbosoft.com`
- **Response Time**: We acknowledge receipt of vulnerability reports within 24 hours and aim to provide a remediation timeline within 72 hours.
- **Scope**: Production website (`https://kinbosoft.com`), public API routes (`/api/*`), and administrative controls.
- **Safe Harbor**: We will not pursue legal action against security researchers who:
 - Perform testing within the scope of this policy.
 - Avoid accessing, modifying, or destroying user data.
 - Do not execute Denial of Service (DoS/DDoS) attacks or automated brute-force flooding.
 - Give us reasonable time to resolve the issue before public disclosure.

---

## 2. Security Architecture & Threat Model

### A. Authentication & Session Security (OWASP ASVS Level 2)
- **Zero Plaintext Comparisons**: Admin password verification uses Web Crypto HMAC-SHA256 constant-time comparison.
- **Brute-Force & Lockout Protection**: In-memory and distributed lockout tracking triggers after 5 consecutive failed attempts per IP with an exponential 15-minute lockout window.
- **Cryptographic Session Tokens**: Admin authentication issues ephemeral HMAC-signed session tokens verified on every admin-only API mutation (`/api/upload`, `/api/redirects`, etc.).
- **Strict Cookie Flags**: Cookies are marked `HttpOnly; Secure; SameSite=Strict; Path=/`.
- **Anti-CSRF Double-Submit Protection**: State-changing endpoints validate cryptographically random Anti-CSRF tokens alongside Origin and Referer headers.

### B. Payment Infrastructure & Razorpay Verification
- **Server-Side Price Canonicalization**: Client-supplied prices or currency amounts are never trusted. All product and service tier prices are resolved from a server-side immutable price registry (`CANONICAL_SERVICES`).
- **Webhook HMAC-SHA256 Signatures**: All payment events (`payment.captured`, `order.paid`, `payment.failed`) are verified against the Razorpay webhook signing secret via Web Crypto HMAC-SHA256 prior to updating database records.
- **Deterministic Idempotency**: Order creation and webhook callbacks enforce receipt idempotency keys to prevent duplicate transactions.

### C. Server-Side Request Forgery (SSRF) & Redirect Guardrails
- **Target URL Whitelisting**: The `/api/redirects` proxy service validates all target URLs with `isSafeExternalUrl()`:
 - Strictly restricts protocols to `https:` and `http:`.
 - Rejects all private IP ranges (RFC 1918: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`).
 - Rejects link-local and loopback addresses (`127.0.0.0/8`, `169.254.0.0/16`, `::1`).
 - Rejects AWS EC2 and cloud metadata endpoints (`169.254.169.254`).
- **Configurable Proxy Target**: Custom vanity domain redirection proxy IP is strictly configured via `REDIRECT_PROXY_IP` (AWS EC2 ingress proxy: `18.133.72.105`).

### D. File Upload & Storage Isolation
- **No Unsigned Public Presets**: Unsigned media presets are prohibited. Media uploads via `/api/upload` require an active, validated admin session token.
- **Server-Side Signature Generation**: Direct uploads use signed parameters with Cloudinary API keys and SHA-1/SHA-256 signatures generated exclusively on the server.
- **Strict MIME & Size Gates**: File size is capped at 15MB with an explicit whitelist of image formats (`image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`, `image/gif`).

### E. Public Lead Ingestion & Abuse Prevention
- **Cloudflare Turnstile Verification**: Public lead generation and RFP endpoints (`/api/ideas`, `/api/service-leads`, `/api/leads`) verify Cloudflare Turnstile CAPTCHA tokens prior to DB writes.
- **Zod Schema Validation**: All incoming request bodies are validated against strict Zod schemas (`IdeaSubmissionSchema`, `ServiceLeadSchema`, etc.).
- **Sanitized Error Responses**: Database internal schemas, table names, and stack traces are stripped; client responses return sanitized error codes.

### F. HTTP Security Headers
The following headers are enforced on all responses via `src/middleware.ts`:
- `Content-Security-Policy`: Disallows `'unsafe-eval'`, restricts script and frame sources to verified domains (Cloudflare Turnstile, Razorpay, Cloudinary, YouTube, Vercel).
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options`: `nosniff`
- `X-Frame-Options`: `SAMEORIGIN`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=(), browsing-topics=()`

---

## 3. Production Secret Rotation Runbook

If any production credential (Razorpay Key, Supabase Key, Google OAuth, Cloudinary Secret) is exposed in public repositories or client-side bundles:

1. **Immediate Revocation**:
 - **Razorpay**: Regenerate API Secret in the Razorpay Dashboard (Settings -> API Keys).
 - **Supabase**: Rotate `anon` and `service_role` keys in Supabase Settings -> API.
 - **Cloudinary**: Reset API Secret in Cloudinary Dashboard -> Settings -> Access Keys.
 - **Google Console**: Revoke compromised Client ID / Secret in Google Cloud Console Credentials.
2. **Purge Git History**:
 - Use `git-filter-repo` or BFG Repo Cleaner to purge exposed commits from the git tree:
     ```bash
     git filter-repo --invert-paths --path-match <compromised-file>
     ```
 - Force-push to all remotes: `git push origin --force --all`
3. **Environment Update**:
 - Update environment variables in Vercel Project Settings (`Settings -> Environment Variables`).
 - Trigger a clean redeployment to invalidate existing serverless container caches.
