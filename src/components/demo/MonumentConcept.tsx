"use client";

/**
 * DEMO 7 · 시안 C "MONUMENT" : 웅장한 헤비인더스트리 컨셉 (자체 완결형 풀페이지)
 * - 팔레트: 스틸 차콜 + 브라스 골드. 대형 타이포와 넉넉한 여백으로 스케일을 전달
 * - 모션 원칙: 느리고 무겁게 (리빌 1.3s / 슬라이드 9s / 켄번스 16s / 카운터 2.8s)
 * - 여백 원칙: 빈 구간을 남기지 않도록 히어로 하단 스펙바 · 그리드 정수 배치로 마감
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS_AREAS, COMPANY, PORTFOLIO } from "@/data/site";
import { CONCEPT_NAV as NAV } from "./conceptNav";

const E = [0.16, 1, 0.3, 1] as never;

const INK = "#0C0F13";
const PANEL = "#12161C";
const BONE = "#EFECE6";
const BRASS = "#C69B54";
const LINE = "rgba(255,255,255,0.10)";
const TEXT = "#F3F1ED";
const MUTED = "rgba(243,241,237,0.56)";

const SLIDE_MS = 9000;

const SLIDES = [
  {
    img: "/images/hero-01.jpg",
    kicker: "겐트리 크레인 350TON",
    lines: ["산업의 무게를", "들어 올립니다"],
    sub: "1999년부터 운반하역 설비 한 길. 설계부터 제작 · 설치 · 유지보수까지 직접 수행합니다.",
  },
  {
    img: "/images/hero-02.jpg",
    kicker: "LS ELECTRIC 부산사업장",
    lines: ["대형 현장의", "기준이 됩니다"],
    sub: "크레인 13대 전수 안전인증 합격. 적합률 100%, 부적합 0건의 기록을 남겼습니다.",
  },
  {
    img: "/images/hero-03.jpg",
    kicker: "KCs 안전인증 · 서면심사도서",
    lines: ["안전을 문서로", "증명합니다"],
    sub: "안전인증 5건과 구조 서면심사도서 11권. 검증 가능한 근거로 신뢰를 쌓습니다.",
  },
];

const HERO_SPECS = [
  { v: "350", unit: "TON", label: "최대 시공 하중" },
  { v: "520", unit: "건+", label: "누적 시공 실적" },
  { v: "25", unit: "년+", label: "운반하역 외길" },
  { v: "100", unit: "%", label: "안전인증 적합률" },
];

const STATS = [
  { value: 25, suffix: "년+", label: "업력", desc: "1999년 설립 이후 운반하역 설비 한 길을 걸었습니다." },
  { value: 520, suffix: "건+", label: "누적 시공", desc: "전국 산업 현장에 납품 · 설치한 크레인과 호이스트입니다." },
  { value: 350, suffix: "TON", label: "최대 하중", desc: "겐트리 크랩 크레인 시공으로 검증된 대형 설비 역량입니다." },
];

const PROOFS = [
  { k: "KCs 안전인증", v: "5건", d: "한국승강기안전공단 개별 제품심사 적합" },
  { k: "구조 서면심사도서", v: "11권", d: "구조 계산과 도면으로 구성된 심사 자료" },
  { k: "ISO 경영시스템", v: "3종", d: "품질 · 환경 · 안전보건 인증 보유" },
  { k: "전수 인증 합격", v: "13대", d: "부산사업장 크레인 전수 심사 부적합 0건" },
];

const PROCESS = [
  { step: "01", title: "현장 조사 · 설계", desc: "현장 조건과 하중을 실측하고 구조 해석을 거쳐 사양을 확정합니다." },
  { step: "02", title: "제작", desc: "자체 공정으로 거더와 주요 구조물을 제작하고 품질을 검사합니다." },
  { step: "03", title: "설치 · 시운전", desc: "반입부터 설치, 하중 시험과 시운전까지 자사 인력이 직접 수행합니다." },
  { step: "04", title: "인증 · 유지보수", desc: "안전인증 취득을 지원하고 정기 점검과 보수로 설비 수명을 관리합니다." },
];

/* ── 느린 등장 래퍼 ── */
function Rise({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.3, delay, ease: E }}
    >
      {children}
    </motion.div>
  );
}

