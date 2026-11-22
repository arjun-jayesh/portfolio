import { useState } from "preact/hooks";

const PROJECT_TYPES = [
  { value: "prototype", label: "01 // PROTOTYPE / MVP" },
  { value: "clinical_infra", label: "02 // CLINICAL / HEALTHCARE" },
  { value: "web_platform", label: "03 // ENTERPRISE WEB PLATFORM" },
  { value: "mobile_app", label: "04 // MOBILE APPLICATION" },
  { value: "ai_vision", label: "05 // APPLIED AI & VISION" },
  { value: "systems_audit", label: "06 // ARCHITECTURE AUDIT" },
];

const BUDGET_TIERS = [
  "TIER I: < ₹15,000 / $200",
  "TIER II: ₹15,000 - ₹50,000 / $200 - $650",
  "TIER III: ₹50,000 - ₹1,50,000 / $650 - $2,000",
  "TIER IV: ₹1,50,000+ / $2,000+",
  "CUSTOM / TO BE DETERMINED",
];

const TIMELINES = [
  "RAPID SPRINT (1-2 WEEKS)",
  "TARGET: 1 MONTH",
  "PHASED (2-3 MONTHS)",
  "ENTERPRISE ROADMAP (3-6 MO)",
  "FLEXIBLE TIMELINE",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  project_type: "prototype",
  budget: "TIER II: ₹15,000 - ₹50,000 / $200 - $650",
  timeline: "TARGET: 1 MONTH",
  idea_title: "",
  idea_description: "",
  target_audience: "",
  features: "",
  portfolio_url: "",
  linkedin: "",
  additional_notes: "",
  _hp_company: "",
};

export default function IdeasForm() {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    setSending(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please check required fields.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div class="w-full bg-[#111111] border border-[rgba(244,243,239,0.16)] rounded-[8px] p-6 sm:p-10 shadow-2xl">
      <div class="border-b border-[rgba(244,243,239,0.12)] pb-6 mb-8">
        <div class="font-mono text-[12px] text-[#FF5A52] uppercase mb-1">
          RFP & TECHNICAL SCOPE SUBMISSION
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Direct Specification Intake
        </h2>
        <p class="text-xs sm:text-sm text-[rgba(244,243,239,0.72)] mt-1.5">
          We don't have a sales team. Your brief is reviewed directly by our systems architect.
        </p>
      </div>

      {status === "success" ? (
        <div class="p-8 bg-[#181818] border-l-4 border-[#D9261C] rounded-[4px] space-y-4">
          <div class="font-mono text-xs text-[#FF5A52] uppercase">TRANSMISSION CONFIRMED</div>
          <h3 class="text-xl font-bold text-white">Your Project Scope Has Been Logged</h3>
          <p class="text-sm text-[rgba(244,243,239,0.85)] leading-relaxed">
            Our systems engineer will review the technical architecture, dependencies, and timeline. You will receive a direct reply within 4 business hours.
          </p>
          <div class="pt-4">
            <button
              type="button"
              onClick={() => setStatus("idle")}
              class="touch-target px-5 py-2.5 bg-[#D9261C] hover:bg-[#B81D14] text-white text-xs font-mono font-semibold rounded-[4px] transition-colors"
            >
              Submit Another Technical Brief
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} class="space-y-6">
          {/* Honeypot */}
          <input
            type="text"
            name="_hp_company"
            value={form._hp_company}
            tabIndex={-1}
            autoComplete="off"
            style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
            onInput={(e) => updateField("_hp_company", (e.target as HTMLInputElement).value)}
          />

          {status === "error" && (
            <div class="p-4 bg-[#D9261C]/15 border border-[#D9261C] rounded-[4px] font-mono text-xs text-[#FF5A52]">
              {errorMsg}
            </div>
          )}

          {/* Contact Details */}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                autocomplete="name"
                value={form.name}
                onInput={(e) => updateField("name", (e.target as HTMLInputElement).value)}
                placeholder="e.g. Rahul Sharma"
                class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2.5 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
              />
            </div>

            <div>
              <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                autocomplete="email"
                value={form.email}
                onInput={(e) => updateField("email", (e.target as HTMLInputElement).value)}
                placeholder="e.g. founder@company.com"
                class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2.5 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
                Phone Number (WhatsApp)
              </label>
              <input
                type="tel"
                autocomplete="tel"
                value={form.phone}
                onInput={(e) => updateField("phone", (e.target as HTMLInputElement).value)}
                placeholder="+91 98765 43210"
                class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2.5 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
              />
            </div>

            <div>
              <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
                Organization / Company
              </label>
              <input
                type="text"
                autocomplete="organization"
                value={form.organization}
                onInput={(e) => updateField("organization", (e.target as HTMLInputElement).value)}
                placeholder="e.g. St. Jude Healthcare or OptiRetail"
                class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2.5 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
              />
            </div>
          </div>

          {/* Project Type & Budget */}
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
                Project Domain
              </label>
              <select
                value={form.project_type}
                onChange={(e) => updateField("project_type", (e.target as HTMLSelectElement).value)}
                class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3 py-2 text-xs font-mono text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
              >
                {PROJECT_TYPES.map((pt) => (
                  <option key={pt.value} value={pt.value}>
                    {pt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
                Budget Target
              </label>
              <select
                value={form.budget}
                onChange={(e) => updateField("budget", (e.target as HTMLSelectElement).value)}
                class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3 py-2 text-xs font-mono text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
              >
                {BUDGET_TIERS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
                Delivery Timeline
              </label>
              <select
                value={form.timeline}
                onChange={(e) => updateField("timeline", (e.target as HTMLSelectElement).value)}
                class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3 py-2 text-xs font-mono text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
              >
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Title & Description */}
          <div>
            <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
              Project Title *
            </label>
            <input
                type="text"
                required
                value={form.idea_title}
                onInput={(e) => updateField("idea_title", (e.target as HTMLInputElement).value)}
                placeholder="e.g. Distributed Inventory Sync Engine for 12 Warehouses"
                class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2.5 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
              Architecture & Objective Description *
            </label>
            <textarea
              required
              rows={4}
              value={form.idea_description}
              onInput={(e) => updateField("idea_description", (e.target as HTMLTextAreaElement).value)}
              placeholder="Detail your operational bottleneck, target platforms (web, mobile, backend), expected daily concurrency, and third-party integrations..."
              class="w-full bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] p-3.5 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
            ></textarea>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              disabled={sending}
              class="w-full touch-target bg-[#D9261C] hover:bg-[#B81D14] disabled:opacity-60 text-white font-medium text-sm rounded-[4px] px-6 py-3.5 transition-colors inline-flex items-center justify-center gap-2"
            >
              {sending ? (
                <span>Logging Technical Specification...</span>
              ) : (
                <>
                  <span>Transmit Technical Brief to Engineer</span>
                  <span class="font-mono">→</span>
                </>
              )}
            </button>
            <p class="font-mono text-[12px] text-[rgba(244,243,239,0.5)] text-center pt-2">
              Direct review by principal systems engineer · No sales follow-up calls
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
