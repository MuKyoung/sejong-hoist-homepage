"use client";

/**
 * DEMO 6 · 시안 B "PORTAL" : 연세대학교 스타일 헤더 + 히어로
 * - 네이비 유틸 바 + 화이트 메인 바 2단 헤더, 호버 시 라운드 풀 메뉴 패널
 * - 컨테이너 라운드 배너 슬라이더(가로 전환) + 아이콘 퀵링크 카드 6종
 * - 이 컴포넌트는 헤더+히어로만 담당. 이하 섹션은 /demo/6 page.tsx에서 실제 홈 섹션을 연결
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CONCEPT_NAV as NAV } from "./conceptNav";

const E = [0.16, 1, 0.3, 1] as never;
const NAVY = "#2C4A6E";
const NAVY_DEEP = "#16273C";
const INK = "#22303F";

const SLIDES = [
  {
    img: "/images/hero-01.jpg",
    chip: "SINCE 1999",
    title: "신뢰를 들어 올리는\n운반하역 설비 파트너",
    sub: "설계부터 유지보수까지, 27년 한 길을 걸어온 크레인 · 호이스트 전문기업입니다.",
    href: "/about",
    cta: "회사소개 보기",
  },
  {
    img: "/images/hero-02.jpg",
    chip: "350TON CLASS",
    title: "국내 최대급\n350TON 겐트리 크레인",
    sub: "대형 시공 실적으로 검증된 설계 · 제작 기술력을 확인하세요.",
    href: "/portfolio",
    cta: "시공사례 보기",
  },
  {
    img: "/images/hero-03.jpg",
    chip: "KCs CERTIFIED",
    title: "문서로 증명하는\n안전관리 체계",
    sub: "KCs 안전인증과 서면심사도서, 보유 자격 인력까지 안전을 체계로 관리합니다.",
    href: "/technology",
    cta: "기술 · 인증 보기",
  },
  {
    img: "/images/hero-04.jpg",
    chip: "ONE-STOP",
    title: "견적부터 설치까지\n원스톱 서비스",
    sub: "현장 조건만 알려주시면 최적 사양과 견적을 빠르게 제안해 드립니다.",
    href: "/support/inquiry",
    cta: "견적 문의하기",
  },
];

const ICON_PROPS = {
  width: 22, height: 22, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round",
} as const;

const QUICK = [
  {
    label: "회사소개", href: "/about",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
        <path d="M15 9h3a1 1 0 0 1 1 1v11" />
        <path d="M2.5 21h19" /><path d="M8.5 8h3M8.5 12h3M8.5 16h3" />
      </svg>
    ),
  },
  {
    label: "사업영역", href: "/business",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
        <path d="M8.5 7.5V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
        <path d="M3 12.5h18" />
      </svg>
    ),
  },
  {
    label: "시공사례", href: "/portfolio",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <rect x="3" y="4.5" width="18" height="15" rx="2" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="M3.5 17.5l5-4 3.5 2.8 4.5-4.3 4 3.5" />
      </svg>
    ),
  },
  {
    label: "기술 · 인증", href: "/technology",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M12 3l7 2.8v5.4c0 4.4-2.9 7.7-7 9.8-4.1-2.1-7-5.4-7-9.8V5.8L12 3z" />
        <path d="M8.8 11.6l2.3 2.3 4.1-4.4" />
      </svg>
    ),
  },
  {
    label: "견적 문의", href: "/support/inquiry",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M21 11.5c0 4.1-4 7.5-9 7.5-1 0-2-.13-2.9-.38L4 20l1.3-3.1C3.9 15.5 3 13.6 3 11.5 3 7.4 7 4 12 4s9 3.4 9 7.5z" />
        <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
      </svg>
    ),
  },
  {
    label: "오시는 길", href: "/about/location",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M12 21.5s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10.3" r="2.4" />
      </svg>
    ),
  },
];

const DUR = 5500;

export default function YsConcept() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [panel, setPanel] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [{ idx, dir }, setSlide] = useState({ idx: 0, dir: 1 });
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 오토플레이 (수동 이동 시 idx 변경으로 타이머 리셋) */
  useEffect(() => {
    if (!playing || reduced) return;
    const t = setInterval(
      () => setSlide((s) => ({ idx: (s.idx + 1) % SLIDES.length, dir: 1 })),
      DUR
    );
    return () => clearInterval(t);
  }, [playing, reduced, idx]);

  const go = (d: number) =>
    setSlide((s) => ({ idx: (s.idx + d + SLIDES.length) % SLIDES.length, dir: d }));

  return (
    <>
      {/* ══ 2단 헤더 ══ */}
      <header
        className="fixed top-0 inset-x-0 z-50 bg-white"
        onMouseLeave={() => { setPanel(false); setHovered(null); }}
        style={{
          boxShadow: scrolled || panel ? "0 10px 30px rgba(23,42,69,0.10)" : "none",
          transition: "box-shadow .3s ease",
        }}
      >
        {/* 유틸 바 (데스크톱) */}
        <div className="hidden lg:block" style={{ background: NAVY_DEEP }}>
          <div className="max-w-[1280px] mx-auto px-8 h-9 flex items-center justify-between text-[12px] text-white/65">
            <div className="flex items-center gap-5">
              <Link href="/support/notice" className="hover:text-white transition-colors">공지사항</Link>
              <Link href="/about/location" className="hover:text-white transition-colors">오시는 길</Link>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:044-865-0801" className="tracking-wide hover:text-white transition-colors">
                044-865-0801
              </a>
              <span className="w-px h-3 bg-white/20" />
              <div className="flex items-center gap-2.5">
                <Link href="/" className="text-white font-bold">KOR</Link>
                <Link href="/en" className="hover:text-white transition-colors">ENG</Link>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 바 */}
        <div style={{ borderBottom: "1px solid #E8EDF3" }}>
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 lg:h-[72px] flex items-center justify-between gap-6">
            <Link href="/demo/6" className="shrink-0" aria-label="세종호이스트크레인">
              <Image
                src="/images/sejong-logo.png" alt="세종호이스트크레인"
                width={180} height={44} priority
                className="w-auto h-8 lg:h-9" style={{ objectFit: "contain" }}
              />
            </Link>

            <nav className="hidden lg:flex items-stretch self-stretch" aria-label="주요 메뉴">
              {NAV.map((item) => (
                <div
                  key={item.href} className="relative flex"
                  onMouseEnter={() => { setPanel(true); setHovered(item.href); }}
                >
                  <Link
                    href={item.href}
                    className="relative flex items-center px-[22px] text-[16.5px] font-bold transition-colors duration-200"
                    style={{ color: hovered === item.href ? NAVY : INK }}
                  >
                    {item.label}
                    {hovered === item.href && (
                      <motion.span
                        layoutId="ysUnderline"
                        className="absolute left-4 right-4 bottom-0 h-[3px] rounded-full"
                        style={{ background: NAVY }}
                        transition={{ duration: 0.3, ease: E }}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/support/inquiry"
                className="hidden sm:flex items-center h-11 px-[22px] rounded-full text-white text-[13.5px] font-bold bg-[#2C4A6E] hover:bg-[#213956] transition-colors"
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
                <motion.span className="block h-[2px] w-5 rounded-full" style={{ background: INK, originX: "right" }}
                  animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? 7 : 0 }} transition={{ duration: 0.2 }} />
                <motion.span className="block h-[2px] w-5 rounded-full" style={{ background: INK }}
                  animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }} transition={{ duration: 0.15 }} />
                <motion.span className="block h-[2px] rounded-full" style={{ background: INK, originX: "right" }}
                  animate={{ width: mobileOpen ? 20 : 14, rotate: mobileOpen ? 45 : 0, y: mobileOpen ? -7 : 0 }} transition={{ duration: 0.2 }} />
              </button>
            </div>
          </div>
        </div>

        {/* ── 라운드 풀 메뉴 패널 ── */}
        <AnimatePresence>
          {panel && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: E }}
              className="hidden lg:block absolute left-0 right-0 top-full overflow-hidden bg-white rounded-b-[24px]"
              style={{ boxShadow: "0 32px 56px rgba(23,42,69,0.14)" }}
            >
              <div className="max-w-[1280px] mx-auto grid grid-cols-5 gap-8 px-8 pt-8 pb-10">
                {NAV.map((item, ci) => (
                  <div key={item.href}>
                    <Link href={item.href} className="group inline-block">
                      <p className="text-[15px] font-extrabold group-hover:text-[#2C4A6E] transition-colors" style={{ color: INK }}>
                        {item.label}
                      </p>
                    </Link>
                    <span className="block w-6 h-[3px] rounded-full mt-2 mb-4" style={{ background: NAVY }} />
                    <div className="flex flex-col gap-1">
                      {item.children.map((c, i) => (
                        <motion.div key={c.href}
                          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.06 + ci * 0.02 + i * 0.03, duration: 0.35, ease: E }}
                        >
                          <Link
                            href={c.href}
                            className="block text-[13.5px] py-1.5 px-2.5 -mx-2.5 rounded-lg text-[#5A6B7E] hover:text-[#16273C] hover:bg-[#F2F5F9] transition-colors"
                          >
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

      {/* ── 모바일 메뉴 ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: 44 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 44 }}
            transition={{ duration: 0.3, ease: E }}
            className="fixed inset-0 z-40 lg:hidden overflow-y-auto bg-white"
            style={{ paddingTop: "64px" }}
          >
            <nav className="px-6 py-7 flex flex-col" aria-label="모바일 메뉴">
              {NAV.map((item, i) => (
                <motion.div key={item.href}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.05, ease: E }}
                  className="py-4" style={{ borderBottom: "1px solid #EEF2F6" }}
                >
                  <Link href={item.href} onClick={() => setMobileOpen(false)}
                    className="block text-[20px] font-extrabold tracking-tight" style={{ color: NAVY_DEEP }}>
                    {item.label}
                  </Link>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} onClick={() => setMobileOpen(false)}
                        className="text-[12.5px] px-3 py-1.5 rounded-full bg-[#F2F5F9] text-[#44556A] hover:bg-[#E4EAF2] transition-colors">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="pt-6 flex gap-3">
                <Link href="/support/inquiry" onClick={() => setMobileOpen(false)}
                  className="flex-1 h-12 rounded-full bg-[#2C4A6E] text-white text-[14px] font-bold flex items-center justify-center">
                  견적 문의
                </Link>
                <a href="tel:044-865-0801"
                  className="flex-1 h-12 rounded-full border border-[#C9D4E0] text-[14px] font-semibold flex items-center justify-center"
                  style={{ color: NAVY_DEEP }}>
                  044-865-0801
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ 히어로 ══ */}
      <section
        className="pt-[88px] lg:pt-[140px]"
        style={{ background: "linear-gradient(180deg, #F7F9FC 0%, #FFFFFF 100%)" }}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          {/* 라운드 배너 슬라이더 */}
          <div
            className="relative overflow-hidden rounded-2xl sm:rounded-[24px]"
            style={{ height: "clamp(380px, 44vw, 520px)", background: NAVY_DEEP }}
            aria-roledescription="carousel"
            aria-label="메인 배너"
          >
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={idx}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: d * 36, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d * -36, opacity: 0 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.65, ease: E }}
                className="absolute inset-0"
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: reduced ? 1 : 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 7, ease: "linear" }}
                >
                  <Image
                    src={SLIDES[idx].img}
                    alt={SLIDES[idx].title.replace("\n", " ")}
                    fill priority={idx === 0}
                    sizes="(max-width: 1280px) 100vw, 1216px"
                    className="object-cover"
                  />
                </motion.div>
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(76deg, rgba(12,20,32,0.68) 0%, rgba(12,20,32,0.32) 55%, rgba(12,20,32,0.08) 100%)" }}
                />

                {/* 카피 */}
                <div className="absolute left-0 bottom-0 p-6 sm:p-10 lg:p-12 max-w-[620px]">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5, ease: E }}
                    className="inline-flex items-center h-7 px-3 rounded-full text-[11px] font-bold tracking-[0.18em] text-white"
                    style={{ background: "rgba(255,255,255,0.16)", backdropFilter: "blur(6px)" }}
                  >
                    {SLIDES[idx].chip}
                  </motion.span>
                  <motion.h2
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24, duration: 0.6, ease: E }}
                    className="mt-4 text-white font-extrabold whitespace-pre-line leading-[1.22]"
                    style={{ fontSize: "clamp(24px, 3.4vw, 40px)", letterSpacing: "-0.03em", textShadow: "0 2px 18px rgba(0,0,0,0.25)" }}
                  >
                    {SLIDES[idx].title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34, duration: 0.6, ease: E }}
                    className="mt-3 hidden sm:block text-[14.5px] leading-[1.75] text-white/80"
                  >
                    {SLIDES[idx].sub}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.44, duration: 0.6, ease: E }}
                  >
                    <Link
                      href={SLIDES[idx].href}
                      className="inline-flex items-center gap-2 mt-6 h-11 px-5 rounded-full bg-white/95 text-[#16273C] text-[13.5px] font-bold hover:bg-white transition-colors"
                    >
                      {SLIDES[idx].cta} <span aria-hidden>→</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 컨트롤 클러스터 */}
            <div
              className="absolute right-4 top-4 sm:top-auto sm:right-5 sm:bottom-5 flex items-center h-10 sm:h-11 px-1.5 rounded-full"
              style={{ background: "rgba(10,18,30,0.42)", backdropFilter: "blur(8px)" }}
            >
              <button type="button" onClick={() => go(-1)} aria-label="이전 배너"
                className="w-8 h-8 rounded-full text-white/85 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <span className="w-12 text-center text-[12.5px] text-white/90 tabular-nums" aria-live="polite">
                {idx + 1} / {SLIDES.length}
              </span>
              <button type="button" onClick={() => go(1)} aria-label="다음 배너"
                className="w-8 h-8 rounded-full text-white/85 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="9 18 15 12 9 6" /></svg>
              </button>
              <span className="w-px h-4 bg-white/20 mx-1" />
              <button type="button" onClick={() => setPlaying((v) => !v)}
                aria-label={playing ? "배너 일시정지" : "배너 재생"}
                className="w-8 h-8 rounded-full text-white/85 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors">
                {playing ? (
                  <svg width="10" height="11" viewBox="0 0 11 12" fill="currentColor" aria-hidden><rect x="1" width="3" height="12" rx="1" /><rect x="7" width="3" height="12" rx="1" /></svg>
                ) : (
                  <svg width="10" height="11" viewBox="0 0 11 12" fill="currentColor" aria-hidden><path d="M0.8 0.9c0-.7.8-1.1 1.4-.8l8.3 5.1c.6.4.6 1.2 0 1.6L2.2 11.9c-.6.4-1.4 0-1.4-.8V0.9z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* 아이콘 퀵링크 */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-5 sm:mt-6">
            {QUICK.map((q, i) => (
              <motion.div key={q.href}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: E }}
              >
                <Link
                  href={q.href}
                  className="group flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-white py-5 sm:py-6 border border-[#E7ECF2] hover:border-[#B9C7D8] shadow-[0_8px_24px_rgba(23,42,69,0.06)] hover:shadow-[0_16px_36px_rgba(23,42,69,0.12)] transition-all duration-300 hover:-translate-y-1"
                >
                  <span
                    className="w-11 h-11 rounded-full flex items-center justify-center bg-[#EEF3F9] group-hover:bg-[#2C4A6E] group-hover:text-white transition-colors duration-300"
                    style={{ color: NAVY }}
                  >
                    {q.icon}
                  </span>
                  <span className="text-[13px] sm:text-[13.5px] font-semibold" style={{ color: INK }}>
                    {q.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="h-10 sm:h-16" />
      </section>
    </>
  );
}
