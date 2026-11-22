# COMPREHENSIVE ARCHITECTURAL, SECURITY, SEO & ACCESSIBILITY AUDIT (AMENDED)
**Project**: KINBO TECHNOLOGIES PRIVATE LIMITED (`kinbosoft.com`)  
**Audit Standard**: OWASP ASVS v4.0.3, WCAG 2.2 AA, Google Search Essentials, Core Web Vitals, DPDP Act (India) 2023  
**Status**: PHASE 1 AMENDED & COMPLETE (Read-Only Assessment with Verified Baselines)  
**Repository Visibility**: **PUBLIC** (`https://github.com/arjun-jayesh/portfolio` confirmed public via GitHub API)

---

## 1. Executive Summary & Audit Mandate

This amended audit incorporates all verified measurements, resolves previous omissions regarding admin authentication and media ingestion, and establishes the empirical baseline for the platform across **Security**, **Technical SEO / AEO**, **Performance**, **Accessibility**, **Compliance**, and **Engineering Quality**.

### Core Risk Realities:
1. **Public Repository Exposure (P0)**: The GitHub repository is **publicly accessible**. Multiple production API credentials and OAuth tokens exist in git history and markdown documentation. Secret rotation is an immediate operational mandate.
2. **Shared Admin Authentication & Lockout Deficiencies**: The administrative gate relies on a single shared plaintext secret (`local`) with no cryptographic password hashing, no lockout mechanisms against brute force, and stateless in-memory rate limiting that does not persist across Vercel serverless lambdas.
3. **Unsigned Media Upload Vulnerability**: Cloudinary uploads utilize an unsigned preset (`kinbo1`), allowing unauthenticated third parties to abuse storage quotas.
4. **Proxy IP Architecture Verified**: `18.133.72.105` is confirmed via `AdminInterface.tsx:1416` as the active AWS EC2 ingress proxy for custom vanity domain redirects (e.g., `docs.kinbo.tech`), distinct from Vercel's edge IP (`216.198.79.1`).
5. **Empirical Performance Bottleneck**: Lighthouse mobile testing revealed severe **Total Blocking Time (5,250ms)** on the homepage driven by unoptimized client canvas rendering loops, dragging mobile Performance score to **57/100**.

---

## 2. Severity-Ranked Findings Table

