"use client";

/**
 * DEMO 1 — APEX
 * 레퍼런스: Apple Product Pages, Konecranes, Bureau Oberhaeuser
 *
 * 핵심 결정:
 * - 영상이 히어로 전체를 덮는다. 텍스트는 영상 위에.
 * - 헤드라인은 좌하단. 절대 가운데 정렬 없음.
 * - Inter 900 + Pretendard 400 혼합
 * - 섹션마다 다른 배경 (완전 흑 / 매우 어두운 회색)
 * - 장식선 0개. 여백이 위계를 만든다.
 * - 제품: 스티키 좌측 번호 + 우측 스크롤 이미지
 * - 수치: 박스 없음, 줄 정렬만
 */

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  animate,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─── 상수 ─── */
const E = [0.22, 1, 0.36, 1] as never;

/* ─── 영상 목록 (히어로 루프) ─── */
const HERO_VIDEOS = [
  "/videos/47713-451772938_medium.mp4",
  "/videos/27239-362518579_medium.mp4",
  "/videos/12716-241674181_medium.mp4",
];

/* ─── 섹션 영상 ─── */
const REEL_VIDEOS = [
  "/videos/4763-179741146_medium.mp4",
  "/videos/4764-179741142_medium.mp4",
  "/videos/4765-179741137_medium.mp4",
  "/videos/4768-179741152_medium.mp4",
  "/videos/5497-184226939_medium.mp4",
  "/videos/144584-785095786_medium.mp4",
];

/* ─── 제품 ─── */
const PRODUCTS = [
  {
    no: "01",
    name: "천장크레인",
    sub: "Overhead Crane",
    tone: "반도체·발전·철강",
    copy: "클린룸 내 0.1μm 공차 제어. 발전소 200T 중량물 이송. 세종의 이중거더 천장크레인이 불가능한 조건을 일상으로 만듭니다.",
    data: [["최대 하중", "500T"], ["최대 스팬", "40m"], ["납품", "348건"]],
    img: "/images/sejong_2.png",
  },
  {
    no: "02",
    name: "갠트리크레인",
    sub: "Gantry Crane",
    tone: "조선·항만·건설",
    copy: "레일식, 타이어식. 극한의 야외 환경에서도 흔들림이 없는 구조 설계. 조선소와 항만이 세종을 선택하는 이유입니다.",
    data: [["최대 하중", "1,000T"], ["최대 스팬", "60m"], ["납품", "175건"]],
    img: "/images/sejong_3.png",
  },
  {
    no: "03",
    name: "전동호이스트",
    sub: "Electric Hoist",
    tone: "제조·물류·자동차",
    copy: "체인과 와이어로프, 두 가지 방식. 정밀하고 안정적인 운전 특성으로 어떤 제조 환경에도 최적화됩니다.",
    data: [["최대 하중", "50T"], ["양정", "30m"], ["납품", "250건+"]],
    img: "/images/sejong_1.png",
  },
  {
    no: "04",
    name: "특수크레인",
    sub: "Special Crane",
    tone: "원자력·방폭·클린룸",
    copy: "원자력 발전소, 방폭 구역, 무진 클린룸. 가장 엄격한 환경을 위한 완전 맞춤 설계. 불가능한 현장은 없습니다.",
    data: [["종류", "3가지+"], ["인증", "KGS·ISO·방폭"], ["납품", "92건"]],
    img: "/images/sejong_4.png",
  },
];

/* ─── 실적 ─── */
const WORKS = [
  { no: "001", client: "한국수력원자력", desc: "원자력 특수크레인 30T 납품 및 설치", year: "2025" },
  { no: "002", client: "삼성전자 평택캠퍼스", desc: "클린룸 이중거더 천장크레인 10T × 6대", year: "2025" },
  { no: "003", client: "POSCO 광양제철소", desc: "이중거더 천장크레인 200T 설계·납품", year: "2024" },
  { no: "004", client: "SK이노베이션 울산", desc: "방폭형 갠트리크레인 50T × 2대", year: "2024" },
  { no: "005", client: "현대중공업 울산", desc: "조선소 갠트리크레인 500T 상시운영체계", year: "2023" },
  { no: "006", client: "LG화학 여수", desc: "이중거더 천장크레인 100T 납품", year: "2023" },
];

