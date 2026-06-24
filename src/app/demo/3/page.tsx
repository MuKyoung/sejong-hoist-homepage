"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ── 텍스트 리빌 ── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── 이미지 패럴랙스 ── */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y, height: "116%", top: "-8%" }} className="relative w-full">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}

const PRODUCTS = [
  {
    num: "01",
    name: "천장크레인",
    en: "Overhead Crane",
    story: "단순히 물건을 들어올리는 장치가 아닙니다. 세종의 천장크레인은 반도체 공장의 0.1μm 정밀도부터 200T 중량물까지, 산업의 심장 박동을 지탱합니다.",
    detail: "1984년 첫 납품 이후, 삼성전자 · POSCO · 한국수력원자력 등 국내 핵심 산업 현장 348개소에 설치되어 지금 이 순간도 가동 중입니다.",
    img: "/images/sejong_2.png",
    stat: ["348개소 납품", "최대 500T 제작", "정밀도 ±1mm"],
  },
  {
    num: "02",
    name: "갠트리크레인",
    en: "Gantry Crane",
    story: "야외의 혹독한 환경, 바람과 진동, 극한의 하중. 세종의 갠트리크레인은 어떤 조건에서도 흔들리지 않습니다.",
    detail: "조선소의 선박 블록부터 수력발전소의 수문 설치까지. 175건의 납품 실적이 우리의 역량을 말합니다.",
    img: "/images/sejong_3.png",
    stat: ["175건 납품", "최대 1,000T", "내풍 설계"],
  },
];

const NUMBERS = [
  { val: "40", unit: "년", label: "창립 이래의 업력\n그리고 계속되는 혁신" },
  { val: "523", unit: "+", label: "산업현장에 공급된\n세종의 크레인 수" },
  { val: "94", unit: "곳", label: "신뢰를 보내준\n고객사의 수" },
  { val: "24", unit: "H", label: "언제나 열려있는\nAS 지원 체계" },
];

const JOURNAL = [
  {
    date: "Jun 2026",
    title: "반도체 클린룸 크레인, 세계 최고 수준의 진동 제어 달성",
    tag: "기술",
  },
  {
    date: "May 2026",
    title: "200T 천장크레인 — 국내 최대 규모 당진 발전소 준공",
    tag: "납품",
  },
  {
    date: "Apr 2026",
    title: "산업통상자원부 장관 표창 수상",
    tag: "수상",
  },
];

