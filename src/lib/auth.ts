// src/lib/auth.ts
import { getEnv } from './env';

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const LOCKOUT_THRESHOLD = 5; // 5 failed attempts
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

// In-memory lockout tracker (keyed by IP/identifier)
interface AttemptRecord {
  failures: number;
  lockedUntil: number;
}
const loginAttempts = new Map<string, AttemptRecord>();

export function checkLoginLockout(identifier: string): { isLocked: boolean; remainingMs: number } {
  const record = loginAttempts.get(identifier);
  if (!record) return { isLocked: false, remainingMs: 0 };
  const now = Date.now();
  if (record.lockedUntil > now) {
    return { isLocked: true, remainingMs: record.lockedUntil - now };
  }
  if (record.lockedUntil <= now && record.failures >= LOCKOUT_THRESHOLD) {
    loginAttempts.delete(identifier);
  }
  return { isLocked: false, remainingMs: 0 };
}

export function recordLoginFailure(identifier: string): void {
  const now = Date.now();
  const record = loginAttempts.get(identifier) || { failures: 0, lockedUntil: 0 };
  record.failures += 1;
  if (record.failures >= LOCKOUT_THRESHOLD) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
  }
  loginAttempts.set(identifier, record);
}

export function resetLoginLockout(identifier: string): void {
  loginAttempts.delete(identifier);
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

export async function verifyPassword(submittedPassword: string): Promise<boolean> {
  const expectedPassword = getEnv('ADMIN_PASSWORD') || 'local';
  const expectedHash = getEnv('ADMIN_PASSWORD_HASH');

  if (expectedHash) {
    const submittedHash = await hmacSignHex('kinbo_admin_hash_salt', submittedPassword);
    return timingSafeEqualHex(submittedHash, expectedHash);
  }

  // Constant-time HMAC comparison
  const [hSubmitted, hExpected] = await Promise.all([
    hmacSignHex('kinbo_login_cmp', submittedPassword),
    hmacSignHex('kinbo_login_cmp', expectedPassword),
  ]);
  return timingSafeEqualHex(hSubmitted, hExpected);
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

// ─── CSRF Protection Helpers ───
export async function createCsrfToken(sessionToken: string): Promise<string> {
  const secret = getSigningSecret();
  return hmacSignHex(secret, `csrf_${sessionToken}`);
}

export async function verifyCsrfToken(csrfToken: string | undefined, sessionToken: string | undefined): Promise<boolean> {
  if (!csrfToken || !sessionToken) return false;
  const expected = await createCsrfToken(sessionToken);
  return timingSafeEqualHex(expected, csrfToken);
}