/* ─── 카운터 ─── */
function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: E as never, onUpdate: v => setN(Math.floor(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/* ─── 클립 리빌 ─── */
function Clip({ children, delay = 0, as: Tag = "div", className = "" }: {
  children: React.ReactNode; delay?: number; as?: React.ElementType; className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "108%" }} whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 1.0, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── 비디오 히어로 (자동 순환) ─── */
function VideoHero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setIdx(p => (p + 1) % HERO_VIDEOS.length), 7000);
    return () => clearTimeout(t);
  }, [idx]);

  return (
    <AnimatePresence mode="wait">
      <motion.video
        key={idx}
        src={HERO_VIDEOS[idx]}
        autoPlay muted loop={false} playsInline
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 1.4 }}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.22) saturate(0.7)" }}
        onEnded={() => setIdx(p => (p + 1) % HERO_VIDEOS.length)}
      />
    </AnimatePresence>
  );
}

/* ─── 실시간 시계 ─── */
function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono tabular-nums">{t}</span>;
}

/* ─── 메인 ─── */
export default function Apex() {
  const heroRef = useRef(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTy = useTransform(hp, [0, 1], ["0%", "15%"]);
  const heroOp = useTransform(hp, [0, 0.65], [1, 0]);

  return (
    <div style={{ background: "#040404", color: "#ebebeb", fontFamily: "var(--font-inter), 'Pretendard Variable', Pretendard, sans-serif" }}>

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-14"
        style={{ background: "rgba(4,4,4,0.75)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/sejong-logo.png" alt="SEJONG" width={88} height={20}
            className="h-5 w-auto brightness-0 invert opacity-55 hover:opacity-90 transition-opacity duration-300" />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {["Products", "Works", "About"].map(m => (
            <a key={m} href="#" className="text-[12px] font-medium tracking-wide hover:text-white transition-colors"
              style={{ color: "rgba(235,235,235,0.3)" }}>{m}</a>
          ))}
        </div>
        <a href="/support/inquiry"
          className="text-[11px] font-bold px-4 py-2 tracking-wide uppercase hover:opacity-80 transition-opacity"
          style={{ background: "#e8721a", color: "#fff" }}>
          무료 견적
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex flex-col">
        {/* 비디오 배경 */}
        <VideoHero />

        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(4,4,4,0.9) 0%, rgba(4,4,4,0.3) 40%, rgba(4,4,4,0.1) 100%)" }} />

        {/* 히어로 콘텐츠 — 좌하단 */}
        <motion.div style={{ opacity: heroOp }} className="relative z-10 mt-auto px-6 md:px-12 pb-14 md:pb-20">

          {/* 좌하 텍스트 블록 */}
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[11px] font-bold tracking-[0.45em] uppercase mb-7"
              style={{ color: "#e8721a" }}>
              Sejong Hoist &amp; Crane — Est. 1984
            </motion.p>

            {["중력을", "우리가", "다룹니다."].map((word, i) => (
              <div key={i} className="overflow-hidden leading-[0.9]">
                <motion.span
                  className="block font-black"
                  style={{
                    fontSize: "clamp(4rem,14vw,12rem)",
                    letterSpacing: "-0.04em",
                    color: i === 2 ? "rgba(235,235,235,0.15)" : "#ebebeb",
                  }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.55 + i * 0.1, duration: 1.1, ease: E }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          {/* 하단 메타 바 */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}
            className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 max-w-3xl"
          >
            <p className="text-[14px] leading-[1.7] max-w-xs" style={{ color: "rgba(235,235,235,0.35)" }}>
              대한민국 핵심 산업 523개 현장.<br />
              40년, 한 가지 일만 해왔습니다.
            </p>
            <a href="/business"
              className="group flex items-center gap-3 text-[12px] font-semibold tracking-wide uppercase w-fit"
              style={{ color: "#e8721a" }}>
              <span className="block h-px w-8 group-hover:w-16 transition-all duration-400"
                style={{ background: "#e8721a" }} />
              제품 보기
            </a>
          </motion.div>
        </motion.div>

        {/* 우상단 — 시간 + 좌표 */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
          className="absolute top-[72px] right-6 md:right-12 text-right z-10"
          style={{ color: "rgba(235,235,235,0.18)" }}
        >
          <p className="text-[10px] font-mono tracking-wider"><Clock /></p>
          <p className="text-[10px] font-mono tracking-wider mt-0.5">37°14′N, 127°0′E</p>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <div className="scroll-indicator" />
          <p className="text-[9px] font-mono tracking-[0.35em] uppercase" style={{ color: "rgba(235,235,235,0.2)" }}>Scroll</p>
        </motion.div>
      </section>

      {/* ─── TICKER ─── */}
      <div className="overflow-hidden py-3.5" style={{ background: "#e8721a" }}>
        <div className="flex animate-marquee whitespace-nowrap gap-0" style={{ width: "max-content" }}>
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-5 shrink-0 pr-5">
              {["천장크레인 · 348건 납품", "갠트리크레인 · 1,000T 대응", "호이스트 · 250건+", "특수크레인 · ISO 인증", "40년 기술력", "무상 AS 12개월"].map(t => (
                <span key={t} className="flex items-center gap-5">
                  <span className="text-[11px] font-bold tracking-wide text-white">{t}</span>
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ─── 제품 섹션 ─── */}
      <section style={{ background: "#040404" }}>
        {PRODUCTS.map((p, i) => (
          <article
            key={p.no}
            className="grid grid-cols-1 lg:grid-cols-2 min-h-screen"
            style={{ background: i % 2 === 0 ? "#040404" : "#080808" }}
          >
            {/* 이미지 */}
            <div className={`relative overflow-hidden min-h-[55vw] lg:min-h-0 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <motion.div
                initial={{ scale: 1.08 }} whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1.4, ease: E }}
                className="absolute inset-0"
              >
                <Image src={p.img} alt={p.name} fill className="object-cover"
                  style={{ filter: "brightness(0.55) saturate(0.8)" }}
                  sizes="(max-width:1024px)100vw,50vw" />
              </motion.div>
              {/* 오버레이 넘버 */}
              <p className="absolute top-8 left-8 font-black tabular-nums pointer-events-none select-none"
                style={{ fontSize: "clamp(5rem,15vw,14rem)", color: "rgba(235,235,235,0.04)", letterSpacing: "-0.06em", lineHeight: 1 }}>
                {p.no}
              </p>
            </div>

            {/* 텍스트 */}
            <div className={`flex flex-col justify-center px-8 md:px-14 xl:px-20 py-16 md:py-24 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="text-[10px] font-bold tracking-[0.38em] uppercase mb-8"
                style={{ color: "rgba(235,235,235,0.2)" }}
              >
                {p.no} — {p.sub}
              </motion.p>

              <Clip className="mb-3">
                <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.4rem,5.5vw,4.5rem)", letterSpacing: "-0.035em" }}>
                  {p.name}
                </h2>
              </Clip>

              <Clip delay={0.07} className="mb-9">
                <p className="text-[12px] font-bold tracking-[0.15em] uppercase" style={{ color: "#e8721a" }}>{p.tone}</p>
              </Clip>

              <motion.p
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.2, ease: E }}
                className="text-[15px] leading-[1.85] mb-12 max-w-sm"
                style={{ color: "rgba(235,235,235,0.4)" }}
              >
                {p.copy}
              </motion.p>

              {/* 스펙 — 선 없음, 공백만 */}
              <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="grid grid-cols-3 gap-8 mb-14"
              >
                {p.data.map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[11px] mb-2" style={{ color: "rgba(235,235,235,0.2)" }}>{k}</p>
                    <p className="text-lg font-bold">{v}</p>
                  </div>
                ))}
              </motion.div>

              <motion.a
                href="/business"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.38 }}
                className="group flex items-center gap-3 w-fit text-[12px] font-bold tracking-wide uppercase"
                style={{ color: "#e8721a" }}
              >
                <span className="h-px w-7 group-hover:w-16 transition-all duration-350" style={{ background: "#e8721a" }} />
                상세 보기
              </motion.a>
            </div>
          </article>
        ))}
      </section>

      {/* ─── 영상 릴 (그리드) ─── */}
      <section className="py-4 px-4" style={{ background: "#040404" }}>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
          {REEL_VIDEOS.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.05, ease: E }}
              className="relative overflow-hidden group"
              style={{ aspectRatio: "1 / 1" }}
            >
              <video
                src={src} muted loop playsInline autoPlay
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ filter: "brightness(0.4) saturate(0.6)" }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(232,114,26,0.15)" }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 통계 — 박스 없음 ─── */}
      <section className="px-6 md:px-12 py-28 md:py-44" style={{ background: "#040404" }}>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase mb-20"
          style={{ color: "rgba(235,235,235,0.18)" }}
        >
          Numbers
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
          {[
            { v: 40, s: "+", l: "년 업력", sub: "1984년 창립" },
            { v: 523, s: "", l: "건 납품", sub: "누적 실적" },
            { v: 200, s: "T", l: "최대 하중", sub: "제작 가능" },
            { v: 94, s: "+", l: "개 고객사", sub: "국내외 합산" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, ease: E }}
            >
              <p className="font-black tabular-nums mb-3 leading-none"
                style={{ fontSize: "clamp(3.5rem,9vw,8rem)", letterSpacing: "-0.05em" }}>
                <Count to={s.v} suffix={s.s} />
              </p>
              <p className="text-[15px] font-semibold mb-1">{s.l}</p>
              <p className="text-[12px]" style={{ color: "rgba(235,235,235,0.28)" }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 실적 리스트 ─── */}
      <section className="px-6 md:px-12 py-24 md:py-36" style={{ background: "#070707" }}>
        <div className="flex items-end justify-between mb-14">
          <div>
            <Clip>
              <p className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase mb-5"
                style={{ color: "rgba(235,235,235,0.18)" }}>Selected Works</p>
            </Clip>
            <Clip delay={0.1}>
              <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "-0.04em" }}>
                현장이<br />증명합니다.
              </h2>
            </Clip>
          </div>
          <Link href="/portfolio"
            className="hidden md:flex items-center gap-2 text-[12px] font-semibold hover:opacity-50 transition-opacity"
            style={{ color: "rgba(235,235,235,0.25)" }}>
            전체 보기 →
          </Link>
        </div>

        {/* 테이블 형식 리스트 */}
        <div style={{ borderTop: "1px solid rgba(235,235,235,0.06)" }}>
          {WORKS.map((w, i) => (
            <motion.a
              key={i} href="/portfolio"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: i * 0.05, ease: E }}
              className="group flex items-center gap-4 md:gap-8 py-6 transition-all duration-200"
              style={{ borderBottom: "1px solid rgba(235,235,235,0.06)" }}
              onMouseEnter={e => { e.currentTarget.style.paddingLeft = "12px"; }}
              onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; }}
            >
              <span className="font-mono text-[11px] w-8 shrink-0"
                style={{ color: "rgba(235,235,235,0.18)" }}>{w.no}</span>
              <span className="font-semibold flex-1 text-[14px] md:text-[15px] group-hover:text-white transition-colors">
                {w.client}
              </span>
              <span className="hidden md:block flex-1 text-[13px]"
                style={{ color: "rgba(235,235,235,0.38)" }}>{w.desc}</span>
              <span className="font-mono text-[12px] shrink-0"
                style={{ color: "rgba(235,235,235,0.22)" }}>{w.year}</span>
              <span className="text-base shrink-0 group-hover:text-[#e8721a] group-hover:translate-x-1 transition-all duration-200"
                style={{ color: "rgba(235,235,235,0.15)" }}>→</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ─── CTA — 풀블리드 영상 ─── */}
      <section className="relative overflow-hidden flex items-center justify-center" style={{ minHeight: "70vh" }}>
        <video
          src="/videos/48420-453832153_medium.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.18) saturate(0.5)" }}
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(4,4,4,0.7) 0%, rgba(4,4,4,0.3) 100%)" }} />

        <div className="relative z-10 px-6 md:px-12 text-center max-w-4xl">
          <Clip>
            <h2 className="font-black leading-[0.9] mb-10"
              style={{ fontSize: "clamp(3rem,10vw,9rem)", letterSpacing: "-0.04em" }}>
              다음 현장,<br />
              <span style={{ color: "rgba(235,235,235,0.15)" }}>세종과 함께.</span>
            </h2>
          </Clip>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.3, ease: E }}
            className="flex flex-wrap justify-center gap-3"
          >
            <a href="/support/inquiry"
              className="px-9 py-4 font-bold text-[13px] tracking-wide hover:opacity-80 transition-opacity"
              style={{ background: "#e8721a", color: "#fff" }}>
              무료 상담 신청
            </a>
            <a href="tel:0317771234"
              className="px-9 py-4 font-semibold text-[13px] tracking-wide transition-all"
              style={{ border: "1px solid rgba(235,235,235,0.18)", color: "rgba(235,235,235,0.55)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(235,235,235,0.45)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(235,235,235,0.18)")}
            >
              031-777-1234
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 md:px-12 py-7 flex flex-col md:flex-row justify-between items-center gap-4"
        style={{ background: "#020202", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <p className="text-[11px] font-mono" style={{ color: "rgba(235,235,235,0.15)" }}>
          © 2026 Sejong Hoist &amp; Crane Co., Ltd.
        </p>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#e8721a" }} />
          <span className="text-[11px] font-mono" style={{ color: "rgba(235,235,235,0.15)" }}>Demo 1 — APEX</span>
          <Link href="/demo" className="ml-3 text-[11px] font-mono hover:text-white/40 transition-colors"
            style={{ color: "rgba(235,235,235,0.15)" }}>← 데모 목록</Link>
        </div>
      </footer>
    </div>
  );
}
