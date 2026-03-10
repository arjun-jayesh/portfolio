import { f as createComponent, m as maybeRenderHead, h as addAttribute, k as renderComponent, n as Fragment, r as renderTemplate, l as renderScript, u as unescapeHTML } from './astro/server_xv9ZGpXE.mjs';
import 'piccolore';
/* empty css                           */

const $$Socials = createComponent(($$result, $$props, $$slots) => {
  const socials = [
    {
      name: "GitHub",
      handle: "@arjunjayesh",
      url: "https://github.com/arjunjayesh",
      description: "Open-source contributions, tools, and experimental repos.",
      gradient: "from-[#333] to-[#0d1117]",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
    },
    {
      name: "Zenodo",
      handle: "Arjun Jayesh",
      url: "https://zenodo.org",
      description: "Research publications, datasets, and DOI-registered outputs.",
      gradient: "from-[#1a5276] to-[#0e2f44]",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><path d="M3 3h18v2H5.667L21 17v4H3v-2h14.333L3 7V3z"/></svg>`
    },
    {
      name: "LinkedIn",
      handle: "Arjun Jayesh",
      url: "https://linkedin.com/in/arjunjayesh",
      description: "Professional network, thoughts on engineering leadership.",
      gradient: "from-[#0077b5] to-[#003d5c]",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="socials" class="section-padding" data-astro-cid-upu6fzxr> <div class="max-w-6xl mx-auto" data-astro-cid-upu6fzxr> <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-start" data-astro-cid-upu6fzxr> <!-- Left Column: Text --> <div class="socials-text" style="opacity:0; transform:translateY(20px);" data-astro-cid-upu6fzxr> <span class="font-mono text-xs text-teal uppercase tracking-[0.3em] block mb-3" data-astro-cid-upu6fzxr>Network</span> <h2 class="font-poppins text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite mb-6" data-astro-cid-upu6fzxr>
Let's <span class="text-teal" data-astro-cid-upu6fzxr>Connect</span> </h2> <p class="text-offwhite/70 text-base sm:text-lg leading-relaxed mb-6" data-astro-cid-upu6fzxr>
I believe in open research, collaborative engineering, and sharing knowledge freely.
          Whether you're interested in systems architecture, formal methods, or automation —
          let's build something meaningful together.
</p> <div class="flex items-center gap-3" data-astro-cid-upu6fzxr> <div class="w-2 h-2 rounded-full bg-teal animate-pulse" data-astro-cid-upu6fzxr></div> <span class="font-mono text-xs text-muted uppercase tracking-wider" data-astro-cid-upu6fzxr>Available for collaboration</span> </div> </div> <!-- Right Column: Social Cards --> <div class="grid gap-5" data-astro-cid-upu6fzxr> ${socials.map((social, i) => renderTemplate`<a${addAttribute(social.url, "href")} target="_blank" rel="noopener noreferrer" class="social-card group block rounded-xl border border-charcoal-light/30 overflow-hidden transition-all duration-400"${addAttribute(`opacity:0; transform:translateY(20px); animation-delay: ${i * 0.15}s;`, "style")} data-astro-cid-upu6fzxr> <div${addAttribute(`p-5 sm:p-6 bg-gradient-to-br ${social.gradient} relative overflow-hidden`, "class")} data-astro-cid-upu6fzxr>  <div class="absolute inset-0 opacity-[0.04]" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 20px 20px;" data-astro-cid-upu6fzxr></div> <div class="flex items-start justify-between relative z-10" data-astro-cid-upu6fzxr> <div class="flex items-center gap-4" data-astro-cid-upu6fzxr> <div class="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white/90" data-astro-cid-upu6fzxr> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(social.icon)}` })} </div> <div data-astro-cid-upu6fzxr> <h3 class="font-poppins text-lg font-semibold text-white mb-0.5" data-astro-cid-upu6fzxr>${social.name}</h3> <p class="font-mono text-xs text-white/50" data-astro-cid-upu6fzxr>${social.handle}</p> </div> </div> <svg class="w-5 h-5 text-white/30 group-hover:text-teal group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-upu6fzxr> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-astro-cid-upu6fzxr></path> </svg> </div> <p class="mt-3 text-sm text-white/60 leading-relaxed relative z-10" data-astro-cid-upu6fzxr> ${social.description} </p> <div class="mt-4 inline-flex items-center gap-2 text-xs font-poppins font-medium text-white/40 group-hover:text-teal transition-colors duration-300 relative z-10 uppercase tracking-wider" data-astro-cid-upu6fzxr>
Visit Profile
<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-upu6fzxr> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-astro-cid-upu6fzxr></path> </svg> </div> </div> </a>`)} </div> </div> </div> </section> ${renderScript($$result, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/Socials.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/Socials.astro", void 0);

export { $$Socials as $ };
