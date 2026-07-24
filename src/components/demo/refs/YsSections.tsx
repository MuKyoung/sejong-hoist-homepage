"use client";

/* REF-B 연세대학교 스타일 — "모뉴멘탈 캠페인" (design-refs/REF-B-YONSEI.md)
 * 로열블루 바 · 초대형 캠페인 타이포 · 부채꼴 마스크 · 에디토리얼 여백. */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { E, YS, NAV, COMPANY, BUSINESS_AREAS, CASES, NOTICES } from "./data";

/* ── 1. 헤더: 항상 로열블루 솔리드 바 ── */
export function YsHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50" style={{ background: YS.royal, boxShadow: "0 8px 24px rgba(14,74,132,0.25)" }}>
      <div className="mx-auto flex items-center justify-between h-16"
        style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <Link href="/demo/yonsei" className="flex items-center shrink-0">
          <Image src="/images/sejong-logo.png" alt={COMPANY.name} width={200} height={48} priority
            className="w-auto h-9" style={{ filter: "brightness(0) invert(1)" }} />
        </Link>
        {/* GNB 텍스트 = 로고 높이(36px)와 동일. 폭이 커져 xl(1280)부터 노출 */}
        <nav className="hidden xl:flex items-center" aria-label="주요 메뉴">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}
              className="group relative flex items-center px-3 text-[36px] leading-none font-bold tracking-[-0.03em] whitespace-nowrap text-white/85 hover:text-white transition-colors">
              {item.label}
              <span className="absolute left-3 right-3 -bottom-1 h-[2px] bg-white origin-center scale-x-0 group-hover:scale-x-100"
                style={{ transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)" }} />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-white/80 text-[15px]">
          <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`} className="hidden 2xl:block hover:text-white transition-colors tabular-nums">{COMPANY.tel}</a>
          <span className="hidden 2xl:block w-px h-3.5 bg-white/30" />
          <Link href="/en" className="hover:text-white transition-colors font-semibold">ENG</Link>
        </div>
      </div>
    </header>
  );
}

/* ── 2. 히어로: 스카이 그라디언트 + 초대형 350TON 캠페인 ── */
export function YsHero() {
  return (
    <section className="relative overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        height: "min(94svh,900px)", minHeight: 620,
        background: "linear-gradient(180deg, #4E88C7 0%, #7FB4E8 38%, #E8F1FA 100%)",
      }}>
      <div aria-hidden className="absolute inset-0 opacity-25"
        style={{ background: "radial-gradient(circle at 50% 25%, rgba(255,255,255,0.9) 0%, transparent 55%)" }} />
      <motion.p className="relative z-10 text-[14px] sm:text-[16px] font-bold tracking-[0.3em] uppercase text-white"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9, ease: E }}>
        국내 최대급 시공 실적
      </motion.p>
      <motion.h1 className="relative z-10 font-black leading-[0.9] tracking-[-0.05em] select-none"
        style={{
          fontSize: "clamp(6rem,17vw,15rem)",
          background: "linear-gradient(180deg, #FFFFFF 8%, #D7E7F7 45%, #6E9CC9 100%)",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
          textShadow: "0 24px 60px rgba(14,74,132,0.35)",
        }}
        initial={{ opacity: 0, scale: 0.92, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1.4, ease: E }}>
        350<span style={{ fontSize: "0.42em" }}>TON</span>
      </motion.h1>
      <motion.p className="relative z-10 mt-4 font-bold" style={{ fontSize: "clamp(1.25rem,2.6vw,2rem)", color: YS.ink }}
        initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease: E }}>
        현장의 한계를 들어 올리는 세종호이스트크레인
      </motion.p>
      <motion.p className="relative z-10 mt-3 text-[13.5px] text-[#3A5A7E]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}>
        LS ELECTRIC 부산사업장 350TON 겐트리 크랩 크레인 · KCs 안전인증 취득
      </motion.p>

      {/* 하단에서 떠오르는 장비 컷 */}
      <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(920px,92vw)] h-[38%] overflow-hidden"
        initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1.4, ease: E }}>
        <Image src="/images/hero-03.jpg" alt="" fill className="object-cover object-top" sizes="920px" priority />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(232,241,250,1) 0%, rgba(232,241,250,0) 42%)" }} />
      </motion.div>
    </section>
  );
}

/* ── 3. 회사소개: 에디토리얼 + 부채꼴 마스크 ── */
export function YsAbout() {
  return (
    <section className="py-28 lg:py-36 bg-white overflow-hidden">
      <div className="mx-auto grid lg:grid-cols-2 gap-16 items-center"
        style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <div>
          <motion.p className="text-[17px] font-extrabold mb-6" style={{ color: YS.royal }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}>
            Lift the Site! Be SEJONG!
          </motion.p>
          <motion.h2 className="font-light leading-[1.3] tracking-[-0.02em]" style={{ fontSize: "clamp(2.2rem,4vw,3.4rem)", color: YS.ink }}
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.9, ease: E }}>
            현장을 들어 올리는
            <br />
            <span className="font-extrabold flex items-center gap-6">
              세종다움
              <motion.span aria-hidden className="inline-block h-px w-28 origin-left" style={{ background: YS.ink }}
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.9, ease: E }} />
            </span>
          </motion.h2>
          <motion.p className="mt-8 max-w-md text-[15px] leading-[1.85] text-[#54677E]"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 1 }}>
            세종호이스트크레인은 25년이라는 시간 속에서 쌓아온 시공의 질을 바탕으로,
            안전에 대한 책임을 다하며 운반하역 현장의 지속 가능한 가동을 추구합니다.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.45, duration: 1 }}>
            <Link href="/about" className="inline-flex items-center gap-2 mt-9 text-[14px] font-bold group" style={{ color: YS.royal }}>
              회사소개 바로가기
              <span className="transition-transform group-hover:translate-x-1.5">→</span>
            </Link>
          </motion.div>
        </div>

        {/* 부채꼴 마스크 이미지 + 배경 호 */}
        <div className="relative h-[420px] sm:h-[500px]">
          <div aria-hidden className="absolute left-[8%] bottom-[4%] w-[54%] aspect-square"
            style={{ background: "#E3EBF4", borderRadius: "0 0 0 100%", opacity: 0.8 }} />
          <motion.div className="absolute right-0 top-0 w-[78%] aspect-square overflow-hidden"
            style={{ borderRadius: "0 100% 0 0" }}
            initial={{ opacity: 0, scale: 0.94, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.1, ease: E }}>
            <Image src="/images/about-01.jpg" alt="세종호이스트크레인 사옥" fill className="object-cover" sizes="640px" />
          </motion.div>
          <motion.div aria-hidden className="absolute left-[2%] top-[16%] w-[30%] aspect-square"
            style={{ border: `1.5px solid ${YS.royal}`, borderRadius: "100% 0 0 0", opacity: 0.35 }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 0.35 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 1 }} />
        </div>
      </div>
    </section>
  );
}

/* ── 4. 사업영역: 인덱스 에디토리얼 리스트 + 호버 프리뷰 ── */
export function YsBusiness() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="mx-auto" style={{ maxWidth: 1180, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <motion.div className="mb-12" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}>
          <p className="text-[13px] font-bold tracking-[0.24em] uppercase mb-3" style={{ color: YS.royal }}>Business</p>
          <h2 className="font-light" style={{ fontSize: "clamp(1.9rem,3.2vw,2.7rem)", color: YS.ink }}>
            여섯 개의 <span className="font-extrabold">사업영역</span>
          </h2>
        </motion.div>
        <div className="relative border-t" style={{ borderColor: "rgba(16,36,62,0.14)" }}>
          {BUSINESS_AREAS.map((a, i) => (
            <motion.div key={a.slug}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }} transition={{ delay: i * 0.05, duration: 0.7, ease: E }}>
              <Link href={a.href}
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                className="group grid grid-cols-[64px_1fr_auto] items-center gap-5 py-6 border-b transition-all duration-500"
                style={{ borderColor: "rgba(16,36,62,0.14)", paddingLeft: hover === i ? 18 : 0 }}>
                <span className="text-[14px] font-bold tabular-nums" style={{ color: hover === i ? YS.royal : "rgba(16,36,62,0.35)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[19px] sm:text-[22px] font-bold transition-colors" style={{ color: hover === i ? YS.royal : YS.ink }}>
                    {a.title}
                  </span>
                  <span className="mt-1 hidden sm:block text-[13px] text-[#7A8AA0]">{a.en} · {a.desc.slice(0, 42)}…</span>
                </span>
                <span className="text-[20px] font-light transition-all duration-500 group-hover:translate-x-2" style={{ color: hover === i ? YS.royal : "rgba(16,36,62,0.3)" }}>→</span>
              </Link>
            </motion.div>
          ))}
          {/* 호버 이미지 프리뷰 (데스크톱) */}
          <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block w-[300px] aspect-[4/3] overflow-hidden"
            style={{ borderRadius: "0 60px 0 0" }}>
            {BUSINESS_AREAS.map((a, i) => (
              <motion.div key={a.slug} className="absolute inset-0" initial={false}
                animate={{ opacity: hover === i ? 1 : 0, scale: hover === i ? 1 : 1.06 }} transition={{ duration: 0.5, ease: E }}>
                <Image src={a.image} alt="" fill className="object-cover" sizes="300px" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 카운트업 (캠페인 수치) */
function YsCount({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.floor(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString()}
      <span className="text-[0.4em] font-extrabold ml-1 align-baseline">{suffix}</span>
    </span>
  );
}

/* ── 5. 실적: 캠페인 대형 수치 + 케이스 스트립 ── */
export function YsProjects() {
  const big = [
    { to: 350, suffix: "TON", label: "국내 최대급 시공 하중" },
    { to: 520, suffix: "+", label: "누적 시공 프로젝트" },
    { to: 100, suffix: "%", label: "안전인증 전수 적합" },
  ];
  return (
    <section className="py-28 lg:py-36" style={{ background: YS.soft }}>
      <div className="mx-auto" style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
        <div className="grid md:grid-cols-3 gap-12 text-center mb-20">
          {big.map((b, i) => (
            <motion.div key={b.label}
              initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }} transition={{ delay: i * 0.12, duration: 0.9, ease: E }}>
              <p className="font-black leading-none" style={{ fontSize: "clamp(3.4rem,6.5vw,5.6rem)", color: YS.royal }}>
                <YsCount to={b.to} suffix={b.suffix} />
              </p>
              <p className="mt-4 text-[14px] font-light text-[#54677E]">{b.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CASES.map((c, i) => (
            <motion.div key={c.slug}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }} transition={{ delay: i * 0.08, duration: 0.8, ease: E }}>
              <Link href={`/portfolio/${c.slug}`} className="group block bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={c.src} alt={c.title} fill className="object-cover transition-transform duration-[1.1s] group-hover:scale-[1.06]"
                    sizes="(max-width:640px) 100vw, 25vw" />
                </div>
                <div className="p-5">
                  <p className="text-[12px] font-bold" style={{ color: YS.royal }}>{c.capacity}</p>
                  <p className="mt-1 text-[14.5px] font-bold leading-snug" style={{ color: YS.ink }}>{c.title}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6. 뉴스 카드 + QUICK dock + 로열 푸터 ── */
export function YsNews() {
  const imgs = ["/images/hero-02.jpg", "/images/hero-04.jpg", "/images/pf-ceiling30.jpg"];
  return (
    <>
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto grid lg:grid-cols-[260px_1fr] gap-14"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}>
            <p className="text-[13px] font-bold tracking-[0.24em] uppercase" style={{ color: YS.royal }}>Sejong News</p>
            <h2 className="mt-3 font-extrabold" style={{ fontSize: "clamp(1.7rem,2.6vw,2.2rem)", color: YS.ink }}>세종소식</h2>
            <p className="mt-4 text-[13.5px] leading-[1.8] text-[#7A8AA0]">현장의 순간들과 납품·인증 소식을 전합니다.</p>
            <Link href="/support/notice" className="inline-flex items-center gap-2 mt-7 text-[13.5px] font-bold group" style={{ color: YS.royal }}>
              전체 소식 <span className="transition-transform group-hover:translate-x-1.5">→</span>
            </Link>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5">
            {NOTICES.slice(0, 3).map((n, i) => (
              <motion.div key={n.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }} transition={{ delay: i * 0.1, duration: 0.8, ease: E }}>
                <Link href={`/support/notice/${n.id}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden" style={{ borderRadius: "0 36px 0 0" }}>
                    <Image src={imgs[i]} alt="" fill className="object-cover transition-transform duration-[1.1s] group-hover:scale-[1.06]" sizes="360px" />
                  </div>
                  <p className="mt-4 text-[12px] font-bold" style={{ color: YS.royal }}>[{n.category}]</p>
                  <p className="mt-1.5 text-[15px] font-bold leading-snug group-hover:underline underline-offset-4" style={{ color: YS.ink }}>{n.title}</p>
                  <p className="mt-2 text-[12.5px] text-[#98A6B8] tabular-nums">{n.date}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK dock */}
      <div className="fixed right-4 bottom-20 z-40 hidden md:flex flex-col overflow-hidden rounded-full shadow-xl" style={{ background: YS.royal }}>
        {[
          { label: "견적", href: "/support/inquiry" },
          { label: "전화", href: `tel:${COMPANY.tel.replace(/-/g, "")}` },
          { label: "오시는길", href: "/about/location" },
        ].map((q, i) => (
          <a key={q.label} href={q.href}
            className="px-4 py-3.5 text-[11.5px] font-bold text-white/85 hover:bg-white/15 hover:text-white text-center transition-colors"
            style={{ borderTop: i ? "1px solid rgba(255,255,255,0.18)" : "none" }}>
            {q.label}
          </a>
        ))}
      </div>

      <footer className="py-12" style={{ background: YS.royal }}>
        <div className="mx-auto flex flex-col md:flex-row justify-between gap-6 text-[12.5px] leading-[1.9] text-white/65"
          style={{ maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" }}>
          <div>
            <p className="text-white font-bold text-[14px] mb-2">{COMPANY.name}</p>
            <p>{COMPANY.address}<br />대표이사 {COMPANY.ceo} · 사업자등록번호 {COMPANY.bizNo}</p>
          </div>
          <div className="md:text-right">
            <p>TEL {COMPANY.tel} · {COMPANY.email}</p>
            <p className="mt-2 text-white/40">© {COMPANY.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
