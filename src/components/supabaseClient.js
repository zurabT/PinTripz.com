import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wajlcrmikbaoglnmwphq.supabase.co";

const supabaseKey =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indhamxjcm1pa2Jhb2dsbm13cGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0ODY3MDksImV4cCI6MjA1MTA2MjcwOX0.2oe9r94g0xHelQWOTpoZI4Ty4bGuRh_H9FHlnxc0xvQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
