import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Client for public operations (SSR data fetching)
// We only initialize if we have the variables to avoid crashes
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Client for privileged operations (Admin panel writes)
export const supabaseAdmin = (supabaseUrl && (supabaseServiceKey || supabaseAnonKey))
    ? createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey)
    : null;
