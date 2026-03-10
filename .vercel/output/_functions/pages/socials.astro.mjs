import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_xv9ZGpXE.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BiNcLr2s.mjs';
import { $ as $$Socials$1 } from '../chunks/Socials_BucmXvOi.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Socials = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Socials \u2014 Arjun Jayesh" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pt-20"> ${renderComponent($$result2, "SocialsSection", $$Socials$1, {})} </div> ` })}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/socials.astro", void 0);

const $$file = "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/socials.astro";
const $$url = "/socials";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Socials,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
