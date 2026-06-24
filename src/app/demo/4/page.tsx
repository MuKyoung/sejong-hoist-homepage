"use client";

/**
 * DEMO 4: AUTHORITY — 한국 기업 권위 (Samsung.com × Hanwha Systems × SK)
 *
 * 설계 원칙:
 * - 라이트 블루그레이 (#f4f6f9) 베이스
 * - 슬레이트 네이비 (#0f172a) + 오렌지 (#f47c20)
 * - 구조적이고 격자가 명확한 레이아웃
 * - 탭 기반 제품 탐색
 * - 어코디언 핵심가치
 * - 애니메이션: ① 페이드업  ② 탭 전환  ③ 어코디언 — 3가지만
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const E = [0.16, 1, 0.3, 1] as never;

/* ─── 카운터 ─── */
function Counter({ val, suffix }: { val: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, val, { duration: 2.2, ease: E as never, onUpdate: v => setN(Math.floor(v)) });
    return () => c.stop();
  }, [inView, val]);
  return <span ref={ref} className="tabular-nums">{n.toLocaleString()}{suffix}</span>;
}

/* ─── 데이터 ─── */
const PRODUCTS = [
  {
    tab: "천장크레인", img: "/images/sejong_2.png",
    title: "이중거더 천장크레인",
    desc: "반도체 클린룸의 초정밀 제어부터 제철소 200T 중량물 이송까지. 가장 까다로운 조건에서 가장 신뢰받는 크레인.",
    specs: [{ l: "최대 하중", v: "500 T" }, { l: "최대 스팬", v: "40 m" }, { l: "납품 실적", v: "348건" }],
    tags: ["반도체", "발전", "철강·금속"],
  },
  {
    tab: "갠트리크레인", img: "/images/sejong_3.png",
    title: "레일·타이어식 갠트리크레인",
    desc: "조선소, 항만, 대형 건설 현장을 위한 야외용 강자. 바람과 극한 하중에도 흔들리지 않는 구조 설계.",
    specs: [{ l: "최대 하중", v: "1,000 T" }, { l: "최대 스팬", v: "60 m" }, { l: "납품 실적", v: "175건" }],
    tags: ["조선", "항만", "건설"],
  },
  {
    tab: "호이스트", img: "/images/sejong_1.png",
    title: "전동 체인 · 와이어 호이스트",
    desc: "소형 제조업체부터 대형 조립 라인까지. 안정적이고 정밀한 운전 특성으로 현장의 효율을 높입니다.",
    specs: [{ l: "최대 하중", v: "50 T" }, { l: "양정", v: "30 m" }, { l: "납품 실적", v: "250건+" }],
    tags: ["제조", "물류", "자동차"],
  },
  {
    tab: "특수크레인", img: "/images/sejong_4.png",
    title: "방폭·클린룸·원자력 특수크레인",
    desc: "불가능한 환경은 없습니다. 원자력, 방폭, 클린룸 등 특수 목적에 완전 맞춤 설계.",
    specs: [{ l: "종류", v: "방폭·클린룸·원자력" }, { l: "인증", v: "ISO·KGS·방폭" }, { l: "납품 실적", v: "92건" }],
    tags: ["원자력", "석유화학", "제약"],
  },
];

const VALUES = [
  { num: "01", title: "기술 주도 (Technology-First)", body: "세종은 40년간 크레인 분야의 핵심 기술을 자체 개발해왔습니다. 2021년 스마트 원격제어 시스템, 2008년 클린룸 특수 구동 모듈 등 업계 최초 기록을 보유합니다." },
  { num: "02", title: "현장 중심 (Field-Oriented)", body: "설계부터 설치, 유지보수까지 세종의 엔지니어가 현장에서 직접 해결합니다. 24시간 AS 체계로 가동 중단 없이 운영을 보장합니다." },
  { num: "03", title: "품질 무타협 (Zero-Compromise Quality)", body: "2025년 기준 99% 품질 합격률. KS·ISO 9001을 비롯한 국내외 인증 기반의 엄격한 품질관리 체계로 모든 납품물의 완성도를 보장합니다." },
  { num: "04", title: "장기 파트너십 (Long-Term Partnership)", body: "납품 이후가 시작입니다. 예방정비, 부품 공급, 성능 업그레이드까지 크레인 생애 전주기를 함께하는 파트너입니다." },
];

const CLIENTS = ["삼성전자", "LG화학", "POSCO", "현대제철", "SK이노베이션", "한국수력원자력", "OCI", "한화솔루션", "GS칼텍스", "두산중공업", "롯데케미칼", "KCC"];

const CERTS = [
  { label: "ISO 9001:2015", sub: "품질경영시스템" },
  { label: "KS Q 8001", sub: "크레인 안전 기준" },
  { label: "방폭 인증", sub: "한국가스기술공사" },
  { label: "원자력 납품 실적", sub: "한수원 협력사 등록" },
];

