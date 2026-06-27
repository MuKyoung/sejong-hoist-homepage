"use client";

import { useState } from "react";
import Image from "next/image";
import PageHero from "@/components/subpage/PageHero";
import ContactBand from "@/components/subpage/ContactBand";
import { PORTFOLIO, PORTFOLIO_CATEGORIES } from "@/data/site";
import s from "@/styles/subpage.module.css";

export default function PortfolioPage() {
  const [active, setActive] = useState<string>("전체");

  const filtered =
    active === "전체"
      ? PORTFOLIO
      : PORTFOLIO.filter((item) => item.category === active);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="시공사례"
        desc="현장에서 검증된 세종호이스트크레인의 납품·시공 실적입니다."
      />

      <div className={s.filterBar}>
        <div className="container">
          <div className={s.filterRow} role="tablist" aria-label="카테고리 필터">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active === cat}
                className={`${s.filterBtn} ${active === cat ? s.filterBtnActive : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className="container">
          <div className={s.portfolioGrid}>
            {filtered.map((item) => (
              <article key={`${item.title}-${item.year}`} className={s.portfolioCard}>
                <div className={s.portfolioThumb}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className={s.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className={s.portfolioBody}>
                  <span className={s.portfolioCat}>{item.category}</span>
                  <h3 className={s.portfolioTitle}>{item.title}</h3>
                  <p className={s.portfolioClient}>{item.client}</p>
                  <div className={s.portfolioMeta}>
                    <span>
                      하중 <strong>{item.capacity}</strong>
                    </span>
                    <span>{item.year}년</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className={s.empty}>해당 카테고리의 시공사례가 없습니다.</p>
          )}
        </div>
      </section>

      <ContactBand />
    </>
  );
}
