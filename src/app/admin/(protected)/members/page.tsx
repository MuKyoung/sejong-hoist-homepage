import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";
import MemberRow from "./MemberRow";
import s from "@/components/admin/admin.module.css";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id ?? "")
    .single();

  if (me?.role !== "admin") {
    return (
      <div className={s.notice}>
        <p className={s.noticeTitle}>관리자 전용</p>
        <p className={s.noticeText}>회원·권한 관리는 관리자(admin) 계정만 접근할 수 있습니다.</p>
      </div>
    );
  }

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  const rows = (data as Profile[] | null) ?? [];

  return (
    <>
      <h1 className={s.pageTitle}>회원 관리</h1>
      <p className={s.pageDesc}>
        관리자 계정과 권한(역할)을 관리합니다. 새 계정은 Supabase 콘솔에서 초대하며,
        권한은 여기에서 변경합니다.
      </p>

      <div className={s.panel}>
        <div className={s.tableWrap}>
          {rows.length === 0 ? (
            <p className={s.empty}>등록된 계정이 없습니다.</p>
          ) : (
            <table className={s.table}>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>가입일</th>
                  <th>권한</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <MemberRow key={p.id} member={p} isSelf={p.id === user?.id} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
