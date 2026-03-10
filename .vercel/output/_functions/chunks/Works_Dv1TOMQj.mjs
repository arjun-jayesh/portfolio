import { f as createComponent, m as maybeRenderHead, k as renderComponent, l as renderScript, r as renderTemplate } from './astro/server_xv9ZGpXE.mjs';
import 'piccolore';
import { useState } from 'preact/hooks';
import { jsxs, jsx } from 'preact/jsx-runtime';

const works = [{
  id: 1,
  title: "Distributed Task Scheduler",
  description: "A fault-tolerant job orchestration engine built for high-throughput workloads with deterministic scheduling guarantees.",
  category: "Software"
}, {
  id: 2,
  title: "Constraint Propagation in NP-Hard Domains",
  description: "Research into arc-consistency algorithms applied to large-scale constraint satisfaction problems.",
  category: "Research"
}, {
  id: 3,
  title: "CI/CD Pipeline Generator",
  description: "Automated infrastructure-as-code tool that generates deployment pipelines from declarative YAML configs.",
  category: "Automation"
}, {
  id: 4,
  title: "Real-Time Telemetry Dashboard",
  description: "Low-latency monitoring platform ingesting millions of data points per second with sub-second rendering.",
  category: "Software"
}, {
  id: 5,
  title: "Formal Verification of State Machines",
  description: "Model checking techniques for verifying correctness properties of concurrent finite-state automata.",
  category: "Research"
}, {
  id: 6,
  title: "Self-Healing Infrastructure Agent",
  description: "An autonomous agent that monitors, diagnoses, and remediates production incidents using rule-based heuristics.",
  category: "Automation"
}, {
  id: 7,
  title: "Graph-Based Dependency Resolver",
  description: "Topological sort-based resolver for complex dependency graphs with cycle detection and conflict resolution.",
  category: "Software"
}, {
  id: 8,
  title: "Entropy Analysis in Chaotic Systems",
  description: "Quantifying information entropy across non-linear dynamical systems using Lyapunov exponent estimation.",
  category: "Research"
}];

