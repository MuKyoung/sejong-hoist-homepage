"use client";

/**
 * DEMO 5 · 시안 A "IMMERSIVE" : 현대일렉트릭 스타일 헤더 + 히어로
 * - 히어로 위 투명 헤더 → 스크롤/메뉴 오픈 시 화이트 전환, 호버 시 풀와이드 메가 메뉴
 * - 100svh 영상 슬라이드 히어로 : 클립 리빌 타이포, 오토플레이 프로그레스, 카운터 롤
 * - 이 컴포넌트는 헤더+히어로만 담당. 이하 섹션은 /demo/5 page.tsx에서 실제 홈 섹션을 연결
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CONCEPT_NAV as NAV } from "./conceptNav";

const E = [0.16, 1, 0.3, 1] as never;
const INK = "#1C2836";
const NAVY_DEEP = "#0D1726";

const SLIDES = [
  {
    video: "/videos/12716-241674181_medium.mp4",
    poster: "/images/hero-01.jpg",
    eyebrow: "GANTRY · OVERHEAD · HOIST",
    lines: ["산업의 무게를", "들어 올리는 기술"],
    sub: "350TON급 겐트리 크레인 시공 실적. 1999년부터 축적해 온 운반하역 설비 엔지니어링의 기준을 제시합니다.",
  },
  {
    video: "/videos/4768-179741152_medium.mp4",
    poster: "/images/hero-02.jpg",
    eyebrow: "ONE-STOP ENGINEERING",
    lines: ["설계에서 유지보수까지", "하나의 책임으로"],
    sub: "설계 · 제작 · 설치 · 검사 · 유지보수. 전 과정을 자체 엔지니어가 직접 수행합니다.",
  },
  {
    video: "/videos/48420-453832153_medium.mp4",
    poster: "/images/hero-03.jpg",
    eyebrow: "CERTIFIED SAFETY",
    lines: ["안전은 약속이 아니라", "증명입니다"],
    sub: "KCs 안전인증 5건과 서면심사도서 11권. 문서로 증명하는 안전관리 체계를 갖췄습니다.",
  },
];

const DUR = 7000;

export default function HdConcept() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);

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

  /* 활성 슬라이드 영상만 재생 */
  useEffect(() => {
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === idx && !reduced) v.play().catch(() => {});
      else v.pause();
    });
  }, [idx, reduced]);

  const go = (d: number) => setIdx((i) => (i + d + SLIDES.length) % SLIDES.length);

  return (
    <>
      {/* ══ 헤더 ══ */}
      <header
        className="fixed top-0 inset-x-0 z-50"
        onMouseLeave={() => setMega(false)}
        style={{
          background: solid ? "rgba(255,255,255,0.98)" : "transparent",
          borderBottom: solid ? "1px solid #EEF1F5" : "1px solid rgba(255,255,255,0.14)",
          transition: "background .3s ease, border-color .3s ease",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 h-[64px] lg:h-[76px] flex items-center justify-between gap-6">
          {/* 로고 */}
          <Link href="/demo/5" className="shrink-0" aria-label="세종호이스트크레인">
            <Image
              src="/images/sejong-logo.png" alt="세종호이스트크레인"
              width={180} height={44} priority
              className="w-auto h-8 lg:h-9 transition-[filter] duration-300"
              style={{ filter: solid ? "none" : "brightness(0) invert(1)", objectFit: "contain" }}
            />
          </Link>

          {/* GNB */}
          <nav className="hidden lg:flex items-stretch self-stretch" aria-label="주요 메뉴">
            {NAV.map((item) => (
              <div key={item.href} className="relative flex" onMouseEnter={() => setMega(true)}>
                <Link
                  href={item.href}
                  className="group relative flex items-center px-6 text-[15.5px] font-bold tracking-[-0.01em] transition-colors duration-200"
                  style={{ color: fg }}
                >
                  {item.label}
                  <span
                    className="absolute left-4 right-4 bottom-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: solid ? "#2C4A6E" : "#FFFFFF" }}
                  />
                </Link>
              </div>
            ))}
          </nav>

          {/* 우측 유틸 */}
          <div className="flex items-center gap-4 lg:gap-5">
            <div className="hidden md:flex items-center gap-2 text-[12px] font-semibold tracking-wide" style={{ color: fg }}>
              <Link href="/" className="opacity-100 hover:opacity-70 transition-opacity">KOR</Link>
              <span className="opacity-30">|</span>
              <Link href="/en" className="opacity-45 hover:opacity-90 transition-opacity">ENG</Link>
            </div>
            <span className="hidden xl:block w-px h-4" style={{ background: solid ? "#DDE3EA" : "rgba(255,255,255,0.25)" }} />
            <a href="tel:044-865-0801" className="hidden xl:block text-[13px] font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity" style={{ color: fg }}>
              044-865-0801
            </a>
            <Link
              href="/support/inquiry"
              className="hidden sm:flex items-center h-10 px-5 rounded-full text-[13px] font-bold transition-all duration-200"
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
              transition={{ duration: 0.38, ease: E }}
              className="hidden lg:block absolute left-0 right-0 top-full overflow-hidden bg-white"
              style={{ borderTop: "1px solid #EEF1F5", boxShadow: "0 28px 48px rgba(10,20,35,0.12)" }}
            >
              <div className="max-w-[1440px] mx-auto grid grid-cols-5 gap-10 px-10 py-10">
                {NAV.map((item, ci) => (
                  <div key={item.href}>
                    <Link href={item.href} className="group inline-block">
                      <p className="text-[15px] font-extrabold group-hover:text-[#2C4A6E] transition-colors" style={{ color: INK }}>
                        {item.label}
                      </p>
                      <p className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase mt-1" style={{ color: "rgba(28,40,54,0.35)" }}>
                        {item.en}
                      </p>
                    </Link>
                    <div className="flex flex-col gap-2 mt-4 pt-4" style={{ borderTop: "1px solid #EEF1F5" }}>
                      {item.children.map((c, i) => (
                        <motion.div key={c.href}
                          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 + ci * 0.02 + i * 0.03, duration: 0.35, ease: E }}
                        >
                          <Link href={c.href}
                            className="block text-[13.5px] py-0.5 text-[#5E6E80] hover:text-[#16273C] hover:translate-x-1 transition-all duration-200">
                            {c.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
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
            style={{ background: NAVY_DEEP, paddingTop: "64px" }}
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
        {/* 배경 영상 슬라이드 */}
        {SLIDES.map((s, i) => (
          <video
            key={s.video}
            ref={(el) => { vids.current[i] = el; }}
            src={s.video}
            poster={s.poster}
            muted loop playsInline
            preload={i === 0 ? "auto" : "metadata"}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: idx === i ? 1 : 0, transition: "opacity 1.1s ease" }}
          />
        ))}

        {/* 스크림 : 좌측 네이비 강조 + 상/하단 그라데이션 */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(10,17,28,0.78) 0%, rgba(10,17,28,0.45) 52%, rgba(10,17,28,0.22) 100%)" }} />
        <div className="absolute inset-x-0 top-0 h-36" style={{ background: "linear-gradient(180deg, rgba(6,12,22,0.55) 0%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-44" style={{ background: "linear-gradient(0deg, rgba(6,12,22,0.6) 0%, transparent 100%)" }} />

        {/* 카피 */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10">
            <div className="max-w-[820px] pt-10">
              <AnimatePresence mode="wait">
                <motion.div key={idx} exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}>
                  <motion.div
                    initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: E }}
                    className="flex items-center gap-3 mb-6 sm:mb-8"
                  >
                    <span className="h-px w-8 bg-white/60" />
                    <span className="text-[11px] font-bold tracking-[0.32em] uppercase text-white/70">
                      {SLIDES[idx].eyebrow}
                    </span>
                  </motion.div>

                  {SLIDES[idx].lines.map((line, li) => (
                    <div key={li} className="overflow-hidden">
                      <motion.h2
                        initial={{ y: "110%" }} animate={{ y: 0 }}
                        transition={{ delay: 0.18 + li * 0.1, duration: 0.9, ease: E }}
                        className="text-white font-extrabold leading-[1.08]"
                        style={{ fontSize: "clamp(34px, 5.6vw, 66px)", letterSpacing: "-0.04em", textShadow: "0 2px 24px rgba(0,0,0,0.25)" }}
                      >
                        {line}
                      </motion.h2>
                    </div>
                  ))}

                  <motion.p
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.52, duration: 0.7, ease: E }}
                    className="mt-6 text-[14px] sm:text-[16px] leading-[1.8] text-white/75 max-w-[560px]"
                  >
                    {SLIDES[idx].sub}
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7, ease: E }}
                className="flex flex-wrap gap-3 mt-9"
              >
                <Link href="/business"
                  className="h-[50px] px-8 rounded-full bg-white text-[#16273C] text-[14px] font-bold flex items-center gap-2 hover:bg-[#E8EDF3] transition-colors">
                  사업영역 보기 <span aria-hidden>→</span>
                </Link>
                <Link href="/support/inquiry"
                  className="h-[50px] px-8 rounded-full border border-white/45 text-white text-[14px] font-semibold flex items-center hover:bg-white/10 hover:border-white/70 transition-all">
                  견적 문의
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 슬라이드 컨트롤 */}
        <div className="absolute inset-x-0 bottom-9 sm:bottom-11">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 flex items-end justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5 flex-1 max-w-[460px]">
              {/* 카운터 롤 */}
              <div className="relative h-9 overflow-hidden" aria-hidden>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={idx}
                    initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.45, ease: E }}
                    className="block text-[28px] font-extrabold text-white leading-9 tabular-nums"
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
                  className="h-full bg-white/90 origin-left"
                />
              </div>
              <span className="text-[13px] text-white/50 tabular-nums" aria-hidden>/ {String(SLIDES.length).padStart(2, "0")}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button type="button" onClick={() => setPlaying((v) => !v)}
                aria-label={playing ? "슬라이드 일시정지" : "슬라이드 재생"}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 hover:border-white/60 transition-all">
                {playing ? (
                  <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor" aria-hidden><rect x="1" width="3" height="12" rx="1" /><rect x="7" width="3" height="12" rx="1" /></svg>
                ) : (
                  <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor" aria-hidden><path d="M0.8 0.9c0-.7.8-1.1 1.4-.8l8.3 5.1c.6.4.6 1.2 0 1.6L2.2 11.9c-.6.4-1.4 0-1.4-.8V0.9z" /></svg>
                )}
              </button>
              <button type="button" onClick={() => go(-1)} aria-label="이전 슬라이드"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 hover:border-white/60 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button type="button" onClick={() => go(1)} aria-label="다음 슬라이드"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 hover:border-white/60 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* 스크롤 큐 */}
        <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 bottom-4 flex-col items-center gap-2" aria-hidden>
          <span className="text-[10px] font-semibold tracking-[0.35em] text-white/45">SCROLL</span>
          <span className="relative block w-px h-9 bg-white/20 overflow-hidden">
            <motion.span
              className="absolute left-0 top-0 w-px h-3 bg-white"
              animate={reduced ? undefined : { y: [0, 26, 26], opacity: [1, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </section>
    </>
  );
}
