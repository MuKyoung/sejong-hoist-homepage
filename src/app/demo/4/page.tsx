"use client";

/**
 * DEMO 4 — AUTHORITY
 * 레퍼런스: Samsung.com (한국), Hanwha Systems, SK그룹
 *
 * 핵심 결정:
 * - 히어로: 풀스크린 영상 + 좌하단 텍스트
 * - 뷰포트 전환: 다크 네이비 히어로 → 라이트 콘텐츠
 * - 탭: 제품 카테고리 전환 (URL 변경 없이)
 * - 어코디언: 핵심가치 (Radix 없이 직접 구현)
 * - 인증 배너 + 고객사 마키
 * - "AI 느낌" 제거: 섹션 패턴을 다양하게
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const E = [0.22, 1, 0.36, 1] as never;
const FONT = "var(--font-inter), 'Pretendard Variable', Pretendard, sans-serif";

/* ─── 카운터 ─── */
function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: E as never, onUpdate: v => setN(Math.floor(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{n.toLocaleString()}{suffix}</span>;
}

/* ─── 클립 리빌 ─── */
function Clip({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "106%" }} whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 1.0, delay, ease: E }}
      >{children}</motion.div>
    </div>
  );
}

/* ─── 데이터 ─── */
const PRODUCTS = [
  {
    tab: "천장크레인", en: "Overhead Crane",
    video: "/videos/4768-179741152_medium.mp4",
    img: "/images/sejong_2.png",
    pitch: "반도체 클린룸의 초정밀 제어부터\n발전소 200T 중량물 이송까지.",
    body: "이중거더 구조로 최대 500T 하중을 처리하며, 스팬 40m까지 대응합니다. 삼성전자·SK하이닉스·한수원 등 대한민국 핵심 산업 현장 348개소에 납품 완료.",
    specs: [{ k: "최대 하중", v: "500 T" }, { k: "최대 스팬", v: "40 m" }, { k: "납품 실적", v: "348건" }],
    tags: ["반도체", "발전·에너지", "철강·금속"],
  },
  {
    tab: "갠트리크레인", en: "Gantry Crane",
    video: "/videos/5497-184226939_medium.mp4",
    img: "/images/sejong_3.png",
    pitch: "조선소, 항만, 건설 현장을 위한\n야외 극한 환경의 강자.",
    body: "레일식과 타이어식, 두 가지 드라이브로 모든 지형과 환경에 대응합니다. 최대 1,000T 하중과 스팬 60m. 현대중공업·POSCO 등 175개소에 납품.",
    specs: [{ k: "최대 하중", v: "1,000 T" }, { k: "최대 스팬", v: "60 m" }, { k: "납품 실적", v: "175건" }],
    tags: ["조선·해양", "항만", "건설"],
  },
  {
    tab: "전동호이스트", en: "Electric Hoist",
    video: "/videos/144584-785095786_medium.mp4",
    img: "/images/sejong_1.png",
    pitch: "소형 제조업부터 대형 조립 라인까지.\n정밀하고 안정적인 인양 솔루션.",
    body: "체인과 와이어로프 두 가지 타입으로 최대 50T 하중, 양정 30m까지 대응합니다. 자동차·물류·일반 제조 현장 250건 이상 납품 완료.",
    specs: [{ k: "최대 하중", v: "50 T" }, { k: "양정", v: "30 m" }, { k: "납품 실적", v: "250건+" }],
    tags: ["제조", "물류", "자동차"],
  },
  {
    tab: "특수크레인", en: "Special Crane",
    video: "/videos/159052-818026310_medium.mp4",
    img: "/images/sejong_4.png",
    pitch: "원자력, 방폭, 클린룸.\n불가능한 현장은 세종의 영역입니다.",
    body: "한국수력원자력 격납건물, 석유화학 방폭 구역, 제약 클린룸 등 특수 목적 환경에 완전 맞춤 설계·제작·납품합니다.",
    specs: [{ k: "종류", v: "방폭·클린룸·원자력" }, { k: "인증", v: "KGS·ISO·방폭" }, { k: "납품 실적", v: "92건" }],
    tags: ["원자력", "석유화학", "제약"],
  },
];

