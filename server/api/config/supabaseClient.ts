import { createClient } from '@supabase/supabase-js';

// Gantilah dengan URL dan public API key dari proyek Supabase Anda
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);