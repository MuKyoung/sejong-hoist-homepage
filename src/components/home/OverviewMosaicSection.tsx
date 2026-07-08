import Image from "next/image";
import Link from "next/link";
import { NOTICES } from "@/data/site";
import s from "./OverviewMosaicSection.module.css";

type Locale = "ko" | "en";

const T: Record<Locale, {
  eyebrow: string; title: string; subtitle: string; photoLabel: string;
  blocks: [string, string, string, string]; newsTitle: string; more: string;
}> = {
  ko: {
    eyebrow: "About Us",
    title: "회사소개",
    subtitle: "운반하역 현장의 안전과 품질을 책임지는 세종호이스트크레인입니다.",
    photoLabel: "세종호이스트크레인 소개",
    blocks: ["시공사례", "기술·인증", "CONTACT US", "견적 문의"],
    newsTitle: "뉴스 및 공지",
    more: "더보기 +",
  },
  en: {
    eyebrow: "About Us",
    title: "Who We Are",
    subtitle: "Sejong Hoist Crane builds safety and quality into every heavy-lifting site.",
    photoLabel: "About Sejong Hoist Crane",
    blocks: ["Projects", "Technology", "CONTACT US", "Request a Quote"],
    newsTitle: "News & Notice",
    more: "More +",
  },
};

const NOTICE_EN: Record<number, string> = {
  4: "350TON gantry crab crane installed and safety-certified",
  3: "Five double girder 30TON cranes delivered to LS ELECTRIC Busan",
  2: "Explosion-proof single girder 3TON hoist added to lineup",
  1: "Online quotation service in operation",
};

const CATEGORY_EN: Record<string, string> = {
  회사소식: "News",
  납품실적: "Delivery",
  제품: "Product",
  채용: "Careers",
  기술: "Tech",
};

function ArrowGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="13 5 20 12 13 19" />
    </svg>
  );
}

export default function OverviewMosaicSection({ locale = "ko" }: { locale?: Locale }) {
  const t = T[locale];
  return (
    <section className={s.section} aria-label={t.title}>
      <div className="container">
        <div className={s.header}>
          <p className={s.eyebrow}>{t.eyebrow}</p>
          <h2 className={s.title}>{t.title}</h2>
          <p className={s.subtitle}>{t.subtitle}</p>
        </div>

        <div className={s.grid}>
          <Link href="/about" className={s.photoCard}>
            <Image
              src="/images/about-02.jpg"
              alt=""
              fill
              className={s.photoImg}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <span className={s.photoOverlay} aria-hidden />
            <span className={s.photoLabel}>
              {t.photoLabel}
              <ArrowGlyph />
            </span>
          </Link>

          <div className={s.blockCol}>
            <Link href="/portfolio" className={`${s.block} ${s.blockBrand}`}>
              <span className={s.blockLabel}>{t.blocks[0]}</span>
              <ArrowGlyph />
            </Link>
            <Link href="/technology" className={`${s.block} ${s.blockWhite}`}>
              <span className={s.blockLabel}>{t.blocks[1]}</span>
              <ArrowGlyph />
            </Link>
          </div>

          <div className={s.blockCol}>
            <Link href="/support" className={`${s.block} ${s.blockSurface}`}>
              <span className={s.blockLabel}>{t.blocks[2]}</span>
              <ArrowGlyph />
            </Link>
            <Link href="/support/inquiry" className={`${s.block} ${s.blockDeep}`}>
              <span className={s.blockLabel}>{t.blocks[3]}</span>
              <ArrowGlyph />
            </Link>
          </div>
        </div>

        <div className={s.newsBand}>
          <div className={s.newsHead}>
            <h3 className={s.newsTitle}>{t.newsTitle}</h3>
            <Link href="/support/notice" className={s.newsMore}>
              {t.more}
            </Link>
          </div>
          <ul className={s.newsCols}>
            {NOTICES.slice(0, 3).map((n) => (
              <li key={n.id} className={s.newsCol}>
                <Link href={`/support/notice/${n.id}`} className={s.newsItem}>
                  <span className={s.newsCat}>[{locale === "en" ? CATEGORY_EN[n.category] ?? n.category : n.category}]</span>
                  <span className={s.newsItemTitle}>{locale === "en" ? NOTICE_EN[n.id] ?? n.title : n.title}</span>
                  <span className={s.newsDate}>{n.date}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
