import { supabaseAdmin } from '../../lib/supabase';
import { IdeaSubmissionSchema, verifyTurnstileToken } from '../../lib/schemas';
import { getEnv } from '../../lib/env';

export const prerender = false;

export async function GET() {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), { status: 500 });
        }
        const { data, error } = await supabaseAdmin
            .from('ideas')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (e: any) {
        console.error('API Ideas GET Error:', e);
        return new Response(JSON.stringify({ error: 'Failed to retrieve ideas' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
        const body = await request.json().catch(() => ({}));
        const parsed = IdeaSubmissionSchema.safeParse(body);

        if (!parsed.success) {
            const firstErr = parsed.error.issues[0]?.message || 'Invalid form input';
            return new Response(JSON.stringify({ error: firstErr, details: parsed.error.issues }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const data = parsed.data;

        // Verify Cloudflare Turnstile token if configured
        const turnstileSecret = getEnv('TURNSTILE_SECRET_KEY');
        const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || undefined;
        const isBotCheckPassed = await verifyTurnstileToken(data.cf_turnstile_response, turnstileSecret, clientIp);

        if (!isBotCheckPassed) {
            return new Response(JSON.stringify({ error: 'Security verification failed. Please refresh and try again.' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { error } = await supabaseAdmin
            .from('ideas')
            .insert({
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                project_type: data.project_type,
                budget: data.budget || null,
                timeline: data.timeline || null,
                idea_title: data.idea_title,
                idea_description: data.idea_description,
                target_audience: data.target_audience || null,
                features: data.features || null,
                portfolio_url: data.portfolio_url || null,
                linkedin: data.linkedin || null,
                additional_notes: data.additional_notes || null,
                status: 'new'
            });

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (e: any) {
        console.error('API Ideas POST Error:', e);
        return new Response(JSON.stringify({ error: 'Failed to submit proposal. Please try again.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export async function DELETE({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), { status: 500 });
        }
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) return new Response('Missing id', { status: 400 });

        const { error } = await supabaseAdmin
            .from('ideas')
            .delete()
            .eq('id', parseInt(id));

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Ideas DELETE Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
