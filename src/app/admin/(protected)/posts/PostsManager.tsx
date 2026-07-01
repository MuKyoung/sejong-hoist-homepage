"use client";

import { useState, useTransition } from "react";
import { NOTICE_CATEGORY_OPTIONS, type Notice } from "@/lib/supabase/types";
import { saveNotice, deleteNotice, type NoticeInput } from "../actions";
import s from "@/components/admin/admin.module.css";

const EMPTY: NoticeInput = {
  category: "회사소식",
  title: "",
  body: "",
  is_important: false,
  is_published: true,
};

export default function PostsManager({ initialRows }: { initialRows: Notice[] }) {
  const [form, setForm] = useState<NoticeInput>(EMPTY);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const editing = form.id != null;

  function edit(n: Notice) {
    setForm({
      id: n.id,
      category: n.category,
      title: n.title,
      body: n.body ?? "",
      is_important: n.is_important,
      is_published: n.is_published,
    });
    setMsg(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setForm(EMPTY);
    setMsg(null);
  }

  function submit() {
    setMsg(null);
    startTransition(async () => {
      const res = await saveNotice(form);
      if (res.error) {
        setMsg(`저장 실패: ${res.error}`);
      } else {
        setMsg("저장되었습니다.");
        setForm(EMPTY);
      }
    });
  }

  function remove(id: number) {
    if (!confirm("이 게시물을 삭제할까요?")) return;
    startTransition(async () => {
      const res = await deleteNotice(id);
      if (res.error) setMsg(`삭제 실패: ${res.error}`);
    });
  }

  return (
    <>
      <div className={s.panel} style={{ marginBottom: 24 }}>
        <div className={s.panelHead}>
          <span className={s.panelTitle}>{editing ? "게시물 수정" : "새 게시물"}</span>
          {editing && (
            <button className={`${s.btn} ${s.btnSm}`} onClick={reset}>새로 작성</button>
          )}
        </div>
        <div style={{ padding: 22, display: "grid", gap: 14 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <select
              className={`${s.select} ${s.selectSm}`}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {NOTICE_CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--body)" }}>
              <input type="checkbox" checked={form.is_important}
                onChange={(e) => setForm({ ...form, is_important: e.target.checked })} />
              중요
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--body)" }}>
              <input type="checkbox" checked={form.is_published}
                onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
              게시
            </label>
          </div>

          <input
            className={s.input}
            placeholder="제목"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className={s.textarea}
            placeholder="본문 (선택)"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />

          <div className={s.rowActions}>
            <button className={`${s.btn} ${s.btnPrimary}`} onClick={submit} disabled={pending}>
              {pending ? "저장 중…" : editing ? "수정 저장" : "등록"}
            </button>
            {msg && <span className={s.cellMuted}>{msg}</span>}
          </div>
        </div>
      </div>

      <div className={s.panel}>
        <div className={s.tableWrap}>
          {initialRows.length === 0 ? (
            <p className={s.empty}>등록된 게시물이 없습니다.</p>
          ) : (
            <table className={s.table}>
              <thead>
                <tr>
                  <th>게시일</th>
                  <th>분류</th>
                  <th>제목</th>
                  <th>상태</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {initialRows.map((n) => (
                  <tr key={n.id}>
                    <td className={s.cellMuted}>{n.published_at?.slice(0, 10)}</td>
                    <td><span className={`${s.badge} ${s.badgeMuted}`}>{n.category}</span></td>
                    <td className={s.cellStrong}>
                      {n.is_important && <span style={{ color: "var(--primary)" }}>★ </span>}
                      {n.title}
                    </td>
                    <td>
                      <span className={`${s.badge} ${n.is_published ? s.badgeDone : s.badgeArchived}`}>
                        {n.is_published ? "게시중" : "비공개"}
                      </span>
                    </td>
                    <td>
                      <div className={s.rowActions}>
                        <button className={`${s.btn} ${s.btnSm}`} onClick={() => edit(n)} disabled={pending}>수정</button>
                        <button className={`${s.btn} ${s.btnDanger} ${s.btnSm}`} onClick={() => remove(n.id)} disabled={pending}>삭제</button>
                      </div>
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
