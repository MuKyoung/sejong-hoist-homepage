import { createClient } from "@/lib/supabase/server";
import type { Inquiry } from "@/lib/supabase/types";
import InquiryRow from "./InquiryRow";
import s from "@/components/admin/admin.module.css";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = (data as Inquiry[] | null) ?? [];

  return (
    <>
      <h1 className={s.pageTitle}>문의 관리</h1>
      <p className={s.pageDesc}>견적·문의 접수 내역을 확인하고 처리 상태를 관리합니다.</p>

      <div className={s.panel}>
        <div className={s.tableWrap}>
          {rows.length === 0 ? (
            <p className={s.empty}>접수된 문의가 없습니다.</p>
          ) : (
            <table className={s.table}>
              <thead>
                <tr>
                  <th>접수일</th>
                  <th>이름 / 회사</th>
                  <th>연락처</th>
                  <th>제품군</th>
                  <th>상태</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <InquiryRow key={row.id} inquiry={row} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
