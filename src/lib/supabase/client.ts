import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client (uses public anon key).
 * Row-level security (RLS) enforces what this key can actually read/write.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
