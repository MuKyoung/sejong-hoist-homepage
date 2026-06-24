"use client";

/**
 * DEMO 4: HANWHA SYSTEMS STYLE
 * hanwhasystems.com 직접 분석 기반 구현
 *
 * 핵심 패턴:
 * 1. "CONNECT TO THE FUTURE" → 초대형 분할 타이포그래피 히어로
 * 2. Defense/ICT 분할 비즈니스 섹션
 * 3. ESG 번호형 아코디언 (클릭 확장)
 * 4. 번호형 뉴스 리스트
 * 5. 채용 스타일 대형 CTA
 * 6. Persona 기반 탐색 UX
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─── 디자인 토큰 ─── */
const NAVY = "#0a1c4a";
const ORANGE = "#f47c20";
const LIGHT = "#f0f3f9";

/* ─── 클립 텍스트 리빌 ─── */
function ClipReveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "108%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] as never }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── 스크롤 인디케이터 ─── */
function ScrollHint() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative overflow-hidden" style={{ width: 1, height: 56, background: "rgba(255,255,255,0.15)" }}>
        <motion.div
          className="absolute top-0 w-full"
          style={{ height: "40%", background: "rgba(255,255,255,0.7)" }}
          animate={{ y: ["0%", "260%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "system-ui" }}>
        Scroll
      </p>
    </div>
  );
}

/* ─── 데이터 ─── */
const PERSONAS = [
  { id: "all", label: "전체" },
  { id: "prospect", label: "잠재고객" },
  { id: "contractor", label: "시공사 · 건설사" },
  { id: "owner", label: "발주처 · 오너" },
];

const PERSONA_LINKS: Record<string, { label: string; href: string; hot?: boolean }[]> = {
  all: [
    { label: "사업영역 전체 보기", href: "/business" },
    { label: "납품 실적 확인", href: "/portfolio" },
    { label: "무료 상담 신청", href: "/support/inquiry", hot: true },
  ],
  prospect: [
    { label: "제품 사양 보기", href: "/business" },
    { label: "납품 레퍼런스 523건", href: "/portfolio" },
    { label: "무료 견적 요청", href: "/support/inquiry", hot: true },
  ],
  contractor: [
    { label: "기술 규격서 요청", href: "/support/inquiry" },
    { label: "납품 사례 보기", href: "/portfolio" },
    { label: "파트너 협력 문의", href: "/support/inquiry", hot: true },
  ],
  owner: [
    { label: "레퍼런스 확인", href: "/portfolio" },
    { label: "회사 소개 보기", href: "/about" },
    { label: "프로젝트 전담 문의", href: "/support/inquiry", hot: true },
  ],
};

const VALUES = [
  {
    num: "01", title: "SAFETY FIRST", label: "안전 최우선",
    desc: "모든 설계의 첫 번째 기준은 안전입니다. KS·ISO·KGS 등 국내외 인증 기준을 상회하는 세종만의 안전 설계 기준을 모든 제품에 적용합니다.",
  },
  {
    num: "02", title: "PRECISION ENGINEERING", label: "정밀 엔지니어링",
    desc: "반도체 클린룸의 0.1μm 진동 제어부터 200T 중량물까지. 세종의 엔지니어링은 어떤 정밀도 요구도 실현합니다.",
  },
  {
    num: "03", title: "LIFETIME PARTNERSHIP", label: "평생 파트너십",
    desc: "납품 후에도 24시간 AS 체계로 함께합니다. 단순 제조사가 아닌 고객의 현장 파트너로서 설비 수명이 다하는 날까지 책임을 다합니다.",
  },
  {
    num: "04", title: "CONTINUOUS INNOVATION", label: "지속적 혁신",
    desc: "40년의 경험 위에 IoT 모니터링, 예측 정비, 스마트 크레인 등 미래 기술을 접목합니다. 기술의 한계는 없습니다.",
  },
];

const NEWS = [
  { num: "01", date: "2026.06.10", title: "반도체 클린룸 전용 크레인 개발 — 0.1μm 진동 제어 세계 최초 달성" },
  { num: "02", date: "2026.05.22", title: "200T급 천장크레인 준공 — 당진 발전소 국내 최대 규모 납품" },
  { num: "03", date: "2026.04.15", title: "산업통상자원부 장관 표창 수상 — 산업기계 혁신 부문" },
  { num: "04", date: "2026.03.08", title: "2026 상반기 공개채용 — 기계설계·전기제어·영업 분야" },
  { num: "05", date: "2026.02.20", title: "ISO 9001:2015 품질경영시스템 갱신 완료 — 3회 연속" },
  { num: "06", date: "2026.01.30", title: "SK이노베이션 울산 공장 갠트리크레인 납품 완료" },
  { num: "07", date: "2025.12.15", title: "국내 최초 수소 생산 시설용 방폭형 특수크레인 개발 완료" },
];

/* ─── 메인 ─── */
export default function HanwhaDemo() {
  const [persona, setPersona] = useState("all");
  const [openValue, setOpenValue] = useState<number | null>(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div style={{ background: "#fff", color: NAVY, fontFamily: "system-ui, sans-serif" }} className="min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50"
        style={{ background: `${NAVY}f0`, backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-[64px]">
          <Link href="/">
            <Image src="/images/sejong-logo.png" alt="SEJONG" width={120} height={28} className="h-7 w-auto brightness-0 invert" />
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {["기업정보", "사업영역", "지속가능경영", "납품실적", "뉴스룸"].map(m => (
              <a key={m} href="#"
                className="px-3.5 py-2 text-[13px] transition-colors"
                style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >{m}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-[11px] px-2.5 py-1 cursor-pointer transition-colors hover:border-white/50"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>
              KR
            </span>
            <a href="/support/inquiry"
              className="text-[12px] font-bold px-5 py-2.5 transition-opacity hover:opacity-80"
              style={{ background: ORANGE, color: "#fff" }}
            >
              무료 상담
            </a>
          </div>
        </div>
      </nav>

      {/* HERO — "CRANE BEYOND LIMITS" 키네틱 타이포 */}
      <section ref={heroRef} className="relative overflow-hidden flex items-end" style={{ minHeight: "100svh", background: NAVY }}>
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/images/sejong_2.png" alt="hero" fill className="object-cover"
            style={{ filter: "brightness(0.18)", mixBlendMode: "luminosity" }} priority />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${NAVY}ee 0%, ${NAVY}55 50%, transparent 100%)` }} />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${NAVY} 0%, transparent 40%)` }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 pb-20 md:pb-28">

          <ClipReveal delay={0.3}>
            <p className="mb-8 text-[11px] font-mono tracking-[0.4em] uppercase" style={{ color: ORANGE }}>
              Sejong Hoist &amp; Crane — Since 1984
            </p>
          </ClipReveal>

          {/* 3단 분리 타이포 (한화시스템 "CONNECT TO THE FUTURE" 패턴) */}
          <ClipReveal delay={0.42}>
            <h1 className="font-black leading-[0.88]"
              style={{ fontSize: "clamp(4.5rem, 14vw, 12rem)", letterSpacing: "-0.04em", color: "#fff" }}>
              CRANE
            </h1>
          </ClipReveal>
          <ClipReveal delay={0.54}>
            <h1 className="font-black leading-[0.88]"
              style={{ fontSize: "clamp(4.5rem, 14vw, 12rem)", letterSpacing: "-0.04em", color: "rgba(255,255,255,0.13)" }}>
              BEYOND
            </h1>
          </ClipReveal>
          <ClipReveal delay={0.66}>
            <h1 className="font-black leading-[0.88] mb-12"
              style={{ fontSize: "clamp(4.5rem, 14vw, 12rem)", letterSpacing: "-0.04em", color: "#fff" }}>
              LIMITS
            </h1>
          </ClipReveal>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10"
          >
            <p className="text-[15px] leading-[1.75] max-w-xs" style={{ color: "rgba(255,255,255,0.42)" }}>
              40년의 기술이 대한민국 산업의 심장을 움직입니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/business"
                className="px-7 py-3.5 font-bold text-[13px] transition-opacity hover:opacity-80"
                style={{ background: "#fff", color: NAVY }}>
                사업영역 보기
              </a>
              <a href="/support/inquiry"
                className="px-7 py-3.5 font-semibold text-[13px] transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
              >
                상담 신청
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ScrollHint />
        </motion.div>
      </section>

      {/* PERSONA 탐색 — 한화시스템 "방문목적" UX */}
      <section style={{ background: NAVY, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-7">
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
            <p className="text-[12px] tracking-wide flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>
              방문 목적에 맞게 탐색하세요
            </p>
            <div className="flex flex-wrap gap-2 flex-1">
              {PERSONAS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPersona(p.id)}
                  className="px-4 py-2 text-[13px] font-semibold transition-all duration-200"
                  style={{
                    background: persona === p.id ? ORANGE : "transparent",
                    color: persona === p.id ? "#fff" : "rgba(255,255,255,0.45)",
                    border: `1px solid ${persona === p.id ? ORANGE : "rgba(255,255,255,0.15)"}`,
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={persona}
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="hidden lg:flex items-center gap-6 flex-shrink-0"
              >
                {PERSONA_LINKS[persona].map((link, i) => (
                  <a key={i} href={link.href}
                    className="text-[13px] transition-all"
                    style={{ color: link.hot ? ORANGE : "rgba(255,255,255,0.5)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = link.hot ? "#e06810" : "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = link.hot ? ORANGE : "rgba(255,255,255,0.5)")}
                  >
                    → {link.label}
                  </a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 사업영역 — Defense/ICT 스타일 분할 */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {[
          { code: "Defense", label: "크레인", subLabel: "초정밀·고중량 크레인 시스템", img: "/images/sejong_2.png", count: "348건", desc: "산업현장의 모든 조건에 대응하는 세종의 핵심 제품군. 반도체·발전·철강·조선의 핵심 현장에서 지금 이 순간도 가동 중입니다.", items: ["이중거더 천장크레인", "단거더 천장크레인", "레일식 갠트리크레인", "타이어식 갠트리크레인"] },
          { code: "ICT", label: "호이스트 & 특수", subLabel: "정밀 호이스트·맞춤 특수크레인", img: "/images/sejong_3.png", count: "175건", desc: "체인호이스트부터 방폭·클린룸·원자력 특수크레인까지. 일반적인 크레인이 들어갈 수 없는 곳에 세종의 해법이 있습니다.", items: ["전동 체인호이스트", "방폭형 특수크레인", "클린룸 전용 크레인", "원자력 특수 크레인"] },
        ].map((panel, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1 }}
            className="relative group overflow-hidden cursor-pointer"
            style={{ minHeight: 560 }}
          >
            <Image src={panel.img} alt={panel.label} fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              style={{ filter: "brightness(0.3)" }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${NAVY}f0 0%, ${NAVY}30 50%, transparent 100%)` }} />

            <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-14">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5"
                  style={{ border: `1px solid ${ORANGE}50`, color: ORANGE }}>
                  {panel.code}
                </span>
                <span className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                  납품 {panel.count}
                </span>
              </div>

              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {panel.subLabel}
                </p>
                <h3 className="font-bold mb-5 leading-tight"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", color: "#fff" }}>
                  {panel.label}
                </h3>
                <p className="text-[14px] leading-[1.75] mb-7 max-w-xs" style={{ color: "rgba(255,255,255,0.48)" }}>
                  {panel.desc}
                </p>
                <ul className="space-y-2.5 mb-9">
                  {panel.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-[13px]"
                      style={{ color: "rgba(255,255,255,0.42)" }}>
                      <span className="w-4 h-px flex-shrink-0" style={{ background: `${ORANGE}60` }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/business" className="group/l inline-flex items-center gap-3 text-[13px] font-semibold text-white">
                  <span className="h-px transition-all duration-300 group-hover/l:w-12 group-hover/l:bg-orange-400"
                    style={{ width: 24, background: "rgba(255,255,255,0.4)" }} />
                  더 보기
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 핵심 가치 아코디언 (ESG 섹션 패턴) */}
      <section className="py-24 md:py-36" style={{ background: LIGHT }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

            {/* 왼쪽 제목 */}
            <div className="lg:col-span-2">
              <ClipReveal>
                <p className="text-[11px] font-mono tracking-[0.28em] uppercase mb-4" style={{ color: ORANGE }}>
                  Core Values
                </p>
              </ClipReveal>
              <ClipReveal delay={0.1}>
                <h2 className="font-bold leading-[1.08] mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em", color: NAVY }}>
                  모든 이해관계자의 가치를 높이는<br />
                  <span style={{ color: ORANGE }}>세종의 원칙</span>
                </h2>
              </ClipReveal>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="text-[14px] leading-[1.8]" style={{ color: "rgba(10,28,74,0.5)" }}
              >
                40년간 변하지 않은 4가지 핵심 가치가 세종호이스트크레인의 모든 제품과 서비스를 만듭니다.
              </motion.p>
            </div>

            {/* 오른쪽 아코디언 */}
            <div className="lg:col-span-3" style={{ borderTop: "1px solid rgba(10,28,74,0.1)" }}>
              {VALUES.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  onClick={() => setOpenValue(openValue === i ? null : i)}
                  className="cursor-pointer group"
                  style={{ borderBottom: "1px solid rgba(10,28,74,0.1)" }}
                >
                  <div className="flex items-start gap-5 py-6">
                    <span className="font-black text-xl flex-shrink-0 mt-0.5 transition-colors"
                      style={{ color: openValue === i ? ORANGE : "rgba(10,28,74,0.15)" }}>
                      {v.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase mb-1.5"
                            style={{ color: openValue === i ? ORANGE : "rgba(10,28,74,0.35)" }}>
                            {v.title}
                          </p>
                          <h3 className="font-bold text-xl" style={{ color: NAVY }}>
                            {v.label}
                          </h3>
                        </div>
                        <motion.span
                          animate={{ rotate: openValue === i ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-xl ml-4 flex-shrink-0"
                          style={{ color: "rgba(10,28,74,0.25)" }}
                        >
                          +
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {openValue === i && (
                          <motion.p
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="text-[14px] leading-[1.8] overflow-hidden"
                            style={{ color: "rgba(10,28,74,0.55)" }}
                          >
                            {v.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 번호형 뉴스 (한화시스템 직접 패턴) */}
      <section className="py-24 md:py-32" style={{ background: "#fff" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-14">
            <div>
              <ClipReveal>
                <p className="text-[11px] font-mono tracking-[0.3em] uppercase mb-3" style={{ color: ORANGE }}>
                  Newsroom
                </p>
              </ClipReveal>
              <ClipReveal delay={0.1}>
                <h2 className="font-bold leading-[1.0]"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em", color: NAVY }}>
                  고객을 향하는 기술,<br />미래를 향한 도전
                </h2>
              </ClipReveal>
            </div>
            <Link href="/support/notice"
              className="hidden md:flex items-center gap-2 text-[13px] font-semibold transition-opacity hover:opacity-60"
              style={{ color: NAVY }}>
              전체 보기 →
            </Link>
          </div>

          <div style={{ borderTop: "1px solid rgba(10,28,74,0.07)" }}>
            {NEWS.map((n, i) => (
              <motion.a
                key={i} href="/support/notice"
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.055 }}
                className="flex items-center gap-5 md:gap-10 py-5 group"
                style={{ borderBottom: "1px solid rgba(10,28,74,0.07)" }}
                onMouseEnter={e => (e.currentTarget.style.paddingLeft = "8px", e.currentTarget.style.background = LIGHT)}
                onMouseLeave={e => (e.currentTarget.style.paddingLeft = "0", e.currentTarget.style.background = "transparent")}
              >
                <span className="font-black text-xl w-8 flex-shrink-0 transition-colors"
                  style={{ color: "rgba(10,28,74,0.1)" }}>
                  {n.num}
                </span>
                <span className="text-[11px] font-mono hidden md:block w-20 flex-shrink-0"
                  style={{ color: "rgba(10,28,74,0.35)" }}>
                  {n.date}
                </span>
                <span className="flex-1 text-[14px] md:text-[15px] transition-colors"
                  style={{ color: NAVY }}>
                  {n.title}
                </span>
                <span className="hidden md:block text-[13px] flex-shrink-0 transition-all"
                  style={{ color: "rgba(10,28,74,0.2)" }}>
                  →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — "가슴속에 불꽃" 스타일 채용/문의 섹션 */}
      <section className="relative py-28 md:py-40 overflow-hidden" style={{ background: NAVY }}>
        <Image src="/images/sejong_4.png" alt="cta bg" fill
          className="object-cover" style={{ filter: "brightness(0.15) saturate(0.3)" }} />
        <div className="absolute inset-0" style={{ background: `${NAVY}bb` }} />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
          >
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase mb-7" style={{ color: ORANGE }}>
              Contact
            </p>
            <h2 className="font-bold text-white mb-5 leading-[1.03]"
              style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)", letterSpacing: "-0.03em" }}>
              현장에서 증명된<br />
              <span style={{ color: "rgba(255,255,255,0.22)" }}>세종의 기술,</span><br />
              지금 만나보세요.
            </h2>
            <p className="text-[15px] leading-[1.8] mb-12 max-w-lg" style={{ color: "rgba(255,255,255,0.42)" }}>
              어떤 규모의 프로젝트든 세종호이스트크레인이 함께합니다. 전문 엔지니어가 현장을 직접 방문하여 최적의 솔루션을 제안합니다.
            </p>

            {/* 4카드 CTA */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { label: "제품 문의", sub: "사양·견적 상담", href: "/support/inquiry" },
                { label: "현장 방문", sub: "무료 현장 진단", href: "/support/inquiry" },
                { label: "납품 실적", sub: "523건 레퍼런스", href: "/portfolio" },
                { label: "AS 시스템", sub: "24H 대응", href: "https://sejong-hoist.vercel.app" },
              ].map((card, i) => (
                <a key={i} href={card.href}
                  className="group p-6 md:p-7 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = ORANGE, e.currentTarget.style.borderColor = ORANGE)}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)", e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                >
                  <p className="font-bold text-base mb-1.5 text-white">{card.label}</p>
                  <p className="text-[12px] transition-colors" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {card.sub}
                  </p>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#05102a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {[
              { title: "기업정보", items: ["기업개요", "CEO 인사말", "연혁", "찾아오시는 길"] },
              { title: "사업영역", items: ["천장크레인", "갠트리크레인", "호이스트", "특수크레인"] },
              { title: "납품실적", items: ["반도체", "철강·금속", "석유화학", "발전·에너지"] },
              { title: "고객지원", items: ["공지사항", "온라인 문의", "AS 시스템"] },
            ].map((col, i) => (
              <div key={i}>
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase mb-4"
                  style={{ color: "rgba(255,255,255,0.3)" }}>
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.items.map(item => (
                    <li key={item}>
                      <a href="#" className="text-[12px] transition-colors hover:text-white/50"
                        style={{ color: "rgba(255,255,255,0.2)" }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20 }}>
            <div>
              <p className="text-[12px] mb-1" style={{ color: "rgba(255,255,255,0.18)" }}>
                © 2026 Sejong Hoist &amp; Crane Co., Ltd. All rights reserved.
              </p>
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.12)" }}>
                경기도 안산시 · Tel. 031-777-1234
              </p>
            </div>
            <div className="flex items-center gap-2 text-[12px]" style={{ color: "rgba(255,255,255,0.18)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ORANGE }} />
              Demo 4 — HANWHA
              <Link href="/demo" className="ml-4 hover:text-white/50 transition-colors">← 데모 목록</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
