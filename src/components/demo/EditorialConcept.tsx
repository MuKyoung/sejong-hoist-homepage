"use client";

/**
 * DEMO 8 · 시안 D "EDITORIAL" : 연세대 메인 × 명지대 산학협력단 믹스 (자체 완결형 풀페이지)
 * - 연세대: 풀블리드 대형 타이포 히어로, 비대칭 매거진 그리드, 곡면 마스크, 원형 플로팅 버튼(QUICK/TOP)
 * - 명지대: 2단 다크 유틸 헤더, 좌측 정렬 디스플레이 + 라인 프로그레스 페이지네이션,
 *   탭형 게시판 패널, 대형 페이드 영문 워드마크, 사선 컬러 밴드
 * - 모션: 전반적으로 느리게 (리빌 1.2s / 슬라이드 8s / 켄번스 14s / 호버 줌 1.3s)
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { COMPANY, NOTICES, PORTFOLIO } from "@/data/site";
import { CONCEPT_NAV as NAV } from "./conceptNav";

const E = [0.16, 1, 0.3, 1] as never;

const INK = "#101828";
const NAVY = "#16273C";
const ROYAL = "#2E5AA7";
const PALE = "#F3F6FA";
const BODY = "rgba(16,24,40,0.62)";
const HAIR = "rgba(16,24,40,0.12)";

const SLIDE_MS = 8000;

const SLIDES = [
  {
    img: "/images/hero-01.jpg",
    lines: ["산업의 내일을", "들어 올립니다"],
    sub: "1999년부터 이어온 운반하역 설비 외길. 설계부터 유지보수까지 하나의 책임으로 수행합니다.",
  },
  {
    img: "/images/hero-04.jpg",
    lines: ["350TON, 기록으로", "증명된 기술"],
    sub: "LS ELECTRIC 부산사업장 크레인 13대 전수 안전인증 합격. 적합률 100%, 부적합 0건.",
  },
  {
    img: "/images/hero-03.jpg",
    lines: ["안전을 설계하는", "정밀 엔지니어링"],
    sub: "KCs 안전인증 5건과 구조 서면심사도서 11권. 문서로 검증 가능한 안전관리 체계를 갖췄습니다.",
  },
];

const QUICK_RAIL = [
  {
    label: "회사소개서", href: "/downloads/sejong-company-profile.pdf",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
        <path d="M20 22H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  },
  {
    label: "인증 자료", href: "/technology#certs",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3l7 2.8v5.4c0 4.4-2.9 7.7-7 9.8-4.1-2.1-7-5.4-7-9.8V5.8L12 3z" />
        <path d="M8.8 11.6l2.3 2.3 4.1-4.4" />
      </svg>
    ),
  },
  {
    label: "견적 문의", href: "/support/inquiry",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 11.5c0 4.1-4 7.5-9 7.5-1 0-2-.13-2.9-.38L4 20l1.3-3.1C3.9 15.5 3 13.6 3 11.5 3 7.4 7 4 12 4s9 3.4 9 7.5z" />
      </svg>
    ),
  },
];

/* 화살표 ↗ 글리프 (연세대 아웃라인 버튼) */
function NE() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/* 느린 등장 래퍼 — x 지정 시 좌/우에서 슬라이드 인 */
function Rise({
  children, delay = 0, y = 36, x = 0, className = "",
}: { children: React.ReactNode; delay?: number; y?: number; x?: number; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y: x ? 0 : y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.2, delay, ease: E }}
    >
      {children}
    </motion.div>
  );
}

