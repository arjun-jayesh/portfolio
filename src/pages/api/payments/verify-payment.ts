export const prerender = false;

import { supabaseAdmin } from '../../../lib/supabase';
import { hmacSignHex, timingSafeEqualHex } from '../../../lib/auth';

const getEnv = (key: string) => {
    return import.meta.env[key] || (typeof process !== 'undefined' ? process.env[key] : '');
};

export async function POST({ request }: { request: Request }) {
    try {
        const keySecret = getEnv('RAZORPAY_KEY_SECRET');

        if (!keySecret) {
            return new Response(JSON.stringify({ error: 'Razorpay secret not configured.' }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, service_name, customer } = body;

        if (
            typeof razorpay_order_id !== 'string' ||
            typeof razorpay_payment_id !== 'string' ||
            typeof razorpay_signature !== 'string' ||
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return new Response(JSON.stringify({ error: 'Missing payment verification fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = await hmacSignHex(keySecret, payload);

        const verified = timingSafeEqualHex(expectedSignature, razorpay_signature.toLowerCase());

        if (!verified) {
            console.error('Payment signature verification failed:', {
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id
            });
            return new Response(JSON.stringify({
                verified: false,
                error: 'Signature verification failed'
            }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        if (supabaseAdmin) {
            try {
                const { data: existingOrder } = await supabaseAdmin
                    .from('payments')
                    .select('id, amount, currency')
                    .eq('razorpay_order_id', razorpay_order_id)
                    .maybeSingle();

                if (existingOrder) {
                    await supabaseAdmin
                        .from('payments')
                        .update({
                            razorpay_payment_id,
                            razorpay_signature,
                            status: 'paid',
                            verified: true,
                            updated_at: new Date().toISOString()
                        })
                        .eq('id', existingOrder.id);
                } else {
                    await supabaseAdmin.from('payments').insert({
                        razorpay_order_id,
                        razorpay_payment_id,
                        razorpay_signature,
                        service_name: service_name || 'unknown',
                        customer_name: customer?.name || null,
                        customer_email: customer?.email || null,
                        customer_phone: customer?.phone || null,
                        customer_org: customer?.org || null,
                        status: 'paid',
                        verified: true,
                        amount: Number(customer?.amount) || 0,
                        currency: customer?.currency || 'INR',
                        updated_at: new Date().toISOString()
                    });
                }
            } catch (dbErr) {
                console.error('Payment DB update error (non-fatal):', dbErr);
            }
        }

        return new Response(JSON.stringify({
            verified: true,
            payment_id: razorpay_payment_id
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (e: any) {
        console.error('Verify Payment API Error:', e);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
