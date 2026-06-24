"use client";

import { useState } from "react";

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
      <section className="relative bg-[#0a1f5c] pt-32 pb-16">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">INQUIRY</p>
          <h1 className="text-white text-5xl font-bold mb-4">온라인 문의</h1>
          <p className="text-white/50">문의 접수 후 영업일 기준 1일 이내에 답변드립니다</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-[900px] mx-auto px-6">
          {submitted ? (
            <div className="text-center py-24 bg-white">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#0a1f5c] mb-3">문의가 접수되었습니다</h2>
              <p className="text-gray-500 mb-8">영업일 기준 1일 이내에 담당자가 연락드리겠습니다.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 bg-[#0a1f5c] text-white font-semibold hover:bg-[#1a3a8f] transition-colors"
              >
                추가 문의하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12">
              <h2 className="text-2xl font-bold text-[#0a1f5c] mb-8">문의 내용을 입력해 주세요</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[
                  { label: "성함", key: "name", required: true, placeholder: "홍길동" },
                  { label: "회사명", key: "company", required: false, placeholder: "주식회사 OOO" },
                  { label: "연락처", key: "phone", required: true, placeholder: "010-0000-0000" },
                  { label: "이메일", key: "email", required: true, placeholder: "email@company.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label} {field.required && <span className="text-orange-500">*</span>}
                    </label>
                    <input
                      type="text"
                      required={field.required}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form] as string}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0a1f5c] transition-colors"
                    />
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  문의 유형 <span className="text-orange-500">*</span>
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0a1f5c] transition-colors bg-white"
                >
                  <option value="">문의 유형을 선택하세요</option>
                  <option value="견적">견적 문의</option>
                  <option value="기술">기술 상담</option>
                  <option value="AS">A/S 문의</option>
                  <option value="납품">납품 문의</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  제목 <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="문의 제목을 입력하세요"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0a1f5c] transition-colors"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  문의 내용 <span className="text-orange-500">*</span>
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder="문의하실 내용을 자세히 입력해 주세요. (설치 장소, 하중, 스팬 등 관련 정보를 함께 기재해 주시면 빠른 답변이 가능합니다.)"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0a1f5c] transition-colors resize-none"
                />
              </div>

              <div className="mb-8 p-4 bg-gray-50 border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.agree}
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-[#0a1f5c]"
                  />
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">개인정보 수집·이용에 동의합니다.</span>
                    <br />
                    수집 항목: 성함, 연락처, 이메일 / 수집 목적: 문의 답변 / 보관 기간: 문의 처리 후 즉시 파기
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#0a1f5c] text-white font-bold text-base hover:bg-[#1a3a8f] transition-colors duration-200"
              >
                문의 접수하기
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
