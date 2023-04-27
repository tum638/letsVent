import { createClient } from "@supabase/supabase-js";
const URL = "https://vtemscljzhbbxjetdhcx.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0ZW1zY2xqemhiYnhqZXRkaGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI0Mzk4NTUsImV4cCI6MTk5ODAxNTg1NX0.4LJKfrdeOxOlCBiKRP2BLP_fslFEu1LpbjpnVzQzMuk";
export const supabase = createClient(URL, API_KEY);

