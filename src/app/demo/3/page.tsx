"use client";

/**
 * DEMO 3: CRAFT — 에디토리얼 미니멀리즘
 * Aesop × Bottega Veneta × Shinsegae ENC × Liebherr
 *
 * 원칙: 텍스트가 디자인이다. 여백이 럭셔리다. 사진이 증거다.
 * 아이콘 없음. 장식적 선 없음. 색상은 3개만.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─── 디자인 토큰 ─── */
// bg: #f6f3ee (따뜻한 크림), text: #111 (순수하지 않은 검정), gold: #b08c5a
const C = {
  bg: "#f6f3ee",
  text: "#111111",
  muted: "#888",
  subtle: "#ccc4b8",
  gold: "#b08c5a",
  dark: "#1a1a1a",
};

/* ─── 클립 텍스트 리빌 ─── */
function ClipReveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "108%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] as never }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── 패럴랙스 이미지 ─── */
function ParallaxPhoto({ src, alt, ratio = "4/3" }: { src: string; alt: string; ratio?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className="relative overflow-hidden w-full" style={{ aspectRatio: ratio }}>
      <motion.div style={{ y }} className="absolute inset-[-14%] w-[114%] h-[114%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}

/* ─── 데이터 ─── */
const PRODUCT_STORIES = [
  {
    num: "I",
    name: "천장크레인",
    en: "Overhead Crane",
    pull: "반도체 공장의 정밀함,\n발전소의 중량감.",
    body: "세종의 천장크레인은 0.1μm급 진동 제어를 요구하는 반도체 클린룸부터 200T 중량물을 다루는 발전소까지, 산업의 가장 정밀한 요구에 응합니다. 1984년 첫 납품 이후 지금까지 348개소에서 가동 중입니다.",
    detail: "최대 하중 500T · 스팬 40m · 348건 납품",
    img: "/images/sejong_2.png",
  },
  {
    num: "II",
    name: "갠트리크레인",
    en: "Gantry Crane",
    pull: "바람이 불어도,\n눈이 와도.",
    body: "야외의 혹독한 환경에서도 흔들리지 않는 구조물. 조선소의 선박 블록 탑재, 수력발전소의 수문 설치, 항만의 대형 화물 이송. 어떤 조건도 세종의 갠트리크레인은 가동을 멈추지 않습니다.",
    detail: "최대 하중 1,000T · 스팬 60m · 175건 납품",
    img: "/images/sejong_3.png",
  },
];

const NUMBERS = [
  { val: "40", unit: "년", note: "창립 이래\n멈추지 않은 기술" },
  { val: "523", unit: "건", note: "하나하나가\n현장의 신뢰" },
  { val: "94", unit: "곳", note: "함께 성장한\n고객사의 수" },
  { val: "24", unit: "H", note: "언제나 열려있는\nAS 지원 체계" },
];

const JOURNAL = [
  { date: "Jun 2026", tag: "기술", title: "반도체 클린룸 크레인, 진동 제어 세계 최초 달성" },
  { date: "May 2026", tag: "납품", title: "국내 최대 200T급 천장크레인 — 당진 발전소" },
  { date: "Apr 2026", tag: "수상", title: "산업통상자원부 장관 표창 수상" },
  { date: "Feb 2026", tag: "인증", title: "ISO 9001:2015 품질경영시스템 3회 연속 갱신" },
];

export default function CraftDemo() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Georgia', 'Times New Roman', serif" }}
      className="min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 h-[64px]"
        style={{ background: `${C.bg}e0`, backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.subtle}40` }}>
        <Link href="/">
          <Image src="/images/sejong-logo.png" alt="SEJONG" width={110} height={26} className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity" />
        </Link>
        <div className="hidden md:flex items-center gap-8"
          style={{ fontFamily: "system-ui, sans-serif", fontSize: 12, letterSpacing: "0.08em", color: C.muted }}>
          {["Company", "Products", "Work", "Contact"].map(m => (
            <a key={m} href="#" className="hover:text-black transition-colors">{m}</a>
          ))}
        </div>
        <a href="/support/inquiry"
          style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, letterSpacing: "0.12em", color: C.muted, borderBottom: `1px solid ${C.subtle}` }}
          className="uppercase pb-px hover:text-black hover:border-black transition-all"
        >
          상담 예약
        </a>
      </nav>

      {/* HERO — 전면 이미지 + 텍스트 하단 오버랩 */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ scale: heroImgScale }} className="absolute inset-0">
          <Image src="/images/sejong_1.png" alt="hero" fill className="object-cover" style={{ filter: "brightness(0.42)" }} priority />
        </motion.div>
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, transparent 30%, ${C.bg}dd 100%)` }} />

        <motion.div style={{ opacity: heroOpacity }}
          className="absolute bottom-0 left-0 right-0 px-8 md:px-20 pb-20 md:pb-28">
          <ClipReveal delay={0.3}>
            <p className="mb-6 tracking-[0.35em] uppercase"
              style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, color: C.gold }}>
              Sejong Hoist &amp; Crane — Since 1984
            </p>
          </ClipReveal>

          <ClipReveal delay={0.45}>
            <h1 className="leading-[0.92] font-normal mb-2"
              style={{ fontSize: "clamp(4rem, 9vw, 8rem)", letterSpacing: "-0.025em", color: "#fff" }}>
              산업의 심장,
            </h1>
          </ClipReveal>
          <ClipReveal delay={0.58}>
            <h1 className="leading-[0.92] font-normal mb-10"
              style={{ fontSize: "clamp(4rem, 9vw, 8rem)", letterSpacing: "-0.025em", color: C.gold }}>
              크레인.
            </h1>
          </ClipReveal>

          <ClipReveal delay={0.72}>
            <p className="max-w-md text-[15px] leading-[1.7]"
              style={{ fontFamily: "system-ui, sans-serif", color: "rgba(255,255,255,0.5)" }}>
              반도체 공장의 정밀함부터 발전소의 무게까지. 40년의 기술이 오늘도 현장에서 가동됩니다.
            </p>
          </ClipReveal>
        </motion.div>

        <div className="absolute bottom-8 right-10 hidden md:flex items-center gap-3"
          style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
          <span>Scroll to explore</span>
          <span style={{ fontSize: 14 }}>↓</span>
        </div>
      </section>

      {/* 브랜드 선언문 */}
      <section className="py-24 md:py-40 px-8 md:px-20" style={{ background: C.bg }}>
        <div className="max-w-[1400px] mx-auto">
          <ClipReveal>
            <p className="mb-10 tracking-[0.3em] uppercase"
              style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, color: C.gold }}>
              Our Belief
            </p>
          </ClipReveal>

          {[
            { text: "우리는 단순한", delay: 0.05 },
            { text: "제조사가 아닙니다.", delay: 0.15 },
          ].map(({ text, delay }, i) => (
            <ClipReveal key={i} delay={delay}>
              <p className="font-normal leading-[1.0] mb-1"
                style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "-0.025em" }}>
                {text}
              </p>
            </ClipReveal>
          ))}
          <ClipReveal delay={0.28}>
            <p className="font-normal leading-[1.0] mb-14"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "-0.025em", color: C.gold }}>
              산업의 파트너입니다.
            </p>
          </ClipReveal>

          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[15px] leading-[1.85] max-w-xl"
            style={{ fontFamily: "system-ui, sans-serif", color: C.muted }}
          >
            1984년 창립 이래 40년. 우리는 고객의 현장을 먼저 이해하고, 그 이해를 기술로 구현합니다. 523개의 납품 실적은 단순한 숫자가 아니라, 523개의 신뢰 관계입니다.
          </motion.p>
        </div>
      </section>

      {/* 제품 스토리 — 전면 재작성 */}
      {PRODUCT_STORIES.map((p, i) => (
        <section key={i} className="relative overflow-hidden" style={{ minHeight: "100svh", display: "flex", alignItems: "stretch" }}>
          <div className={`flex flex-col lg:flex-row w-full ${i % 2 === 1 ? "" : ""}`}>

            {/* 이미지 */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as never }}
              className={`w-full lg:w-[55%] relative ${i % 2 === 1 ? "lg:order-2" : ""}`}
              style={{ minHeight: "55vw", maxHeight: "90vh" }}
            >
              <ParallaxPhoto src={p.img} alt={p.name} ratio="1/1" />
            </motion.div>

            {/* 텍스트 */}
            <div
              className={`w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-14 xl:px-20 py-20 md:py-28 ${i % 2 === 1 ? "lg:order-1" : ""}`}
              style={{ background: i % 2 === 1 ? C.dark : C.bg, color: i % 2 === 1 ? "#fff" : C.text }}
            >
              <ClipReveal>
                <p className="mb-6 tracking-[0.25em] uppercase"
                  style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, color: C.gold }}>
                  {p.num} — {p.en}
                </p>
              </ClipReveal>

              <ClipReveal delay={0.1}>
                <h2 className="leading-[1.0] mb-8 font-normal"
                  style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", letterSpacing: "-0.02em", whiteSpace: "pre-line" }}>
                  {p.pull}
                </h2>
              </ClipReveal>

              <motion.p
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[15px] leading-[1.85] mb-8"
                style={{ fontFamily: "system-ui, sans-serif", color: i % 2 === 1 ? "rgba(255,255,255,0.48)" : C.muted, maxWidth: "26rem" }}
              >
                {p.body}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.45 }}
                className="text-[12px] tracking-wider mb-10"
                style={{ fontFamily: "system-ui, sans-serif", color: i % 2 === 1 ? "rgba(255,255,255,0.25)" : C.subtle }}
              >
                {p.detail}
              </motion.p>

              <motion.a
                href="/business"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-3 text-[13px] w-fit group"
                style={{ fontFamily: "system-ui, sans-serif", color: C.gold }}
              >
                <span className="h-px transition-all duration-400 group-hover:w-14" style={{ width: 28, background: C.gold }} />
                자세히 보기
              </motion.a>
            </div>
          </div>
        </section>
      ))}

      {/* 포트폴리오 */}
      <section className="py-20 px-8 md:px-20" style={{ background: C.dark }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <ClipReveal>
              <h2 className="font-normal leading-[0.95]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", letterSpacing: "-0.02em", color: "#fff" }}>
                Selected Works
              </h2>
            </ClipReveal>
            <Link href="/portfolio" className="hidden md:block text-[12px] uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
              style={{ fontFamily: "system-ui, sans-serif", color: C.gold }}>
              All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {[
              { img: "/images/sejong_1.png", client: "삼성전자", type: "클린룸 크레인" },
              { img: "/images/sejong_2.png", client: "한국수력원자력", type: "특수 천장크레인" },
              { img: "/images/sejong_3.png", client: "GS칼텍스", type: "갠트리크레인" },
              { img: "/images/sejong_4.png", client: "현대제철", type: "이중거더 크레인" },
            ].map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.8 }}
                className="relative group overflow-hidden cursor-pointer"
                style={{ aspectRatio: "3/4" }}
              >
                <Image src={w.img} alt={w.client} fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ filter: "brightness(0.58)" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.85) 0%, transparent 50%)" }} />
                <div className="absolute bottom-0 left-0 p-5 md:p-6">
                  <p className="text-[10px] uppercase tracking-wider mb-1"
                    style={{ fontFamily: "system-ui, sans-serif", color: C.gold }}>
                    {w.type}
                  </p>
                  <p className="font-normal text-sm text-white transition-colors group-hover:text-[#b08c5a]">
                    {w.client}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 숫자 — 에디토리얼 스타일, 선 없이 여백으로만 */}
      <section className="py-28 md:py-44 px-8 md:px-20" style={{ background: C.bg }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-6 md:gap-x-10">
            {NUMBERS.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.9 }}
              >
                <p className="font-normal leading-none mb-3"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", letterSpacing: "-0.03em", color: C.text }}>
                  {n.val}
                  <span style={{ color: C.gold, fontSize: "0.55em" }}>{n.unit}</span>
                </p>
                <p className="text-[13px] leading-relaxed"
                  style={{ fontFamily: "system-ui, sans-serif", color: C.muted, whiteSpace: "pre-line" }}>
                  {n.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 저널 */}
      <section className="py-20 md:py-32 px-8 md:px-20" style={{ borderTop: `1px solid ${C.subtle}50` }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <ClipReveal>
              <h2 className="font-normal" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em" }}>
                Journal
              </h2>
            </ClipReveal>
            <Link href="/support/notice"
              className="hidden md:block text-[11px] uppercase tracking-[0.15em] hover:opacity-50 transition-opacity"
              style={{ fontFamily: "system-ui, sans-serif", color: C.muted }}>
              All →
            </Link>
          </div>

          <div style={{ borderTop: `1px solid ${C.subtle}50` }}>
            {JOURNAL.map((j, i) => (
              <motion.a
                key={i} href="/support/notice"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                className="flex flex-col md:flex-row md:items-center justify-between py-6 group"
                style={{ borderBottom: `1px solid ${C.subtle}50`, transition: "padding 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.paddingLeft = "8px")}
                onMouseLeave={e => (e.currentTarget.style.paddingLeft = "0")}
              >
                <div className="flex items-center gap-5 md:gap-8 mb-1 md:mb-0">
                  <span className="text-[11px] font-mono w-18 flex-shrink-0"
                    style={{ fontFamily: "system-ui, sans-serif", color: C.muted }}>{j.date}</span>
                  <span className="font-normal text-base md:text-lg group-hover:text-[#b08c5a] transition-colors">
                    {j.title}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider flex-shrink-0 md:ml-8"
                  style={{ fontFamily: "system-ui, sans-serif", color: C.subtle }}>
                  {j.tag}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-52 px-8 md:px-20 text-center" style={{ background: C.dark }}>
        <ClipReveal>
          <p className="mb-8 tracking-[0.3em] uppercase"
            style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, color: C.gold }}>
            문의하기
          </p>
        </ClipReveal>
        <ClipReveal delay={0.1}>
          <h2 className="font-normal leading-[1.0] mb-10"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.025em", color: "#fff" }}>
            크레인에 대해<br />이야기해 드릴게요.
          </h2>
        </ClipReveal>
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
        >
          <a href="/support/inquiry"
            className="inline-flex items-center gap-4 text-base hover:opacity-60 transition-opacity"
            style={{ fontFamily: "system-ui, sans-serif", color: C.gold, borderBottom: `1px solid ${C.gold}50`, paddingBottom: 2 }}>
            상담 예약하기
            <span>→</span>
          </a>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-20 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        style={{ background: C.dark, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
        <p className="text-[12px]" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(255,255,255,0.2)" }}>
          © 2026 Sejong Hoist &amp; Crane. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-[12px]" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(255,255,255,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.gold }} />
          Demo 3 — CRAFT
          <Link href="/demo" className="ml-4 hover:text-white/50 transition-colors">← 데모 목록</Link>
        </div>
      </footer>
    </div>
  );
}
