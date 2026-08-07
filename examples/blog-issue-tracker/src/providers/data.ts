import { dataProvider as createDataProvider } from "@refinedev/supabase";

import { supabaseClient } from "./supabase-client";

export const dataProvider = createDataProvider(supabaseClient);
