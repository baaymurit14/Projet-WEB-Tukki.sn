import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialisation du client Supabase
const supabase: SupabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

export default supabase;