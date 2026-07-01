import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import AdminShell from "@/components/admin/AdminShell";
import type { Role } from "@/lib/supabase/types";
import s from "@/components/admin/admin.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "관리자 | 세종호이스트크레인 CMS",
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured) {
    return (
      <div className={s.notice}>
        <p className={s.noticeTitle}>CMS가 아직 설정되지 않았습니다</p>
        <p className={s.noticeText}>
          <code>.env.local</code>에 Supabase 환경변수를 추가하고{" "}
          <code>supabase/schema.sql</code>을 실행한 뒤 관리자 계정을 생성하세요.
          자세한 절차는 저장소의 <code>CMS_SETUP.md</code>를 참고하세요.
        </p>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not signed in → login (middleware also guards; this is defense-in-depth).
  if (!user) redirect("/admin/login");

  // Must have a staff profile (admin or editor).
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, role")
    .eq("id", user.id)
    .single();

  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    return (
      <div className={s.notice}>
        <p className={s.noticeTitle}>접근 권한이 없습니다</p>
        <p className={s.noticeText}>
          이 계정에는 관리자 권한이 부여되지 않았습니다. 관리자에게 권한 부여를
          요청하세요.
        </p>
        <form action={async () => { "use server"; const c = await createClient(); await c.auth.signOut(); redirect("/admin/login"); }}>
          <button type="submit" className={s.btn} style={{ marginTop: 16 }}>로그아웃</button>
        </form>
      </div>
    );
  }

  return (
    <AdminShell role={profile.role as Role} name={profile.full_name || profile.email || "관리자"}>
      {children}
    </AdminShell>
  );
}
