"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  PORTFOLIO_INDUSTRIES,
  PORTFOLIO_CAPACITY_BUCKETS,
} from "@/data/site";
import { savePortfolioItem, deletePortfolioItem, type PortfolioInput } from "../actions";
import s from "@/components/admin/admin.module.css";

export type PortfolioRow = {
  id: number;
  slug: string;
  title: string;
  client: string | null;
  industry: string | null;
  capacity: string | null;
  capacity_bucket: string | null;
  category: string | null;
  year: string | null;
  location: string | null;
  period: string | null;
  scope: string[] | null;
  description: string | null;
  specs: { label: string; value: string }[] | null;
  src: string | null;
  gallery: string[] | null;
  is_published: boolean;
  created_at: string;
};

type FormState = {
  id?: number;
  slug: string;
  title: string;
  client: string;
  industry: string;
  capacity: string;
  capacity_bucket: string;
  category: string;
  year: string;
  location: string;
  period: string;
  scopeText: string;
  description: string;
  specsText: string;
  src: string;
  gallery: string[];
  is_published: boolean;
};

const EMPTY: FormState = {
  slug: "",
  title: "",
  client: "",
  industry: "전기·전자",
  capacity: "",
  capacity_bucket: "1T",
  category: "",
  year: "",
  location: "",
  period: "",
  scopeText: "",
  description: "",
  specsText: "",
  src: "",
  gallery: [],
  is_published: true,
};

const BUCKET = "portfolio-images";

function parseSpecs(text: string): { label: string; value: string }[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx < 0) return { label: line, value: "" };
      return { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
    });
}

