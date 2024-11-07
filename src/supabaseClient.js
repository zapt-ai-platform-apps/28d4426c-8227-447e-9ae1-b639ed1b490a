import { initializeZapt } from '@zapt/zapt-js';
import { createClient } from '@supabase/supabase-js';

const { createEvent } = initializeZapt(import.meta.env.VITE_PUBLIC_APP_ID);

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export { createEvent };