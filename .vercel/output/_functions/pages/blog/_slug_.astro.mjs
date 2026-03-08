import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_CgrrVIQx.mjs';
import 'piccolore';
import { a as supabase } from '../../chunks/supabase_C2AHM8W4.mjs';
import { $ as $$Layout } from '../../chunks/Layout_DCdCGL1q.mjs';
import { marked } from 'marked';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://arjun-jayesh.com");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  let post = null;
  let content = "";
  if (!supabase) {
    console.error("Supabase client not initialized.");
  } else {
    const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
    if (!error && data) {
      post = data;
      content = await marked(data.body);
    }
  }
  if (!post) {
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.title} \u2014 Arjun Jayesh`, "description": post.excerpt }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="section-padding max-w-4xl mx-auto mt-16"> <div class="mb-12"> <a href="/blog" class="inline-flex items-center gap-2 text-teal font-poppins text-xs uppercase tracking-widest hover:translate-x-[-4px] transition-transform duration-300 mb-8"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
Back to Journal
</a> <div class="flex items-center gap-4 mb-4"> <span class="font-mono text-xs text-teal border border-teal/30 px-3 py-1 rounded-full bg-teal/5"> ${post.category} </span> <span class="font-mono text-xs text-muted"> ${new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} </span> </div> <h1 class="font-poppins text-4xl sm:text-5xl md:text-6xl font-bold text-offwhite leading-tight mb-8"> ${post.title} </h1> <div class="w-full h-px bg-gradient-to-r from-teal/50 via-teal/10 to-transparent"></div> </div> <div class="prose prose-invert prose-teal max-w-none font-lora text-offwhite/80 leading-relaxed
      prose-headings:font-poppins prose-headings:text-offwhite
      prose-p:mb-6 prose-li:mb-2
      prose-a:text-teal prose-a:no-underline hover:prose-a:underline
      prose-strong:text-offwhite prose-code:text-teal prose-code:bg-charcoal-light/50 prose-code:px-1 prose-code:rounded
      prose-pre:bg-charcoal-dark prose-pre:border prose-pre:border-charcoal-light/30">${unescapeHTML(content)}</div> </article> ` })} `;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/blog/[slug].astro", void 0);

const $$file = "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
