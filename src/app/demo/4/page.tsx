"use client";

/**
 * DEMO 4 : AUTHORITY (반응형 완전 대응)
 * 모바일 탭 가로 스크롤 + 스펙 2열 + 히어로 수치 sm+ 표시
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import DemoNav from "@/components/demo/DemoNav";

const E = [0.22, 1, 0.36, 1] as never;
const FONT = "'Pretendard Variable',Pretendard,var(--font-noto-sans-kr),'Noto Sans KR',sans-serif";

/* 사이트 디자인 시스템 정렬 (2026-07): 네이비 램프, NO BLUE/오렌지 금지 */
const NAVY_DEEP = "#16273c"; // 다크 섹션 배경·텍스트
const BRAND = "#2c4a6e"; // 라이트 배경 액센트
const TINT = "#e8edf3"; // 태그 배경

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: E as never, onUpdate: v => setN(Math.floor(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{n.toLocaleString()}{suffix}</span>;
}

function Clip({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "106%" }} whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 1.0, delay, ease: E }}>
        {children}
      </motion.div>
    </div>
  );
}

const PRODUCTS = [
  {
    tab: "오버헤드 크레인", en: "Overhead Crane",
    video: "/videos/4768-179741152_medium.mp4",
    img: "/images/sejong_2.png",
    pitch: "옥내 공장의 천장을 달리는\n표준 운반하역 솔루션.",
    body: "싱글·더블 거더 구조로 소형부터 대형까지 대응. LS ELECTRIC 부산사업장 30TON 더블거더 5대 등 옥내 크레인 다수 시공.",
    specs: [{ k: "적용 하중", v: "1 ~ 100 T" }, { k: "대표 실적", v: "30TON × 5대" }, { k: "설계", v: "현장 맞춤" }],
    tags: ["전기·전자", "자동차", "물류"],
  },
  {
    tab: "겐트리 크레인", en: "Gantry Crane",
    video: "/videos/5497-184226939_medium.mp4",
    img: "/images/sejong_3.png",
    pitch: "옥외 야드의 초대형 하역,\n350톤까지 검증됐습니다.",
    body: "풍하중·구조 해석을 반영한 옥외 설계. LS ELECTRIC 부산사업장 350TON 겐트리 크랩 크레인 시공, KCs 안전인증 취득.",
    specs: [{ k: "최대 하중", v: "350 T" }, { k: "형식", v: "겐트리·크랩" }, { k: "안전인증", v: "KCs 적합" }],
    tags: ["옥외 야드", "중공업", "철강"],
  },
  {
    tab: "호이스트", en: "Wire & Chain Hoist",
    video: "/videos/144584-785095786_medium.mp4",
    img: "/images/sejong_1.png",
    pitch: "와이어로프부터 체인까지,\n현장에 맞는 인양 솔루션.",
    body: "와이어로프·체인 타입, 전동·수동 구동. 정밀 제어와 견고한 구조, 손쉬운 유지보수로 다양한 현장에 대응합니다.",
    specs: [{ k: "와이어", v: "1 ~ 100 T" }, { k: "체인", v: "0.5 ~ 30 T" }, { k: "양정", v: "최대 50 m" }],
    tags: ["제조", "물류", "조립 라인"],
  },
  {
    tab: "방폭 호이스트", en: "Explosion-Proof Hoist",
    video: "/videos/159052-818026310_medium.mp4",
    img: "/images/sejong_4.png",
    pitch: "위험 구역 Zone 1·2,\n안전 기준 그대로.",
    body: "화학·정유·가스 현장에 대응하는 방폭형 호이스트. 방폭 Single Girder 3TON 신규 라인업을 추가했습니다.",
    specs: [{ k: "적용 하중", v: "1 ~ 20 T" }, { k: "인증", v: "방폭 대응" }, { k: "적용", v: "화학·정유·가스" }],
    tags: ["화학", "정유", "가스"],
  },
];

