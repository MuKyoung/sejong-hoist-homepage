import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO } from "@/data/site";
import s from "./PortfolioPreviewSection.module.css";

const FEATURED = PORTFOLIO.slice(0, 4);

export default function PortfolioPreviewSection() {
  return (
    <section className={s.section} aria-label="핵심 시공사례">
      <div className="container">
        <div className={s.header}>
          <p className={s.eyebrow}>Portfolio</p>
          <h2 className={s.headline}>핵심 시공사례</h2>
          <p className={s.subtitle}>현장에서 검증된 세종호이스트크레인의 대표 실적입니다.</p>
        </div>

        <div className={s.grid}>
          {FEATURED.map((item) => (
            <Link key={item.slug} href={`/portfolio/${item.slug}`} className={s.card}>
              <div className={s.thumb}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className={s.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className={s.badge}>{item.capacity}</span>
              </div>
              <div className={s.body}>
                <span className={s.industry}>{item.industry}</span>
                <h3 className={s.title}>{item.title}</h3>
                <p className={s.client}>{item.client}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className={s.moreWrap}>
          <Link href="/portfolio" className={s.moreBtn}>
            전체 시공사례 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
