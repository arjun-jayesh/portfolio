import { e as createAstro, f as createComponent, m as maybeRenderHead, r as renderTemplate, h as addAttribute } from './astro/server_xv9ZGpXE.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://portfolio-sage-two-43.vercel.app");
const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const { pathname } = Astro2.url;
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    return { label, href };
  });
  return renderTemplate`${breadcrumbs.length > 0 && renderTemplate`${maybeRenderHead()}<nav class="max-w-7xl mx-auto px-5 py-4 mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted/60" aria-label="Breadcrumb"><a href="/" class="hover:text-teal transition-colors">Home</a>${breadcrumbs.map((crumb, index) => renderTemplate`<div class="flex items-center gap-2"><span>/</span>${index === breadcrumbs.length - 1 ? renderTemplate`<span class="text-teal font-medium">${crumb.label}</span>` : renderTemplate`<a${addAttribute(crumb.href, "href")} class="hover:text-teal transition-colors">${crumb.label}</a>`}</div>`)}</nav>`}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/Breadcrumbs.astro", void 0);

export { $$Breadcrumbs as $ };
