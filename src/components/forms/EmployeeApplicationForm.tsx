import { useState, useRef } from "preact/hooks";

export default function EmployeeApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roleApplied: "Systems Software Engineer",
    portfolioUrl: "",
    linkedinUrl: "",
    resumeUrl: "",
    notes: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    setUploading(true);
    setErrorMsg("");
    const data = new FormData();
    data.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();
      if (json.url) {
        setFormData((prev) => ({ ...prev, resumeUrl: json.url }));
      } else {
        throw new Error(json.error || "File upload failed.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "File upload failed. Ensure file is under 10MB PDF/DOC.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorMsg("Please provide your name and contact email.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/service-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "Employee Application",
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not Provided",
          organization: "Engineering Candidate",
          metadata: {
            Role_Applied: formData.roleApplied,
            Portfolio_URL: formData.portfolioUrl || "Not Provided",
            LinkedIn_URL: formData.linkedinUrl || "Not Provided",
            Uploaded_Resume: formData.resumeUrl || "Direct Review",
            Notes: formData.notes || "None"
          }
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission error.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Transmission error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div class="p-8 bg-[#181818] border-l-4 border-[#D9261C] rounded-[4px] space-y-4">
        <div class="font-mono text-xs text-[#FF5A52] uppercase">DOSSIER RECEIVED</div>
        <h3 class="text-xl font-bold text-white">Application Dispatched to Engineering Leadership</h3>
        <p class="text-sm text-[rgba(244,243,239,0.85)] leading-relaxed">
          Thank you for applying to KINBO. Our principal systems architect reviews every code sample personally. We will reach out directly if there is an engineering match.
        </p>
      </div>
    );
  }

  return (
    <div class="w-full bg-[#111111] border border-[rgba(244,243,239,0.16)] rounded-[8px] p-6 sm:p-10 shadow-2xl">
      <div class="border-b border-[rgba(244,243,239,0.12)] pb-6 mb-8">
        <div class="font-mono text-[12px] text-[#FF5A52] uppercase mb-1">
          CAREERS // TALENT ACQUISITION
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Join the Engineering Squad
        </h2>
        <p class="text-xs sm:text-sm text-[rgba(244,243,239,0.72)] mt-1.5">
          We hire principal builders with deep systems empathy. No corporate HR bureaucracy.
        </p>
      </div>

      {errorMsg && (
        <div class="p-4 mb-6 bg-[#D9261C]/15 border border-[#D9261C] rounded-[4px] font-mono text-xs text-[#FF5A52]">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} class="space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              autocomplete="name"
              value={formData.name}
              onInput={(e) => setFormData({ ...formData, name: (e.target as HTMLInputElement).value })}
              placeholder="e.g. Maya Chen"
              class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
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
              value={formData.email}
              onInput={(e) => setFormData({ ...formData, email: (e.target as HTMLInputElement).value })}
              placeholder="e.g. maya@domain.com"
              class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
              Phone / WhatsApp
            </label>
            <input
              type="tel"
              autocomplete="tel"
              value={formData.phone}
              onInput={(e) => setFormData({ ...formData, phone: (e.target as HTMLInputElement).value })}
              placeholder="+91 98765 43210"
              class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
              Role Focus
            </label>
            <select
              value={formData.roleApplied}
              onChange={(e) => setFormData({ ...formData, roleApplied: (e.target as HTMLSelectElement).value })}
              class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3 py-2 text-xs font-mono text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
            >
              <option value="Systems Software Engineer">Systems Software Engineer (Rust / Python)</option>
              <option value="Full-Stack Web Engineer">Full-Stack Web Architect (Node SSR / Preact)</option>
              <option value="Mobile Engineer">Mobile Runtimes (Flutter / Kotlin)</option>
              <option value="AI / Computer Vision Engineer">Applied AI & Computer Vision</option>
              <option value="Independent Research Fellow">Independent Systems Research Fellow</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
              GitHub or Portfolio URL
            </label>
            <input
              type="url"
              value={formData.portfolioUrl}
              onInput={(e) => setFormData({ ...formData, portfolioUrl: (e.target as HTMLInputElement).value })}
              placeholder="https://github.com/username"
              class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
              LinkedIn Profile
            </label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onInput={(e) => setFormData({ ...formData, linkedinUrl: (e.target as HTMLInputElement).value })}
              placeholder="https://linkedin.com/in/username"
              class="w-full touch-target bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
            />
          </div>
        </div>

        {/* Resume Attachment Upload */}
        <div>
          <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
            Resume / CV Document (Cloudinary Secure Upload)
          </label>
          <div class="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleUpload}
              class="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              class="touch-target px-4 py-2 bg-[#181818] hover:bg-[#222222] border border-[rgba(244,243,239,0.16)] text-xs font-mono text-[#F4F3EF] rounded-[4px]"
            >
              {uploading ? "Uploading to Cloud..." : "Choose File (PDF/DOC) →"}
            </button>
            {formData.resumeUrl && (
              <span class="font-mono text-xs text-[#34D399]">
                ✓ Uploaded successfully
              </span>
            )}
          </div>
        </div>

        <div>
          <label class="block font-mono text-[12px] text-[rgba(244,243,239,0.75)] uppercase mb-1">
            Why KINBO? Technical Accomplishments & Projects
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onInput={(e) => setFormData({ ...formData, notes: (e.target as HTMLTextAreaElement).value })}
            placeholder="Share repos you've written, performance bottlenecks you've solved, or distributed systems you've architected..."
            class="w-full bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] p-3 text-sm text-[#F4F3EF] focus:border-[#FF5A52] focus:outline-none"
          ></textarea>
        </div>

        <div class="pt-2">
          <button
            type="submit"
            disabled={submitting}
            class="w-full touch-target bg-[#D9261C] hover:bg-[#B81D14] disabled:opacity-60 text-white font-medium text-sm rounded-[4px] px-6 py-3 transition-colors inline-flex items-center justify-center gap-2"
          >
            {submitting ? "Transmitting Application..." : "Submit Application to Engineering Desk →"}
          </button>
        </div>
      </form>
    </div>
  );
}