const VALUES = [
  { no: "01", title: "기술 주도", body: "40년간 크레인 분야 핵심 기술을 자체 개발. 2021년 스마트 원격제어, 2008년 클린룸 구동 모듈 등 업계 최초 기록 다수 보유." },
  { no: "02", title: "현장 중심", body: "설계·제작·설치·AS까지 세종 엔지니어가 직접 현장에서 해결합니다. 24시간 AS 체계로 가동 중단 없는 운영 보장." },
  { no: "03", title: "품질 무타협", body: "2025년 기준 품질 합격률 99%. ISO 9001:2015 3회 연속 취득, KS·방폭 인증 기반 엄격한 품질관리." },
  { no: "04", title: "장기 파트너십", body: "납품 이후가 시작입니다. 예방정비·부품 공급·성능 업그레이드까지 크레인 생애 전주기를 함께하는 파트너." },
];

const CERTS = [
  { label: "ISO 9001:2015", sub: "품질경영시스템" },
  { label: "KS Q 8001", sub: "크레인 안전 기준" },
  { label: "방폭 인증", sub: "한국가스기술공사" },
  { label: "한수원 협력사", sub: "원자력 납품 등록" },
];

const CLIENTS = ["삼성전자", "LG화학", "POSCO", "현대제철", "SK이노베이션", "한국수력원자력", "OCI", "한화솔루션", "GS칼텍스", "두산중공업", "롯데케미칼", "현대중공업", "삼성중공업", "KCC", "현대오일뱅크"];

