import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_xv9ZGpXE.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BiNcLr2s.mjs';
import { useState } from 'preact/hooks';
import { jsxs, jsx } from 'preact/jsx-runtime';
export { renderers } from '../renderers.mjs';

const PROJECT_TYPES = [{
  value: "prototype",
  label: "Prototype / MVP"
}, {
  value: "startup_website",
  label: "Startup Website"
}, {
  value: "web_app",
  label: "Web Application"
}, {
  value: "mobile_app",
  label: "Mobile App"
}, {
  value: "ai_ml",
  label: "AI / ML Solution"
}, {
  value: "automation",
  label: "Automation System"
}, {
  value: "other",
  label: "Other"
}];
const BUDGETS = ["Under $500", "$500 - $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000+", "Let's discuss"];
const TIMELINES = ["1-2 Weeks", "1 Month", "2-3 Months", "3-6 Months", "6+ Months", "Flexible"];
const initialForm = {
  name: "",
  email: "",
  phone: "",
  project_type: "",
  budget: "",
  timeline: "",
  idea_title: "",
  idea_description: "",
  target_audience: "",
  features: "",
  portfolio_url: "",
  linkedin: "",
  additional_notes: ""
};
function IdeasForm() {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus("idle");
    setErrorMsg("");
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm(initialForm);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
    setSending(false);
  }
  if (status === "success") {
    return jsxs("div", {
      class: "text-center py-20 space-y-6 animate-fadeIn",
      children: [jsx("div", {
        class: "w-20 h-20 mx-auto rounded-full bg-teal/20 flex items-center justify-center",
        children: jsx("svg", {
          class: "w-10 h-10 text-teal",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: jsx("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M5 13l4 4L19 7"
          })
        })
      }), jsx("h3", {
        class: "font-poppins text-2xl font-bold text-offwhite",
        children: "Idea Received!"
      }), jsx("p", {
        class: "font-lora text-muted max-w-md mx-auto",
        children: "Your submission has been logged. I'll review it and get back to you within 24-48 hours."
      }), jsx("button", {
        onClick: () => setStatus("idle"),
        class: "mt-4 px-8 py-3 border border-teal/30 text-teal font-mono text-xs uppercase tracking-widest rounded-full hover:bg-teal hover:text-charcoal transition-all",
        children: "Submit Another Idea"
      })]
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    class: "space-y-8 animate-fadeIn",
    children: [status === "error" && jsx("div", {
      class: "p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-mono text-xs",
      children: errorMsg
    }), jsxs("div", {
      class: "space-y-2",
      children: [jsxs("h3", {
        class: "font-poppins text-xs uppercase tracking-[0.3em] text-teal flex items-center gap-2",
        children: [jsx("span", {
          class: "w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal text-[10px] font-bold",
          children: "1"
        }), "About You"]
      }), jsxs("div", {
        class: "grid md:grid-cols-2 gap-4 pt-2",
        children: [jsx(FormField, {
          label: "Full Name *",
          value: form.name,
          onChange: (v) => updateField("name", v),
          required: true,
          placeholder: "John Doe"
        }), jsx(FormField, {
          label: "Email *",
          value: form.email,
          onChange: (v) => updateField("email", v),
          type: "email",
          required: true,
          placeholder: "john@example.com"
        }), jsx(FormField, {
          label: "Phone",
          value: form.phone,
          onChange: (v) => updateField("phone", v),
          placeholder: "+1 (555) 000-0000"
        }), jsx(FormField, {
          label: "LinkedIn Profile",
          value: form.linkedin,
          onChange: (v) => updateField("linkedin", v),
          placeholder: "https://linkedin.com/in/..."
        })]
      }), jsx("div", {
        class: "pt-2",
        children: jsx(FormField, {
          label: "Portfolio / Website URL",
          value: form.portfolio_url,
          onChange: (v) => updateField("portfolio_url", v),
          placeholder: "https://yourportfolio.com"
        })
      })]
    }), jsxs("div", {
      class: "space-y-2",
      children: [jsxs("h3", {
        class: "font-poppins text-xs uppercase tracking-[0.3em] text-teal flex items-center gap-2",
        children: [jsx("span", {
          class: "w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal text-[10px] font-bold",
          children: "2"
        }), "What Do You Need?"]
      }), jsx("div", {
        class: "grid grid-cols-2 md:grid-cols-4 gap-3 pt-2",
        children: PROJECT_TYPES.map((type) => jsx("button", {
          type: "button",
          onClick: () => updateField("project_type", type.value),
          class: `p-3 rounded-lg border text-xs font-mono uppercase tracking-wider transition-all ${form.project_type === type.value ? "bg-teal/20 border-teal text-teal" : "bg-charcoal-dark border-charcoal-light/30 text-muted hover:border-teal/50"}`,
          children: type.label
        }, type.value))
      })]
    }), jsxs("div", {
      class: "space-y-2",
      children: [jsxs("h3", {
        class: "font-poppins text-xs uppercase tracking-[0.3em] text-teal flex items-center gap-2",
        children: [jsx("span", {
          class: "w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal text-[10px] font-bold",
          children: "3"
        }), "Your Idea"]
      }), jsxs("div", {
        class: "space-y-4 pt-2",
        children: [jsx(FormField, {
          label: "Idea / Project Title *",
          value: form.idea_title,
          onChange: (v) => updateField("idea_title", v),
          required: true,
          placeholder: "e.g. AI-Powered Recipe Generator"
        }), jsx(FormTextarea, {
          label: "Describe Your Idea *",
          value: form.idea_description,
          onChange: (v) => updateField("idea_description", v),
          required: true,
          placeholder: "Explain your concept, the problem it solves, and your vision...",
          rows: 5
        }), jsx(FormField, {
          label: "Target Audience",
          value: form.target_audience,
          onChange: (v) => updateField("target_audience", v),
          placeholder: "e.g. Small business owners, Students, Healthcare..."
        }), jsx(FormTextarea, {
          label: "Key Features / Requirements",
          value: form.features,
          onChange: (v) => updateField("features", v),
          placeholder: "List the main features you'd like to see...",
          rows: 3
        })]
      })]
    }), jsxs("div", {
      class: "space-y-2",
      children: [jsxs("h3", {
        class: "font-poppins text-xs uppercase tracking-[0.3em] text-teal flex items-center gap-2",
        children: [jsx("span", {
          class: "w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal text-[10px] font-bold",
          children: "4"
        }), "Budget & Timeline"]
      }), jsxs("div", {
        class: "grid md:grid-cols-2 gap-6 pt-2",
        children: [jsxs("div", {
          class: "space-y-2",
          children: [jsx("label", {
            class: "block font-mono text-[10px] text-muted uppercase tracking-widest",
            children: "Estimated Budget"
          }), jsx("div", {
            class: "grid grid-cols-2 gap-2",
            children: BUDGETS.map((b) => jsx("button", {
              type: "button",
              onClick: () => updateField("budget", b),
              class: `p-2 rounded border text-[10px] font-mono tracking-wider transition-all ${form.budget === b ? "bg-teal/20 border-teal text-teal" : "bg-charcoal-dark border-charcoal-light/30 text-muted hover:border-teal/50"}`,
              children: b
            }, b))
          })]
        }), jsxs("div", {
          class: "space-y-2",
          children: [jsx("label", {
            class: "block font-mono text-[10px] text-muted uppercase tracking-widest",
            children: "Expected Timeline"
          }), jsx("div", {
            class: "grid grid-cols-2 gap-2",
            children: TIMELINES.map((t) => jsx("button", {
              type: "button",
              onClick: () => updateField("timeline", t),
              class: `p-2 rounded border text-[10px] font-mono tracking-wider transition-all ${form.timeline === t ? "bg-teal/20 border-teal text-teal" : "bg-charcoal-dark border-charcoal-light/30 text-muted hover:border-teal/50"}`,
              children: t
            }, t))
          })]
        })]
      })]
    }), jsxs("div", {
      class: "space-y-2",
      children: [jsxs("h3", {
        class: "font-poppins text-xs uppercase tracking-[0.3em] text-teal flex items-center gap-2",
        children: [jsx("span", {
          class: "w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal text-[10px] font-bold",
          children: "5"
        }), "Anything Else?"]
      }), jsx(FormTextarea, {
        label: "Additional Notes",
        value: form.additional_notes,
        onChange: (v) => updateField("additional_notes", v),
        placeholder: "Any references, inspirations, competitors, or special requirements...",
        rows: 3
      })]
    }), jsx("button", {
      type: "submit",
      disabled: sending || !form.name || !form.email || !form.project_type || !form.idea_title || !form.idea_description,
      class: "w-full py-4 bg-teal text-charcoal font-poppins font-bold uppercase tracking-widest rounded-lg hover:shadow-[0_0_30px_rgba(42,157,143,0.3)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed",
      children: sending ? "TRANSMITTING..." : "[ Submit Idea ]"
    })]
  });
}
function FormField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = ""
}) {
  return jsxs("div", {
    class: "space-y-1",
    children: [jsx("label", {
      class: "block font-mono text-[10px] text-muted uppercase tracking-widest",
      children: label
    }), jsx("input", {
      type,
      value,
      required,
      placeholder,
      onInput: (e) => onChange(e.target.value),
      class: "w-full bg-charcoal-dark border border-charcoal-light/50 rounded-lg px-4 py-3 text-offwhite font-poppins text-sm focus:border-teal outline-none transition-all placeholder:text-charcoal-light"
    })]
  });
}
function FormTextarea({
  label,
  value,
  onChange,
  required = false,
  placeholder = "",
  rows = 4
}) {
  return jsxs("div", {
    class: "space-y-1",
    children: [jsx("label", {
      class: "block font-mono text-[10px] text-muted uppercase tracking-widest",
      children: label
    }), jsx("textarea", {
      value,
      required,
      placeholder,
      rows,
      onInput: (e) => onChange(e.target.value),
      class: "w-full bg-charcoal-dark border border-charcoal-light/50 rounded-lg px-4 py-3 text-offwhite font-lora text-sm focus:border-teal outline-none transition-all resize-y placeholder:text-charcoal-light"
    })]
  });
}

const prerender = false;
const $$Ideas = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Submit an Idea \u2014 Arjun Jayesh", "description": "Have a startup idea or project concept? Submit it here and let's build something extraordinary together." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section-padding max-w-4xl mx-auto mt-16 mb-24"> <!-- Header --> <div class="text-center mb-12"> <span class="font-mono text-xs text-teal uppercase tracking-[0.3em] block mb-3">Idea Lab</span> <h1 class="font-poppins text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite mb-4">
Got an <span class="text-teal">Idea</span>?
</h1> <p class="font-lora text-muted max-w-2xl mx-auto leading-relaxed">
Whether it's a startup concept, a prototype you want built, or a website for your business — 
        share your vision and I'll turn it into reality. Fill out the details below and I'll get back to you.
</p> <div class="mt-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-teal to-transparent"></div> </div> <!-- Form Island --> <div class="bg-charcoal-light/5 border border-charcoal-light/20 rounded-2xl p-6 sm:p-10 backdrop-blur-sm"> ${renderComponent($$result2, "IdeasForm", IdeasForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/IdeasForm", "client:component-export": "default" })} </div> </section> ` })}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/ideas.astro", void 0);

const $$file = "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/ideas.astro";
const $$url = "/ideas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Ideas,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
