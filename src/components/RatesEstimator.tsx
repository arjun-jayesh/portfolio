import { useState, useId } from 'preact/hooks';

interface RateItem {
  name: string;
  inr: number;
  usd: number;
  customPriceText?: string;
  desc: string;
}

interface RateCategory {
  id: string;
  title: string;
  items: RateItem[];
}

const RATE_CATEGORIES: RateCategory[] = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    items: [
      { name: 'Basic Static', inr: 7000, usd: 95, desc: '3 pages with copyright; clean Swiss aesthetic' },
      { name: 'Standard with Backend', inr: 12000, usd: 160, desc: 'Dynamic blog, contact database, SSR' },
      { name: 'Pro Suite', inr: 19000, usd: 250, desc: 'Chatbot, CMS, telemetry analytics, bespoke design' }
    ]
  },
  {
    id: 'ecommerce',
    title: 'Brand & E-Com',
    items: [
      { name: 'Brand Starter Static', inr: 15000, usd: 200, desc: 'High-speed showcase, fast image CDN' },
      { name: 'CMS & Admin', inr: 25000, usd: 330, desc: 'Catalog management, inventory updates' },
      { name: 'Custom Roles + CMS + SEO', inr: 39000, usd: 515, desc: 'Multi-role staff access, automated schema SEO' },
      { name: 'Industry-Grade E-Com', inr: 59000, usd: 780, desc: 'Payment gateways, automated invoices, webhooks' }
    ]
  },
  {
    id: 'apps',
    title: 'Apps & Combos',
    items: [
      { name: 'Flutter App', inr: 31000, usd: 410, desc: 'iOS + Android cross-platform client with API sync' },
      { name: 'Kotlin Native App', inr: 39000, usd: 515, desc: 'Native Android architecture, hardware sensors' },
      { name: 'App Combo', inr: 69000, usd: 910, desc: 'Cross-platform app + unified web dashboard' },
      { name: 'Industry E-Com + Flutter Combo', inr: 91000, usd: 1200, desc: 'Full commerce engine, native app, admin suite' }
    ]
  },
  {
    id: 'erp',
    title: 'ERP',
    items: [
      { name: 'Education ERP', inr: 35000, usd: 460, customPriceText: 'From', desc: 'Admissions, student records, fee collection' },
      { name: 'Business ERP', inr: 39000, usd: 515, customPriceText: 'From', desc: 'Ledger, inventory, HR attendance, invoice generation' }
    ]
  },
  {
    id: 'ai',
    title: 'AI & Custom',
    items: [
      { name: 'AI Integration', inr: 3000, usd: 40, customPriceText: 'From', desc: 'LLM completion, embeddings, semantic search' },
      { name: 'AI Model Training', inr: 23000, usd: 300, customPriceText: 'From', desc: 'Fine-tuned domain model & dataset pipeline' },
      { name: 'Custom Data Analytics & Dashboards', inr: 45000, usd: 590, customPriceText: 'Custom', desc: 'Real-time telemetry, clickstream & OLAP metrics' },
      { name: 'Python, Rust & Computer Vision R&D', inr: 65000, usd: 850, customPriceText: 'Custom', desc: 'Edge defect detection, video stream pipelines' }
    ]
  }
];

