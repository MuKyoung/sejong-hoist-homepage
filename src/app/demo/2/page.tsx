"use client";

/**
 * DEMO 2 — NEXUS
 * 레퍼런스: Linear.app, Vercel, Bloomberg Terminal
 *
 * 핵심 결정:
 * - 히어로: 영상 + 우측 실시간 대시보드 카드
 * - Inter 폰트로 숫자·영문 우선 처리
 * - 다크 네이비 히어로 → 화이트 콘텐츠 → 다크 네이비 CTA
 * - "라이브 운영 현황" UI 실제처럼 보이게
 * - AI 느낌 제거: 섹션 제목 패턴 최소화, 테이블형 뉴스
 */

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const E = [0.22, 1, 0.36, 1] as never;
const FONT = "var(--font-inter), 'Pretendard Variable', Pretendard, sans-serif";

/* ─── 카운터 ─── */
function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.0, ease: E as never, onUpdate: v => setN(Math.floor(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{n.toLocaleString()}{suffix}</span>;
}

/* ─── 클립 리빌 ─── */
function Clip({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "106%" }} whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.95, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── 라이브 대시보드 메트릭 ─── */
const METRICS = [
  { id: "active", label: "현재 가동 중", val: 347, suf: "대", live: true, color: "#4ade80" },
  { id: "jobs",   label: "2026 누적 수주", val: 38, suf: "건", live: false, color: "#60a5fa" },
  { id: "ops",    label: "품질 합격률", val: 99, suf: "%", live: true, color: "#f59e0b" },
  { id: "cs",     label: "고객사", val: 94, suf: "+", live: false, color: "#a78bfa" },
];

/* ─── 업종 데이터 ─── */
const INDUSTRIES = [
  { label: "철강·금속", val: 112, color: "#f47c20" },
  { label: "물류·창고", val: 91,  color: "#f47c20" },
  { label: "반도체",    val: 87,  color: "#f47c20" },
  { label: "발전·에너지",val: 73, color: "#f47c20" },
  { label: "석유화학",  val: 64,  color: "#f47c20" },
  { label: "조선·해양", val: 41,  color: "#f47c20" },
];
const MAX_IND = 112;

function IndustryBar({ d, i }: { d: typeof INDUSTRIES[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <div ref={ref} className="flex items-center gap-4">
      <span className="text-[12px] w-20 text-right shrink-0" style={{ color: "#64748b", fontFamily: FONT }}>{d.label}</span>
      <div className="flex-1 h-[3px] rounded-full" style={{ background: "rgba(10,28,74,0.07)" }}>
        <motion.div
          className="h-full rounded-full" style={{ background: d.color, opacity: 0.65 }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${(d.val / MAX_IND) * 100}%` } : {}}
          transition={{ duration: 1.2, delay: i * 0.08, ease: E }}
        />
      </div>
      <motion.span
        className="text-[12px] w-7 text-right shrink-0" style={{ color: "#94a3b8", fontFamily: FONT }}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 + i * 0.08 }}
      >
        {d.val}
      </motion.span>
    </div>
  );
}

/* ─── 뉴스 ─── */
const NEWS = [
  { dt: "2026.06", tag: "기술", title: "반도체 클린룸 크레인, 0.1μm 진동 제어 달성 — 세계 최초" },
  { dt: "2026.05", tag: "납품", title: "당진 발전소 200T 천장크레인 준공 — 국내 최대 규모" },
  { dt: "2026.04", tag: "수상", title: "산업통상자원부 장관 표창 — 산업기계 혁신 부문" },
  { dt: "2026.03", tag: "채용", title: "2026 상반기 공채 — 기계설계·전기제어·영업 부문" },
  { dt: "2026.02", tag: "인증", title: "ISO 9001:2015 품질경영시스템 3회 연속 갱신 완료" },
  { dt: "2026.01", tag: "납품", title: "SK이노베이션 울산 갠트리크레인 납품 완료" },
];

/* ─── 고객사 ─── */
const CLIENTS = ["삼성전자", "현대제철", "LG화학", "SK이노베이션", "POSCO", "한국수력원자력", "OCI", "한화솔루션", "GS칼텍스", "두산중공업", "현대건설", "롯데케미칼", "KCC", "삼성중공업", "현대오일뱅크"];

export default function Nexus() {
  const heroRef = useRef(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoOp = useTransform(hp, [0, 0.7], [1, 0]);

  return (
    <div style={{ color: "#0f172a", fontFamily: FONT }}>

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-[60px]"
        style={{ background: "#071129", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          <Link href="/">
            <Image src="/images/sejong-logo.png" alt="SEJONG" width={96} height={22}
              className="h-[22px] w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
          </Link>
          <div className="hidden lg:flex items-center gap-0.5 text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            {["회사소개", "사업영역", "납품실적", "고객지원"].map(m => (
              <a key={m} href="#" className="px-4 py-2.5 hover:text-white rounded transition-colors">{m}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-2 text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#4ade80" }} />
              031-777-1234
            </span>
            <a href="/support/inquiry"
              className="text-[11px] font-bold px-4 py-2.5 tracking-wide hover:opacity-80 transition-opacity"
              style={{ background: "#f47c20", color: "#fff" }}>
              문의하기
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative pt-[60px] overflow-hidden"
        style={{ minHeight: "100svh", background: "#071129" }}>

        {/* 배경 영상 */}
        <motion.video
          style={{ opacity: videoOp, filter: "brightness(0.15) saturate(0.5)" }}
          src="/videos/159052-818026310_medium.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(7,17,41,0.95) 0%, rgba(7,17,41,0.6) 55%, rgba(7,17,41,0.3) 100%)" }} />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center"
            style={{ minHeight: "calc(100svh - 60px)", paddingTop: "5rem", paddingBottom: "5rem" }}>

            {/* 좌: 헤드라인 */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 mb-10"
              >
                <span className="h-px w-8" style={{ background: "#f47c20" }} />
                <span className="text-[10px] font-bold tracking-[0.35em] uppercase" style={{ color: "#f47c20" }}>
                  대한민국 크레인 전문기업 · Since 1984
                </span>
              </motion.div>

              {["40년의 기술이", "산업 현장을", "바꿉니다."].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    className="font-black leading-[0.96] text-white"
                    style={{ fontSize: "clamp(2.8rem,7vw,6rem)", letterSpacing: "-0.035em", color: i === 1 ? "#f47c20" : "#fff" }}
                    initial={{ y: "108%" }} animate={{ y: 0 }}
                    transition={{ delay: 0.45 + i * 0.1, duration: 1.0, ease: E }}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
                className="text-[14px] leading-[1.85] mt-8 mb-10 max-w-md"
                style={{ color: "rgba(255,255,255,0.38)" }}>
                반도체 클린룸에서 원자력 발전소까지. 세종의 기술이 대한민국 핵심 산업 현장에서 가동 중입니다.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.12 }}
                className="flex flex-wrap gap-3">
                <a href="/support/inquiry"
                  className="px-7 py-3.5 font-bold text-[12px] tracking-wide hover:opacity-80 transition-opacity"
                  style={{ background: "#f47c20", color: "#fff" }}>
                  무료 상담 신청
                </a>
                <a href="/portfolio"
                  className="px-7 py-3.5 font-semibold text-[12px] tracking-wide transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
                >
                  납품실적 →
                </a>
              </motion.div>
            </div>

            {/* 우: 라이브 대시보드 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9, ease: E }}
              className="lg:col-span-2"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
            >
              {/* 대시 헤더 */}
              <div className="px-6 py-4 flex items-center justify-between"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase"
                  style={{ color: "rgba(255,255,255,0.28)" }}>실시간 운영 현황</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#4ade80" }} />
                  <span className="text-[9px] font-mono font-bold" style={{ color: "#4ade80" }}>LIVE</span>
                </div>
              </div>

              {/* 메트릭 그리드 */}
              <div className="grid grid-cols-2 gap-px p-px" style={{ background: "rgba(255,255,255,0.05)" }}>
                {METRICS.map(m => {
                  const { ref, n } = { ref: useRef<HTMLDivElement>(null), n: 0 };
                  const inView = useInView(ref, { once: true, margin: "-20%" });
                  const [cnt, setCnt] = useState(0);
                  useEffect(() => {
                    if (!inView) return;
                    const c = animate(0, m.val, { duration: 1.8, ease: E as never, onUpdate: v => setCnt(Math.floor(v)) });
                    return () => c.stop();
                  }, [inView]);
                  return (
                    <div key={m.id} ref={ref}
                      className="flex flex-col p-5"
                      style={{ background: "#071129" }}
                    >
                      <p className="font-black tabular-nums leading-none mb-2"
                        style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: m.live ? m.color : "#fff", letterSpacing: "-0.04em" }}>
                        {cnt.toLocaleString()}{m.suf}
                      </p>
                      <p className="text-[11px] leading-tight" style={{ color: "rgba(255,255,255,0.3)" }}>{m.label}</p>
                      {m.live && (
                        <p className="text-[9px] mt-2 font-mono" style={{ color: m.color }}>● 실시간</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 업종 차트 */}
              <div className="p-5 space-y-3.5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase mb-4"
                  style={{ color: "rgba(255,255,255,0.18)" }}>업종별 납품 (건)</p>
                {INDUSTRIES.map((d, i) => (
                  <IndustryBar key={i} d={d} i={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 고객사 마키 */}
        <div className="overflow-hidden py-4" style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex gap-10 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="text-[12px] font-semibold shrink-0" style={{ color: "rgba(255,255,255,0.2)" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 사업 2분할 ─── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {[
          { label: "크레인", sub: "Crane Solutions", video: "/videos/161515-823603558_medium.mp4", cnt: "348건", items: ["이중거더 천장크레인", "단거더 천장크레인", "레일식 갠트리크레인", "타이어식 갠트리크레인"] },
          { label: "호이스트·특수", sub: "Hoist & Special", video: "/videos/144584-785095786_medium.mp4", cnt: "267건", items: ["전동 체인호이스트", "방폭형 크레인", "클린룸 크레인", "원자력 특수크레인"] },
        ].map((p, i) => (
          <div key={i} className="relative overflow-hidden group" style={{ minHeight: 560 }}>
            <video
              src={p.video} autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              style={{ filter: "brightness(0.2) saturate(0.5)" }}
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(7,17,41,0.96) 0%, rgba(7,17,41,0.5) 50%, transparent 100%)" }} />
            <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-12">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 self-start"
                style={{ border: "1px solid rgba(244,124,32,0.4)", color: "#f47c20" }}>
                {p.sub}
              </span>
              <div>
                <p className="text-[11px] font-mono mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>납품 {p.cnt}</p>
                <h3 className="text-white font-black mb-5 leading-tight"
                  style={{ fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.03em" }}>
                  {p.label}
                </h3>
                <ul className="space-y-2.5 mb-8">
                  {p.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-[13px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                      <span className="w-4 h-px shrink-0" style={{ background: "rgba(244,124,32,0.5)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/business"
                  className="group/l inline-flex items-center gap-3 text-[12px] font-bold text-white hover:text-[#f47c20] transition-colors">
                  <span className="h-px w-6 group-hover/l:w-12 transition-all duration-300"
                    style={{ background: "currentColor" }} />
                  더 보기
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── 실적 통계 ─── */}
      <section className="py-24 md:py-36" style={{ background: "#f4f7fc" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { v: 40, s: "+", l: "년 업력", n: "1984년 창립" },
              { v: 523, s: "", l: "건 납품", n: "누적 실적" },
              { v: 200, s: "T", l: "최대 하중", n: "설계 가능" },
              { v: 24, s: "H", l: "AS 대응", n: "연중무휴" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, ease: E }}
                className="flex flex-col items-center py-14 text-center transition-colors duration-300 group"
                style={{ background: "#fff" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#071129")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >
                <p className="font-black tabular-nums leading-none mb-2"
                  style={{ fontSize: "clamp(3rem,6vw,5rem)", letterSpacing: "-0.05em", color: "#0f172a", transition: "color 0.3s" }}>
                  <Count to={s.v} suffix={s.s} />
                </p>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "#0f172a", transition: "color 0.3s" }}>{s.l}</p>
                <p className="text-[12px]" style={{ color: "#94a3b8", transition: "color 0.3s" }}>{s.n}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 뉴스 ─── */}
      <section className="py-24 md:py-36" style={{ background: "#fff" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-14">
            <div>
              <Clip>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#f47c20" }}>Newsroom</p>
              </Clip>
              <Clip delay={0.08}>
                <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.2rem,5vw,4rem)", letterSpacing: "-0.035em" }}>
                  최신 소식
                </h2>
              </Clip>
            </div>
            <Link href="/support/notice" className="hidden md:block text-[12px] font-semibold hover:opacity-50 transition-opacity"
              style={{ color: "#0f172a" }}>전체 보기 →</Link>
          </div>

          <div style={{ borderTop: "1px solid rgba(15,23,42,0.07)" }}>
            {NEWS.map((n, i) => (
              <motion.a key={i} href="/support/notice"
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5%" }} transition={{ delay: i * 0.05, ease: E }}
                className="group flex items-center gap-4 md:gap-8 py-5 transition-all duration-200"
                style={{ borderBottom: "1px solid rgba(15,23,42,0.07)" }}
                onMouseEnter={e => { e.currentTarget.style.paddingLeft = "10px"; e.currentTarget.style.background = "#f4f7fc"; }}
                onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.background = "transparent"; }}
              >
                <span className="font-mono text-[11px] w-16 shrink-0" style={{ color: "#94a3b8" }}>{n.dt}</span>
                <span className="text-[10px] font-bold px-2.5 py-1 shrink-0"
                  style={{ background: "rgba(244,124,32,0.1)", color: "#f47c20" }}>{n.tag}</span>
                <span className="flex-1 text-[13px] font-medium" style={{ color: "#0f172a" }}>{n.title}</span>
                <span className="hidden md:block text-[13px] shrink-0 group-hover:text-[#f47c20] transition-colors"
                  style={{ color: "rgba(15,23,42,0.2)" }}>→</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA — 영상 배경 ─── */}
      <section className="relative overflow-hidden" style={{ background: "#071129", paddingTop: "6rem", paddingBottom: "6rem" }}>
        <video
          src="/videos/48420-453832153_medium.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.1) saturate(0.3)" }}
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(7,17,41,0.98) 0%, rgba(7,17,41,0.7) 100%)" }} />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Clip>
              <h2 className="font-black text-white leading-[0.95]"
                style={{ fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "-0.04em" }}>
                크레인 도입을<br />계획하고 계신가요?
              </h2>
            </Clip>
            <motion.p className="text-[14px] leading-[1.8] mt-6" style={{ color: "rgba(255,255,255,0.38)" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              전문 엔지니어가 현장을 방문해 최적 솔루션을 제안합니다.<br />
              문의 접수 후 영업일 1일 이내 연락드립니다.
            </motion.p>
          </div>
          <motion.div className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.25, ease: E }}>
            <a href="/support/inquiry"
              className="flex-1 py-4 font-bold text-[12px] text-center tracking-wide hover:opacity-80 transition-opacity"
              style={{ background: "#f47c20", color: "#fff" }}>
              온라인 문의
            </a>
            <a href="tel:0317771234"
              className="flex-1 py-4 font-semibold text-[12px] text-center tracking-wide transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
            >
              031-777-1234
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 md:px-12 py-7 flex flex-col md:flex-row justify-between items-center gap-3"
        style={{ background: "#040c1e", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <Image src="/images/sejong-logo.png" alt="SEJONG" width={80} height={18}
          className="h-[18px] w-auto brightness-0 invert opacity-25" />
        <p className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.15)" }}>© 2026 Sejong Hoist &amp; Crane</p>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#f47c20" }} />
          <span className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.15)" }}>Demo 2 — NEXUS</span>
          <Link href="/demo" className="ml-3 text-[11px] font-mono hover:text-white/40 transition-colors"
            style={{ color: "rgba(255,255,255,0.15)" }}>← 데모 목록</Link>
        </div>
      </footer>
    </div>
  );
}
