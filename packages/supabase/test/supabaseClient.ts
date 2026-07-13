import { createClient } from "../src/index";

const SUPABASE_URL = "https://iwdfzvfqbtokqetmbmbp.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDU2NzAxMCwiZXhwIjoxOTQ2MTQzMDEwfQ._gr6kXGkQBi9BM9dx5vKaNKYj_DJN1xlkarprGpM_fU";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  global: {
    headers: {
      "Accept-Encoding": "identity",
    },
  },
});

export default supabaseClient;
