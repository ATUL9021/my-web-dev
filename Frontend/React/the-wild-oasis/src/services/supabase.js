import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://blnnffxkcxotrhltqrqb.supabase.co";
const supabaseKey = "sb_publishable_Pv8yB4QrGF1Z836xFQRR9A_yYW58090";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
