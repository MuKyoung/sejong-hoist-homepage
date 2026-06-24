"use client";

/**
 * DEMO 3: ATELIER — 에디토리얼 마스터크래프트
 * Hermès × Aesop × Liebherr × Shinsegae Lifestyle
 *
 * 설계 원칙:
 * - 크림 배경 (#f9f6f1) — 따뜻하고 고급스러운
 * - 세리프 헤드라인 (Georgia) + 산세리프 바디 (Pretendard)
 * - 금색 (#9b7840) 단 한 곳에만 — 가격 표시처럼 소중하게
 * - 사진이 텍스트보다 크다
 * - 애니메이션: ① 마스크 리빌  ② 패럴랙스  ③ 라인 드로  — 3가지만
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const E = [0.16, 1, 0.3, 1] as never;

/* ─── 마스크 리빌 (줄 단위) ─── */
function MaskReveal({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ y: "104%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 1.0, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── 패럴랙스 사진 ─── */
function Para({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y }} className="absolute inset-[-12%] w-[124%] h-[124%]">
        <Image src={src} alt={alt} fill className="object-cover"
          sizes="(max-width:768px)100vw,(max-width:1280px)60vw,50vw" />
      </motion.div>
    </div>
  );
}

/* ─── 데이터 ─── */
const MANIFESTO = [
  "크레인은 기계가 아닙니다.",
  "산업 문명을 받쳐드는",
  "손이자, 팔이자,",
  "의지입니다.",
];

const PRODUCTS = [
  {
    idx: "I", title: "천장크레인의\n정수",
    body: "반도체 공장의 0.1μm 공차, 발전소의 200T 중량물. 세종의 이중거더 천장크레인은 어느 조건에서도 흔들리지 않습니다.",
    note: "최대 하중 500T · 스팬 40m",
    img: "/images/sejong_2.png", count: "348건",
  },
  {
    idx: "II", title: "야외를 지배하는\n갠트리",
    body: "바람, 진동, 극한의 기후. 레일식과 타이어식, 두 가지 드라이브로 모든 야외 현장을 정복합니다.",
    note: "최대 하중 1,000T · 스팬 60m",
    img: "/images/sejong_3.png", count: "175건",
  },
  {
    idx: "III", title: "특수함이\n일상이 되다",
    body: "방폭, 클린룸, 원자력. 세상에서 가장 엄격한 환경이 세종의 기준입니다.",
    note: "ISO · KGS · 방폭 인증",
    img: "/images/sejong_4.png", count: "92건",
  },
];

const HERITAGE = [
  { year: "1984", event: "세종호이스트크레인 창립" },
  { year: "1997", event: "ISO 9001 최초 인증 취득" },
  { year: "2008", event: "클린룸 크레인 기술 자체 개발" },
  { year: "2016", event: "원자력 특수크레인 납품 개시" },
  { year: "2021", event: "스마트 원격제어 시스템 상용화" },
  { year: "2026", event: "창립 42주년 · 누적 523건 달성" },
];

