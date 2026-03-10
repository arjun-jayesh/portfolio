import { f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_xv9ZGpXE.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BiNcLr2s.mjs';
import { a as supabase } from '../chunks/supabase_BcKHrXOX.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_DxY0_STa.mjs';
import { useRef } from 'preact/hooks';
import { jsxs, jsx } from 'preact/jsx-runtime';
export { renderers } from '../renderers.mjs';

function AutoCarousel({
  items,
  speed = 20
}) {
  const scrollRef = useRef(null);
  if (!items || items.length === 0) return null;
  const displayItems = [...items, ...items];
  return jsxs("div", {
    class: "overflow-hidden w-full py-10 relative",
    children: [jsx("div", {
      ref: scrollRef,
      class: "flex gap-8 whitespace-nowrap animate-scroll",
      style: {
        width: "max-content",
        animationDuration: `${speed}s`
      },
      children: displayItems.map((item, i) => jsx("div", {
        class: "flex-shrink-0 w-[280px] h-[580px] rounded-3xl overflow-hidden border border-charcoal-light/20 bg-charcoal-dark/5 shadow-2xl transition-transform hover:scale-105 duration-500",
        children: jsx("img", {
          src: item,
          alt: `App Screenshot ${i + 1}`,
          class: "w-full h-full object-cover",
          loading: "lazy"
        })
      }, i))
    }), jsx("div", {
      class: "absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none"
    }), jsx("div", {
      class: "absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none"
    }), jsx("style", {
      children: `
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `
    })]
  });
}

const prerender = false;
const $$Products = createComponent(async ($$result, $$props, $$slots) => {
  let dynamicProducts = [];
  if (supabase) {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("status", "active").order("sort_order", { ascending: true });
      if (error) {
        console.error("Products Supabase Fetch Error:", error);
      } else if (data) {
        dynamicProducts = data;
      }
    } catch (e) {
      console.error("Products SSR Crash Caught:", e);
    }
  } else {
    console.warn("Supabase client not available on Products SSR");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Products", "description": "Explore KINBO TECHNOLOGIES PRIVATE LIMITED's product ecosystem: Glowup for skin health insights and Relic for creator-focused marketplace." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-7xl mx-auto pt-24 px-6"> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, {})} <!-- Header --> <div class="text-center mb-16"> <span class="font-mono text-xs text-teal uppercase tracking-[0.3em] block mb-3">Products</span> <h1 class="font-poppins text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite mb-4">
A connected <span class="text-teal">ecosystem</span> </h1> <p class="font-lora text-muted max-w-2xl mx-auto leading-relaxed">
KINBO currently focuses on two integrated products that form a connected system. Insights generated in one application guide actions in another — from understanding to action, transparently.
</p> <div class="mt-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-teal to-transparent"></div> </div> <!-- GLOWUP --> <div id="glowup" class="mb-20 product-block" style="opacity:0; transform:translateY(30px);"> <div class="flex items-center gap-4 mb-6"> <div class="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center"> <svg class="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <div> <h2 class="font-poppins text-2xl sm:text-3xl font-bold text-offwhite">Glowup</h2> <span class="font-mono text-[10px] text-teal uppercase tracking-widest">Skin Health Intelligence</span> </div> </div> <p class="font-lora text-muted leading-relaxed mb-8 max-w-3xl">
Glowup is a consumer application that helps users understand and track visible skin health indicators using image analysis and structured reporting. It provides practical, non-medical insights to support personal skin care decisions.
</p> <div class="grid sm:grid-cols-2 gap-4 mb-8"> <div class="p-5 rounded-xl border border-charcoal-light/20 bg-charcoal-light/5"> <h4 class="font-poppins text-sm font-bold text-offwhite mb-2">Skin Assessment</h4> <p class="font-lora text-xs text-muted leading-relaxed">Users capture facial images and the system analyzes visible patterns to identify possible skin condition indicators.</p> </div> <div class="p-5 rounded-xl border border-charcoal-light/20 bg-charcoal-light/5"> <h4 class="font-poppins text-sm font-bold text-offwhite mb-2">Condition Scoring</h4> <p class="font-lora text-xs text-muted leading-relaxed">The application generates structured reports showing relative severity levels of different skin conditions.</p> </div> <div class="p-5 rounded-xl border border-charcoal-light/20 bg-charcoal-light/5"> <h4 class="font-poppins text-sm font-bold text-offwhite mb-2">Insight Dashboard</h4> <p class="font-lora text-xs text-muted leading-relaxed">Users receive explanations of what each condition indicator represents and how lifestyle habits may influence them.</p> </div> <div class="p-5 rounded-xl border border-charcoal-light/20 bg-charcoal-light/5"> <h4 class="font-poppins text-sm font-bold text-offwhite mb-2">Progress Tracking</h4> <p class="font-lora text-xs text-muted leading-relaxed">Users repeat scans over time and view changes through a progress dashboard showing trends and comparisons.</p> </div> <div class="p-5 rounded-xl border border-charcoal-light/20 bg-charcoal-light/5 sm:col-span-2"> <h4 class="font-poppins text-sm font-bold text-offwhite mb-2">Lifestyle Suggestions</h4> <p class="font-lora text-xs text-muted leading-relaxed">The application provides practical non-medical suggestions to help improve skin health over time, such as hydration reminders, sleep quality factors, and environmental considerations.</p> </div> </div> <div class="mb-12"> <span class="font-mono text-[9px] text-muted/60 uppercase tracking-widest block mb-4">Product Interface</span> ${renderComponent($$result2, "AutoCarousel", AutoCarousel, { "client:load": true, "items": [
    "https://images.unsplash.com/photo-1512941937669-90a1358b335c?auto=format&fit=crop&w=400&h=800",
    "https://images.unsplash.com/photo-1523206489230-c012c6422b1f?auto=format&fit=crop&w=400&h=800",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400&h=800"
  ], "client:component-hydration": "load", "client:component-path": "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/AutoCarousel", "client:component-export": "default" })} </div> <div class="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 mb-20"> <p class="font-mono text-[10px] text-yellow-400 uppercase tracking-wider">
⚠ Disclaimer: Glowup does not provide medical diagnosis and is intended only for informational and personal tracking purposes. Always consult a qualified healthcare professional for medical advice.
</p> </div> </div> <!-- RELIC --> <div id="relic" class="mb-20 product-block" style="opacity:0; transform:translateY(30px);"> <div class="flex items-center gap-4 mb-6"> <div class="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center"> <svg class="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path> </svg> </div> <div> <h2 class="font-poppins text-2xl sm:text-3xl font-bold text-offwhite">Relic</h2> <span class="font-mono text-[10px] text-teal uppercase tracking-widest">Creator Marketplace</span> </div> </div> <p class="font-lora text-muted leading-relaxed mb-8 max-w-3xl">
Relic is a digital multivendor marketplace that allows creators, students, and independent sellers to open online stores easily. It removes the technical barriers to e-commerce so sellers can focus on what they do best.
</p> <div class="grid sm:grid-cols-2 gap-4"> <div class="p-5 rounded-xl border border-charcoal-light/20 bg-charcoal-light/5"> <h4 class="font-poppins text-sm font-bold text-offwhite mb-2">Seller Onboarding</h4> <p class="font-lora text-xs text-muted leading-relaxed">Sellers can register and begin offering products with minimal setup. No technical knowledge required.</p> </div> <div class="p-5 rounded-xl border border-charcoal-light/20 bg-charcoal-light/5"> <h4 class="font-poppins text-sm font-bold text-offwhite mb-2">Personalized Stores</h4> <p class="font-lora text-xs text-muted leading-relaxed">Each seller can maintain their own store page and organize their products for customers.</p> </div> <div class="p-5 rounded-xl border border-charcoal-light/20 bg-charcoal-light/5"> <h4 class="font-poppins text-sm font-bold text-offwhite mb-2">Customer Experience</h4> <p class="font-lora text-xs text-muted leading-relaxed">Buyers can follow stores they trust and discover products through recommendations and community signals.</p> </div> <div class="p-5 rounded-xl border border-charcoal-light/20 bg-charcoal-light/5"> <h4 class="font-poppins text-sm font-bold text-offwhite mb-2">Cross-Platform Sync</h4> <p class="font-lora text-xs text-muted leading-relaxed">Purchases and account data can be synchronized across devices for consistent user experience.</p> </div> </div> <div class="mb-20"> <span class="font-mono text-[9px] text-muted/60 uppercase tracking-widest block mb-4">Relic Experience</span> ${renderComponent($$result2, "AutoCarousel", AutoCarousel, { "client:load": true, "items": [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&h=800",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&h=800",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&h=800"
  ], "client:component-hydration": "load", "client:component-path": "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/AutoCarousel", "client:component-export": "default" })} </div> </div> <!-- Integration --> <div class="mb-20 p-8 rounded-2xl border border-teal/20 bg-teal/5 product-block" style="opacity:0; transform:translateY(30px);"> <h2 class="font-poppins text-xl font-bold text-offwhite mb-4">How They Connect</h2> <div class="font-lora text-muted leading-relaxed space-y-3"> <p>Glowup identifies user skin concerns and suggests categories of products that may help address them. Relic provides a marketplace where users can discover relevant products offered by independent sellers.</p> <p>This connection allows users to move from insight to action in a transparent way. Users remain in full control of their decisions and product selection — the system informs, it does not prescribe.</p> </div> </div> <!-- Dynamic Products from Admin --> ${dynamicProducts.length > 0 && renderTemplate`<div class="mb-16"> <div class="text-center mb-12"> <span class="font-mono text-xs text-teal uppercase tracking-[0.3em] block mb-3">More Products</span> <h2 class="font-poppins text-2xl font-bold text-offwhite">Expanding the Ecosystem</h2> </div> <div class="grid sm:grid-cols-2 gap-8"> ${dynamicProducts.map((prod) => renderTemplate`<div class="p-8 rounded-3xl border border-charcoal-light/10 bg-charcoal-light/5 product-block" style="opacity:0; transform:translateY(20px);"> <div class="flex items-center gap-4 mb-4"> ${prod.logo_url ? renderTemplate`<img${addAttribute(prod.logo_url, "src")}${addAttribute(prod.name, "alt")} class="w-12 h-12 rounded-lg object-contain bg-charcoal-dark/50 p-2">` : renderTemplate`<div class="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center"> <span class="text-teal font-bold">${prod.name.charAt(0)}</span> </div>`} <div> <h3 class="font-poppins text-xl font-bold text-offwhite">${prod.name}</h3> ${prod.tagline && renderTemplate`<span class="font-mono text-[10px] text-teal uppercase tracking-widest">${prod.tagline}</span>`} </div> </div> <p class="font-lora text-sm text-muted leading-relaxed mb-6">${prod.description}</p> ${prod.screenshots && prod.screenshots.length > 0 && renderTemplate`<div class="pt-4 pointer-events-none grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"> ${renderComponent($$result2, "AutoCarousel", AutoCarousel, { "client:load": true, "items": prod.screenshots, "speed": 30, "client:component-hydration": "load", "client:component-path": "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/AutoCarousel", "client:component-export": "default" })} </div>`} <div class="flex gap-4 mt-8"> ${prod.play_store_link && renderTemplate`<span class="text-[9px] font-mono text-muted uppercase">Play Store</span>`} ${prod.app_store_link && renderTemplate`<span class="text-[9px] font-mono text-muted uppercase">App Store</span>`} </div> </div>`)} </div> </div>`} </section> ` })} ${renderScript($$result, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/products.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/products.astro", void 0);

const $$file = "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/products.astro";
const $$url = "/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Products,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
