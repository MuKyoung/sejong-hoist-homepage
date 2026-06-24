"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ── 숫자 카운터 ── */
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctrl = animate(0, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1] as any,
      onUpdate: v => setVal(Math.floor(v)),
    });
    return () => ctrl.stop();
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

/* ── 패럴랙스 섹션 래퍼 ── */
function ParallaxSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"] as [string, string]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

const PRODUCTS = [
  {
    num: "01",
    code: "OC",
    name: "천장크레인",
    en: "Overhead Crane",
    tagline: "정밀함이 힘이 된다",
    spec: [
      ["최대 하중", "500 T"],
      ["최대 스팬", "40 m"],
      ["양정", "최대 50 m"],
      ["속도", "100 m/min"],
    ],
    img: "/images/sejong_2.png",
    accent: "#f47c20",
  },
  {
    num: "02",
    code: "GC",
    name: "갠트리크레인",
    en: "Gantry Crane",
    tagline: "한계 없는 작업 공간",
    spec: [
      ["최대 하중", "1,000 T"],
      ["스팬", "최대 60 m"],
      ["양정", "30 m"],
      ["방식", "레일 / 타이어"],
    ],
    img: "/images/sejong_3.png",
    accent: "#7eb3f7",
  },
  {
    num: "03",
    code: "HO",
    name: "호이스트",
    en: "Electric Hoist",
    tagline: "작지만 강한 정밀함",
    spec: [
      ["최대 하중", "50 T"],
      ["양정", "30 m"],
      ["종류", "체인 / 와이어"],
      ["구동", "전동 / 수동"],
    ],
    img: "/images/sejong_1.png",
    accent: "#a8d8a8",
  },
  {
    num: "04",
    code: "SP",
    name: "특수크레인",
    en: "Special Crane",
    tagline: "불가능한 조건은 없다",
    spec: [
      ["종류", "방폭 / 클린룸"],
      ["적용", "반도체 / 원자력"],
      ["인증", "KS · ISO · 방폭"],
      ["설계", "완전 맞춤형"],
    ],
    img: "/images/sejong_4.png",
    accent: "#f4b942",
  },
];

const STATS = [
  { val: 40, suffix: "+", label: "Years", sub: "40년 이상 업력" },
  { val: 523, suffix: "+", label: "Projects", sub: "누적 납품 실적" },
  { val: 200, suffix: "T", label: "Max Load", sub: "최대 제작 하중" },
  { val: 94, suffix: "+", label: "Clients", sub: "국내외 고객사" },
];