export default function PortfolioManager({ initialRows }: { initialRows: PortfolioRow[] }) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [msg, setMsg] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();

  const editing = form.id != null;
  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  async function upload(file: File): Promise<string | null> {
    const supabase = createClient();
    const safe = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });
    if (error) {
      setMsg(`업로드 실패: ${error.message}`);
      return null;
    }
    return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  async function onMainImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await upload(file);
    if (url) set({ src: url, gallery: form.gallery.includes(url) ? form.gallery : [url, ...form.gallery] });
    setUploading(false);
    e.target.value = "";
  }

  async function onGalleryImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of files) {
      const url = await upload(file);
      if (url) urls.push(url);
    }
    if (urls.length) set({ gallery: [...form.gallery, ...urls] });
    setUploading(false);
    e.target.value = "";
  }

  function edit(row: PortfolioRow) {
    setForm({
      id: row.id,
      slug: row.slug,
      title: row.title,
      client: row.client ?? "",
      industry: row.industry ?? "전기·전자",
      capacity: row.capacity ?? "",
      capacity_bucket: row.capacity_bucket ?? "1T",
      category: row.category ?? "",
      year: row.year ?? "",
      location: row.location ?? "",
      period: row.period ?? "",
      scopeText: (row.scope ?? []).join("\n"),
      description: row.description ?? "",
      specsText: (row.specs ?? []).map((sp) => `${sp.label}: ${sp.value}`).join("\n"),
      src: row.src ?? "",
      gallery: row.gallery ?? [],
      is_published: row.is_published,
    });
    setMsg(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submit() {
    setMsg(null);
    const input: PortfolioInput = {
      id: form.id,
      slug: form.slug,
      title: form.title,
      client: form.client,
      industry: form.industry,
      capacity: form.capacity,
      capacity_bucket: form.capacity_bucket,
      category: form.category,
      year: form.year,
      location: form.location,
      period: form.period,
      scope: form.scopeText.split("\n").map((v) => v.trim()).filter(Boolean),
      description: form.description,
      specs: parseSpecs(form.specsText),
      src: form.src,
      gallery: form.gallery,
      is_published: form.is_published,
    };
    startTransition(async () => {
      const res = await savePortfolioItem(input);
      if (res.error) {
        setMsg(`저장 실패: ${res.error}`);
      } else {
        setMsg("저장되었습니다. 공개 페이지에 반영됩니다.");
        setForm(EMPTY);
      }
    });
  }

  function remove(row: PortfolioRow) {
    if (!confirm(`"${row.title}" 사례를 삭제할까요?`)) return;
    startTransition(async () => {
      const res = await deletePortfolioItem(row.id, row.slug);
      if (res.error) setMsg(`삭제 실패: ${res.error}`);
    });
  }

  return (
    <>
      <div className={s.panel} style={{ marginBottom: 24 }}>
        <div className={s.panelHead}>
          <span className={s.panelTitle}>{editing ? "사례 수정" : "새 시공사례"}</span>
          {editing && (
            <button className={`${s.btn} ${s.btnSm}`} onClick={() => { setForm(EMPTY); setMsg(null); }}>
              새로 작성
            </button>
          )}
        </div>
        <div style={{ padding: 22, display: "grid", gap: 14 }}>
          <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
            <input className={s.input} placeholder="제목 (예: 겐트리 크레인 350TON)"
              value={form.title} onChange={(e) => set({ title: e.target.value })} />
            <input className={s.input} placeholder="슬러그 (영문, 예: gantry-350)"
              value={form.slug} onChange={(e) => set({ slug: e.target.value })} />
            <input className={s.input} placeholder="고객사"
              value={form.client} onChange={(e) => set({ client: e.target.value })} />
            <input className={s.input} placeholder="제품유형 (예: 겐트리)"
              value={form.category} onChange={(e) => set({ category: e.target.value })} />
            <select className={s.select} value={form.industry}
              onChange={(e) => set({ industry: e.target.value })}>
              {PORTFOLIO_INDUSTRIES.filter((v) => v !== "전체").map((v) => (
                <option key={v} value={v}>업종: {v}</option>
              ))}
            </select>
            <select className={s.select} value={form.capacity_bucket}
              onChange={(e) => set({ capacity_bucket: e.target.value })}>
              {PORTFOLIO_CAPACITY_BUCKETS.filter((v) => v !== "전체").map((v) => (
                <option key={v} value={v}>용량 필터: {v}</option>
              ))}
            </select>
            <input className={s.input} placeholder="용량 표시 (예: 350T / 50T)"
              value={form.capacity} onChange={(e) => set({ capacity: e.target.value })} />
            <input className={s.input} placeholder="시공연도 (예: 2025)"
              value={form.year} onChange={(e) => set({ year: e.target.value })} />
            <input className={s.input} placeholder="현장 (예: 부산 옥외동)"
              value={form.location} onChange={(e) => set({ location: e.target.value })} />
            <input className={s.input} placeholder="공사기간 (예: 2025.03 ~ 2025.06, 비우면 미표시)"
              value={form.period} onChange={(e) => set({ period: e.target.value })} />
          </div>

          <textarea className={s.textarea} placeholder="설명"
            value={form.description} onChange={(e) => set({ description: e.target.value })} />
          <textarea className={s.textarea} style={{ minHeight: 70 }}
            placeholder={"작업범위 (줄바꿈으로 구분)\n예)\n구조 설계·해석\n제작\n현장 설치"}
            value={form.scopeText} onChange={(e) => set({ scopeText: e.target.value })} />
          <textarea className={s.textarea} style={{ minHeight: 70 }}
            placeholder={"사양 (줄마다 라벨: 값)\n예)\n정격하중: 350TON\n형식: 겐트리"}
            value={form.specsText} onChange={(e) => set({ specsText: e.target.value })} />

          <div style={{ display: "grid", gap: 10 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>
              대표 이미지 {uploading && "(업로드 중…)"}
              <input type="file" accept="image/*" onChange={onMainImage}
                style={{ display: "block", marginTop: 6, fontSize: 13 }} />
            </label>
            {form.src && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={form.src} alt="대표 이미지 미리보기"
                style={{ width: 180, aspectRatio: "4/3", objectFit: "cover", border: "1px solid var(--hairline)" }} />
            )}
            <label style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>
              갤러리 이미지 (여러 장 선택 가능)
              <input type="file" accept="image/*" multiple onChange={onGalleryImages}
                style={{ display: "block", marginTop: 6, fontSize: 13 }} />
            </label>
            {form.gallery.length > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {form.gallery.map((url) => (
                  <div key={url} style={{ position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="갤러리"
                      style={{ width: 96, aspectRatio: "4/3", objectFit: "cover", border: "1px solid var(--hairline)" }} />
                    <button type="button" className={`${s.btn} ${s.btnSm}`}
                      style={{ position: "absolute", top: 2, right: 2, height: 22, padding: "0 6px", fontSize: 11 }}
                      onClick={() => set({ gallery: form.gallery.filter((g) => g !== url) })}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--body)" }}>
            <input type="checkbox" checked={form.is_published}
              onChange={(e) => set({ is_published: e.target.checked })} />
            게시
          </label>

          <div className={s.rowActions}>
            <button className={`${s.btn} ${s.btnPrimary}`} onClick={submit} disabled={pending || uploading}>
              {pending ? "저장 중…" : editing ? "수정 저장" : "등록"}
            </button>
            {msg && <span className={s.cellMuted}>{msg}</span>}
          </div>
        </div>
      </div>

      <div className={s.panel}>
        <div className={s.tableWrap}>
          {initialRows.length === 0 ? (
            <p className={s.empty}>등록된 시공사례가 없습니다. (등록 전에는 사이트에 기본 사례 8건이 표시됩니다)</p>
          ) : (
            <table className={s.table}>
              <thead>
                <tr>
                  <th>등록일</th>
                  <th>제목</th>
                  <th>업종 / 용량</th>
                  <th>상태</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {initialRows.map((row) => (
                  <tr key={row.id}>
                    <td className={s.cellMuted}>{row.created_at?.slice(0, 10)}</td>
                    <td className={s.cellStrong}>{row.title}</td>
                    <td className={s.cellMuted}>
                      {row.industry ?? "-"} / {row.capacity ?? "-"}
                    </td>
                    <td>
                      <span className={`${s.badge} ${row.is_published ? s.badgeDone : s.badgeArchived}`}>
                        {row.is_published ? "게시중" : "비공개"}
                      </span>
                    </td>
                    <td>
                      <div className={s.rowActions}>
                        <button className={`${s.btn} ${s.btnSm}`} onClick={() => edit(row)} disabled={pending}>수정</button>
                        <button className={`${s.btn} ${s.btnDanger} ${s.btnSm}`} onClick={() => remove(row)} disabled={pending}>삭제</button>
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
