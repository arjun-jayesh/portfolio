import { f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_xv9ZGpXE.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BiNcLr2s.mjs';
import { a as supabase } from '../chunks/supabase_BcKHrXOX.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let enterpriseAssets = {
    hero_video_url: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1113-large.mp4",
    logo_url: "",
    locations: "INDIA | CHINA | GCC",
    company_name: "KINBO TECHNOLOGIES PRIVATE LIMITED"
  };
  if (supabase) {
    try {
      const { data, error } = await supabase.from("site_config").select("data").eq("key", "enterprise_assets").single();
      if (error && error.code !== "PGRST116") {
        console.error("Homepage Data Fetch Error:", error);
      } else if (data?.data) {
        enterpriseAssets = { ...enterpriseAssets, ...data.data };
      }
    } catch (e) {
      console.error("Homepage SSR Crash Caught:", e);
    }
  } else {
    console.warn("Supabase client not available on homepage SSR");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home", "description": "KINBO TECHNOLOGIES PRIVATE LIMITED builds intelligent everyday applications that combine practical technology with user-focused design." }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div id="startup-overlay" class="fixed inset-0 z-[100] bg-charcoal hidden flex-col items-center justify-center overflow-hidden"> <div class="relative"> <div id="startup-logo" class="w-24 h-24 bg-teal/10 rounded-2xl border border-teal/20 flex items-center justify-center mb-8 scale-0"> <span class="text-teal font-poppins text-4xl font-bold">K</span> </div> <div id="startup-bar" class="absolute -bottom-4 left-0 w-0 h-px bg-teal shadow-[0_0_10px_rgba(42,157,143,0.8)]"></div> </div> <div id="startup-text" class="font-mono text-[10px] text-teal uppercase tracking-[0.5em] opacity-0 translate-y-4">
Initializing Kinbo Systems
</div> </div>  <section class="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero"> <!-- Parallax Video Container --> <div class="absolute inset-0 z-0 scale-110" id="hero-video-container"> <div class="absolute inset-0 bg-charcoal/60 z-10 backdrop-blur-[2px]"></div> <video autoplay muted loop playsinline class="w-full h-full object-cover opacity-40"> <source${addAttribute(enterpriseAssets.hero_video_url, "src")} type="video/mp4"> </video> </div> <div class="relative z-20 max-w-5xl mx-auto px-6 text-center"> <span class="font-mono text-xs text-teal uppercase tracking-[0.5em] block mb-6 hero-anim opacity-0 translate-y-8"> ${enterpriseAssets.company_name} </span> <h1 class="font-poppins text-4xl sm:text-5xl md:text-7xl font-bold text-offwhite leading-tight mb-8 hero-anim opacity-0 translate-y-8">
Intelligent technology<br> <span class="text-teal">for real outcomes.</span> </h1> <p class="font-lora text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-10 hero-anim opacity-0 translate-y-8 px-4">
We focus on usable technology that improves outcomes rather than adding complexity. Intelligent everyday apps that combine practical technology with user-focused design.
</p> <div class="flex flex-wrap gap-4 justify-center hero-anim opacity-0 translate-y-8"> <a href="/products" class="px-8 py-3 bg-teal text-charcoal font-poppins font-bold uppercase tracking-widest text-xs rounded-full hover:shadow-[0_0_30px_rgba(42,157,143,0.3)] transition-all">
Explore Products
</a> <a href="/about" class="px-8 py-3 border border-teal/30 text-teal font-poppins font-bold uppercase tracking-widest text-xs rounded-full hover:bg-teal/10 transition-all">
Our Philosophy
</a> </div> </div> <!-- Scroll Indicator --> <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted z-20 hero-anim opacity-0"> <span class="font-mono text-[9px] tracking-[0.3em] uppercase opacity-50">Scroll</span> <div class="w-px h-12 bg-gradient-to-b from-teal to-transparent opacity-80"></div> </div> </section>  <section class="section-padding max-w-7xl mx-auto px-6" id="products-preview"> <div class="grid md:grid-cols-2 gap-8 lg:gap-12"> <div class="reveal p-10 rounded-3xl border border-charcoal-light/10 bg-charcoal-light/5 hover:border-teal/30 transition-all group overflow-hidden relative"> <div class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"> <svg class="w-32 h-32 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> </div> <h3 class="font-poppins text-2xl font-bold text-offwhite mb-4">Glowup</h3> <p class="font-lora text-muted mb-8 text-sm leading-relaxed">Understanding skin health through image intelligence and structured progress tracking.</p> <a href="/products#glowup" class="text-teal font-mono text-xs uppercase tracking-widest hover:underline">View Product →</a> </div> <div class="reveal p-10 rounded-3xl border border-charcoal-light/10 bg-charcoal-light/5 hover:border-teal/30 transition-all group overflow-hidden relative"> <div class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"> <svg class="w-32 h-32 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> </div> <h3 class="font-poppins text-2xl font-bold text-offwhite mb-4">Relic</h3> <p class="font-lora text-muted mb-8 text-sm leading-relaxed">A digital multivendor marketplace empowering creators and students to reach global customers.</p> <a href="/products#relic" class="text-teal font-mono text-xs uppercase tracking-widest hover:underline">View Product →</a> </div> </div> </section>  <section class="py-24 bg-charcoal-dark/30 border-y border-charcoal-light/10 overflow-hidden"> <div class="max-w-7xl mx-auto px-6 text-center"> <div class="flex flex-wrap justify-center gap-x-16 gap-y-12 items-center opacity-40"> <div class="flex flex-col items-center gap-2"> <span class="font-poppins text-lg font-bold">PRACTICAL</span> <span class="font-mono text-[9px] tracking-widest">INNOVATION</span> </div> <div class="flex flex-col items-center gap-2"> <span class="font-poppins text-lg font-bold">USER</span> <span class="font-mono text-[9px] tracking-widest">TRANSPARENCY</span> </div> <div class="flex flex-col items-center gap-2"> <span class="font-poppins text-lg font-bold">CREATOR</span> <span class="font-mono text-[9px] tracking-widest">EMPOWERMENT</span> </div> <div class="flex flex-col items-center gap-2"> <span class="font-poppins text-lg font-bold">RESPONSIBLE</span> <span class="font-mono text-[9px] tracking-widest">TECHNOLOGY</span> </div> </div> </div> </section> ` })} ${renderScript($$result, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/index.astro", void 0);

const $$file = "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
