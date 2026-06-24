"use client";

/**
 * DEMO 2: COMMAND CENTER
 * Bloomberg × Samsung Semiconductor × Palantir
 * 실제 운영 데이터가 있는 것처럼 느껴지는 대시보드형 기업 사이트
 */

import { useRef, useEffect, useState } from "react";
import {
  motion, useInView, useSpring, useMotionValue,
  animate, AnimatePresence
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─── 카운터 ─── */
function Counter({ to, suffix = "", decimal = false }: { to: number; suffix?: string; decimal?: boolean }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 18 });
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);
  useEffect(() => spring.on("change", n => setV(decimal ? Math.round(n * 10) / 10 : Math.floor(n))), [spring, decimal]);

  return <span ref={ref}>{decimal ? v.toFixed(1) : v.toLocaleString()}{suffix}</span>;
}

/* ─── SVG 막대 차트 ─── */
const INDUSTRY_DATA = [
  { label: "철강·금속", value: 112, color: "#f47c20" },
  { label: "물류·창고", value: 91, color: "#f47c20" },
  { label: "반도체", value: 87, color: "#f47c20" },
  { label: "발전·에너지", value: 73, color: "#f47c20" },
  { label: "석유화학", value: 64, color: "#f47c20" },
  { label: "자동차", value: 55, color: "#f47c20" },
  { label: "조선·해양", value: 41, color: "#f47c20" },
];
const MAX_VAL = 112;

function IndustryChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="space-y-3.5">
      {INDUSTRY_DATA.map((d, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="text-[12px] w-20 flex-shrink-0 text-right" style={{ color: "rgba(255,255,255,0.4)" }}>{d.label}</span>
          <div className="flex-1 h-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: `${(d.value / MAX_VAL) * 100}%` } : {}}
              transition={{ duration: 1.2, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] as never }}
              style={{ background: d.color, opacity: 0.75 }}
            />
          </div>
          <motion.span
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.07 }}
            className="text-[12px] w-8 text-right font-mono tabular-nums" style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {d.value}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

/* ─── 실시간 티커 (CSS 마키) ─── */
const CLIENTS = ["삼성전자", "현대제철", "LG화학", "SK이노베이션", "POSCO", "한국수력원자력", "OCI", "한화솔루션", "GS칼텍스", "두산중공업", "현대건설", "롯데케미칼", "효성중공업", "현대모비스", "HD현대"];

function Marquee() {
  const items = [...CLIENTS, ...CLIENTS];
  return (
    <div className="relative overflow-hidden py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -50 * CLIENTS.length] }}
        transition={{ duration: CLIENTS.length * 2.5, repeat: Infinity, ease: "linear" }}
      >
        {items.map((c, i) => (
          <span key={i} className="text-[13px] font-semibold flex-shrink-0"
            style={{ color: "rgba(255,255,255,0.28)" }}>{c}</span>
        ))}
      </motion.div>
      {/* 좌우 페이드 마스크 */}
      <div className="absolute inset-y-0 left-0 w-20 pointer-events-none" style={{ background: "linear-gradient(to right, #0a1c4a, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-20 pointer-events-none" style={{ background: "linear-gradient(to left, #0a1c4a, transparent)" }} />
    </div>
  );
}

/* ─── 라이브 메트릭 카드 ─── */
function MetricCard({ val, suffix, label, live, delay = 0 }: {
  val: number; suffix?: string; label: string; live?: boolean; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7 }}
      className="p-5 flex flex-col gap-2 relative overflow-hidden"
      style={{ background: live ? "rgba(244,124,32,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${live ? "rgba(244,124,32,0.25)" : "rgba(255,255,255,0.08)"}` }}
    >
      {live && (
        <span className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
          <span className="text-[9px] font-mono" style={{ color: "#4ade80" }}>LIVE</span>
        </span>
      )}
      <p className="font-black tabular-nums leading-none" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: live ? "#f47c20" : "#fff", letterSpacing: "-0.03em" }}>
        <Counter to={val} suffix={suffix} />
      </p>
      <p className="text-[11px] leading-snug" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</p>
    </motion.div>
  );
}

