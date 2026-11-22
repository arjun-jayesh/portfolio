import { supabaseAdmin } from '../../lib/supabase';
import { verifyTurnstileToken } from '../../lib/schemas';
import { getEnv } from '../../lib/env';

export const prerender = false;

export async function GET() {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const { data, error } = await supabaseAdmin
            .from('service_leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e: any) {
        console.error('API Leads GET Error:', e);
        return new Response(JSON.stringify({ error: 'Failed to retrieve leads' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const body = await request.json().catch(() => ({}));

        // Support both direct inquiry and standard service lead
        const form_type = String(body.form_type || 'Direct-to-Engineer Brief').slice(0, 100);
        const name = String(body.name || '').trim().slice(0, 100);
        const contact = String(body.contact || body.email || body.phone || '').trim().slice(0, 150);
        const isEmail = contact.includes('@');
        const email = isEmail ? contact : String(body.email || `${contact.replace(/[^0-9]/g, '') || 'lead'}@direct.kinbosoft.com`).slice(0, 150);
        const phone = !isEmail ? contact : (body.phone ? String(body.phone).slice(0, 30) : null);

        if (!name || name.length < 2 || (!contact && !body.email && !body.phone)) {
            return new Response(JSON.stringify({ error: 'Name (min 2 chars) and contact info are required.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Verify Turnstile bot token if supplied
        const turnstileSecret = getEnv('TURNSTILE_SECRET_KEY');
        const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || undefined;
        const isBotCheckPassed = await verifyTurnstileToken(body.cf_turnstile_response, turnstileSecret, clientIp);
        if (!isBotCheckPassed) {
            return new Response(JSON.stringify({ error: 'Security verification failed.' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const metadata = {
            goal: String(body.goal || body.project_goal || '').slice(0, 1000),
            stack: String(body.stack || '').slice(0, 500),
            source: String(body.source || 'kinbosoft-direct-modal').slice(0, 100),
            raw_contact: contact,
            ...(body.metadata || {})
        };

        const { error } = await supabaseAdmin
            .from('service_leads')
            .insert({
                form_type,
                name,
                email,
                phone,
                organization: body.organization ? String(body.organization).slice(0, 150) : null,
                metadata,
                status: 'new'
            });

        if (error) throw error;
        return new Response(JSON.stringify({ success: true, message: 'Inquiry registered.' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e: any) {
        console.error('API Leads POST Error:', e);
        return new Response(JSON.stringify({ error: 'Failed to record brief' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
