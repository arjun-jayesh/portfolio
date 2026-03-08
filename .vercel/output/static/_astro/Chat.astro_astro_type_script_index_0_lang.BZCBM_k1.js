import{g as o}from"./index.CB87Sc6I.js";import{S as a}from"./ScrollTrigger.Cv03IO65.js";o.registerPlugin(a);o.to(".chat-header",{scrollTrigger:{trigger:".chat-header",start:"top 85%"},opacity:1,y:0,duration:.8,ease:"power2.out"});o.to(".chat-widget",{scrollTrigger:{trigger:".chat-widget",start:"top 85%"},opacity:1,y:0,duration:.8,ease:"power2.out",delay:.2});const e=document.getElementById("contact-form"),s=document.getElementById("success-message"),t=document.getElementById("submit-btn"),n=document.getElementById("reset-form");e?.addEventListener("submit",async r=>{r.preventDefault(),t&&(t.innerHTML,t.disabled=!0,t.innerHTML=`
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-charcoal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      `),await new Promise(i=>setTimeout(i,1500)),o.to(e,{opacity:0,y:-20,duration:.5,onComplete:()=>{e?.classList.add("hidden"),s?.classList.remove("hidden"),o.fromTo(s,{opacity:0,y:20},{opacity:1,y:0,duration:.5})}})});n?.addEventListener("click",()=>{o.to(s,{opacity:0,y:20,duration:.5,onComplete:()=>{s?.classList.add("hidden"),e&&(e.classList.remove("hidden"),e.reset()),t&&(t.disabled=!1,t.innerHTML=`
            Send Message
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          `),o.fromTo(e,{opacity:0,y:-20},{opacity:1,y:0,duration:.5})}})});
