import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

export async function GET({ url }: { url: URL }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({
                error: 'Supabase client not initialized.',
                details: 'Check PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.'
            }), { status: 500 });
        }

        // Default to primary_settings, but allow specific key (e.g. enterprise_assets)
        const key = url.searchParams.get('key') || 'primary_settings';

        const { data, error } = await supabaseAdmin
            .from('site_config')
            .select('data')
            .eq('key', key)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'no rows found'

        return new Response(JSON.stringify(data?.data || {}), { status: 200 });
    } catch (e: any) {
        console.error('API Config GET Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message
        }), { status: 500 });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({
                error: 'Supabase client not initialized.'
            }), { status: 500 });
        }
        const body = await request.json();

        // Support saving specific keys (e.g. enterprise_assets)
        const key = body.key || 'primary_settings';
        const data = body.key ? body.value : body; // If key is provided, use .value as the data

        const { data: existing } = await supabaseAdmin
            .from('site_config')
            .select('id')
            .eq('key', key)
            .single();

        let error;
        if (existing) {
            const res = await supabaseAdmin.from('site_config').update({ data }).eq('key', key);
            error = res.error;
        } else {
            const res = await supabaseAdmin.from('site_config').insert({ key, data });
            error = res.error;
        }

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Config POST Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message
        }), { status: 500 });
    }
}
