import { f as createComponent, m as maybeRenderHead, k as renderComponent, n as renderScript, r as renderTemplate } from '../chunks/astro/server_CgrrVIQx.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DCdCGL1q.mjs';
import { a as supabase } from '../chunks/supabase_C2AHM8W4.mjs';
import { useState } from 'preact/hooks';
import { jsxs, jsx } from 'preact/jsx-runtime';
export { renderers } from '../renderers.mjs';

const categories = ["All", "Software", "Research", "Automation"];
const categoryColors = {
  Software: "#2A9D8F",
  Research: "#E9C46A",
  Automation: "#E76F51"
};
function BlogFilter({
  posts
}) {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);
  return jsxs("div", {
    children: [jsx("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem",
        justifyContent: "center",
        marginBottom: "3rem"
      },
      children: categories.map((cat) => jsx("button", {
        onClick: () => setActive(cat),
        style: {
          fontFamily: '"Poppins", sans-serif',
          fontSize: "0.75rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          padding: "0.5rem 1.5rem",
          borderRadius: "9999px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          border: active === cat ? "2px solid #2A9D8F" : "2px solid rgba(245,245,247,0.15)",
          background: active === cat ? "rgba(42,157,143,0.15)" : "transparent",
          color: active === cat ? "#2A9D8F" : "#9CA3AF"
        },
        children: cat
      }, cat))
    }), jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem"
      },
      children: filtered.map((post, i) => jsxs("article", {
        style: {
          borderRadius: "1rem",
          border: "1px solid rgba(245,245,247,0.08)",
          background: "linear-gradient(145deg, rgba(42,42,42,0.6), rgba(30,30,30,0.9))",
          overflow: "hidden",
          transition: "all 0.3s ease",
          animation: "fadeSlideIn 0.4s ease forwards",
          animationDelay: `${i * 0.08}s`,
          opacity: 0
        },
        class: "blog-card",
        children: [jsx("div", {
          style: {
            height: "3px",
            background: `linear-gradient(to right, ${categoryColors[post.category]}, transparent)`
          }
        }), jsxs("div", {
          style: {
            padding: "1.5rem"
          },
          children: [jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.75rem"
            },
            children: [jsx("span", {
              style: {
                fontSize: "0.6rem",
                fontFamily: '"Roboto Mono", monospace',
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "0.2rem 0.6rem",
                borderRadius: "9999px",
                color: categoryColors[post.category],
                border: `1px solid ${categoryColors[post.category]}33`,
                background: `${categoryColors[post.category]}15`
              },
              children: post.category
            }), jsx("span", {
              style: {
                fontFamily: '"Roboto Mono", monospace',
                fontSize: "0.65rem",
                color: "#6B7280"
              },
              children: post.date
            })]
          }), jsx("h3", {
            style: {
              fontFamily: '"Poppins", sans-serif',
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#F5F5F7",
              margin: "0 0 0.5rem 0",
              lineHeight: 1.3
            },
            children: post.title
          }), jsx("p", {
            style: {
              fontFamily: '"Lora", serif',
              fontSize: "0.85rem",
              color: "#9CA3AF",
              lineHeight: 1.6,
              margin: "0 0 1rem 0",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            },
            children: post.excerpt
          }), jsxs("a", {
            href: `/blog/${post.slug}`,
            style: {
              fontFamily: '"Poppins", sans-serif',
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "#2A9D8F",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              transition: "all 0.3s ease",
              textDecoration: "none"
            },
            onMouseEnter: (e) => e.currentTarget.style.gap = "0.6rem",
            onMouseLeave: (e) => e.currentTarget.style.gap = "0.3rem",
            children: ["Read more", jsx("svg", {
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              children: jsx("path", {
                d: "M5 12h14M12 5l7 7-7 7"
              })
            })]
          })]
        })]
      }, post.slug))
    }), jsx("style", {
      children: `
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .blog-card:hover {
          border-color: rgba(42,157,143,0.25) !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
      `
    })]
  });
}

const $$BlogSection = createComponent(async ($$result, $$props, $$slots) => {
  let allPosts = [];
  if (!supabase) {
    console.error("Supabase client not initialized. Check your environment variables.");
  } else {
    const { data, error } = await supabase.from("posts").select("*").order("date", { ascending: false });
    if (error) console.error("Supabase error fetching posts:", error);
    allPosts = data || [];
  }
  const posts = allPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }));
  return renderTemplate`${maybeRenderHead()}<section id="blog" class="section-padding bg-charcoal-dark/30"> <div class="max-w-6xl mx-auto"> <!-- Section Header --> <div class="text-center mb-12 blog-header" style="opacity:0; transform:translateY(20px);"> <span class="font-mono text-xs text-teal uppercase tracking-[0.3em] block mb-3">Journal</span> <h2 class="font-poppins text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite">
Thoughts & <span class="text-teal">Explorations</span> </h2> <div class="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-teal to-transparent"></div> </div> <!-- Preact Island --> ${renderComponent($$result, "BlogFilter", BlogFilter, { "client:load": true, "posts": posts, "client:component-hydration": "load", "client:component-path": "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/BlogFilter", "client:component-export": "default" })} </div> </section> ${renderScript($$result, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/BlogSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/BlogSection.astro", void 0);

const prerender = false;
const $$Blog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog \u2014 Arjun Jayesh" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pt-20"> ${renderComponent($$result2, "BlogSection", $$BlogSection, {})} </div> ` })}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/blog.astro", void 0);

const $$file = "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Blog,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
