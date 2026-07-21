"use client";

/**
 * DEMO 5 · 시안 A "IMMERSIVE" : 현대일렉트릭 스타일 헤더 + 히어로
 * - 히어로 위 투명 헤더 → 스크롤/메뉴 오픈 시 화이트 전환, 호버 시 풀와이드 메가 메뉴(+프로모 카드)
 * - 100svh 실사 Ken Burns 슬라이드 : 클립 리빌 타이포, 오토플레이 프로그레스, 카운터 롤
 * - 이 컴포넌트는 헤더+히어로만 담당. 이하 섹션은 /demo/5 page.tsx에서 실제 홈 섹션을 연결
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CONCEPT_NAV as NAV } from "./conceptNav";

const E = [0.16, 1, 0.3, 1] as never;
const INK = "#1C2836";
const NAVY_DEEP = "#0D1726";

const SLIDES = [
  {
    img: "/images/hero-01.jpg",
    lines: ["산업 현장의 무게를", "들어 올립니다"],
    sub: "1999년 설립 운반하역 설비 전문기업, 세종호이스트크레인입니다.",
  },
  {
    img: "/images/hero-02.jpg",
    lines: ["설계부터 유지보수까지", "원스톱으로 수행합니다"],
    sub: "설계 · 제작 · 설치 · 검사 · 유지보수, 전 과정을 자체 인력으로 진행합니다.",
  },
  {
    img: "/images/hero-03.jpg",
    lines: ["KCs 안전인증으로", "검증된 안전관리"],
    sub: "KCs 안전인증 5건과 서면심사도서 11권을 보유하고 있습니다.",
  },
];

const DUR = 7500;

export default function HdConcept() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  const solid = scrolled || mega || mobileOpen;
  const fg = solid ? INK : "#FFFFFF";

  /* 헤더 투명 → 화이트 전환 */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 슬라이드 오토플레이 (수동 이동 시 idx 변경으로 타이머 리셋) */
  useEffect(() => {
    if (!playing || reduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), DUR);
    return () => clearInterval(t);
  }, [playing, reduced, idx]);

  const go = (d: number) => setIdx((i) => (i + d + SLIDES.length) % SLIDES.length);

  return (
    <>
      {/* ══ 헤더 ══ */}
      <header
        className="fixed top-0 inset-x-0 z-50"
        onMouseLeave={() => setMega(false)}
        style={{
          background: solid ? "rgba(255,255,255,0.98)" : "transparent",
          borderBottom: solid ? "1px solid #EEF1F5" : "1px solid rgba(255,255,255,0.16)",
          boxShadow: scrolled && !mega ? "0 6px 24px rgba(10,20,35,0.07)" : "none",
          transition: "background .55s ease, border-color .55s ease, box-shadow .55s ease",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 xl:px-10 h-[60px] lg:h-[68px] flex items-stretch justify-between gap-4">
          {/* 로고 — 가독성 위해 바 높이 대비 크게 (26.07 헤더 가독성 피드백) */}
          <Link href="/demo/5" className="shrink-0 flex items-center" aria-label="세종호이스트크레인">
            <Image
              src="/images/sejong-logo.png" alt="세종호이스트크레인"
              width={220} height={54} priority
              className="w-auto h-9 lg:h-10 transition-[filter] duration-300"
              style={{ filter: solid ? "none" : "brightness(0) invert(1)", objectFit: "contain" }}
            />
          </Link>

          {/* GNB */}
          <nav className="hidden lg:flex items-stretch self-stretch" aria-label="주요 메뉴">
            {NAV.map((item) => (
              <div key={item.href} className="relative flex" onMouseEnter={() => setMega(true)}>
                <Link
                  href={item.href}
                  className="group relative flex items-center px-4 xl:px-6 text-[16px] font-bold tracking-[-0.01em] whitespace-nowrap transition-colors duration-500"
                  style={{ color: fg, textShadow: solid ? "none" : "0 1px 14px rgba(0,0,0,0.5)" }}
                >
                  {item.label}
                  <span
                    className="absolute left-3 right-3 xl:left-4 xl:right-4 bottom-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
                    style={{ background: "#E8762C" }}
                  />
                </Link>
              </div>
            ))}
          </nav>

          {/* 우측 유틸 */}
          <div className="flex items-center gap-3 xl:gap-5 shrink-0" style={{ textShadow: solid ? "none" : "0 1px 12px rgba(0,0,0,0.45)" }}>
            <div className="hidden md:flex items-center gap-2 text-[12px] font-semibold tracking-wide" style={{ color: fg }}>
              <Link href="/" className="opacity-100 hover:opacity-70 transition-opacity">KOR</Link>
              <span className="opacity-30">|</span>
              <Link href="/en" className="opacity-45 hover:opacity-90 transition-opacity">ENG</Link>
            </div>
            <span className="hidden xl:block w-px h-4" style={{ background: solid ? "#DDE3EA" : "rgba(255,255,255,0.25)" }} />
            <a href="tel:044-865-0801" className="hidden xl:flex items-center gap-1.5 text-[13px] font-medium tracking-wide whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity" style={{ color: fg }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              044-865-0801
            </a>
            <Link
              href="/support/inquiry"
              className="hidden sm:flex items-center h-10 px-5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all duration-500 hover:!border-[#E8762C] hover:!text-[#E8762C]"
              style={{
                border: `1.5px solid ${solid ? "#2C4A6E" : "rgba(255,255,255,0.55)"}`,
                color: solid ? "#2C4A6E" : "#fff",
              }}
            >
              견적 문의
            </Link>

            {/* 모바일 햄버거 */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden relative w-9 h-9 flex flex-col justify-center items-end gap-[5px]"
              aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={mobileOpen}
            >
              <motion.span className="block h-[2px] w-5 rounded-full" style={{ background: fg, originX: "right" }}
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? 7 : 0 }} transition={{ duration: 0.2 }} />
              <motion.span className="block h-[2px] w-5 rounded-full" style={{ background: fg }}
                animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }} transition={{ duration: 0.15 }} />
              <motion.span className="block h-[2px] rounded-full" style={{ background: fg, originX: "right" }}
                animate={{ width: mobileOpen ? 20 : 14, rotate: mobileOpen ? 45 : 0, y: mobileOpen ? -7 : 0 }} transition={{ duration: 0.2 }} />
            </button>
          </div>
        </div>

        {/* ── 풀와이드 메가 메뉴 ── */}
        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: E }}
              className="hidden lg:block absolute left-0 right-0 top-full overflow-hidden bg-white"
              style={{ borderTop: "1px solid #EEF1F5", boxShadow: "0 28px 48px rgba(10,20,35,0.12)" }}
            >
              <div className="max-w-[1440px] mx-auto grid grid-cols-6 gap-8 px-8 xl:px-10 py-10">
                {NAV.map((item, ci) => (
                  <div key={item.href}>
                    <Link href={item.href} className="group inline-block">
                      <p className="text-[15px] font-extrabold group-hover:text-[#E8762C] transition-colors" style={{ color: INK }}>
                        {item.label}
                      </p>
                    </Link>
                    <div className="flex flex-col gap-2 mt-4 pt-4" style={{ borderTop: "1px solid #EEF1F5" }}>
                      {item.children.map((c, i) => (
                        <motion.div key={c.href}
                          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 + ci * 0.02 + i * 0.03, duration: 0.35, ease: E }}
                        >
                          <Link href={c.href}
                            className="block text-[13.5px] py-0.5 text-[#5E6E80] hover:text-[#E8762C] hover:translate-x-1 transition-all duration-500">
                            {c.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* 프로모 카드 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.4, ease: E }}
                >
                  <Link href="/portfolio" className="group block relative overflow-hidden rounded-[26px] rounded-bl-none h-full min-h-[190px]">
                    <Image
                      src="/images/pf-gantry350.jpg" alt="350TON 겐트리 크레인 시공"
                      fill sizes="240px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(13,23,38,0.82) 0%, rgba(13,23,38,0.15) 60%)" }} />
                    <div className="absolute left-4 right-4 bottom-4">
                      <p className="text-[14px] font-bold text-white leading-snug">350TON 겐트리<br />시공 실적 보기</p>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── 모바일 풀스크린 메뉴 ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden overflow-y-auto"
            style={{ background: NAVY_DEEP, paddingTop: "60px" }}
          >
            <nav className="px-7 py-8 flex flex-col" aria-label="모바일 메뉴">
              {NAV.map((item, i) => (
                <motion.div key={item.href}
                  initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, ease: E }}
                  className="py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Link href={item.href} onClick={() => setMobileOpen(false)}
                    className="block text-[22px] font-extrabold text-white tracking-tight">
                    {item.label}
                  </Link>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2.5">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} onClick={() => setMobileOpen(false)}
                        className="text-[13px] text-white/50 hover:text-white transition-colors">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-7 flex gap-3">
                <Link href="/support/inquiry" onClick={() => setMobileOpen(false)}
                  className="flex-1 h-12 rounded-full bg-white text-[#16273C] text-[14px] font-bold flex items-center justify-center">
                  견적 문의
                </Link>
                <a href="tel:044-865-0801"
                  className="flex-1 h-12 rounded-full border border-white/30 text-white text-[14px] font-semibold flex items-center justify-center">
                  044-865-0801
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ 히어로 ══ */}
      <section
        className="relative h-[100svh] min-h-[600px] overflow-hidden"
        style={{ background: "#0A1220" }}
        aria-roledescription="carousel"
        aria-label="메인 비주얼"
      >
        {/* 배경 슬라이드 : 실사 Ken Burns */}
        {SLIDES.map((s, i) => (
          <motion.div
            key={s.img}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: idx === i ? 1 : 0,
              scale: reduced ? 1 : idx === i ? 1.07 : 1,
            }}
            transition={{
              opacity: { duration: 1.7, ease: "easeInOut" },
              scale: { duration: DUR / 1000 + 2, ease: "linear" },
            }}
          >
            <Image
              src={s.img} alt=""
              fill priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        ))}

        {/* 스크림 : 좌측 네이비 강조 + 상/하단 그라데이션 */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(10,17,28,0.82) 0%, rgba(10,17,28,0.5) 52%, rgba(10,17,28,0.24) 100%)" }} />
        <div className="absolute inset-x-0 top-0 h-44" style={{ background: "linear-gradient(180deg, rgba(6,12,22,0.74) 0%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: "linear-gradient(0deg, rgba(6,12,22,0.68) 0%, transparent 100%)" }} />

        {/* 회전 장식 링 — 느린 스핀 + 상하 플로트 (복합 모션, 장식) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{ right: "7%", top: "13%", width: 360, height: 360 }}
          animate={reduced ? undefined : { y: [0, -26, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-full h-full rounded-full"
            style={{ border: "1px dashed rgba(255,255,255,0.22)" }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 85, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-7 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
          <div className="absolute rounded-full" style={{ top: -4, left: "50%", width: 9, height: 9, background: "#C69B54" }} />
        </motion.div>

        {/* 카피 */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 xl:px-10">
            <div className="max-w-[820px] pt-8 pb-24 sm:pb-16">
              <AnimatePresence mode="wait">
                <motion.div key={idx} exit={{ opacity: 0, y: -14, transition: { duration: 0.5, ease: E } }}>
                  {/* 헤드라인 — 홀수 줄은 좌, 짝수 줄은 우에서 슬라이드 인 (이목 집중) */}
                  {SLIDES[idx].lines.map((line, li) => (
                    <motion.h2
                      key={li}
                      initial={{ opacity: 0, x: li % 2 === 0 ? -120 : 120 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + li * 0.12, duration: 1.05, ease: E }}
                      className="text-white font-extrabold leading-[1.08]"
                      style={{ fontSize: "clamp(32px, 5.4vw, 64px)", letterSpacing: "-0.04em", textShadow: "0 2px 28px rgba(0,0,0,0.35)" }}
                    >
                      {line}
                    </motion.h2>
                  ))}

                  <motion.p
                    initial={{ opacity: 0, x: -70 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.9, ease: E }}
                    className="mt-5 sm:mt-6 text-[14px] sm:text-[16px] leading-[1.8] text-white/75 max-w-[560px]"
                  >
                    {SLIDES[idx].sub}
                  </motion.p>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* 슬라이드 컨트롤 : 플로팅 요소(FAB · 시안 스위처)와 겹치지 않게 위로 띄움 */}
        <div className="absolute inset-x-0 bottom-24 lg:bottom-20">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 xl:px-10 flex items-end justify-between gap-5">
            <motion.div
              initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85, duration: 1, ease: E }}
              className="flex items-center gap-4 sm:gap-5 flex-1 max-w-[420px]">
              {/* 카운터 롤 */}
              <div className="relative h-8 sm:h-9 overflow-hidden" aria-hidden>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={idx}
                    initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.75, ease: E }}
                    className="block text-[24px] sm:text-[28px] font-extrabold text-[#C69B54] leading-8 sm:leading-9 tabular-nums"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* 프로그레스 */}
              <div className="flex-1 h-[2px] bg-white/20 overflow-hidden rounded-full">
                <motion.div
                  key={`${idx}-${playing ? "p" : "s"}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: playing && !reduced ? 1 : 0 }}
                  transition={{ duration: playing ? DUR / 1000 : 0.3, ease: "linear" }}
                  className="h-full bg-[#C69B54] origin-left"
                />
              </div>
              <span className="text-[13px] text-white/50 tabular-nums" aria-hidden>/ {String(SLIDES.length).padStart(2, "0")}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85, duration: 1, ease: E }}
              className="flex items-center gap-2 sm:gap-2.5">
              <button type="button" onClick={() => setPlaying((v) => !v)}
                aria-label={playing ? "슬라이드 일시정지" : "슬라이드 재생"}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 hover:border-[#E8762C] hover:text-[#E8762C] hover:rotate-180 transition-all duration-700">
                {playing ? (
                  <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor" aria-hidden><rect x="1" width="3" height="12" rx="1" /><rect x="7" width="3" height="12" rx="1" /></svg>
                ) : (
                  <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor" aria-hidden><path d="M0.8 0.9c0-.7.8-1.1 1.4-.8l8.3 5.1c.6.4.6 1.2 0 1.6L2.2 11.9c-.6.4-1.4 0-1.4-.8V0.9z" /></svg>
                )}
              </button>
              <button type="button" onClick={() => go(-1)} aria-label="이전 슬라이드"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 hover:border-[#E8762C] hover:text-[#E8762C] transition-all duration-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button type="button" onClick={() => go(1)} aria-label="다음 슬라이드"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 hover:border-[#E8762C] hover:text-[#E8762C] transition-all duration-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </motion.div>
          </div>
        </div>

      </section>
    </>
  );
}
