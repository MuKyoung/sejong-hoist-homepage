"use client";

/* 레퍼런스 시안 세부페이지 전용 블록 — 토큰(Tk)으로 3사 스타일을 입힘.
 * 메인 섹션 재활용이 아닌, 각 페이지 성격에 맞는 실제 상세 설계. */

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  E, COMPANY, BUSINESS_AREAS, PORTFOLIO, GREETING, ORG_UNITS,
  PORTFOLIO_INDUSTRIES, PORTFOLIO_CAPACITY_BUCKETS,
  QUALIFICATIONS, SAFETY_STEPS, CERT_DOCS, certCover,
} from "./data";

export type Tk = { a: string; d: string; ink: string; soft: string; r: number };
const CONTAINER = { maxWidth: 1400, paddingInline: "clamp(20px,3.5vw,48px)" } as const;
const sub55 = "rgba(16,24,32,0.55)";

export function BlockHead({ t, en, title, desc }: { t: Tk; en: string; title: string; desc?: string }) {
  return (
    <motion.div className="mb-12"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}>
      <p className="text-[12.5px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: t.a }}>{en}</p>
      <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.6rem,2.6vw,2.2rem)", color: t.ink }}>{title}</h2>
      {desc && <p className="mt-4 text-[14px] leading-[1.8]" style={{ color: sub55 }}>{desc}</p>}
    </motion.div>
  );
}

/* ── 인사말 — 좌 헤드라인·인용 / 우 본문·서명 ── */
export function GreetingBlock({ t }: { t: Tk }) {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto grid lg:grid-cols-[5fr_7fr] gap-14" style={CONTAINER}>
        <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: E }}>
          <p className="text-[12.5px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: t.a }}>CEO Greeting</p>
          <h2 className="font-extrabold leading-[1.3] tracking-[-0.02em]" style={{ fontSize: "clamp(1.7rem,2.8vw,2.4rem)", color: t.ink }}>
            {GREETING.headline[0]}<br />{GREETING.headline[1]}
          </h2>
          <p className="mt-8 pl-5 text-[15.5px] font-semibold leading-[1.75]"
            style={{ color: t.ink, borderLeft: `3px solid ${t.a}` }}>
            {GREETING.quote}
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }} transition={{ delay: 0.12, duration: 1, ease: E }}>
          <div className="flex flex-col gap-5 text-[14.5px] leading-[1.9]" style={{ color: "rgba(16,24,32,0.66)" }}>
            {GREETING.paragraphs.map((p) => (<p key={p.slice(0, 18)}>{p}</p>))}
          </div>
          <div className="mt-10 flex items-center justify-end gap-5">
            <p className="text-[14px] font-semibold" style={{ color: t.ink }}>(주)세종호이스트크레인 대표이사</p>
            <Image src="/images/ceo-sign.png" alt="대표이사 김승용 서명" width={140} height={70} className="h-12 w-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 조직도 — 공동대표 → 총괄이사·전무 → 3부서 ── */
