import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * 공개 페이지용 anon 클라이언트 (세션/쿠키 없음 — 정적 생성·ISR을 깨지 않음).
 * RLS의 public-read 정책(is_published)만으로 접근 가능한 데이터를 읽는다.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
