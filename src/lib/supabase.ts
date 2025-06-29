import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPERBASE_URL!;
const supabaseApi = process.env.SUPERBASE_API!;

export const supabase = createClient(supabaseUrl, supabaseApi);

