import { supabaseAdmin } from '../../lib/supabase';

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
        return new Response(JSON.stringify({ error: e.message }), {
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
        const body = await request.json();

        // Support both direct inquiry and standard service lead
        const form_type = body.form_type || 'Direct-to-Engineer Brief';
        const name = (body.name || '').trim();
        const contact = (body.contact || body.email || body.phone || '').trim();
        const isEmail = contact.includes('@');
        const email = isEmail ? contact : (body.email || `${contact.replace(/[^0-9]/g, '') || 'lead'}@direct.kinbosoft.com`);
        const phone = !isEmail ? contact : (body.phone || null);

        if (!name || (!contact && !body.email && !body.phone)) {
            return new Response(JSON.stringify({ error: 'Name and contact information are required.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const metadata = {
            goal: body.goal || body.project_goal || '',
            stack: body.stack || '',
            source: body.source || 'kinbosoft-direct-modal',
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
                organization: body.organization || null,
                metadata,
                status: 'new'
            });

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e: any) {
        console.error('API Leads POST Error:', e);
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
