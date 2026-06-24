"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion, useInView, useScroll, useTransform,
  useSpring, useMotionValue, animate, AnimatePresence
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─── DESIGN TOKENS ───────────────────────────────────────────────────── */
// 배경: #080808, 텍스트: #ebebeb, 포인트: #f47c20 (최소 사용)
// 타이포: clamp 기반 유체 스케일, 간격: 8px 기반 그리드

/* ─── 공유 훅 ─── */
function useScrollReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  return { ref, inView };
}

/* ─── 숫자 카운터 (spring) ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);
  const { ref, inView } = useScrollReveal();

  useEffect(() => {
    if (!inView) return;
    motionVal.set(to);
  }, [inView, to, motionVal]);

  useEffect(() => spring.on("change", v => setDisplay(Math.floor(v))), [spring]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

/* ─── 단어 단위 텍스트 리빌 ─── */
function WordReveal({
  children, className = "", delay = 0,
}: { children: string; className?: string; delay?: number }) {
  const words = children.split(" ");
  const { ref, inView } = useScrollReveal();
  return (
    <span ref={ref} className={`inline ${className}`} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ lineHeight: "inherit" }}>
          <motion.span
            className="inline-block"
            initial={{ y: "108%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.85, delay: delay + i * 0.065, ease: [0.16, 1, 0.3, 1] as never }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

/* ─── 이미지 패럴랙스 ─── */
function ParallaxImg({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-12%] w-[112%] h-[112%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}

/* ─── 데이터 ─── */
const PRODUCTS = [
  {
    num: "01", name: "천장크레인", en: "Overhead Crane",
    headline: "정밀함이\n힘이 된다",
    body: "반도체 클린룸의 0.1μm 진동 제어부터 200T 중량물까지. 세종의 천장크레인은 대한민국 산업 핵심 현장 348개소에서 가동 중입니다.",
    specs: [["최대 하중", "500 T"], ["최대 스팬", "40 m"], ["양정", "50 m max"], ["납품", "348건"]],
    img: "/images/sejong_2.png",
  },
  {
    num: "02", name: "갠트리크레인", en: "Gantry Crane",
    headline: "한계 없는\n작업 공간",
    body: "야외의 혹독한 환경, 바람과 극한의 하중. 조선소 선박 블록 탑재부터 수력발전소 수문 설치까지 175건이 입증합니다.",
    specs: [["최대 하중", "1,000 T"], ["스팬", "60 m max"], ["방식", "레일 / 타이어"], ["납품", "175건"]],
    img: "/images/sejong_3.png",
  },
  {
    num: "03", name: "호이스트", en: "Electric Hoist",
    headline: "작지만\n강한 정밀함",
    body: "전동 체인호이스트부터 와이어로프 호이스트까지. 세밀하고 안정적인 작동으로 250건 이상의 현장에서 신뢰를 쌓았습니다.",
    specs: [["최대 하중", "50 T"], ["양정", "30 m"], ["종류", "체인 / 와이어"], ["납품", "250건+"]],
    img: "/images/sejong_1.png",
  },
  {
    num: "04", name: "특수크레인", en: "Special Crane",
    headline: "불가능한\n조건은 없다",
    body: "방폭형, 클린룸형, 원자력용. 일반 크레인이 들어갈 수 없는 곳에 세종의 특수크레인이 있습니다. 완전 맞춤 설계.",
    specs: [["종류", "방폭 / 클린룸"], ["적용", "반도체 / 원자력"], ["인증", "ISO · 방폭 · KGS"], ["납품", "92건"]],
    img: "/images/sejong_4.png",
  },
];

const STATS = [
  { val: 40, suffix: "+", label: "Years", desc: "1984년 창립 이래" },
  { val: 523, suffix: "", label: "Projects", desc: "누적 납품 실적" },
  { val: 200, suffix: "T", label: "Max Load", desc: "최대 제작 하중" },
  { val: 94, suffix: "+", label: "Clients", desc: "국내외 고객사" },
];

const WORKS = [
  { client: "한국수력원자력", type: "원자력 특수크레인", spec: "30T · 2025", img: "/images/sejong_2.png" },
  { client: "삼성전자 평택", type: "클린룸 천장크레인", spec: "10T · 2024", img: "/images/sejong_1.png" },
  { client: "POSCO 광양", type: "이중거더 천장크레인", spec: "200T · 2025", img: "/images/sejong_3.png" },
  { client: "현대제철 당진", type: "갠트리크레인", spec: "100T · 2023", img: "/images/sejong_4.png" },
];

/* ─── 플로팅 제품 인디케이터 ─── */
function ProductIndicator({ active }: { active: number }) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3">
      {PRODUCTS.map((p, i) => (
        <div key={i} className="flex items-center gap-2.5 group justify-end">
          <motion.span
            animate={{ opacity: active === i ? 0.9 : 0.2, x: active === i ? 0 : 10 }}
            className="text-white text-[10px] font-mono tracking-wider"
          >
            {p.num}
          </motion.span>
          <motion.div
            animate={{ width: active === i ? 24 : 8, backgroundColor: active === i ? "#f47c20" : "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.3 }}
            className="h-px"
          />
        </div>
      ))}
    </div>
  );
}

/* ─── 메인 ─── */
export default function PrestigeDemo() {
  const [activeProduct, setActiveProduct] = useState(0);
  const productRefs = useRef<(HTMLElement | null)[]>([]);

  // 스크롤로 현재 제품 추적
  const handleScroll = useCallback(() => {
    const vh = window.innerHeight;
    productRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.5 && rect.bottom > vh * 0.5) setActiveProduct(i);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.04]);

  return (
    <div className="min-h-screen font-sans" style={{ background: "#080808", color: "#ebebeb" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 h-[68px]"
        style={{ background: "rgba(8,8,8,0.8)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/">
          <Image src="/images/sejong-logo.png" alt="SEJONG" width={110} height={26} className="h-6 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {["Products", "Work", "About"].map(m => (
            <a key={m} href="#" className="text-[13px] text-white/40 hover:text-white/80 transition-colors tracking-wide">{m}</a>
          ))}
        </div>
        <a href="/support/inquiry"
          className="text-[12px] font-semibold tracking-wide px-5 py-2.5 transition-all"
          style={{ background: "#f47c20", color: "#080808" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e06810")}
          onMouseLeave={e => (e.currentTarget.style.background = "#f47c20")}
        >
          무료 견적
        </a>
      </nav>

      <ProductIndicator active={activeProduct} />

      {/* HERO */}
      <motion.section ref={heroRef} className="relative h-screen flex flex-col justify-end pb-20 md:pb-28 px-8 md:px-16 overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image src="/images/sejong_3.png" alt="hero" fill className="object-cover" style={{ filter: "brightness(0.18)" }} priority />
        </motion.div>
        {/* 결 텍스처 오버레이 */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 70%, rgba(244,124,32,0.06) 0%, transparent 60%)" }} />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1600px]">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mb-6 text-[11px] font-mono tracking-[0.35em] uppercase"
            style={{ color: "#f47c20" }}
          >
            Sejong Hoist &amp; Crane — Est. 1984
          </motion.p>

          <h1 className="leading-[0.88] font-black mb-8 overflow-hidden" style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)", letterSpacing: "-0.04em" }}>
            {["POWER", "BEYOND", "MEASURE"].map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.0, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] as never }}
                  style={{ color: i === 1 ? "rgba(235,235,235,0.14)" : "#ebebeb" }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10"
          >
            <p className="text-[15px] md:text-base leading-relaxed max-w-sm" style={{ color: "rgba(235,235,235,0.4)" }}>
              최대 하중 <strong className="text-white">200T</strong> · 누적 납품 <strong className="text-white">523</strong>건<br />
              대한민국 산업현장이 선택한 크레인
            </p>
            <a href="/business" className="group inline-flex items-center gap-3 text-[13px] font-semibold tracking-wide"
              style={{ color: "#f47c20" }}>
              <span className="h-px transition-all duration-300 group-hover:w-14" style={{ width: 32, background: "#f47c20" }} />
              제품 보기
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>→</motion.span>
            </a>
          </motion.div>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <div className="relative overflow-hidden" style={{ width: 1, height: 60, background: "rgba(255,255,255,0.1)" }}>
            <motion.div
              className="absolute top-0 w-full"
              style={{ height: "40%", background: "rgba(255,255,255,0.7)" }}
              animate={{ y: ["0%", "260%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Scroll</span>
        </motion.div>
      </motion.section>

      {/* PRODUCT SECTIONS */}
      {PRODUCTS.map((p, i) => (
        <section
          key={p.num}
          ref={el => { productRefs.current[i] = el; }}
          className="relative flex flex-col lg:flex-row"
          style={{ minHeight: "100svh" }}
        >
          {/* 이미지 */}
          <div className={`w-full lg:w-3/5 ${i % 2 === 1 ? "lg:order-2" : ""}`} style={{ minHeight: "50vh" }}>
            <ParallaxImg src={p.img} alt={p.name} className="w-full h-full" />
          </div>

          {/* 텍스트 */}
          <div
            className={`flex-1 flex flex-col justify-center px-8 md:px-14 xl:px-20 py-20 md:py-28 ${i % 2 === 1 ? "lg:order-1" : ""}`}
            style={{ background: "#080808" }}
          >
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 font-mono text-[11px] tracking-[0.25em]"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {p.num} / {p.en.toUpperCase()}
            </motion.p>

            <h2 className="font-black leading-[0.93] mb-8" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", letterSpacing: "-0.035em", whiteSpace: "pre-line" }}>
              <WordReveal>{p.headline.replace("\n", " ")}</WordReveal>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[15px] md:text-base leading-[1.75] mb-12 max-w-sm"
              style={{ color: "rgba(235,235,235,0.45)" }}
            >
              {p.body}
            </motion.p>

            {/* 스펙 그리드 - 선 없이 공백으로만 구분 */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-x-10 gap-y-7 mb-14"
            >
              {p.specs.map(([k, v]) => (
                <div key={k}>
                  <p className="text-[11px] mb-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>{k}</p>
                  <p className="text-lg font-semibold" style={{ color: "#ebebeb" }}>{v}</p>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="/business"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="group inline-flex items-center gap-3 text-[13px] font-semibold w-fit"
              style={{ color: "#f47c20" }}
            >
              <span className="h-px transition-all duration-400 group-hover:w-14" style={{ width: 28, background: "#f47c20" }} />
              자세히 보기
            </motion.a>
          </div>
        </section>
      ))}

      {/* STATS — 선 없이 순수 타이포그래피 */}
      <section className="py-28 md:py-40 px-8 md:px-16" style={{ background: "#080808" }}>
        <div className="max-w-[1600px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono tracking-[0.3em] uppercase mb-20"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            By the numbers
          </motion.p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <p className="font-black mb-3 leading-none tabular-nums"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)", letterSpacing: "-0.04em", color: "#ebebeb" }}>
                  <Counter to={s.val} suffix={s.suffix} />
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(255,255,255,0.22)" }}>{s.label}</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORKS */}
      <section className="py-28 md:py-40 px-8 md:px-16" style={{ background: "#0d0d0d" }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-[11px] font-mono tracking-[0.3em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Selected Works
              </motion.p>
              <h2 className="font-black leading-[0.93]" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.035em" }}>
                <WordReveal>현장에서 증명된 결과</WordReveal>
              </h2>
            </div>
            <Link href="/portfolio"
              className="hidden md:flex items-center gap-2 text-[13px] transition-opacity hover:opacity-60"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              전체 보기 →
            </Link>
          </div>

          {/* 비대칭 그리드: 첫 번째는 더 큰 비율 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="md:col-span-3 relative group cursor-pointer overflow-hidden"
              style={{ aspectRatio: "16/10" }}
            >
              <Image src={WORKS[0].img} alt={WORKS[0].client} fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "brightness(0.55)" }} />
              <div className="absolute inset-0 transition-all duration-500 group-hover:opacity-50"
                style={{ background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 55%)" }} />
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                <p className="text-[11px] font-mono tracking-wider mb-2.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {WORKS[0].type} · {WORKS[0].spec}
                </p>
                <p className="font-bold text-xl md:text-2xl transition-colors group-hover:text-[#f47c20]">{WORKS[0].client}</p>
              </div>
            </motion.div>

            <div className="md:col-span-2 grid grid-rows-3 gap-3">
              {WORKS.slice(1).map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 + i * 0.08 }}
                  className="relative group cursor-pointer overflow-hidden"
                >
                  <Image src={w.img} alt={w.client} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.5)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 50%)" }} />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-[10px] font-mono tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {w.type}
                    </p>
                    <p className="font-semibold text-sm transition-colors group-hover:text-[#f47c20]">{w.client}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-36 md:py-52 px-8 md:px-16 overflow-hidden" style={{ background: "#080808" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(244,124,32,0.06) 0%, transparent 65%)" }} />
        <div className="relative max-w-[1600px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[11px] font-mono tracking-[0.3em] uppercase mb-8"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Get in Touch
          </motion.p>
          <h2 className="font-black leading-[0.92] mb-12" style={{ fontSize: "clamp(3.5rem, 11vw, 9.5rem)", letterSpacing: "-0.04em" }}>
            <WordReveal delay={0.1}>크레인 도입을</WordReveal>
            <br />
            <WordReveal delay={0.3} className="text-white/20">계획하고 계신가요?</WordReveal>
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a href="/support/inquiry"
              className="px-10 py-4 text-[13px] font-bold tracking-wide transition-all hover:opacity-80"
              style={{ background: "#f47c20", color: "#080808" }}
            >
              무료 상담 신청
            </a>
            <a href="tel:0317771234"
              className="px-10 py-4 text-[13px] font-semibold tracking-wide transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
            >
              031-777-1234
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#080808" }}>
        <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          © 2026 Sejong Hoist &amp; Crane. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-[12px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#f47c20" }} />
          Demo 1 — PRESTIGE
          <Link href="/demo" className="ml-4 hover:text-white/50 transition-colors">← 데모 목록</Link>
        </div>
      </footer>
    </div>
  );
}
