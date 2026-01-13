// assets/js/supabase.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supabase = createClient(
  "https://hydtchbejefpsrcbcvta.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5ZHRjaGJlamVmcHNyY2JjdnRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MjExNjAsImV4cCI6MjA4MzM5NzE2MH0.-02P-evbPRxhOyeRzJNU_QX5XkOOU91ofbM9U3GaK90"
);
