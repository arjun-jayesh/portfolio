// src/lib/auth.ts
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getEnv(key: string): string {
    return import.meta.env[key] || (typeof process !== 'undefined' ? process.env[key] || '' : '');
}

function getSigningSecret(): string {
    const adminPass = getEnv('ADMIN_PASSWORD') || 'local';
    const serviceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY') || 'kinbo_default_salt_2026';
    return `${adminPass}::${serviceKey}`;
}

export async function hmacSignHex(secret: string, message: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
    return Array.from(new Uint8Array(sig))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

export function timingSafeEqualHex(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
        diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diff === 0;
}

export async function createAdminSessionToken(): Promise<string> {
    const issuedAt = Date.now().toString();
    const payload = `admin.${issuedAt}`;
    const signature = await hmacSignHex(getSigningSecret(), payload);
    return `${payload}.${signature}`;
}

export async function verifyAdminSessionToken(token: string | undefined): Promise<boolean> {
    if (!token) return false;
    const parts = token.split('.');
    if (parts.length !== 3 || parts[0] !== 'admin') return false;

    const issuedAt = Number(parts[1]);
    const providedSig = parts[2];
    if (!Number.isFinite(issuedAt)) return false;

    const now = Date.now();
    if (now - issuedAt > SESSION_TTL_MS || issuedAt > now + 60_000) {
        return false;
    }

    const expectedSig = await hmacSignHex(getSigningSecret(), `admin.${parts[1]}`);
    return timingSafeEqualHex(expectedSig, providedSig);
}