export default function RatesEstimator({ whatsappNumber = '919074811984' }: { whatsappNumber?: string }) {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [activeTab, setActiveTab] = useState<string>('portfolio');

  // Estimator state
  const [estimatorCategory, setEstimatorCategory] = useState<string>('portfolio');
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(0);
  const [timelineMode, setTimelineMode] = useState<'standard' | 'priority'>('standard');

  const categorySelectId = useId();
  const tierSelectId = useId();
  const timelineSelectId = useId();

  const currentCategory = RATE_CATEGORIES.find((c) => c.id === estimatorCategory) || RATE_CATEGORIES[0];
  const currentTier = currentCategory.items[selectedTierIndex] || currentCategory.items[0];

  const basePrice = currency === 'INR' ? currentTier.inr : currentTier.usd;
  const isPriority = timelineMode === 'priority';
  const totalPrice = isPriority ? Math.round(basePrice * 1.15) : basePrice;

  const spec30 = Math.round(totalPrice * 0.3);
  const build40 = Math.round(totalPrice * 0.4);
  const handover30 = totalPrice - spec30 - build40;

  const symbol = currency === 'INR' ? '₹' : '$';

  const formatPrice = (val: number) => {
    return currency === 'INR' ? `₹${val.toLocaleString('en-IN')}` : `$${val.toLocaleString('en-US')}`;
  };

  const handleRowClick = (item: RateItem, categoryTitle: string) => {
    const priceStr = item.customPriceText
      ? `${item.customPriceText} ${formatPrice(currency === 'INR' ? item.inr : item.usd)}`
      : formatPrice(currency === 'INR' ? item.inr : item.usd);

    window.dispatchEvent(
      new CustomEvent('open-engineer-modal', {
        detail: {
          goal: `Rate Card Inquiry: ${categoryTitle} - ${item.name} (${priceStr})`,
          stack: item.desc
        }
      })
    );
  };

  const handleDiscussWithEngineer = () => {
    window.dispatchEvent(
      new CustomEvent('open-engineer-modal', {
        detail: {
          goal: `Scope Estimate: ${currentCategory.title} - ${currentTier.name} (${formatPrice(totalPrice)}) [${isPriority ? 'Priority +15%' : 'Standard'}]`,
          stack: currentTier.desc
        }
      })
    );
  };

  const waUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello kinbo Engineer, I would like an estimate for: ${currentCategory.title} - ${currentTier.name} (${formatPrice(totalPrice)}). Staging milestones: 30% Spec / 40% Build / 30% Handover.`
  )}`;

  return (
    <div class="w-full">
      {/* Section Header with Live Currency Toggle */}
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(244,243,239,0.14)] pb-6 mb-8">
        <div>
          <div class="font-mono text-[12px] uppercase tracking-wider text-[#FF5A52] mb-1">
            05 / TRANSPARENT RATES
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]">
            Clear math. Zero guesswork.
          </h2>
        </div>

        {/* Currency Switcher */}
        <div class="inline-flex items-center p-1 bg-[#181818] border border-[rgba(244,243,239,0.14)] rounded-[4px] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setCurrency('INR')}
            class={`touch-target px-3.5 py-1.5 text-xs font-mono rounded-[3px] transition-colors ${
              currency === 'INR'
                ? 'bg-[#D9261C] text-white font-semibold'
                : 'text-[rgba(244,243,239,0.7)] hover:text-white'
            }`}
          >
            INR (₹)
          </button>
          <button
            type="button"
            onClick={() => setCurrency('USD')}
            class={`touch-target px-3.5 py-1.5 text-xs font-mono rounded-[3px] transition-colors ${
              currency === 'USD'
                ? 'bg-[#D9261C] text-white font-semibold'
                : 'text-[rgba(244,243,239,0.7)] hover:text-white'
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* Main 12-Column Swiss Layout: 7 cols Rate Cards + 5 cols Estimator */}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left (7 cols): 5-Tab Swiss Rate Card Island */}
        <div class="lg:col-span-7 bg-[#111111] border border-[rgba(244,243,239,0.14)] rounded-[8px] p-5 sm:p-6 shadow-xl">
          {/* Tab Headers */}
          <div class="flex flex-wrap gap-1.5 border-b border-[rgba(244,243,239,0.1)] pb-4 mb-5">
            {RATE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                class={`touch-target px-3 py-1.5 rounded-[4px] text-xs font-mono transition-colors ${
                  activeTab === cat.id
                    ? 'bg-[#F4F3EF] text-[#111111] font-semibold'
                    : 'bg-[#181818] text-[rgba(244,243,239,0.75)] hover:text-white hover:bg-[#222222]'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Rate Rows List */}
          <div class="space-y-2.5">
            {RATE_CATEGORIES.find((c) => c.id === activeTab)?.items.map((item) => {
              const priceDisplay = item.customPriceText
                ? `${item.customPriceText} ${formatPrice(currency === 'INR' ? item.inr : item.usd)}`
                : formatPrice(currency === 'INR' ? item.inr : item.usd);

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleRowClick(item, RATE_CATEGORIES.find((c) => c.id === activeTab)?.title || '')}
                  class="w-full text-left touch-target p-3.5 bg-[#181818] hover:bg-[#222222] border border-[rgba(244,243,239,0.1)] hover:border-[#D9261C] rounded-[4px] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 group"
                >
                  <div class="flex-1 pr-3">
                    <div class="text-sm font-semibold text-[#FFFFFF] group-hover:text-[#FF5A52] transition-colors flex items-center gap-2">
                      <span>{item.name}</span>
                      <span class="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5A52]">
                        (Click to Brief Engineer)
                      </span>
                    </div>
                    <div class="text-xs text-[rgba(244,243,239,0.65)] mt-0.5">{item.desc}</div>
                  </div>
                  <div class="font-mono text-sm sm:text-base font-bold text-[#F4F3EF] whitespace-nowrap self-start sm:self-center">
                    {priceDisplay}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footnote */}
          <div class="mt-6 pt-4 border-t border-[rgba(244,243,239,0.1)] text-[12px] font-mono text-[rgba(244,243,239,0.55)] space-y-1">
            <p>✓ Day-1 100% source-code ownership included with all tiers.</p>
            <p>✓ Hosting, domains & third-party APIs billed directly in your name.</p>
          </div>
        </div>

        {/* Right (5 cols): 3-Click Scope Estimator Island (#estimator) */}
        <div
          id="estimator"
          class="lg:col-span-5 bg-[#111111] border border-[rgba(244,243,239,0.18)] rounded-[8px] p-5 sm:p-7 shadow-2xl relative"
        >
          <div class="font-mono text-[12px] uppercase text-[#FF5A52] tracking-wider mb-2">
            05.1 / SCOPE CALCULATOR
          </div>
          <h3 class="text-xl font-bold text-[#FFFFFF] tracking-tight mb-5">
            Instant Milestone Breakdown
          </h3>

          <div class="space-y-4">
            {/* Step 1: Category */}
            <div>
              <label for={categorySelectId} class="block font-mono text-[12px] text-[rgba(244,243,239,0.7)] uppercase mb-1.5">
                01 / Category
              </label>
              <select
                id={categorySelectId}
                value={estimatorCategory}
                onChange={(e) => {
                  setEstimatorCategory((e.target as HTMLSelectElement).value);
                  setSelectedTierIndex(0);
                }}
                class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3 py-2 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
              >
                {RATE_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Tier */}
            <div>
              <label for={tierSelectId} class="block font-mono text-[12px] text-[rgba(244,243,239,0.7)] uppercase mb-1.5">
                02 / Deliverable Tier
              </label>
              <select
                id={tierSelectId}
                value={selectedTierIndex}
                onChange={(e) => setSelectedTierIndex(Number((e.target as HTMLSelectElement).value))}
                class="w-full touch-target bg-[#181818] border border-[rgba(244,243,249,0.16)] rounded-[4px] px-3 py-2 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
              >
                {currentCategory.items.map((item, idx) => (
                  <option key={item.name} value={idx}>
                    {item.name} - {formatPrice(currency === 'INR' ? item.inr : item.usd)}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Timeline */}
            <div>
              <label for={timelineSelectId} class="block font-mono text-[12px] text-[rgba(244,243,239,0.7)] uppercase mb-1.5">
                03 / Engineering Timeline
              </label>
              <select
                id={timelineSelectId}
                value={timelineMode}
                onChange={(e) => setTimelineMode((e.target as HTMLSelectElement).value as any)}
                class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3 py-2 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
              >
                <option value="standard">Standard Sprint (Base Rate)</option>
                <option value="priority">Priority Accelerated Track (+15% dedicated sprints)</option>
              </select>
            </div>
          </div>

          {/* Live Tabular Total */}
          <div class="mt-6 pt-5 border-t border-[rgba(244,243,239,0.14)]">
            <div class="flex items-baseline justify-between">
              <span class="font-mono text-xs uppercase text-[rgba(244,243,239,0.7)]">Calculated Target</span>
              <span class="text-2xl sm:text-3xl font-mono font-bold text-[#FFFFFF] tracking-tight">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          {/* 30 / 40 / 30 Milestone Gate Boxes */}
          <div class="mt-4 grid grid-cols-3 gap-2 text-center">
            <div class="bg-[#181818] p-2.5 rounded-[4px] border border-[rgba(244,243,239,0.1)]">
              <div class="font-mono text-[10px] text-[#FF5A52] uppercase">30% SPEC</div>
              <div class="font-mono text-xs sm:text-sm font-semibold text-[#F4F3EF] mt-0.5">
                {formatPrice(spec30)}
              </div>
            </div>
            <div class="bg-[#181818] p-2.5 rounded-[4px] border border-[rgba(244,243,239,0.1)]">
              <div class="font-mono text-[10px] text-[#FF5A52] uppercase">40% BUILD</div>
              <div class="font-mono text-xs sm:text-sm font-semibold text-[#F4F3EF] mt-0.5">
                {formatPrice(build40)}
              </div>
            </div>
            <div class="bg-[#181818] p-2.5 rounded-[4px] border border-[rgba(244,243,239,0.1)]">
              <div class="font-mono text-[10px] text-[#FF5A52] uppercase">30% HANDOVER</div>
              <div class="font-mono text-xs sm:text-sm font-semibold text-[#F4F3EF] mt-0.5">
                {formatPrice(handover30)}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div class="mt-6 space-y-2.5">
            <button
              type="button"
              onClick={handleDiscussWithEngineer}
              class="w-full touch-target bg-[#D9261C] hover:bg-[#B81D14] text-white font-medium text-sm rounded-[4px] px-4 py-2.5 transition-colors flex items-center justify-center gap-2"
            >
              <span>Discuss with Engineer</span>
              <span class="font-mono">→</span>
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full touch-target bg-[#181818] hover:bg-[#222222] text-[#F4F3EF] border border-[rgba(244,243,239,0.16)] font-medium text-xs font-mono rounded-[4px] px-4 py-2.5 transition-colors flex items-center justify-center gap-2"
            >
              <span>WhatsApp Engineer Spec</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
