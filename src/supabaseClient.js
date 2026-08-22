import { createClient } from "@supabase/supabase-js";

// ==========================================
// SUPABASE CONFIGURATION
// Paste your Supabase Project URL and Public Anon Key below
// ==========================================

const rawUrl = "https://zquyjwfrvliqdqbxcgbf.supabase.co/rest/v1/";
// Clean up URL if /rest/v1/ was included
const SUPABASE_URL = rawUrl.replace(/\/rest\/v1\/?$/, "");
const SUPABASE_PUBLIC_KEY = "sb_publishable_NeM4uTBddDsOCFm4E2S_Dw_r-vfJ7QV";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
