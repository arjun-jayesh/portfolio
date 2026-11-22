import { supabaseAdmin } from '../../lib/supabase';
import dns from 'node:dns/promises';

export const prerender = false;

const FQDN_REGEX = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63})+$/;

function isValidHttpUrl(rawUrl: string): boolean {
    try {
        const parsed = new URL(rawUrl);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
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
        const { id, fqdn: rawFqdn, target_url: rawTargetUrl } = await request.json();

        const fqdn = typeof rawFqdn === 'string' ? rawFqdn.trim().toLowerCase() : '';
        const target_url = typeof rawTargetUrl === 'string' ? rawTargetUrl.trim() : '';

        if (!fqdn || !target_url) {
            return new Response(JSON.stringify({ error: 'Missing fqdn or target_url' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!FQDN_REGEX.test(fqdn)) {
            return new Response(JSON.stringify({ error: 'Invalid FQDN hostname format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!isValidHttpUrl(target_url)) {
            return new Response(JSON.stringify({ error: 'target_url must be a valid http:// or https:// URL' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // ─── DNS VALIDATION ───
        const expectedIp = '18.133.72.105';
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