/* ─── 메인 ─── */
export default function AuthorityDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <div className="font-sans overflow-x-hidden" style={{ background: "#f4f6f9", color: "#0f172a" }}>

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 h-[64px] bg-white"
        style={{ boxShadow: "0 1px 0 rgba(15,23,42,0.08)" }}>
        <div className="container-xl h-full flex items-center justify-between">
          <Link href="/">
            <Image src="/images/sejong-logo.png" alt="SEJONG" width={120} height={28} className="h-7 w-auto" />
          </Link>
          <nav className="hidden lg:flex items-center text-[13px]" style={{ color: "rgba(15,23,42,0.55)" }}>
            {[["회사소개", "#"], ["사업영역", "#"], ["납품실적", "#"], ["고객지원", "#"]].map(([m, h]) => (
              <a key={m} href={h} className="px-4 py-5 hover:text-slate-900 transition-colors font-medium">{m}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:0317771234" className="hidden md:flex items-center gap-2 text-[13px] font-semibold"
              style={{ color: "#0f172a" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#4ade80" }} />
              031-777-1234
            </a>
            <a href="/support/inquiry"
              className="text-[12px] font-bold px-5 py-2.5 hover:opacity-80 transition-opacity"
              style={{ background: "#f47c20", color: "#fff" }}>
              무료 상담
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-[64px] overflow-hidden" style={{ minHeight: "100svh", background: "#0f172a" }}>
        <div className="absolute inset-0">
          <Image src="/images/sejong_3.png" alt="hero" fill priority className="object-cover"
            style={{ filter: "brightness(0.2) saturate(0.6)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(15,23,42,0.97) 0%, rgba(15,23,42,0.7) 55%, rgba(15,23,42,0.4) 100%)" }} />
        </div>

        <div className="container-xl relative z-10 flex flex-col justify-center" style={{ minHeight: "calc(100svh - 64px)", paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="h-px w-8" style={{ background: "#f47c20" }} />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: "#f47c20" }}>
                대한민국 1위 크레인 전문기업
              </span>
            </motion.div>

            {["40년 기술로", "산업 현장의", "한계를 넘습니다."].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  className="text-white font-black leading-[1.0]"
                  style={{ fontSize: "clamp(2.5rem,7.5vw,6.5rem)", letterSpacing: "-0.03em" }}
                  initial={{ y: "106%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.95, ease: E }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="text-[15px] leading-[1.85] mt-8 mb-10 max-w-md"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              반도체·발전·철강·조선 등 대한민국 핵심 산업에 누적 523건. 세종은 40년간 흔들림 없이 현장을 지켜왔습니다.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}
              className="flex flex-wrap gap-3">
              <a href="/business" className="px-7 py-3.5 font-bold text-[13px] hover:opacity-80 transition-opacity"
                style={{ background: "#f47c20", color: "#fff" }}>
                제품 보기
              </a>
              <a href="/portfolio" className="px-7 py-3.5 font-semibold text-[13px] transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)")}
              >
                납품실적
              </a>
            </motion.div>
          </div>

          {/* 우하단 핵심 수치 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, ease: E }}
            className="absolute bottom-12 right-0 right-6 md:right-16 flex gap-8 md:gap-12"
          >
            {[{ v: 40, s: "+", l: "년 업력" }, { v: 523, s: "", l: "건 납품" }, { v: 94, s: "+", l: "개 고객사" }].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-black text-white" style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", letterSpacing: "-0.04em" }}>
                  <Counter val={s.v} suffix={s.s} />
                </p>
                <p className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 인증·신뢰 배너 */}
      <div className="bg-white" style={{ borderBottom: "1px solid rgba(15,23,42,0.07)" }}>
        <div className="container-xl flex flex-wrap items-center gap-x-10 gap-y-4 py-5">
          {CERTS.map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8.5" stroke="#f47c20" strokeOpacity={0.5} />
                <path d="M5 9l3 3 5-5" stroke="#f47c20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="text-[12px] font-semibold leading-tight" style={{ color: "#0f172a" }}>{c.label}</p>
                <p className="text-[11px]" style={{ color: "#64748b" }}>{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 제품 탭 섹션 */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-[11px] font-bold tracking-[0.28em] uppercase mb-3" style={{ color: "#f47c20" }}>
                Products
              </motion.p>
              <motion.h2 className="text-h2" style={{ color: "#0f172a" }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ ease: E }}>
                제품 라인업
              </motion.h2>
            </div>

            {/* 탭 */}
            <div className="flex flex-wrap gap-2">
              {PRODUCTS.map((p, i) => (
                <button key={i} onClick={() => setActiveTab(i)}
                  className="px-4 py-2 text-[13px] font-semibold transition-all duration-200"
                  style={{
                    background: activeTab === i ? "#0f172a" : "transparent",
                    color: activeTab === i ? "#fff" : "rgba(15,23,42,0.45)",
                    border: `1px solid ${activeTab === i ? "#0f172a" : "rgba(15,23,42,0.15)"}`,
                  }}>
                  {p.tab}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: E }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* 이미지 */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image src={PRODUCTS[activeTab].img} alt={PRODUCTS[activeTab].title} fill
                  className="object-cover" sizes="(max-width:1024px)100vw,50vw" />
              </div>

              {/* 텍스트 */}
              <div>
                {/* 태그들 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {PRODUCTS[activeTab].tags.map(tag => (
                    <span key={tag} className="text-[11px] font-semibold px-3 py-1.5"
                      style={{ background: "rgba(244,124,32,0.08)", color: "#f47c20" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-h3 mb-5" style={{ color: "#0f172a" }}>{PRODUCTS[activeTab].title}</h3>
                <p className="text-[15px] leading-[1.85] mb-9" style={{ color: "#475569" }}>
                  {PRODUCTS[activeTab].desc}
                </p>

                {/* 스펙 테이블 — 선 없이 배경으로만 */}
                <dl className="grid grid-cols-3 gap-3 mb-10">
                  {PRODUCTS[activeTab].specs.map(s => (
                    <div key={s.l} className="p-4" style={{ background: "#f4f6f9" }}>
                      <dt className="text-[11px] mb-2" style={{ color: "#94a3b8" }}>{s.l}</dt>
                      <dd className="text-[15px] font-bold" style={{ color: "#0f172a" }}>{s.v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex gap-3">
                  <a href="/business" className="px-6 py-3 text-[13px] font-bold hover:opacity-80 transition-opacity"
                    style={{ background: "#0f172a", color: "#fff" }}>
                    상세 보기
                  </a>
                  <a href="/support/inquiry" className="px-6 py-3 text-[13px] font-semibold transition-all"
                    style={{ border: "1px solid rgba(15,23,42,0.2)", color: "#0f172a" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#f4f6f9")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    견적 문의
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 고객사 로고 마키 */}
      <div className="py-10 overflow-hidden" style={{ background: "#f4f6f9", borderTop: "1px solid rgba(15,23,42,0.07)" }}>
        <p className="text-center text-[11px] font-bold tracking-[0.3em] uppercase mb-7" style={{ color: "rgba(15,23,42,0.28)" }}>
          주요 고객사
        </p>
        <div className="flex gap-10 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} className="text-[13px] font-semibold shrink-0 px-2" style={{ color: "rgba(15,23,42,0.3)" }}>{c}</span>
          ))}
        </div>
      </div>

      {/* 핵심 가치 어코디언 */}
      <section className="section-pad bg-white">
        <div className="container-xl max-w-[900px]">
          <div className="flex items-end gap-6 mb-14">
            <div>
              <p className="text-[11px] font-bold tracking-[0.28em] uppercase mb-3" style={{ color: "#f47c20" }}>Values</p>
              <h2 className="text-h2" style={{ color: "#0f172a" }}>세종의 핵심 가치</h2>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(15,23,42,0.1)" }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(15,23,42,0.1)" }}>
                <button
                  className="w-full flex items-center gap-6 py-6 text-left group"
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                >
                  <span className="text-[12px] font-mono w-6 shrink-0" style={{ color: "rgba(15,23,42,0.28)" }}>{v.num}</span>
                  <span className="flex-1 text-[15px] font-semibold transition-colors" style={{ color: "#0f172a" }}>
                    {v.title}
                  </span>
                  <motion.span
                    className="text-xl font-light shrink-0"
                    style={{ color: openAccordion === i ? "#f47c20" : "rgba(15,23,42,0.3)" }}
                    animate={{ rotate: openAccordion === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openAccordion === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: E }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="text-[14px] leading-[1.85] pl-12 pb-7" style={{ color: "#475569" }}>
                        {v.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: "#0f172a" }}>
        <div className="container-xl flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <motion.h2 className="text-h1 text-white mb-5"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ ease: E }}>
              지금 바로 상담하세요
            </motion.h2>
            <p className="text-[15px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.42)" }}>
              영업일 1일 이내 전문 엔지니어가 연락드립니다.
            </p>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, ease: E }}
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a href="/support/inquiry"
              className="px-10 py-4 font-bold text-[13px] text-center hover:opacity-80 transition-opacity"
              style={{ background: "#f47c20", color: "#fff" }}>
              온라인 문의
            </a>
            <a href="tel:0317771234"
              className="px-10 py-4 font-semibold text-[13px] text-center transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              전화 문의 031-777-1234
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-14 py-7 flex flex-col md:flex-row justify-between items-center gap-3 bg-white"
        style={{ borderTop: "1px solid rgba(15,23,42,0.08)" }}>
        <div className="flex items-center gap-6">
          <Image src="/images/sejong-logo.png" alt="SEJONG" width={88} height={20} className="h-5 w-auto opacity-30" />
          <p className="text-[12px]" style={{ color: "rgba(15,23,42,0.3)" }}>© 2026 Sejong Hoist &amp; Crane Co., Ltd.</p>
        </div>
        <div className="flex items-center gap-2 text-[12px]" style={{ color: "rgba(15,23,42,0.3)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#f47c20" }} />
          Demo 4 — AUTHORITY
          <Link href="/demo" className="ml-4 hover:opacity-60 transition-opacity">← 데모 목록</Link>
        </div>
      </footer>
    </div>
  );
}
