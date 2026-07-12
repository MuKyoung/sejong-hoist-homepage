"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PORTFOLIO_INDUSTRIES,
  PORTFOLIO_CAPACITY_BUCKETS,
} from "@/data/site";
import type { CmsPortfolioItem } from "@/lib/cms";
import s from "@/styles/subpage.module.css";

export default function PortfolioClient({ items }: { items: CmsPortfolioItem[] }) {
  const [industry, setIndustry] = useState<string>("전체");
  const [bucket, setBucket] = useState<string>("전체");

  const filtered = items.filter(
    (item) =>
      (industry === "전체" || item.industry === industry) &&
      (bucket === "전체" || item.capacityBucket === bucket),
  );

  return (
    <>
      <div className={s.filterBar}>
        <div className="container">
          <div className={s.filterGroup}>
            <span className={s.filterLabel}>업종</span>
            <div className={s.filterRow} role="tablist" aria-label="업종 필터">
              {PORTFOLIO_INDUSTRIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={industry === cat}
                  className={`${s.filterBtn} ${industry === cat ? s.filterBtnActive : ""}`}
                  onClick={() => setIndustry(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className={s.filterGroup}>
            <span className={s.filterLabel}>용량</span>
            <div className={s.filterRow} role="tablist" aria-label="용량 필터">
              {PORTFOLIO_CAPACITY_BUCKETS.map((cap) => (
                <button
                  key={cap}
                  type="button"
                  role="tab"
                  aria-selected={bucket === cap}
                  className={`${s.filterBtn} ${bucket === cap ? s.filterBtnActive : ""}`}
                  onClick={() => setBucket(cap)}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className="container">
          <div className={s.portfolioGrid}>
            {filtered.map((item) => (
              <Link
                key={item.slug}
                href={`/portfolio/${item.slug}`}
                className={s.portfolioCard}
              >
                <div className={s.portfolioThumb}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className={s.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className={s.capacityBadge}>{item.capacity}</span>
                </div>
                <div className={s.portfolioBody}>
                  <span className={s.portfolioCat}>{item.industry}</span>
                  <h3 className={s.portfolioTitle}>{item.title}</h3>
                  <p className={s.portfolioClient}>{item.client}</p>
                  <div className={s.portfolioMeta}>
                    <span>{item.category}</span>
                    <span>{item.year}년</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className={s.empty}>해당 조건의 시공사례가 없습니다.</p>
          )}
        </div>
      </section>
    </>
  );
}
