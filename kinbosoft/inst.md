MASTER BUILD PROMPT: kinbosoft/ — Full Frontend Revamp on Existing Astro SSR + Preact + Supabase Backend

0. MISSION & STRICT SCOPE

You are a principal software architect, Swiss modernist graphic designer (Müller-Brockmann / Dieter Rams discipline), and accessibility engineer.

Create a brand-new folder named kinbosoft/ inside the current repository root. Your job is to completely revamp the frontend of KINBO TECHNOLOGIES PRIVATE LIMITED into our finalized 01 SIGNAL Swiss Modernist + Islands design system while preserving 100% of the existing backend, SSR architecture, API routes, Supabase database schema, Cloudinary upload flow, DNS-validated redirects, and Admin portal functionality.

Non-Negotiable Constraints

NO intro animation, NO mascot, NO GSAP preloader. Remove GSAP and any splash/preloader screens completely. The site must paint immediately for sub-2.5s LCP and sub-150ms INP.

NO runtime Tailwind CDN. Compile all styles at build time via Vite/Astro (src/styles/global.css). Keep total client JS minimal by using Astro static HTML by default and Preact hydration islands (client:visible / client:load / client:only="preact") strictly where interactivity is required.

Zero backend regressions. Every existing Supabase table, API endpoint, cookie auth flow, and verification script (verify_api.mjs) must continue working identically.

No sales team copy anywhere. Every CTA, form, and footer link reflects: "We don't have a sales team. You talk directly to the engineer from day one."

1. BACKEND & INFRASTRUCTURE TO PRESERVE 100% (COPY & WIRE INTO kinbosoft/)

Carry over and keep fully functional inside kinbosoft/:

Runtime: Astro SSR (output: 'server') with @astrojs/node adapter (mode: 'standalone'), Preact integration (@astrojs/preact), MDX (@astrojs/mdx).

Environment variables (.env): PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, ADMIN_PASSWORD, SITE, HOST, PORT.

Supabase Client (src/lib/supabase.ts): Preserve both public client and server-only service-role admin client.

API Endpoints (src/pages/api/):

blog.ts — CRUD for posts

config.ts — GET/POST for site_config (enterprise_assets, primary_settings, models_section, team_assets)

ideas.ts — POST/GET for ideas

products.ts — CRUD for products

redirects.ts — CRUD for redirects with Node.js dns.resolve4(fqdn) validation against proxy IP 18.133.72.105 + dns.resolveAny(fqdn) 422 diagnostics

upload.ts — Server-to-server multipart upload to Cloudinary (https://api.cloudinary.com/v1_1/dw4fmucml/image/upload)

(Add if missing) leads.ts — POST/GET for service_leads (used by /apply, Direct-to-Engineer brief modal, and service forms)

Database Tables (Do NOT alter schema): site_config, products, posts, ideas, redirects, industry_models, service_leads, payments.

Admin Auth: Preserve /admin password-locked login with HTTP-only admin_session cookie and <AdminInterface client:only="preact" />.

Content & Fallbacks: Preserve src/content/config.ts, src/content/blog/*.mdx, src/data/socials.ts, src/data/works.ts, SQL files, and verify_api.mjs.

Dynamic Hostname Redirects + Security Headers (src/middleware.ts):

Intercept incoming custom hostnames against redirects table when applicable.

Attach production security headers on all responses:

Strict-Transport-Security: max-age=31536000; includeSubDomains

X-Content-Type-Options: nosniff

X-Frame-Options: SAMEORIGIN

Referrer-Policy: strict-origin-when-cross-origin

Strict Content-Security-Policy (no inline onerror/onload/onclick handlers anywhere in the codebase).

SEO Endpoints: Add src/pages/robots.txt.ts and src/pages/sitemap.xml.ts returning valid 200 OK crawl directives and all public routes.

2. STRICT BRAND & DESIGN SYSTEM (01 SIGNAL / 02 INVERSE)

Color Tokens (Define in src/styles/global.css)

Strict 3-ink architectural system. ZERO UI gradients, ZERO neon, ZERO purple, ZERO glassmorphism blur. (Gradients are permitted only inside the orbital sunrise <canvas> and calibrated dark photographic scrims.)

:root {
  --void: #050505;
  --carbon: #111111;
  --dark-surface: #181818;
  --ground: #F4F3EF;            /* Warm archival off-white */
  --surface: #FFFFFF;
  --surface-muted: #ECEAE4;
  --signal: #D9261C;            /* Large marks (>=24px), buttons w/ #FFF text, borders */
  --signal-light-bg: #B81D14;   /* WCAG AA (5.9:1) for small 12-14px text on #F4F3EF */
  --signal-dark-bg: #FF5A52;    /* WCAG AA (6.1:1) for small 12-14px text on #111111 */
  --ink-light: #F4F3EF;
  --ink-light-muted: rgba(244, 243, 239, 0.78);
  --ink-dark: #111111;
  --ink-dark-muted: rgba(17, 17, 17, 0.72);
  --rule-light: rgba(17, 17, 17, 0.14);
  --rule-dark: rgba(244, 243, 239, 0.16);
  --radius-sm: 4px;
  --radius-md: 8px;
  --ease-damped: cubic-bezier(0.16, 1, 0.3, 1);
}


