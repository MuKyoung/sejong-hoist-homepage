"use client";

/**
 * DEMO 8 · 시안 D "EDITORIAL" : 연세대학교(미래캠퍼스) 문법 최대 반영 (자체 완결형 풀페이지)
 * - 화이트 캔버스 + 브라이트 로열블루/딥네이비 투톤, 연블루그레이 밴드
 * - 풀블리드 히어로 + 우하단 대형 "01 / 03" 카운터와 얇은 컨트롤
 * - 컬러 패널 매거진 그리드(Business 블루 / Projects 포토 / Technology 워드)
 * - 뉴스 밴드(View More 필 버튼 + 카드 3장) · 필 탭 공지 + 연블루 서비스 패널
 * - 모션: 느리고 무겁게 (리빌 1.2s / 슬라이드 8s / 켄번스 14s) · 호버 강조 = 크레인 오렌지
 * - 라운드 규칙: ≤10px / 완전 원형 / 직각만
 */

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { COMPANY, NOTICES, PORTFOLIO } from "@/data/site";
import { CONCEPT_NAV as NAV } from "./conceptNav";

const E = [0.16, 1, 0.3, 1] as never;

const INK = "#12203A";
const BLUE = "#1A5FCF";
const DEEP = "#0E1B36";
const BAND = "#E9EFF7";
const PANEL = "#F0F5FB";
const BODY = "rgba(18,32,58,0.62)";
const HAIR = "rgba(18,32,58,0.12)";
const HOT = "#E8762C";
const GOLD = "#C69B54";

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

const SERVICES = [
  {
    label: "회사소개서 다운로드", href: "/downloads/sejong-company-profile.pdf",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
        <path d="M20 22H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  },
  {
    label: "인증 자료 열람", href: "/technology#certs",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3l7 2.8v5.4c0 4.4-2.9 7.7-7 9.8-4.1-2.1-7-5.4-7-9.8V5.8L12 3z" />
        <path d="M8.8 11.6l2.3 2.3 4.1-4.4" />
      </svg>
    ),
  },
  {
    label: "온라인 견적 문의", href: "/support/inquiry",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 11.5c0 4.1-4 7.5-9 7.5-1 0-2-.13-2.9-.38L4 20l1.3-3.1C3.9 15.5 3 13.6 3 11.5 3 7.4 7 4 12 4s9 3.4 9 7.5z" />
      </svg>
    ),
  },
  {
    label: "오시는 길", href: "/about/location",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 21.5s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10.3" r="2.4" />
      </svg>
    ),
  },
];

