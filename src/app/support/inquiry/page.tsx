"use client";

import { useRef, useState } from "react";
import PageHero from "@/components/subpage/PageHero";
import SubNav from "@/components/subpage/SubNav";
import { COMPANY } from "@/data/site";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import s from "@/styles/subpage.module.css";

const SUPPORT_NAV = [
  { label: "고객지원", href: "/support" },
  { label: "공지사항", href: "/support/notice" },
  { label: "견적 문의", href: "/support/inquiry" },
];

const MAX_FILES = 3;
const MAX_FILE_MB = 10;

/** storage object key로 안전한 파일명 (확장자 유지, 나머지는 ASCII로) */
function safeFileName(name: string) {
  const dot = name.lastIndexOf(".");
  const ext = dot >= 0 ? name.slice(dot + 1).replace(/[^a-zA-Z0-9]/g, "").toLowerCase() : "";
  const base = (dot >= 0 ? name.slice(0, dot) : name)
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_")
    .slice(0, 60) || "file";
  return ext ? `${base}.${ext}` : base;
}

export default function InquiryPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    productCat: "",
    category: "",
    title: "",
    content: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setError(null);
    const next = [...files];
    for (const f of Array.from(list)) {
      if (next.length >= MAX_FILES) {
        setError(`첨부파일은 최대 ${MAX_FILES}개까지 등록할 수 있습니다.`);
        break;
      }
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        setError(`"${f.name}" 파일이 ${MAX_FILE_MB}MB를 초과합니다.`);
        continue;
      }
      if (!next.some((x) => x.name === f.name && x.size === f.size)) next.push(f);
    }
    setFiles(next);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Before Supabase is configured, keep the legacy confirmation UX.
    if (!isSupabaseConfigured) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();

      // 첨부파일 업로드 (비공개 버킷 — 관리자만 열람)
      const attachments: string[] = [];
      for (const f of files) {
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}/${safeFileName(f.name)}`;
        const { error: uploadError } = await supabase.storage
          .from("inquiry-files")
          .upload(path, f);
        if (uploadError) {
          setError("첨부파일 업로드에 실패했습니다. 파일 용량(10MB 이하)을 확인하거나 첨부 없이 다시 시도해 주세요.");
          return;
        }
        attachments.push(path);
      }

      const { error: insertError } = await supabase.from("inquiries").insert({
        name: form.name,
        company: form.company || null,
        phone: form.phone || null,
        email: form.email || null,
        product_category: form.productCat || null,
        message: `[${form.category}] ${form.title}\n\n${form.content}`,
        attachments,
      });
      if (insertError) {
        setError("접수 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.");
        return;
      }
      setFiles([]);
      setSubmitted(true);
    } catch {
      setError("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Inquiry"
        title="견적 문의"
        desc="문의 접수 후 영업일 기준 1일 이내에 답변드립니다."
      />
      <SubNav items={SUPPORT_NAV} />

      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className="container">
          <div className={s.formWrap}>
            {submitted ? (
              <div className={s.successWrap}>
                <div className={s.successIcon} aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className={s.successTitle}>문의가 접수되었습니다</h2>
                <p className={s.successDesc}>
                  영업일 기준 1일 이내에 담당자가 연락드리겠습니다.
                  <br />
                  급하신 경우 {COMPANY.tel}로 연락 주세요.
                </p>
                <button type="button" className={s.ghostBtn} onClick={() => setSubmitted(false)}>
                  추가 문의하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={s.formCard}>
                <h2 className={s.formTitle}>문의 내용을 입력해 주세요</h2>

                <div className={s.formGrid}>
                  {[
                    { label: "성함", key: "name", required: true, placeholder: "홍길동" },
                    { label: "회사명", key: "company", required: false, placeholder: "주식회사 OOO" },
                    { label: "연락처", key: "phone", required: true, placeholder: "010-0000-0000" },
                    { label: "이메일", key: "email", required: true, placeholder: "email@company.com" },
                  ].map((field) => (
                    <div key={field.key} className={s.field}>
                      <label className={s.fieldLabel} htmlFor={field.key}>
                        {field.label}{" "}
                        {field.required && <span className={s.required}>*</span>}
                      </label>
                      <input
                        id={field.key}
                        type="text"
                        required={field.required}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form] as string}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className={s.fieldInput}
                      />
                    </div>
                  ))}
                </div>

                <div className={s.formGrid}>
                  <div className={s.field}>
                    <label className={s.fieldLabel} htmlFor="productCat">
                      제품 카테고리 <span className={s.required}>*</span>
                    </label>
                    <select
                      id="productCat"
                      required
                      value={form.productCat}
                      onChange={(e) => setForm({ ...form, productCat: e.target.value })}
                      className={s.fieldSelect}
                    >
                      <option value="">제품 카테고리를 선택하세요</option>
                      <option value="호이스트 크레인">호이스트 크레인</option>
                      <option value="그랩·갠트리 크레인">그랩·갠트리 크레인</option>
                      <option value="유지보수·이전설치">유지보수·이전설치</option>
                      <option value="철구조물 제작">철구조물 제작</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>

                  <div className={s.field}>
                    <label className={s.fieldLabel} htmlFor="category">
                      문의 유형 <span className={s.required}>*</span>
                    </label>
                    <select
                      id="category"
                      required
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className={s.fieldSelect}
                    >
                      <option value="">문의 유형을 선택하세요</option>
                      <option value="견적">견적 문의</option>
                      <option value="기술">기술 상담</option>
                      <option value="AS">A/S 문의</option>
                      <option value="납품">납품·시공 문의</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                </div>

                <div className={s.field}>
                  <label className={s.fieldLabel} htmlFor="title">
                    제목 <span className={s.required}>*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    placeholder="문의 제목을 입력하세요"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className={s.fieldInput}
                  />
                </div>

                <div className={s.field}>
                  <label className={s.fieldLabel} htmlFor="content">
                    문의 내용 <span className={s.required}>*</span>
                  </label>
                  <textarea
                    id="content"
                    required
                    rows={8}
                    placeholder="설치 장소, 하중, 스팬 등 관련 정보를 함께 기재해 주시면 빠른 답변이 가능합니다."
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className={s.fieldTextarea}
                  />
                </div>

                {isSupabaseConfigured && (
                  <div className={s.field}>
                    <label className={s.fieldLabel} htmlFor="attachments">
                      첨부파일 <span className={s.fieldLabelHint}>(선택 · 최대 {MAX_FILES}개, 개당 {MAX_FILE_MB}MB — 도면·현장사진 등)</span>
                    </label>
                    <input
                      ref={fileInputRef}
                      id="attachments"
                      type="file"
                      multiple
                      accept="image/*,.pdf,.zip,.hwp,.dwg,.doc,.docx,.xls,.xlsx"
                      style={{ display: "none" }}
                      onChange={(e) => addFiles(e.target.files)}
                    />
                    <button
                      type="button"
                      className={s.fileBtn}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={files.length >= MAX_FILES}
                    >
                      + 파일 선택
                    </button>
                    {files.length > 0 && (
                      <ul className={s.fileList}>
                        {files.map((f) => (
                          <li key={`${f.name}-${f.size}`} className={s.fileItem}>
                            <span className={s.fileName}>{f.name}</span>
                            <span className={s.fileSize}>{(f.size / 1024 / 1024).toFixed(1)}MB</span>
                            <button
                              type="button"
                              className={s.fileRemove}
                              aria-label={`${f.name} 첨부 제거`}
                              onClick={() =>
                                setFiles(files.filter((x) => !(x.name === f.name && x.size === f.size)))
                              }
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <div className={s.agreeBox}>
                  <label className={s.agreeLabel}>
                    <input
                      type="checkbox"
                      required
                      checked={form.agree}
                      onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                    />
                    <span>
                      <strong>개인정보 수집·이용에 동의합니다.</strong>
                      <br />
                      수집 항목: 성함, 연락처, 이메일 / 수집 목적: 문의 답변 / 보관 기간: 문의 처리 후 즉시 파기
                    </span>
                  </label>
                </div>

                <button type="submit" className={s.submitBtn} disabled={submitting}>
                  {submitting ? "접수 중…" : "문의 접수하기"}
                </button>
                {error && (
                  <p style={{ marginTop: 12, fontSize: 14, color: "#b0102f", textAlign: "center" }}>
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <div className={s.centerHeader}>
            <p className={s.eyebrow}>Contact</p>
            <h2 className={s.headline}>담당자 연락처</h2>
            <p className={s.body}>급하신 문의는 아래 연락처로 직접 연락 주세요.</p>
          </div>
          <div className={s.contactGrid}>
            <div>
              <span className={s.contactIcon} aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <p className={s.contactItemLabel}>대표전화</p>
              <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`} className={s.contactItemValue}>
                {COMPANY.tel}
              </a>
            </div>
            <div>
              <span className={s.contactIcon} aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </span>
              <p className={s.contactItemLabel}>휴대전화</p>
              <a href={`tel:${COMPANY.mobile.replace(/-/g, "")}`} className={s.contactItemValue}>
                {COMPANY.mobile}
              </a>
            </div>
            <div>
              <span className={s.contactIcon} aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <p className={s.contactItemLabel}>이메일</p>
              <a href={`mailto:${COMPANY.email}`} className={s.contactItemValue}>
                {COMPANY.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
