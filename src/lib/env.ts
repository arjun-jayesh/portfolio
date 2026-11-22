import { z } from 'zod';

const EnvSchema = z.object({
  PUBLIC_SUPABASE_URL: z.string().url().default('https://mwwvycnuyqfoscwizbhk.supabase.co'),
  PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default(''),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  ADMIN_PASSWORD: z.string().min(1).default('local'),
  ADMIN_PASSWORD_HASH: z.string().optional(),
  SITE: z.string().default('https://kinbosoft.com'),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.string().default('4321'),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
  PUBLIC_RAZORPAY_KEY: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().default('dw4fmucml'),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  CLOUDINARY_UPLOAD_PRESET: z.string().default('kinbo1'),
  REDIRECT_PROXY_IP: z.string().default('18.133.72.105'),
  TURNSTILE_SECRET_KEY: z.string().optional(),
});

export type EnvConfig = z.infer<typeof EnvSchema>;

export function getEnv(key: keyof EnvConfig | string): string {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return String(import.meta.env[key]);
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return String(process.env[key]);
  }
  return '';
}

export function validateEnv(): EnvConfig {
  const raw: Record<string, any> = {
    PUBLIC_SUPABASE_URL: getEnv('PUBLIC_SUPABASE_URL') || undefined,
    PUBLIC_SUPABASE_ANON_KEY: getEnv('PUBLIC_SUPABASE_ANON_KEY') || undefined,
    SUPABASE_SERVICE_ROLE_KEY: getEnv('SUPABASE_SERVICE_ROLE_KEY') || undefined,
    ADMIN_PASSWORD: getEnv('ADMIN_PASSWORD') || undefined,
    ADMIN_PASSWORD_HASH: getEnv('ADMIN_PASSWORD_HASH') || undefined,
    SITE: getEnv('SITE') || undefined,
    HOST: getEnv('HOST') || undefined,
    PORT: getEnv('PORT') || undefined,
    RAZORPAY_KEY_ID: getEnv('RAZORPAY_KEY_ID') || undefined,
    RAZORPAY_KEY_SECRET: getEnv('RAZORPAY_KEY_SECRET') || undefined,
    RAZORPAY_WEBHOOK_SECRET: getEnv('RAZORPAY_WEBHOOK_SECRET') || undefined,
    PUBLIC_RAZORPAY_KEY: getEnv('PUBLIC_RAZORPAY_KEY') || undefined,
    CLOUDINARY_CLOUD_NAME: getEnv('CLOUDINARY_CLOUD_NAME') || undefined,
    CLOUDINARY_API_KEY: getEnv('CLOUDINARY_API_KEY') || undefined,
    CLOUDINARY_API_SECRET: getEnv('CLOUDINARY_API_SECRET') || undefined,
    CLOUDINARY_UPLOAD_PRESET: getEnv('CLOUDINARY_UPLOAD_PRESET') || undefined,
    REDIRECT_PROXY_IP: getEnv('REDIRECT_PROXY_IP') || undefined,
    TURNSTILE_SECRET_KEY: getEnv('TURNSTILE_SECRET_KEY') || undefined,
  };

  const parsed = EnvSchema.safeParse(raw);
  if (!parsed.success) {
    console.error('CRITICAL: Environment validation failed:', parsed.error.format());
    return EnvSchema.parse({});
  }
  return parsed.data;
}

export const env = validateEnv();
