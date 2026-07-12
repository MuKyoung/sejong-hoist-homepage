import { createClient } from "@/lib/supabase/server";
import PortfolioManager, { type PortfolioRow } from "./PortfolioManager";
import s from "@/components/admin/admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = (data as PortfolioRow[] | null) ?? [];

  return (
    <>
      <h1 className={s.pageTitle}>시공사례 관리</h1>
      <p className={s.pageDesc}>
        시공사례를 등록·수정·삭제합니다. 저장하면 홈·시공사례 페이지에 자동 반영됩니다.
      </p>
      <PortfolioManager initialRows={rows} />
    </>
  );
}
