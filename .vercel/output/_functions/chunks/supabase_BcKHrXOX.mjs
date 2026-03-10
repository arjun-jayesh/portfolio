import { createClient } from '@supabase/supabase-js';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13d3Z5Y251eXFmb3Njd2l6YmhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MzYyNzgsImV4cCI6MjA4ODUxMjI3OH0.s6ZaOYWiKcZUM3O2L9bv-naGVSSRIBBGnW0wteO1t9w", "PUBLIC_SUPABASE_URL": "https://mwwvycnuyqfoscwizbhk.supabase.co", "SITE": "https://portfolio-sage-two-43.vercel.app", "SSR": true};
const getEnv = (key) => {
  return Object.assign(__vite_import_meta_env__, { SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13d3Z5Y251eXFmb3Njd2l6YmhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjkzNjI3OCwiZXhwIjoyMDg4NTEyMjc4fQ.Yk_heqtQQ1zfx9Aq6BZIXEtmcgDRTpSL5WEjkH38Gkg", PUBLIC: process.env.PUBLIC })[key] || (typeof process !== "undefined" ? process.env[key] : "");
};
const supabaseUrl = getEnv("PUBLIC_SUPABASE_URL");
const supabaseAnonKey = getEnv("PUBLIC_SUPABASE_ANON_KEY");
const supabaseServiceKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");
const createSafeClient = (url, key, label) => {
  try {
    if (!url || !key) {
      console.warn(`SafeSupabase [${label}]: Missing URL or Key. Client will be null.`);
      return null;
    }
    if (typeof url !== "string" || !url.startsWith("http")) {
      console.error(`SafeSupabase [${label}]: Invalid URL provided: ${url}`);
      return null;
    }
    return createClient(url, key, {
      auth: {
        persistSession: false
        // Critical for SSR/Serverless to avoid memory/storage issues
      }
    });
  } catch (e) {
    console.error(`SafeSupabase [${label}]: Initialization crash caught:`, e);
    return null;
  }
};
const supabase = createSafeClient(supabaseUrl, supabaseAnonKey, "Public");
const supabaseAdmin = createSafeClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, "Admin");

export { supabase as a, supabaseAdmin as s };
