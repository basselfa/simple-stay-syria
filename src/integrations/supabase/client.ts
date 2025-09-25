import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Prefer environment variables; fall back to provided constants if present

// Your Supabase project details
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string; 
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;// You need to provide your anon key


// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";
// or default import: import supabase from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

export default supabase;