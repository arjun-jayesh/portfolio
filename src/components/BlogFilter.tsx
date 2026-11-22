import { useState } from "preact/hooks";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

type Category = "All" | "Software" | "Research" | "Automation";
const categories: Category[] = ["All", "Software", "Research", "Automation"];

export default function BlogFilter({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div class="w-full">
      {/* Swiss Category Pills */}
      <div class="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[rgba(244,243,239,0.14)]">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            class={`touch-target px-4 py-2 rounded-[4px] text-xs font-mono uppercase tracking-wider transition-colors ${
              active === cat
                ? "bg-[#D9261C] text-white font-semibold shadow-md"
                : "bg-[#181818] text-[rgba(244,243,239,0.75)] hover:text-white hover:bg-[#222222] border border-[rgba(244,243,239,0.12)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Articles */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <article
            key={post.slug}
            class="bg-[#111111] border border-[rgba(244,243,239,0.14)] hover:border-[#D9261C] rounded-[6px] p-6 flex flex-col justify-between transition-colors group"
          >
            <div>
              <div class="flex items-center justify-between font-mono text-[12px] mb-3">
                <span class="text-[#FF5A52] uppercase font-semibold">
                  {post.category}
                </span>
                <span class="text-[rgba(244,243,239,0.55)] tabular-nums">
                  {post.date}
                </span>
              </div>

              <h2 class="text-xl font-bold text-[#FFFFFF] tracking-tight group-hover:text-[#FF5A52] transition-colors mb-3 leading-snug">
                <a href={`/blog/${post.slug}`}>
                  {post.title}
                </a>
              </h2>

              <p class="text-xs sm:text-sm text-[rgba(244,243,239,0.72)] leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div class="pt-6 mt-6 border-t border-[rgba(244,243,239,0.1)]">
              <a
                href={`/blog/${post.slug}`}
                class="touch-target inline-flex items-center gap-1.5 text-xs font-mono text-[#F4F3EF] group-hover:text-white hover:underline underline-offset-4"
              >
                <span>Read Technical Dossier</span>
                <span>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div class="p-12 text-center bg-[#111111] border border-[rgba(244,243,239,0.12)] rounded-[6px]">
          <p class="font-mono text-xs text-[rgba(244,243,239,0.6)]">
            No entries logged under {active}.
          </p>
        </div>
      )}
    </div>
  );
}
