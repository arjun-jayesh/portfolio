export const prerender = false;

import { supabaseAdmin } from '../../../lib/supabase';
import { hmacSignHex, timingSafeEqualHex } from '../../../lib/auth';
import { getEnv } from '../../../lib/env';

export async function POST({ request }: { request: Request }) {
    try {
        const webhookSecret = getEnv('RAZORPAY_WEBHOOK_SECRET') || getEnv('RAZORPAY_KEY_SECRET');
        const signature = request.headers.get('x-razorpay-signature');

        if (!webhookSecret || !signature) {
            return new Response(JSON.stringify({ error: 'Webhook signature or secret missing' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const rawBody = await request.text();

        // Constant-time HMAC-SHA256 validation of the raw webhook payload
        const expectedSignature = await hmacSignHex(webhookSecret, rawBody);
        const isValid = timingSafeEqualHex(expectedSignature.toLowerCase(), signature.toLowerCase());

        if (!isValid) {
            console.error('Razorpay Webhook: Invalid signature');
            return new Response(JSON.stringify({ error: 'Signature verification failed' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const event = JSON.parse(rawBody);
        const eventType = event.event;
        const payload = event.payload;

        if (eventType === 'payment.captured' || eventType === 'order.paid') {
            const paymentEntity = payload.payment?.entity;
            const orderId = paymentEntity?.order_id || payload.order?.entity?.id;
            const paymentId = paymentEntity?.id;

            if (supabaseAdmin && orderId) {
                // Idempotent update: set status to paid
                await supabaseAdmin
                    .from('payments')
                    .update({
                        razorpay_payment_id: paymentId,
                        status: 'paid',
                        verified: true,
                        updated_at: new Date().toISOString()
                    })
                    .eq('razorpay_order_id', orderId);
            }
        } else if (eventType === 'payment.failed') {
            const paymentEntity = payload.payment?.entity;
            const orderId = paymentEntity?.order_id;
            const paymentId = paymentEntity?.id;

            if (supabaseAdmin && orderId) {
                await supabaseAdmin
                    .from('payments')
                    .update({
                        razorpay_payment_id: paymentId,
                        status: 'failed',
                        updated_at: new Date().toISOString()
                    })
                    .eq('razorpay_order_id', orderId);
            }
        }

        return new Response(JSON.stringify({ status: 'ok', received: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e: any) {
        console.error('Razorpay Webhook Error:', e);
        return new Response(JSON.stringify({ error: 'Internal server error processing webhook' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
