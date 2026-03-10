import { f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, l as renderScript, k as renderComponent } from '../chunks/astro/server_xv9ZGpXE.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BiNcLr2s.mjs';
import 'clsx';
import { a as supabase } from '../chunks/supabase_BcKHrXOX.mjs';
import { $ as $$Works } from '../chunks/Works_Dv1TOMQj.mjs';
import { $ as $$Socials } from '../chunks/Socials_BucmXvOi.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_DxY0_STa.mjs';
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  let siteConfig = { hero: {}, stats: [] };
  if (supabase) {
    try {
      const { data: configData, error } = await supabase.from("site_config").select("data").eq("key", "primary_settings").single();
      if (error && error.code !== "PGRST116") {
        console.error("Hero Supabase error:", error);
      } else if (configData?.data) {
        siteConfig = { ...siteConfig, ...configData.data };
      }
    } catch (e) {
      console.error("Hero SSR Crash Caught:", e);
    }
  } else {
    console.warn("Supabase client not available for Hero SSR");
  }
  const { hero, stats } = siteConfig;
  return renderTemplate`${maybeRenderHead()}<section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden"> <!-- Video Background Module --> ${hero.video && renderTemplate`<div class="absolute inset-0 z-0 overflow-hidden pointer-events-none"> <video autoplay loop muted playsinline class="w-full h-full object-cover transition-all duration-1000"${addAttribute(`filter: blur(${hero.video.blur}px); opacity: ${hero.video.opacity};`, "style")}> <source${addAttribute(hero.video.url, "src")} type="video/mp4"> </video> <!-- Customizable Overlay --> <div class="absolute inset-0 bg-charcoal-dark pointer-events-none"${addAttribute(`opacity: ${hero.video.overlayDarkness};`, "style")}></div> </div>`} <!-- Grid dot pattern background --> <div class="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]" style="background-image: radial-gradient(circle, #F5F5F7 1px, transparent 1px); background-size: 30px 30px;"></div> <!-- Top-left: FIRST NAME --> <div class="absolute top-24 left-6 md:top-28 md:left-12 z-10"> <h1 class="font-poppins text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-offwhite leading-none hero-corner-text" style="opacity: 0;"> ${hero?.firstName || "Arjun"} </h1> </div> <!-- Bottom-right: Subtitle --> <div class="absolute bottom-12 right-6 md:bottom-16 md:right-12 z-10 text-right"> <p class="font-poppins text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] text-muted hero-corner-text" style="opacity: 0;"> ${hero?.role || "Developer"} </p> </div> <!-- Center: Photo --> <div class="relative z-10 hero-image" style="opacity: 0;"> <div class="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden" style="box-shadow: 0 0 60px var(--color-teal-glow), 0 0 120px rgba(42,157,143,0.15);"> <div class="w-full h-full bg-gradient-to-br from-teal/20 via-charcoal-light to-charcoal flex items-center justify-center"> <span class="font-poppins text-7xl sm:text-8xl md:text-9xl font-bold text-teal/30">${hero?.firstName?.[0] || "A"}</span> </div> </div> <!-- Orbiting ring decoration --> <div class="absolute -inset-4 rounded-full border border-dashed border-teal/20 animate-spin" style="animation-duration: 25s;"></div> <div class="absolute -inset-8 rounded-full border border-dotted border-teal/10 animate-spin" style="animation-duration: 40s; animation-direction: reverse;"></div> </div> <!-- Scroll indicator --> <div class="absolute bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted z-10 hero-corner-text" style="opacity:0;"> <span class="font-mono text-[10px] tracking-widest uppercase">Scroll</span> <div class="w-px h-8 bg-gradient-to-b from-teal to-transparent"></div> </div> </section> <!-- Below-fold: Stats + Bio --> <section class="section-padding max-w-6xl mx-auto"> <!-- Stats Row --> <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16"> ${(stats || []).map((stat) => renderTemplate`<div class="stat-card text-center p-6 rounded-xl border border-charcoal-light/30 bg-charcoal-light/10 backdrop-blur-sm" style="opacity:0; transform:translateY(30px);"> <span class="block font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-teal mb-2"> ${stat.value} </span> <span class="font-poppins text-xs uppercase tracking-[0.2em] text-muted"> ${stat.label} </span> </div>`)} </div> <!-- Bio Paragraph --> <div class="max-w-3xl mx-auto text-center bio-text" style="opacity:0; transform:translateY(20px);"> <p class="text-base sm:text-lg md:text-xl leading-relaxed text-offwhite/80"> ${hero.bio} </p> <div class="mt-8 flex justify-center"> <a href="/products" class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-dashed border-teal text-teal font-poppins text-sm font-medium uppercase tracking-wider hover:bg-teal/10 transition-all duration-300">
Explore Ecosystem
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path> </svg> </a> </div> </div> </section> ${renderScript($$result, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/Hero.astro", void 0);

const prerender = false;
const $$Founder = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Founder", "description": "Arjun Jayesh \u2014 Systems Architect, Independent Researcher, and Developer building KINBO TECHNOLOGIES PRIVATE LIMITED." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-7xl mx-auto pt-24 px-6 mb-[-4rem]"> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, {})} </section> ${renderComponent($$result2, "Hero", $$Hero, {})}  <section class="section-padding max-w-4xl mx-auto"> <div class="text-center mb-12 founder-section" style="opacity:0; transform:translateY(20px);"> <span class="font-mono text-xs text-teal uppercase tracking-[0.3em] block mb-3">About</span> <h2 class="font-poppins text-3xl sm:text-4xl font-bold text-offwhite">
The Mind Behind <span class="text-teal">KINBO</span> </h2> </div> <div class="founder-section font-lora text-muted leading-relaxed space-y-4 max-w-3xl mx-auto" style="opacity:0; transform:translateY(20px);"> <p>
Arjun Jayesh is a systems architect, independent researcher, and developer with a passion for building deterministic, constraint-bound systems that deliver measurable outcomes. As the founder of KINBO TECHNOLOGIES PRIVATE LIMITED, he leads the technical vision and product strategy for KINBO's growing ecosystem of intelligent everyday applications.
</p> <p>
With deep expertise spanning software engineering, automation, and applied artificial intelligence, Arjun brings a methodical approach to product development. He believes that the best technology disappears into the background — working reliably, transparently, and in service of the user rather than the platform.
</p> <p>
Before founding KINBO, Arjun spent years studying how consumer technology fails its users — through unnecessary complexity, opaque algorithms, and engagement-driven design patterns that prioritize metrics over meaning. KINBO was created to prove that a different approach is possible: one where every feature exists because it genuinely helps someone.
</p> <p>
Currently scaling KINBO across India, China, and the GCC, Arjun continues to lead the mission to build practical, responsible technology that improves everyday outcomes. When not architecting systems, he explores independent research in constraint-based computing and deterministic system design.
</p> </div> </section> ${renderComponent($$result2, "Works", $$Works, {})} ${renderComponent($$result2, "Socials", $$Socials, {})} ` })} ${renderScript($$result, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/founder.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/founder.astro", void 0);

const $$file = "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/founder.astro";
const $$url = "/founder";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Founder,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
