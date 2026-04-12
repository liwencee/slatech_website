import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

// Service role client — use ONLY on the server for admin operations
// This bypasses RLS, so handle with care
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
