import { supabaseAdmin } from '../../lib/supabase';
import { RedirectSchema, isSafeExternalUrl } from '../../lib/schemas';
import { getEnv } from '../../lib/env';
import dns from 'node:dns/promises';

export const prerender = false;

function isValidHttpUrl(rawUrl: string): boolean {
    return isSafeExternalUrl(rawUrl);
}

export async function GET() {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({
                error: 'Supabase client not initialized.'
            }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
        const { data, error } = await supabaseAdmin
            .from('redirects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e: any) {
        console.error('API Redirects GET Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase client not initialized.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const body = await request.json().catch(() => ({}));
        const parsed = RedirectSchema.safeParse(body);

        if (!parsed.success) {
            const firstErr = parsed.error.issues[0]?.message || 'Invalid redirect request payload';
            return new Response(JSON.stringify({ error: firstErr, details: parsed.error.issues }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { id, fqdn, target_url } = parsed.data;

        // ─── DNS VALIDATION ───
        const expectedIp = getEnv('REDIRECT_PROXY_IP') || '18.133.72.105';
        let resolvedIps: string[] = [];
        let dnsDiagnostics: any = null;

        try {
            resolvedIps = await dns.resolve4(fqdn);
            if (!resolvedIps.includes(expectedIp)) {
                throw new Error('IP mismatch');
            }
        } catch {
            try {
                dnsDiagnostics = await dns.resolveAny(fqdn).catch(() => []);
            } catch {
                dnsDiagnostics = [];
            }

            return new Response(JSON.stringify({
                error: 'DNS_VALIDATION_FAILED',
                message: `DNS failure for ${fqdn}, the A record does not resolve to ${expectedIp}`,
                fqdn,
                expected: expectedIp,
                found: resolvedIps,
                diagnostics: dnsDiagnostics
            }), { status: 422, headers: { 'Content-Type': 'application/json' } });
        }

        const payload: Record<string, any> = {
            fqdn,
            target_url,
            updated_at: new Date().toISOString()
        };
        if (id) payload.id = id;

        const { error } = await supabaseAdmin
            .from('redirects')
            .upsert(payload, { onConflict: 'fqdn' });

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e: any) {
        console.error('API Redirects POST Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export async function DELETE({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase client not initialized.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const url = new URL(request.url);
        const fqdn = url.searchParams.get('fqdn');
        const id = url.searchParams.get('id');

        if (!fqdn && !id) {
            return new Response(JSON.stringify({ error: 'Missing fqdn or id parameter' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        let query = supabaseAdmin.from('redirects').delete();
        if (id) {
            query = query.eq('id', id);
        } else if (fqdn) {
            query = query.eq('fqdn', fqdn);
        }

        const { error } = await query;
        if (error) throw error;

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e: any) {
        console.error('API Redirects DELETE Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
