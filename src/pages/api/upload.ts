export const prerender = false;

import { verifyAdminSessionToken, hmacSignHex } from '../../lib/auth';
import { getEnv } from '../../lib/env';

// ─── Allowed MIME types ───
const ALLOWED_MIME_TYPES = new Set([
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/avif',
    'video/mp4', 'video/webm', 'video/quicktime',
    'application/pdf',
]);

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

function getAdminCookie(request: Request): string | undefined {
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(/admin_session=([^;]+)/);
    return match ? match[1] : undefined;
}

export async function POST({ request }: { request: Request }) {
    try {
        // Strict Admin Session Authentication
        const sessionToken = getAdminCookie(request);
        const isAuthorized = await verifyAdminSessionToken(sessionToken);
        if (!isAuthorized) {
            return new Response(JSON.stringify({ error: 'Unauthorized: Admin session required for uploads.' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return new Response(JSON.stringify({ error: 'No file provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // MIME type validation
        if (!ALLOWED_MIME_TYPES.has(file.type)) {
            return new Response(JSON.stringify({
                error: `File type "${file.type}" is not allowed. Accepted: images, videos, PDFs.`
            }), { status: 415, headers: { 'Content-Type': 'application/json' } });
        }

        // File size validation
        if (file.size > MAX_FILE_SIZE) {
            return new Response(JSON.stringify({
                error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum: 15MB.`
            }), { status: 413, headers: { 'Content-Type': 'application/json' } });
        }

        const cloudName = getEnv('CLOUDINARY_CLOUD_NAME') || 'dw4fmucml';
        const apiKey = getEnv('CLOUDINARY_API_KEY');
        const apiSecret = getEnv('CLOUDINARY_API_SECRET');
        const uploadPreset = getEnv('CLOUDINARY_UPLOAD_PRESET') || 'kinbo1';

        const uploadFormData = new FormData();

        if (apiKey && apiSecret) {
            // Signed Upload
            const timestamp = Math.floor(Date.now() / 1000).toString();
            const folder = 'kinbo_media';
            const signaturePayload = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
            const signature = await hmacSignHex(apiSecret, signaturePayload);

            uploadFormData.append('folder', folder);
            uploadFormData.append('timestamp', timestamp);
            uploadFormData.append('api_key', apiKey);
            uploadFormData.append('signature', signature);
            uploadFormData.append('file', file);
        } else {
            // Preset upload locked behind verified admin session
            uploadFormData.append('upload_preset', uploadPreset);
            uploadFormData.append('file', file);
        }

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
            method: 'POST',
            body: uploadFormData
        });

        const data = await response.json();

        if (data.secure_url) {
            return new Response(JSON.stringify({
                url: data.secure_url,
                public_id: data.public_id,
                format: data.format,
                bytes: data.bytes
            }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } else {
            console.error('Cloudinary Error:', data);
            return new Response(JSON.stringify({ error: data.error?.message || 'Upload failed' }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (e: any) {
        console.error('Upload API Error:', e);
        return new Response(JSON.stringify({
            error: 'Server error occurred during upload processing'
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