export default function EditorialConcept() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [tab, setTab] = useState<"notice" | "news">("notice");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!playing || reduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [playing, reduced, idx]);

  const go = (d: number) => setIdx((i) => (i + d + SLIDES.length) % SLIDES.length);

  /* 현대일렉트릭式: 히어로 위 투명 → 스크롤 시 화이트 전환 */
  const solid = scrolled && !menuOpen;
  const fg = solid ? INK : "#FFFFFF";

  const noticeRows = NOTICES.slice(0, 5);
  const newsRows = PORTFOLIO.slice(0, 5);
  const cards = PORTFOLIO.slice(0, 3);

  return (
    <div className="overflow-x-clip" style={{ background: "#fff", color: INK }}>
      {/* ══════════ 헤더 : 히어로 위 투명 2단 → 스크롤 시 유틸 접힘 + 화이트 전환 ══════════ */}
      <header
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: solid ? "rgba(255,255,255,0.98)" : "transparent",
          boxShadow: solid ? "0 12px 32px rgba(16,24,40,0.08)" : "none",
          borderBottom: solid ? `1px solid ${HAIR}` : "1px solid rgba(255,255,255,0.16)",
          transition: "background .55s ease, box-shadow .55s ease, border-color .55s ease",
        }}
      >
        {/* 유틸 바 — 투명 상태에서만 노출, 스크롤 시 접힘 */}
        <div className="hidden md:block overflow-hidden"
          style={{
            height: solid ? 0 : 36,
            borderBottom: solid ? "none" : "1px solid rgba(255,255,255,0.14)",
            transition: "height .55s ease, border-color .55s ease",
          }}>
          <div className="mx-auto flex items-center justify-between h-9 text-[12.5px]"
            style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)", color: "rgba(255,255,255,0.78)" }}>
            <div className="flex items-center gap-5">
              <span>{COMPANY.address}</span>
            </div>
            <div className="flex items-center gap-5">
              <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`} className="hover:text-[#E8762C] transition-colors duration-500">
                대표전화 {COMPANY.tel}
              </a>
              <span style={{ width: 1, height: 11, background: "rgba(255,255,255,0.25)" }} />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-[#E8762C] transition-colors duration-500">
                {COMPANY.email}
              </a>
              <span style={{ width: 1, height: 11, background: "rgba(255,255,255,0.25)" }} />
              <Link href="/en" className="hover:text-[#E8762C] transition-colors duration-500">ENG</Link>
            </div>
          </div>
        </div>

        {/* 로고-메뉴-유틸 3분할 그리드 — 메뉴가 항상 정중앙 (26.07 헤더 정렬 피드백) */}
        <div className="mx-auto grid grid-cols-[1fr_auto_1fr] items-stretch gap-6 h-14 lg:h-[64px]"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
          <Link href="/demo/8" aria-label={COMPANY.name} className="justify-self-start shrink-0 flex items-center">
            <Image
              src="/images/sejong-logo.png" alt={COMPANY.name}
              width={220} height={54} priority
              className="w-auto h-9 lg:h-10 transition-[filter] duration-500"
              style={{ objectFit: "contain", filter: solid ? "none" : "brightness(0) invert(1)" }}
            />
          </Link>

          <nav className="hidden lg:flex items-stretch self-stretch" aria-label="주요 메뉴">
            {NAV.map((item) => (
              <Link
                key={item.href} href={item.href}
                className="group relative flex items-center px-5 xl:px-6 text-[16px] font-bold whitespace-nowrap transition-colors duration-300 hover:!text-[#E8762C]"
                style={{ letterSpacing: "-0.01em", color: fg, textShadow: solid ? "none" : "0 1px 14px rgba(0,0,0,0.5)" }}
              >
                {item.label}
                <span className="absolute left-5 right-5 xl:left-6 xl:right-6 bottom-0 h-[2.5px] origin-center scale-x-0 group-hover:scale-x-100"
                  style={{ background: "#E8762C", transition: "transform .6s cubic-bezier(0.16,1,0.3,1)" }} />
              </Link>
            ))}
          </nav>

          <div className="justify-self-end flex items-center gap-5">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="relative w-10 h-10 flex flex-col justify-center items-end gap-[6px]"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
            >
              <motion.span className="block h-[2px] w-6 rounded-full transition-colors duration-500" style={{ background: fg, originX: "right" }}
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? 8 : 0 }} transition={{ duration: 0.4, ease: E }} />
              <motion.span className="block h-[2px] w-4 rounded-full transition-colors duration-500" style={{ background: fg }}
                animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.25 }} />
              <motion.span className="block h-[2px] rounded-full transition-colors duration-500" style={{ background: fg, originX: "right" }}
                animate={{ width: menuOpen ? 24 : 20, rotate: menuOpen ? 45 : 0, y: menuOpen ? -8 : 0 }} transition={{ duration: 0.4, ease: E }} />
            </button>
          </div>
        </div>
      </header>

      {/* 전체 메뉴 오버레이 (연세대 MENU) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: E }}
            className="fixed inset-0 z-40 overflow-y-auto"
            style={{ background: "rgba(14,20,32,0.98)", paddingTop: 104 }}
          >
            <div className="mx-auto grid sm:grid-cols-2 lg:grid-cols-5 gap-x-10 gap-y-12 pb-20"
              style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
              {NAV.map((item, i) => (
                <motion.div key={item.href}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.9, ease: E }}
                >
                  <Link href={item.href} onClick={() => setMenuOpen(false)}
                    className="block text-[22px] font-extrabold text-white tracking-tight pb-4 mb-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
                    {item.label}
                  </Link>
                  <div className="flex flex-col gap-3">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} onClick={() => setMenuOpen(false)}
                        className="text-[14px] transition-colors duration-300 hover:text-white"
                        style={{ color: "rgba(255,255,255,0.55)" }}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════ 히어로 : 연세대 풀블리드 + 명지대 좌측 타이포/페이지네이션 ══════════ */}
      <section className="relative overflow-hidden" style={{ height: "min(86svh, 860px)", minHeight: 560 }}
        aria-roledescription="carousel" aria-label="메인 비주얼">
        {SLIDES.map((s, i) => (
          <motion.div
            key={s.img}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: idx === i ? 1 : 0, scale: reduced ? 1 : idx === i ? 1.08 : 1 }}
            transition={{ opacity: { duration: 1.6, ease: "easeInOut" }, scale: { duration: 14, ease: "linear" } }}
          >
            <Image src={s.img} alt="" fill priority={i === 0} quality={85} sizes="100vw" className="object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(94deg, rgba(10,16,28,0.86) 0%, rgba(10,16,28,0.52) 48%, rgba(10,16,28,0.18) 100%)" }} />
        <div className="absolute inset-x-0 top-0 h-44" style={{ background: "linear-gradient(180deg, rgba(10,16,28,0.66), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: "linear-gradient(0deg, rgba(10,16,28,0.72), transparent)" }} />

        <div className="absolute inset-0 flex items-center">
          <div className="w-full mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
            <AnimatePresence mode="wait">
              <motion.div key={idx} exit={{ opacity: 0, y: -18, transition: { duration: 0.5, ease: E } }} style={{ maxWidth: 880 }}>
                {/* 명지대식 짧은 룰 */}
                <motion.span
                  className="block mb-9"
                  style={{ width: 104, height: 1, background: "rgba(255,255,255,0.55)" }}
                  initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, ease: E }}
                />
                {SLIDES[idx].lines.map((line, li) => (
                  <div key={li} className="overflow-hidden">
                    <motion.h2
                      initial={{ y: "114%" }} animate={{ y: 0 }}
                      transition={{ delay: 0.1 + li * 0.13, duration: 1.35, ease: E }}
                      className="font-extrabold text-white"
                      style={{ fontSize: "clamp(38px, 6.4vw, 88px)", lineHeight: 1.1, letterSpacing: "-0.045em", textShadow: "0 4px 36px rgba(0,0,0,0.35)" }}
                    >
                      {line}
                    </motion.h2>
                  </div>
                ))}
                <motion.p
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.62, duration: 1.1, ease: E }}
                  className="mt-8 text-[15px] sm:text-[17px] leading-[1.85]"
                  style={{ color: "rgba(255,255,255,0.78)", maxWidth: 600 }}
                >
                  {SLIDES[idx].sub}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 명지대식 라인 프로그레스 (좌하단) + 연세대식 컨트롤 (우하단) */}
        <div className="absolute inset-x-0 bottom-9">
          <div className="mx-auto flex items-center justify-between gap-6"
            style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
            <div className="flex items-center gap-4 flex-1 max-w-[300px]" aria-hidden>
              <span className="text-[13px] font-bold text-[#E5C285] tabular-nums">{String(idx + 1).padStart(2, "0")}</span>
              <span className="relative flex-1 h-px overflow-hidden" style={{ background: "rgba(255,255,255,0.28)" }}>
                <motion.span
                  key={`${idx}-${playing ? "p" : "s"}`}
                  className="absolute inset-y-0 left-0 w-full origin-left bg-[#C69B54]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: playing && !reduced ? 1 : 0 }}
                  transition={{ duration: playing && !reduced ? SLIDE_MS / 1000 : 0.4, ease: "linear" }}
                />
              </span>
              <span className="text-[13px] tabular-nums" style={{ color: "rgba(255,255,255,0.55)" }}>
                {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-white">
              <button type="button" onClick={() => go(-1)} aria-label="이전 슬라이드"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/35 transition-all duration-500 hover:bg-white/15 hover:border-white/70">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button type="button" onClick={() => setPlaying((v) => !v)}
                aria-label={playing ? "슬라이드 일시정지" : "슬라이드 재생"}
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/35 transition-all duration-500 hover:bg-white/15 hover:border-white/70">
                {playing ? (
                  <svg width="10" height="11" viewBox="0 0 11 12" fill="currentColor" aria-hidden><rect x="1" width="3" height="12" rx="1" /><rect x="7" width="3" height="12" rx="1" /></svg>
                ) : (
                  <svg width="10" height="11" viewBox="0 0 11 12" fill="currentColor" aria-hidden><path d="M.8.9c0-.7.8-1.1 1.4-.8l8.3 5.1c.6.4.6 1.2 0 1.6l-8.3 5.1c-.6.4-1.4 0-1.4-.8V.9z" /></svg>
                )}
              </button>
              <button type="button" onClick={() => go(1)} aria-label="다음 슬라이드"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/35 transition-all duration-500 hover:bg-white/15 hover:border-white/70">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 에디토리얼 인트로 + 비대칭 매거진 그리드 (연세대) ══════════ */}
      <section style={{ paddingBlock: "clamp(80px, 9vw, 136px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-x-16 gap-y-12 items-start">
            <Rise x={-100}>
              <div className="flex flex-wrap items-end gap-x-8 gap-y-4 mb-6">
                <h2 className="font-extrabold" style={{ fontSize: "clamp(34px, 4.8vw, 64px)", lineHeight: 1.14, letterSpacing: "-0.045em" }}>
                  무게를 아는 회사,
                  <br />
                  세종다움
                </h2>
                <span className="hidden sm:block mb-5" style={{ width: "clamp(100px, 12vw, 200px)", height: 2, background: INK }} />
              </div>
              <p className="text-[15.5px] leading-[1.9]" style={{ color: BODY, maxWidth: 560 }}>
                (주)세종호이스트크레인은 27년의 현장 경험을 바탕으로 설계 · 제작 · 설치 ·
                유지보수 전 과정을 직접 수행하며, 산업 현장의 안전과 생산성을 책임집니다.
              </p>
            </Rise>

            {/* 실적 수치 스택 — 인트로 우측 여백을 데이터로 마감 */}
            <Rise x={90} delay={0.15}>
              <div style={{ borderTop: `2px solid ${INK}` }}>
                {[
                  { v: "25년+", k: "업력", d: "1999년 설립, 운반하역 설비 외길" },
                  { v: "520건+", k: "누적 시공", d: "전국 산업 현장 납품 · 설치" },
                  { v: "350TON", k: "최대 하중", d: "겐트리 크랩 크레인 시공 실적" },
                ].map((s) => (
                  <div key={s.k} className="flex items-baseline justify-between gap-6 py-5" style={{ borderBottom: `1px solid ${HAIR}` }}>
                    <div>
                      <p className="text-[13px] font-bold" style={{ color: "#A17A35" }}>{s.k}</p>
                      <p className="mt-1 text-[12.5px]" style={{ color: "rgba(16,24,40,0.45)" }}>{s.d}</p>
                    </div>
                    <p className="font-extrabold tabular-nums whitespace-nowrap" style={{ fontSize: "clamp(26px, 2.6vw, 38px)", letterSpacing: "-0.04em" }}>
                      {s.v}
                    </p>
                  </div>
                ))}
              </div>
            </Rise>
          </div>

          {/* 비대칭 그리드: 컬러 카드 / 포토 카드 / 디스플레이 워드 */}
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-8 mt-14 lg:mt-20">
            {/* 좌: 딥 네이비 컬러 카드 — 연세대 Research 카드 */}
            <Rise x={-90} className="h-full">
              <Link href="/business" className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] rounded-bl-none h-full min-h-[420px] lg:min-h-[540px] p-9 lg:p-12"
                style={{ background: NAVY, color: "#fff" }}>
                {/* 라디얼 글로우 — 상하좌우 드리프트 복합 모션 */}
                <motion.div
                  aria-hidden
                  className="absolute -right-24 -bottom-24 w-[340px] h-[340px] pointer-events-none"
                  animate={reduced ? undefined : { x: [0, -22, 0], y: [0, 16, 0] }}
                  transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-full h-full rounded-full opacity-60 transition-transform duration-[1400ms] group-hover:scale-125"
                    style={{ background: "radial-gradient(circle, rgba(46,90,167,0.55), transparent 68%)", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }} />
                </motion.div>
                <div>
                  <p className="font-extrabold" style={{ fontSize: "clamp(34px, 3.6vw, 52px)", letterSpacing: "-0.03em" }}>Business</p>
                  <p className="mt-5 text-[15px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.7)", maxWidth: 380 }}>
                    오버헤드 · 겐트리 · 모노레일 · 서스펜션 · 지브까지,
                    현장이 요구하는 모든 형태의 크레인을 공급합니다.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2.5 h-12 px-6 self-start text-[13.5px] font-semibold transition-colors duration-500 group-hover:bg-white group-hover:text-[#16273C]"
                  style={{ border: "1px solid rgba(255,255,255,0.45)" }}>
                  사업영역 보기 <NE />
                </span>
              </Link>
            </Rise>

            {/* 우: 포토 카드 (History) + 디스플레이 워드 (Giving to) */}
            <div className="flex flex-col gap-6 lg:gap-8">
              <Rise delay={0.12} x={90}>
                <Link href="/portfolio" className="group relative block overflow-hidden rounded-tr-[24px] min-h-[300px] lg:min-h-[340px]">
                  <Image src="/images/pf-gantry350.jpg" alt="350TON 겐트리 크레인" fill quality={85} sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-cover group-hover:scale-[1.07]" style={{ transition: "transform 1.3s cubic-bezier(0.16,1,0.3,1)" }} />
                  <span className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,16,28,0.72) 8%, rgba(10,16,28,0.18) 55%, transparent)" }} />
                  <div className="absolute left-0 right-0 bottom-0 p-8 lg:p-10 text-white">
                    <p className="font-extrabold" style={{ fontSize: "clamp(28px, 3vw, 42px)", letterSpacing: "-0.03em" }}>Projects</p>
                    <p className="mt-2.5 text-[14px]" style={{ color: "rgba(255,255,255,0.75)" }}>
                      350TON 겐트리부터 0.5TON 윈치까지, 현장이 증명한 시공 기록
                    </p>
                    <span className="inline-flex items-center gap-2.5 h-11 px-5 mt-6 text-[13px] font-semibold backdrop-blur-[2px] transition-colors duration-500 group-hover:bg-white group-hover:text-[#16273C]"
                      style={{ border: "1px solid rgba(255,255,255,0.5)", background: "rgba(10,16,28,0.25)" }}>
                      시공사례 보기 <NE />
                    </span>
                  </div>
                </Link>
              </Rise>

              <Rise delay={0.22} x={90}>
                <Link href="/technology" className="group relative overflow-hidden flex items-center justify-between gap-6 rounded-[20px] rounded-tr-none p-8 lg:p-10 min-h-[150px]"
                  style={{ background: PALE }}>
                  {/* 웨이브 라인 — 인증 패널의 여백 마감 */}
                  <svg className="absolute -right-8 -top-14 opacity-70 pointer-events-none" width="420" height="300" viewBox="0 0 420 300" fill="none" aria-hidden>
                    <path d="M-20 230C120 190 180 70 440 100" stroke="#CFDDF1" strokeWidth="1.5" />
                    <path d="M-20 260C130 220 200 100 440 130" stroke="#DBE6F5" strokeWidth="1.5" />
                    <path d="M-20 290C140 250 220 130 440 160" stroke="#E7EEF9" strokeWidth="1.5" />
                  </svg>
                  <div className="relative">
                    <p className="font-extrabold" style={{ fontSize: "clamp(28px, 3vw, 42px)", letterSpacing: "-0.03em", color: ROYAL }}>
                      Technology
                    </p>
                    <p className="mt-2 text-[14px]" style={{ color: BODY }}>
                      KCs 안전인증 5건 · 서면심사도서 11권 · ISO 3종
                    </p>
                  </div>
                  <span className="w-13 h-13 shrink-0 rounded-full flex items-center justify-center w-[52px] h-[52px] transition-all duration-500 group-hover:bg-[#E8762C] group-hover:text-white group-hover:rotate-45"
                    style={{ border: `1.5px solid ${ROYAL}`, color: ROYAL }}>
                    <NE />
                  </span>
                </Link>
              </Rise>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 게시판 패널 (명지대) : 탭 리스트 + 우측 룰 블록 ══════════ */}
      <section className="relative" style={{ background: PALE, paddingBlock: "clamp(80px, 9vw, 136px)", overflow: "hidden" }}>
        {/* 대형 페이드 워드마크 — 좌측에서 크게 슬라이드 인 */}
        <Rise x={-160} className="pointer-events-none select-none absolute -top-4 left-0" >
          <p className="font-extrabold leading-none" aria-hidden
            style={{ fontSize: "clamp(90px, 13vw, 200px)", letterSpacing: "-0.04em", color: "rgba(16,24,40,0.06)", whiteSpace: "nowrap" }}>
            Sejong Hoist
          </p>
        </Rise>

        <div className="relative mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-x-16 gap-y-16">
            {/* 좌: 탭 게시판 */}
            <Rise x={-90}>
              <div className="flex items-baseline justify-between gap-6 pb-5" style={{ borderBottom: `2px solid ${INK}` }}>
                <div className="flex items-baseline gap-6">
                  <span className="w-2 h-2 rounded-full self-center hidden sm:block" style={{ background: ROYAL }} aria-hidden />
                  <button type="button" onClick={() => setTab("notice")}
                    className="text-[clamp(22px,2.4vw,30px)] font-extrabold tracking-tight transition-colors duration-600 hover:!text-[#E8762C]"
                    style={{ color: tab === "notice" ? INK : "rgba(16,24,40,0.3)" }}
                    aria-pressed={tab === "notice"}>
                    공지사항
                  </button>
                  <span style={{ width: 1, height: 20, background: HAIR, alignSelf: "center" }} aria-hidden />
                  <button type="button" onClick={() => setTab("news")}
                    className="text-[clamp(22px,2.4vw,30px)] font-extrabold tracking-tight transition-colors duration-600 hover:!text-[#E8762C]"
                    style={{ color: tab === "news" ? INK : "rgba(16,24,40,0.3)" }}
                    aria-pressed={tab === "news"}>
                    시공 소식
                  </button>
                </div>
                <Link href={tab === "notice" ? "/support/notice" : "/portfolio"} aria-label="더보기"
                  className="text-[28px] font-light leading-none transition-all duration-500 hover:rotate-90 hover:!text-[#E8762C]" style={{ color: INK }}>
                  +
                </Link>
              </div>

              <AnimatePresence mode="wait">
                <motion.ul
                  key={tab}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.85, ease: E }}
                  className="list-none"
                >
                  {(tab === "notice"
                    ? noticeRows.map((n) => ({
                        key: `n-${n.id}`, href: `/support/notice/${n.id}`,
                        chip: n.category, title: n.title, meta: n.date,
                      }))
                    : newsRows.map((p) => ({
                        key: p.slug, href: `/portfolio/${p.slug}`,
                        chip: p.capacity, title: `${p.title} · ${p.client}`, meta: `${p.year}`,
                      }))
                  ).map((row, i) => (
                    <li key={row.key} style={{ borderBottom: `1px solid ${HAIR}` }}>
                      <Link href={row.href} className="group flex items-center gap-5 py-[18px] transition-colors duration-600 hover:bg-white"
                        style={{ paddingInline: 6 }}>
                        <span className="shrink-0 min-w-[64px] text-center text-[11.5px] font-bold px-2.5 py-1.5"
                          style={{
                            background: i === 0 ? "#C69B54" : "rgba(16,24,40,0.06)",
                            color: i === 0 ? "#231909" : "rgba(16,24,40,0.55)",
                          }}>
                          {row.chip}
                        </span>
                        <span className="flex-1 min-w-0 text-[15px] font-medium truncate transition-colors duration-300 group-hover:text-[#E8762C]"
                          style={{ color: "rgba(16,24,40,0.82)" }}>
                          {row.title}
                        </span>
                        <span className="shrink-0 text-[13px] tabular-nums" style={{ color: "rgba(16,24,40,0.4)" }}>
                          {row.meta}
                        </span>
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>

              <Link href={tab === "notice" ? "/support/notice" : "/portfolio"}
                className="group flex items-center justify-center gap-2.5 h-[58px] mt-8 text-[14px] font-bold transition-colors duration-500 hover:bg-[#16273C] hover:text-white"
                style={{ border: `1px solid ${INK}` }}>
                {tab === "notice" ? "공지사항 전체 보기" : "시공사례 전체 보기"}
                <span className="transition-transform duration-500 group-hover:translate-x-1"><NE /></span>
              </Link>
            </Rise>

            {/* 우: 룰 블록 (명지대 연구윤리 칼럼) */}
            <Rise delay={0.15} x={90}>
              <div style={{ borderTop: `2px solid ${INK}` }}>
                <div className="py-7" style={{ borderBottom: `1px solid ${HAIR}` }}>
                  <h3 className="text-[19px] font-extrabold tracking-tight">안전관리 체계</h3>
                  <p className="mt-3.5 text-[14px] leading-[1.85]" style={{ color: BODY }}>
                    설치 전 구조 검토부터 하중 시험, 정기점검까지 단계별 안전관리를
                    운영합니다. 모든 설비는 KCs 개별 제품심사를 거칩니다.
                  </p>
                </div>
                <Link href="/technology#safety" className="group flex items-center justify-between py-5" style={{ borderBottom: `1px solid ${HAIR}` }}>
                  <span className="text-[15.5px] font-bold transition-colors duration-300 group-hover:text-[#E8762C]">안전관리 자세히 보기</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5" style={{ color: ROYAL }}><NE /></span>
                </Link>
                <Link href="/technology#license" className="group flex items-center justify-between py-5" style={{ borderBottom: `1px solid ${HAIR}` }}>
                  <span className="text-[15.5px] font-bold transition-colors duration-300 group-hover:text-[#E8762C]">보유 자격 인력</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5" style={{ color: ROYAL }}><NE /></span>
                </Link>
                <Link href="/support/inquiry" className="group flex items-center justify-between py-5" style={{ borderBottom: `1px solid ${HAIR}` }}>
                  <span className="text-[15.5px] font-bold transition-colors duration-300 group-hover:text-[#E8762C]">온라인 견적 문의</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5" style={{ color: ROYAL }}><NE /></span>
                </Link>

                <div className="relative overflow-hidden mt-8 rounded-tr-[24px]" style={{ aspectRatio: "16 / 9" }}>
                  <Image src="/images/tech-analysis.jpg" alt="350TON 크레인 와이어 로프 작업" fill
                    quality={82} sizes="(max-width: 1024px) 100vw, 460px" className="object-cover" />
                  <span className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,16,28,0.4), transparent 55%)" }} />
                  <p className="absolute left-5 bottom-4 text-[13px] font-semibold text-white">350TON 와이어 로프 위빙 작업</p>
                </div>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* ══════════ 소식 카드 (명지대 Live on) : 딤 배경 + 카드 3장 + 아이콘 레일 ══════════ */}
      <section className="relative overflow-hidden" style={{ paddingBlock: "clamp(80px, 9vw, 136px)" }}>
        <div className="absolute inset-0" aria-hidden>
          <Image src="/images/hero-02.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(94deg, rgba(14,20,32,0.94) 0%, rgba(14,20,32,0.82) 55%, rgba(14,20,32,0.7) 100%)" }} />
        </div>

        <div className="relative mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
          <Rise x={160}>
            <p className="font-extrabold leading-none select-none" aria-hidden
              style={{ fontSize: "clamp(64px, 9vw, 150px)", letterSpacing: "-0.04em", color: "rgba(255,255,255,0.1)" }}>
              Field Proven
            </p>
          </Rise>

          <div className="grid lg:grid-cols-[0.85fr_2fr] gap-x-14 gap-y-14 mt-6">
            {/* 좌 레일 */}
            <Rise x={-90}>
              <h2 className="text-[clamp(24px,2.6vw,34px)] font-extrabold text-white tracking-tight leading-[1.3]">
                현장이 증명한
                <br />
                세종의 기록
              </h2>
              <p className="mt-5 text-[14.5px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.6)" }}>
                대형 시공 실적과 인증 자료를 그대로 공개합니다.
              </p>
              <div className="flex flex-col gap-3 mt-10">
                {QUICK_RAIL.map((q) => (
                  <Link key={q.label} href={q.href}
                    className="group flex items-center gap-4 h-[64px] px-6 text-white transition-colors duration-500 hover:bg-[#E8762C] hover:!border-[#E8762C]"
                    style={{ border: "1px solid rgba(255,255,255,0.28)" }}>
                    {q.icon}
                    <span className="text-[15px] font-bold">{q.label}</span>
                    <span className="ml-auto transition-transform duration-500 group-hover:translate-x-1.5"><NE /></span>
                  </Link>
                ))}
              </div>
            </Rise>

            {/* 우: 시공 카드 3장 */}
            <div className="grid sm:grid-cols-3 gap-5">
              {cards.map((item, i) => (
                <Rise key={item.slug} delay={0.12 + i * 0.14} x={80} className="h-full">
                  <Link href={`/portfolio/${item.slug}`} className="group flex flex-col h-full overflow-hidden rounded-[14px] rounded-bl-none backdrop-blur-[3px] transition-colors duration-500 hover:bg-white"
                    style={{ background: "rgba(255,255,255,0.96)" }}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                      <Image src={item.src} alt={item.title} fill sizes="(max-width: 640px) 100vw, 320px"
                        className="object-cover group-hover:scale-[1.08]" style={{ transition: "transform 1.3s cubic-bezier(0.16,1,0.3,1)" }} />
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <span className="self-start text-[11.5px] font-bold px-2.5 py-1 mb-4" style={{ background: NAVY, color: "#fff" }}>
                        {item.capacity}
                      </span>
                      <h3 className="text-[16.5px] font-bold leading-[1.45] transition-colors duration-300 group-hover:text-[#E8762C]">
                        {item.title}
                      </h3>
                      <div className="mt-auto pt-5 flex items-center justify-between gap-4">
                        <p className="text-[13px]" style={{ color: "rgba(16,24,40,0.5)" }}>
                          {item.client} · {item.year}
                        </p>
                        <span className="shrink-0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#E8762C]"
                          style={{ color: "rgba(16,24,40,0.35)" }}>
                          <NE />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Rise>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 주요 고객사 스트립 — 실적 기반 신뢰 요소 ══════════ */}
      <section className="bg-white" style={{ paddingBlock: "clamp(44px, 5vw, 68px)" }}>
        <div className="mx-auto flex flex-col sm:flex-row sm:items-center gap-x-14 gap-y-5"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
          <Rise x={-60}>
            <p className="shrink-0 text-[13.5px] font-bold" style={{ color: BODY }}>
              함께해 온 주요 고객사
            </p>
          </Rise>
          <Rise x={60} delay={0.1} className="flex-1">
            <div className="flex flex-wrap items-baseline gap-x-12 gap-y-3">
              {["LS ELECTRIC", "두산중공업", "현대위아"].map((n) => (
                <span key={n} className="font-extrabold tracking-tight transition-colors duration-500 hover:text-[#E8762C]"
                  style={{ fontSize: "clamp(18px, 1.9vw, 26px)", color: "rgba(16,24,40,0.42)" }}>
                  {n}
                </span>
              ))}
              <span className="text-[13.5px]" style={{ color: "rgba(16,24,40,0.42)" }}>외 전국 산업 현장</span>
            </div>
          </Rise>
        </div>
      </section>

      {/* ══════════ 사선 컬러 밴드 + CTA (명지대 하단) ══════════ */}
      <section className="relative overflow-hidden" style={{ background: NAVY }}>
        <div className="absolute inset-x-0 top-0 h-4 flex" aria-hidden>
          <span style={{ width: "26%", background: ROYAL, clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)" }} />
          <span style={{ width: "18%", background: "#4E7CC4", clipPath: "polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)", marginLeft: -8 }} />
        </div>
        <div className="mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)", paddingBlock: "clamp(72px, 8vw, 116px)" }}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <Rise x={-90}>
              <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 3.8vw, 52px)", letterSpacing: "-0.04em", lineHeight: 1.24 }}>
                어제보다 안전한 현장을
                <br />
                오늘 만들어 갑니다
              </h2>
              <p className="mt-5 text-[15px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.62)", maxWidth: 560 }}>
                설계부터 유지보수까지 세종호이스트크레인이 현장과 함께합니다.
                조건만 알려주시면 최적 사양과 견적을 제안해 드립니다.
              </p>
            </Rise>
            <Rise delay={0.15} x={90}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/support/inquiry"
                  className="flex items-center justify-center gap-2.5 h-[60px] px-10 rounded-full text-[15px] font-bold transition-colors duration-500 hover:bg-[#F6E7D2]"
                  style={{ background: "#fff", color: NAVY }}>
                  온라인 견적 문의 <NE />
                </Link>
                <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`}
                  className="flex items-center justify-center h-[60px] px-10 rounded-full text-[15px] font-bold text-white transition-colors duration-500 hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.4)" }}>
                  {COMPANY.tel}
                </a>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* ══════════ 푸터 ══════════ */}
      <footer style={{ background: "#0E1420", paddingBlock: "clamp(48px, 6vw, 72px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-9"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <Image src="/images/sejong-logo.png" alt={COMPANY.name} width={170} height={40}
              className="w-auto h-8" style={{ filter: "brightness(0) invert(1)", objectFit: "contain", opacity: 0.85 }} />
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="text-[13.5px] font-semibold transition-colors duration-300 hover:text-white"
                  style={{ color: "rgba(255,255,255,0.55)" }}>
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 pt-8 text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
            <p>
              {COMPANY.address} · 대표 {COMPANY.ceo} · 사업자등록번호 {COMPANY.bizNo}
            </p>
            <p>© 2026 {COMPANY.name} · 시안 D EDITORIAL 데모</p>
          </div>
        </div>
      </footer>

      {/* 연세대式 원형 플로팅: QUICK(견적) + TOP */}
      <div className="fixed right-4 sm:right-5 bottom-32 sm:bottom-24 z-[60] flex flex-col gap-3">
        <Link href="/support/inquiry" aria-label="견적 문의"
          className="relative w-14 h-14 sm:w-[64px] sm:h-[64px] rounded-full flex flex-col items-center justify-center gap-0.5 text-white text-[11px] font-bold shadow-[0_10px_30px_rgba(16,24,40,0.35)] transition-all duration-500 hover:scale-110 hover:!bg-[#E8762C]"
          style={{ background: ROYAL }}>
          {/* 회전 대시 링 */}
          <motion.span
            aria-hidden
            className="absolute -inset-[7px] rounded-full pointer-events-none"
            style={{ border: "1.5px dashed rgba(46,90,167,0.55)" }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          />
          <NE />
          견적
        </Link>
        <button type="button" aria-label="맨 위로"
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
          className="w-14 h-14 sm:w-[64px] sm:h-[64px] rounded-full flex flex-col items-center justify-center gap-1 text-[11px] font-bold bg-white shadow-[0_10px_30px_rgba(16,24,40,0.18)] transition-all duration-500 hover:scale-110 hover:!bg-[#E8762C] hover:!text-white"
          style={{ border: `1px solid ${HAIR}`, color: INK }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="18 15 12 9 6 15" /></svg>
          TOP
        </button>
      </div>
    </div>
  );
}
