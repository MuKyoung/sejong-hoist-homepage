"use client";

/* REF-C 삼성중공업 스타일 — "시네마틱 미니멀" (design-refs/REF-C-SHI.md)
 * 풀블리드 영상 히어로 · 등분할 포토 패널 · 정제된 화이트 본문. */

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { E, SHI, NAV, COMPANY, AREAS_MAIN, CASES, NOTICES, STATS, HERO_VIDEO, CTA_VIDEO } from "./data";

/* ── 1. 헤더: 화이트 미니멀 ── */
export function ShiHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur"
      style={{ borderBottom: "1px solid rgba(16,24,32,0.08)" }}>
      <div className="mx-auto flex items-center justify-between h-16"
        style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <Link href="/demo/shi" className="flex items-center shrink-0">
          <Image src="/images/sejong-logo.png" alt={COMPANY.name} width={200} height={48} priority className="w-auto h-8" />
        </Link>
        {/* GNB 텍스트 = 로고 높이(32px)와 동일. 폭이 커져 xl(1280)부터 노출 */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="주요 메뉴">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}
              className="relative flex items-center px-3 text-[32px] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap transition-colors group"
              style={{ color: SHI.ink }}>
              <span className="transition-colors group-hover:text-[#1E4FA3]">{item.label}</span>
              <span className="absolute left-3 right-3 -bottom-1 h-[1.5px] origin-left scale-x-0 group-hover:scale-x-100"
                style={{ background: SHI.accent, transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }} />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <span className="hidden md:block text-[14px] font-semibold tracking-wide" style={{ color: "rgba(16,24,32,0.5)" }}>KO</span>
          <Link href="/support/inquiry" aria-label="견적 문의"
            className="flex flex-col justify-center gap-[6px] w-8 h-8 group">
            <span className="block h-[1.5px] w-7 transition-all group-hover:w-5" style={{ background: SHI.ink }} />
            <span className="block h-[1.5px] w-5 transition-all group-hover:w-7" style={{ background: SHI.ink }} />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ── 2. 히어로: 풀블리드 영상 + 단어 리듬 타이포 ── */
export function ShiHero() {
  const words1 = ["미래를", "들어", "올리는"];
  const words2 = ["350톤의", "기술"];
  return (
    <section className="relative overflow-hidden" style={{ height: "min(94svh,920px)", minHeight: 580, background: SHI.dark }}>
      <video src={HERO_VIDEO} autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.55) saturate(0.9)" }}
        poster="/images/hero-02.jpg" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(13,21,35,0.72) 0%, rgba(13,21,35,0.28) 60%, rgba(13,21,35,0.15) 100%)" }} />
      <div className="relative z-10 mx-auto h-full flex flex-col justify-center"
        style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <h1 className="text-white font-bold leading-[1.16] tracking-[-0.03em]" style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}>
          <span className="block overflow-hidden">
            {words1.map((w, i) => (
              <motion.span key={w} className="inline-block mr-[0.28em]"
                initial={{ y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.12, duration: 1, ease: E }}>
                {w}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {words2.map((w, i) => (
              <motion.span key={w} className="inline-block mr-[0.28em]"
                initial={{ y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65 + i * 0.12, duration: 1, ease: E }}>
                {w}
              </motion.span>
            ))}
          </span>
        </h1>
        <motion.p className="mt-7 max-w-lg text-[14.5px] leading-[1.85] text-white/70"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1.2 }}>
          설계·제작·설치·안전인증 원스톱. 1999년부터 이어온 운반하역 기술이
          대한민국 산업 현장의 가동률을 지킵니다.
        </motion.p>
      </div>
      {/* 스크롤 인디케이터 */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
        <span className="text-[10.5px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.span className="block w-px h-9 bg-white/50 origin-top"
          animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>
    </section>
  );
}

/* 센터 섹션 헤더 (SHI 공용) */
function CenterHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div className="text-center mb-14"
      initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.9, ease: E }}>
      <p className="text-[12px] font-bold tracking-[0.28em] uppercase mb-4" style={{ color: SHI.accent }}>{eyebrow}</p>
      <h2 className="font-bold tracking-[-0.02em]" style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", color: SHI.ink }}>{title}</h2>
      {sub && <p className="mt-4 text-[14px] leading-[1.8]" style={{ color: "rgba(16,24,32,0.55)" }}>{sub}</p>}
    </motion.div>
  );
}

