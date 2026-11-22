import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

export async function GET({ url }: { url: URL }) {
    try {
        if (!supabaseAdmin) {
            console.error('API Config GET: Supabase client not initialized.');
            return new Response(JSON.stringify({ 
                error: 'Supabase client not initialized.',
                details: 'Connection parameters missing or invalid.'
            }), { status: 503, headers: { 'Content-Type': 'application/json' } });
        }

        const key = url.searchParams.get('key') || 'primary_settings';

        const { data, error } = await supabaseAdmin
            .from('site_config')
            .select('data')
            .eq('key', key)
            .maybeSingle();

        if (error) {
            console.error(`API Config GET [${key}] Error:`, error);
            return new Response(JSON.stringify({ error: 'Database query failed', message: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(data?.data || {}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e: any) {
        console.error('API Config GET Critical Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            console.error('API Config POST: Supabase client not initialized.');
            return new Response(JSON.stringify({
                error: 'Supabase client not initialized.'
            }), { status: 503, headers: { 'Content-Type': 'application/json' } });
        }
        const body = await request.json();
        const key = typeof body.key === 'string' && body.key.trim() ? body.key.trim() : 'primary_settings';
        const data = body.key ? body.value : body;

        const { error } = await supabaseAdmin
            .from('site_config')
            .upsert(
                { key, data, updated_at: new Date().toISOString() },
                { onConflict: 'key' }
            );

        if (error) {
            console.error(`API Config POST [${key}] Save Error:`, error);
            return new Response(JSON.stringify({ error: 'Database save failed', message: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e: any) {
        console.error('API Config POST Critical Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
