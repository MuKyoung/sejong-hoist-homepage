"use client";

import { useState } from "react";
import PageHero from "@/components/subpage/PageHero";
import SubNav from "@/components/subpage/SubNav";
import { COMPANY } from "@/data/site";
import s from "@/styles/subpage.module.css";

const SUPPORT_NAV = [
  { label: "고객지원", href: "/support" },
  { label: "공지사항", href: "/support/notice" },
  { label: "견적 문의", href: "/support/inquiry" },
];

export default function InquiryPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    category: "",
    title: "",
    content: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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

                <button type="submit" className={s.submitBtn}>
                  문의 접수하기
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
