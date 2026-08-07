import { createClient } from "@refinedev/supabase";

import { SUPABASE_KEY, SUPABASE_URL } from "@/providers/constants";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
