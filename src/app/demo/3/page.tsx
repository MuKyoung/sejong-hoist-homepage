"use client";

/**
 * DEMO 3 — ATELIER
 * 레퍼런스: Hermès Digital, Aesop.com, Dezeen, Monocle
 *
 * 핵심 결정:
 * - 영상 히어로에 세리프 에디토리얼 텍스트 오버레이
 * - Cormorant Garamond (Google Fonts, 무료 럭셔리 세리프)
 * - 크림 (#f9f6f1) 배경 — 웜톤의 고급스러움
 * - 사진/영상이 텍스트보다 항상 크다
 * - 금색(#9b7840) 단 한 번 — 핵심 강조에만
 * - 잡지식 편집: 인용구, 에디터 노트, 캡션
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const E = [0.22, 1, 0.36, 1] as never;

/* ─── Google Fonts Cormorant 로드 (head 주입) ─── */
function SerifFont() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
      .serif { font-family: 'Cormorant', 'Georgia', 'Times New Roman', serif; }
    `}</style>
  );
}

/* ─── 마스크 리빌 ─── */
function Mask({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "106%" }} whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 1.1, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── 패럴랙스 이미지 ─── */
function Para({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-12%] w-[124%] h-[124%]">
        <Image src={src} alt={alt} fill className="object-cover"
          sizes="(max-width:768px)100vw,60vw" />
      </motion.div>
    </div>
  );
}

/* ─── 데이터 ─── */
const PHILOSOPHY = [
  "크레인은 기계가 아닙니다.",
  "40년간 쌓은",
  "신뢰의 증거입니다.",
];

const STORIES = [
  {
    idx: "I", title: "정밀함의\n극한",
    quote: "반도체 클린룸에서 허용되는 진동은 0.1μm. 세종은 그 기준을 만족시켰습니다.",
    body: "삼성전자 평택 캠퍼스, LG화학 오창, SK하이닉스 이천. 대한민국 반도체 핵심 라인에서 세종의 이중거더 천장크레인이 가동됩니다. 수십 나노미터의 회로가 형성되는 공간에서 0.1μm 진동 제어를 실현합니다.",
    note: "최대 하중 500T · 스팬 40m · 납품 348건",
    img: "/images/sejong_2.png",
    video: "/videos/4763-179741146_medium.mp4",
    dark: false,
  },
  {
    idx: "II", title: "무게를\n이기는 구조",
    quote: "1,000톤. 그것은 에펠탑 철골의 절반 무게입니다. 세종의 갠트리크레인은 그것을 정밀하게 옮깁니다.",
    body: "조선소의 선체 블록, 항만의 컨테이너, 발전소의 터빈. 야외 극한 환경에서도 흔들리지 않는 구조 설계. 레일식과 타이어식 두 가지 드라이브로 어떤 지형도 대응합니다.",
    note: "최대 하중 1,000T · 스팬 60m · 납품 175건",
    img: "/images/sejong_3.png",
    video: "/videos/4764-179741142_medium.mp4",
    dark: true,
  },
  {
    idx: "III", title: "특수함이\n일상이 되다",
    quote: "원자력, 방폭, 클린룸. 세상에서 가장 까다로운 환경이 세종의 기준입니다.",
    body: "한국수력원자력의 격납건물 내부, 석유화학 방폭 구역, 제약사의 무진 클린룸. 일반 크레인이 진입할 수 없는 곳에 세종의 특수 솔루션이 있습니다.",
    note: "ISO · KGS · 방폭 인증 · 납품 92건",
    img: "/images/sejong_4.png",
    video: "/videos/4765-179741137_medium.mp4",
    dark: false,
  },
];

const TIMELINE = [
  { year: "1984", text: "세종호이스트크레인 창립" },
  { year: "1997", text: "ISO 9001 최초 인증 취득" },
  { year: "2008", text: "클린룸 크레인 기술 자체 개발" },
  { year: "2016", text: "원자력 특수크레인 납품 개시" },
  { year: "2021", text: "스마트 원격제어 시스템 상용화" },
  { year: "2026", text: "창립 42주년 · 누적 523건" },
];

function TimelineLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      className="absolute left-0 top-0 w-px"
      style={{ background: "rgba(155,120,64,0.2)", transformOrigin: "top" }}
      initial={{ scaleY: 0, height: "100%" }}
      animate={inView ? { scaleY: 1 } : {}}
      transition={{ duration: 2.0, ease: E }}
    />
  );
}

export default function Atelier() {
  const heroRef = useRef(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroPara = useTransform(hp, [0, 1], ["0%", "18%"]);
  const heroOp   = useTransform(hp, [0, 0.65], [1, 0]);

  return (
    <div style={{ background: "#f9f6f1", color: "#111111" }}>
      <SerifFont />

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-7 md:px-16 h-[60px]"
        style={{ background: "rgba(249,246,241,0.88)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(17,17,17,0.06)" }}>
        <Link href="/">
          <Image src="/images/sejong-logo.png" alt="SEJONG" width={96} height={22}
            className="h-[22px] w-auto opacity-60 hover:opacity-100 transition-opacity" />
        </Link>
        <nav className="hidden md:flex gap-8 text-[12px]" style={{ color: "rgba(17,17,17,0.38)" }}>
          {["철학", "제품", "공방", "연락"].map(m => (
            <a key={m} href="#" className="hover:text-black transition-colors">{m}</a>
          ))}
        </nav>
        <a href="/support/inquiry" className="text-[12px] font-semibold" style={{ color: "#9b7840" }}>
          상담 예약 →
        </a>
      </nav>

      {/* ─── HERO (영상 + 세리프 텍스트) ─── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-end">
        <motion.div style={{ y: heroPara }} className="absolute inset-[-10%] w-[120%] h-[120%]">
          <video
            src="/videos/27239-362518579_medium.mp4"
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.3) saturate(0.6)" }}
          />
        </motion.div>
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(22,18,12,0.96) 0%, rgba(22,18,12,0.4) 40%, transparent 70%)" }} />

        <motion.div style={{ opacity: heroOp }}
          className="relative z-10 px-7 md:px-16 pb-16 md:pb-28 max-w-4xl">
          {PHILOSOPHY.map((line, i) => (
            <Mask key={i} delay={0.3 + i * 0.12}>
              <p className="serif block text-white leading-[1.06]"
                style={{
                  fontSize: "clamp(2.8rem,8vw,7.5rem)",
                  fontWeight: i === 0 ? 400 : 300,
                  fontStyle: i > 0 ? "italic" : "normal",
                  color: i === 0 ? "#fff" : "rgba(255,255,255,0.32)",
                  letterSpacing: "-0.015em",
                }}>
                {line}
              </p>
            </Mask>
          ))}

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-10 flex items-center gap-6"
          >
            <div style={{ width: 56, height: 1, background: "#9b7840" }} />
            <p className="serif text-[14px]" style={{ color: "rgba(255,255,255,0.38)", fontStyle: "italic" }}>
              세종호이스트크레인 · 1984년 창립
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── 제품 스토리 (에디토리얼 레이아웃) ─── */}
      {STORIES.map((s, i) => (
        <article key={i}
          className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 === 1 ? "" : ""}`}
          style={{ background: s.dark ? "#16120c" : "#f9f6f1" }}
        >
          {/* 영상/이미지 */}
          <div className={`relative overflow-hidden min-h-[55vw] lg:min-h-0 ${i % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
            <video
              src={s.video} autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: `brightness(0.4) saturate(${s.dark ? 0.5 : 0.7})` }}
            />
            <div className="absolute inset-0"
              style={{
                background: s.dark
                  ? "linear-gradient(to right, rgba(22,18,12,0.6) 0%, transparent 60%)"
                  : "linear-gradient(to left, rgba(249,246,241,0.4) 0%, transparent 60%)",
              }} />
            {/* 인덱스 */}
            <p className="absolute top-8 left-8 serif pointer-events-none select-none"
              style={{ fontSize: "clamp(5rem,12vw,10rem)", color: "rgba(255,255,255,0.06)", fontStyle: "italic", lineHeight: 1 }}>
              {s.idx}
            </p>
          </div>

          {/* 텍스트 */}
          <div className={`flex flex-col justify-center px-8 md:px-14 xl:px-20 py-16 md:py-28 ${i % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="serif text-[12px] tracking-[0.2em] mb-9"
              style={{ color: "#9b7840", fontStyle: "italic" }}>
              {s.idx}
            </motion.p>

            <Mask className="mb-7">
              <h2 className="serif leading-[1.04]"
                style={{
                  fontSize: "clamp(2.4rem,5.5vw,4.5rem)",
                  fontWeight: 400,
                  whiteSpace: "pre-line",
                  color: s.dark ? "#f9f6f1" : "#111111",
                  letterSpacing: "-0.01em",
                }}>
                {s.title}
              </h2>
            </Mask>

            {/* 에디터 인용구 */}
            <motion.blockquote
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.18, ease: E }}
              className="serif text-[15px] leading-[1.7] mb-8 pl-5"
              style={{
                borderLeft: `2px solid #9b7840`,
                color: s.dark ? "rgba(249,246,241,0.55)" : "rgba(17,17,17,0.48)",
                fontStyle: "italic",
              }}
            >
              {s.quote}
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.26, ease: E }}
              className="text-[14px] leading-[1.9] mb-9 max-w-sm"
              style={{ color: s.dark ? "rgba(249,246,241,0.38)" : "rgba(17,17,17,0.5)" }}
            >
              {s.body}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.33 }}
              className="serif text-[13px] mb-10"
              style={{ color: "#9b7840", fontStyle: "italic" }}>
              {s.note}
            </motion.p>

            <motion.a
              href="/business"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.38 }}
              className="group flex items-center gap-4 w-fit text-[12px] tracking-[0.08em]"
              style={{ color: s.dark ? "rgba(249,246,241,0.35)" : "rgba(17,17,17,0.38)" }}
            >
              <motion.span className="h-px"
                style={{ background: "#9b7840", width: 28 }}
                whileHover={{ width: 56 }} transition={{ duration: 0.28 }}
              />
              자세히 읽기
            </motion.a>
          </div>
        </article>
      ))}

      {/* ─── 풀블리드 영상 ─── */}
      <section className="relative overflow-hidden flex items-center justify-center" style={{ height: "70vh" }}>
        <video
          src="/videos/47713-451772938_medium.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.3) saturate(0.5)" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(22,18,12,0.5)" }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ ease: E }}
          className="relative z-10 text-center px-8"
        >
          <p className="serif text-white"
            style={{ fontSize: "clamp(2.5rem,7vw,6rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
            현장에서 쌓은 신뢰,<br />
            <em style={{ color: "rgba(255,255,255,0.38)" }}>그것이 세종입니다.</em>
          </p>
        </motion.div>
      </section>

      {/* ─── 헤리티지 타임라인 ─── */}
      <section className="py-24 md:py-40" style={{ background: "#f9f6f1" }}>
        <div className="max-w-[1440px] mx-auto px-7 md:px-16">
          <Mask className="mb-20 max-w-xl">
            <h2 className="serif" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.015em" }}>
              40년의 역사,<br />
              <span style={{ color: "rgba(17,17,17,0.2)", fontStyle: "italic" }}>523건의 이야기</span>
            </h2>
          </Mask>

          <div className="relative pl-8">
            <TimelineLine />
            <div>
              {TIMELINE.map((t, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ delay: i * 0.06, ease: E }}
                  className="flex gap-10 md:gap-20 py-8"
                  style={{ borderBottom: "1px solid rgba(17,17,17,0.07)" }}
                >
                  <span className="serif text-[13px] shrink-0 w-10 pt-0.5" style={{ color: "#9b7840" }}>{t.year}</span>
                  <span className="text-[15px]" style={{ color: "rgba(17,17,17,0.65)" }}>{t.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 md:py-36" style={{ background: "#16120c" }}>
        <div className="max-w-[1440px] mx-auto px-7 md:px-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-14">
          <div className="max-w-lg">
            <Mask>
              <h2 className="serif text-[#f9f6f1]"
                style={{ fontSize: "clamp(2.5rem,5.5vw,5rem)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.01em" }}>
                다음 프로젝트를<br />함께 설계하십시오.
              </h2>
            </Mask>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="serif text-[14px] leading-[1.85] mt-7"
              style={{ color: "rgba(249,246,241,0.35)", fontStyle: "italic" }}>
              아이디어 단계부터 함께합니다. 부담 없이 연락주십시오.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.35 }}
            className="flex flex-col gap-3 w-full md:w-auto"
          >
            <a href="/support/inquiry"
              className="px-12 py-4 text-[12px] font-semibold text-center tracking-wide transition-all"
              style={{ background: "#9b7840", color: "#f9f6f1" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#7d6233")}
              onMouseLeave={e => (e.currentTarget.style.background = "#9b7840")}
            >
              상담 예약하기
            </a>
            <a href="tel:0317771234"
              className="px-12 py-4 text-[12px] text-center transition-all"
              style={{ border: "1px solid rgba(249,246,241,0.15)", color: "rgba(249,246,241,0.4)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(249,246,241,0.4)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(249,246,241,0.15)")}
            >
              031-777-1234
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-7 md:px-16 py-7 flex flex-col md:flex-row justify-between items-center gap-3"
        style={{ background: "#0d0a07", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="serif text-[12px]" style={{ color: "rgba(255,255,255,0.18)", fontStyle: "italic" }}>
          © 2026 Sejong Hoist &amp; Crane
        </p>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#9b7840" }} />
          <span className="serif text-[11px]" style={{ color: "rgba(255,255,255,0.18)" }}>Demo 3 — ATELIER</span>
          <Link href="/demo" className="ml-3 text-[11px] hover:text-white/40 transition-colors"
            style={{ color: "rgba(255,255,255,0.18)" }}>← 데모 목록</Link>
        </div>
      </footer>
    </div>
  );
}
