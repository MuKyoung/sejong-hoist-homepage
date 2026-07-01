import { createClient } from "@/lib/supabase/server";
import type { Notice } from "@/lib/supabase/types";
import PostsManager from "./PostsManager";
import s from "@/components/admin/admin.module.css";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("notices")
    .select("*")
    .order("published_at", { ascending: false });

  const rows = (data as Notice[] | null) ?? [];

  return (
    <>
      <h1 className={s.pageTitle}>게시물 관리</h1>
      <p className={s.pageDesc}>최근소식·공지 게시물을 등록·수정·삭제합니다.</p>
      <PostsManager initialRows={rows} />
    </>
  );
}
