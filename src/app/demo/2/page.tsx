"use client";

/**
 * DEMO 2: NEXUS — 코퍼리트 커맨드 센터
 * Samsung Semiconductor × Bloomberg × Microsoft Azure
 *
 * 설계 원칙:
 * - 화이트/네이비 교번 섹션
 * - 실제 운영 데이터가 있는 것처럼 느껴지는 라이브 UI
 * - SVG 애니메이션 차트
 * - Pretendard 한국어 최적화 타이포그래피
 * - 애니메이션: ① 카운터  ② SVG 바  ③ 리스트 스태거 — 3가지만
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, animate, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const E = [0.16, 1, 0.3, 1] as never;

/* ─── 카운터 훅 ─── */
function useCounter(to: number) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: E as never, onUpdate: v => setN(Math.floor(v)) });
    return () => c.stop();
  }, [inView, to]);
  return { ref, n };
}

/* ─── 라이브 메트릭 ─── */
interface Metric { val: number; suffix: string; label: string; desc: string; live?: boolean; }
const METRICS: Metric[] = [
  { val: 347, suffix: "개", label: "현재 가동 크레인", desc: "실시간 운영 중", live: true },
  { val: 523, suffix: "건", label: "누적 납품 실적", desc: "1984–2026" },
  { val: 99,  suffix: "%", label: "품질 합격률", desc: "2025년 기준" },
  { val: 94,  suffix: "+", label: "신뢰 고객사", desc: "국내외 합산" },
];

/* ─── 업종 차트 데이터 ─── */
const CHART = [
  { label: "철강·금속", val: 112 },
  { label: "물류·창고", val: 91 },
  { label: "반도체",   val: 87 },
  { label: "발전·에너지", val: 73 },
  { label: "석유화학", val: 64 },
  { label: "자동차",   val: 55 },
  { label: "조선·해양", val: 41 },
];
const MAX_C = 112;

