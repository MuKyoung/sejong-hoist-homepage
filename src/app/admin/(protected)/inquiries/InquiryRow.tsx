"use client";

import { useState, useTransition } from "react";
import {
  INQUIRY_STATUS_LABEL,
  type Inquiry,
  type InquiryStatus,
} from "@/lib/supabase/types";
import { updateInquiry, deleteInquiry } from "../actions";
import s from "@/components/admin/admin.module.css";

const STATUS_CLASS: Record<InquiryStatus, string> = {
  new: s.badgeNew,
  in_progress: s.badgeProgress,
  done: s.badgeDone,
  archived: s.badgeArchived,
};

const STATUSES: InquiryStatus[] = ["new", "in_progress", "done", "archived"];

export type AttachmentLink = { name: string; url: string | null };

export default function InquiryRow({
  inquiry,
  attachments = [],
}: {
  inquiry: Inquiry;
  attachments?: AttachmentLink[];
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<InquiryStatus>(inquiry.status);
  const [note, setNote] = useState(inquiry.admin_note ?? "");
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function save() {
    setMsg(null);
    startTransition(async () => {
      const res = await updateInquiry(inquiry.id, status, note);
      setMsg(res.error ? `저장 실패: ${res.error}` : "저장되었습니다.");
    });
  }

  function remove() {
    if (!confirm("이 문의를 삭제할까요? 되돌릴 수 없습니다.")) return;
    startTransition(async () => {
      const res = await deleteInquiry(inquiry.id);
      if (res.error) setMsg(`삭제 실패: ${res.error}`);
    });
  }

  return (
    <>
      <tr onClick={() => setOpen((v) => !v)} style={{ cursor: "pointer" }}>
        <td className={s.cellMuted}>{inquiry.created_at?.slice(0, 10)}</td>
        <td>
          <span className={s.cellStrong}>{inquiry.name}</span>
          {inquiry.company && <div className={s.cellMuted}>{inquiry.company}</div>}
        </td>
        <td className={s.cellMuted}>{inquiry.phone || inquiry.email || "-"}</td>
        <td className={s.cellMuted}>{inquiry.product_category || "-"}</td>
        <td>
          <span className={`${s.badge} ${STATUS_CLASS[inquiry.status]}`}>
            {INQUIRY_STATUS_LABEL[inquiry.status]}
          </span>
        </td>
        <td className={s.cellMuted}>{open ? "▲" : "▼"}</td>
      </tr>

      {open && (
        <tr>
          <td colSpan={6} style={{ background: "var(--surface-alt)" }}>
            <div style={{ display: "grid", gap: 14, maxWidth: 720 }}>
              <div>
                <p className={s.statLabel} style={{ marginBottom: 4 }}>문의 내용</p>
                <p style={{ whiteSpace: "pre-wrap", fontSize: 14, color: "var(--body)", lineHeight: 1.6 }}>
                  {inquiry.message}
                </p>
              </div>
              {inquiry.email && (
                <p className={s.cellMuted}>이메일: {inquiry.email}</p>
              )}

              {attachments.length > 0 && (
                <div>
                  <p className={s.statLabel} style={{ marginBottom: 4 }}>
                    첨부파일 ({attachments.length})
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {attachments.map((a) =>
                      a.url ? (
                        <a
                          key={a.name}
                          href={a.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`${s.btn} ${s.btnSm}`}
                        >
                          ⬇ {a.name}
                        </a>
                      ) : (
                        <span key={a.name} className={s.cellMuted}>
                          {a.name} (링크 만료 — 새로고침)
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <select
                  className={`${s.select} ${s.selectSm}`}
                  value={status}
                  onChange={(e) => setStatus(e.target.value as InquiryStatus)}
                >
                  {STATUSES.map((st) => (
                    <option key={st} value={st}>{INQUIRY_STATUS_LABEL[st]}</option>
                  ))}
                </select>
              </div>

              <textarea
                className={s.textarea}
                placeholder="처리 메모 (내부용)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <div className={s.rowActions}>
                <button className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={save} disabled={pending}>
                  {pending ? "저장 중…" : "저장"}
                </button>
                <button className={`${s.btn} ${s.btnDanger} ${s.btnSm}`} onClick={remove} disabled={pending}>
                  삭제
                </button>
                {msg && <span className={s.cellMuted}>{msg}</span>}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