export default function CraftDemo() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }} className="bg-[#f7f4f0] text-[#1a1a1a] overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f4f0]/90 backdrop-blur-sm border-b border-[#1a1a1a]/8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 flex items-center justify-between h-16">
          <Link href="/">
            <Image src="/images/sejong-logo.png" alt="SEJONG" width={130} height={32} className="h-7 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.1em] text-[#1a1a1a]/50" style={{ fontFamily: "system-ui, sans-serif" }}>
            {["회사소개", "제품", "납품실적", "문의"].map(m => (
              <a key={m} href="#" className="hover:text-[#1a1a1a] transition-colors">{m}</a>
            ))}
          </div>
          <a href="/support/inquiry" className="text-[11px] font-bold tracking-[0.12em] uppercase border-b border-[#1a1a1a]/40 hover:border-[#c4a46b] hover:text-[#c4a46b] transition-all pb-px" style={{ fontFamily: "system-ui, sans-serif" }}>
            상담 예약
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image src="/images/sejong_1.png" alt="hero" fill className="object-cover brightness-[0.45]" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f4f0]/20 via-transparent to-[#f7f4f0]/80" />

        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex flex-col justify-end px-6 md:px-20 pb-20">
          <div className="max-w-3xl">
            <Reveal delay={0.3}>
              <p className="text-white/50 text-xs tracking-[0.35em] uppercase mb-5" style={{ fontFamily: "system-ui, sans-serif" }}>
                SEJONG HOIST &amp; CRANE — SINCE 1984
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <h1 className="text-white leading-[1.0] font-normal mb-4"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", letterSpacing: "-0.02em" }}>
                산업의 심장,
              </h1>
            </Reveal>
            <Reveal delay={0.55}>
              <h1 className="text-[#c4a46b] leading-[1.0] font-normal mb-8"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", letterSpacing: "-0.02em" }}>
                크레인을 만드는 기업.
              </h1>
            </Reveal>
            <Reveal delay={0.7}>
              <p className="text-white/50 text-base leading-relaxed max-w-lg" style={{ fontFamily: "system-ui, sans-serif" }}>
                반도체 공장의 정밀함부터 발전소의 무게까지.<br />
                40년의 기술이 오늘도 산업현장에서 가동됩니다.
              </p>
            </Reveal>
          </div>
        </motion.div>

        {/* 스크롤 힌트 */}
        <div className="absolute bottom-8 right-10 text-white/30 text-xs tracking-[0.25em] uppercase hidden md:flex items-center gap-3" style={{ fontFamily: "system-ui, sans-serif" }}>
          <span>Scroll to explore</span>
          <span className="text-lg">↓</span>
        </div>
      </section>

      {/* ── 브랜드 스테이트먼트 ── */}
      <section className="py-24 md:py-36 px-6 md:px-20 max-w-[1400px] mx-auto">
        <Reveal>
          <p className="text-[#c4a46b] text-xs tracking-[0.3em] uppercase mb-10" style={{ fontFamily: "system-ui, sans-serif" }}>
            Our Story
          </p>
        </Reveal>
        <div className="max-w-4xl">
          {[
            "세종호이스트크레인은",
            "단순한 제조사가 아닙니다.",
            <span key="gold" style={{ color: "#c4a46b" }}>산업현장의 파트너입니다.</span>,
          ].map((line, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <p className="font-normal leading-[1.1] mb-2"
                style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", letterSpacing: "-0.02em" }}>
                {line}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.5}>
            <p className="text-[#1a1a1a]/50 text-base leading-relaxed mt-10 max-w-2xl" style={{ fontFamily: "system-ui, sans-serif" }}>
              1984년 창립 이래 40년. 우리는 고객의 현장을 먼저 이해하고, 그 이해를 기술로 구현합니다. 523개의 납품 실적은 단순한 숫자가 아니라, 523개의 신뢰 관계입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 구분선 ── */}
      <div className="px-6 md:px-20">
        <div className="max-w-[1400px] mx-auto border-t border-[#1a1a1a]/10" />
      </div>

      {/* ── 제품 스토리 ── */}
      {PRODUCTS.map((p, i) => (
        <section key={i} className={`py-20 md:py-28 px-6 md:px-20 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
          {/* 이미지 */}
          <motion.div
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}
            style={{ aspectRatio: "4/3" }}
          >
            <ParallaxImage src={p.img} alt={p.name} />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#f7f4f0] to-transparent" />
          </motion.div>

          {/* 텍스트 */}
          <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
            <Reveal>
              <p className="text-[#c4a46b] text-xs tracking-[0.3em] uppercase mb-5" style={{ fontFamily: "system-ui, sans-serif" }}>
                {p.num} / {p.en}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-normal leading-tight mb-6"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}>
                {p.name}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[#1a1a1a]/60 text-base leading-relaxed mb-6" style={{ fontFamily: "system-ui, sans-serif" }}>
                {p.story}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-[#1a1a1a]/40 text-sm leading-relaxed mb-8" style={{ fontFamily: "system-ui, sans-serif" }}>
                {p.detail}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-3 mb-8">
                {p.stat.map((s, si) => (
                  <span key={si} className="border border-[#1a1a1a]/15 text-[#1a1a1a]/50 text-[11px] px-3 py-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <a href="/business" className="inline-flex items-center gap-3 text-sm text-[#1a1a1a]/60 hover:text-[#c4a46b] transition-colors" style={{ fontFamily: "system-ui, sans-serif" }}>
                <span className="h-px w-8 bg-current" />
                자세히 보기
              </a>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ── 포트폴리오 ── */}
      <section className="py-20 px-6 md:px-20 bg-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <p className="text-[#c4a46b] text-xs tracking-[0.3em] uppercase mb-8" style={{ fontFamily: "system-ui, sans-serif" }}>
              Selected Works
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {[
              { img: "/images/sejong_1.png", client: "삼성전자", type: "클린룸 크레인" },
              { img: "/images/sejong_2.png", client: "한국수력원자력", type: "특수 천장크레인" },
              { img: "/images/sejong_3.png", client: "GS칼텍스", type: "갠트리크레인" },
              { img: "/images/sejong_4.png", client: "현대제철", type: "이중거더 천장크레인" },
            ].map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="relative group overflow-hidden"
                style={{ aspectRatio: "3/4" }}
              >
                <Image src={w.img} alt={w.client} fill className="object-cover brightness-60 group-hover:brightness-40 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>{w.type}</p>
                  <p className="text-white font-normal text-sm md:text-base">{w.client}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/portfolio" className="text-white/30 hover:text-[#c4a46b] text-sm transition-colors" style={{ fontFamily: "system-ui, sans-serif" }}>
              납품실적 전체 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 숫자 ── */}
      <section className="py-24 px-6 md:px-20 max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#1a1a1a]/10">
        {NUMBERS.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="md:px-10 first:pl-0 last:pr-0 text-center md:text-left"
          >
            <p className="font-normal leading-none mb-2" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}>
              {n.val}<span className="text-[#c4a46b]">{n.unit}</span>
            </p>
            <p className="text-[#1a1a1a]/40 text-sm leading-relaxed" style={{ whiteSpace: "pre-line", fontFamily: "system-ui, sans-serif" }}>
              {n.label}
            </p>
          </motion.div>
        ))}
      </section>

      {/* ── 저널 ── */}
      <section className="py-20 px-6 md:px-20 border-t border-[#1a1a1a]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <Reveal>
              <h2 className="font-normal" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}>
                세종 저널
              </h2>
            </Reveal>
            <Link href="/support/notice" className="text-[#1a1a1a]/40 hover:text-[#c4a46b] text-xs uppercase tracking-[0.15em] transition-colors hidden md:block" style={{ fontFamily: "system-ui, sans-serif" }}>
              전체 보기 →
            </Link>
          </div>
          <div className="space-y-0 border-t border-[#1a1a1a]/10">
            {JOURNAL.map((j, i) => (
              <motion.a
                key={i} href="/support/notice"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col md:flex-row md:items-center justify-between py-7 border-b border-[#1a1a1a]/10 hover:pl-2 transition-all duration-300 group"
              >
                <div className="flex items-center gap-6 mb-2 md:mb-0">
                  <span className="text-[#1a1a1a]/25 text-xs tracking-[0.1em] w-20 flex-shrink-0" style={{ fontFamily: "system-ui, sans-serif" }}>{j.date}</span>
                  <span className="text-[#1a1a1a] font-normal group-hover:text-[#c4a46b] transition-colors"
                    style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)" }}>
                    {j.title}
                  </span>
                </div>
                <span className="text-[#1a1a1a]/30 text-[10px] uppercase tracking-wider ml-0 md:ml-6 flex-shrink-0" style={{ fontFamily: "system-ui, sans-serif" }}>{j.tag}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 md:px-20 bg-[#1a1a1a] text-center">
        <Reveal>
          <p className="text-[#c4a46b] text-xs tracking-[0.3em] uppercase mb-8" style={{ fontFamily: "system-ui, sans-serif" }}>
            문의하기
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-white font-normal mb-6 leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.025em" }}>
            크레인에 대해<br />이야기해 드릴게요.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-white/30 text-base mb-12 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
            어떤 규모의 프로젝트든, 어떤 특수한 조건이든.<br />세종호이스트크레인이 함께합니다.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <a href="/support/inquiry"
            className="inline-flex items-center gap-4 text-white border-b border-white/30 hover:border-[#c4a46b] hover:text-[#c4a46b] pb-1 transition-all duration-300 text-base"
            style={{ fontFamily: "system-ui, sans-serif" }}>
            상담 예약하기 →
          </a>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1a1a1a]/10 bg-[#f7f4f0] px-6 md:px-20 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[#1a1a1a]/30 text-xs">
        <p style={{ fontFamily: "system-ui, sans-serif" }}>© 2026 SEJONG HOIST &amp; CRANE. All rights reserved.</p>
        <div className="flex items-center gap-2" style={{ fontFamily: "system-ui, sans-serif" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c4a46b] animate-pulse" />
          <span>Demo 3 — EDITORIAL CRAFT</span>
          <Link href="/demo" className="ml-4 hover:text-[#1a1a1a] transition-colors">← 다른 데모 보기</Link>
        </div>
      </footer>
    </div>
  );
}