const WORKS = [
  { title: "한국수력원자력 월성 원전", cat: "특수크레인 · 30T", year: "2025", img: "/images/sejong_2.png" },
  { title: "삼성전자 평택 반도체공장", cat: "클린룸 크레인 · 10T", year: "2024", img: "/images/sejong_1.png" },
  { title: "POSCO 광양 제철소", cat: "천장크레인 · 200T", year: "2025", img: "/images/sejong_3.png" },
  { title: "현대제철 당진 스틸센터", cat: "갠트리크레인 · 100T", year: "2023", img: "/images/sejong_4.png" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ease = [0.16, 1, 0.3, 1] as any;
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function PrestigeDemo() {
  const [activeProduct, setActiveProduct] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <Link href="/">
          <Image src="/images/sejong-logo.png" alt="SEJONG" width={120} height={30} className="h-7 w-auto brightness-0 invert" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.15em] uppercase text-white/50">
          {["제품", "납품실적", "회사소개", "문의"].map(m => (
            <a key={m} href="#" className="hover:text-white transition-colors">{m}</a>
          ))}
        </div>
        <a href="/support/inquiry" className="text-[11px] tracking-[0.15em] uppercase border border-[#f47c20]/60 text-[#f47c20] px-4 py-2 hover:bg-[#f47c20] hover:text-black transition-all duration-300">
          견적 요청
        </a>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/images/sejong_3.png" alt="hero" fill className="object-cover brightness-[0.3]" priority />
        </motion.div>
        {/* 그레인 텍스처 */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-6 md:px-14 pb-20 md:pb-28 w-full">
          <motion.p
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[#f47c20] text-[10px] tracking-[0.35em] uppercase mb-6"
          >
            SEJONG HOIST &amp; CRANE — EST. 1984
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white leading-[0.9] font-black mb-6"
            style={{ fontSize: "clamp(4rem, 12vw, 9rem)", letterSpacing: "-0.03em" }}
          >
            POWER<br />
            <span className="text-white/20">BEYOND</span><br />
            MEASURE
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap items-center gap-6 text-white/30 text-sm"
          >
            <span>최대 하중 <strong className="text-white">200T</strong></span>
            <span className="w-px h-4 bg-white/20" />
            <span>누적 납품 <strong className="text-white">523+</strong>건</span>
            <span className="w-px h-4 bg-white/20" />
            <span>업력 <strong className="text-white">40</strong>년</span>
          </motion.div>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="absolute right-8 md:right-14 bottom-10 flex flex-col items-center gap-2 z-10"
        >
          <div className="relative w-px h-16 bg-white/10 overflow-hidden">
            <motion.div
              className="absolute top-0 w-full bg-[#f47c20]"
              style={{ height: "40%" }}
              animate={{ y: ["0%", "250%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/30">Scroll</span>
        </motion.div>
      </section>

      {/* ── 제품 탐색 ── */}
      <section className="py-8 border-y border-white/5 overflow-x-auto">
        <div className="flex min-w-max md:justify-center gap-0">
          {PRODUCTS.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveProduct(i)}
              className={`px-8 py-5 text-left transition-all duration-300 border-r border-white/5 last:border-r-0 group ${activeProduct === i ? "bg-white/5" : "hover:bg-white/3"}`}
            >
              <p className={`text-[9px] tracking-[0.2em] uppercase mb-1 transition-colors ${activeProduct === i ? "text-[#f47c20]" : "text-white/30 group-hover:text-white/50"}`}>
                {p.num} / {p.code}
              </p>
              <p className={`font-semibold text-sm transition-colors ${activeProduct === i ? "text-white" : "text-white/50"}`}>
                {p.name}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ── 제품 상세 ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={i}
            animate={{ opacity: activeProduct === i ? 1 : 0, x: activeProduct === i ? 0 : 60 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 flex flex-col md:flex-row ${activeProduct === i ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            {/* 왼쪽: 이미지 */}
            <div className="relative w-full md:w-7/12 h-64 md:h-auto overflow-hidden">
              <Image src={p.img} alt={p.name} fill className="object-cover brightness-50" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] hidden md:block" />
              {/* 번호 오버레이 */}
              <p className="absolute top-8 left-8 text-white/5 font-black leading-none select-none"
                style={{ fontSize: "clamp(8rem, 20vw, 16rem)" }}>
                {p.num}
              </p>
            </div>

            {/* 오른쪽: 콘텐츠 */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-12">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: p.accent }}>
                {p.en}
              </p>
              <h2 className="text-4xl md:text-6xl font-black mb-2" style={{ letterSpacing: "-0.03em" }}>
                {p.name}
              </h2>
              <p className="text-white/40 text-lg mb-10">{p.tagline}</p>

              {/* 스펙 */}
              <div className="grid grid-cols-2 gap-0 mb-12 border border-white/10">
                {p.spec.map(([k, v], si) => (
                  <div key={si} className={`px-5 py-4 border-white/10 ${si % 2 === 0 ? "border-r" : ""} ${si < 2 ? "border-b" : ""}`}>
                    <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">{k}</p>
                    <p className="text-white font-bold text-lg">{v}</p>
                  </div>
                ))}
              </div>

              <a href="/business" className="inline-flex items-center gap-3 text-sm font-semibold group w-fit" style={{ color: p.accent }}>
                <span className="h-px w-8 transition-all duration-300 group-hover:w-16" style={{ background: p.accent }} />
                자세히 보기
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── STATS ── */}
      <motion.section
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        className="py-24 grid grid-cols-2 md:grid-cols-4 border-t border-white/5"
      >
        {STATS.map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="px-8 md:px-12 py-10 border-r border-white/5 last:border-r-0 text-center group hover:bg-white/3 transition-colors">
            <p className="text-5xl md:text-7xl font-black mb-2 tabular-nums" style={{ letterSpacing: "-0.04em" }}>
              <Counter to={s.val} suffix={s.suffix} />
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-1">{s.label}</p>
            <p className="text-white/50 text-sm">{s.sub}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* ── SELECTED WORKS ── */}
      <section className="px-6 md:px-14 py-24 border-t border-white/5">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[#f47c20] text-[10px] tracking-[0.3em] uppercase mb-4">Selected Works</p>
              <h2 className="text-3xl md:text-5xl font-black" style={{ letterSpacing: "-0.03em" }}>
                현장에서<br />증명된 결과
              </h2>
            </div>
            <Link href="/portfolio" className="hidden md:block text-white/30 hover:text-white text-sm transition-colors">
              전체 보기 →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {WORKS.map((w, i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: i === 0 ? "16/9" : "16/9" }}
              >
                <ParallaxSection className="absolute inset-[-10%]">
                  <Image src={w.img} alt={w.title} fill className="object-cover brightness-50 group-hover:brightness-40 transition-all duration-700 scale-110" />
                </ParallaxSection>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">{w.cat} · {w.year}</p>
                  <h3 className="text-white font-bold text-lg md:text-xl group-hover:text-[#f47c20] transition-colors">{w.title}</h3>
                </div>
                <div className="absolute top-6 right-6 text-white/0 group-hover:text-white/60 transition-all duration-300 text-sm">
                  →
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 px-6 md:px-14 flex flex-col items-center text-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(244,124,32,0.08)_0%,_transparent_70%)]" />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p variants={fadeUp} className="text-[#f47c20] text-[10px] tracking-[0.3em] uppercase mb-6">Get In Touch</motion.p>
          <motion.h2 variants={fadeUp} className="text-white font-black mb-6" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.03em" }}>
            크레인 도입을<br />계획하고 계신가요?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/40 text-base mb-12 max-w-lg mx-auto leading-relaxed">
            40년의 경험을 가진 전문 엔지니어가<br />현장 조건에 맞는 최적의 솔루션을 제안합니다.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <a href="/support/inquiry" className="px-10 py-4 bg-[#f47c20] text-black font-bold text-sm hover:bg-[#d96a10] transition-colors">
              무료 견적 요청
            </a>
            <a href="tel:0317771234" className="px-10 py-4 border border-white/20 text-white font-bold text-sm hover:border-white/50 transition-colors">
              031-777-1234
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 md:px-14 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs">
        <p>© 2026 SEJONG HOIST &amp; CRANE. All rights reserved.</p>
        <div className="flex gap-2 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f47c20] animate-pulse" />
          <span>Demo 1 — PRESTIGE DARK</span>
          <Link href="/demo" className="ml-4 hover:text-white transition-colors">← 다른 데모 보기</Link>
        </div>
      </footer>
    </div>
  );
}
