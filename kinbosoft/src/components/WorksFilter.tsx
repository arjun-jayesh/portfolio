import { useState } from "preact/hooks";
import { works, type WorkItem } from "../data/works";

type Category =
  | "All"
  | "Fundamental research & architectures"
  | "AI / cognition / scientific systems"
  | "Infrastructure & developer platforms"
  | "High-complexity applications"
  | "Product platforms"
  | "Specialized tools & creative software"
  | "Experiments, simulations & games"
  | "Commercial websites & deployments";

const categories: Category[] = [
  "All",
  "Fundamental research & architectures",
  "AI / cognition / scientific systems",
  "Infrastructure & developer platforms",
  "High-complexity applications",
  "Product platforms",
  "Specialized tools & creative software",
  "Experiments, simulations & games",
  "Commercial websites & deployments"
];

export default function WorksFilter() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? works : works.filter((w) => w.category === active);

  return (
    <div class="w-full">
      {/* Swiss Filter Pills */}
      <div class="flex flex-wrap items-center gap-1.5 mb-8 pb-4 border-b border-[rgba(244,243,239,0.14)]">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            class={`touch-target px-3.5 py-1.5 rounded-[4px] text-xs font-mono uppercase tracking-wider transition-colors ${
              active === cat
                ? "bg-[#D9261C] text-white font-semibold"
                : "bg-[#181818] text-[rgba(244,243,239,0.75)] hover:text-white hover:bg-[#222222] border border-[rgba(244,243,239,0.12)]"
            }`}
          >
            {cat === "Fundamental research & architectures" ? "Research & Arch" : cat}
          </button>
        ))}
      </div>

      {/* Grid of Work Items */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            class="bg-[#111111] border border-[rgba(244,243,239,0.14)] hover:border-[#D9261C] rounded-[6px] p-5 flex flex-col justify-between transition-colors group"
          >
            <div>
              <div class="flex items-center justify-between font-mono text-[12px] text-[#FF5A52] mb-2">
                <span>INDEX.{String(item.id).padStart(3, "0")}</span>
                <span class="text-[rgba(244,243,239,0.5)] truncate max-w-[140px] text-right">
                  {item.category}
                </span>
              </div>

              <h3 class="text-base font-semibold text-[#FFFFFF] group-hover:text-[#FF5A52] transition-colors mb-2">
                {item.title}
              </h3>

              <p class="text-xs text-[rgba(244,243,239,0.7)] leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {item.stack && (
              <div class="pt-3 border-t border-[rgba(244,243,239,0.1)] font-mono text-[11px] text-[rgba(244,243,239,0.6)]">
                Stack: {item.stack}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
