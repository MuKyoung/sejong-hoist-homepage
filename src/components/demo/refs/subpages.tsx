"use client";

/* 레퍼런스 시안 하위 페이지 — 시안별 배너 + 토큰 스타일 공용 블록 + 컴포지션.
 * /demo/{mju|yonsei|shi}/{about|business|portfolio|technology|contact} */

import { motion } from "framer-motion";
import Image from "next/image";
import {
  E, MJU, YS, SHI, SUBS, HISTORY, PRODUCTS, ISO_CERTS, ISO_META,
  type RefStyle, type RefSub,
} from "./data";
import { MjuHeader, MjuFooter } from "./MjuSections";
import { YsHeader, YsFooter } from "./YsSections";
import { ShiHeader, ShiFooter } from "./ShiSections";
import {
  GreetingBlock, OrgBlock, LocationBlock, AreaDetailBlock,
  PortfolioExplorer, KcsBlock, SafetyBlock, InquiryFormBlock,
} from "./SubBlocks";

/* 블록 공용 토큰 — 각 시안 MD의 팔레트 표와 동일 계열 */
type Tk = { a: string; d: string; ink: string; soft: string; r: number };
const TK: Record<RefStyle, Tk> = {
  mju: { a: MJU.royal, d: MJU.deep, ink: MJU.deep, soft: "#F2F5F9", r: 0 },
  ys: { a: YS.royal, d: YS.royal, ink: YS.ink, soft: YS.soft, r: 0 },
  shi: { a: SHI.accent, d: SHI.dark, ink: SHI.ink, soft: "#F6F8FA", r: 18 },
};

const sub = (key: RefSub) => SUBS.find((s) => s.key === key)!;
const CONTAINER = { maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" } as const;

/* ══════════ 배너 3종 (복합 진입 연출 포함) ══════════ */

function MjuBanner({ s }: { s: RefSub }) {
  const m = sub(s);
  return (
    <div className="relative overflow-hidden pt-40 pb-16" style={{ background: MJU.deep }}>
      {/* 회전하는 대시 링 — 우측 상단, 화면 밖에서 진입 */}
      <motion.div aria-hidden className="absolute -top-16 right-[8%] w-56 h-56"
        initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 1.2, ease: E }}>
        <motion.div className="w-full h-full rounded-full" style={{ border: "1.5px dashed rgba(255,255,255,0.3)" }}
          animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
      </motion.div>
      <div aria-hidden className="absolute -bottom-24 -right-10 w-72 h-72 rounded-full" style={{ background: "rgba(22,56,111,0.5)" }} />
      <div className="relative mx-auto" style={CONTAINER}>
        <motion.p className="text-[13px] font-bold tracking-[0.24em] uppercase text-white/50 mb-4"
          initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: E }}>
          {m.en}
        </motion.p>
        <motion.h1 className="font-extrabold text-white tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,3.6vw,3rem)" }}
          initial={{ opacity: 0, x: -180 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08, duration: 1, ease: E }}>
          {m.label}
        </motion.h1>
        <motion.p className="mt-4 text-[14.5px] text-white/65"
          initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 1, ease: E }}>
          {m.desc}
        </motion.p>
      </div>
    </div>
  );
}

function YsBanner({ s }: { s: RefSub }) {
  const m = sub(s);
  return (
    <div className="relative overflow-hidden pt-40 pb-20"
      style={{ background: "linear-gradient(180deg,#DCEAF8 0%,#F5F9FD 100%)" }}>
      {/* 초대형 영문 워드마크 — 화면 밖 오른쪽에서 미끄러져 들어옴 */}
      <motion.p aria-hidden className="absolute -bottom-6 right-0 font-black leading-none select-none whitespace-nowrap"
        style={{ fontSize: "clamp(5rem,12vw,10rem)", color: "rgba(14,74,132,0.08)", letterSpacing: "-0.04em" }}
        initial={{ x: 320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 1.4, ease: E }}>
        {m.en.toUpperCase()}
      </motion.p>
      {/* 느리게 회전하는 사분원 호 */}
      <motion.div aria-hidden className="absolute top-10 right-[16%] w-40 h-40 hidden md:block"
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.5, duration: 1 }}>
        <motion.div className="w-full h-full" style={{ border: `1.5px solid ${YS.royal}`, borderRadius: "100% 0 0 0" }}
          animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} />
      </motion.div>
      <div className="relative mx-auto" style={CONTAINER}>
        <motion.p className="text-[14px] font-extrabold mb-4" style={{ color: YS.royal }}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: E }}>
          Lift the Site! Be SEJONG!
        </motion.p>
        <motion.h1 className="font-light tracking-[-0.02em] flex items-center gap-6" style={{ fontSize: "clamp(2.2rem,4vw,3.4rem)", color: YS.ink }}
          initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.9, ease: E }}>
          <span className="font-extrabold">{m.label}</span>
          <motion.span aria-hidden className="inline-block h-px w-24 origin-left" style={{ background: YS.ink }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.9, ease: E }} />
        </motion.h1>
        <motion.p className="mt-5 text-[14.5px] text-[#54677E]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 1 }}>
          {m.desc}
        </motion.p>
      </div>
    </div>
  );
}

