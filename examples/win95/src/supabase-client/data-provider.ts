import { dataProvider as supabaseDataProvider } from "@refinedev/supabase";
import { supabaseClient } from "@/supabase-client";

export const dataProvider = supabaseDataProvider(supabaseClient);
