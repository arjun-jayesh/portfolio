import { useState, useRef } from 'preact/hooks';

interface ServiceColumn {
  id: string;
  index: string;
  title: string;
  headline: string;
  techStack: string[];
  disciplines: Array<{ name: string; useCase: string }>;
  iconSvg: string;
}

const SERVICES_DATA: ServiceColumn[] = [
  {
    id: 'apps',
    index: '01',
    title: 'Apps',
    headline: 'Native & cross-platform mobile engineering with deterministic offline sync.',
    techStack: ['Flutter', 'Kotlin', 'PostgreSQL / SQLite', 'FastAPI Backend'],
    disciplines: [
      { name: 'Education', useCase: 'Student offline study & attendance tracker' },
      { name: 'Healthcare', useCase: 'HIPAA-compliant telemetry & nurse tablet UI' },
      { name: 'Retail', useCase: 'Sub-second barcode checkout & POS' },
      { name: 'Logistics', useCase: 'Low-latency fleet geo-tracking & manifests' }
    ],
    iconSvg: 'M12 2a4 4 0 00-4 4v12a4 4 0 004 4h0a4 4 0 004-4V6a4 4 0 00-4-4zm0 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3z'
  },
  {
    id: 'websites',
    index: '02',
    title: 'Websites',
    headline: 'Zero-slop web systems with server-side rendering and fine-grained role control.',
    techStack: ['React / Next.js', 'Custom CMS & Roles', 'PostgreSQL', 'FastAPI / Python'],
    disciplines: [
      { name: 'Education', useCase: 'Multi-campus admissions & grading portals' },
      { name: 'Healthcare', useCase: 'Doctor consultation & diagnostic delivery' },
      { name: 'Retail', useCase: 'High-conversion headless e-commerce' },
      { name: 'Logistics', useCase: 'Consignment tracking & vendor portal' }
    ],
    iconSvg: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2v3h14V6H5zm0 5v7h14v-7H5z'
  },
  {
    id: 'erp',
    index: '03',
    title: 'ERP',
    headline: 'High-integrity ledger and operations cores replacing brittle spreadsheet sprawl.',
    techStack: ['PostgreSQL', 'Python / FastAPI', 'React / Next.js', 'Live Dashboards'],
    disciplines: [
      { name: 'Education', useCase: 'Institution fees, timetable & inventory' },
      { name: 'Healthcare', useCase: 'Hospital bed, pharmacy & billing ERP' },
      { name: 'Retail', useCase: 'Multi-warehouse automated purchase orders' },
      { name: 'Logistics', useCase: 'Freight manifest, customs & audit vault' }
    ],
    iconSvg: 'M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z'
  },
  {
    id: 'ai',
    index: '04',
    title: 'AI & Automation',
    headline: 'Domain-adapted LLMs and edge computer vision inference pipelines.',
    techStack: ['LLM / AI Integration', 'Custom AI Training', 'OpenCV / Vision', 'FastAPI Inference'],
    disciplines: [
      { name: 'Education', useCase: 'Automated test grading & syllabus reasoning' },
      { name: 'Healthcare', useCase: 'Scan anomaly triage & prescription OCR' },
      { name: 'Retail', useCase: 'Visual product search & demand forecasting' },
      { name: 'Logistics', useCase: 'Defect optical sorting & container OCR' }
    ],
    iconSvg: 'M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L5.5 20l2-7L2 9h7l3-7z'
  },
  {
    id: 'custom',
    index: '05',
    title: 'Custom Systems',
    headline: 'Low-level performance systems engineered in Python and Rust for high-throughput I/O.',
    techStack: ['Python', 'Rust', 'OpenCV / Vision', 'Data Dashboards'],
    disciplines: [
      { name: 'Education', useCase: 'High-concurrency online proctoring engines' },
      { name: 'Healthcare', useCase: 'Real-time telemetry stream aggregators' },
      { name: 'Retail', useCase: 'High-frequency inventory reconciliation' },
      { name: 'Logistics', useCase: 'Automated conveyor tracking controllers' }
    ],
    iconSvg: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z'
  }
];