/* ─── 메인 ─── */
export default function AtelierDemo() {
  /* 히어로 효과 */
  const heroRef = useRef(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroPara = useTransform(hp, [0, 1], ["0%", "20%"]);
  const heroOp   = useTransform(hp, [0, 0.7], [1, 0]);

  return (
    <div className="font-sans overflow-x-hidden" style={{ background: "#f9f6f1", color: "#111" }}>

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-7 md:px-16 h-16"
        style={{ background: "rgba(249,246,241,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(17,17,17,0.07)" }}>
        <Link href="/">
          <Image src="/images/sejong-logo.png" alt="SEJONG" width={110} height={26} className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity" />
        </Link>
        <nav className="hidden md:flex gap-8 text-[13px]" style={{ color: "rgba(17,17,17,0.4)" }}>
          {["철학", "제품", "공방", "연락"].map(m => (
            <a key={m} href="#" className="hover:text-black transition-colors">{m}</a>
          ))}
        </nav>
        <a href="/support/inquiry" className="text-[12px] font-semibold" style={{ color: "#9b7840" }}>
          상담 예약 →
        </a>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-end">
        <motion.div style={{ y: heroPara }} className="absolute inset-[-10%] w-[120%] h-[120%]">
          <Image src="/images/sejong_1.png" alt="hero" fill priority className="object-cover"
            style={{ filter: "brightness(0.35) saturate(0.7)" }} />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(17,12,6,0.92) 0%, rgba(17,12,6,0.3) 45%, transparent 75%)" }} />

        <motion.div style={{ opacity: heroOp }} className="relative z-10 px-7 md:px-16 pb-16 md:pb-28">
          {MANIFESTO.map((line, i) => (
            <MaskReveal key={i} delay={0.3 + i * 0.12}>
              <p
                className="block leading-[1.08] text-white"
                style={{
                  fontSize: "clamp(2.6rem,7.5vw,7rem)",
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  color: i >= 2 ? "rgba(255,255,255,0.38)" : "#fff",
                }}
              >
                {line}
              </p>
            </MaskReveal>
          ))}

          {/* 시그니처 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.9, ease: E }}
            className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10"
          >
            <div style={{ width: 60, height: 1, background: "#9b7840" }} />
            <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
              세종호이스트크레인 · 1984년 창립
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 제품 스토리 (교번: 사진 좌/우) */}
      {PRODUCTS.map((p, i) => (
        <section key={i} className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
          style={{ background: i % 2 === 1 ? "#16120c" : "#f9f6f1" }}>

          {/* 이미지 */}
          <Para src={p.img} alt={p.title.replace("\n", " ")} className="w-full lg:w-[52%] min-h-[52vh]" />

          {/* 텍스트 */}
          <div className={`flex-1 flex flex-col justify-center section-pad px-7 md:px-14 xl:px-20`}>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] mb-7 tracking-[0.25em]"
              style={{
                color: i % 2 === 1 ? "rgba(155,120,64,0.6)" : "rgba(17,17,17,0.28)",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              {p.idx}
            </motion.p>

            <MaskReveal className="mb-5">
              <h2 style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "clamp(2rem,5.5vw,4rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                whiteSpace: "pre-line",
                color: i % 2 === 1 ? "#f9f6f1" : "#111",
              }}>
                {p.title}
              </h2>
            </MaskReveal>

            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.22, ease: E }}
              className="text-[15px] leading-[1.85] mb-8 max-w-xs"
              style={{ color: i % 2 === 1 ? "rgba(249,246,241,0.42)" : "rgba(17,17,17,0.48)" }}
            >
              {p.body}
            </motion.p>

            {/* 스펙 라인 — 선 없이 들여쓰기로만 구분 */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.35 }}
              className="mb-10"
            >
              <p className="text-[13px]"
                style={{ color: "#9b7840", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                {p.note}
              </p>
              <p className="text-[12px] mt-2"
                style={{ color: i % 2 === 1 ? "rgba(249,246,241,0.25)" : "rgba(17,17,17,0.28)" }}>
                납품 실적 {p.count}
              </p>
            </motion.div>

            <motion.a
              href="/business"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="group flex items-center gap-4 w-fit text-[13px] font-medium"
              style={{ color: i % 2 === 1 ? "rgba(249,246,241,0.4)" : "rgba(17,17,17,0.4)" }}
            >
              <motion.span
                className="block h-px"
                style={{ background: "#9b7840", width: 28 }}
                whileHover={{ width: 56 }}
                transition={{ duration: 0.3 }}
              />
              자세히 읽기
            </motion.a>
          </div>
        </section>
      ))}

      {/* 헤리티지 타임라인 */}
      <section className="section-pad" style={{ background: "#f9f6f1" }}>
        <div className="container-xl">
          <MaskReveal className="mb-20">
            <h2 style={{
              fontFamily: "'Georgia','Times New Roman',serif",
              fontSize: "clamp(2.2rem,5.5vw,4.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "#111",
            }}>
              40년의 역사,<br />
              <span style={{ color: "rgba(17,17,17,0.22)" }}>523건의 이야기</span>
            </h2>
          </MaskReveal>

          <div className="relative pl-4">
            {/* 세로 라인 */}
            <LineReveal />
            <div className="space-y-0">
              {HERITAGE.map((h, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: i * 0.07, ease: E }}
                  className="flex gap-10 md:gap-20 pl-10 py-8"
                  style={{ borderBottom: "1px solid rgba(17,17,17,0.07)" }}
                >
                  <span className="text-[13px] font-mono shrink-0 w-10 pt-0.5" style={{ color: "#9b7840" }}>{h.year}</span>
                  <span className="text-[15px]" style={{ color: "rgba(17,17,17,0.7)" }}>{h.event}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 전체 화면 갤러리 */}
      <section className="h-[60vh] md:h-screen relative overflow-hidden">
        <Para src="/images/sejong_2.png" alt="공장 전경" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0" style={{ background: "rgba(22,18,12,0.45)" }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ ease: E }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <p className="text-white mb-6" style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem,6vw,5rem)",
            fontWeight: 400,
            lineHeight: 1.15,
          }}>
            현장에서 쌓은 신뢰,<br />
            <em>그것이 세종입니다.</em>
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            — 세종호이스트크레인, 1984
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: "#16120c" }}>
        <div className="container-xl flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <div className="max-w-md">
            <MaskReveal>
              <h2 style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2.2rem,5vw,4rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "#f9f6f1",
              }}>
                다음 프로젝트를<br />함께 설계하십시오.
              </h2>
            </MaskReveal>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="mt-6 text-[14px] leading-[1.8]"
              style={{ color: "rgba(249,246,241,0.38)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              아이디어 단계부터 함께합니다. 부담 없이 연락주십시오.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.35 }}
            className="flex flex-col gap-4"
          >
            <a href="/support/inquiry"
              className="px-12 py-4 text-[13px] font-medium text-center transition-all"
              style={{ background: "#9b7840", color: "#f9f6f1" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#7d6233")}
              onMouseLeave={e => (e.currentTarget.style.background = "#9b7840")}
            >
              상담 예약하기
            </a>
            <a href="tel:0317771234"
              className="px-12 py-4 text-[13px] text-center"
              style={{ border: "1px solid rgba(249,246,241,0.18)", color: "rgba(249,246,241,0.45)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(249,246,241,0.4)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(249,246,241,0.18)")}
            >
              031-777-1234
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-7 md:px-16 py-7 flex flex-col md:flex-row justify-between items-center gap-3"
        style={{ background: "#0d0a07", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.18)", fontFamily: "Georgia,serif", fontStyle: "italic" }}>
          © 2026 Sejong Hoist &amp; Crane. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-[12px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#9b7840" }} />
          Demo 3 — ATELIER
          <Link href="/demo" className="ml-4 hover:text-white/50 transition-colors">← 데모 목록</Link>
        </div>
      </footer>
    </div>
  );
}

/* 세로 라인 드로 컴포넌트 */
function LineReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      className="absolute left-4 top-0 w-px"
      style={{ background: "rgba(155,120,64,0.25)", originY: 0, transformOrigin: "top" }}
      initial={{ scaleY: 0, height: "100%" }}
      animate={inView ? { scaleY: 1 } : {}}
      transition={{ duration: 1.8, ease: E }}
    />
  );
}
