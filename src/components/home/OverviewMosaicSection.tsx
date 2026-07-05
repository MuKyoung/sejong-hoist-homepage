import Image from "next/image";
import Link from "next/link";
import { NOTICES } from "@/data/site";
import s from "./OverviewMosaicSection.module.css";

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

export default function OverviewMosaicSection() {
  return (
    <section className={s.section} aria-label="회사소개">
      <div className="container">
        <div className={s.header}>
          <p className={s.eyebrow}>About Us</p>
          <h2 className={s.title}>회사소개</h2>
          <p className={s.subtitle}>
            운반하역 현장의 안전과 품질을 책임지는 세종호이스트크레인입니다.
          </p>
        </div>

        <div className={s.grid}>
          <Link href="/about" className={s.photoCard}>
            <Image
              src="/images/sejong_1.png"
              alt=""
              fill
              className={s.photoImg}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <span className={s.photoOverlay} aria-hidden />
            <span className={s.photoLabel}>
              세종호이스트크레인 소개
              <ArrowGlyph />
            </span>
          </Link>

          <div className={s.blockCol}>
            <Link href="/portfolio" className={`${s.block} ${s.blockBrand}`}>
              <span className={s.blockLabel}>시공사례</span>
              <ArrowGlyph />
            </Link>
            <Link href="/business" className={`${s.block} ${s.blockWhite}`}>
              <span className={s.blockLabel}>제품소개</span>
              <ArrowGlyph />
            </Link>
          </div>

          <div className={s.blockCol}>
            <Link href="/support" className={`${s.block} ${s.blockSurface}`}>
              <span className={s.blockLabel}>CONTACT US</span>
              <ArrowGlyph />
            </Link>
            <Link href="/support/inquiry" className={`${s.block} ${s.blockDeep}`}>
              <span className={s.blockLabel}>견적 문의</span>
              <ArrowGlyph />
            </Link>
          </div>
        </div>

        <div className={s.newsBand}>
          <div className={s.newsHead}>
            <h3 className={s.newsTitle}>뉴스 및 공지</h3>
            <Link href="/support/notice" className={s.newsMore}>
              더보기 +
            </Link>
          </div>
          <ul className={s.newsCols}>
            {NOTICES.slice(0, 3).map((n) => (
              <li key={n.id} className={s.newsCol}>
                <Link href={`/support/notice/${n.id}`} className={s.newsItem}>
                  <span className={s.newsCat}>[{n.category}]</span>
                  <span className={s.newsItemTitle}>{n.title}</span>
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
