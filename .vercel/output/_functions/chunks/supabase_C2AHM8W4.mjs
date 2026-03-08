import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://mwwvycnuyqfoscwizbhk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13d3Z5Y251eXFmb3Njd2l6YmhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MzYyNzgsImV4cCI6MjA4ODUxMjI3OH0.s6ZaOYWiKcZUM3O2L9bv-naGVSSRIBBGnW0wteO1t9w";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13d3Z5Y251eXFmb3Njd2l6YmhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjkzNjI3OCwiZXhwIjoyMDg4NTEyMjc4fQ.Yk_heqtQQ1zfx9Aq6BZIXEtmcgDRTpSL5WEjkH38Gkg";
const createSafeClient = (url, key) => {
  try {
    if (!url || !key) return null;
    if (typeof url !== "string" || !url.startsWith("http")) {
      console.error("SafeSupabase: Invalid URL provided");
      return null;
    }
    return createClient(url, key);
  } catch (e) {
    console.error("SafeSupabase: Initialization crash caught:", e);
    return null;
  }
};
const supabase = createSafeClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createSafeClient(supabaseUrl, supabaseServiceKey);

export { supabase as a, supabaseAdmin as s };