/* ─── 뉴스 ─── */
const NEWS = [
  { num: "01", date: "2026.06", cat: "기술", title: "반도체 클린룸 전용 크레인 — 0.1μm 진동 제어 세계 최초 달성" },
  { num: "02", date: "2026.05", cat: "납품", title: "200T급 천장크레인 준공 — 당진 발전소 국내 최대 규모" },
  { num: "03", date: "2026.04", cat: "수상", title: "산업통상자원부 장관 표창 수상 — 산업기계 혁신 부문" },
  { num: "04", date: "2026.03", cat: "채용", title: "2026 상반기 공개채용 — 기계설계·전기제어·영업" },
  { num: "05", date: "2026.02", cat: "인증", title: "ISO 9001:2015 품질경영시스템 갱신 완료 — 3회 연속" },
  { num: "06", date: "2026.01", cat: "납품", title: "SK이노베이션 울산 공장 갠트리크레인 납품 완료" },
];

/* ─── 인증 ─── */
const CERTS = [
  { code: "ISO\n9001", label: "품질경영\n시스템", year: "2015" },
  { code: "KS\nINDUSTRY", label: "산업표준\n적합성", year: "KS" },
  { code: "방폭\nEXPLOSION", label: "위험장소\n적합 검정", year: "IECEx" },
  { code: "KGS\nINSPECT", label: "크레인\n정기 검사", year: "KGS" },
];