const categories = ["All", "Software", "Research", "Automation"];
const categoryColors = {
  Software: "#2A9D8F",
  Research: "#E9C46A",
  Automation: "#E76F51"
};
function WorksFilter() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? works : works.filter((w) => w.category === active);
  return jsxs("div", {
    children: [jsx("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem",
        justifyContent: "center",
        marginBottom: "3rem",
        position: "sticky",
        top: "4.5rem",
        zIndex: 20,
        paddingTop: "1rem",
        paddingBottom: "1rem",
        background: "linear-gradient(to bottom, #1E1E1E 60%, transparent)"
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
    }), jsxs("div", {
      style: {
        position: "relative",
        maxWidth: "900px",
        margin: "0 auto"
      },
      children: [jsx("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "2px",
          borderLeft: "2px dashed rgba(42,157,143,0.3)",
          transform: "translateX(-1px)"
        },
        class: "hidden md:block"
      }), jsx("div", {
        style: {
          position: "absolute",
          left: "20px",
          top: 0,
          bottom: 0,
          width: "2px",
          borderLeft: "2px dashed rgba(42,157,143,0.3)"
        },
        class: "block md:hidden"
      }), jsx("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem"
        },
        children: filtered.map((item, i) => {
          const isLeft = i % 2 === 0;
          return jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: isLeft ? "flex-start" : "flex-end",
              position: "relative",
              animation: "fadeSlideIn 0.5s ease forwards",
              animationDelay: `${i * 0.08}s`,
              opacity: 0
            },
            class: "timeline-item",
            children: [jsx("div", {
              style: {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "#2A9D8F",
                border: "3px solid #1E1E1E",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
                boxShadow: "0 0 12px rgba(42,157,143,0.4)"
              },
              class: "hidden md:block"
            }), jsx("div", {
              style: {
                position: "absolute",
                left: "20px",
                top: "50%",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#2A9D8F",
                border: "3px solid #1E1E1E",
                transform: "translate(-50%, -50%)",
                zIndex: 2
              },
              class: "block md:hidden"
            }), jsx("div", {
              style: {
                position: "absolute",
                top: "50%",
                width: "calc(50% - 150px)",
                height: "1px",
                borderTop: "1px dashed rgba(42,157,143,0.3)",
                ...isLeft ? {
                  left: "calc(50% + 7px)"
                } : {
                  right: "calc(50% + 7px)"
                }
              },
              class: "hidden md:block"
            }), jsxs("div", {
              style: {
                width: "calc(50% - 60px)",
                padding: "1.5rem",
                borderRadius: "1rem",
                border: "1px solid rgba(245,245,247,0.08)",
                background: "linear-gradient(135deg, rgba(42,42,42,0.6), rgba(30,30,30,0.8))",
                backdropFilter: "blur(8px)",
                transition: "all 0.3s ease",
                ...isLeft ? {
                  marginRight: "auto"
                } : {
                  marginLeft: "auto"
                }
              },
              class: "hidden md:block works-card",
              children: [jsx("div", {
                style: {
                  display: "inline-block",
                  fontSize: "0.65rem",
                  fontFamily: '"Roboto Mono", monospace',
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  marginBottom: "0.75rem",
                  color: categoryColors[item.category],
                  border: `1px solid ${categoryColors[item.category]}33`,
                  background: `${categoryColors[item.category]}15`
                },
                children: item.category
              }), jsx("h3", {
                style: {
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#F5F5F7",
                  marginBottom: "0.5rem",
                  margin: "0 0 0.5rem 0"
                },
                children: item.title
              }), jsx("p", {
                style: {
                  fontFamily: '"Lora", serif',
                  fontSize: "0.875rem",
                  color: "#9CA3AF",
                  lineHeight: 1.6,
                  margin: 0
                },
                children: item.description
              })]
            }), jsxs("div", {
              style: {
                marginLeft: "44px",
                padding: "1.25rem",
                borderRadius: "0.75rem",
                border: "1px solid rgba(245,245,247,0.08)",
                background: "linear-gradient(135deg, rgba(42,42,42,0.6), rgba(30,30,30,0.8))",
                flex: 1
              },
              class: "block md:hidden",
              children: [jsx("div", {
                style: {
                  display: "inline-block",
                  fontSize: "0.6rem",
                  fontFamily: '"Roboto Mono", monospace',
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "9999px",
                  marginBottom: "0.5rem",
                  color: categoryColors[item.category],
                  border: `1px solid ${categoryColors[item.category]}33`,
                  background: `${categoryColors[item.category]}15`
                },
                children: item.category
              }), jsx("h3", {
                style: {
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#F5F5F7",
                  margin: "0 0 0.4rem 0"
                },
                children: item.title
              }), jsx("p", {
                style: {
                  fontFamily: '"Lora", serif',
                  fontSize: "0.8rem",
                  color: "#9CA3AF",
                  lineHeight: 1.5,
                  margin: 0
                },
                children: item.description
              })]
            })]
          }, item.id);
        })
      })]
    }), jsx("style", {
      children: `
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .works-card:hover {
          border-color: rgba(42,157,143,0.3) !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(42,157,143,0.1);
        }
      `
    })]
  });
}

const $$Works = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="works" class="section-padding"> <div class="max-w-6xl mx-auto"> <!-- Section Header --> <div class="text-center mb-12 works-header" style="opacity:0; transform:translateY(20px);"> <span class="font-mono text-xs text-teal uppercase tracking-[0.3em] block mb-3">Portfolio</span> <h2 class="font-poppins text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite">
Selected <span class="text-teal">Works</span> </h2> <div class="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-teal to-transparent"></div> </div> <!-- Preact Island --> ${renderComponent($$result, "WorksFilter", WorksFilter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/WorksFilter", "client:component-export": "default" })} </div> </section> ${renderScript($$result, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/Works.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Arjun/Desktop/New folder/projects/portolio/src/components/Works.astro", void 0);

export { $$Works as $ };
