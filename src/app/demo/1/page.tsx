"use client";

/**
 * DEMO 1: APEX — 다크 럭셔리 (Apple × BMW × Caterpillar)
 *
 * 설계 원칙:
 * - 배경색: #060606 (따뜻한 니어블랙)
 * - 강조: #e8721a 단 1회 (CTA만)
 * - 타이포: 900weight + 여백이 전부
 * - 이미지: 화면의 60% 이상 차지
 * - 애니메이션: ① 클립 리빌  ② 패럴랙스  ③ 카운터 — 3가지만
 *
 * RULES.md 기반:
 * - Tailwind v4 CSS 토큰 사용 (bg-apex-bg 등)
 * - TypeScript strict
 * - framer-motion ease: [0.16,1,0.3,1] as never
 */

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ─── 상수 ─── */
const E = [0.16, 1, 0.3, 1] as never; // 표준 ease
const DUR = 0.9;

/* ─── 타입 ─── */
interface Product {
  id: string;
  num: string;
  name: string;
  en: string;
  tag: string;
  body: string;
  specs: [string, string][];
  img: string;
}

interface Stat { val: number; suffix: string; label: string; }
interface Work { client: string; type: string; year: string; img: string; }

/* ─── 데이터 ─── */
const PRODUCTS: Product[] = [
  {
    id: "overhead", num: "01", name: "천장크레인", en: "Overhead Crane",
    tag: "반도체·발전·철강",
    body: "반도체 클린룸의 0.1μm 정밀 제어부터 발전소 200T 중량물까지. 348개 현장에서 증명된 기술.",
    specs: [["최대 하중", "500 T"], ["최대 스팬", "40 m"], ["납품 실적", "348건"], ["적용 분야", "반도체·철강·발전"]],
    img: "/images/sejong_2.png",
  },
  {
    id: "gantry", num: "02", name: "갠트리크레인", en: "Gantry Crane",
    tag: "조선·항만·건설",
    body: "바람, 진동, 극한 하중. 야외 가혹 환경에서도 흔들리지 않는 구조. 175건이 증명합니다.",
    specs: [["최대 하중", "1,000 T"], ["최대 스팬", "60 m"], ["납품 실적", "175건"], ["구동 방식", "레일·타이어"]],
    img: "/images/sejong_3.png",
  },
  {
    id: "hoist", num: "03", name: "호이스트", en: "Electric Hoist",
    tag: "제조·물류·조립",
    body: "전동 체인부터 와이어로프까지. 세밀하고 안정적인 운전 특성으로 다양한 제조 현장의 요구를 충족합니다.",
    specs: [["최대 하중", "50 T"], ["양정", "30 m"], ["종류", "체인·와이어"], ["납품 실적", "250건+"]],
    img: "/images/sejong_1.png",
  },
  {
    id: "special", num: "04", name: "특수크레인", en: "Special Crane",
    tag: "원자력·방폭·클린룸",
    body: "불가능한 조건은 없습니다. 원자력, 방폭, 클린룸 등 일반 크레인이 들어갈 수 없는 곳을 위한 완전 맞춤 설계.",
    specs: [["종류", "방폭·클린룸·원자력"], ["설계", "완전 맞춤형"], ["인증", "ISO·KGS·방폭"], ["납품 실적", "92건"]],
    img: "/images/sejong_4.png",
  },
];

const STATS: Stat[] = [
  { val: 40, suffix: "+", label: "년 업력" },
  { val: 523, suffix: "", label: "건 납품" },
  { val: 200, suffix: "T", label: "최대 하중" },
  { val: 94, suffix: "+", label: "개 고객사" },
];

const WORKS: Work[] = [
  { client: "한국수력원자력", type: "원자력 특수크레인 30T", year: "2025", img: "/images/sejong_2.png" },
  { client: "삼성전자 평택", type: "클린룸 천장크레인 10T", year: "2024", img: "/images/sejong_1.png" },
  { client: "POSCO 광양", type: "이중거더 천장크레인 200T", year: "2025", img: "/images/sejong_3.png" },
];

/* ─── 서브컴포넌트: 카운터 ─── */
function Num({ val, suffix }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, val, {
      duration: 2.2,
      ease: E as never,
      onUpdate: v => setN(Math.floor(v)),
    });
    return () => c.stop();
  }, [inView, val]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── 서브컴포넌트: 클립 리빌 ─── */
function Reveal({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: "106%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: DUR, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── 서브컴포넌트: 패럴랙스 이미지 ─── */
function ParaImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-[-14%] w-[128%] h-[128%]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px)100vw,60vw" />
      </motion.div>
    </div>
  );
}

