import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO } from "@/data/site";
import s from "./PortfolioPreviewSection.module.css";

const FEATURED = PORTFOLIO.slice(0, 4);

type Locale = "ko" | "en";

const T: Record<Locale, { title: string; subtitle: string }> = {
  ko: { title: "핵심 시공사례", subtitle: "숫자로 증명된 현장을 사진으로 확인하세요." },
  en: { title: "Featured Projects", subtitle: "See the sites behind the numbers above." },
};

const TITLE_EN: Record<string, string> = {
  "gantry-350": "Gantry Crane 350TON",
  "grab-350-50": "Grab Crane 350/50TON",
  "grab-250-50": "Grab Crane 250/50TON",
  "ceiling-30": "Overhead Crane 30TON",
};

const INDUSTRY_EN: Record<string, string> = {
  "전기·전자": "Electric & Electronics",
  자동차: "Automotive",
  물류: "Logistics",
};

export default function PortfolioPreviewSection({ locale = "ko" }: { locale?: Locale }) {
  const t = T[locale];
  return (
    <section className={s.section} aria-label={t.title}>
      <div className="container">
        <div className={s.header}>
          <p className={s.eyebrow}>Portfolio</p>
          <h2 className={s.headline}>{t.title}</h2>
          <p className={s.subtitle}>{t.subtitle}</p>
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
                <span className={s.industry}>
                  {locale === "en" ? INDUSTRY_EN[item.industry] ?? item.industry : item.industry}
                </span>
                <h3 className={s.title}>
                  {locale === "en" ? TITLE_EN[item.slug] ?? item.title : item.title}
                </h3>
                <p className={s.client}>
                  {locale === "en" ? "LS ELECTRIC Busan Plant" : item.client}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
