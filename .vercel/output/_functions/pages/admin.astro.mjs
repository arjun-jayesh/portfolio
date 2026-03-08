import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as Fragment } from '../chunks/astro/server_CgrrVIQx.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DCdCGL1q.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://arjun-jayesh.com");
const prerender = false;
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Admin;
  const adminPassword = "admin123";
  let isAuthenticated = Astro2.cookies.has("admin_session");
  let error = "";
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const password = data.get("password");
    if (password === adminPassword) {
      Astro2.cookies.set("admin_session", "true", { path: "/", httpOnly: true, secure: true, maxAge: 60 * 60 * 24 });
      isAuthenticated = true;
    } else {
      error = "Invalid connection key.";
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Panel — Arjun Jayesh" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section-padding mt-16 max-w-6xl mx-auto"> <div class="mb-12"> <h1 class="font-poppins text-4xl font-bold text-offwhite mb-4 uppercase tracking-[0.2em]"> <span class="text-teal">/</span> Command Center
</h1> <p class="font-lora text-muted max-w-2xl">
Manage site settings, blog content, and system parameters from a secure administrative interface.
</p> </div> ${isAuthenticated ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`  <div class="min-h-[600px]"> ${renderComponent($$result3, "AdminInterface", null, { "client:only": "preact", "client:component-hydration": "only", "client:component-path": "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/AdminInterface", "client:component-export": "default" })} </div>  <div class="mt-12 p-6 border border-teal/10 rounded bg-teal/5 flex items-center justify-between"> <div class="flex items-center gap-4"> <div class="w-2 h-2 rounded-full bg-teal animate-pulse"></div> <span class="font-mono text-[10px] text-teal uppercase tracking-widest">System Online — Secure Connection Verified</span> </div> <span class="font-mono text-[10px] text-muted">A_JAYESH v4.0.2</span> </div> ` })}` : renderTemplate`<div class="max-w-md mx-auto mt-20 p-8 bg-charcoal-light/10 border border-charcoal-light/30 rounded-xl relative overflow-hidden"> <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal to-transparent"></div> <h2 class="font-poppins text-2xl font-semibold text-offwhite mb-6 text-center">Authentication Required</h2> ${error && renderTemplate`<div class="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs rounded text-center"> ${error} </div>`} <form method="POST" class="flex flex-col gap-4"> <div> <label for="password" class="block font-mono text-xs text-muted mb-2 uppercase tracking-widest">Master Key</label> <input type="password" id="password" name="password" class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded p-3 text-offwhite font-mono focus:outline-none focus:border-teal transition-colors" placeholder="••••••••" required> </div> <button type="submit" class="mt-4 w-full py-3 bg-teal/10 border border-teal/30 hover:bg-teal hover:text-charcoal text-teal font-mono tracking-widest uppercase transition-all duration-300 rounded font-bold">
[ Establish Connection ]
</button> </form> </div>`} </section> ` })}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/admin.astro", void 0);
const $$file = "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
