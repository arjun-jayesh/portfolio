import { e as createAstro, f as createComponent, h as addAttribute, n as renderScript, r as renderTemplate, m as maybeRenderHead, k as renderComponent, o as renderHead, p as renderSlot, u as unescapeHTML } from './astro/server_CgrrVIQx.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro$1 = createAstro("https://arjun-jayesh.com");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/Arjun/Desktop/New folder/projects/portolio/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Preloader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="preloader" class="fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center transition-opacity duration-500"> <div class="relative flex flex-col items-center"> <div class="font-poppins text-6xl font-black text-offwhite tracking-tighter opacity-0" id="preloader-logo">
A<span class="text-teal">.</span> </div> <div class="mt-6 w-48 h-px bg-charcoal-light relative overflow-hidden"> <div id="preloader-bar" class="absolute top-0 left-0 h-full bg-teal w-0"></div> </div> <div class="mt-4 font-mono text-[10px] text-muted tracking-[0.2em] uppercase opacity-0" id="preloader-text">
Initializing System
</div> </div> </div> ${renderScript($$result, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/Preloader.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/Preloader.astro", void 0);

const $$Astro = createAstro("https://arjun-jayesh.com");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Arjun Jayesh \u2014 Polymath \xB7 Engineer \xB7 Researcher",
    description = "Portfolio of Arjun Jayesh \u2014 Systems Architect, Independent Researcher, and Developer building deterministic, constraint-bound systems."
  } = Astro2.props;
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Works", href: "/works" },
    { label: "Blog", href: "/blog" },
    { label: "Socials", href: "/socials" },
    { label: "Chat", href: "/chat" }
  ];
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><!-- SEO & OpenGraph --><meta name="robots" content="index, follow"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.site || Astro2.url, "content")}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><title>${title}</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}>${renderComponent($$result, "ViewTransitions", $$ClientRouter, {})}${renderHead()}</head> <body> <!-- ─── Debug Banner ─── --> <div id="debug-banner" class="hidden fixed top-0 left-0 w-full z-[100] bg-red-600 text-white font-mono text-[10px] py-1 px-4 flex justify-between items-center"> <span>SYSTEM_CRITICAL: <span id="debug-error-msg">Unknown Server Error</span></span> <button onclick="this.parentElement.classList.add('hidden')" class="hover:text-black">[DISMISS]</button> </div> ${renderComponent($$result, "Preloader", $$Preloader, {})} <!-- ─── Top Utility Bar ─── --> <div class="fixed top-0 right-0 z-[70] p-4 flex items-center gap-6 bg-charcoal/50 backdrop-blur-sm rounded-bl-xl border-l border-b border-charcoal-light/30"> <!-- Clock --> <div id="clock" class="font-mono text-xs text-teal tracking-widest tabular-nums">
00:00:00
</div> <!-- Theme Toggle --> <button id="theme-toggle" class="text-muted hover:text-teal transition-colors duration-300" aria-label="Toggle theme"> <svg id="sun-icon" class="w-4 h-4 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <svg id="moon-icon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> </button> </div> <!-- ─── Navbar ─── --> <nav class="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-charcoal/80 border-b border-charcoal-light/40" id="main-nav"> <div class="max-w-7xl mx-auto flex items-center justify-between px-5 py-4"> <!-- Logo --> <a href="/" class="font-poppins text-2xl font-bold text-teal hover:text-offwhite transition-colors duration-300" aria-label="Go to home">
A
</a> <!-- Desktop Nav Links --> <ul class="hidden md:flex items-center gap-8 list-none m-0 p-0"> ${navLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="nav-link font-poppins text-sm font-medium uppercase tracking-widest text-muted hover:text-offwhite transition-colors duration-300 relative pb-1"> ${link.label} </a> </li>`)} </ul> </div> </nav> <!-- ─── Main Content ─── --> <main> ${renderSlot($$result, $$slots["default"])} </main> <!-- Mobile Nav Bar (Bottom Floating Island) --> <nav class="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-3 rounded-full bg-charcoal/80 backdrop-blur-md border border-charcoal-light/30 shadow-2xl z-50 pointer-events-auto" aria-label="Mobile navigation"> ${navLinks.map((link) => {
    let iconSvg = "";
    if (link.label === "Home") iconSvg = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>`;
    else if (link.label === "Works") iconSvg = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>`;
    else if (link.label === "Blog") iconSvg = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>`;
    else if (link.label === "Socials") iconSvg = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>`;
    else if (link.label === "Chat") iconSvg = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>`;
    return renderTemplate`<a${addAttribute(link.href, "href")} class="mobile-nav-link text-muted hover:text-teal transition-colors duration-300 relative p-1"${addAttribute(link.label, "aria-label")}> <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">${unescapeHTML(iconSvg)}</svg> </a>`;
  })} </nav> <!-- ─── Footer ─── --> <footer class="border-t border-charcoal-light/40 py-8 px-5 text-center"> <p class="font-mono text-xs text-muted tracking-wider">
© ${(/* @__PURE__ */ new Date()).getFullYear()} Arjun Jayesh — Built with precision.
</p> </footer> <!-- ─── Global Scripts ─── --> ${renderScript($$result, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} <!-- ─── Nav Active Style ─── -->  </body> </html>`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
