export const prerender = false;

const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/founder',
  '/products',
  '/products/queuezero',
  '/services',
  '/blog',
  '/team',
  '/ideas',
  '/chat',
  '/socials',
  '/privacy',
  '/terms'
];

export async function GET({ site, url }: { site?: URL; url: URL }) {
  const origin = site ? site.origin : url.origin;
  const now = new Date().toISOString().split('T')[0];

  const urlsXml = PUBLIC_ROUTES.map((route) => {
    const loc = `${origin}${route === '/' ? '' : route}`;
    const priority = route === '/' ? '1.0' : route.startsWith('/products') || route === '/services' ? '0.8' : '0.6';
    const changefreq = route === '/' || route === '/blog' ? 'daily' : 'weekly';
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
