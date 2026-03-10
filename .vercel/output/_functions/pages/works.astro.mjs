import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_xv9ZGpXE.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BiNcLr2s.mjs';
import { $ as $$Works$1 } from '../chunks/Works_Dv1TOMQj.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Works = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Works \u2014 Arjun Jayesh" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pt-20"> ${renderComponent($$result2, "WorksSection", $$Works$1, {})} </div> ` })}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/works.astro", void 0);

const $$file = "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/works.astro";
const $$url = "/works";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Works,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
