import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

const CONFIG_PATH = path.resolve(process.cwd(), 'src/data/siteConfig.json');

export async function GET() {
    try {
        const config = await fs.readFile(CONFIG_PATH, 'utf-8');
        return new Response(config, { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const data = await request.json();
        await fs.writeFile(CONFIG_PATH, JSON.stringify(data, null, 2), 'utf-8');
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
