import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iqtofesznadnojvovroy.supabase.co";

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdG9mZXN6bmFkbm9qdm92cm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0ODQwNzQsImV4cCI6MjA3OTA2MDA3NH0.jJWJNdasyUKuxgBHWTxj2CBiP5uFhq9ivXs574ZDkZI"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
