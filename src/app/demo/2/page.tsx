"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ── 카운터 ── */
function Counter({ to, suffix = "", decimal = false }: { to: number; suffix?: string; decimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctrl = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1] as any,
      onUpdate: v => setVal(decimal ? Math.round(v * 10) / 10 : Math.floor(v)),
    });
    return () => ctrl.stop();
  }, [inView, to, decimal]);
  return <span ref={ref}>{decimal ? val.toFixed(1) : val.toLocaleString()}{suffix}</span>;
}

/* ── 티커 ── */
const TICKER = ["삼성전자", "현대제철", "LG화학", "SK이노베이션", "POSCO", "한국수력원자력", "OCI", "한화솔루션", "GS칼텍스", "S-Oil", "두산중공업", "현대건설", "롯데케미칼", "KCC", "효성중공업"];

const METRICS = [
  { val: 347, suffix: "개", label: "현재 가동 중인 크레인", live: true },
  { val: 523, suffix: "건", label: "누적 납품 실적" },
  { val: 99, suffix: ".2%", label: "고객 만족도", decimal: false },
  { val: 40, suffix: "년+", label: "업력" },
  { val: 94, suffix: "개사", label: "고객사" },
  { val: 24, suffix: "H", label: "AS 대응 체계" },
];

const INDUSTRIES = [
  { name: "반도체", icon: "⬡", count: 87 },
  { name: "철강·금속", icon: "⬡", count: 112 },
  { name: "석유화학", icon: "⬡", count: 64 },
  { name: "발전·에너지", icon: "⬡", count: 73 },
  { name: "자동차", icon: "⬡", count: 55 },
  { name: "조선·해양", icon: "⬡", count: 41 },
  { name: "물류·창고", icon: "⬡", count: 91 },
];

const CERTS = [
  { code: "ISO", label: "ISO 9001:2015", sub: "품질경영시스템" },
  { code: "KS", label: "KS 인증", sub: "산업표준 적합성" },
  { code: "방폭", label: "방폭 인증", sub: "위험장소 적합 검정" },
  { code: "KGS", label: "KGS 검사", sub: "크레인 정기검사" },
];

const NEWS = [
  { num: "01", date: "2026.06.10", cat: "기술", title: "반도체 클린룸 전용 크레인 개발 완료 — 0.1μm급 진동 제어 달성" },
  { num: "02", date: "2026.05.22", cat: "납품", title: "국내 최대 규모 200T급 천장크레인 준공 — 당진 발전소 납품" },
  { num: "03", date: "2026.04.15", cat: "수상", title: "산업통상자원부 장관 표창 수상 — 산업기계 혁신 부문" },
  { num: "04", date: "2026.03.08", cat: "채용", title: "2026 상반기 공개채용 — 기계설계·전기제어·영업 분야" },
  { num: "05", date: "2026.02.20", cat: "인증", title: "ISO 9001:2015 품질경영시스템 갱신 완료 — 3회 연속" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const easing = [0.16, 1, 0.3, 1] as any;
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease: easing } }),
};