function ShiBanner({ s }: { s: RefSub }) {
  const m = sub(s);
  return (
    <div className="pt-40 pb-14 bg-white text-center" style={{ borderBottom: "1px solid rgba(16,24,32,0.08)" }}>
      <motion.p className="text-[12px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: SHI.accent }}
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: E }}>
        {m.en}
      </motion.p>
      <div className="overflow-hidden">
        <motion.h1 className="font-bold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,3.4vw,2.8rem)", color: SHI.ink }}
          initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.1, duration: 1, ease: E }}>
          {m.label}
        </motion.h1>
      </div>
      <motion.span aria-hidden className="block mx-auto mt-6 w-10 h-[2px] origin-center"
        style={{ background: SHI.accent }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: E }} />
      <motion.p className="mt-5 text-[14px]" style={{ color: "rgba(16,24,32,0.55)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 1 }}>
        {m.desc}
      </motion.p>
    </div>
  );
}

/* ══════════ 공용 블록 (토큰 스타일) ══════════ */

function BlockHead({ t, en, title }: { t: Tk; en: string; title: string }) {
  return (
    <motion.div className="mb-10"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}>
      <p className="text-[12.5px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: t.a }}>{en}</p>
      <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.6rem,2.6vw,2.2rem)", color: t.ink }}>{title}</h2>
    </motion.div>
  );
}