export default function CommandDemo() {
  return (
    <div className="min-h-screen font-sans" style={{ color: "#fff" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-[64px]"
        style={{ background: "#0a1c4a", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Link href="/">
          <Image src="/images/sejong-logo.png" alt="SEJONG" width={120} height={28} className="h-7 w-auto brightness-0 invert" />
        </Link>
        <div className="hidden lg:flex items-center gap-1">
          {["회사소개", "사업영역", "납품실적", "기술력", "고객지원"].map(m => (
            <a key={m} href="#"
              className="px-3.5 py-2 text-[13px] transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >{m}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:0317771234" className="hidden md:flex items-center gap-2 text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 013.44 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            031-777-1234
          </a>
          <a href="/support/inquiry"
            className="text-[12px] font-bold px-4 py-2 transition-colors"
            style={{ background: "#f47c20", color: "#fff" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#d96a10")}
            onMouseLeave={e => (e.currentTarget.style.background = "#f47c20")}
          >
            문의하기
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-[64px]" style={{ background: "#0a1c4a" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 py-20 md:py-28 items-center">

            {/* 왼쪽: 메인 카피 */}
            <div className="lg:col-span-3 lg:pr-20">
              <motion.p
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[11px] font-mono tracking-[0.3em] uppercase mb-7"
                style={{ color: "#f47c20" }}
              >
                대한민국 크레인 전문기업 · Since 1984
              </motion.p>

              <div className="overflow-hidden mb-3">
                <motion.h1
                  initial={{ y: "105%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] as never }}
                  className="font-bold leading-[1.02]"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)", letterSpacing: "-0.03em" }}
                >
                  40년의 기술이
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-3">
                <motion.h1
                  initial={{ y: "105%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.52, duration: 1.0, ease: [0.16, 1, 0.3, 1] as never }}
                  className="font-bold leading-[1.02]"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)", letterSpacing: "-0.03em", color: "#f47c20" }}
                >
                  산업현장을
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-10">
                <motion.h1
                  initial={{ y: "105%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.64, duration: 1.0, ease: [0.16, 1, 0.3, 1] as never }}
                  className="font-bold leading-[1.02]"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)", letterSpacing: "-0.03em" }}
                >
                  바꿉니다.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                className="text-[15px] leading-[1.8] mb-10 max-w-md"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                반도체 클린룸부터 원자력 발전소까지. 세종호이스트크레인의 기술이 대한민국 핵심 산업 현장에서 가동됩니다.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
                className="flex flex-wrap gap-3"
              >
                <a href="/support/inquiry"
                  className="px-8 py-3.5 font-bold text-[13px] transition-opacity hover:opacity-80"
                  style={{ background: "#f47c20", color: "#fff" }}
                >
                  무료 상담 신청
                </a>
                <a href="/portfolio"
                  className="px-8 py-3.5 font-semibold text-[13px] transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                >
                  납품실적 보기
                </a>
              </motion.div>
            </div>

            {/* 오른쪽: 실시간 대시보드 */}
            <div className="lg:col-span-2 mt-12 lg:mt-0"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "28px" }}>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[11px] font-mono tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                  실시간 운영 현황
                </p>
                <div className="flex items-center gap-1.5">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ade80" }}
                  />
                  <span className="text-[10px] font-mono" style={{ color: "#4ade80" }}>LIVE DATA</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <MetricCard val={347} suffix="개" label="현재 가동 중인 크레인" live delay={0.8} />
                <MetricCard val={523} label="누적 납품 실적 (건)" delay={0.9} />
                <MetricCard val={94} label="고객사 수" delay={1.0} />
                <MetricCard val={24} suffix="H" label="AS 대응 체계" delay={1.1} />
              </div>

              {/* 업종별 현황 미니 차트 */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
                <p className="text-[10px] font-mono tracking-wider uppercase mb-4" style={{ color: "rgba(255,255,255,0.22)" }}>
                  업종별 납품 비중
                </p>
                <IndustryChart />
              </div>
            </div>
          </div>
        </div>

        {/* 고객사 마키 */}
        <Marquee />
      </section>

      {/* 사업영역 */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {[
          { code: "CRANE", label: "크레인", img: "/images/sejong_2.png", count: "348", desc: "이중거더 천장크레인부터 1,000T 갠트리크레인까지 산업현장의 모든 조건에 대응합니다.", items: ["이중거더 천장크레인", "단거더 천장크레인", "레일식 갠트리크레인", "타이어식 갠트리크레인"] },
          { code: "HOIST & SPECIAL", label: "호이스트 & 특수", img: "/images/sejong_3.png", count: "175", desc: "전동 체인호이스트부터 방폭·클린룸·원자력 특수크레인까지. 세종의 기술 경계를 시험하는 제품군.", items: ["전동 체인호이스트", "와이어로프 호이스트", "방폭형 크레인", "클린룸 크레인"] },
        ].map((panel, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
            className="relative group overflow-hidden cursor-pointer"
            style={{ minHeight: 520 }}
          >
            <Image src={panel.img} alt={panel.label} fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              style={{ filter: "brightness(0.35)" }}
            />
            <div className="absolute inset-0 transition-opacity duration-500"
              style={{ background: "linear-gradient(to top, rgba(10,28,74,0.92) 0%, rgba(10,28,74,0.2) 50%, transparent 100%)" }} />

            <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase px-3 py-1.5"
                  style={{ border: "1px solid rgba(244,124,32,0.4)", color: "#f47c20" }}>
                  {panel.code}
                </span>
                <span className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {panel.count}건 납품
                </span>
              </div>

              <div>
                <h3 className="font-bold mb-4 leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em" }}>
                  {panel.label}
                </h3>
                <p className="text-[14px] leading-[1.7] mb-7 max-w-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {panel.desc}
                </p>
                <ul className="space-y-2 mb-8">
                  {panel.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <span className="w-4 h-px" style={{ background: "rgba(244,124,32,0.5)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/business" className="group/link inline-flex items-center gap-3 text-[13px] font-semibold">
                  <span className="h-px transition-all duration-300 group-hover/link:w-12 group-hover/link:bg-orange-400"
                    style={{ width: 24, background: "rgba(255,255,255,0.4)" }} />
                  더 보기
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 업종별 납품 실적 풀 차트 */}
      <section className="py-24 md:py-36" style={{ background: "#060f25" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-[11px] font-mono tracking-[0.28em] uppercase mb-5"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Industry Breakdown
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="font-bold mb-4 leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.03em" }}
              >
                모든 산업 현장에서<br />세종이 함께합니다
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="text-[15px] leading-[1.8]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                철강·물류·반도체·에너지 등 7개 핵심 산업에 걸쳐<br />총 523건의 납품 실적을 보유하고 있습니다.
              </motion.p>
            </div>
            <div>
              <IndustryChart />
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 지표 - 선 없이 공간으로만 구분 */}
      <section className="py-24 md:py-36" style={{ background: "#0a1c4a" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0">
            {[
              { val: 40, suffix: "+", label: "년 업력", note: "창립 1984년" },
              { val: 523, suffix: "", label: "건 납품", note: "누적 실적" },
              { val: 200, suffix: "T", label: "최대 하중", note: "제작 가능" },
              { val: 99, suffix: "%+", label: "고객 만족도", note: "2025 기준" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7 }}
                className="text-center md:text-left md:px-10 first:pl-0 last:pr-0 md:border-r last:border-r-0"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <p className="font-black tabular-nums leading-none mb-2"
                  style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}>
                  <Counter to={s.val} suffix={s.suffix} />
                </p>
                <p className="text-[13px] mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>{s.label}</p>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.28)" }}>{s.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 인증 */}
      <section className="py-16" style={{ background: "#080e1e" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {CERTS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-5 px-8 py-7"
                style={{ background: "#080e1e" }}
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-center"
                  style={{ border: "1px solid rgba(244,124,32,0.3)" }}>
                  <p className="text-[8px] font-bold leading-tight text-center" style={{ color: "#f47c20", whiteSpace: "pre-line" }}>
                    {c.code}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight" style={{ whiteSpace: "pre-line" }}>{c.label}</p>
                  <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{c.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 뉴스 */}
      <section className="py-24 md:py-32" style={{ background: "#fff", color: "#0a1c4a" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[11px] font-mono tracking-[0.3em] uppercase mb-3" style={{ color: "#f47c20" }}>Newsroom</p>
              <h2 className="font-bold leading-[1.05]" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}>
                최신 소식
              </h2>
            </div>
            <Link href="/support/notice" className="hidden md:block text-[13px] font-semibold hover:opacity-60 transition-opacity"
              style={{ color: "#0a1c4a" }}>
              전체 보기 →
            </Link>
          </div>

          <div style={{ borderTop: "1px solid rgba(10,28,74,0.08)" }}>
            {NEWS.map((n, i) => (
              <motion.a
                key={i} href="/support/notice"
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-5 md:gap-10 py-5 group"
                style={{ borderBottom: "1px solid rgba(10,28,74,0.08)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f5f7fb")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span className="font-black text-xl w-8 flex-shrink-0" style={{ color: "rgba(10,28,74,0.1)" }}>{n.num}</span>
                <span className="text-[11px] font-mono hidden md:block w-16 flex-shrink-0" style={{ color: "rgba(10,28,74,0.35)" }}>{n.date}</span>
                <span className="text-[10px] font-bold px-2.5 py-1 flex-shrink-0"
                  style={{ background: "rgba(244,124,32,0.1)", color: "#f47c20" }}>{n.cat}</span>
                <span className="flex-1 text-[14px] font-medium transition-colors" style={{ color: "#0a1c4a" }}>{n.title}</span>
                <motion.span
                  className="hidden md:block text-[13px] flex-shrink-0 transition-all"
                  style={{ color: "rgba(10,28,74,0.25)" }}
                  whileHover={{ x: 4, color: "#f47c20" }}
                >
                  →
                </motion.span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-36 px-6 md:px-12" style={{ background: "#0a1c4a" }}>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="font-bold leading-[1.05] mb-5"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.025em" }}
            >
              크레인 도입을<br />계획하고 계신가요?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-[15px] leading-[1.8]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              전문 엔지니어가 현장을 직접 방문하여 최적의 솔루션을 제안합니다. 문의 접수 후 영업일 1일 이내 답변.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="/support/inquiry"
              className="flex-1 py-4 font-bold text-center text-[13px] transition-opacity hover:opacity-80"
              style={{ background: "#f47c20", color: "#fff" }}
            >
              온라인 문의
            </a>
            <a href="tel:0317771234"
              className="flex-1 py-4 font-semibold text-center text-[13px] transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              031-777-1234
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-7 flex flex-col md:flex-row justify-between items-center gap-3"
        style={{ background: "#060f25", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          © 2026 Sejong Hoist &amp; Crane. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-[12px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#f47c20" }} />
          Demo 2 — COMMAND
          <Link href="/demo" className="ml-4 hover:text-white/50 transition-colors">← 데모 목록</Link>
        </div>
      </footer>
    </div>
  );
}