| ID | Area | File:Line | Finding | Impact | Fix | Effort |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Security | `README.MD:42`, `.env`, git history (`3ee0d57`, `71149a8`, `df4db90`) | Production secrets (Razorpay Live keys, Google OAuth, Supabase keys) exposed in public repository and git history. | **CRITICAL** | Purge secrets from repo/history (`git-filter-repo`), rotate keys immediately, deploy `.env.example`. | Medium (2h) |
| **SEC-02** | Security | `src/pages/admin.astro:12-44`, `src/lib/auth.ts` | Admin auth relies on shared plaintext password (`local`), no Argon2/bcrypt hash, no account lockout, no CSRF token on login. | **CRITICAL** | Implement Argon2id/bcrypt hashed verification, shared-store lockout after 5 failures, CSRF tokens, strict cookies. | Medium (4h) |
| **SEC-03** | Security | `src/pages/api/upload.ts:40-45` | Unsigned Cloudinary preset (`kinbo1`) allows arbitrary public uploads and quota exhaustion; lacks signed backend signature. | **CRITICAL** | Implement signed server-to-server Cloudinary upload behind verified admin session with strict MIME/size gating. | Medium (3h) |
| **SEC-04** | Security | `src/pages/api/redirects.ts:71-76` | Target URL validation accepts any HTTP/HTTPS URL with no private/internal IP or loopback protection (SSRF / Open Redirect). | **CRITICAL** | Add CIDR/private IP blocker (RFC 1918, RFC 3927, loopback `127.0.0.1`, AWS metadata `169.254.169.254`). | Low (2h) |
| **SEC-05** | Security | `src/pages/api/payments/` (Missing Webhook) | No Razorpay webhook endpoint (`/api/payments/webhook`). Transactions where customer tab drops before callback remain unverified. | **CRITICAL** | Create `/api/payments/webhook.ts` with Razorpay HMAC signature validation and idempotent order reconciliation. | Medium (4h) |
| **SEC-06** | Security | `supabase_rls.sql:1-70` | Row Level Security (RLS) exists only in loose SQL scripts; unapplied policies risk total database exposure to anon clients. | **CRITICAL** | Apply and verify strict RLS on all 8 tables; deny public SELECT on `payments`, `redirects`, `site_config`, `ideas`. | Medium (3h) |
| **SEC-07** | Security | `src/middleware.ts:6-33` | In-memory rate limiting (`Map`) is stateless on Vercel Serverless; each serverless execution starts fresh, defeating rate limits. | **HIGH** | Replace in-memory rate limiting with distributed KV store (Upstash Redis / Vercel KV REST client). | Medium (3h) |
| **SEC-08** | Security | `src/pages/api/ideas.ts`, `service-leads.ts` | Public forms lack bot protection (Turnstile/CAPTCHA) and strict schema validation (Zod). | **HIGH** | Add Cloudflare Turnstile token verification and Zod schema validation across all intake endpoints. | Medium (3h) |
| **SEC-09** | Payments | `src/pages/api/payments/create-order.ts:24-30` | Client passes `amount` directly; server creates order without validating against canonical service rate cards. | **HIGH** | Define canonical price catalog on server; derive or validate amount strictly on the backend. | Medium (3h) |
| **SEC-10** | Security | `src/middleware.ts:88-100` | CSP contains `'unsafe-inline'` and `'unsafe-eval'`; missing full HSTS preload and explicit CORS origin locking. | **HIGH** | Refactor CSP to remove `'unsafe-eval'`, eliminate inline handlers, and lock CORS to verified origins. | Medium (3h) |
| **SEC-11** | Security | `src/pages/api/*.ts` (Error Leakage) | Catch blocks return raw `e.message` directly in 500 responses, leaking database table names and stack traces. | **MEDIUM** | Implement centralized sanitized error responder returning generic errors while logging stack traces to server logs. | Low (2h) |
| **SEC-12** | Security | `npm audit` report | 38 dependencies flagged (2 critical, 27 high, 6 moderate) including `@astrojs/node`, `@astrojs/vercel`, and `vite`. | **HIGH** | Execute selective dependency patching and upgrade to secure minor versions. | Medium (2h) |
| **SEO-01** | SEO | `public/robots.txt:46-48` | `robots.txt` points to legacy domain `https://dear.is-a.dev/sitemap-index.xml` instead of `https://kinbosoft.com`. | **HIGH** | Update Sitemap reference to `https://kinbosoft.com/sitemap-index.xml`; allow `OAI-SearchBot` for AI citation. | Low (15m) |
| **SEO-02** | SEO | `src/pages/blog/[slug].astro` & `src/content/blog/` | Dual blog sources (MDX files vs Supabase `posts`) risk split canonical signals and duplicate content penalties. | **MEDIUM** | Unify blog repository layer (Supabase primary with MDX fallback) and enforce canonical URL synchronization. | Medium (3h) |
| **SEO-03** | SEO | `src/layouts/Layout.astro:50-75` | Missing rich schema types: `SoftwareApplication` (for QueueZero), `BlogPosting`, and `BreadcrumbList`. | **MEDIUM** | Add page-specific Schema.org JSON-LD graphs with `sameAs` entity links for enhanced AI/Search visibility. | Medium (3h) |
| **PERF-01** | Performance | `src/pages/index.astro:2680-2750` | Orbital hero canvas and cityLights render loops execute unthrottled on mobile main thread, causing 5,250ms TBT. | **CRITICAL** | Optimize canvas animation loop with IntersectionObserver, framerate caps, and `prefers-reduced-motion` pause. | Medium (3h) |
| **PERF-02** | Performance | `src/middleware.ts` / SSR Pages | SSR pages lack Edge Cache headers (`s-maxage`, `stale-while-revalidate`), driving unnecessary database round-trips. | **HIGH** | Attach `Cache-Control: public, s-maxage=600, stale-while-revalidate=86400` to static-like SSR routes. | Low (2h) |
| **UX-01** | Accessibility | Home (`/`) & `/ideas` | Axe audits flag low-contrast text on dark backgrounds and missing `<label>` tags on form inputs/selects. | **HIGH** | Fix contrast tokens to meet WCAG 4.5:1 ratio and add explicit `for`/`id` labels to all form controls. | Medium (3h) |
| **UX-02** | Accessibility | `src/styles/global.css` | Missing explicit `prefers-reduced-motion` overrides for canvas, CSS keyframes, and smooth scrolling. | **MEDIUM** | Add universal `@media (prefers-reduced-motion: reduce)` rules disabling non-essential motion. | Low (2h) |
| **ENG-01** | Engineering | `tsconfig.json:3-6` | Glob `**/*` indexes untracked archives (`dco_archive/`), causing Node.js heap exhaustion in `astro check`. | **CRITICAL** | Scope `include` to `["src/**/*", ".astro/types.d.ts"]` and exclude non-production folders (Verified: fixes OOM). | Low (15m) |
| **ENG-02** | Engineering | Codebase Diagnostics | Real baseline check reveals **199 TypeScript errors and 16 hints** across 91 files (`UserProfile.tsx`, etc.). | **HIGH** | Fix type signatures, strict null checks, and missing layout properties to achieve clean type compilation. | High (6h) |
| **ENG-03** | Engineering | `package.json` | Missing `test`, `lint`, and `type-check` script definitions; zero automated tests in repository. | **HIGH** | Integrate Vitest unit testing, Playwright E2E testing, and GitHub Actions CI workflow. | Medium (4h) |
| **ENG-04** | Architecture | `src/pages/api/redirects.ts:79` | `18.133.72.105` verified as AWS EC2 ingress proxy for client redirects, but is currently hardcoded. | **MEDIUM** | Make proxy IP configurable via `REDIRECT_PROXY_IP` env variable with `18.133.72.105` as documented default. | Low (1h) |
| **DNS-01** | Email / DNS | Dynadot DNS / Domain | Active SPF exists, but domain lacks DKIM, DMARC (`p=none`), CAA, and MTA-STS records. | **HIGH** | Publish Zoho DKIM key, DMARC policy (`v=DMARC1; p=none`), and Let's Encrypt CAA records. | Low (1h) |
| **COMP-01**| Compliance | Legal / Trust Pages | Missing Privacy Policy, Terms of Service, and Refund Policy (mandatory for Razorpay & DPDP Act India 2023). | **HIGH** | Add `/privacy`, `/terms`, and `/refund-policy` pages with explicit lead data consent and retention disclosures. | Medium (3h) |