/* ─── 메인 ─── */
export default function ApexDemo() {
  const heroRef = useRef(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(hp, [0, 0.8], [1, 0]);
  const heroScale  = useTransform(hp, [0, 1], [1, 1.06]);

  return (
    <div className="font-sans overflow-x-hidden" style={{ background: "#060606", color: "#f0f0f0" }}>

      {/* ── NAV ── */}
      <header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between h-16 px-6 md:px-14"
        style={{ background: "rgba(6,6,6,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <Link href="/" aria-label="홈">
          <Image src="/images/sejong-logo.png" alt="SEJONG" width={108} height={24} className="h-6 w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
          {["제품", "납품실적", "회사소개"].map(m => (
            <a key={m} href="#" className="hover:text-white transition-colors">{m}</a>
          ))}
        </nav>
        <a
          href="/support/inquiry"
          className="text-[12px] font-semibold px-5 py-2.5 transition-colors"
          style={{ background: "#e8721a", color: "#fff" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#c9600f")}
          onMouseLeave={e => (e.currentTarget.style.background = "#e8721a")}
        >
          무료 견적
        </a>
      </header>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-end overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image src="/images/sejong_3.png" alt="hero" fill priority
            className="object-cover" style={{ filter: "brightness(0.22)" }} />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 25% 80%, rgba(232,114,26,0.07) 0%, transparent 60%)" }} />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container-xl pb-20 md:pb-28">
          {/* 브랜드 레이블 — 딱 한 번만 */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-[11px] font-mono tracking-[0.4em] uppercase mb-8"
            style={{ color: "#e8721a" }}
          >
            Sejong Hoist &amp; Crane — Est. 1984
          </motion.p>

          {/* 디스플레이 타이포 */}
          <h1 className="text-display mb-10">
            {["POWER", "BEYOND", "MEASURE"].map((w, i) => (
              <div key={w} className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.0, delay: 0.5 + i * 0.13, ease: E }}
                  style={{ color: i === 1 ? "rgba(240,240,240,0.12)" : "#f0f0f0" }}
                >
                  {w}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* 서브 카피 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
          >
            <p className="text-[15px] max-w-xs leading-relaxed" style={{ color: "rgba(240,240,240,0.38)" }}>
              최대 하중 <strong className="text-white">200T</strong> · 납품 <strong className="text-white">523</strong>건<br />
              대한민국 산업현장이 선택한 크레인
            </p>
            <a href="/business" className="group inline-flex items-center gap-3 text-[13px] font-semibold" style={{ color: "#e8721a" }}>
              <span className="block h-px w-8 group-hover:w-14 transition-all duration-300" style={{ background: "#e8721a" }} />
              제품 보기 →
            </a>
          </motion.div>
        </motion.div>

        {/* 스크롤 힌트 */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <div className="scroll-indicator" />
          <span className="text-[9px] tracking-[0.3em] uppercase font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>Scroll</span>
        </motion.div>
      </section>

      {/* ── 제품 섹션 (4개, 교번 레이아웃) ── */}
      {PRODUCTS.map((p, i) => (
        <section key={p.id} className="flex flex-col lg:flex-row min-h-screen">

          {/* 이미지 블록 */}
          <ParaImg
            src={p.img} alt={p.name}
            className={cn(
              "w-full lg:w-[58%] min-h-[50vh]",
              i % 2 === 1 && "lg:order-2"
            )}
          />

          {/* 텍스트 블록 */}
          <div
            className={cn(
              "flex-1 flex flex-col justify-center section-pad container-xl",
              i % 2 === 1 && "lg:order-1"
            )}
            style={{ background: i % 2 === 0 ? "#060606" : "#0c0c0c" }}
          >
            {/* 번호 */}
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase mb-7"
              style={{ color: "rgba(240,240,240,0.22)" }}
            >
              {p.num} — {p.en}
            </motion.p>

            {/* 제품명 */}
            <Reveal className="mb-6">
              <h2 className="text-h1">{p.name}</h2>
            </Reveal>

            {/* 태그라인 */}
            <Reveal delay={0.08} className="mb-8">
              <p className="text-[13px] font-mono" style={{ color: "rgba(232,114,26,0.8)" }}>{p.tag}</p>
            </Reveal>

            {/* 본문 */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: E }}
              className="text-[15px] leading-[1.8] mb-12 max-w-sm"
              style={{ color: "rgba(240,240,240,0.42)" }}
            >
              {p.body}
            </motion.p>

            {/* 스펙 그리드 — 공백으로만 구분, 선 없음 */}
            <motion.dl
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-2 gap-x-10 gap-y-8 mb-14"
            >
              {p.specs.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] mb-2" style={{ color: "rgba(240,240,240,0.22)" }}>{k}</dt>
                  <dd className="text-lg font-semibold" style={{ color: "#f0f0f0" }}>{v}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.a
              href="/business"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="group inline-flex items-center gap-3 text-[13px] font-semibold w-fit"
              style={{ color: "#e8721a" }}
            >
              <span className="h-px w-7 group-hover:w-14 transition-all duration-300" style={{ background: "#e8721a" }} />
              자세히 보기
            </motion.a>
          </div>
        </section>
      ))}

      {/* ── STATS — 순수 타이포그래피, 장식 일절 없음 ── */}
      <section className="section-pad" style={{ background: "#060606" }}>
        <div className="container-xl">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.35em] uppercase mb-20"
            style={{ color: "rgba(240,240,240,0.2)" }}
          >
            By the numbers
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.09, ease: E }}
              >
                <p className="text-display mb-3" style={{ fontSize: "clamp(3.5rem,8vw,6.5rem)" }}>
                  <Num {...s} />
                </p>
                <p className="text-[13px]" style={{ color: "rgba(240,240,240,0.35)" }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKS — 비대칭 그리드 ── */}
      <section className="section-pad" style={{ background: "#0a0a0a" }}>
        <div className="container-xl">
          <div className="flex items-end justify-between mb-14">
            <div>
              <Reveal>
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-4" style={{ color: "rgba(240,240,240,0.2)" }}>
                  Selected Works
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-h1">현장이 증명합니다</h2>
              </Reveal>
            </div>
            <Link href="/portfolio" className="hidden md:block text-[13px] hover:opacity-60 transition-opacity" style={{ color: "rgba(240,240,240,0.35)" }}>
              전체 보기 →
            </Link>
          </div>

          {/* 1 큰 + 2 작은 배치 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 큰 카드 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}
              className="md:col-span-2 relative overflow-hidden group cursor-pointer"
              style={{ aspectRatio: "16/9" }}
            >
              <Image src={WORKS[0].img} alt={WORKS[0].client} fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ filter: "brightness(0.5)" }} sizes="(max-width:768px)100vw,66vw" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(6,6,6,0.85) 0%,transparent 55%)" }} />
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                <p className="text-[11px] font-mono mb-2.5" style={{ color: "rgba(255,255,255,0.38)" }}>{WORKS[0].type} · {WORKS[0].year}</p>
                <p className="text-xl font-bold group-hover:text-[#e8721a] transition-colors">{WORKS[0].client}</p>
              </div>
            </motion.div>

            {/* 작은 카드 2개 */}
            <div className="grid grid-rows-2 gap-3">
              {WORKS.slice(1).map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: E }}
                  className="relative overflow-hidden group cursor-pointer"
                >
                  <Image src={w.img} alt={w.client} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{ filter: "brightness(0.45)" }} sizes="(max-width:768px)100vw,33vw" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(6,6,6,0.85) 0%,transparent 50%)" }} />
                  <div className="absolute bottom-0 left-0 p-5 md:p-6">
                    <p className="text-[10px] font-mono mb-1.5" style={{ color: "rgba(255,255,255,0.38)" }}>{w.type}</p>
                    <p className="text-sm font-semibold group-hover:text-[#e8721a] transition-colors">{w.client}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad relative overflow-hidden" style={{ background: "#060606" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(232,114,26,0.07) 0%, transparent 60%)" }} />
        <div className="container-xl relative">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-8" style={{ color: "rgba(240,240,240,0.22)" }}>
              Get in Touch
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-display mb-12" style={{ fontSize: "clamp(3rem,10vw,9rem)" }}>
              크레인 도입을<br />
              <span style={{ color: "rgba(240,240,240,0.12)" }}>계획하고 계신가요?</span>
            </h2>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.4, ease: E }}
            className="flex flex-wrap gap-4"
          >
            <a href="/support/inquiry"
              className="px-10 py-4 text-[13px] font-bold transition-colors"
              style={{ background: "#e8721a", color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#c9600f")}
              onMouseLeave={e => (e.currentTarget.style.background = "#e8721a")}
            >
              무료 상담 신청
            </a>
            <a href="tel:0317771234"
              className="px-10 py-4 text-[13px] font-semibold transition-all"
              style={{ border: "1px solid rgba(240,240,240,0.15)", color: "rgba(240,240,240,0.55)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(240,240,240,0.4)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(240,240,240,0.15)")}
            >
              031-777-1234
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 md:px-14 py-7"
        style={{ background: "#060606", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.18)" }}>© 2026 Sejong Hoist &amp; Crane.</p>
        <div className="flex items-center gap-2 text-[12px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#e8721a" }} />
          Demo 1 — APEX
          <Link href="/demo" className="ml-4 hover:text-white/50 transition-colors">← 데모 목록</Link>
        </div>
      </footer>
    </div>
  );
}
