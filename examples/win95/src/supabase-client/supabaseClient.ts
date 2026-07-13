import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://zqkwxnnygrsquzhpcckc.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxa3d4bm55Z3JzcXV6aHBjY2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjI3NjgsImV4cCI6MjAyNzAzODc2OH0.E5mjFNUQpNiz4Bw0bTyQ_Nyd8KPs3CIibp6tCKewUH0";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
