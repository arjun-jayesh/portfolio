import { z } from 'zod';

// SSRF Safe URL check disallowing loopback and private CIDRs
const PRIVATE_IP_PATTERNS = [
  /^localhost$/i,
  /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/,
  /^192\.168\.\d{1,3}\.\d{1,3}$/,
  /^169\.254\.\d{1,3}\.\d{1,3}$/, // link-local and AWS metadata (169.254.169.254)
  /^0\.0\.0\.0$/,
  /^::1$/,
  /^fc00:/i,
  /^fe80:/i,
];

export function isSafeExternalUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    const hostname = parsed.hostname.toLowerCase();
    for (const pattern of PRIVATE_IP_PATTERNS) {
      if (pattern.test(hostname)) return false;
    }
    return true;
  } catch {
    return false;
  }
}

// ─── 1. Idea Submission (Estimator / RFP) ───
export const IdeaSubmissionSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address').max(150),
  phone: z.string().trim().max(30).nullable().optional(),
  project_type: z.string().trim().min(2).max(100),
  budget: z.string().trim().max(50).nullable().optional(),
  timeline: z.string().trim().max(50).nullable().optional(),
  idea_title: z.string().trim().min(2).max(200),
  idea_description: z.string().trim().min(5).max(5000),
  target_audience: z.string().trim().max(500).nullable().optional(),
  features: z.string().trim().max(2000).nullable().optional(),
  portfolio_url: z.string().trim().url().max(300).nullable().optional().or(z.literal('')),
  linkedin: z.string().trim().max(300).nullable().optional(),
  additional_notes: z.string().trim().max(2000).nullable().optional(),
  cf_turnstile_response: z.string().optional(),
});

// ─── 2. Service Leads Intake ───
export const ServiceLeadSchema = z.object({
  form_type: z.string().trim().min(2).max(100).default('Direct-to-Engineer Brief'),
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address').max(150),
  phone: z.string().trim().max(30).nullable().optional(),
  organization: z.string().trim().max(150).nullable().optional(),
  metadata: z.record(z.any()).default({}),
  cf_turnstile_response: z.string().optional(),
});

// ─── 3. Redirect Registry ───
const FQDN_REGEX = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63})+$/;

export const RedirectSchema = z.object({
  id: z.string().uuid().optional(),
  fqdn: z.string().trim().toLowerCase().regex(FQDN_REGEX, 'Invalid FQDN hostname'),
  target_url: z.string().trim().refine(isSafeExternalUrl, {
    message: 'target_url must be a valid public http:// or https:// URL (internal/private IPs forbidden)',
  }),
});

// ─── 4. Payments: Create Order ───
export const CANONICAL_SERVICES: Record<string, number> = {
  'Portfolio Basic': 7000,
  'Portfolio Standard': 12000,
  'Portfolio Pro': 19000,
  'Brand Starter': 15000,
  'CMS & Admin': 25000,
  'Custom Roles + CMS + SEO': 39000,
  'Industry E-Com': 59000,
  'Flutter App': 31000,
  'Kotlin Native App': 39000,
  'App Combo': 69000,
  'Industry E-Com + Flutter Combo': 91000,
  'Education ERP': 35000,
  'Business ERP': 39000,
  'AI Integration': 3000,
  'AI Model Training': 23000,
};

export const PaymentOrderSchema = z.object({
  amount: z.number().int().positive().max(10_000_000),
  currency: z.string().length(3).default('INR'),
  service_name: z.string().trim().min(2).max(100),
  customer: z.object({
    name: z.string().trim().max(100).optional(),
    email: z.string().trim().email().max(150).optional(),
    phone: z.string().trim().max(30).optional(),
    org: z.string().trim().max(150).optional(),
  }).optional(),
});

// ─── 5. Payments: Verify Payment ───
export const PaymentVerifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  service_name: z.string().optional(),
  customer: z.record(z.any()).optional(),
});

// ─── 6. Turnstile Verification Helper ───
export async function verifyTurnstileToken(token: string | undefined, secret: string | undefined, remoteIp?: string): Promise<boolean> {
  if (!secret) {
    // If no secret configured in environment, allow through (dev mode fallback)
    return true;
  }
  if (!token) {
    return false;
  }
  try {
    const formData = new FormData();
    formData.append('secret', secret);
    formData.append('response', token);
    if (remoteIp) formData.append('remoteip', remoteIp);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    return Boolean(result.success);
  } catch (err) {
    console.error('Turnstile verification error:', err);
    return false;
  }
}
