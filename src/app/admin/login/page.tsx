"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import s from "./login.module.css";

export const dynamic = "force-dynamic";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        setLoading(false);
        return;
      }
      const next = params.get("next") || "/admin";
      router.replace(next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch {
      setError("로그인 처리 중 오류가 발생했습니다.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <p className={s.title}>관리자 로그인</p>
      <p className={s.desc}>세종호이스트크레인 CMS</p>

      <div className={s.field}>
        <label className={s.label} htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          className={s.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          className={s.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      <button type="submit" className={s.submit} disabled={loading}>
        {loading ? "로그인 중…" : "로그인"}
      </button>

      {error && <p className={s.error}>{error}</p>}
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className={s.wrap}>
      <div className={s.card}>
        <div className={s.brand}>
          <span className={s.brandMark}>SJ</span>
          <span className={s.brandText}>Sejong Hoist CMS</span>
        </div>

        {isSupabaseConfigured ? (
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        ) : (
          <p className={s.notice}>
            CMS가 아직 설정되지 않았습니다. <code>.env.local</code>에 Supabase
            환경변수를 추가하고 <code>supabase/schema.sql</code>을 실행한 뒤
            다시 시도하세요. 자세한 절차는 <code>CMS_SETUP.md</code>를 참고하세요.
          </p>
        )}
      </div>
    </div>
  );
}
