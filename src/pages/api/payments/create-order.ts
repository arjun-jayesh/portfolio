export const prerender = false;

import { supabaseAdmin } from '../../../lib/supabase';
import { PaymentOrderSchema, CANONICAL_SERVICES } from '../../../lib/schemas';
import { getEnv } from '../../../lib/env';

export async function POST({ request }: { request: Request }) {
    try {
        const keyId = getEnv('RAZORPAY_KEY_ID');
        const keySecret = getEnv('RAZORPAY_KEY_SECRET');

        if (!keyId || !keySecret) {
            return new Response(JSON.stringify({
                error: 'Razorpay payment gateway not configured.',
                fallback_url: 'https://razorpay.me/@kinbotechnologies'
            }), { status: 503, headers: { 'Content-Type': 'application/json' } });
        }

        const rawBody = await request.json().catch(() => ({}));
        const parsed = PaymentOrderSchema.safeParse(rawBody);

        if (!parsed.success) {
            const firstErr = parsed.error.issues[0]?.message || 'Invalid payment order request';
            return new Response(JSON.stringify({ error: firstErr, details: parsed.error.issues }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { amount, currency, service_name, customer } = parsed.data;

        // Server-side price canonicalization & anti-tampering
        let canonicalAmount = amount;
        if (CANONICAL_SERVICES[service_name]) {
            const minExpected = CANONICAL_SERVICES[service_name];
            if (amount < minExpected) {
                return new Response(JSON.stringify({
                    error: `Tampered amount detected. Base price for "${service_name}" is ₹${minExpected.toLocaleString('en-IN')}.`
                }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }
            canonicalAmount = amount;
        }

        const amountInPaise = Math.round(canonicalAmount * 100);
        const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
        const idempotencyKey = `kinbo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

        const orderRes = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
            },
            body: JSON.stringify({
                amount: amountInPaise,
                currency,
                receipt: idempotencyKey,
                notes: {
                    service: service_name.slice(0, 100),
                    customer_name: (customer?.name || '').slice(0, 100),
                    customer_email: (customer?.email || '').slice(0, 150),
                    customer_phone: (customer?.phone || '').slice(0, 30),
                    customer_org: (customer?.org || '').slice(0, 150),
                }
            })
        });

        if (!orderRes.ok) {
            const errData = await orderRes.json().catch(() => ({}));
            console.error('Razorpay Order Creation Error:', errData);
            return new Response(JSON.stringify({
                error: 'Failed to create payment order with provider'
            }), { status: 502, headers: { 'Content-Type': 'application/json' } });
        }

        const orderData = await orderRes.json();

        // Persist authoritative order record in Supabase immediately
        if (supabaseAdmin) {
            try {
                await supabaseAdmin.from('payments').insert({
                    razorpay_order_id: orderData.id,
                    amount: orderData.amount,
                    currency: orderData.currency,
                    service_name,
                    customer_name: customer?.name || null,
                    customer_email: customer?.email || null,
                    customer_phone: customer?.phone || null,
                    customer_org: customer?.org || null,
                    status: 'created',
                    verified: false,
                    metadata: { idempotency_key: idempotencyKey }
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
        return new Response(JSON.stringify({ error: 'Internal server error processing payment order' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