export function OrgBlock({ t }: { t: Tk }) {
  return (
    <section className="py-20" style={{ background: t.soft }}>
      <div className="mx-auto" style={CONTAINER}>
        <BlockHead t={t} en="Organization" title="조직도" desc="설계부터 A/S까지, 전 과정을 책임지는 조직 구성입니다." />
        <div className="flex flex-col items-center">
          <motion.div className="w-60 py-5 text-center text-white" style={{ background: t.d, borderRadius: t.r }}
            initial={{ opacity: 0, y: -40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}>
            <p className="text-[15px] font-extrabold">대표이사</p>
            <p className="mt-1 text-[12.5px] text-white/70">공동대표 {COMPANY.ceo}</p>
          </motion.div>
          <span aria-hidden className="w-px h-8" style={{ background: "rgba(16,24,32,0.2)" }} />
          <div className="flex gap-4">
            {["총괄이사", "전무"].map((role, i) => (
              <motion.div key={role} className="w-44 py-3.5 text-center text-[14px] font-bold"
                style={i === 0
                  ? { background: t.a, color: "#fff", borderRadius: t.r }
                  : { background: "#fff", color: t.ink, border: "1px solid rgba(16,24,32,0.18)", borderRadius: t.r }}
                initial={{ opacity: 0, x: i === 0 ? -80 : 80 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.8, ease: E }}>
                {role}
              </motion.div>
            ))}
          </div>
          <span aria-hidden className="w-px h-8" style={{ background: "rgba(16,24,32,0.2)" }} />
          <div className="grid sm:grid-cols-3 gap-5 w-full max-w-4xl">
            {ORG_UNITS.map((u, i) => (
              <motion.div key={u.name}
                initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }} transition={{ delay: 0.25 + i * 0.1, duration: 0.85, ease: E }}>
                <div className="py-4 text-center text-white" style={{ background: t.ink, borderRadius: t.r ? `${t.r}px ${t.r}px 0 0` : 0 }}>
                  <span className="text-[15px] font-bold">{u.name}</span>
                  <span className="ml-2 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-white/50">{u.en}</span>
                </div>
                <ul className="bg-white px-6 py-5 flex flex-col gap-2.5 border border-t-0"
                  style={{ borderColor: "rgba(16,24,32,0.1)", borderRadius: t.r ? `0 0 ${t.r}px ${t.r}px` : 0 }}>
                  {u.teams.map((team) => (
                    <li key={team} className="flex items-center gap-2.5 text-[13.5px]" style={{ color: "rgba(16,24,32,0.66)" }}>
                      <span aria-hidden className="w-1.5 h-1.5 shrink-0" style={{ background: t.a, borderRadius: t.r ? 999 : 0 }} />
                      {team}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 오시는 길 ── */
export function LocationBlock({ t }: { t: Tk }) {
  const rows = [
    { k: "주소", v: COMPANY.address },
    { k: "대표전화", v: COMPANY.tel },
    { k: "팩스", v: COMPANY.fax },
    { k: "이메일", v: COMPANY.email },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto" style={CONTAINER}>
        <BlockHead t={t} en="Location" title="오시는 길" />
        <motion.div className="grid lg:grid-cols-[1fr_380px] overflow-hidden border"
          style={{ borderColor: "rgba(16,24,32,0.1)", borderRadius: t.r }}
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: E }}>
          <div className="p-8 sm:p-10">
            {rows.map((r, i) => (
              <div key={r.k} className="flex gap-6 py-4" style={{ borderTop: i ? "1px solid rgba(16,24,32,0.08)" : "none" }}>
                <span className="w-20 shrink-0 text-[13px] font-bold" style={{ color: t.a }}>{r.k}</span>
                <span className="text-[14.5px]" style={{ color: t.ink }}>{r.v}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-4 p-10 text-center text-white" style={{ background: t.d }}>
            <p className="text-[17px] font-extrabold">지도로 확인하기</p>
            <p className="text-[12.5px] text-white/65">세종특별자치시 부강면 시목부강로 314</p>
            <a href={`https://map.kakao.com/link/search/${COMPANY.mapQuery}`} target="_blank" rel="noreferrer"
              className="mt-2 inline-flex h-11 items-center px-7 bg-white text-[13.5px] font-bold hover:opacity-85 transition-opacity"
              style={{ color: t.d, borderRadius: t.r ? 999 : 0 }}>
              카카오맵에서 보기
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 사업영역 상세 — 지그재그 6개 영역 (사진 + 포인트 + 서브컷) ── */
export function AreaDetailBlock({ t }: { t: Tk }) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto flex flex-col gap-20" style={CONTAINER}>
        {BUSINESS_AREAS.map((a, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={a.slug} className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div className={`relative aspect-[16/11] overflow-hidden ${flip ? "lg:order-2" : ""}`}
                style={{ borderRadius: t.r }}
                initial={{ opacity: 0, x: flip ? 160 : -160 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-8%" }} transition={{ duration: 1, ease: E }}>
                <Image src={a.image} alt={a.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              </motion.div>
              <motion.div className={flip ? "lg:order-1" : ""}
                initial={{ opacity: 0, x: flip ? -120 : 120 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-8%" }} transition={{ delay: 0.1, duration: 1, ease: E }}>
                <p className="text-[13px] font-black tabular-nums mb-2" style={{ color: "rgba(16,24,32,0.3)" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-[11.5px] font-bold tracking-[0.16em] uppercase mb-1.5" style={{ color: t.a }}>{a.en}</p>
                <h3 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.4rem,2.2vw,1.9rem)", color: t.ink }}>
                  {a.title}
                </h3>
                <p className="mt-4 text-[14.5px] leading-[1.85]" style={{ color: "rgba(16,24,32,0.6)" }}>{a.desc}</p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {a.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-[13.5px] font-medium" style={{ color: t.ink }}>
                      <span aria-hidden className="mt-[7px] w-1.5 h-1.5 shrink-0" style={{ background: t.a, borderRadius: t.r ? 999 : 0 }} />
                      {pt}
                    </li>
                  ))}
                </ul>
                {a.photos.length > 1 && (
                  <div className="mt-6 flex gap-2.5">
                    {a.photos.slice(0, 3).map((ph) => (
                      <div key={ph} className="relative w-24 aspect-[4/3] overflow-hidden border"
                        style={{ borderColor: "rgba(16,24,32,0.1)", borderRadius: Math.min(t.r, 10) }}>
                        <Image src={ph} alt="" fill className="object-cover" sizes="96px" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── 시공사례 탐색 — 업종 × 용량 필터 + 그리드 ── */
export function PortfolioExplorer({ t }: { t: Tk }) {
  const [ind, setInd] = useState("전체");
  const [cap, setCap] = useState("전체");
  const list = PORTFOLIO.filter(
    (p) => (ind === "전체" || p.industry === ind) && (cap === "전체" || p.capacityBucket === cap),
  );
  const chip = (active: boolean) =>
    active
      ? { background: t.a, color: "#fff", borderColor: t.a }
      : { background: "#fff", color: "rgba(16,24,32,0.6)", borderColor: "rgba(16,24,32,0.16)" };
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto" style={CONTAINER}>
        <motion.div className="flex flex-col gap-4 mb-10"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}>
          {[
            { label: "업종", value: ind, set: setInd, opts: PORTFOLIO_INDUSTRIES },
            { label: "용량", value: cap, set: setCap, opts: PORTFOLIO_CAPACITY_BUCKETS },
          ].map((f) => (
            <div key={f.label} className="flex flex-wrap items-center gap-2">
              <span className="w-12 shrink-0 text-[13px] font-bold" style={{ color: t.ink }}>{f.label}</span>
              {f.opts.map((o) => (
                <button key={o} type="button" onClick={() => f.set(o)} aria-pressed={f.value === o}
                  className="h-9 px-4 text-[13px] font-semibold border transition-colors"
                  style={{ ...chip(f.value === o), borderRadius: t.r ? 999 : 0 }}>
                  {o}
                </button>
              ))}
            </div>
          ))}
          <p className="text-[13px]" style={{ color: sub55 }}>총 <b style={{ color: t.a }}>{list.length}</b>건</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((p, i) => (
            <motion.div key={p.slug} layout
              initial={{ opacity: 0, y: 70, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-6%" }} transition={{ delay: (i % 4) * 0.07, duration: 0.85, ease: E }}>
              <div className="relative aspect-[4/3] overflow-hidden group" style={{ borderRadius: t.r }}>
                <Image src={p.src} alt={p.title} fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]"
                  sizes="(max-width:640px) 100vw, 25vw" />
                <span className="absolute top-3 right-3 px-2.5 py-1 text-[11.5px] font-bold text-white"
                  style={{ background: t.a, borderRadius: t.r ? 999 : 0 }}>
                  {p.capacity}
                </span>
              </div>
              <h3 className="mt-4 text-[15px] font-bold leading-snug" style={{ color: t.ink }}>{p.title}</h3>
              <p className="mt-1.5 text-[12.5px]" style={{ color: sub55 }}>{p.client} · {p.industry} · {p.year}</p>
            </motion.div>
          ))}
        </div>
        {list.length === 0 && (
          <p className="py-20 text-center text-[14px]" style={{ color: sub55 }}>해당 조건의 시공사례가 없습니다.</p>
        )}
      </div>
    </section>
  );
}

/* ── KCs 안전인증서 5권 (표지 → 운영 뷰어) ── */
export function KcsBlock({ t }: { t: Tk }) {
  return (
    <section className="py-20" style={{ background: t.soft }}>
      <div className="mx-auto" style={CONTAINER}>
        <BlockHead t={t} en="KCs Certification" title="KCs 안전인증서"
          desc="한국승강기안전공단 개별 제품심사 적합. 표지를 누르면 전체 페이지를 열람할 수 있습니다." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CERT_DOCS.map((d, i) => (
            <motion.a key={d.slug} href={`/technology/certs/${d.slug}`} target="_blank" rel="noreferrer"
              className="group block bg-white border overflow-hidden"
              style={{ borderColor: "rgba(16,24,32,0.1)", borderRadius: t.r }}
              initial={{ opacity: 0, y: 60, rotate: i % 2 ? 2 : -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-6%" }} transition={{ delay: i * 0.06, duration: 0.8, ease: E }}>
              <div className="relative" style={{ aspectRatio: "1/1.3" }}>
                <Image src={certCover(d)} alt={d.title} fill className="object-cover object-top transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                  sizes="(max-width:640px) 50vw, 20vw" />
              </div>
              <div className="p-4">
                {d.capacity && <p className="text-[15px] font-black" style={{ color: t.a }}>{d.capacity}</p>}
                <p className="mt-1 text-[12.5px] font-semibold leading-snug line-clamp-2" style={{ color: t.ink }}>{d.title}</p>
                <p className="mt-1.5 text-[11.5px]" style={{ color: sub55 }}>{d.pageCount}p 열람 →</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 안전관리 체계 + 보유 자격 인력 ── */
export function SafetyBlock({ t }: { t: Tk }) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto" style={CONTAINER}>
        <BlockHead t={t} en="Safety" title="안전관리 체계" desc="설치 전 평가부터 정기점검까지, 단계별 안전관리를 운영합니다." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {SAFETY_STEPS.map((s, i) => (
            <motion.div key={s.num} className="p-7 border" style={{ borderColor: "rgba(16,24,32,0.1)", borderRadius: t.r }}
              initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }} transition={{ delay: i * 0.08, duration: 0.85, ease: E }}>
              <p className="text-[14px] font-black" style={{ color: t.a }}>{s.num}</p>
              <h3 className="mt-3 text-[16px] font-bold" style={{ color: t.ink }}>{s.title}</h3>
              <p className="mt-2.5 text-[13px] leading-[1.75]" style={{ color: sub55 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: E }}>
          <h3 className="text-[18px] font-extrabold mb-3" style={{ color: t.ink }}>보유 자격 인력</h3>
          <p className="text-[13.5px] leading-[1.8] mb-6 max-w-3xl" style={{ color: sub55 }}>{QUALIFICATIONS.desc}</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {QUALIFICATIONS.groups.map((g) => (
              <div key={g.field} className="p-6" style={{ background: t.soft, borderRadius: t.r }}>
                <p className="text-[14px] font-bold" style={{ color: t.a }}>{g.field}</p>
                <p className="mt-2 text-[13px] leading-[1.7]" style={{ color: t.ink }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 견적 문의 — 실폼 UI (좌 폼 / 우 연락 패널) ── */
export function InquiryFormBlock({ t }: { t: Tk }) {
  const [done, setDone] = useState(false);
  const field = "w-full h-12 px-4 text-[14px] bg-white border outline-none transition-colors focus:border-current";
  const fieldStyle = { borderColor: "rgba(16,24,32,0.16)", color: t.ink, borderRadius: t.r ? 10 : 0 } as const;
  const label = (txt: string, req = true) => (
    <label className="block mb-2 text-[13px] font-bold" style={{ color: t.ink }}>
      {txt} {req && <span style={{ color: t.a }}>*</span>}
    </label>
  );
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto grid lg:grid-cols-[1fr_360px] gap-10 items-start" style={CONTAINER}>
        <motion.div className="p-8 sm:p-10 border" style={{ borderColor: "rgba(16,24,32,0.1)", borderRadius: t.r, background: "#fff" }}
          initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 1, ease: E }}>
          {done ? (
            <div className="py-16 text-center">
              <span className="inline-flex w-16 h-16 items-center justify-center text-white text-[26px]"
                style={{ background: t.a, borderRadius: 999 }}>✓</span>
              <h3 className="mt-6 text-[21px] font-extrabold" style={{ color: t.ink }}>문의가 접수되었습니다</h3>
              <p className="mt-3 text-[13.5px] leading-[1.8]" style={{ color: sub55 }}>
                영업일 기준 1일 이내에 담당자가 연락드리겠습니다.<br />급하신 경우 {COMPANY.tel}로 연락 주세요.
              </p>
              <button type="button" onClick={() => setDone(false)}
                className="mt-8 h-11 px-7 text-[13.5px] font-bold border transition-colors hover:text-white"
                style={{ color: t.a, borderColor: t.a, borderRadius: t.r ? 999 : 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = t.a)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                새 문의 작성
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex flex-col gap-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>{label("성함")}<input required placeholder="홍길동" className={field} style={fieldStyle} /></div>
                <div>{label("회사명", false)}<input placeholder="주식회사 OOO" className={field} style={fieldStyle} /></div>
                <div>{label("연락처")}<input required placeholder="010-0000-0000" className={field} style={fieldStyle} /></div>
                <div>{label("이메일")}<input required type="email" placeholder="email@company.com" className={field} style={fieldStyle} /></div>
              </div>
              <div>
                {label("제품 카테고리")}
                <select required defaultValue="" className={field} style={fieldStyle}>
                  <option value="" disabled>선택하세요</option>
                  {["호이스트 크레인", "그랩·갠트리 크레인", "유지보수·이전설치", "철구조물 제작", "기타"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                {label("문의 내용")}
                <textarea required rows={6} placeholder="설치 장소, 하중, 스팬 등 관련 정보를 함께 기재해 주시면 빠른 답변이 가능합니다."
                  className="w-full px-4 py-3.5 text-[14px] bg-white border outline-none resize-y"
                  style={fieldStyle} />
              </div>
              <label className="flex items-start gap-3 p-4 text-[12.5px] leading-[1.7] cursor-pointer"
                style={{ background: t.soft, color: sub55, borderRadius: t.r ? 10 : 0 }}>
                <input type="checkbox" required className="mt-0.5" />
                <span><b style={{ color: t.ink }}>개인정보 수집·이용에 동의합니다.</b><br />수집 항목: 성함, 연락처, 이메일 / 목적: 문의 답변 / 보관: 처리 후 즉시 파기</span>
              </label>
              <button type="submit" className="h-13 py-4 text-[14.5px] font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: t.a, borderRadius: t.r ? 999 : 0 }}>
                문의 접수하기
              </button>
              <p className="text-center text-[11.5px]" style={{ color: "rgba(16,24,32,0.35)" }}>
                디자인 시안 데모 폼입니다. 실제 접수는{" "}
                <Link href="/support/inquiry" className="underline underline-offset-2 hover:opacity-70">운영 페이지</Link>에서 진행됩니다.
              </p>
            </form>
          )}
        </motion.div>

        <motion.aside className="p-8 text-white lg:sticky lg:top-28" style={{ background: t.d, borderRadius: t.r }}
          initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ delay: 0.12, duration: 1, ease: E }}>
          <p className="text-[12px] font-bold tracking-[0.18em] uppercase text-white/50">Direct Contact</p>
          <div className="mt-5 flex flex-col gap-4">
            {[
              { k: "대표전화", v: COMPANY.tel, href: `tel:${COMPANY.tel.replace(/-/g, "")}` },
              { k: "휴대전화", v: COMPANY.mobile, href: `tel:${COMPANY.mobile.replace(/-/g, "")}` },
              { k: "이메일", v: COMPANY.email, href: `mailto:${COMPANY.email}` },
            ].map((c) => (
              <a key={c.k} href={c.href} className="group">
                <p className="text-[11.5px] text-white/50">{c.k}</p>
                <p className="text-[17px] font-extrabold tabular-nums group-hover:underline underline-offset-4">{c.v}</p>
              </a>
            ))}
          </div>
          <p className="mt-7 pt-6 text-[12.5px] leading-[1.8] text-white/60" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
            {COMPANY.address}<br />영업일 기준 1일 이내 회신드립니다.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
