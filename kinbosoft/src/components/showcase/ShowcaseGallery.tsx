import { useState } from "preact/hooks";

export interface ShowcaseItem {
  id?: string | number;
  title: string;
  tagline?: string;
  description: string;
  category: string;
  image_url?: string;
  live_url?: string;
  repo_url?: string;
  tech_stack?: string[] | string;
  metrics?: string;
  featured?: boolean;
}

interface Props {
  items?: ShowcaseItem[];
  initialProjects?: ShowcaseItem[];
}

export default function ShowcaseGallery({ items, initialProjects }: Props) {
  const sourceItems = items || initialProjects || [];
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");

  const derivedDomains = Array.from(
    new Set(sourceItems.map((i) => (i.category || "Systems").toUpperCase()))
  );
  const domains = ["ALL", ...derivedDomains];

  const filteredItems =
    selectedDomain === "ALL"
      ? sourceItems
      : sourceItems.filter((i) => (i.category || "Systems").toUpperCase() === selectedDomain);

  return (
    <div class="w-full space-y-8">
      {/* Domain Filter Matrix */}
      <div class="flex flex-col sm:flex-row sm:items-end justify-between border-b border-offwhite/15 pb-4 gap-4">
        <div>
          <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-teal block mb-2">
            FILTER BY ENGINEERING DOMAIN
          </span>
          <div class="flex flex-wrap gap-1.5">
            {domains.map((domain, idx) => {
              const active = selectedDomain === domain;
              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => setSelectedDomain(domain)}
                  class={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm border transition cursor-pointer ${
                    active
                      ? "border-teal bg-teal/15 text-offwhite font-semibold"
                      : "border-offwhite/12 bg-transparent text-muted hover:border-offwhite/30 hover:text-offwhite"
                  }`}
                >
                  <span class="text-teal mr-1.5">0{idx + 1}</span>
                  {domain}
                </button>
              );
            })}
          </div>
        </div>

        <div class="font-mono text-xs text-muted tabular-nums">
          INDEXED SYSTEMS: <span class="text-offwhite font-semibold">{filteredItems.length}</span>
        </div>
      </div>

      {/* Asymmetric Hairline Project Ledger */}
      {filteredItems.length === 0 ? (
        <div class="p-12 border border-dashed border-offwhite/15 text-center font-mono text-xs text-muted">
          NO SYSTEMS LOGGED UNDER THIS CLASSIFICATION.
        </div>
      ) : (
        <div class="divide-y divide-offwhite/12 border-t border-b border-offwhite/12">
          {filteredItems.map((item, idx) => {
            const indexCode = String(idx + 1).padStart(2, "0");
            const stack = Array.isArray(item.tech_stack)
              ? item.tech_stack
              : typeof item.tech_stack === "string"
              ? item.tech_stack.split(",").map((s) => s.trim()).filter(Boolean)
              : [];

            return (
              <article
                key={item.id || item.title}
                class="py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start group"
              >
                {/* Col 1-2: Reference Number & Classification */}
                <div class="lg:col-span-2 flex lg:flex-col justify-between lg:justify-start gap-2 font-mono text-xs">
                  <span class="text-teal font-semibold">SYS //{indexCode}</span>
                  <span class="text-muted uppercase tracking-wider text-[11px]">
                    {item.category || "Architecture"}
                  </span>
                  {item.metrics && (
                    <span class="mt-2 inline-block px-2 py-0.5 border border-teal/40 bg-teal/10 text-teal text-[10px]">
                      {item.metrics}
                    </span>
                  )}
                </div>

                {/* Col 3-7: System Title, Thesis & Stack */}
                <div class="lg:col-span-6 space-y-3">
                  <h3 class="font-display text-3xl sm:text-4xl text-offwhite tracking-tight leading-none group-hover:text-teal transition-colors">
                    {item.title}
                  </h3>
                  {item.tagline && (
                    <div class="font-poppins text-xs uppercase tracking-widest text-muted font-medium">
                      {item.tagline}
                    </div>
                  )}
                  <p class="font-lora text-sm sm:text-base text-muted leading-relaxed">
                    {item.description}
                  </p>

                  {stack.length > 0 && (
                    <div class="pt-2 flex flex-wrap gap-1.5">
                      {stack.map((tech) => (
                        <span
                          key={tech}
                          class="px-2 py-0.5 bg-charcoal-light border border-offwhite/10 font-mono text-[10px] uppercase tracking-wider text-offwhite/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div class="pt-3 flex flex-wrap items-center gap-4 font-mono text-xs">
                    {item.live_url && (
                      <a
                        href={item.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5 text-teal hover:underline uppercase tracking-widest"
                      >
                        <span>Inspect Production</span>
                        <span>&nearr;</span>
                      </a>
                    )}
                    {item.repo_url && (
                      <a
                        href={item.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5 text-muted hover:text-offwhite uppercase tracking-widest"
                      >
                        <span>Source Repository</span>
                        <span>&nearr;</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Col 8-12: Precision Hardware Frame Preview */}
                <div class="lg:col-span-4">
                  {item.image_url ? (
                    <div class="border border-offwhite/15 bg-charcoal-dark rounded-sm overflow-hidden">
                      <div class="px-3 py-1.5 border-b border-offwhite/10 flex items-center justify-between font-mono text-[10px] text-muted">
                        <span>FIG. {indexCode}</span>
                        <span>{item.title.slice(0, 22).toUpperCase()}</span>
                      </div>
                      <img
                        src={item.image_url}
                        alt={item.title}
                        loading="lazy"
                        class="w-full h-48 sm:h-56 object-cover"
                      />
                    </div>
                  ) : (
                    <div class="h-48 border border-dashed border-offwhite/15 bg-charcoal-light/20 rounded-sm p-6 flex flex-col justify-between font-mono text-xs text-muted">
                      <span class="text-teal">SPECIFICATION ONLY</span>
                      <span>CLOSED-SOURCE ENTERPRISE DEPLOYMENT</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