export default function Authority() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOp = useTransform(hp, [0, 0.7], [1, 0]);

  return (
    <div style={{ fontFamily: FONT, color: "#0f172a" }}>

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-[60px] bg-white"
        style={{ boxShadow: "0 1px 0 rgba(15,23,42,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          <Link href="/">
            <Image src="/images/sejong-logo.png" alt="SEJONG" width={96} height={22} className="h-[22px] w-auto" />
          </Link>
          <div className="hidden lg:flex items-center text-[12px]" style={{ color: "rgba(15,23,42,0.45)" }}>
            {[["회사소개", "#"], ["사업영역", "#"], ["납품실적", "#"], ["고객지원", "#"]].map(([m, h]) => (
              <a key={m} href={h} className="px-4 py-4 hover:text-slate-900 font-medium transition-colors">{m}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:0317771234"
              className="hidden md:flex items-center gap-2 text-[12px] font-semibold"
              style={{ color: "#0f172a" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#4ade80" }} />
              031-777-1234
            </a>
            <a href="/support/inquiry"
              className="text-[11px] font-bold px-5 py-2.5 hover:opacity-80 transition-opacity"
              style={{ background: "#f47c20", color: "#fff" }}>
              무료 상담
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative pt-[60px] overflow-hidden" style={{ minHeight: "100svh", background: "#0f172a" }}>
        {/* 배경 영상 */}
        <video
          src="/videos/12716-241674181_medium.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.18) saturate(0.5)" }}
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, rgba(15,23,42,0.97) 0%, rgba(15,23,42,0.65) 55%, rgba(15,23,42,0.35) 100%)" }} />

        <motion.div
          style={{ opacity: heroOp, minHeight: "calc(100svh - 60px)", paddingTop: "5rem", paddingBottom: "5rem" }}
          className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-center"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="h-px w-8" style={{ background: "#f47c20" }} />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase" style={{ color: "#f47c20" }}>
                대한민국 크레인 전문기업 · Since 1984
              </span>
            </motion.div>

            {["40년 기술로", "산업 현장의", "한계를 넘습니다."].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  className="text-white font-black leading-[0.97]"
                  style={{ fontSize: "clamp(2.6rem,7vw,6.5rem)", letterSpacing: "-0.04em" }}
                  initial={{ y: "108%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.42 + i * 0.1, duration: 1.0, ease: E }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
              className="text-[14px] leading-[1.85] mt-8 mb-10 max-w-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              반도체·발전·철강·조선 등 대한민국 핵심 산업에 누적 523건. 세종은 40년간 흔들림 없이 현장을 지켜왔습니다.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              className="flex flex-wrap gap-3">
              <a href="/business" className="px-7 py-3.5 font-bold text-[12px] hover:opacity-80 transition-opacity"
                style={{ background: "#f47c20", color: "#fff" }}>
                제품 보기
              </a>
              <a href="/portfolio" className="px-7 py-3.5 font-semibold text-[12px] transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
              >
                납품실적
              </a>
            </motion.div>
          </div>

          {/* 히어로 수치 — 우하단 */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.25 }}
            className="absolute bottom-10 right-6 md:right-12 flex gap-8 md:gap-14"
          >
            {[{ v: 40, s: "+", l: "년 업력" }, { v: 523, s: "", l: "건 납품" }, { v: 94, s: "+", l: "개 고객사" }].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-black text-white leading-none" style={{ fontSize: "clamp(1.8rem,4vw,3.5rem)", letterSpacing: "-0.045em" }}>
                  <Count to={s.v} suffix={s.s} />
                </p>
                <p className="text-[11px] mt-1.5" style={{ color: "rgba(255,255,255,0.32)" }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── 인증 배너 ─── */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(15,23,42,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-wrap items-center gap-x-10 gap-y-4 py-5">
          {CERTS.map((c, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7.5" stroke="#f47c20" strokeOpacity={0.45} />
                <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#f47c20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="text-[12px] font-semibold leading-tight" style={{ color: "#0f172a" }}>{c.label}</p>
                <p className="text-[11px]" style={{ color: "#64748b" }}>{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 제품 탭 ─── */}
      <section className="py-24 md:py-36" style={{ background: "#fff" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* 상단: 제목 + 탭 */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-7 mb-12">
            <div>
              <Clip>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#f47c20" }}>Products</p>
              </Clip>
              <Clip delay={0.08}>
                <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.2rem,5vw,4rem)", letterSpacing: "-0.04em" }}>
                  제품 라인업
                </h2>
              </Clip>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRODUCTS.map((p, i) => (
                <button key={i} onClick={() => setTab(i)}
                  className="px-4 py-2 text-[12px] font-semibold transition-all duration-200"
                  style={{
                    background: tab === i ? "#0f172a" : "transparent",
                    color: tab === i ? "#fff" : "rgba(15,23,42,0.42)",
                    border: `1px solid ${tab === i ? "#0f172a" : "rgba(15,23,42,0.14)"}`,
                  }}>
                  {p.tab}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.38, ease: E }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* 영상/이미지 */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <video
                  key={PRODUCTS[tab].video}
                  src={PRODUCTS[tab].video}
                  autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* 텍스트 */}
              <div>
                <p className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase mb-5"
                  style={{ color: "rgba(15,23,42,0.3)" }}>{PRODUCTS[tab].en}</p>

                <h3 className="font-black leading-[1.1] mb-6 whitespace-pre-line"
                  style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", letterSpacing: "-0.03em" }}>
                  {PRODUCTS[tab].pitch}
                </h3>

                <p className="text-[14px] leading-[1.85] mb-8" style={{ color: "#475569" }}>
                  {PRODUCTS[tab].body}
                </p>

                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mb-9">
                  {PRODUCTS[tab].tags.map(t => (
                    <span key={t} className="text-[11px] font-bold px-3 py-1.5"
                      style={{ background: "rgba(244,124,32,0.08)", color: "#f47c20" }}>{t}</span>
                  ))}
                </div>

                {/* 스펙 */}
                <div className="grid grid-cols-3 gap-3 mb-10">
                  {PRODUCTS[tab].specs.map(s => (
                    <div key={s.k} className="p-4" style={{ background: "#f4f6f9" }}>
                      <p className="text-[11px] mb-2" style={{ color: "#94a3b8" }}>{s.k}</p>
                      <p className="text-[14px] font-bold" style={{ color: "#0f172a" }}>{s.v}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a href="/business"
                    className="px-6 py-3 text-[12px] font-bold hover:opacity-80 transition-opacity"
                    style={{ background: "#0f172a", color: "#fff" }}>
                    상세 보기
                  </a>
                  <a href="/support/inquiry"
                    className="px-6 py-3 text-[12px] font-semibold transition-all"
                    style={{ border: "1px solid rgba(15,23,42,0.18)", color: "#0f172a" }}
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

      {/* ─── 고객사 마키 ─── */}
      <div className="overflow-hidden py-10" style={{ background: "#f4f6f9", borderTop: "1px solid rgba(15,23,42,0.07)" }}>
        <p className="text-center text-[10px] font-bold tracking-[0.35em] uppercase mb-7"
          style={{ color: "rgba(15,23,42,0.25)" }}>주요 고객사</p>
        <div className="flex gap-10 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} className="text-[12px] font-semibold shrink-0" style={{ color: "rgba(15,23,42,0.28)" }}>{c}</span>
          ))}
        </div>
      </div>

      {/* ─── 핵심가치 어코디언 ─── */}
      <section className="py-24 md:py-36" style={{ background: "#fff" }}>
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <Clip className="mb-14">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#f47c20" }}>Values</p>
              <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.2rem,5vw,4rem)", letterSpacing: "-0.04em" }}>
                세종의 핵심 가치
              </h2>
            </div>
          </Clip>

          <div style={{ borderTop: "1px solid rgba(15,23,42,0.09)" }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(15,23,42,0.09)" }}>
                <button
                  className="w-full flex items-center gap-6 py-6 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="text-[12px] font-mono w-6 shrink-0" style={{ color: "rgba(15,23,42,0.25)" }}>{v.no}</span>
                  <span className="flex-1 text-[15px] font-semibold">{v.title}</span>
                  <motion.span
                    className="shrink-0 text-xl font-light"
                    style={{ color: open === i ? "#f47c20" : "rgba(15,23,42,0.28)" }}
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.22 }}
                  >+</motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: E }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="text-[14px] leading-[1.85] pl-12 pb-7" style={{ color: "#475569" }}>{v.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA — 영상 배경 ─── */}
      <section className="relative overflow-hidden" style={{ background: "#0f172a", paddingTop: "7rem", paddingBottom: "7rem" }}>
        <video
          src="/videos/48420-453832153_medium.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.1) saturate(0.3)" }}
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(15,23,42,0.98) 0%, rgba(15,23,42,0.7) 100%)" }} />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <Clip>
              <h2 className="font-black text-white leading-[0.96]"
                style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)", letterSpacing: "-0.04em" }}>
                지금 바로<br />상담하세요
              </h2>
            </Clip>
            <motion.p className="text-[14px] leading-[1.8] mt-6" style={{ color: "rgba(255,255,255,0.38)" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              영업일 1일 이내 전문 엔지니어가 연락드립니다.
            </motion.p>
          </div>

          <motion.div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
            initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.25, ease: E }}>
            <a href="/support/inquiry"
              className="px-10 py-4 font-bold text-[12px] text-center hover:opacity-80 transition-opacity"
              style={{ background: "#f47c20", color: "#fff" }}>
              온라인 문의
            </a>
            <a href="tel:0317771234"
              className="px-10 py-4 font-semibold text-[12px] text-center transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
            >
              전화 031-777-1234
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 md:px-12 py-7 flex flex-col md:flex-row justify-between items-center gap-3 bg-white"
        style={{ borderTop: "1px solid rgba(15,23,42,0.08)" }}>
        <div className="flex items-center gap-5">
          <Image src="/images/sejong-logo.png" alt="SEJONG" width={80} height={18} className="h-[18px] w-auto opacity-30" />
          <p className="text-[11px]" style={{ color: "rgba(15,23,42,0.28)" }}>© 2026 Sejong Hoist &amp; Crane Co., Ltd.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#f47c20" }} />
          <span className="text-[11px] font-mono" style={{ color: "rgba(15,23,42,0.28)" }}>Demo 4 — AUTHORITY</span>
          <Link href="/demo" className="ml-3 text-[11px] hover:opacity-50 transition-opacity"
            style={{ color: "rgba(15,23,42,0.28)" }}>← 데모 목록</Link>
        </div>
      </footer>
    </div>
  );
}
