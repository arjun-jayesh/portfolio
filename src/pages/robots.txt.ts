export const prerender = false;

export async function GET({ site, url }: { site?: URL; url: URL }) {
  const origin = "https://kinbosoft.com";
  const content = [
    '# ============================================',
    '# KINBO TECHNOLOGIES - robots.txt',
    '# Enterprise Crawl & Search Configuration',
    '# ============================================',
    '',
    'User-agent: Googlebot',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api/',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api/',
    '',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api/',
    '',
    'User-agent: GPTBot',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api/',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api/',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api/',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api/',
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    `Sitemap: ${origin}/sitemap-index.xml`,
    `Host: kinbosoft.com`
  ].join('\n');

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'
    }
  });
}