---

## 3. Empirical Baseline Measurements (Verified Real Data)

### A. Lighthouse Mobile Baselines (Run via Chrome Headless)
| Page | Performance | Accessibility | Best Practices | SEO | Core Web Vitals Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`/` (Home)** | **57** | **97** | **100** | **100** | FCP: 2.2s \| LCP: 2.2s \| **TBT: 5,250ms** \| CLS: 0 |
| **`/products`** | **80** | **100** | **100** | **100** | FCP: 2.1s \| LCP: 3.3s \| TBT: 0ms \| CLS: 0.001 |
| **`/blog`** | **84** | **100** | **100** | **100** | FCP: 2.0s \| LCP: 2.1s \| TBT: 0ms \| **CLS: 0.135** |
| **`/ideas`** | **89** | **89** | **100** | **100** | FCP: 2.1s \| LCP: 3.2s \| TBT: 80ms \| CLS: 0 |

### B. Axe-Core Accessibility Violations
* **`/` (Home)**: `color-contrast` failure on muted text layers (`rgba(244,243,239,0.7)`) on dark surfaces.
* **`/ideas`**: `label` and `select-name` failures on RFP estimator form inputs (missing programmatic `<label for="...">` association).

### C. Astro Check & TypeScript Diagnostics
* **Total Scanned**: 91 files
* **Diagnostic Baseline**: **199 errors, 0 warnings, 16 hints**
* **Primary Hotspots**:
  * `src/components/UserProfile.tsx`: 24 type mismatch and implicit-any errors.
  * `src/pages/index.astro`: Canvas context null checks and missing Element property types.
  * `src/pages/admin.astro`: Invalid property `hideHeaderFooter` passed to `Layout.astro`.

### D. Dependency Vulnerabilities (`npm audit`)
* **Total Vulnerabilities**: **38** (2 critical, 27 high, 6 moderate, 3 low)
* **Critical CVEs**: `astro` define:vars XSS (GHSA-j687-52p2-xcff) and `websocket-driver` resource limit bypass.
* **High CVEs**: `@astrojs/node` host header crash (GHSA-qh8j-hqjv-7m4x), `@astrojs/vercel` unauthenticated path override (GHSA-mr6q-rp88-fx84), `vite` path traversal, `sharp` libvips CVEs.

