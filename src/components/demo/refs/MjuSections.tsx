"use client";

/* REF-A 명지대 산학협력단 스타일 — "리서치 포털" (design-refs/REF-A-MJU.md)
 * 딥블루 포털 · 기하 사분원 · 풀포토 타일. 섹션 단위 export (커스텀 믹서 공용). */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { E, MJU, NAV, COMPANY, BUSINESS_AREAS, CASES, NOTICES, STATS, HERO_SLIDES } from "./data";

const pad = (n: number) => String(n).padStart(2, "0");

/* ── 1. 헤더: 다크 유틸바 + 투명→화이트 전환 GNB ── */
export function MjuHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const fg = scrolled ? MJU.deep : "#fff";
  return (
    <header className="fixed top-0 inset-x-0 z-50"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        boxShadow: scrolled ? "0 10px 30px rgba(14,34,71,0.10)" : "none",
        transition: "background 0.5s ease, box-shadow 0.5s ease",
      }}>
      <div className="hidden md:block" style={{ background: MJU.deep }}>
        <div className="mx-auto flex items-center justify-end gap-5 h-9 text-[12px] text-white/70"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
          <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`} className="hover:text-white transition-colors">대표전화 {COMPANY.tel}</a>
          <span className="w-px h-3 bg-white/25" />
          <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">{COMPANY.email}</a>
          <span className="w-px h-3 bg-white/25" />
          <Link href="/en" className="hover:text-white transition-colors">ENG</Link>
        </div>
      </div>
      <div className="mx-auto flex items-center justify-between h-16"
        style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <Link href="/demo/mju" className="flex items-center shrink-0">
          {/* 로고 높이 = 우측 CTA(h-10)와 동일 (26.07 헤더 요소 높이 통일) */}
          <Image src="/images/sejong-logo.png" alt={COMPANY.name} width={200} height={48} priority
            className="w-auto h-10" style={{ filter: scrolled ? "none" : "brightness(0) invert(1)", transition: "filter 0.5s" }} />
        </Link>
        {/* GNB 텍스트 = 로고 높이(40px)와 동일. 폭이 커져 xl(1280)부터 노출 */}
        <nav className="hidden xl:flex items-stretch self-stretch" aria-label="주요 메뉴">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}
              className="group relative flex items-center px-4 text-[40px] leading-none font-bold tracking-[-0.03em] whitespace-nowrap"
              style={{ color: fg, transition: "color 0.5s" }}>
              {item.label}
              <span className="absolute left-4 right-4 bottom-1.5 h-[2px] origin-left scale-x-0 group-hover:scale-x-100"
                style={{ background: scrolled ? MJU.royal : "#fff", transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)" }} />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ── 2. 히어로: 풀블리드 슬라이더 + 좌측 대형 카피 + 사분원 도형 ── */
export function MjuHero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [idx]);
  const s = HERO_SLIDES[idx];
  return (
    <section className="relative overflow-hidden" style={{ height: "min(92svh,880px)", minHeight: 560, background: MJU.deep }}>
      {HERO_SLIDES.map((sl, i) => (
        <motion.div key={sl.img} className="absolute inset-0" initial={false}
          animate={{ opacity: idx === i ? 1 : 0, scale: idx === i ? 1.06 : 1 }}
          transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: "linear" } }}>
          <Image src={sl.img} alt="" fill priority={i === 0} className="object-cover" sizes="100vw" />
        </motion.div>
      ))}
      <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(14,34,71,0.86) 0%, rgba(14,34,71,0.45) 55%, rgba(14,34,71,0.2) 100%)" }} />
      {/* 우하단 사분원 기하 도형 */}
      <div aria-hidden className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full"
        style={{ background: "rgba(22,56,111,0.55)", backdropFilter: "blur(2px)" }} />
      <div aria-hidden className="absolute bottom-20 right-40 w-[140px] h-[140px] rounded-full"
        style={{ border: "1px solid rgba(255,255,255,0.35)" }} />

      <div className="relative z-10 mx-auto h-full flex flex-col justify-center"
        style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <motion.span key={`line-${idx}`} className="block w-14 h-[2px] bg-white/70 mb-7 origin-left"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease: E }} />
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.9, ease: E }}>
            <h1 className="text-white font-extrabold leading-[1.12] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.2rem,4.6vw,3.6rem)" }}>
              {s.title[0]}<br />{s.title[1]}
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-white/80">{s.sub}</p>
            <p className="mt-3 text-[12.5px] text-white/50">{s.caption}</p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-12 flex items-center gap-6 text-white/80">
          <span className="text-[13px] tracking-[0.2em] font-semibold tabular-nums">
            {pad(idx + 1)} <span className="opacity-40">—</span> {pad(HERO_SLIDES.length)}
          </span>
          <div className="flex gap-2">
            {[-1, 1].map((d) => (
              <button key={d} type="button" aria-label={d < 0 ? "이전" : "다음"}
                onClick={() => setIdx((i) => (i + d + HERO_SLIDES.length) % HERO_SLIDES.length)}
                className="w-10 h-10 flex items-center justify-center border border-white/35 hover:bg-white hover:text-[#0E2247] transition-colors duration-300">
                {d < 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. 회사소개: 기하 컴포지션(수치 원) + 카피 + '+' 행 링크 ── */
export function MjuAbout() {
  const rows = [
    { label: "인사말", href: "/about" },
    { label: "연혁 · 1999년부터", href: "/about/history" },
    { label: "조직도", href: "/about/organization" },
  ];
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="mx-auto grid lg:grid-cols-2 gap-16 items-center"
        style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        {/* 기하 컴포지션 */}
        <motion.div className="relative h-[380px] sm:h-[440px]"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: E }}>
          <div className="absolute left-0 top-0 w-[62%] aspect-square rounded-full flex flex-col items-center justify-center text-white"
            style={{ background: MJU.royal }}>
            <p className="font-black leading-none" style={{ fontSize: "clamp(2.6rem,4.5vw,4rem)" }}>{STATS[2].value}<span className="text-[0.45em] font-extrabold ml-1">{STATS[2].suffix}</span></p>
            <p className="mt-3 text-[13px] text-white/75">{STATS[2].label} · {STATS[2].desc}</p>
          </div>
          <div className="absolute right-[6%] top-[38%] w-[42%] aspect-square rounded-full flex flex-col items-center justify-center text-white"
            style={{ background: MJU.deep }}>
            <p className="font-black leading-none" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)" }}>{STATS[1].value}<span className="text-[0.5em] ml-0.5">{STATS[1].suffix}</span></p>
            <p className="mt-2 text-[12px] text-white/70">{STATS[1].label}</p>
          </div>
          <div aria-hidden className="absolute left-[48%] bottom-0 w-[26%] aspect-square rounded-full"
            style={{ border: `1.5px solid ${MJU.royal}`, opacity: 0.4 }} />
        </motion.div>

        <div>
          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}>
            <p className="text-[13px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: MJU.royal }}>About Sejong</p>
            <h2 className="font-extrabold leading-[1.25] tracking-[-0.02em]" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", color: MJU.deep }}>
              운반하역 외길 25년,<br />신뢰의 기술 파트너
            </h2>
            <p className="mt-6 text-[15px] leading-[1.8] text-[#44506A]">
              1999년 설립 이후 크레인·호이스트 한 분야에 집중해 왔습니다. 설계부터 제작·설치·유지보수까지
              전 과정을 직접 수행하며, LS ELECTRIC 부산사업장 350톤 겐트리 크랩 크레인으로 초대형 실적을 증명했습니다.
            </p>
          </motion.div>
          <div className="mt-9 border-t" style={{ borderColor: MJU.line }}>
            {rows.map((r, i) => (
              <motion.div key={r.href} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7, ease: E }}>
                <Link href={r.href}
                  className="group flex items-center justify-between py-4 border-b text-[15px] font-semibold transition-colors"
                  style={{ borderColor: MJU.line, color: MJU.deep }}>
                  {r.label}
                  <span className="w-8 h-8 flex items-center justify-center border text-[16px] font-light transition-all duration-300 group-hover:rotate-90 group-hover:text-white"
                    style={{ borderColor: MJU.line }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = MJU.royal)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>+</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 4. 사업영역: 3열 풀포토 타일 ── */
export function MjuBusiness() {
  return (
    <section className="pb-24 lg:pb-32 bg-white">
      <div className="mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <motion.div className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}>
          <div>
            <p className="text-[13px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: MJU.royal }}>Business</p>
            <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", color: MJU.deep }}>사업영역</h2>
          </div>
          <Link href="/business" className="text-[13.5px] font-semibold hover:underline underline-offset-4" style={{ color: MJU.royal }}>
            전체 보기 +
          </Link>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BUSINESS_AREAS.map((a, i) => (
            <motion.div key={a.slug}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }} transition={{ delay: (i % 3) * 0.09, duration: 0.8, ease: E }}>
              <Link href={a.href} className="group relative block aspect-[4/3] overflow-hidden">
                <Image src={a.image} alt={a.title} fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.07]"
                  sizes="(max-width:640px) 100vw, 33vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,34,71,0.85) 0%, rgba(14,34,71,0.15) 45%, transparent 70%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/60">{a.en}</p>
                    <p className="mt-1 text-[18px] font-bold text-white">{a.title}</p>
                  </div>
                  <span className="w-9 h-9 flex items-center justify-center border border-white/40 text-white text-[17px] font-light opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">+</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. 실적: 딥블루 밴드 + 카운터 + 케이스 카드 ── */
export function MjuProjects() {
  return (
    <section className="py-24 lg:py-28 overflow-hidden" style={{ background: MJU.deep }}>
      <div className="mx-auto grid lg:grid-cols-[380px_1fr] gap-14 items-start"
        style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: E }}>
          <p className="text-[13px] font-bold tracking-[0.22em] uppercase mb-3 text-white/50">Projects</p>
          <h2 className="font-extrabold text-white tracking-[-0.02em]" style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)" }}>
            대표 시공 실적
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9">
            {STATS.map((st) => (
              <div key={st.label}>
                <p className="font-black text-white leading-none" style={{ fontSize: "clamp(1.9rem,2.8vw,2.5rem)" }}>
                  {st.value}<span className="text-[0.5em] ml-0.5 text-white/70">{st.suffix}</span>
                </p>
                <p className="mt-2 text-[12.5px] text-white/50">{st.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="flex gap-4 overflow-x-auto pb-3 -mr-4 pr-4" style={{ scrollbarWidth: "thin" }}>
          {CASES.map((c, i) => (
            <motion.div key={c.slug} className="shrink-0 w-[280px]"
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }} transition={{ delay: i * 0.1, duration: 0.85, ease: E }}>
              <Link href={`/portfolio/${c.slug}`} className="group block bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={c.src} alt={c.title} fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]" sizes="280px" />
                </div>
                <div className="p-5">
                  <p className="text-[12px] font-bold" style={{ color: MJU.royal }}>{c.capacity} · {c.industry}</p>
                  <p className="mt-1.5 text-[15px] font-bold leading-snug transition-colors group-hover:underline underline-offset-4" style={{ color: MJU.deep }}>
                    {c.title}
                  </p>
                  <p className="mt-2 text-[12.5px] text-[#7A85A0]">{c.client} · {c.year}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6. 뉴스 + 인증 스트립 + 다크 푸터 ── */
export function MjuNews() {
  const certs = ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "KCs 안전인증 · 한국승강기안전공단"];
  return (
    <>
      <section className="py-24 bg-white">
        <div className="mx-auto grid lg:grid-cols-[1fr_340px] gap-12"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
          <div>
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem,2.4vw,2rem)", color: MJU.deep }}>공지사항</h2>
              <Link href="/support/notice" className="text-[13px] font-semibold hover:underline underline-offset-4" style={{ color: MJU.royal }}>더보기 +</Link>
            </div>
            <div className="border-t" style={{ borderColor: MJU.deep }}>
              {NOTICES.slice(0, 4).map((n, i) => (
                <motion.div key={n.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6, ease: E }}>
                  <Link href={`/support/notice/${n.id}`}
                    className="group flex items-center gap-5 py-4 border-b" style={{ borderColor: MJU.line }}>
                    <span className="shrink-0 text-[12px] font-bold w-16" style={{ color: MJU.royal }}>[{n.category}]</span>
                    <span className="flex-1 min-w-0 truncate text-[15px] text-[#33405C] group-hover:font-semibold transition-all">{n.title}</span>
                    <span className="shrink-0 text-[12.5px] text-[#98A2B8] tabular-nums">{n.date}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div className="flex flex-col justify-between p-8 text-white" style={{ background: MJU.royal }}
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}>
            <div>
              <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-white/60">Contact</p>
              <p className="mt-3 text-[21px] font-extrabold leading-snug">프로젝트 상담이<br />필요하신가요?</p>
              <p className="mt-4 text-[13.5px] leading-[1.75] text-white/70">현장 조건만 알려주시면 영업일 1일 내 회신드립니다.</p>
            </div>
            <div className="mt-8 flex flex-col gap-2.5">
              <Link href="/support/inquiry" className="h-12 flex items-center justify-center bg-white text-[14px] font-bold" style={{ color: MJU.royal }}>
                온라인 견적 문의
              </Link>
              <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`} className="h-12 flex items-center justify-center border border-white/40 text-[14px] font-semibold hover:bg-white/10 transition-colors">
                {COMPANY.tel}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="border-t border-b" style={{ borderColor: MJU.line }}>
        <div className="mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
          {certs.map((c) => (
            <span key={c} className="flex items-center gap-2 text-[12.5px] font-semibold text-[#5A6784]">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: MJU.royal }} />{c}
            </span>
          ))}
        </div>
      </div>

      <footer className="py-12 text-white/60" style={{ background: MJU.deep }}>
        <div className="mx-auto flex flex-col md:flex-row justify-between gap-6 text-[12.5px] leading-[1.9]"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
          <div>
            <p className="text-white font-bold text-[14px] mb-2">{COMPANY.name}</p>
            <p>{COMPANY.address}<br />대표이사 {COMPANY.ceo} · 사업자등록번호 {COMPANY.bizNo}</p>
          </div>
          <div className="md:text-right">
            <p>TEL {COMPANY.tel} · FAX {COMPANY.fax}<br />{COMPANY.email}</p>
            <p className="mt-2 text-white/35">© {COMPANY.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