export default function CommandDemo() {
  const [tickerOffset, setTickerOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTickerOffset(o => (o + 1) % (TICKER.length * 180)), 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white text-[#0a1c4a] font-sans overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1c4a] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 flex items-center justify-between h-16">
          <Link href="/">
            <Image src="/images/sejong-logo.png" alt="SEJONG" width={130} height={32} className="h-8 w-auto brightness-0 invert" />
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {["회사소개", "사업영역", "납품실적", "고객지원"].map(m => (
              <a key={m} href="#" className="px-4 py-2 text-[13px] text-white/70 hover:text-white transition-colors">{m}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:0317771234" className="hidden md:flex items-center gap-2 text-white/50 hover:text-white text-xs transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 013.44 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              031-777-1234
            </a>
            <a href="/support/inquiry" className="bg-[#f47c20] text-white text-[12px] font-bold px-4 py-2 hover:bg-[#d96a10] transition-colors">
              문의하기
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-[#0a1c4a] pt-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[85vh] items-center py-16">

            {/* 왼쪽 텍스트 */}
            <div className="lg:col-span-3 pr-0 lg:pr-16">
              <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="text-[#f47c20] text-[10px] tracking-[0.3em] uppercase mb-6">
                대한민국 크레인 전문기업 · Since 1984
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-white font-bold leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", letterSpacing: "-0.025em" }}>
                40년의 기술이<br />
                <span className="text-[#f47c20]">산업현장을</span><br />
                바꿉니다
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className="text-white/50 text-base leading-relaxed mb-10 max-w-lg">
                반도체 클린룸부터 원자력 발전소까지. 세종호이스트크레인의 기술이 대한민국 산업의 핵심 현장에서 가동되고 있습니다.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-wrap gap-3">
                <a href="/support/inquiry" className="bg-[#f47c20] text-white font-bold text-sm px-8 py-3.5 hover:bg-[#d96a10] transition-colors">
                  무료 상담 신청
                </a>
                <a href="/portfolio" className="border border-white/20 text-white font-bold text-sm px-8 py-3.5 hover:border-white/50 transition-colors">
                  납품실적 보기
                </a>
              </motion.div>
            </div>

            {/* 오른쪽: 실시간 대시보드 */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.9 }}
              className="lg:col-span-2 bg-white/5 border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-white/50 text-xs tracking-wider uppercase">실시간 현황</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                  <span className="text-[#4ade80] text-[10px]">LIVE</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {METRICS.slice(0, 4).map((m, i) => (
                  <div key={i} className={`p-4 ${m.live ? "bg-[#f47c20]/10 border border-[#f47c20]/20" : "bg-white/5"}`}>
                    <p className="text-white font-black text-3xl mb-1 tabular-nums">
                      <Counter to={m.val} suffix={m.suffix} />
                    </p>
                    <p className="text-white/40 text-[10px] leading-tight">{m.label}</p>
                    {m.live && <p className="text-[#f47c20] text-[9px] mt-1">● 현재 가동</p>}
                  </div>
                ))}
              </div>

              {/* 인더스트리 바 */}
              <div className="mt-5 space-y-2">
                {INDUSTRIES.slice(0, 4).map((ind, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-white/30 text-[10px] w-16 flex-shrink-0">{ind.name}</span>
                    <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full bg-[#f47c20]/60"
                        initial={{ width: 0 }}
                        animate={{ width: `${(ind.count / 120) * 100}%` }}
                        transition={{ delay: 1.2 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <span className="text-white/30 text-[10px] w-8 text-right">{ind.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 고객사 티커 */}
        <div className="border-t border-white/10 py-4 overflow-hidden bg-white/3">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-white/20 mb-2 px-14">
            <span className="w-1 h-1 rounded-full bg-[#f47c20]" />
            주요 납품처
          </div>
          <div className="flex gap-16 whitespace-nowrap" style={{ transform: `translateX(-${tickerOffset / 3}px)`, transition: "none" }}>
            {[...TICKER, ...TICKER, ...TICKER].map((name, i) => (
              <span key={i} className="text-white/30 text-sm font-semibold flex-shrink-0">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 사업영역 분할 패널 ── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {[
          {
            title: "크레인", en: "Crane Solutions",
            desc: "천장크레인과 갠트리크레인. 산업현장의 모든 조건에 대응하는 세종의 핵심 제품군입니다.",
            items: ["이중거더 천장크레인", "단거더 천장크레인", "레일식 갠트리크레인", "타이어식 갠트리크레인"],
            img: "/images/sejong_2.png", count: "348건",
          },
          {
            title: "호이스트 & 특수", en: "Hoist & Special",
            desc: "전동 체인호이스트부터 방폭·클린룸·원자력 특수크레인까지. 세종의 기술적 도전입니다.",
            items: ["전동 체인호이스트", "와이어로프 호이스트", "클린룸 크레인", "방폭형 특수크레인"],
            img: "/images/sejong_3.png", count: "175건",
          },
        ].map((panel, i) => (
          <div key={i} className="relative group overflow-hidden cursor-pointer min-h-[480px]">
            <Image src={panel.img} alt={panel.title} fill className="object-cover brightness-40 group-hover:brightness-30 transition-all duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c4a]/90 to-[#0a1c4a]/30" />
            <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
              <p className="text-[#f47c20] text-[10px] tracking-[0.2em] uppercase mb-3">{panel.en} · {panel.count}</p>
              <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">{panel.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">{panel.desc}</p>
              <ul className="space-y-1.5 mb-8">
                {panel.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-white/50 text-sm">
                    <span className="w-3 h-px bg-[#f47c20]/50" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/business" className="text-white text-sm font-semibold flex items-center gap-2 group/link w-fit">
                <span className="h-px w-6 bg-white/40 group-hover/link:w-10 group-hover/link:bg-[#f47c20] transition-all" />
                사업영역 전체 보기
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* ── 핵심 지표 ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          <div className="text-center mb-14">
            <p className="text-[#f47c20] text-[10px] tracking-[0.25em] uppercase mb-3">Why Sejong</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1c4a]">숫자로 증명하는 세종의 기술력</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border border-gray-200">
            {METRICS.map((m, i) => (
              <motion.div
                key={i}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="p-7 text-center border-r border-b md:border-b-0 border-gray-200 last:border-r-0 hover:bg-[#0a1c4a] hover:text-white transition-colors duration-300 group"
              >
                <p className="text-3xl md:text-4xl font-black text-[#0a1c4a] group-hover:text-white mb-2 tabular-nums transition-colors">
                  <Counter to={m.val} suffix={m.suffix} decimal={m.decimal} />
                </p>
                <p className="text-[10px] text-gray-400 group-hover:text-white/50 transition-colors">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 인증 ── */}
      <section className="bg-[#0a1c4a] py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {CERTS.map((c, i) => (
              <div key={i} className="bg-[#0a1c4a] px-8 py-8 text-center">
                <div className="w-12 h-12 border border-[#f47c20]/40 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#f47c20] font-black text-xs tracking-wider">{c.code}</span>
                </div>
                <p className="text-white font-semibold text-sm mb-1">{c.label}</p>
                <p className="text-white/30 text-xs">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 뉴스 ── */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#f47c20] text-[10px] tracking-[0.25em] uppercase mb-3">Newsroom</p>
              <h2 className="text-2xl md:text-3xl font-bold">최신 소식</h2>
            </div>
            <Link href="/support/notice" className="text-sm text-[#0a1c4a] font-semibold hidden md:block">전체 보기 →</Link>
          </div>
          <div className="border-t border-gray-100">
            {NEWS.map((n, i) => (
              <motion.a
                key={i} href="/support/notice"
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex items-start md:items-center gap-4 md:gap-8 py-5 border-b border-gray-100 hover:pl-2 transition-all duration-200 group"
              >
                <span className="text-gray-200 font-black text-xl w-8 flex-shrink-0 group-hover:text-[#f47c20]/30 transition-colors">{n.num}</span>
                <span className="hidden md:block text-gray-400 text-xs font-mono w-24 flex-shrink-0">{n.date}</span>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-semibold px-2 py-0.5 flex-shrink-0">{n.cat}</span>
                <span className="text-gray-700 text-sm flex-1 group-hover:text-[#0a1c4a] transition-colors">{n.title}</span>
                <span className="text-gray-300 group-hover:text-[#f47c20] transition-colors flex-shrink-0">→</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0a1c4a] py-24 px-6 md:px-14">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-white font-bold leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
                크레인 도입을<br />계획하고 계신가요?
              </h2>
              <p className="text-white/50 text-base leading-relaxed">
                전문 엔지니어가 현장을 직접 방문하여 최적의 솔루션을 제안합니다. 문의 접수 후 영업일 1일 이내 답변.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/support/inquiry" className="flex-1 bg-[#f47c20] text-white font-bold text-center py-4 hover:bg-[#d96a10] transition-colors">
                온라인 문의하기
              </a>
              <a href="tel:0317771234" className="flex-1 border border-white/20 text-white font-bold text-center py-4 hover:border-white/50 transition-colors">
                031-777-1234
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 bg-[#060f25] px-6 md:px-14 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs">
        <p>© 2026 SEJONG HOIST &amp; CRANE. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f47c20] animate-pulse" />
          <span>Demo 2 — COMMAND CENTER</span>
          <Link href="/demo" className="ml-4 hover:text-white transition-colors">← 다른 데모 보기</Link>
        </div>
      </footer>
    </div>
  );
}
