"use client";

/**
 * DEMO 4: HANWHA SYSTEMS STYLE
 *
 * 분석 근거:
 * - "CONNECT TO THE FUTURE" 스타일의 풀스크린 대형 타이포그래피 히어로
 * - Defense/ICT 비즈니스 분할 패널 (→ 크레인/호이스트 분할)
 * - 번호형 뉴스 리스트 (01~07)
 * - ESG 번호형 섹션 (→ 핵심가치 번호형)
 * - 리쿠르팅 스타일 대형 CTA ("가슴속에 불꽃을...")
 * - Persona 선택 UX ("방문목적을 선택해주세요")
 * - 스크롤 라인 인디케이터
 *
 * 뇌과학/심리학 원리:
 * 1. 텍스트 계층 효과(Typography Hierarchy): 초대형 주제어 → 보조 텍스트 → 세부 정보
 *    → 뇌가 자동으로 중요도 순으로 처리 (F-패턴 스캔 우선 처리)
 * 2. 기대 확인(Expectation Confirmation): 대기업 사이트처럼 느껴지는 레이아웃
 *    → 인지적 익숙함 = 신뢰감 = 전환율 ↑
 * 3. 능동적 참여(Active Engagement): Persona 선택 인터랙션
 *    → IKEA 효과: 직접 선택한 정보 = 더 가치있게 인식
 * 4. 색 심리학: 진한 Navy = 신뢰·안정·권위 (금융·방산에서 검증됨)
 *    Orange = 에너지·행동 유발 (CTA 버튼 전환율 ↑ 연구)
 * 5. 점진적 노출(Progressive Disclosure): 풀섹션 스크롤
 *    → 각 섹션이 완전히 보일 때 정보 전달 → 집중도 극대화
 */

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─── 데이터 ─── */
const PERSONAS = ["전체", "잠재고객", "시공사", "발주처"] as const;

const NEWS = [
  { num: "01", date: "2026.06.10", title: "반도체 클린룸 전용 크레인 개발 — 0.1μm 정밀제어 달성" },
  { num: "02", date: "2026.05.22", title: "국내 최대 200T급 천장크레인 준공 — 당진 발전소 납품" },
  { num: "03", date: "2026.04.15", title: "산업통상자원부 장관 표창 수상 — 산업기계 혁신 부문" },
  { num: "04", date: "2026.03.08", title: "2026 상반기 공개채용 — 기계설계·전기제어·영업" },
  { num: "05", date: "2026.02.20", title: "ISO 9001:2015 품질경영시스템 갱신 완료 — 3회 연속" },
  { num: "06", date: "2026.01.30", title: "SK이노베이션 울산 공장 갠트리크레인 납품 완료" },
  { num: "07", date: "2025.12.15", title: "국내 최초 수소 생산 시설용 방폭형 특수크레인 개발" },
];

const VALUES = [
  {
    num: "01",
    title: "SAFETY FIRST",
    label: "안전",
    desc: "모든 설계의 첫 번째 기준은 안전입니다. KS·ISO·KGS 등 국내외 인증 기준을 상회하는 세종만의 안전 설계 기준을 적용합니다.",
  },
  {
    num: "02",
    title: "PRECISION",
    label: "정밀함",
    desc: "반도체 클린룸의 0.1μm 진동 제어부터 200T 중량물 이송까지. 어떤 조건에서도 정밀하고 안정적인 작동을 보장합니다.",
  },
  {
    num: "03",
    title: "PARTNERSHIP",
    label: "파트너십",
    desc: "납품 후에도 24시간 AS 체계와 함께합니다. 단순 제조사가 아닌 고객의 현장 파트너로서 책임을 다합니다.",
  },
  {
    num: "04",
    title: "INNOVATION",
    label: "혁신",
    desc: "40년의 경험을 기반으로 미래 기술에 투자합니다. IoT 모니터링, 예측 정비 시스템 등 스마트 크레인 기술을 선도합니다.",
  },
];

