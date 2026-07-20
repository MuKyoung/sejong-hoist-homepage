"use client";

/* 기술·인증 — 톤수 박스 그리드 (26.07.16 클라이언트 요청):
   박스를 클릭하면 해당 인증서가 아래로 훅 커지며 나타난다. */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./CertShowcase.module.css";

export type CertShowcaseDoc = {
  slug: string;
  title: string;
  desc: string;
  pageCount: number;
  label: string;
  sub: string;
  cover: string;
};

export default function CertShowcase({ docs }: { docs: CertShowcaseDoc[] }) {
  const [open, setOpen] = useState<string | null>(docs[0]?.slug ?? null);
  const active = docs.find((d) => d.slug === open) ?? null;

  return (
    <div>
      <div className={s.boxGrid} role="tablist" aria-label="안전인증 톤수별 보기">
        {docs.map((d) => (
          <button
            key={d.slug}
            type="button"
            role="tab"
            aria-selected={open === d.slug}
            className={`${s.box} ${open === d.slug ? s.boxActive : ""}`}
            onClick={() => setOpen(open === d.slug ? null : d.slug)}
          >
            <span className={s.boxLabel}>{d.label}</span>
            <span className={s.boxSub}>{d.sub}</span>
          </button>
        ))}
      </div>

      <div className={`${s.panel} ${active ? s.panelOpen : ""}`}>
        <div className={s.panelInner}>
          {active && (
            <div className={s.detail} key={active.slug}>
              <Link href={`/technology/certs/${active.slug}`} className={s.detailThumb}>
                <Image
                  src={active.cover}
                  alt={active.title}
                  fill
                  className={s.detailImg}
                  sizes="(max-width: 767px) 90vw, 320px"
                />
              </Link>
              <div>
                <p className={s.detailCapacity}>{active.label}</p>
                <h3 className={s.detailTitle}>{active.title}</h3>
                <p className={s.detailDesc}>{active.desc}</p>
                <Link href={`/technology/certs/${active.slug}`} className={s.detailBtn}>
                  인증서 전체 {active.pageCount}페이지 보기
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
