import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ivrbpglzldxfpwdslonh.supabase.co";
const supabaseAnonKey = "sb_publishable__sTBE6pq-77V5AVmc6FaPw_jnVP7QEF";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
