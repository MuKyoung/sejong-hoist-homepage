import Image from "next/image";
import Link from "next/link";
import { getNotices, getPortfolioList } from "@/lib/cms";
import s from "./OverviewMosaicSection.module.css";
import Reveal from "./Reveal";

type Locale = "ko" | "en";

const T: Record<Locale, {
  eyebrow: string; title: string; subtitle: string; photoLabel: string;
  portfolioTitle: string; portfolioMore: string;
  blocks: [string, string, string]; newsTitle: string; more: string;
}> = {
  ko: {
    eyebrow: "About Us",
    title: "회사소개",
    subtitle: "운반하역 현장의 안전과 품질을 책임지는 세종호이스트크레인입니다.",
    photoLabel: "세종호이스트크레인 소개",
    portfolioTitle: "시공사례",
    portfolioMore: "전체 보기 +",
    blocks: ["기술·인증", "CONTACT US", "견적 문의"],
    newsTitle: "뉴스 및 공지",
    more: "더보기 +",
  },
  en: {
    eyebrow: "About Us",
    title: "Who We Are",
    subtitle: "Sejong Hoist Crane builds safety and quality into every heavy-lifting site.",
    photoLabel: "About Sejong Hoist Crane",
    portfolioTitle: "Projects",
    portfolioMore: "View all +",
    blocks: ["Technology", "CONTACT US", "Request a Quote"],
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

export default async function OverviewMosaicSection({ locale = "ko" }: { locale?: Locale }) {
  const t = T[locale];
  const [notices, portfolio] = await Promise.all([getNotices(), getPortfolioList()]);
  const projects = portfolio.slice(0, 4);
  return (
    <section className={s.section} aria-label={t.title}>
      <div className="container">
        <Reveal>
        <div className={s.header}>
          <p className={s.eyebrow}>{t.eyebrow}</p>
          <h2 className={s.title}>{t.title}</h2>
          <p className={s.subtitle}>{t.subtitle}</p>
        </div>
        </Reveal>

        <Reveal delay={100}>
        <div className={s.grid}>
          <Link href="/about" className={s.photoCard}>
            <Image
              src="/images/about-02.jpg"
              alt=""
              fill
              className={s.photoImg}
              sizes="(min-width: 1024px) 28vw, 100vw"
            />
            <span className={s.photoOverlay} aria-hidden />
            <span className={s.photoLabel}>
              {t.photoLabel}
              <ArrowGlyph />
            </span>
          </Link>

          {/* 시공사례 리스트 — 클릭 시 해당 상세로 (2026-07-13 클라이언트 요청) */}
          <div className={s.pfPanel}>
            <div className={s.pfHead}>
              <h3 className={s.pfTitle}>{t.portfolioTitle}</h3>
              <Link href="/portfolio" className={s.pfMore}>
                {t.portfolioMore}
              </Link>
            </div>
            <ul className={s.pfList}>
              {projects.map((item) => (
                <li key={item.slug}>
                  <Link href={`/portfolio/${item.slug}`} className={s.pfRow}>
                    <span className={s.pfIndustry}>
                      {locale === "en" ? INDUSTRY_EN[item.industry] ?? item.industry : item.industry}
                    </span>
                    <span className={s.pfName}>
                      {locale === "en" ? TITLE_EN[item.slug] ?? item.title : item.title}
                    </span>
                    <span className={s.pfMeta}>
                      {item.capacity} · {item.year}
                    </span>
                    <span className={s.pfArrow} aria-hidden>
                      <ArrowGlyph />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.blockCol}>
            <Link href="/technology" className={`${s.block} ${s.blockWhite}`}>
              <span className={s.blockLabel}>{t.blocks[0]}</span>
              <ArrowGlyph />
            </Link>
            <Link href="/support" className={`${s.block} ${s.blockSurface}`}>
              <span className={s.blockLabel}>{t.blocks[1]}</span>
              <ArrowGlyph />
            </Link>
            <Link href="/support/inquiry" className={`${s.block} ${s.blockDeep}`}>
              <span className={s.blockLabel}>{t.blocks[2]}</span>
              <ArrowGlyph />
            </Link>
          </div>
        </div>
        </Reveal>

        <Reveal delay={200}>
        <div className={s.newsBand}>
          <div className={s.newsHead}>
            <h3 className={s.newsTitle}>{t.newsTitle}</h3>
            <Link href="/support/notice" className={s.newsMore}>
              {t.more}
            </Link>
          </div>
          <ul className={s.newsCols}>
            {notices.slice(0, 3).map((n) => (
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
        </Reveal>
      </div>
    </section>
  );
}