/* ── 3. 회사소개: 원형 마스크 + 3칼럼 ── */
export function ShiAbout() {
  const cols = [
    { t: "Since 1999", d: "정원기계로 출발해 법인 체제까지, 운반하역 설비 한길을 걸었습니다." },
    { t: "원스톱 수행", d: "설계·제작·설치·시운전·A/S까지 전 과정을 자체 인력이 책임집니다." },
    { t: "검증된 안전", d: "KCs 전수 적합, ISO 9001·14001·45001. 안전이 곧 품질입니다." },
  ];
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="mx-auto" style={{ maxWidth: 1180, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <CenterHead eyebrow="About" title="현장을 선도하는 기술과 신뢰"
          sub={"혁신적인 설비의 설계와 제작, 흔들림 없는 안전 기준의\n준수로 고객 현장의 가치를 만들어 갑니다."} />
        <motion.div className="relative mx-auto w-[min(420px,80vw)] aspect-square rounded-full overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.1, ease: E }}>
          <Image src="/images/about-01.jpg" alt="세종호이스트크레인 사옥 전경" fill className="object-cover" sizes="420px" />
        </motion.div>
        <div className="mt-14 grid md:grid-cols-3 gap-10 text-center">
          {cols.map((c, i) => (
            <motion.div key={c.t}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8, ease: E }}>
              <p className="text-[16px] font-bold" style={{ color: SHI.ink }}>{c.t}</p>
              <p className="mt-3 text-[13.5px] leading-[1.8]" style={{ color: "rgba(16,24,32,0.55)" }}>{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. 사업영역: 등분할 포토 패널 스트립 (호버 확장) ── */
export function ShiBusiness() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section className="pb-24 lg:pb-32 bg-white">
      <div className="mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <CenterHead eyebrow="Business" title="현장에 맞는 운반하역 솔루션"
          sub="오버헤드부터 방폭 사양까지, 요구 조건에 정확히 맞춘 설비를 제안합니다." />
        <motion.div className="hidden md:flex h-[440px] overflow-hidden rounded-[24px] shadow-[0_28px_60px_rgba(16,24,32,0.18)]"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 1, ease: E }}>
          {AREAS_MAIN.map((a, i) => (
            <Link key={a.slug} href={a.href}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              className="relative overflow-hidden"
              style={{
                flex: hover === i ? 2.1 : hover === null ? 1 : 0.75,
                transition: "flex 0.9s cubic-bezier(0.16,1,0.3,1)",
              }}>
              <Image src={a.image} alt={a.title} fill className="object-cover" sizes="40vw" />
              <div className="absolute inset-0 transition-colors duration-700"
                style={{ background: hover === i ? "rgba(13,21,35,0.18)" : "rgba(13,21,35,0.45)" }} />
              {i > 0 && <span aria-hidden className="absolute left-0 top-0 bottom-0 w-px bg-white/25" />}
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/60">{a.en}</p>
                <div className="mt-1.5 flex items-center gap-3">
                  <p className="text-[19px] font-bold text-white whitespace-nowrap">{a.title}</p>
                  <span className="text-white text-[18px] transition-transform duration-500"
                    style={{ transform: hover === i ? "translateX(6px)" : "none" }}>→</span>
                </div>
                <p className="mt-3 max-w-[300px] text-[12.5px] leading-[1.7] text-white/75 transition-opacity duration-500"
                  style={{ opacity: hover === i ? 1 : 0 }}>
                  {a.desc}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
        {/* 모바일: 2열 카드 */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {AREAS_MAIN.map((a) => (
            <Link key={a.slug} href={a.href} className="relative block aspect-[16/10] overflow-hidden rounded-[16px]">
              <Image src={a.image} alt={a.title} fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0" style={{ background: "rgba(13,21,35,0.4)" }} />
              <p className="absolute left-5 bottom-5 text-[17px] font-bold text-white">{a.title} →</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/business" className="inline-flex items-center gap-2 text-[13.5px] font-bold group" style={{ color: SHI.accent }}>
            전체 사업영역 보기 <span className="transition-transform group-hover:translate-x-1.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 5. 실적: 2열 대형 미디어 타일 + 스탯 라인 ── */
export function ShiProjects() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "#F6F8FA" }}>
      <div className="mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <CenterHead eyebrow="Projects" title="숫자로 증명된 시공 실적" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 mb-16">
          {STATS.map((st, i) => (
            <motion.div key={st.label} className="text-center"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease: E }}>
              <p className="font-bold leading-none tabular-nums" style={{ fontSize: "clamp(2rem,3.6vw,3rem)", color: SHI.ink }}>
                {st.value}<span className="text-[0.45em] ml-0.5" style={{ color: SHI.accent }}>{st.suffix}</span>
              </p>
              <p className="mt-3 text-[13px]" style={{ color: "rgba(16,24,32,0.5)" }}>{st.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {CASES.map((c, i) => (
            <motion.div key={c.slug}
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }} transition={{ delay: (i % 2) * 0.1, duration: 0.9, ease: E }}>
              <Link href={`/portfolio/${c.slug}`} className="group relative block aspect-[16/10] overflow-hidden rounded-[20px]">
                <Image src={c.src} alt={c.title} fill
                  className="object-cover transition-transform duration-[1.3s] group-hover:scale-[1.06]"
                  sizes="(max-width:640px) 100vw, 50vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,21,35,0.72) 0%, transparent 46%)" }} />
                <span className="absolute top-5 right-5 px-3.5 py-1.5 rounded-full text-[12px] font-bold text-white"
                  style={{ background: "rgba(30,79,163,0.9)" }}>{c.capacity}</span>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-[12px] text-white/60">{c.client} · {c.year}</p>
                  <p className="mt-1 text-[18px] font-bold text-white">{c.title}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6. 뉴스 리스트 + 다크 CTA 밴드 + 화이트 푸터 ── */
export function ShiNews() {
  return (
    <>
      <section className="py-24 bg-white">
        <div className="mx-auto" style={{ maxWidth: 1180, paddingInline: "clamp(20px,3.5vw,48px)" }}>
          <CenterHead eyebrow="News" title="세종 소식" />
          <div className="border-t" style={{ borderColor: "rgba(16,24,32,0.14)" }}>
            {NOTICES.slice(0, 4).map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.6, ease: E }}>
                <Link href={`/support/notice/${n.id}`}
                  className="group flex items-center gap-6 py-5 border-b"
                  style={{ borderColor: "rgba(16,24,32,0.08)" }}>
                  <span className="shrink-0 w-24 text-[13px] tabular-nums" style={{ color: "rgba(16,24,32,0.4)" }}>{n.date}</span>
                  <span className="flex-1 min-w-0 truncate text-[15.5px] font-medium transition-colors group-hover:text-[#1E4FA3]" style={{ color: SHI.ink }}>
                    {n.title}
                  </span>
                  <span className="shrink-0 text-[18px] transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: "rgba(16,24,32,0.35)" }}>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24" style={{ background: SHI.dark }}>
        <video src={CTA_VIDEO} autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.22)" }} />
        <div className="relative z-10 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
          <motion.h2 className="font-bold text-white tracking-[-0.02em]" style={{ fontSize: "clamp(1.8rem,3.4vw,2.8rem)" }}
            initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: E }}>
            프로젝트를 상담하세요
          </motion.h2>
          <motion.div className="flex flex-wrap gap-3"
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.9, ease: E }}>
            <Link href="/support/inquiry" className="h-13 px-8 py-4 bg-white text-[13.5px] font-bold hover:opacity-85 transition-opacity rounded-full" style={{ color: SHI.dark }}>
              온라인 문의
            </Link>
            <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`}
              className="h-13 px-8 py-4 rounded-full text-[13.5px] font-semibold text-white/80 hover:text-white transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.35)" }}>
              전화 {COMPANY.tel}
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 bg-white" style={{ borderTop: "1px solid rgba(16,24,32,0.08)" }}>
        <div className="mx-auto flex flex-col md:flex-row justify-between gap-6 text-[12.5px] leading-[1.9]"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)", color: "rgba(16,24,32,0.55)" }}>
          <div>
            <p className="font-bold text-[14px] mb-2" style={{ color: SHI.ink }}>{COMPANY.name}</p>
            <p>{COMPANY.address}<br />대표이사 {COMPANY.ceo} · 사업자등록번호 {COMPANY.bizNo}</p>
          </div>
          <div className="md:text-right">
            <p>TEL {COMPANY.tel} · FAX {COMPANY.fax}<br />{COMPANY.email}</p>
            <p className="mt-2" style={{ color: "rgba(16,24,32,0.35)" }}>© {COMPANY.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