function Chart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <div ref={ref} className="space-y-4">
      {CHART.map((d, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="text-[12px] w-20 text-right shrink-0" style={{ color: "#94a3b8" }}>{d.label}</span>
          <div className="flex-1 h-[3px] rounded-full" style={{ background: "rgba(10,28,74,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "#f47c20", opacity: 0.7 }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${(d.val / MAX_C) * 100}%` } : {}}
              transition={{ duration: 1.3, delay: 0.08 * i, ease: E }}
            />
          </div>
          <motion.span
            className="text-[12px] font-mono w-7 text-right shrink-0"
            style={{ color: "#64748b" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + 0.08 * i }}
          >
            {d.val}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

/* ─── 뉴스 ─── */
const NEWS = [
  { num: "01", date: "2026.06", cat: "기술", title: "반도체 클린룸 전용 크레인 — 0.1μm 진동 제어 세계 최초 달성" },
  { num: "02", date: "2026.05", cat: "납품", title: "200T급 천장크레인 준공 — 당진 발전소 국내 최대 규모" },
  { num: "03", date: "2026.04", cat: "수상", title: "산업통상자원부 장관 표창 수상 — 산업기계 혁신 부문" },
  { num: "04", date: "2026.03", cat: "채용", title: "2026 상반기 공개채용 — 기계설계·전기제어·영업" },
  { num: "05", date: "2026.02", cat: "인증", title: "ISO 9001:2015 품질경영시스템 갱신 완료 — 3회 연속" },
  { num: "06", date: "2026.01", cat: "납품", title: "SK이노베이션 울산 갠트리크레인 납품 완료" },
];

/* ─── 메인 ─── */
export default function NexusDemo() {
  /* 마키 */
  const CLIENTS = ["삼성전자", "현대제철", "LG화학", "SK이노베이션", "POSCO", "한국수력원자력", "OCI", "한화솔루션", "GS칼텍스", "두산중공업", "현대건설", "롯데케미칼"];

  /* 히어로 패럴랙스 */
  const heroRef = useRef(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(hp, [0, 1], ["0%", "22%"]);
  const heroOp = useTransform(hp, [0, 0.75], [1, 0]);

  return (
    <div className="font-sans overflow-x-hidden" style={{ color: "#0a1c4a" }}>

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 h-[64px]"
        style={{ background: "#071129", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container-xl h-full flex items-center justify-between">
          <Link href="/">
            <Image src="/images/sejong-logo.png" alt="SEJONG" width={120} height={28} className="h-7 w-auto brightness-0 invert" />
          </Link>
          <nav className="hidden lg:flex items-center gap-1 text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            {["회사소개", "사업영역", "납품실적", "고객지원"].map(m => (
              <a key={m} href="#" className="px-3.5 py-2 hover:text-white transition-colors">{m}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:0317771234" className="hidden md:block text-[12px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              031-777-1234
            </a>
            <a href="/support/inquiry"
              className="text-[12px] font-bold px-5 py-2.5 transition-opacity hover:opacity-80"
              style={{ background: "#f47c20", color: "#fff" }}
            >
              문의하기
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="pt-[64px] overflow-hidden" style={{ background: "#071129", minHeight: "100svh" }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-center py-24 md:py-32 min-h-[calc(100svh-64px)]">

            {/* 좌: 카피 */}
            <div className="lg:col-span-3 lg:pr-20">
              <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="text-[11px] font-mono tracking-[0.35em] uppercase mb-8" style={{ color: "#f47c20" }}>
                대한민국 크레인 전문기업 · Since 1984
              </motion.p>

              {["40년의 기술이", "산업현장을", "바꿉니다."].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    className="text-h1 text-white leading-[1.04]"
                    initial={{ y: "105%" }} animate={{ y: 0 }}
                    transition={{ delay: 0.38 + i * 0.12, duration: 1.0, ease: E }}
                    style={{ color: i === 1 ? "#f47c20" : "#fff" }}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
                className="text-[15px] leading-[1.8] mt-8 mb-10 max-w-md" style={{ color: "rgba(255,255,255,0.42)" }}>
                반도체 클린룸부터 원자력 발전소까지. 세종호이스트크레인의 기술이 대한민국 핵심 산업 현장에서 가동됩니다.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex flex-wrap gap-3">
                <a href="/support/inquiry" className="px-8 py-3.5 font-bold text-[13px] hover:opacity-80 transition-opacity"
                  style={{ background: "#f47c20", color: "#fff" }}>
                  무료 상담 신청
                </a>
                <a href="/portfolio" className="px-8 py-3.5 font-semibold text-[13px] transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                >
                  납품실적 보기
                </a>
              </motion.div>
            </div>

            {/* 우: 라이브 대시보드 */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: E }}
              className="lg:col-span-2 mt-14 lg:mt-0 p-7"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-[11px] font-mono tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                  실시간 운영 현황
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#4ade80" }} />
                  <span className="text-[9px] font-mono" style={{ color: "#4ade80" }}>LIVE</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {METRICS.map((m, i) => {
                  const { ref, n } = useCounter(m.val);
                  return (
                    <div key={i} className={cn("p-4", m.live ? "border" : "")}
                      style={{
                        background: m.live ? "rgba(244,124,32,0.08)" : "rgba(255,255,255,0.04)",
                        borderColor: m.live ? "rgba(244,124,32,0.25)" : undefined,
                      }}>
                      <p ref={ref as React.RefObject<HTMLParagraphElement>}
                        className="font-black tabular-nums leading-none mb-2"
                        style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", color: m.live ? "#f47c20" : "#fff", letterSpacing: "-0.03em" }}>
                        {n.toLocaleString()}{m.suffix}
                      </p>
                      <p className="text-[11px] leading-snug" style={{ color: "rgba(255,255,255,0.35)" }}>{m.label}</p>
                      {m.live && <p className="text-[9px] mt-1.5" style={{ color: "#4ade80" }}>● {m.desc}</p>}
                    </div>
                  );
                })}
              </div>

              {/* 미니 차트 */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20 }}>
                <p className="text-[10px] font-mono tracking-wider uppercase mb-4" style={{ color: "rgba(255,255,255,0.2)" }}>
                  업종별 납품
                </p>
                <Chart />
              </div>
            </motion.div>
          </div>
        </div>

        {/* 고객사 마키 */}
        <div className="overflow-hidden py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          <div className="flex gap-12 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="text-[13px] font-semibold shrink-0" style={{ color: "rgba(255,255,255,0.2)" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 사업영역 2분할 */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {[
          { label: "크레인", en: "Crane Solutions", img: "/images/sejong_2.png", count: "348", items: ["이중거더 천장크레인", "단거더 천장크레인", "레일식 갠트리크레인", "타이어식 갠트리크레인"], desc: "산업현장의 모든 조건에 대응하는 세종의 핵심 제품군." },
          { label: "호이스트 & 특수", en: "Hoist & Special", img: "/images/sejong_3.png", count: "175", items: ["전동 체인호이스트", "방폭형 크레인", "클린룸 크레인", "원자력 특수 크레인"], desc: "일반 크레인이 들어갈 수 없는 곳에 세종의 해법이 있습니다." },
        ].map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1 }}
            className="relative group overflow-hidden cursor-pointer" style={{ minHeight: 560 }}>
            <Image src={p.img} alt={p.label} fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              style={{ filter: "brightness(0.28)" }} sizes="(max-width:768px)100vw,50vw" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top,#071129f0 0%,#071129 40 0%,transparent 100%)" }} />

            <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-14">
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5"
                  style={{ border: "1px solid rgba(244,124,32,0.4)", color: "#f47c20" }}>
                  {p.en}
                </span>
              </div>
              <div>
                <p className="text-[11px] font-mono mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                  납품 {p.count}건
                </p>
                <h3 className="text-white font-bold mb-4 leading-tight" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.02em" }}>
                  {p.label}
                </h3>
                <p className="text-[14px] leading-[1.75] mb-7 max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {p.desc}
                </p>
                <ul className="space-y-2.5 mb-9">
                  {p.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                      <span className="w-4 h-px shrink-0" style={{ background: "rgba(244,124,32,0.5)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/business" className="inline-flex items-center gap-3 text-[13px] font-semibold text-white group/l">
                  <span className="h-px w-6 group-hover/l:w-12 group-hover/l:bg-orange-400 transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.4)" }} />
                  더 보기
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 업종 차트 + 핵심 지표 */}
      <section className="section-pad" style={{ background: "#f4f7fc" }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-[11px] font-mono tracking-[0.28em] uppercase mb-5" style={{ color: "#f47c20" }}>
                Industry
              </motion.p>
              <motion.h2 className="text-h2 mb-5" style={{ color: "#0a1c4a" }}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}>
                모든 산업 현장에서<br />세종이 함께합니다
              </motion.h2>
              <motion.p className="text-[15px] leading-[1.8] mb-12" style={{ color: "#64748b" }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                철강·물류·반도체·에너지 등 7개 핵심 산업에 걸쳐 총 523건의 납품 실적을 보유합니다.
              </motion.p>
              <Chart />
            </div>

            {/* 핵심 지표 4개 */}
            <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(10,28,74,0.08)" }}>
              {[
                { val: 40, suffix: "+", label: "년 업력", note: "1984년 창립" },
                { val: 523, suffix: "", label: "건 납품", note: "누적 실적" },
                { val: 200, suffix: "T", label: "최대 하중", note: "제작 가능" },
                { val: 24, suffix: "H", label: "AS 대응", note: "24시간 체계" },
              ].map((s, i) => {
                const { ref, n } = useCounter(s.val);
                return (
                  <div key={i} ref={ref as React.RefObject<HTMLDivElement>}
                    className="flex flex-col justify-center p-8 md:p-10 text-center group hover:bg-brand-navy transition-colors duration-300"
                    style={{ background: "#fff" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#0a1c4a")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                  >
                    <p className="font-black tabular-nums mb-1.5"
                      style={{ fontSize: "clamp(2.5rem,5vw,4rem)", letterSpacing: "-0.04em", color: "#0a1c4a", transition: "color 0.3s" }}>
                      {n.toLocaleString()}{s.suffix}
                    </p>
                    <p className="text-[13px] font-semibold" style={{ color: "#0a1c4a", transition: "color 0.3s" }}>{s.label}</p>
                    <p className="text-[11px] mt-1" style={{ color: "#94a3b8", transition: "color 0.3s" }}>{s.note}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 뉴스 */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div className="container-xl">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[11px] font-mono tracking-[0.3em] uppercase mb-3" style={{ color: "#f47c20" }}>Newsroom</p>
              <h2 className="text-h2" style={{ color: "#0a1c4a" }}>최신 소식</h2>
            </div>
            <Link href="/support/notice" className="hidden md:block text-[13px] font-semibold hover:opacity-60 transition-opacity"
              style={{ color: "#0a1c4a" }}>
              전체 →
            </Link>
          </div>

          <div style={{ borderTop: "1px solid rgba(10,28,74,0.07)" }}>
            {NEWS.map((n, i) => (
              <motion.a key={i} href="/support/notice"
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.055, ease: E }}
                className="flex items-center gap-5 md:gap-10 py-5 group transition-all"
                style={{ borderBottom: "1px solid rgba(10,28,74,0.07)" }}
                onMouseEnter={e => (e.currentTarget.style.paddingLeft = "10px", e.currentTarget.style.background = "#f4f7fc")}
                onMouseLeave={e => (e.currentTarget.style.paddingLeft = "0", e.currentTarget.style.background = "transparent")}
              >
                <span className="font-black text-xl w-8 shrink-0" style={{ color: "rgba(10,28,74,0.1)" }}>{n.num}</span>
                <span className="text-[11px] font-mono hidden md:block w-16 shrink-0" style={{ color: "#94a3b8" }}>{n.date}</span>
                <span className="text-[10px] font-bold px-2.5 py-1 shrink-0"
                  style={{ background: "rgba(244,124,32,0.1)", color: "#f47c20" }}>{n.cat}</span>
                <span className="flex-1 text-[14px] font-medium transition-colors" style={{ color: "#0a1c4a" }}>{n.title}</span>
                <span className="hidden md:block text-[13px] shrink-0 group-hover:text-orange-500 transition-colors" style={{ color: "rgba(10,28,74,0.2)" }}>→</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: "#071129" }}>
        <div className="container-xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <motion.h2 className="text-h1 text-white mb-5"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}>
              크레인 도입을<br />계획하고 계신가요?
            </motion.h2>
            <motion.p className="text-[15px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.4)" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              전문 엔지니어가 현장을 방문하여 최적의 솔루션을 제안합니다. 문의 접수 후 영업일 1일 이내 답변.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4">
            <a href="/support/inquiry"
              className="flex-1 py-4 font-bold text-center text-[13px] hover:opacity-80 transition-opacity"
              style={{ background: "#f47c20", color: "#fff" }}>
              온라인 문의
            </a>
            <a href="tel:0317771234"
              className="flex-1 py-4 font-semibold text-center text-[13px] transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              031-777-1234
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-14 py-7 flex flex-col md:flex-row justify-between items-center gap-3"
        style={{ background: "#040c1e", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.18)" }}>© 2026 Sejong Hoist &amp; Crane.</p>
        <div className="flex items-center gap-2 text-[12px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#f47c20" }} />
          Demo 2 — NEXUS
          <Link href="/demo" className="ml-4 hover:text-white/50 transition-colors">← 데모 목록</Link>
        </div>
      </footer>
    </div>
  );
}
