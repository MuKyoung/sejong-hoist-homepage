import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { INQUIRY_STATUS_LABEL, type Inquiry } from "@/lib/supabase/types";
import s from "@/components/admin/admin.module.css";

export const dynamic = "force-dynamic";

const STATUS_CLASS: Record<string, string> = {
  new: s.badgeNew,
  in_progress: s.badgeProgress,
  done: s.badgeDone,
  archived: s.badgeArchived,
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const [newInq, totalInq, notices, portfolio, recent] = await Promise.all([
    supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("inquiries").select("id", { count: "exact", head: true }),
    supabase.from("notices").select("id", { count: "exact", head: true }),
    supabase.from("portfolio").select("id", { count: "exact", head: true }),
    supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const recentRows = (recent.data as Inquiry[] | null) ?? [];

  const stats = [
    { label: "신규 문의", value: newInq.count ?? 0 },
    { label: "전체 문의", value: totalInq.count ?? 0 },
    { label: "게시물", value: notices.count ?? 0 },
    { label: "시공사례", value: portfolio.count ?? 0 },
  ];

  return (
    <>
      <h1 className={s.pageTitle}>대시보드</h1>
      <p className={s.pageDesc}>사이트 운영 현황을 한눈에 확인합니다.</p>

      <div className={s.statGrid}>
        {stats.map((st) => (
          <div key={st.label} className={s.statCard}>
            <p className={s.statLabel}>{st.label}</p>
            <p className={s.statValue}>{st.value}</p>
          </div>
        ))}
      </div>

      <div className={s.panel}>
        <div className={s.panelHead}>
          <span className={s.panelTitle}>최근 문의</span>
          <Link href="/admin/inquiries" className={`${s.btn} ${s.btnSm}`}>전체 보기</Link>
        </div>
        <div className={s.tableWrap}>
          {recentRows.length === 0 ? (
            <p className={s.empty}>접수된 문의가 없습니다.</p>
          ) : (
            <table className={s.table}>
              <thead>
                <tr>
                  <th>접수일</th>
                  <th>이름</th>
                  <th>연락처</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {recentRows.map((row) => (
                  <tr key={row.id}>
                    <td className={s.cellMuted}>{row.created_at?.slice(0, 10)}</td>
                    <td className={s.cellStrong}>{row.name}</td>
                    <td className={s.cellMuted}>{row.phone || row.email || "-"}</td>
                    <td>
                      <span className={`${s.badge} ${STATUS_CLASS[row.status]}`}>
                        {INQUIRY_STATUS_LABEL[row.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