Typography

Display & UI: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif (tight tracking -0.035em on display headings).

Technical / Indices / Tabular Math: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace (font-variant-numeric: tabular-nums, strict 12px minimum — never render 10px mono labels).

Load via standard <link rel="preconnect"> + display=swap stylesheet in Layout.astro (zero blocking scripts, zero inline onload).

Deduplicated Brand SVG Sprite (src/layouts/Layout.astro)

Embed a single hidden <svg class="svg-sprite" aria-hidden="true"> with three <symbol> definitions referenced via <use> across the entire site:

#kinbo-logo-light (viewBox="0 0 170 46"): Lowercase geometric kinbo — kin in #D9261C, bo in #111111, circular counters of b and o containing flat 2D circular dots aligned cleanly toward the top-right.

#kinbo-logo-dark (viewBox="0 0 170 46"): Same geometry with bo in #F4F3EF and #111111 counters.

#bo-icon (viewBox="0 0 120 120"): Standalone 1:1 square bo mark (#181818 ground, #F4F3EF letterforms, #D9261C top-right circular dots).

Wrap the subtle damped dot hover-shift (translate(-3.2px, 2px)) strictly inside @media (hover: hover) and disable under @media (prefers-reduced-motion: reduce).

3. ROOT LAYOUT & GLOBAL SHELL (src/layouts/Layout.astro)

Server-side fetch site_config (enterprise_assets & primary_settings) once per request with graceful fallbacks so the WhatsApp number (enterprise_assets.whatsapp_number), default WhatsApp message, and metadata stay dynamically configurable from /admin.

Include on every public page:

Skip-to-content link (<a href="#main-content" class="skip-link">).

Sticky Floating Swiss Island Navbar:

Matte #111111 rounded island (border: 1px solid var(--rule-dark)), left kinbo SVG wordmark, center links (Services, Products, Rates, Blog, About), right primary CTA (Talk to an Engineer) opening the Direct-to-Engineer modal.

Accessible mobile hamburger drawer that toggles aria-expanded cleanly on both button click, link click, and Escape.