/* ↗ 외부/이동 글리프 (연세 버튼 시그니처) */
function NE() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
  const [noticeTab, setNoticeTab] = useState("전체");

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

  const noticeCats = useMemo(
    () => ["전체", ...new Set(NOTICES.map((n) => n.category))],
    []
  );
  const noticeRows = (noticeTab === "전체"
    ? NOTICES
    : NOTICES.filter((n) => n.category === noticeTab)
  ).slice(0, 4);
  const cards = PORTFOLIO.slice(0, 3);

  return (
    <div className="overflow-x-clip" style={{ background: "#fff", color: INK }}>
      {/* ══════════ 헤더 : 다크 유틸 + 화이트 메인 (MENU 블루 시그니처) ══════════ */}
      <div style={{ background: DEEP }}>
        <div className="mx-auto hidden md:flex items-center justify-between h-9 text-[12.5px]"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)", color: "rgba(255,255,255,0.66)" }}>
          <span>{COMPANY.address}</span>
          <div className="flex items-center gap-5">
            <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`} className="hover:text-white transition-colors duration-300">
              대표전화 {COMPANY.tel}
            </a>
            <span style={{ width: 1, height: 11, background: "rgba(255,255,255,0.2)" }} />
            <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors duration-300">
              {COMPANY.email}
            </a>
            <span style={{ width: 1, height: 11, background: "rgba(255,255,255,0.2)" }} />
            <Link href="/en" className="inline-flex items-center gap-1 hover:text-white transition-colors duration-300">
              ENG <NE />
            </Link>
          </div>
        </div>
      </div>

      <header
        className="sticky top-0 z-50 bg-white"
        style={{
          borderBottom: `1px solid ${scrolled ? HAIR : "rgba(18,32,58,0.06)"}`,
          boxShadow: scrolled ? "0 12px 32px rgba(18,32,58,0.08)" : "none",
          transition: "box-shadow .5s ease, border-color .5s ease",
        }}
      >
        <div className="mx-auto flex items-stretch justify-between gap-6 h-[64px] lg:h-[76px]"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
          <Link href="/demo/8" aria-label={COMPANY.name} className="shrink-0 flex items-center">
            <Image
              src="/images/sejong-logo.png" alt={COMPANY.name}
              width={220} height={54} priority
              className="w-auto h-10 lg:h-11" style={{ objectFit: "contain" }}
            />
          </Link>

          <nav className="hidden lg:flex items-stretch self-stretch" aria-label="주요 메뉴">
            {NAV.map((item) => (
              <Link
                key={item.href} href={item.href}
                className="group relative flex items-center px-5 xl:px-6 text-[16px] font-bold whitespace-nowrap transition-colors duration-300 hover:text-[#E8762C]"
                style={{ letterSpacing: "-0.01em" }}
              >
                {item.label}
                <span className="absolute left-5 right-5 xl:left-6 xl:right-6 bottom-0 h-[2.5px] origin-center scale-x-0 group-hover:scale-x-100"
                  style={{ background: HOT, transition: "transform .6s cubic-bezier(0.16,1,0.3,1)" }} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link href="/support/inquiry"
              className="hidden sm:flex items-center gap-2 h-10 px-6 rounded-full text-[13.5px] font-bold text-white transition-colors duration-300 hover:bg-[#E8762C]"
              style={{ background: BLUE }}>
              견적 문의 <NE />
            </Link>

            {/* 연세식 MENU : 블루 텍스트 + 3선 */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2.5"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
            >
              <span className="relative w-6 h-4 flex flex-col justify-between">
                <motion.span className="block h-[2.5px] rounded-full" style={{ background: BLUE, originX: "right" }}
                  animate={{ width: menuOpen ? 24 : 24, rotate: menuOpen ? -45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.4, ease: E }} />
                <motion.span className="block h-[2.5px] w-4 rounded-full" style={{ background: BLUE }}
                  animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.25 }} />
                <motion.span className="block h-[2.5px] rounded-full" style={{ background: BLUE, originX: "right" }}
                  animate={{ width: menuOpen ? 24 : 18, rotate: menuOpen ? 45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.4, ease: E }} />
              </span>
              <span className="hidden sm:block text-[15px] font-extrabold tracking-wide" style={{ color: BLUE }}>
                {menuOpen ? "CLOSE" : "MENU"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 전체 메뉴 오버레이 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: E }}
            className="fixed inset-0 z-40 overflow-y-auto"
            style={{ background: "rgba(14,27,54,0.98)", paddingTop: 110 }}
          >
            <div className="mx-auto grid sm:grid-cols-2 lg:grid-cols-5 gap-x-10 gap-y-12 pb-20"
              style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
              {NAV.map((item, i) => (
                <motion.div key={item.href}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.9, ease: E }}
                >
                  <Link href={item.href} onClick={() => setMenuOpen(false)}
                    className="block text-[22px] font-extrabold text-white tracking-tight pb-4 mb-4 transition-colors duration-300 hover:text-[#E8762C]"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
                    {item.label}
                  </Link>
                  <div className="flex flex-col gap-3">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} onClick={() => setMenuOpen(false)}
                        className="text-[14px] transition-colors duration-300 hover:text-[#E8762C]"
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

      {/* ══════════ 히어로 : 풀블리드 + 우하단 대형 카운터 (연세 시그니처) ══════════ */}
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
            <Image src={s.img} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(94deg, rgba(10,18,36,0.84) 0%, rgba(10,18,36,0.5) 48%, rgba(10,18,36,0.16) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: "linear-gradient(0deg, rgba(10,18,36,0.7), transparent)" }} />

        <div className="absolute inset-0 flex items-center">
          <div className="w-full mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
            <AnimatePresence mode="wait">
              <motion.div key={idx} exit={{ opacity: 0, y: -18, transition: { duration: 0.5, ease: E } }} style={{ maxWidth: 880 }}>
                <motion.span
                  className="block mb-9"
                  style={{ width: 104, height: 2, background: GOLD }}
                  initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, ease: E }}
                />
                {SLIDES[idx].lines.map((line, li) => (
                  <motion.h2
                    key={li}
                    initial={{ opacity: 0, x: li % 2 === 0 ? -110 : 110 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + li * 0.13, duration: 1.2, ease: E }}
                    className="font-extrabold text-white"
                    style={{ fontSize: "clamp(38px, 6.4vw, 88px)", lineHeight: 1.1, letterSpacing: "-0.045em", textShadow: "0 4px 36px rgba(0,0,0,0.35)" }}
                  >
                    {line}
                  </motion.h2>
                ))}
                <motion.p
                  initial={{ opacity: 0, x: -70 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 1, ease: E }}
                  className="mt-8 text-[15px] sm:text-[17px] leading-[1.85]"
                  style={{ color: "rgba(255,255,255,0.78)", maxWidth: 600 }}
                >
                  {SLIDES[idx].sub}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 우하단 : 대형 카운터 + 얇은 컨트롤 (연세 미래캠퍼스 문법) */}
        <div className="absolute inset-x-0 bottom-8">
          <div className="mx-auto flex items-end justify-end"
            style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
            <motion.div
              initial={{ opacity: 0, x: 70 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 1, ease: E }}
              className="flex items-center gap-7 text-white"
            >
              <p className="flex items-baseline gap-2 tabular-nums" aria-hidden>
                <span className="text-[30px] font-extrabold leading-none" style={{ color: GOLD }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-[17px] font-light" style={{ color: "rgba(255,255,255,0.55)" }}>/</span>
                <span className="text-[17px] font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {String(SLIDES.length).padStart(2, "0")}
                </span>
              </p>
              <div className="flex items-center gap-5">
                <button type="button" onClick={() => go(-1)} aria-label="이전 슬라이드"
                  className="transition-colors duration-500 hover:text-[#E8762C]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button type="button" onClick={() => setPlaying((v) => !v)}
                  aria-label={playing ? "슬라이드 일시정지" : "슬라이드 재생"}
                  className="transition-colors duration-500 hover:text-[#E8762C]">
                  {playing ? (
                    <svg width="14" height="16" viewBox="0 0 11 12" fill="currentColor" aria-hidden><rect x="1.5" width="2.2" height="12" rx="0.4" /><rect x="7.3" width="2.2" height="12" rx="0.4" /></svg>
                  ) : (
                    <svg width="14" height="16" viewBox="0 0 11 12" fill="currentColor" aria-hidden><path d="M.8.9c0-.7.8-1.1 1.4-.8l8.3 5.1c.6.4.6 1.2 0 1.6l-8.3 5.1c-.6.4-1.4 0-1.4-.8V.9z" /></svg>
                  )}
                </button>
                <button type="button" onClick={() => go(1)} aria-label="다음 슬라이드"
                  className="transition-colors duration-500 hover:text-[#E8762C]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 에디토리얼 인트로 + 컬러 패널 매거진 그리드 (연세 Research/History/Value) ══════════ */}
      <section style={{ paddingBlock: "clamp(80px, 9vw, 136px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
          <Rise x={-100}>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(34px, 4.8vw, 62px)", lineHeight: 1.14, letterSpacing: "-0.045em" }}>
              무게를 아는 회사, 세종다움
            </h2>
            <span className="block mt-7 mb-7" style={{ width: "min(46%, 620px)", height: 2, background: INK }} />
            <p className="text-[15.5px] leading-[1.9]" style={{ color: BODY, maxWidth: 580 }}>
              (주)세종호이스트크레인은 27년의 현장 경험을 바탕으로 설계 · 제작 · 설치 ·
              유지보수 전 과정을 직접 수행하며, 산업 현장의 안전과 생산성을 책임집니다.
            </p>
          </Rise>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mt-14 lg:mt-20">
            {/* 좌: 브라이트 블루 컬러 패널 — 연세 Research */}
            <Rise x={-90} className="h-full">
              <Link href="/business" className="group relative flex flex-col items-center justify-center text-center overflow-hidden h-full min-h-[440px] lg:min-h-[560px] p-10"
                style={{ background: BLUE, color: "#fff" }}>
                <Image src="/images/pf-ceiling30.jpg" alt="" fill sizes="(max-width: 1024px) 100vw, 680px"
                  className="object-cover group-hover:scale-[1.06]"
                  style={{ opacity: 0.28, mixBlendMode: "luminosity", transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1)" }} />
                <span className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,95,207,0.4), rgba(14,45,110,0.55))" }} />
                <div className="relative">
                  <p className="font-extrabold" style={{ fontSize: "clamp(40px, 4.2vw, 60px)", letterSpacing: "-0.03em" }}>Business</p>
                  <p className="mt-6 text-[15.5px] leading-[1.9]" style={{ color: "rgba(255,255,255,0.82)", maxWidth: 400 }}>
                    현장을 바꾸는 운반하역 설비,
                    <br />
                    산업을 향한 세종의 기술
                  </p>
                  <span className="inline-flex items-center gap-2.5 h-12 px-7 mt-10 text-[13.5px] font-bold transition-colors duration-500 group-hover:bg-[#E8762C] group-hover:border-[#E8762C]"
                    style={{ border: "1px solid rgba(255,255,255,0.6)" }}>
                    사업영역 보기 <NE />
                  </span>
                </div>
              </Link>
            </Rise>

            {/* 우: History 포토 패널 + Value 워드 패널 */}
            <div className="flex flex-col gap-6 lg:gap-8">
              <Rise x={90}>
                <div className="group relative overflow-hidden min-h-[300px] lg:min-h-[340px]">
                  <Image src="/images/pf-gantry350.jpg" alt="350TON 겐트리 크레인" fill sizes="(max-width: 1024px) 100vw, 680px"
                    className="object-cover group-hover:scale-[1.06]" style={{ transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1)" }} />
                  <span className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,18,36,0.66) 10%, rgba(10,18,36,0.14) 60%, transparent)" }} />
                  <div className="absolute left-0 right-0 bottom-0 p-8 lg:p-10 text-white">
                    <p className="font-extrabold" style={{ fontSize: "clamp(30px, 3.2vw, 46px)", letterSpacing: "-0.03em" }}>Projects</p>
                    <p className="mt-2.5 text-[14.5px]" style={{ color: "rgba(255,255,255,0.78)" }}>
                      대형 현장이 증명한 시공의 발자취
                    </p>
                    {/* 연세 History의 다크 사각 버튼 */}
                    <Link href="/portfolio"
                      className="inline-flex items-center gap-2.5 h-12 px-6 mt-6 text-[13.5px] font-bold text-white transition-colors duration-500 hover:bg-[#E8762C]"
                      style={{ background: DEEP }}>
                      시공의 발자취 <NE />
                    </Link>
                  </div>
                </div>
              </Rise>

              <Rise x={90} delay={0.14}>
                <Link href="/technology" className="group relative flex items-center justify-between gap-6 p-8 lg:p-10 min-h-[180px] overflow-hidden rounded-[10px]"
                  style={{ background: PANEL }}>
                  {/* 연세 Value 밴드의 웨이브 라인 무드 */}
                  <svg className="absolute -right-10 -top-16 opacity-60" width="420" height="320" viewBox="0 0 420 320" fill="none" aria-hidden>
                    <path d="M-20 240C120 200 180 80 430 110" stroke="#C9DAF2" strokeWidth="1.5" />
                    <path d="M-20 270C130 230 200 110 430 140" stroke="#D6E3F5" strokeWidth="1.5" />
                    <path d="M-20 300C140 260 220 140 430 170" stroke="#E2ECF9" strokeWidth="1.5" />
                  </svg>
                  <div className="relative">
                    <p className="font-extrabold" style={{ fontSize: "clamp(30px, 3.2vw, 46px)", letterSpacing: "-0.03em", color: BLUE }}>
                      Technology
                    </p>
                    <p className="mt-3 text-[14.5px] leading-[1.8]" style={{ color: BODY }}>
                      KCs 안전인증 5건 · 서면심사도서 11권 · ISO 3종
                      <br />
                      검증 가능한 기술이 세종의 가치를 만듭니다.
                    </p>
                  </div>
                  <span
                    className="relative shrink-0 rounded-full flex items-center justify-center w-[52px] h-[52px] transition-all duration-500 group-hover:bg-[#E8762C] group-hover:border-[#E8762C] group-hover:text-white group-hover:rotate-45"
                    style={{ border: `1.5px solid ${BLUE}`, color: BLUE }}>
                    <NE />
                  </span>
                </Link>
              </Rise>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 뉴스 밴드 (연블루그레이 + View More 필 버튼 + 카드 3장) ══════════ */}
      <section style={{ background: BAND, paddingBlock: "clamp(76px, 8.5vw, 120px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-x-12 gap-y-7 mb-12 lg:mb-14">
            <Rise x={-90}>
              <p className="text-[16px] font-extrabold" style={{ color: BLUE }}>Sejong News</p>
              <h2 className="mt-1 font-extrabold" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", letterSpacing: "-0.04em" }}>
                시공 소식
              </h2>
            </Rise>
            <Rise x={-60} delay={0.12} className="lg:flex-1">
              <p className="text-[14.5px] leading-[1.85]" style={{ color: BODY, maxWidth: 520 }}>
                350TON 겐트리부터 0.5TON 윈치까지, 전국 산업 현장에서 진행 중인
                세종호이스트크레인의 생생한 시공 기록을 전해드립니다.
              </p>
            </Rise>
            <Rise x={90} delay={0.18}>
              <Link href="/portfolio"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full text-[14px] font-bold text-white transition-colors duration-500 hover:bg-[#E8762C]"
                style={{ background: BLUE }}>
                View More <span className="text-[16px] leading-none">+</span>
              </Link>
            </Rise>
          </div>

          <div className="relative">
            <div className="grid sm:grid-cols-3 gap-6">
              {cards.map((item, i) => (
                <Rise key={item.slug} delay={0.1 + i * 0.14} x={i === 0 ? -80 : i === 2 ? 80 : 0}>
                  <Link href={`/portfolio/${item.slug}`} className="group block bg-white">
                    <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
                      <Image src={item.src} alt={item.title} fill sizes="(max-width: 640px) 100vw, 420px"
                        className="object-cover group-hover:scale-[1.07]" style={{ transition: "transform 1.3s cubic-bezier(0.16,1,0.3,1)" }} />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="text-[11.5px] font-bold px-2.5 py-1" style={{ background: DEEP, color: "#fff" }}>
                          {item.capacity}
                        </span>
                        <span className="text-[12.5px]" style={{ color: "rgba(18,32,58,0.45)" }}>{item.year}</span>
                      </div>
                      <h3 className="text-[16.5px] font-bold leading-[1.45] transition-colors duration-500 group-hover:text-[#E8762C]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[13px]" style={{ color: "rgba(18,32,58,0.5)" }}>{item.client}</p>
                    </div>
                  </Link>
                </Rise>
              ))}
            </div>

            {/* 연세식 원형 좌우 화살표 (데스크톱 장식 내비 — 전체 목록으로 연결) */}
            <Link href="/portfolio" aria-label="시공사례 더 보기"
              className="hidden xl:flex absolute top-[104px] -left-20 w-[54px] h-[54px] rounded-full bg-white items-center justify-center shadow-[0_8px_24px_rgba(18,32,58,0.12)] transition-colors duration-500 hover:bg-[#E8762C] hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="15 18 9 12 15 6" /></svg>
            </Link>
            <Link href="/portfolio" aria-label="시공사례 더 보기"
              className="hidden xl:flex absolute top-[104px] -right-20 w-[54px] h-[54px] rounded-full bg-white items-center justify-center shadow-[0_8px_24px_rgba(18,32,58,0.12)] transition-colors duration-500 hover:bg-[#E8762C] hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ 공지사항(필 탭) + 세종 서비스 패널 (연세 공지+캘린더 2열) ══════════ */}
      <section style={{ paddingBlock: "clamp(76px, 8.5vw, 120px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
          <div className="grid lg:grid-cols-[1.45fr_1fr] gap-x-16 gap-y-16 items-start">
            {/* 좌: 공지사항 + 필 탭 */}
            <Rise x={-90}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <h2 className="font-extrabold" style={{ fontSize: "clamp(24px, 2.6vw, 34px)", letterSpacing: "-0.04em" }}>
                  공지사항
                </h2>
                <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="공지 분류">
                  {noticeCats.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={noticeTab === cat}
                      onClick={() => setNoticeTab(cat)}
                      className="h-9 px-4 rounded-full text-[13.5px] font-bold transition-colors duration-500"
                      style={noticeTab === cat
                        ? { background: BLUE, color: "#fff" }
                        : { color: "rgba(18,32,58,0.55)" }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <Link href="/support/notice"
                  className="ml-auto text-[13.5px] font-bold underline underline-offset-4 transition-colors duration-500 hover:text-[#E8762C]"
                  style={{ color: BLUE }}>
                  View More +
                </Link>
              </div>

              <AnimatePresence mode="wait">
                <motion.ul
                  key={noticeTab}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.7, ease: E }}
                  className="list-none mt-7"
                  style={{ borderTop: `2px solid ${INK}` }}
                >
                  {noticeRows.map((n, i) => (
                    <li key={n.id} style={{ borderBottom: `1px solid ${HAIR}` }}>
                      <Link href={`/support/notice/${n.id}`} className="group block py-[18px] transition-colors duration-500 hover:bg-[#F7FAFD]"
                        style={{ paddingInline: 6 }}>
                        <p className="text-[15.5px] font-semibold leading-[1.5] truncate transition-colors duration-500 group-hover:text-[#E8762C]"
                          style={{ color: "rgba(18,32,58,0.85)" }}>
                          {n.title}
                          {i === 0 && (
                            <span className="inline-flex items-center ml-2.5 align-middle text-[10.5px] font-extrabold tracking-wide px-1.5 py-0.5"
                              style={{ color: HOT, border: `1px solid ${HOT}` }}>
                              NEW
                            </span>
                          )}
                        </p>
                        <p className="mt-2 flex items-center gap-3 text-[12.5px]" style={{ color: "rgba(18,32,58,0.45)" }}>
                          <span className="tabular-nums">{n.date}</span>
                          <span style={{ width: 1, height: 10, background: HAIR }} />
                          <span style={{ color: GOLD, fontWeight: 700 }}>{n.category}</span>
                        </p>
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </Rise>

            {/* 우: 세종 서비스 패널 (연세캘린더 자리 — 연블루, 라운드 10) */}
            <Rise x={90} delay={0.12}>
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="font-extrabold" style={{ fontSize: "clamp(24px, 2.6vw, 34px)", letterSpacing: "-0.04em" }}>
                  고객 지원
                </h2>
                <Link href="/support"
                  className="text-[13.5px] font-bold underline underline-offset-4 transition-colors duration-500 hover:text-[#E8762C]"
                  style={{ color: BLUE }}>
                  View More +
                </Link>
              </div>
              <div className="rounded-[10px] p-7 lg:p-8" style={{ background: PANEL }}>
                <div className="flex items-center justify-between pb-5" style={{ borderBottom: `2px solid ${BLUE}` }}>
                  <p className="text-[20px] font-extrabold tabular-nums" style={{ color: BLUE }}>
                    {COMPANY.tel}
                  </p>
                  <span className="text-[12.5px] font-semibold" style={{ color: BODY }}>평일 09:00 ~ 18:00</span>
                </div>
                <div className="flex flex-col mt-3">
                  {SERVICES.map((sv) => (
                    <Link key={sv.href} href={sv.href}
                      className="group flex items-center gap-4 py-4 transition-colors duration-500"
                      style={{ borderBottom: "1px solid rgba(18,32,58,0.08)" }}>
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white transition-colors duration-500 group-hover:bg-[#E8762C] group-hover:text-white"
                        style={{ color: BLUE }}>
                        {sv.icon}
                      </span>
                      <span className="text-[15px] font-bold transition-colors duration-500 group-hover:text-[#E8762C]">
                        {sv.label}
                      </span>
                      <span className="ml-auto transition-transform duration-500 group-hover:translate-x-1.5" style={{ color: BLUE }}>
                        <NE />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* ══════════ CTA : 딥네이비 밴드 ══════════ */}
      <section style={{ background: DEEP, paddingBlock: "clamp(72px, 8vw, 112px)" }}>
        <div className="mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-10"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
          <Rise x={-90}>
            <p className="text-[15px] font-extrabold mb-3" style={{ color: GOLD }}>Contact Us</p>
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 3.8vw, 50px)", letterSpacing: "-0.04em", lineHeight: 1.22 }}>
              현장 조건만 알려주시면
              <br />
              사양과 견적을 제안합니다
            </h2>
          </Rise>
          <Rise x={90} delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/support/inquiry"
                className="flex items-center justify-center gap-2.5 h-[58px] px-10 rounded-full text-[15px] font-bold text-white transition-colors duration-500 hover:bg-[#E8762C]"
                style={{ background: BLUE }}>
                온라인 견적 문의 <NE />
              </Link>
              <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`}
                className="flex items-center justify-center h-[58px] px-10 rounded-full text-[15px] font-bold text-white transition-colors duration-500 hover:bg-white/10 hover:border-white/70"
                style={{ border: "1px solid rgba(255,255,255,0.4)" }}>
                {COMPANY.tel}
              </a>
            </div>
          </Rise>
        </div>
      </section>

      {/* ══════════ 푸터 ══════════ */}
      <footer style={{ background: "#0A1428", paddingBlock: "clamp(48px, 6vw, 72px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px, 3.5vw, 48px)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-9"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <Image src="/images/sejong-logo.png" alt={COMPANY.name} width={170} height={40}
              className="w-auto h-8" style={{ filter: "brightness(0) invert(1)", objectFit: "contain", opacity: 0.85 }} />
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="text-[13.5px] font-semibold transition-colors duration-500 hover:text-[#E8762C]"
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

      {/* 연세식 원형 플로팅 : 견적(블루) + TOP(딥네이비) */}
      <div className="fixed right-4 sm:right-5 bottom-32 sm:bottom-24 z-[60] flex flex-col gap-3">
        <Link href="/support/inquiry" aria-label="견적 문의"
          className="w-14 h-14 sm:w-[64px] sm:h-[64px] rounded-full flex flex-col items-center justify-center gap-0.5 text-white text-[11px] font-bold shadow-[0_10px_30px_rgba(14,27,54,0.35)] transition-colors duration-500 hover:bg-[#E8762C]"
          style={{ background: BLUE }}>
          <NE />
          견적
        </Link>
        <button type="button" aria-label="맨 위로"
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
          className="w-14 h-14 sm:w-[64px] sm:h-[64px] rounded-full flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-white shadow-[0_10px_30px_rgba(14,27,54,0.3)] transition-colors duration-500 hover:bg-[#E8762C]"
          style={{ background: DEEP }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="18 15 12 9 6 15" /></svg>
          TOP
        </button>
      </div>
    </div>
  );
}
