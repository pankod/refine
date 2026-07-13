import { dataProvider as supabaseDataProvider } from "@refinedev/supabase";

import { supabaseClient } from "@/providers/supabase-client";

export const dataProvider = supabaseDataProvider(supabaseClient);