/* 연혁 — 연도 행이 좌우 교차로 화면 밖에서 진입 */
function HistoryBlock({ t }: { t: Tk }) {
  return (
    <section className="py-20" style={{ background: t.soft }}>
      <div className="mx-auto" style={CONTAINER}>
        <BlockHead t={t} en="History" title="걸어온 길" />
        <div className="border-t" style={{ borderColor: "rgba(16,24,32,0.12)" }}>
          {HISTORY.map((h, i) => (
            <motion.div key={h.year}
              className="grid grid-cols-[110px_1fr] sm:grid-cols-[180px_1fr] gap-4 py-6 border-b"
              style={{ borderColor: "rgba(16,24,32,0.08)" }}
              initial={{ opacity: 0, x: i % 2 ? 130 : -130 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-6%" }} transition={{ duration: 0.9, ease: E }}>
              <p className="font-black leading-none tabular-nums" style={{ fontSize: "clamp(1.5rem,2.4vw,2rem)", color: t.a }}>{h.year}</p>
              <ul className="flex flex-col gap-1.5">
                {h.items.map((item) => (
                  <li key={item} className="text-[14.5px] leading-[1.7]" style={{ color: "rgba(16,24,32,0.66)" }}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 제품 라인업 — 카드가 기울어진 채 올라와 수평 세틀 */
function ProductsBlock({ t }: { t: Tk }) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto" style={CONTAINER}>
        <BlockHead t={t} en="Products" title="제품 라인업" />
        <div className="grid sm:grid-cols-3 gap-5">
          {PRODUCTS.map((p, i) => (
            <motion.div key={p.slug}
              initial={{ opacity: 0, y: 90, rotate: i === 1 ? 0 : i === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-8%" }} transition={{ delay: i * 0.1, duration: 0.95, ease: E }}>
              <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: t.r }}>
                <Image src={p.image} alt={p.titleKr} fill className="object-cover" sizes="(max-width:640px) 100vw, 33vw" />
              </div>
              <p className="mt-5 text-[11.5px] font-bold tracking-[0.14em] uppercase" style={{ color: t.a }}>{p.title}</p>
              <h3 className="mt-1 text-[18px] font-bold" style={{ color: t.ink }}>{p.titleKr}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.75]" style={{ color: "rgba(16,24,32,0.55)" }}>{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.specs.slice(0, 2).map((sp) => (
                  <span key={sp.label} className="px-3 py-1.5 text-[12px] font-semibold"
                    style={{ background: t.soft, color: t.ink, borderRadius: t.r ? 999 : 0 }}>
                    {sp.label} {sp.value}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 인증 — ISO 실물 3종 + KCs, 좌우 교차 진입 */
function CertBlock({ t }: { t: Tk }) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto" style={CONTAINER}>
        <BlockHead t={t} en="Certification" title="ISO 인증 3종" />
        <p className="-mt-6 mb-10 text-[13.5px]" style={{ color: "rgba(16,24,32,0.5)" }}>
          {ISO_META.issuer} 발급 · 유효기간 {ISO_META.period}
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          {ISO_CERTS.map((c, i) => (
            <motion.a key={c.title} href={c.image} target="_blank" rel="noreferrer" className="group block"
              initial={{ opacity: 0, x: (i - 1) * 160 || 0, y: i === 1 ? 90 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-8%" }} transition={{ delay: i * 0.08, duration: 1, ease: E }}>
              <div className="relative overflow-hidden border" style={{ aspectRatio: "1/1.35", borderColor: "rgba(16,24,32,0.1)", borderRadius: t.r }}>
                <Image src={c.image} alt={`${c.standard} 인증서`} fill className="object-cover object-top transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                  sizes="(max-width:640px) 100vw, 33vw" />
              </div>
              <h3 className="mt-4 text-[16px] font-bold" style={{ color: t.ink }}>{c.standard}</h3>
              <p className="mt-1 text-[13px]" style={{ color: "rgba(16,24,32,0.55)" }}>{c.desc} · {c.certNo}</p>
            </motion.a>
          ))}
        </div>
        <motion.div className="mt-10 flex flex-wrap items-center gap-3 p-6" style={{ background: t.soft, borderRadius: t.r }}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: E }}>
          <span className="px-3 py-1.5 text-[12px] font-bold text-white" style={{ background: t.a, borderRadius: t.r ? 999 : 0 }}>KCs</span>
          <p className="text-[14px] font-semibold" style={{ color: t.ink }}>
            한국승강기안전공단 KCs 안전인증 · LS ELECTRIC 부산공장 13대 전수 적합 (적합률 100%, 부적합 0건)
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════ 컴포지션 ══════════ */

const PARTS: Record<RefStyle, {
  Header: React.ComponentType; Footer: React.ComponentType;
  Banner: React.ComponentType<{ s: RefSub }>;
}> = {
  mju: { Header: MjuHeader, Footer: MjuFooter, Banner: MjuBanner },
  ys: { Header: YsHeader, Footer: YsFooter, Banner: YsBanner },
  shi: { Header: ShiHeader, Footer: ShiFooter, Banner: ShiBanner },
};

/* 각 페이지는 성격에 맞는 상세 블록으로 구성 (메인 섹션 재활용 없음) */
export function RefSubPage({ style, page }: { style: RefStyle; page: RefSub }) {
  const { Header, Footer, Banner } = PARTS[style];
  const t = TK[style];
  return (
    <>
      <Header />
      <Banner s={page} />
      {page === "about" && (
        <>
          <GreetingBlock t={t} />
          <HistoryBlock t={t} />
          <OrgBlock t={t} />
          <LocationBlock t={t} />
        </>
      )}
      {page === "business" && (
        <>
          <AreaDetailBlock t={t} />
          <ProductsBlock t={t} />
        </>
      )}
      {page === "portfolio" && <PortfolioExplorer t={t} />}
      {page === "technology" && (
        <>
          <CertBlock t={t} />
          <KcsBlock t={t} />
          <SafetyBlock t={t} />
        </>
      )}
      {page === "contact" && <InquiryFormBlock t={t} />}
      <Footer />
    </>
  );
}