/* ── 느리게 올라가는 카운터 ── */
function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18%" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    let start = 0;
    const dur = 2800;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      // easeOutExpo — 초반에 무겁게 치고 나가 천천히 안착
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduced]);

  return (
    <p
      ref={ref}
      className="font-extrabold leading-none tabular-nums"
      style={{ fontSize: "clamp(48px, 6.4vw, 92px)", letterSpacing: "-0.045em", color: TEXT, whiteSpace: "nowrap" }}
    >
      {reduced ? target : n}
      <span style={{ fontSize: "0.34em", color: BRASS, marginLeft: 8, letterSpacing: "0" }}>{suffix}</span>
    </p>
  );
}

export default function MonumentConcept() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  const solid = scrolled || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!playing || reduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [playing, reduced, idx]);

  const featured = PORTFOLIO[0];
  const rest = PORTFOLIO.slice(1, 4);

  return (
    <div style={{ background: INK, color: TEXT }}>
      {/* ══════════ 헤더 ══════════ */}
      <header
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: solid ? "rgba(12,15,19,0.94)" : "transparent",
          backdropFilter: solid ? "blur(14px)" : "none",
          borderBottom: `1px solid ${solid ? LINE : "rgba(255,255,255,0.14)"}`,
          transition: "background .6s ease, border-color .6s ease, backdrop-filter .6s ease",
        }}
      >
        <div
          className="mx-auto flex items-stretch justify-between gap-6"
          style={{
            maxWidth: 1440,
            paddingInline: "clamp(20px, 4vw, 56px)",
            height: solid ? 64 : 76,
            transition: "height .6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* 로고 — 바 높이 대비 크게 (26.07 헤더 가독성 피드백) */}
          <Link href="/demo/7" aria-label={COMPANY.name} className="shrink-0 flex items-center">
            <Image
              src="/images/sejong-logo.png"
              alt={COMPANY.name}
              width={220} height={54} priority
              className="w-auto h-10 lg:h-11"
              style={{ filter: "brightness(0) invert(1)", objectFit: "contain" }}
            />
          </Link>

          <nav className="hidden lg:flex items-stretch self-stretch" aria-label="주요 메뉴">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-center px-5 xl:px-6 text-[16px] font-bold whitespace-nowrap transition-colors duration-500"
                style={{ color: TEXT, letterSpacing: "-0.01em", textShadow: solid ? "none" : "0 1px 12px rgba(0,0,0,0.45)" }}
              >
                {item.label}
                <span
                  className="absolute left-5 right-5 xl:left-6 xl:right-6 bottom-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ background: BRASS, transition: "transform .7s cubic-bezier(0.16,1,0.3,1)" }}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5 shrink-0" style={{ textShadow: solid ? "none" : "0 1px 12px rgba(0,0,0,0.4)" }}>
            <a
              href={`tel:${COMPANY.tel.replace(/-/g, "")}`}
              className="hidden xl:flex items-center gap-2 text-[14px] font-medium tracking-wide transition-colors duration-500"
              style={{ color: MUTED }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={BRASS} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {COMPANY.tel}
            </a>
            <Link
              href="/support/inquiry"
              className="hidden sm:flex items-center h-11 px-7 text-[13.5px] font-bold tracking-wide transition-colors duration-500"
              style={{ border: `1px solid ${BRASS}`, color: BRASS }}
            >
              견적 문의
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-end gap-[6px]"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
            >
              <motion.span className="block h-[2px] w-6 rounded-full" style={{ background: TEXT, originX: "right" }}
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? 8 : 0 }} transition={{ duration: 0.45, ease: E }} />
              <motion.span className="block h-[2px] w-6 rounded-full" style={{ background: TEXT }}
                animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.3 }} />
              <motion.span className="block h-[2px] rounded-full" style={{ background: TEXT, originX: "right" }}
                animate={{ width: menuOpen ? 24 : 16, rotate: menuOpen ? 45 : 0, y: menuOpen ? -8 : 0 }} transition={{ duration: 0.45, ease: E }} />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: E }}
            className="fixed inset-0 z-40 lg:hidden overflow-y-auto"
            style={{ background: INK, paddingTop: 64 }}
          >
            <nav className="px-6 py-10" aria-label="모바일 메뉴">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.09, duration: 0.8, ease: E }}
                  className="py-5" style={{ borderBottom: `1px solid ${LINE}` }}
                >
                  <Link href={item.href} onClick={() => setMenuOpen(false)}
                    className="block text-[26px] font-extrabold tracking-tight" style={{ color: TEXT }}>
                    {item.label}
                  </Link>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} onClick={() => setMenuOpen(false)}
                        className="text-[13.5px]" style={{ color: MUTED }}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
              <div className="flex flex-col gap-3 pt-9">
                <Link href="/support/inquiry" onClick={() => setMenuOpen(false)}
                  className="h-14 flex items-center justify-center text-[15px] font-bold"
                  style={{ background: BRASS, color: INK }}>
                  견적 문의
                </Link>
                <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`}
                  className="h-14 flex items-center justify-center text-[15px] font-semibold"
                  style={{ border: `1px solid ${LINE}`, color: TEXT }}>
                  {COMPANY.tel}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════ 히어로 ══════════ */}
      <section className="relative overflow-hidden" style={{ height: "100svh", minHeight: 640 }}
        aria-roledescription="carousel" aria-label="메인 비주얼">
        {SLIDES.map((s, i) => (
          <motion.div
            key={s.img}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: idx === i ? 1 : 0, scale: reduced ? 1 : idx === i ? 1.09 : 1 }}
            transition={{
              opacity: { duration: 2, ease: "easeInOut" },
              scale: { duration: 16, ease: "linear" },
            }}
          >
            <Image src={s.img} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
          </motion.div>
        ))}

        {/* 스크림 — 좌측을 깊게 눌러 대형 타이포의 바닥을 만든다 */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(96deg, rgba(8,11,15,0.92) 0%, rgba(8,11,15,0.62) 46%, rgba(8,11,15,0.24) 100%)" }} />
        <div className="absolute inset-x-0 top-0 h-40" style={{ background: "linear-gradient(180deg, rgba(8,11,15,0.62), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-72" style={{ background: "linear-gradient(0deg, rgba(8,11,15,0.94) 12%, transparent)" }} />

        {/* 카피 */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full mx-auto" style={{ maxWidth: 1440, paddingInline: "clamp(20px, 4vw, 56px)" }}>
            <div style={{ maxWidth: 940, paddingBottom: "clamp(120px, 18vh, 200px)" }}>
              <AnimatePresence mode="wait">
                <motion.div key={idx} exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: E } }}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: E }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <span style={{ width: 56, height: 1, background: BRASS }} />
                    <span className="text-[13px] font-semibold tracking-[0.18em]" style={{ color: BRASS }}>
                      {SLIDES[idx].kicker}
                    </span>
                  </motion.div>

                  {SLIDES[idx].lines.map((line, li) => (
                    <div key={li} className="overflow-hidden">
                      <motion.h2
                        initial={{ y: "116%" }} animate={{ y: 0 }}
                        transition={{ delay: 0.12 + li * 0.14, duration: 1.5, ease: E }}
                        className="font-extrabold"
                        style={{
                          fontSize: "clamp(40px, 7.2vw, 104px)",
                          lineHeight: 1.06,
                          letterSpacing: "-0.045em",
                          color: TEXT,
                          textShadow: "0 4px 40px rgba(0,0,0,0.4)",
                        }}
                      >
                        {line}
                      </motion.h2>
                    </div>
                  ))}

                  <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 1.2, ease: E }}
                    className="mt-8"
                    style={{ fontSize: "clamp(15px, 1.3vw, 18px)", lineHeight: 1.85, color: "rgba(243,241,237,0.72)", maxWidth: 620 }}
                  >
                    {SLIDES[idx].sub}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 하단 스펙 바 — 히어로 하단 여백을 정보로 채운다 */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto" style={{ maxWidth: 1440, paddingInline: "clamp(20px, 4vw, 56px)" }}>
            {/* 슬라이드 컨트롤 */}
            <div className="flex items-center justify-end gap-3 pb-5">
              <div className="flex items-center gap-2 mr-2">
                {SLIDES.map((_, i) => (
                  <button key={i} type="button" onClick={() => setIdx(i)}
                    aria-label={`${i + 1}번 슬라이드`} aria-current={idx === i}
                    className="h-6 flex items-center" style={{ cursor: "pointer" }}>
                    <span className="block overflow-hidden" style={{ width: idx === i ? 56 : 22, height: 2, background: "rgba(255,255,255,0.24)", transition: "width .8s cubic-bezier(0.16,1,0.3,1)" }}>
                      {idx === i && (
                        <motion.span
                          key={`${i}-${playing ? "p" : "s"}`}
                          className="block h-full origin-left"
                          style={{ background: BRASS }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: playing && !reduced ? 1 : 0 }}
                          transition={{ duration: playing && !reduced ? SLIDE_MS / 1000 : 0.4, ease: "linear" }}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => setPlaying((v) => !v)}
                aria-label={playing ? "슬라이드 일시정지" : "슬라이드 재생"}
                className="w-10 h-10 flex items-center justify-center transition-colors duration-500"
                style={{ border: `1px solid ${LINE}`, color: TEXT }}>
                {playing ? (
                  <svg width="10" height="11" viewBox="0 0 11 12" fill="currentColor" aria-hidden><rect x="1" width="3" height="12" rx="0.5" /><rect x="7" width="3" height="12" rx="0.5" /></svg>
                ) : (
                  <svg width="10" height="11" viewBox="0 0 11 12" fill="currentColor" aria-hidden><path d="M.8.9c0-.7.8-1.1 1.4-.8l8.3 5.1c.6.4.6 1.2 0 1.6l-8.3 5.1c-.6.4-1.4 0-1.4-.8V.9z" /></svg>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid ${LINE}` }}>
              {HERO_SPECS.map((sp, i) => (
                <motion.div
                  key={sp.label}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.15, duration: 1.2, ease: E }}
                  className={[
                    "py-7 lg:py-9 border-white/10",
                    i === 0 ? "" : "border-l",
                    i === 2 ? "border-l-0 lg:border-l" : "",
                    i >= 2 ? "border-t lg:border-t-0" : "",
                  ].join(" ")}
                  style={{ paddingInline: "clamp(14px, 2vw, 32px)" }}
                >
                  <p className="font-extrabold leading-none tabular-nums" style={{ fontSize: "clamp(28px, 3.2vw, 44px)", letterSpacing: "-0.04em", color: TEXT, whiteSpace: "nowrap" }}>
                    {sp.v}
                    <span style={{ fontSize: "0.42em", color: BRASS, marginLeft: 6 }}>{sp.unit}</span>
                  </p>
                  <p className="mt-2.5 text-[12.5px] lg:text-[13.5px]" style={{ color: MUTED }}>{sp.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 스케일 (수치) ══════════ */}
      <section style={{ background: PANEL, paddingBlock: "clamp(76px, 8.5vw, 124px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1440, paddingInline: "clamp(20px, 4vw, 56px)" }}>
          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] gap-x-16 gap-y-14 items-start">
            <Rise>
              <p className="text-[13px] font-semibold tracking-[0.18em] mb-6" style={{ color: BRASS }}>규모</p>
              <h2 className="font-extrabold" style={{ fontSize: "clamp(32px, 4.4vw, 60px)", lineHeight: 1.16, letterSpacing: "-0.04em", color: TEXT }}>
                숫자로 남은
                <br />
                27년의 현장
              </h2>
              <p className="mt-7 text-[15px] leading-[1.9]" style={{ color: MUTED, maxWidth: 380 }}>
                크레인은 한 번 올라가면 수십 년을 버팁니다. 저희가 쌓아온 실적은
                그 시간을 견뎌온 설비의 기록입니다.
              </p>
              <Link href="/about" className="inline-flex items-center gap-3 mt-9 h-14 px-8 text-[14px] font-bold group" style={{ border: `1px solid ${LINE}`, color: TEXT }}>
                회사소개 보기
                <span className="group-hover:translate-x-2" style={{ display: "inline-block", color: BRASS, transition: "transform .8s cubic-bezier(0.16,1,0.3,1)" }}>→</span>
              </Link>
            </Rise>

            <div className="grid sm:grid-cols-3" style={{ borderTop: `1px solid ${LINE}` }}>
              {STATS.map((st, i) => (
                <Rise key={st.label} delay={0.15 + i * 0.18} className="h-full">
                  <div
                    className={[
                      "py-10 sm:py-12 h-full border-white/10",
                      i === 0 ? "" : "border-t sm:border-t-0 sm:border-l",
                    ].join(" ")}
                    style={{ paddingInline: i === 0 ? "0 clamp(12px,2vw,28px)" : "clamp(12px,2vw,28px)" }}
                  >
                    <p className="text-[13px] font-semibold mb-5" style={{ color: BRASS }}>{st.label}</p>
                    <CountUp target={st.value} suffix={st.suffix} />
                    <p className="mt-5 text-[13.5px] leading-[1.8]" style={{ color: MUTED }}>{st.desc}</p>
                  </div>
                </Rise>
              ))}
            </div>
          </div>

          {/* 와이드 이미지 밴드 — 수치 아래 빈 구간을 스케일 컷으로 마감 */}
          <Rise delay={0.1}>
            <div className="relative overflow-hidden mt-16 lg:mt-24" style={{ aspectRatio: "21 / 8", background: INK }}>
              <Image src="/images/hero-04.jpg" alt="세종호이스트크레인 시공 현장" fill sizes="100vw" className="object-cover" />
              <span className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,11,15,0.85) 4%, rgba(8,11,15,0.12) 60%, transparent)" }} />
              <p
                className="absolute left-0 bottom-0 p-7 sm:p-10 lg:p-12 font-bold"
                style={{ fontSize: "clamp(15px, 1.8vw, 22px)", color: TEXT, letterSpacing: "-0.02em" }}
              >
                설계 · 제작 · 설치 · 인증까지, 한 팀이 끝까지 책임집니다
              </p>
            </div>
          </Rise>
        </div>
      </section>

      {/* ══════════ 사업영역 (본 컬러 반전 밴드) ══════════ */}
      <section style={{ background: BONE, color: INK, paddingBlock: "clamp(76px, 8.5vw, 124px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1440, paddingInline: "clamp(20px, 4vw, 56px)" }}>
          <Rise>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.18em] mb-6" style={{ color: "#9A7434" }}>사업영역</p>
                <h2 className="font-extrabold" style={{ fontSize: "clamp(32px, 4.4vw, 60px)", lineHeight: 1.16, letterSpacing: "-0.04em" }}>
                  현장이 요구하는 모든 형태의
                  <br />
                  운반하역 설비
                </h2>
              </div>
              <p className="text-[15px] leading-[1.9] lg:text-right" style={{ color: "rgba(12,15,19,0.6)", maxWidth: 380 }}>
                천장크레인부터 350TON급 겐트리까지, 설계 · 제작 · 설치 · 인증을
                하나의 책임으로 수행합니다.
              </p>
            </div>
          </Rise>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {BUSINESS_AREAS.map((area, i) => (
              <Rise key={area.slug} delay={(i % 3) * 0.14}>
                <Link href={area.href} className="group block">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3", background: "#DED9D0" }}>
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                      className="object-cover group-hover:scale-[1.09]"
                      style={{ transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1)" }}
                    />
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{ background: "linear-gradient(0deg, rgba(12,15,19,0.55), transparent 60%)", transition: "opacity 1s ease" }}
                    />
                  </div>
                  <div className="pt-7">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[12px] font-bold tabular-nums" style={{ color: "#9A7434" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[21px] font-bold tracking-tight">{area.title}</h3>
                    </div>
                    <p className="mt-3.5 text-[14.5px] leading-[1.85]" style={{ color: "rgba(12,15,19,0.6)" }}>
                      {area.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {area.points.slice(0, 3).map((p) => (
                        <span key={p} className="text-[12px] px-3 py-1.5" style={{ background: "rgba(12,15,19,0.05)", color: "rgba(12,15,19,0.62)" }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 시공사례 ══════════ */}
      <section style={{ background: INK, paddingBlock: "clamp(76px, 8.5vw, 124px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1440, paddingInline: "clamp(20px, 4vw, 56px)" }}>
          <Rise>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.18em] mb-6" style={{ color: BRASS }}>시공사례</p>
                <h2 className="font-extrabold" style={{ fontSize: "clamp(32px, 4.4vw, 60px)", lineHeight: 1.16, letterSpacing: "-0.04em", color: TEXT }}>
                  대형 현장이
                  <br />
                  증명한 기술
                </h2>
              </div>
              <Link href="/portfolio" className="inline-flex items-center gap-3 text-[14px] font-semibold group" style={{ color: BRASS }}>
                전체 시공사례 보기
                <span style={{ display: "inline-block", transition: "transform .8s cubic-bezier(0.16,1,0.3,1)" }} className="group-hover:translate-x-2">→</span>
              </Link>
            </div>
          </Rise>

          {/* 대표 사례 — 가로 전체를 쓰는 시네마틱 프레임 */}
          <Rise>
            <Link href={`/portfolio/${featured.slug}`} className="group block">
              <div className="relative overflow-hidden" style={{ aspectRatio: "21 / 9", background: PANEL }}>
                <Image
                  src={featured.src} alt={featured.title} fill sizes="100vw"
                  className="object-cover group-hover:scale-[1.05]"
                  style={{ transition: "transform 1.6s cubic-bezier(0.16,1,0.3,1)" }}
                />
                <span className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,11,15,0.9) 6%, rgba(8,11,15,0.25) 55%, transparent)" }} />
                <div className="absolute left-0 right-0 bottom-0 p-7 sm:p-10 lg:p-14">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
                    <span className="text-[12.5px] font-bold px-3 py-1.5" style={{ background: BRASS, color: INK }}>
                      {featured.capacity}
                    </span>
                    <span className="text-[13px]" style={{ color: MUTED }}>
                      {featured.client} · {featured.year}
                    </span>
                  </div>
                  <h3 className="font-extrabold" style={{ fontSize: "clamp(24px, 3.4vw, 46px)", letterSpacing: "-0.035em", color: TEXT }}>
                    {featured.title}
                  </h3>
                  <p className="mt-4 text-[14.5px] leading-[1.85] hidden sm:block" style={{ color: "rgba(243,241,237,0.66)", maxWidth: 620 }}>
                    {featured.description}
                  </p>
                </div>
              </div>
            </Link>
          </Rise>

          {/* 보조 사례 3건 — 정수 그리드로 빈칸 없이 마감 */}
          <div className="grid sm:grid-cols-3 gap-x-8 gap-y-12 mt-8 lg:mt-10">
            {rest.map((item, i) => (
              <Rise key={item.slug} delay={i * 0.14}>
                <Link href={`/portfolio/${item.slug}`} className="group block">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 2", background: PANEL }}>
                    <Image
                      src={item.src} alt={item.title} fill
                      sizes="(max-width: 640px) 100vw, 420px"
                      className="object-cover group-hover:scale-[1.08]"
                      style={{ transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1)" }}
                    />
                  </div>
                  <div className="pt-6" style={{ borderTop: `1px solid ${LINE}`, marginTop: 20 }}>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-[17px] font-bold tracking-tight" style={{ color: TEXT }}>{item.title}</h3>
                      <span className="text-[12.5px] font-bold shrink-0" style={{ color: BRASS }}>{item.capacity}</span>
                    </div>
                    <p className="mt-2.5 text-[13.5px]" style={{ color: MUTED }}>
                      {item.client} · {item.year}
                    </p>
                  </div>
                </Link>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 수행 절차 ══════════ */}
      <section style={{ background: PANEL, paddingBlock: "clamp(76px, 8.5vw, 124px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1440, paddingInline: "clamp(20px, 4vw, 56px)" }}>
          <Rise>
            <p className="text-[13px] font-semibold tracking-[0.18em] mb-6" style={{ color: BRASS }}>수행 절차</p>
            <h2 className="font-extrabold mb-12 lg:mb-16" style={{ fontSize: "clamp(32px, 4.4vw, 60px)", lineHeight: 1.16, letterSpacing: "-0.04em", color: TEXT }}>
              설계부터 유지보수까지
              <br />
              하나의 책임으로
            </h2>
          </Rise>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid ${LINE}` }}>
            {PROCESS.map((p, i) => (
              <Rise key={p.step} delay={i * 0.16}>
                <div
                  className={[
                    "py-10 lg:py-12 h-full border-white/10",
                    i > 0 ? "border-t sm:border-t-0" : "",
                    i % 2 === 1 ? "sm:border-l" : "",
                    i >= 2 ? "sm:border-t lg:border-t-0" : "",
                    i === 0 ? "lg:border-l-0" : "lg:border-l",
                  ].join(" ")}
                  style={{ paddingInline: "clamp(18px, 2.2vw, 34px)" }}
                >
                  <p className="font-extrabold tabular-nums leading-none" style={{ fontSize: 34, letterSpacing: "-0.04em", color: BRASS }}>
                    {p.step}
                  </p>
                  <h3 className="mt-7 text-[18px] font-bold" style={{ color: TEXT }}>{p.title}</h3>
                  <p className="mt-4 text-[14px] leading-[1.85]" style={{ color: MUTED }}>{p.desc}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 인증 · 신뢰 ══════════ */}
      <section className="relative overflow-hidden" style={{ background: INK, paddingBlock: "clamp(76px, 8.5vw, 124px)" }}>
        <div className="absolute inset-0" aria-hidden>
          <Image src="/images/tech-analysis.jpg" alt="" fill sizes="100vw" className="object-cover" style={{ opacity: 0.16 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(12,15,19,0.97) 24%, rgba(12,15,19,0.72))" }} />
        </div>

        <div className="relative mx-auto" style={{ maxWidth: 1440, paddingInline: "clamp(20px, 4vw, 56px)" }}>
          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] gap-x-16 gap-y-14 items-center">
            <Rise>
              <p className="text-[13px] font-semibold tracking-[0.18em] mb-6" style={{ color: BRASS }}>기술 · 인증</p>
              <h2 className="font-extrabold" style={{ fontSize: "clamp(32px, 4.4vw, 56px)", lineHeight: 1.18, letterSpacing: "-0.04em", color: TEXT }}>
                안전은 약속이 아니라
                <br />
                기록입니다
              </h2>
              <p className="mt-7 text-[15px] leading-[1.9]" style={{ color: MUTED, maxWidth: 400 }}>
                취득한 인증과 심사 도서를 그대로 공개합니다. 판단에 필요한 근거를
                감추지 않는 것이 저희의 방식입니다.
              </p>
              <Link href="/technology" className="inline-flex items-center gap-3 mt-10 h-14 px-9 text-[14px] font-bold" style={{ border: `1px solid ${BRASS}`, color: BRASS }}>
                인증 자료 보기
              </Link>
            </Rise>

            <div className="grid sm:grid-cols-2 gap-px" style={{ background: LINE }}>
              {PROOFS.map((p, i) => (
                <Rise key={p.k} delay={0.1 + i * 0.14}>
                  <div className="h-full p-8 lg:p-10" style={{ background: INK }}>
                    <p className="text-[13px]" style={{ color: MUTED }}>{p.k}</p>
                    <p className="mt-3 font-extrabold leading-none" style={{ fontSize: "clamp(30px, 3.4vw, 44px)", letterSpacing: "-0.04em", color: TEXT }}>
                      {p.v}
                    </p>
                    <p className="mt-4 text-[13px] leading-[1.75]" style={{ color: "rgba(243,241,237,0.44)" }}>{p.d}</p>
                  </div>
                </Rise>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 클로징 CTA ══════════ */}
      <section style={{ background: BRASS, color: INK, paddingBlock: "clamp(76px, 8.5vw, 124px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1440, paddingInline: "clamp(20px, 4vw, 56px)" }}>
          <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-x-16 gap-y-12 items-center">
            <Rise>
              <h2 className="font-extrabold" style={{ fontSize: "clamp(32px, 5vw, 68px)", lineHeight: 1.12, letterSpacing: "-0.045em" }}>
                현장 조건만 알려주시면
                <br />
                사양과 견적을 제안합니다
              </h2>
            </Rise>
            <Rise delay={0.18}>
              <div style={{ borderTop: "1px solid rgba(12,15,19,0.22)" }}>
                <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`} className="flex items-baseline justify-between gap-6 py-6" style={{ borderBottom: "1px solid rgba(12,15,19,0.22)" }}>
                  <span className="text-[13px] font-semibold" style={{ color: "rgba(12,15,19,0.6)" }}>대표전화</span>
                  <span className="text-[clamp(20px,2.4vw,30px)] font-extrabold tracking-tight tabular-nums">{COMPANY.tel}</span>
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-baseline justify-between gap-6 py-6" style={{ borderBottom: "1px solid rgba(12,15,19,0.22)" }}>
                  <span className="text-[13px] font-semibold" style={{ color: "rgba(12,15,19,0.6)" }}>이메일</span>
                  <span className="text-[clamp(15px,1.6vw,20px)] font-bold">{COMPANY.email}</span>
                </a>
                <Link href="/support/inquiry" className="flex items-center justify-center h-16 mt-8 text-[15px] font-bold" style={{ background: INK, color: BRASS }}>
                  온라인 견적 문의
                </Link>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* ══════════ 푸터 ══════════ */}
      <footer style={{ background: INK, paddingBlock: "clamp(56px, 7vw, 88px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1440, paddingInline: "clamp(20px, 4vw, 56px)" }}>
          <div className="flex flex-col lg:flex-row justify-between gap-12" style={{ borderBottom: `1px solid ${LINE}`, paddingBottom: 44 }}>
            <div>
              <Image
                src="/images/sejong-logo.png" alt={COMPANY.name}
                width={180} height={44}
                className="w-auto h-9" style={{ filter: "brightness(0) invert(1)", objectFit: "contain", opacity: 0.85 }}
              />
              <p className="mt-6 text-[13.5px] leading-[1.9]" style={{ color: MUTED }}>
                {COMPANY.address}
                <br />
                사업자등록번호 {COMPANY.bizNo} · 대표 {COMPANY.ceo}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-8">
              {NAV.slice(0, 3).map((item) => (
                <div key={item.href}>
                  <p className="text-[13.5px] font-bold mb-4" style={{ color: TEXT }}>{item.label}</p>
                  <div className="flex flex-col gap-2.5">
                    {item.children.slice(0, 4).map((c) => (
                      <Link key={c.href} href={c.href} className="text-[13px]" style={{ color: MUTED }}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="pt-8 text-[12.5px]" style={{ color: "rgba(243,241,237,0.34)" }}>
            © 2026 {COMPANY.name}. 시안 C · MONUMENT 데모 페이지입니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
