import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Ci9DQupP.mjs';
import { manifest } from './manifest_DeOCuZ3i.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/api/blog.astro.mjs');
const _page4 = () => import('./pages/api/config.astro.mjs');
const _page5 = () => import('./pages/api/ideas.astro.mjs');
const _page6 = () => import('./pages/api/products.astro.mjs');
const _page7 = () => import('./pages/api/upload.astro.mjs');
const _page8 = () => import('./pages/blog/_slug_.astro.mjs');
const _page9 = () => import('./pages/blog.astro.mjs');
const _page10 = () => import('./pages/chat.astro.mjs');
const _page11 = () => import('./pages/founder.astro.mjs');
const _page12 = () => import('./pages/ideas.astro.mjs');
const _page13 = () => import('./pages/products.astro.mjs');
const _page14 = () => import('./pages/socials.astro.mjs');
const _page15 = () => import('./pages/works.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin.astro", _page2],
    ["src/pages/api/blog.ts", _page3],
    ["src/pages/api/config.ts", _page4],
    ["src/pages/api/ideas.ts", _page5],
    ["src/pages/api/products.ts", _page6],
    ["src/pages/api/upload.ts", _page7],
    ["src/pages/blog/[slug].astro", _page8],
    ["src/pages/blog.astro", _page9],
    ["src/pages/chat.astro", _page10],
    ["src/pages/founder.astro", _page11],
    ["src/pages/ideas.astro", _page12],
    ["src/pages/products.astro", _page13],
    ["src/pages/socials.astro", _page14],
    ["src/pages/works.astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "63590ff4-3c8c-4bfb-85a5-4798ec25adda",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
