import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

const BLOG_DIR = path.resolve(process.cwd(), 'src/content/blog');

export async function GET() {
    try {
        const files = await fs.readdir(BLOG_DIR);
        const posts = await Promise.all(
            files
                .filter(f => f.endsWith('.mdx'))
                .map(async (file) => {
                    const content = await fs.readFile(path.join(BLOG_DIR, file), 'utf-8');
                    return {
                        slug: file.replace('.mdx', ''),
                        content,
                    };
                })
        );
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const { slug, title, category, date, excerpt, body } = await request.json();
        const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

        const mdxContent = `---
title: "${title}"
category: "${category}"
date: ${date}
excerpt: "${excerpt}"
---

${body}`;

        await fs.writeFile(filePath, mdxContent, 'utf-8');
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

export async function DELETE({ request }) {
    try {
        const url = new URL(request.url);
        const slug = url.searchParams.get('slug');
        if (!slug) return new Response('Missing slug', { status: 400 });

        const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
        await fs.unlink(filePath);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
