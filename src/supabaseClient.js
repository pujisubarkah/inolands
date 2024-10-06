import { createClient } from '@supabase/supabase-js';

// Gantilah dengan URL dan public API key dari proyek Supabase Anda
const supabaseUrl = 'https://irwwpvnfalrzsxskcmax.supabase.co/';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlyd3dwdm5mYWxyenN4c2tjbWF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzNzcwNzIsImV4cCI6MjA0MTk1MzA3Mn0.Phww4choGNvSeJ9v5n_rllot4QLmpgBwOZVpDwNESLA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
