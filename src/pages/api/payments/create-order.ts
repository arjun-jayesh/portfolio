export const prerender = false;

import { supabaseAdmin } from '../../../lib/supabase';

const getEnv = (key: string) => {
    return import.meta.env[key] || (typeof process !== 'undefined' ? process.env[key] : '');
};

export async function POST({ request }: { request: Request }) {
    try {
        const keyId = getEnv('RAZORPAY_KEY_ID');
        const keySecret = getEnv('RAZORPAY_KEY_SECRET');

        if (!keyId || !keySecret) {
            return new Response(JSON.stringify({
                error: 'Razorpay credentials not configured.',
                fallback_url: 'https://razorpay.me/@kinbotechnologies'
            }), { status: 503, headers: { 'Content-Type': 'application/json' } });
        }

        const body = await request.json();
        const { amount, currency = 'INR', service_name, customer } = body;

        const parsedAmount = Number(amount);
        if (!Number.isFinite(parsedAmount) || parsedAmount < 1 || parsedAmount > 10_000_000 || !service_name) {
            return new Response(JSON.stringify({
                error: 'Invalid amount (must be between 1 and 10,000,000) or missing service_name'
            }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const amountInPaise = Math.round(parsedAmount * 100);
        const safeCurrency = typeof currency === 'string' && /^[A-Z]{3}$/.test(currency) ? currency : 'INR';
        const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');

        const orderRes = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
            },
            body: JSON.stringify({
                amount: amountInPaise,
                currency: safeCurrency,
                receipt: `kinbo_${String(service_name).slice(0, 20)}_${Date.now()}`,
                notes: {
                    service: String(service_name).slice(0, 100),
                    customer_name: customer?.name || '',
                    customer_email: customer?.email || '',
                    customer_phone: customer?.phone || '',
                    customer_org: customer?.org || '',
                }
            })
        });

        if (!orderRes.ok) {
            const errData = await orderRes.json().catch(() => ({}));
            console.error('Razorpay Order Creation Error:', errData);
            return new Response(JSON.stringify({
                error: 'Failed to create payment order'
            }), { status: 502, headers: { 'Content-Type': 'application/json' } });
        }

        const orderData = await orderRes.json();

        // Persist the authoritative order amount in Supabase immediately
        if (supabaseAdmin) {
            try {
                await supabaseAdmin.from('payments').insert({
                    razorpay_order_id: orderData.id,
                    amount: orderData.amount,
                    currency: orderData.currency,
                    service_name: String(service_name),
                    customer_name: customer?.name || null,
                    customer_email: customer?.email || null,
                    customer_phone: customer?.phone || null,
                    customer_org: customer?.org || null,
                    status: 'created',
                    verified: false,
                });
            } catch (dbErr) {
                console.error('Initial order DB insert warning:', dbErr);
            }
        }

        return new Response(JSON.stringify({
            order_id: orderData.id,
            amount: orderData.amount,
            currency: orderData.currency,
            key_id: keyId,
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (e: any) {
        console.error('Create Order API Error:', e);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