const VALUES = [
  { no: "01", title: "안전 최우선", body: "LS ELECTRIC 부산공장 크레인 13대 전수 안전인증 합격, 적합률 100%, 부적합 0건. 모든 설비는 현장 안전 기준을 충족하도록 설계·제작합니다." },
  { no: "02", title: "기술 혁신", body: "하중 조건·스팬·주행 환경을 반영한 구조 설계. 옥외 설비는 풍하중까지 검토해 처짐과 피로를 수치로 관리합니다." },
  { no: "03", title: "고객 신뢰", body: "설계부터 납품·시공·A/S까지 투명한 소통과 책임감 있는 서비스. LS ELECTRIC, 두산중공업, 현대위아가 파트너로 선택했습니다." },
  { no: "04", title: "장기 파트너십", body: "납품 이후가 시작. 정기 점검과 신속한 A/S로 고객 설비의 가동률을 지키는 전주기 파트너입니다." },
];

const CERTS = [
  { label: "ISO 9001:2015", sub: "품질경영시스템" },
  { label: "ISO 14001:2015", sub: "환경경영시스템" },
  { label: "ISO 45001:2018", sub: "안전보건경영시스템" },
  { label: "KCs 안전인증", sub: "한국승강기안전공단" },
];

const CLIENTS = ["LS ELECTRIC", "두산중공업", "현대위아", "LS ELECTRIC", "두산중공업", "현대위아", "LS ELECTRIC", "두산중공업", "현대위아"];

