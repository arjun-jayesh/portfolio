import { useRef } from "preact/hooks";

interface AutoCarouselProps {
  items: string[];
  speed?: number;
}

export default function AutoCarousel({ items, speed = 28 }: AutoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!items || items.length === 0) return null;

  const displayItems = [...items, ...items];

  return (
    <div class="overflow-hidden w-full py-6 relative">
      <div
        ref={scrollRef}
        class="flex gap-4 sm:gap-6 whitespace-nowrap animate-marquee"
        style={{
          width: "max-content",
          animationDuration: `${speed}s`,
        }}
      >
        {displayItems.map((item, i) => {
          const figIndex = String((i % items.length) + 1).padStart(2, "0");
          return (
            <div
              key={i}
              class="flex-shrink-0 w-[280px] sm:w-[320px] rounded-[6px] overflow-hidden border border-[rgba(244,243,239,0.14)] bg-[#111111] shadow-2xl hover:border-[#D9261C] transition-colors duration-200 group"
            >
              {/* Precision Swiss Header */}
              <div class="px-3.5 py-2 border-b border-[rgba(244,243,239,0.1)] bg-[#181818] flex items-center justify-between font-mono text-[12px] text-[rgba(244,243,239,0.7)] select-none">
                <span>FIG. {figIndex}</span>
                <span class="text-[#FF5A52] font-semibold">// PRODUCTION ARCHITECTURE</span>
              </div>

              {/* Viewport Screen Content */}
              <div class="h-[460px] sm:h-[500px] bg-[#050505] overflow-hidden">
                <img
                  src={item}
                  alt={`Architecture Specification Fig ${figIndex}`}
                  class="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="320"
                  height="500"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Hairline Edge Fades */}
      <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
      <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none !important;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
}
