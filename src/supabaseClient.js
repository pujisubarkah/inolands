import { createClient } from '@supabase/supabase-js';

// Gantilah dengan URL dan public API key dari proyek Supabase Anda
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);