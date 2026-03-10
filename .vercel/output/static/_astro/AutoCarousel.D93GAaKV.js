import{A as s}from"./hooks.module.CWwuo7Mu.js";import{u as r}from"./jsxRuntime.module.kJjLVEAC.js";import"./preact.module.EGlgVV74.js";function f({items:a,speed:e=20}){const t=s(null);if(!a||a.length===0)return null;const n=[...a,...a];return r("div",{class:"overflow-hidden w-full py-10 relative",children:[r("div",{ref:t,class:"flex gap-8 whitespace-nowrap animate-scroll",style:{width:"max-content",animationDuration:`${e}s`},children:n.map((o,l)=>r("div",{class:"flex-shrink-0 w-[280px] h-[580px] rounded-3xl overflow-hidden border border-charcoal-light/20 bg-charcoal-dark/5 shadow-2xl transition-transform hover:scale-105 duration-500",children:r("img",{src:o,alt:`App Screenshot ${l+1}`,class:"w-full h-full object-cover",loading:"lazy"})},l))}),r("div",{class:"absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none"}),r("div",{class:"absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none"}),r("style",{children:`
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
            `})]})}export{f as default};