5-Column Swiss Footer (#111111):

Col 1: Standalone #bo-icon badge + live status pill (Engineers Online · Direct Access).

Col 2 (Navigation): Home, About, Founder, Team.

Col 3 (Capabilities): Mobile Apps, Websites & E-Com, ERP Systems, AI & Custom R&D, Products (/products).

Col 4 (Engineering Desk): Talk to an Engineer, Transparent Rates (/#rates), RFP Estimator (/ideas), Terminal Chat (/chat), Careers (/apply).

Col 5 (Legal & Terms): Lifelong Support*, Ownership & Hosting, Privacy Policy, Terms of Delivery, Socials (/socials).

Bottom bar: © 2026 KINBO TECHNOLOGIES PRIVATE LIMITED | 01 SIGNAL · KINBOSOFT.COM.

Sticky Mobile Action Bar (< 768px): Fixed bottom Swiss island (min-height: 44px buttons) with [ Estimate ] (/#estimator) and [ WhatsApp Engineer ] (wired dynamically to enterprise_assets.whatsapp_number).

Direct-to-Engineer Modal (<DirectEngineerModal client:idle />):

3-field form: 1. Your Name (autocomplete="name"), 2. Phone or Email (autocomplete="tel"), 3. 1-Line Project Goal (autocomplete="off").

Submits to POST /api/ideas (or /api/leads -> service_leads) so every inquiry is stored in Supabase, then displays instant confirmation + pre-filled WhatsApp handoff link.

Full WCAG 2.2 keyboard focus trap (Tab/Shift+Tab), Escape to close, and focus restoration to the triggering element.

SEO & Schema.org: Per-page unique <title> (30–60 chars), <meta name="description"> (120–160 chars), <link rel="canonical">, Open Graph tags, and @graph JSON-LD (Organization, WebSite, plus page-specific Service, FAQPage, AboutPage, or ContactPage).

4. HOMEPAGE ARCHITECTURE (src/pages/index.astro) — 7 EXACT SECTIONS

Section 0: Orbital Sunrise Hero (src/components/OrbitalHero.astro)

Full-viewport #050505 void with a lightweight, zero-dependency DPR-scaled HTML5 <canvas> rendering a curved planetary horizon, white-gold solar core (#FFFDF5) with anamorphic flare, warm amber to Signal Red (#D9261C) atmospheric bloom, and softly twinkling orbital city lights.

CPU Discipline: Pause requestAnimationFrame via IntersectionObserver when scrolled out of view and on document.hidden; render 1 static frame under prefers-reduced-motion: reduce.

Exact Copy (Do NOT add extra sentences to the hero):

<h1>: You deserve the best. (with <span class="sr-only"> — Custom Software Engineering by kinbo</span> for semantic SEO)

Subtext: We at kinbo care about you.

Two buttons: Explore Services (#services) + Talk to an Engineer (opens modal).

Section 1: Direct-to-Engineer Full-Bleed Image Spread (#direct)

Full-bleed monochrome architectural studio photo (width & height set explicitly, CSS Swiss grid fallback + external JS error listener, zero inline onerror) behind a calibrated dark scrim.

Index: 01 / ZERO SALES TEAM (#FF5A52)

Headline: We don't have a sales team. You talk directly to the engineer from day one.

Answer-First 60-Word Factual Summary Island (left 3px solid #D9261C border): Plain-language summary of what kinbo builds, who it serves (education to industry), starting rates (₹7,000), Research–Build–Refine stages, 100% Day-1 source-code ownership, milestone payments, and lifelong support*.

Bottom 3-column proof strip: 100% Day-1 Source-Code Ownership | 30 / 40 / 30 Milestone Payment Gates | Direct Engineer Reply < 4 Business Hours.

Section 2: 5-Column Interactive Services Explorer (<ServicesExplorer client:visible />)

Heading: 02 / SERVICES — Explore our range of software services.

5 equal Swiss grid columns:

Apps (Flutter, Kotlin, PostgreSQL / SQLite, FastAPI Backend)

Websites (React / Next.js, Custom CMS & Roles, PostgreSQL, FastAPI / Python)

ERP (PostgreSQL, Python / FastAPI, React / Next.js, Live Dashboards)

AI & Automation (LLM / AI Integration, Custom AI Training, OpenCV / Vision, FastAPI Inference)

Custom Systems (Python, Rust, OpenCV / Vision, Data Dashboards)

Each column has two >=44px triggers: Technology and Disciplines (Education, Healthcare, Retail & E-Commerce, Manufacturing & Logistics).

On @media (hover: hover), hovering with a 65ms hover-intent delay drops the sub-panel with crisp inline geometric SVG thumbnails; on touch/keyboard, clicking/tapping opens it cleanly. Clicking any card opens the Direct-to-Engineer modal pre-filled with that exact stack.

Section 3: Cross-Discipline Editorial Bento (#disciplines)

Heading: 03 / CROSS-DISCIPLINE — From education to industry.

Asymmetric 12-column Swiss Bento (7/5 + 5/7) with high-contrast monochrome architectural/engineering photography, explicit width/height, dark gradient scrims, and crisp Image-on-Text overlays:

01 / EDUCATION & INSTITUTIONS — Schools, Colleges & Portals

02 / BRANDS & E-COMMERCE — Fast Storefronts & CMS

03 / INDUSTRIAL OPERATIONS — ERPs & Field Reliability

04 / CUSTOM AI & R&D — Python, Rust & Computer Vision

Section 4: Process & Lifelong Support* Spread (#process — Dark #111111)

Split editorial spread: Left architectural vertical photo (04 / PROCESS — "Not just another software company.") + Right 3 deterministic stages separated by 1px dark hairlines:

01 / RESEARCH (30% MILESTONE) — Architecture, constraints & fixed specification.

02 / BUILD (40% MILESTONE) — Inspectable code with weekly live staging links.

03 / REFINE (30% MILESTONE) — Load testing, full Git transfer & lifelong support*.

Transparent *LIFELONG SUPPORT — HONEST BREAKDOWN callout box (#lifelong-support): Free critical bug fixes on delivered scope + ongoing architectural advice, with optional transparently priced AMC for new feature sprints or managed server ops—zero vendor lock-in.

Section 5: Transparent Rate Cards & 3-Click Scope Estimator (<RatesEstimator client:visible />)

Heading: 05 / TRANSPARENT RATES — Clear math. Zero guesswork. + live INR (₹) / USD ($) toggle (updates <option> labels in place without rebuilding DOM or losing focus).

Left (7 cols): 5-Tab Swiss Rate Card Island (every row is a clickable button pre-filling the Direct-to-Engineer modal):

Portfolio (3 pages with copyright; hosting separate): Basic Static ₹7,000 | Standard with Backend ₹12,000 | Pro Suite (chatbot, CMS, analytics, custom layout) ₹19,000

Brand & E-Com: Brand Starter Static ₹15,000 | CMS & Admin ₹25,000 | Custom Roles + CMS + SEO ₹39,000 | Industry-Grade E-Com ₹59,000

Apps & Combos: Flutter App ₹31,000 | Kotlin Native App ₹39,000 | App Combo ₹69,000 | Industry E-Com + Flutter Combo ₹91,000

ERP: Education ERP From ₹35,000 | Business ERP From ₹39,000

AI & Custom: AI Integration From ₹3,000 | AI Model Training From ₹23,000 (Contact Team) | Custom Data Analytics & Dashboards Contact Team | Python, Rust, Computer Vision & Custom R&D Contact Team

Footnote: Day-1 100% source-code ownership included. | Hosting, domains & third-party APIs billed separately in your name.

Right (5 cols): 3-Click Scope Estimator Island (#estimator, dark #111111):

01 / CATEGORY select -> 02 / TIER select -> 03 / TIMELINE (Standard Base vs Priority +15%).

Live tabular total + live 30% SPEC / 40% BUILD / 30% HANDOVER milestone boxes + Discuss with Engineer & WhatsApp Engineer → actions.

Section 6: Technical FAQ Accordion (#faq)

2-column Swiss layout (4/8 split) with accessible aria-expanded accordion covering: direct engineer access, 30/40/30 milestones, lifelong support* scope, separate hosting/domain ownership, and custom Python/Rust/CV/AI training.

Section 7: Closing Full-Bleed Image Spread

Full-bleed monochrome architectural horizon photo + large #kinbo-logo-dark + "Built to stand tomorrow's tests." + Talk to an Engineer & WhatsApp Engineer →.

5. ALL SECONDARY PAGES (REDESIGNED IN MATCHING SWISS 01 SIGNAL SYSTEM)

Restyle every existing route inside kinbosoft/src/pages/ to share Layout.astro, the exact 01 SIGNAL color/typography tokens, hairline grids, and SSR data fetching:

/products & /products/queuezero: SSR fetch live products and industry_models from Supabase (models_section config), restyle <AutoCarousel client:visible /> as a crisp hairline-framed Swiss showcase.

/blog: SSR fetch live posts from Supabase with MDX content-collection fallback, restyle <BlogFilter client:load /> with clean Swiss category pills (All, Software, Research, Automation).

/about & /founder (Arjun Jayesh): Editorial Swiss typography + selected works timeline (Works.astro) using pure CSS scroll/layout transitions (no GSAP).

/team: SSR fetch team_assets from site_config.

/ideas: Restyle <IdeasForm client:load /> in Swiss island styling, preserving full POST /api/ideas submission.

/chat: Restyle Chat.astro as a crisp #111111 developer console wired to service_leads / engineer intake.

/apply: Restyle employee application intake form wired to service_leads (form_type: 'Employee Application').

/socials: Minimal Swiss link-in-bio index reading src/data/socials.ts.

/admin: Preserve password gate, HTTP-only admin_session cookie, and <AdminInterface client:only="preact" /> with full CRUD for site_config, products, posts, ideas, redirects (DNS A-record check), and Cloudinary /api/upload.

6. MANDATORY 2027 QA & VERIFICATION CHECKLIST (RUN BEFORE FINISHING)

WCAG 2.2 AA:

Every interactive control >= 44×44px touch target.

scroll-padding-top: 88px; scroll-padding-bottom: 84px; on <html> (prevents sticky header/mobile bar from obscuring keyboard focus).

Never apply overflow-x: hidden on <body> (use overflow-x: clip strictly on decorative hero wrappers).

Zero small text using #D9261C on #111111 (always use #FF5A52 on dark, #B81D14 on light).

Modal focus trap + aria-expanded sync + autocomplete tokens verified.

Performance & Security:

Zero Tailwind CDN, zero GSAP, zero inline onerror/onload/onclick.

Every <img> has explicit width, height, loading="lazy", decoding="async".

Orbital canvas pauses when off-screen or hidden.

Build & API Verification:

Run npm install && npm run build inside kinbosoft/ and confirm zero TypeScript/Astro build errors.

Start the SSR server and run node verify_api.mjs to verify /api/ideas, /api/config, /api/products, /api/blog, and /api/redirects return expected responses.