---

## 4. Architectural Confirmations

### Confirmation: `18.133.72.105` Proxy IP Purpose
Audit of `src/components/AdminInterface.tsx:1416` confirms:
```text
"Before creating a redirector please navigate to your DNS provider and add an A record for your FQDN pointing to 18.133.72.105 allowing time for DNS propagation."
```
`18.133.72.105` is **NOT obsolete**. It is an Amazon AWS EC2 Elastic IP in London (`eu-west-2`) configured as an external reverse-proxy server for vanity hostnames created in the Admin Panel. It must remain the default proxy IP, made configurable via `import.meta.env.REDIRECT_PROXY_IP || '18.133.72.105'`.

### Confirmation: Repository & Secrets Exposure
* **Repository**: `https://github.com/arjun-jayesh/portfolio` is confirmed **PUBLIC** via GitHub API.
* **Commits with Secret Ingestion**:
  * `3ee0d57`: Added Supabase service role keys and Google OAuth tokens.
  * `71149a8`: Re-committed env references and service keys in documentation.
  * `df4db90`: Committed production keys to root.
  * `2c300de`: Hardcoded Cloudinary unsigned preset and keys in `upload.ts`.

---

## 5. Phase-by-Phase Remediation Roadmap

```
[Phase 1] Discovery & Audit (COMPLETE)
    ├── Deliver AUDIT.md with real measured baselines
    └── Await User Review & Phase 2 Branch Approval
[Phase 2] Security & Payments First (Branch: fix/phase-2-security)
    ├── Fix tsconfig.json scope & resolve astro check blocker
    ├── Implement shared-store rate limiter (Upstash / Vercel KV)
    ├── Harden Admin Auth (hashed credentials, lockout, CSRF, strict cookies)
    ├── Lock Cloudinary (signed server-side uploads behind admin session)
    ├── Secure /api/redirects (RFC 1918/3927 SSRF filter + configurable proxy IP)
    ├── Implement Razorpay Webhook (/api/payments/webhook) + Price Canonicalization + Idempotency
    ├── Apply & verify Supabase RLS on all 8 tables
    └── Deploy sanitized error handling & strict CSP headers
[Phase 3] SEO, AEO & Performance (Branch: feat/phase-3-seo-perf)
    ├── Update robots.txt (kinbosoft.com sitemap + OAI-SearchBot allow)
    ├── Unify blog repository (Supabase primary + MDX fallback)
    ├── Enhance Schema.org JSON-LD (SoftwareApplication, BlogPosting, Breadcrumbs)
    ├── Add Edge Cache headers (s-maxage=600, stale-while-revalidate=86400)
    └── Optimize Orbital canvas loop to eliminate 5,250ms TBT on mobile
[Phase 4] UX & Accessibility (Branch: feat/phase-4-a11y)
    ├── Fix WCAG 4.5:1 contrast ratios on dark surfaces
    ├── Add explicit <label> associations & sessionStorage persistence on /ideas form
    └── Universal prefers-reduced-motion media query support
[Phase 5] Engineering Excellence & Testing (Branch: chore/phase-5-testing)
    ├── Fix 199 TypeScript compilation errors from baseline
    ├── Implement Vitest unit suite (auth HMAC, payment verification, SSRF validator)
    ├── Add package.json scripts (test, lint, type-check) and GitHub Actions CI
    └── Create .env.example with zero plaintext secrets
[Phase 6] Compliance & Email DNS (Branch: feat/phase-6-compliance)
    ├── Add /privacy, /terms, and /refund-policy pages (DPDP Act & Razorpay compliant)
    └── Generate copy-paste DNS records for DKIM, DMARC (p=none), and CAA
```

---

## 6. Actions Only Owner Can Perform
1. **Rotate Exposed Secrets Now**:
   * Razorpay Key Pair (Razorpay Dashboard > Settings > API Keys)
   * Google OAuth Client Secret & Refresh Token (Google Cloud Console > Credentials)
   * Supabase Service Role Key (Supabase > Settings > API)
   * Admin Master Password (generate 32-character random string for Vercel/Render env)
2. **Purge Git History**:
   * Run `git-filter-repo` or BFG Repo-Cleaner to permanently scrub plaintext secrets from all commit trees on GitHub.