export default function Authority() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOp = useTransform(hp, [0, 0.7], [1, 0]);

  return (
    <div style={{ fontFamily: FONT, color: NAVY_DEEP }}>
      <DemoNav variant="white" ctaColor={BRAND} ctaLabel="견적 문의" />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "100svh", background: NAVY_DEEP }}>
        <video src="/videos/12716-241674181_medium.mp4" autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.18) saturate(0.5)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(110deg,rgba(22,39,60,0.97)0%,rgba(22,39,60,0.65)55%,rgba(22,39,60,0.35)100%)" }} />

        <motion.div
          style={{ opacity: heroOp, paddingTop: "5rem", paddingBottom: "5rem", minHeight: "100svh" }}
          className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 flex flex-col justify-center"
        >
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
              className="flex items-center gap-3 mb-8 sm:mb-10">
              <span className="h-px w-7" style={{ background: "rgba(255,255,255,0.55)" }} />
              <span className="text-[10px] font-bold tracking-[0.32em] uppercase" style={{ color: "rgba(255,255,255,0.72)" }}>
                대한민국 크레인 전문기업 · Since 1999
              </span>
            </motion.div>

            {["350톤 기술로", "산업 현장의", "한계를 넘습니다."].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  className="text-white font-black leading-[0.97]"
                  style={{ fontSize: "clamp(2.2rem,7vw,6rem)", letterSpacing: "-0.04em" }}
                  initial={{ y: "108%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.42 + i * 0.1, duration: 1.0, ease: E }}>
                  {line}
                </motion.h1>
              </div>
            ))}

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
              className="text-[13px] sm:text-[14px] leading-[1.85] mt-7 mb-9 max-w-md"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              전기·전자, 자동차, 물류 등 핵심 산업에 누적 520건 이상. 1999년부터 흔들림 없이 현장을 지켜왔습니다.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              className="flex flex-wrap gap-3">
              <Link href="/business" className="px-6 sm:px-7 py-3 sm:py-3.5 font-bold text-[12px] hover:opacity-80 transition-opacity"
                style={{ background: "#fff", color: NAVY_DEEP }}>제품 보기</Link>
              <Link href="/portfolio" className="px-6 sm:px-7 py-3 sm:py-3.5 font-semibold text-[12px] transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
              >납품실적</Link>
            </motion.div>
          </div>

          {/* 히어로 수치 : sm 이상에서만 표시 (모바일에서 컨텐츠 겹침 방지) */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="hidden sm:flex absolute bottom-8 sm:bottom-10 right-5 sm:right-8 md:right-12 gap-7 sm:gap-10 md:gap-14">
            {[{ v: 25, s: "+", l: "년 업력" }, { v: 520, s: "+", l: "건 납품" }, { v: 350, s: "T", l: "최대 하중" }].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-black text-white leading-none" style={{ fontSize: "clamp(1.5rem,3.5vw,3rem)", letterSpacing: "-0.045em" }}>
                  <Count to={s.v} suffix={s.s} />
                </p>
                <p className="text-[10px] sm:text-[11px] mt-1.5" style={{ color: "rgba(255,255,255,0.32)" }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── 인증 배너 ─── */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(22,39,60,0.07)" }}>
        {/* 모바일: 스크롤 가능 */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="flex items-center gap-6 sm:gap-8 md:gap-10 py-4 sm:py-5 overflow-x-auto scrollbar-hide">
            {CERTS.map((c, i) => (
              <div key={i} className="flex items-center gap-2.5 shrink-0">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7.5" stroke={BRAND} strokeOpacity={0.5} />
                  <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-[11px] font-semibold leading-tight whitespace-nowrap" style={{ color: NAVY_DEEP }}>{c.label}</p>
                  <p className="text-[10px] whitespace-nowrap" style={{ color: "#64748b" }}>{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── 제품 탭 ─── */}
      <section className="py-16 sm:py-24 md:py-36" style={{ background: "#fff" }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9 sm:mb-12">
            <div>
              <Clip><p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: BRAND }}>Products</p></Clip>
              <Clip delay={0.08}>
                <h2 className="font-black leading-none" style={{ fontSize: "clamp(2rem,5vw,3.8rem)", letterSpacing: "-0.04em" }}>
                  제품 라인업
                </h2>
              </Clip>
            </div>

            {/* 탭 버튼 : 모바일에서 가로 스크롤 */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" }}>
              {PRODUCTS.map((p, i) => (
                <button key={i} onClick={() => setTab(i)}
                  className="shrink-0 px-4 py-2 text-[12px] font-semibold transition-all duration-200"
                  style={{
                    background: tab === i ? NAVY_DEEP : "transparent",
                    color: tab === i ? "#fff" : "rgba(22,39,60,0.42)",
                    border: `1px solid ${tab === i ? NAVY_DEEP : "rgba(22,39,60,0.14)"}`,
                  }}>
                  {p.tab}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: E }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-14 items-center"
            >
              {/* 영상 */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <video key={PRODUCTS[tab].video} src={PRODUCTS[tab].video}
                  autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover" />
              </div>

              {/* 텍스트 */}
              <div>
                <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase mb-5"
                  style={{ color: "rgba(22,39,60,0.3)" }}>{PRODUCTS[tab].en}</p>
                <h3 className="font-black leading-[1.1] mb-5 whitespace-pre-line"
                  style={{ fontSize: "clamp(1.6rem,3.5vw,2.8rem)", letterSpacing: "-0.03em" }}>
                  {PRODUCTS[tab].pitch}
                </h3>
                <p className="text-[13px] sm:text-[14px] leading-[1.85] mb-7" style={{ color: "#475569" }}>
                  {PRODUCTS[tab].body}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {PRODUCTS[tab].tags.map(t => (
                    <span key={t} className="text-[11px] font-bold px-3 py-1.5"
                      style={{ background: TINT, color: BRAND }}>{t}</span>
                  ))}
                </div>

                {/* 스펙 : 모바일 2열, sm+ 3열 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-9">
                  {PRODUCTS[tab].specs.map(s => (
                    <div key={s.k} className="p-3.5 sm:p-4" style={{ background: "#f4f6f9" }}>
                      <p className="text-[10px] sm:text-[11px] mb-1.5" style={{ color: "#94a3b8" }}>{s.k}</p>
                      <p className="text-[13px] sm:text-[14px] font-bold" style={{ color: NAVY_DEEP }}>{s.v}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/business" className="px-5 sm:px-6 py-3 text-[12px] font-bold hover:opacity-80 transition-opacity"
                    style={{ background: NAVY_DEEP, color: "#fff" }}>상세 보기</Link>
                  <Link href="/support/inquiry" className="px-5 sm:px-6 py-3 text-[12px] font-semibold transition-all"
                    style={{ border: "1px solid rgba(22,39,60,0.18)", color: NAVY_DEEP }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#f4f6f9")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >견적 문의</Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── 고객사 마키 ─── */}
      <div className="overflow-hidden py-8 sm:py-10" style={{ background: "#f4f6f9", borderTop: "1px solid rgba(22,39,60,0.07)" }}>
        <p className="text-center text-[10px] font-bold tracking-[0.32em] uppercase mb-6" style={{ color: "rgba(22,39,60,0.25)" }}>주요 고객사</p>
        <div className="flex gap-8 sm:gap-12 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} className="text-[11px] sm:text-[12px] font-semibold shrink-0" style={{ color: "rgba(22,39,60,0.28)" }}>{c}</span>
          ))}
        </div>
      </div>

      {/* ─── 핵심가치 어코디언 ─── */}
      <section className="py-16 sm:py-24 md:py-36" style={{ background: "#fff" }}>
        <div className="max-w-[900px] mx-auto px-5 sm:px-8 md:px-12">
          <Clip className="mb-10 sm:mb-14">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: BRAND }}>Values</p>
              <h2 className="font-black leading-none" style={{ fontSize: "clamp(2rem,5vw,3.8rem)", letterSpacing: "-0.04em" }}>세종의 핵심 가치</h2>
            </div>
          </Clip>
          <div style={{ borderTop: "1px solid rgba(22,39,60,0.09)" }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(22,39,60,0.09)" }}>
                <button className="w-full flex items-center gap-4 sm:gap-6 py-5 sm:py-6 text-left"
                  onClick={() => setOpen(open === i ? null : i)}>
                  <span className="text-[12px] font-mono w-6 shrink-0" style={{ color: "rgba(22,39,60,0.25)" }}>{v.no}</span>
                  <span className="flex-1 text-[14px] sm:text-[15px] font-semibold">{v.title}</span>
                  <motion.span className="shrink-0 text-xl font-light"
                    style={{ color: open === i ? BRAND : "rgba(22,39,60,0.28)" }}
                    animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.22 }}>+</motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: E }}
                      style={{ overflow: "hidden" }}>
                      <p className="text-[13px] sm:text-[14px] leading-[1.85] pl-10 pb-6" style={{ color: "#475569" }}>{v.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA 영상 ─── */}
      <section className="relative overflow-hidden" style={{ background: NAVY_DEEP, paddingTop: "6rem", paddingBottom: "6rem" }}>
        <video src="/videos/48420-453832153_medium.mp4" autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.1) saturate(0.3)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right,rgba(22,39,60,0.98)0%,rgba(22,39,60,0.7)100%)" }} />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <Clip>
              <h2 className="font-black text-white leading-[0.96]"
                style={{ fontSize: "clamp(2rem,6vw,5rem)", letterSpacing: "-0.04em" }}>
                지금 바로<br />상담하세요
              </h2>
            </Clip>
            <motion.p className="text-[13px] leading-[1.8] mt-5" style={{ color: "rgba(255,255,255,0.38)" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              영업일 1일 이내 전문 엔지니어가 연락드립니다.
            </motion.p>
          </div>
          <motion.div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
            initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.24, ease: E }}>
            <a href="/support/inquiry" className="px-8 sm:px-10 py-4 font-bold text-[12px] text-center hover:opacity-80 transition-opacity"
              style={{ background: "#fff", color: NAVY_DEEP }}>온라인 문의</a>
            <a href="tel:0448650801" className="px-8 sm:px-10 py-4 font-semibold text-[12px] text-center transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
            >전화 044-865-0801</a>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-5 sm:px-8 md:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 bg-white"
        style={{ borderTop: "1px solid rgba(22,39,60,0.08)" }}>
        <div className="flex items-center gap-4">
          <Image src="/images/sejong-logo.png" alt="SEJONG" width={80} height={18} className="h-[18px] w-auto opacity-30" />
          <p className="text-[11px]" style={{ color: "rgba(22,39,60,0.28)" }}>© 2026 Sejong Hoist &amp; Crane</p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: BRAND }} />
          <span className="text-[11px] font-mono" style={{ color: "rgba(22,39,60,0.28)" }}>Demo 4 : AUTHORITY</span>
          <Link href="/demo" className="ml-3 text-[11px] hover:opacity-50 transition-opacity"
            style={{ color: "rgba(22,39,60,0.28)" }}>← 데모 목록</Link>
        </div>
      </footer>
    </div>
  );
}