/* ─── 서브컴포넌트 ─── */
function ScrollLine() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-px h-16 bg-white/20 overflow-hidden">
        <motion.div
          className="absolute top-0 w-full bg-white/80"
          style={{ height: "40%" }}
          animate={{ y: ["0%", "260%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase">Scroll</p>
    </div>
  );
}

/* ─── 메인 ─── */
export default function HanwhaDemo() {
  const [persona, setPersona] = useState<typeof PERSONAS[number]>("전체");
  const [activeValue, setActiveValue] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="bg-[#0a1c4a] text-white font-sans overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1c4a]/90 backdrop-blur border-b border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <Link href="/">
            <Image src="/images/sejong-logo.png" alt="SEJONG" width={130} height={32} className="h-7 w-auto brightness-0 invert" />
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className="hidden lg:flex items-center gap-1">
            {["기업정보", "사업영역", "지속가능경영", "납품실적", "뉴스룸"].map(m => (
              <a key={m} href="#" className="px-3.5 py-2 text-[13px] text-white/60 hover:text-white transition-colors">{m}</a>
            ))}
          </div>

          {/* 우측 유틸리티 */}
          <div className="flex items-center gap-3">
            {/* 언어 */}
            <span className="hidden md:block text-white/30 text-[11px] border border-white/20 px-2.5 py-1 hover:border-white/50 cursor-pointer transition-colors">KR</span>
            <a href="/support/inquiry" className="bg-[#f47c20] text-white font-bold text-[12px] px-5 py-2.5 hover:bg-[#d96a10] transition-colors">
              무료 상담
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO: "CONNECT TO THE FUTURE" 스타일 ── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-end">
        {/* 배경 비디오 이미지 */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/images/sejong_2.png" alt="hero" fill className="object-cover brightness-[0.25]" priority />
          {/* 방향성 있는 그라데이션 오버레이 */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,28,74,0.85) 0%, rgba(10,28,74,0.4) 50%, transparent 100%)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c4a] via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-24 max-w-[1400px] mx-auto">
          {/* "CONNECT TO" 스타일 분할 타이포그래피 */}
          <motion.p
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="text-[#f47c20] text-[10px] tracking-[0.4em] uppercase mb-8"
          >
            SEJONG HOIST &amp; CRANE — EST. 1984
          </motion.p>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-[0.88] text-white"
              style={{ fontSize: "clamp(4rem, 14vw, 11rem)", letterSpacing: "-0.04em" }}
            >
              CRANE
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.65, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-[0.88]"
              style={{ fontSize: "clamp(4rem, 14vw, 11rem)", letterSpacing: "-0.04em", color: "rgba(255,255,255,0.15)" }}
            >
              BEYOND
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.8, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-[0.88] text-white"
              style={{ fontSize: "clamp(4rem, 14vw, 11rem)", letterSpacing: "-0.04em" }}
            >
              LIMITS
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
          >
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              40년의 기술이 대한민국 산업의<br className="hidden md:block" />
              심장을 움직입니다.
            </p>
            <div className="flex gap-3">
              <a href="/business" className="bg-white text-[#0a1c4a] font-bold text-sm px-7 py-3 hover:bg-[#f47c20] hover:text-white transition-all">
                사업영역 보기
              </a>
              <a href="/support/inquiry" className="border border-white/30 text-white font-bold text-sm px-7 py-3 hover:border-white transition-colors">
                상담 신청
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <ScrollLine />
        </motion.div>

        {/* 우측 수직 텍스트 */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-4">
          <p className="text-white/20 text-[9px] tracking-[0.35em] uppercase" style={{ writingMode: "vertical-rl" }}>
            Industrial Excellence Since 1984
          </p>
        </div>
      </section>

      {/* ── PERSONA 선택기 (한화 "방문목적" 영감) ── */}
      <section className="bg-[#0a1c4a] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <p className="text-white/40 text-sm flex-shrink-0">방문 목적에 맞게 탐색하세요</p>
            <div className="flex flex-wrap gap-2">
              {PERSONAS.map(p => (
                <button
                  key={p}
                  onClick={() => setPersona(p)}
                  className={`px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    persona === p
                      ? "bg-[#f47c20] text-white"
                      : "border border-white/20 text-white/50 hover:border-white/50 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={persona}
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-auto hidden lg:flex items-center gap-8"
              >
                {persona === "잠재고객" && (
                  <>
                    <a href="/business" className="text-white/60 hover:text-white text-sm transition-colors">→ 제품 사양 보기</a>
                    <a href="/portfolio" className="text-white/60 hover:text-white text-sm transition-colors">→ 납품 실적 확인</a>
                    <a href="/support/inquiry" className="text-[#f47c20] hover:text-white text-sm transition-colors">→ 무료 상담 신청</a>
                  </>
                )}
                {persona === "시공사" && (
                  <>
                    <a href="/business" className="text-white/60 hover:text-white text-sm transition-colors">→ 기술 규격서</a>
                    <a href="/support" className="text-white/60 hover:text-white text-sm transition-colors">→ AS 시스템</a>
                    <a href="/support/inquiry" className="text-[#f47c20] hover:text-white text-sm transition-colors">→ 파트너 문의</a>
                  </>
                )}
                {persona === "발주처" && (
                  <>
                    <a href="/portfolio" className="text-white/60 hover:text-white text-sm transition-colors">→ 레퍼런스 확인</a>
                    <a href="/about" className="text-white/60 hover:text-white text-sm transition-colors">→ 회사 소개</a>
                    <a href="/support/inquiry" className="text-[#f47c20] hover:text-white text-sm transition-colors">→ 프로젝트 문의</a>
                  </>
                )}
                {persona === "전체" && (
                  <>
                    <a href="/business" className="text-white/60 hover:text-white text-sm transition-colors">→ 사업영역</a>
                    <a href="/portfolio" className="text-white/60 hover:text-white text-sm transition-colors">→ 납품실적</a>
                    <a href="/support/inquiry" className="text-[#f47c20] hover:text-white text-sm transition-colors">→ 문의하기</a>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── 사업영역: Defense/ICT 스타일 ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 bg-white">
        {[
          {
            code: "Defense",
            label: "크레인",
            tagline: "초지능·초정밀 크레인 기술",
            desc: "산업현장의 모든 조건에 대응하는 세종의 핵심 크레인 시스템. 반도체·발전·철강·조선의 핵심 현장에서 가동 중입니다.",
            items: ["천장크레인", "갠트리크레인", "특수 산업용"],
            img: "/images/sejong_2.png",
          },
          {
            code: "ICT",
            label: "호이스트 & 특수",
            tagline: "정밀 제어 호이스트 기술",
            desc: "체인호이스트부터 방폭·클린룸·원자력 특수 크레인까지. 세종의 기술적 도전이 불가능한 조건을 가능으로 바꿉니다.",
            items: ["전동 체인호이스트", "방폭형 크레인", "클린룸 크레인"],
            img: "/images/sejong_3.png",
          },
        ].map((panel, i) => (
          <div key={i} className="relative group overflow-hidden min-h-[560px] cursor-pointer">
            <Image
              src={panel.img} alt={panel.label} fill
              className="object-cover brightness-40 group-hover:brightness-30 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c4a]/90 via-[#0a1c4a]/30 to-transparent" />

            {/* 코드 태그 */}
            <div className="absolute top-8 left-8">
              <span className="text-[#f47c20] text-[10px] font-bold tracking-[0.3em] uppercase border border-[#f47c20]/40 px-3 py-1.5">
                {panel.code}
              </span>
            </div>

            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <p className="text-white/50 text-xs tracking-[0.25em] uppercase mb-3">{panel.tagline}</p>
              <h3 className="text-white font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
                {panel.label}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">{panel.desc}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {panel.items.map((item, j) => (
                  <span key={j} className="text-white/60 text-xs border border-white/20 px-3 py-1.5 group-hover:border-[#f47c20]/50 transition-colors">
                    {item}
                  </span>
                ))}
              </div>

              <a href="/business" className="flex items-center gap-3 text-white font-semibold text-sm w-fit group/link">
                <span className="h-px w-6 bg-white/40 group-hover/link:w-12 group-hover/link:bg-[#f47c20] transition-all duration-300" />
                사업영역 전체 보기
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* ── 핵심 가치: ESG 스타일 번호형 ── */}
      <section className="bg-[#f5f7fb] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* 왼쪽 제목 */}
            <div className="lg:w-80 flex-shrink-0">
              <p className="text-[#f47c20] text-[10px] tracking-[0.3em] uppercase mb-4">Core Values</p>
              <h2 className="text-[#0a1c4a] font-bold leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}>
                모든 이해관계자의<br />가치를 높이는<br />
                <span className="text-[#f47c20]">세종의 원칙</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                40년간 변하지 않은 4가지 핵심 가치가 세종호이스트크레인의 모든 제품과 서비스를 만듭니다.
              </p>
            </div>

            {/* 오른쪽 번호형 리스트 */}
            <div className="flex-1 space-y-0 border-t border-gray-200">
              {VALUES.map((v, i) => (
                <motion.div
                  key={i}
                  onClick={() => setActiveValue(i === activeValue ? -1 : i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`border-b border-gray-200 cursor-pointer transition-all duration-300 ${
                    activeValue === i ? "bg-[#0a1c4a]" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-6 px-4 md:px-6 py-6">
                    <span className={`font-black text-2xl flex-shrink-0 transition-colors ${activeValue === i ? "text-[#f47c20]" : "text-gray-200"}`}>
                      {v.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${activeValue === i ? "text-[#f47c20]/70" : "text-gray-400"}`}>
                          {v.title}
                        </p>
                        <span className={`text-sm transition-colors ${activeValue === i ? "text-white/50" : "text-gray-300"}`}>
                          {activeValue === i ? "−" : "+"}
                        </span>
                      </div>
                      <h3 className={`font-bold text-xl mb-2 transition-colors ${activeValue === i ? "text-white" : "text-[#0a1c4a]"}`}>
                        {v.label}
                      </h3>
                      <AnimatePresence>
                        {activeValue === i && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-white/60 text-sm leading-relaxed overflow-hidden"
                          >
                            {v.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 번호형 뉴스 리스트 (한화시스템 1:1 스타일) ── */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#f47c20] text-[10px] tracking-[0.3em] uppercase mb-3">Newsroom</p>
              <h2 className="text-[#0a1c4a] font-bold text-2xl md:text-3xl">고객을 향하는 기술,<br />미래를 향한 도전</h2>
            </div>
            <Link href="/support/notice" className="hidden md:flex items-center gap-2 text-[#0a1c4a]/50 hover:text-[#0a1c4a] text-sm transition-colors">
              전체 보기 →
            </Link>
          </div>

          <div className="border-t border-gray-100">
            {NEWS.map((n, i) => (
              <motion.a
                key={i} href="/support/notice"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 md:gap-8 py-5 border-b border-gray-100 group hover:bg-gray-50 px-2 transition-colors"
              >
                <span className="text-gray-200 font-black text-xl w-8 flex-shrink-0 group-hover:text-[#f47c20]/40 transition-colors">
                  {n.num}
                </span>
                <span className="text-gray-300 text-xs font-mono hidden md:block w-24 flex-shrink-0">{n.date}</span>
                <span className="text-[#0a1c4a] text-sm md:text-base flex-1 group-hover:text-[#f47c20] transition-colors">
                  {n.title}
                </span>
                <span className="text-gray-300 group-hover:text-[#f47c20] transition-colors text-sm flex-shrink-0">→</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── "가슴속에 불꽃을" → 문의 CTA ── */}
      <section className="relative bg-[#0a1c4a] py-24 md:py-32 overflow-hidden">
        <Image src="/images/sejong_4.png" alt="cta" fill className="object-cover brightness-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-[#0a1c4a]/70" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-[#f47c20] text-[10px] tracking-[0.35em] uppercase mb-6">Contact</p>
            <h2 className="font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              현장에서 증명된<br />
              <span className="text-white/30">세종의 기술,</span><br />
              지금 만나보세요.
            </h2>
            <p className="text-white/40 text-base leading-relaxed mb-10 max-w-xl">
              어떤 규모의 프로젝트든 세종호이스트크레인이 함께합니다. 전문 엔지니어가 현장을 직접 방문하여 최적의 솔루션을 제안합니다.
            </p>

            {/* 4가지 CTA 카드 (한화 채용 섹션 영감) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
              {[
                { icon: "📋", label: "제품 문의", href: "/support/inquiry", sub: "사양·견적 상담" },
                { icon: "🏭", label: "현장 방문", href: "/support/inquiry", sub: "무료 현장 진단" },
                { icon: "📁", label: "납품 실적", href: "/portfolio", sub: "523건 레퍼런스" },
                { icon: "🔧", label: "AS 시스템", href: "https://sejong-hoist.vercel.app", sub: "24H 대응" },
              ].map((card, i) => (
                <a
                  key={i} href={card.href}
                  className="group bg-[#0a1c4a] p-6 md:p-8 hover:bg-[#f47c20] transition-colors duration-300 text-center md:text-left"
                >
                  <span className="text-2xl mb-4 block group-hover:scale-110 transition-transform">{card.icon}</span>
                  <p className="text-white font-bold mb-1 text-base">{card.label}</p>
                  <p className="text-white/40 group-hover:text-white/70 text-xs transition-colors">{card.sub}</p>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 bg-[#060f25]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {[
              { title: "기업정보", items: ["기업개요", "CEO 인사말", "연혁", "찾아오시는 길"] },
              { title: "사업영역", items: ["천장크레인", "갠트리크레인", "호이스트", "특수크레인"] },
              { title: "납품실적", items: ["반도체", "철강·금속", "석유화학", "발전·에너지"] },
              { title: "고객지원", items: ["공지사항", "온라인 문의", "AS 시스템"] },
            ].map((col, i) => (
              <div key={i}>
                <p className="text-white/50 text-[11px] font-bold tracking-[0.15em] uppercase mb-4">{col.title}</p>
                <ul className="space-y-2">
                  {col.items.map((item, j) => (
                    <li key={j}>
                      <a href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-white/15 text-xs mb-1">© 2026 SEJONG HOIST &amp; CRANE Co., Ltd. All rights reserved.</p>
              <p className="text-white/15 text-xs">경기도 안산시 | Tel. 031-777-1234 | Fax. 031-777-5678</p>
            </div>
            <div className="flex items-center gap-2 text-white/15 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f47c20] animate-pulse" />
              <span>Demo 4 — HANWHA STYLE</span>
              <Link href="/demo" className="ml-4 hover:text-white/50 transition-colors">← 다른 데모 보기</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