export default function ServicesExplorer() {
  const [activeCol, setActiveCol] = useState<string | null>('apps');
  const [activeTab, setActiveTab] = useState<'tech' | 'disciplines'>('tech');
  const hoverTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = (colId: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = window.setTimeout(() => {
      setActiveCol(colId);
    }, 65); // 65ms hover-intent delay
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleCardClick = (service: ServiceColumn) => {
    const stackText = service.techStack.join(', ');
    const detail = {
      goal: `Inquiry regarding ${service.title} engineering`,
      stack: `${service.title} (${stackText})`
    };
    window.dispatchEvent(new CustomEvent('open-engineer-modal', { detail }));
  };

  return (
    <div class="w-full">
      {/* 5-Column Swiss Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 border-t border-[rgba(244,243,239,0.14)] pt-6">
        {SERVICES_DATA.map((service) => {
          const isSelected = activeCol === service.id;
          return (
            <div
              key={service.id}
              class={`bg-[#111111] border transition-all rounded-[6px] p-5 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-[#D9261C] shadow-[0_0_24px_rgba(217,38,28,0.18)]'
                  : 'border-[rgba(244,243,239,0.14)] hover:border-[rgba(244,243,239,0.35)]'
              }`}
              onMouseEnter={() => handleMouseEnter(service.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => setActiveCol(service.id)}
              tabIndex={0}
              role="region"
              aria-label={service.title}
            >
              <div>
                <div class="flex items-center justify-between font-mono text-[12px] text-[#FF5A52] mb-3">
                  <span>{service.index} / SERVICE</span>
                  <svg class="w-4 h-4 text-[rgba(244,243,239,0.7)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d={service.iconSvg} />
                  </svg>
                </div>

                <h3 class="text-xl font-semibold text-[#FFFFFF] tracking-tight mb-2">
                  {service.title}
                </h3>
                <p class="text-xs text-[rgba(244,243,239,0.72)] leading-relaxed mb-4">
                  {service.headline}
                </p>

                {/* Sub-Panel Toggle Triggers (>=44px touch target) */}
                <div class="grid grid-cols-2 gap-1.5 p-1 bg-[#181818] border border-[rgba(244,243,239,0.1)] rounded-[4px] mb-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCol(service.id);
                      setActiveTab('tech');
                    }}
                    class={`touch-target px-2 py-1.5 text-xs font-mono rounded-[3px] transition-colors text-center ${
                      isSelected && activeTab === 'tech'
                        ? 'bg-[#D9261C] text-white font-medium'
                        : 'text-[rgba(244,243,239,0.7)] hover:text-white'
                    }`}
                  >
                    Tech
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCol(service.id);
                      setActiveTab('disciplines');
                    }}
                    class={`touch-target px-2 py-1.5 text-xs font-mono rounded-[3px] transition-colors text-center ${
                      isSelected && activeTab === 'disciplines'
                        ? 'bg-[#D9261C] text-white font-medium'
                        : 'text-[rgba(244,243,239,0.7)] hover:text-white'
                    }`}
                  >
                    Disciplines
                  </button>
                </div>

                {/* Sub-panel content */}
                {isSelected && (
                  <div class="pt-2 border-t border-[rgba(244,243,239,0.1)]">
                    {activeTab === 'tech' ? (
                      <div class="space-y-2">
                        <div class="font-mono text-[12px] uppercase text-[#FF5A52]">Standard Stack</div>
                        <ul class="space-y-1.5">
                          {service.techStack.map((tech) => (
                            <li key={tech} class="text-xs font-mono text-[rgba(244,243,239,0.85)] flex items-center gap-1.5">
                              <span class="w-1 h-1 bg-[#D9261C] rounded-full"></span>
                              <span>{tech}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div class="space-y-2">
                        <div class="font-mono text-[12px] uppercase text-[#FF5A52]">Applications</div>
                        <ul class="space-y-2">
                          {service.disciplines.map((d) => (
                            <li key={d.name} class="text-xs">
                              <div class="font-medium text-[#FFFFFF]">{d.name}</div>
                              <div class="text-[rgba(244,243,239,0.65)] text-[11px] leading-tight">{d.useCase}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Action Trigger */}
              <div class="pt-5 mt-4 border-t border-[rgba(244,243,239,0.1)]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(service);
                  }}
                  class="w-full touch-target px-3 py-2 bg-[#181818] hover:bg-[#D9261C] text-[#F4F3EF] hover:text-white text-xs font-medium rounded-[4px] transition-colors inline-flex items-center justify-between border border-[rgba(244,243,239,0.14)]"
                >
                  <span>Build with Engineer</span>
                  <span class="font-mono text-xs">→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
