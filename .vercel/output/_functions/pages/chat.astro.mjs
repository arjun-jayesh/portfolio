import { f as createComponent, m as maybeRenderHead, n as renderScript, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_CgrrVIQx.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DCdCGL1q.mjs';
import 'clsx';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const $$Chat$1 = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Chat Section — IDE terminal/chat widget styled contact form -->${maybeRenderHead()}<section id="chat" class="section-padding bg-charcoal-dark/30" data-astro-cid-cexstz2y> <div class="max-w-4xl mx-auto" data-astro-cid-cexstz2y> <!-- Section Header --> <div class="text-center mb-12 chat-header" style="opacity:0; transform:translateY(20px);" data-astro-cid-cexstz2y> <span class="font-mono text-xs text-teal uppercase tracking-[0.3em] block mb-3" data-astro-cid-cexstz2y>Contact</span> <h2 class="font-poppins text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite" data-astro-cid-cexstz2y>
Start a <span class="text-teal" data-astro-cid-cexstz2y>Conversation</span> </h2> <div class="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-teal to-transparent" data-astro-cid-cexstz2y></div> </div> <!-- Terminal/Chat Widget --> <div class="chat-widget rounded-2xl border border-charcoal-light/30 overflow-hidden shadow-2xl" style="opacity:0; transform:translateY(20px);" data-astro-cid-cexstz2y> <!-- Terminal Title Bar --> <div class="flex items-center gap-2 px-5 py-3 bg-charcoal-dark border-b border-charcoal-light/20" data-astro-cid-cexstz2y> <div class="flex gap-2" data-astro-cid-cexstz2y> <span class="w-3 h-3 rounded-full bg-red-500/80" data-astro-cid-cexstz2y></span> <span class="w-3 h-3 rounded-full bg-yellow-500/80" data-astro-cid-cexstz2y></span> <span class="w-3 h-3 rounded-full bg-green-500/80" data-astro-cid-cexstz2y></span> </div> <span class="font-mono text-xs text-muted ml-3 tracking-wider" data-astro-cid-cexstz2y>arjun@portfolio ~ /chat</span> </div> <!-- Form Body --> <div class="p-6 sm:p-8 md:p-10 bg-gradient-to-b from-charcoal-dark/80 to-charcoal" data-astro-cid-cexstz2y> <!-- Terminal prompt decoration --> <div class="font-mono text-xs text-muted mb-6 flex items-center gap-2" data-astro-cid-cexstz2y> <span class="text-teal" data-astro-cid-cexstz2y>❯</span> <span data-astro-cid-cexstz2y>init collaboration --interactive</span> <span class="inline-block w-2 h-4 bg-teal/50 animate-pulse ml-1" data-astro-cid-cexstz2y></span> </div> <form action="#" method="POST" class="space-y-6" id="contact-form" data-astro-cid-cexstz2y> <!-- Name + Email row --> <div class="grid sm:grid-cols-2 gap-5" data-astro-cid-cexstz2y> <div data-astro-cid-cexstz2y> <label for="name" class="block font-poppins text-xs uppercase tracking-wider text-muted mb-2" data-astro-cid-cexstz2y>
Name
</label> <input type="text" id="name" name="name" required placeholder="Your name" class="chat-input w-full px-4 py-3 rounded-lg bg-charcoal-light/30 border border-charcoal-light/30 text-offwhite font-lora text-sm placeholder:text-muted/50 transition-all duration-300" data-astro-cid-cexstz2y> </div> <div data-astro-cid-cexstz2y> <label for="email" class="block font-poppins text-xs uppercase tracking-wider text-muted mb-2" data-astro-cid-cexstz2y>
Email
</label> <input type="email" id="email" name="email" required placeholder="you@domain.com" class="chat-input w-full px-4 py-3 rounded-lg bg-charcoal-light/30 border border-charcoal-light/30 text-offwhite font-lora text-sm placeholder:text-muted/50 transition-all duration-300" data-astro-cid-cexstz2y> </div> </div> <!-- Project Type Dropdown --> <div data-astro-cid-cexstz2y> <label for="project-type" class="block font-poppins text-xs uppercase tracking-wider text-muted mb-2" data-astro-cid-cexstz2y>
Project Type
</label> <select id="project-type" name="project_type" required class="chat-input w-full px-4 py-3 rounded-lg bg-charcoal-light/30 border border-charcoal-light/30 text-offwhite font-lora text-sm appearance-none cursor-pointer transition-all duration-300" style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22%239CA3AF%22 viewBox=%220 0 24 24%22><path d=%22M7 10l5 5 5-5z%22/></svg>'); background-repeat: no-repeat; background-position: right 1rem center;" data-astro-cid-cexstz2y> <option value="" disabled selected style="color: #6B7280;" data-astro-cid-cexstz2y>Select a type...</option> <option value="software" data-astro-cid-cexstz2y>Software Engineering</option> <option value="research" data-astro-cid-cexstz2y>Research Collaboration</option> <option value="automation" data-astro-cid-cexstz2y>Automation / DevOps</option> <option value="consulting" data-astro-cid-cexstz2y>Consulting</option> <option value="other" data-astro-cid-cexstz2y>Other</option> </select> </div> <!-- Message --> <div data-astro-cid-cexstz2y> <label for="message" class="block font-poppins text-xs uppercase tracking-wider text-muted mb-2" data-astro-cid-cexstz2y>
Message
</label> <textarea id="message" name="message" required rows="5" placeholder="Describe your project or idea..." class="chat-input w-full px-4 py-3 rounded-lg bg-charcoal-light/30 border border-charcoal-light/30 text-offwhite font-lora text-sm placeholder:text-muted/50 resize-none transition-all duration-300" data-astro-cid-cexstz2y></textarea> </div> <!-- Submit --> <div class="flex items-center justify-between flex-wrap gap-4" data-astro-cid-cexstz2y> <p class="font-mono text-[10px] text-muted/50 tracking-wider" data-astro-cid-cexstz2y> <span class="text-teal" data-astro-cid-cexstz2y>↵</span> Hits ENTER to initialize connection
</p> <button type="submit" id="submit-btn" class="submit-btn inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-teal text-charcoal font-poppins text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-teal-dark hover:shadow-lg hover:shadow-teal/20" data-astro-cid-cexstz2y>
Send Message
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cexstz2y> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-astro-cid-cexstz2y></path> </svg> </button> </div> </form> <!-- Success Message --> <div id="success-message" class="hidden mt-8 p-6 rounded-lg border border-teal/20 bg-teal/5 text-center" data-astro-cid-cexstz2y> <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal/20 text-teal mb-4" data-astro-cid-cexstz2y> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cexstz2y> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-astro-cid-cexstz2y></path> </svg> </div> <p class="text-offwhite font-poppins font-medium mb-2" data-astro-cid-cexstz2y>Transmission Successful</p> <p class="text-muted text-sm font-lora" data-astro-cid-cexstz2y>Your message has been queued. Arjun will respond shortly.</p> <button id="reset-form" class="mt-4 text-xs font-mono text-teal uppercase tracking-widest hover:underline" data-astro-cid-cexstz2y>
[ Send Another ]
</button> </div> </div> </div> </div> </section> ${renderScript($$result, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/Chat.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/Chat.astro", void 0);

const prerender = false;
const $$Chat = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact \u2014 Arjun Jayesh" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pt-20 min-h-screen flex items-center justify-center"> ${renderComponent($$result2, "ChatSection", $$Chat$1, {})} </div> ` })}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/chat.astro", void 0);

const $$file = "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/chat.astro";
const $$url = "/chat";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Chat,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
