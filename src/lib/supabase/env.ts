/** True when Supabase env vars are present. Lets /admin render a helpful
 *  "not configured yet" state instead of crashing before setup is done. */
export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
