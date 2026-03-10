import fs from 'fs';
import path from 'path';

export const prerender = false;

export async function POST({ request }: { request: Request }) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Generate safe unique filename
        const ext = path.extname(file.name) || '';
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
        const filename = `${Date.now()}-${safeName}`;
        const filePath = path.join(uploadDir, filename);

        fs.writeFileSync(filePath, buffer);

        // Also save to dist/client/uploads so it immediately works in production
        const distDir = path.join(process.cwd(), 'dist', 'client', 'uploads');
        if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
            if (!fs.existsSync(distDir)) {
                fs.mkdirSync(distDir, { recursive: true });
            }
            fs.writeFileSync(path.join(distDir, filename), buffer);
        }

        return new Response(JSON.stringify({ url: `/uploads/${filename}` }), { status: 200 });
    } catch (e: any) {
        console.error('Upload Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
