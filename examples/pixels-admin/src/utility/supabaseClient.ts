import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://ifbdnkfqbypnkmwcfdes.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmYmRua2ZxYnlwbmttd2NmZGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA5MTgzOTEsImV4cCI6MTk4NjQ5NDM5MX0.ThQ40H-xay-Hi5cf7H9mKccMCvAX3iCvYVJDe0KiHtw";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
