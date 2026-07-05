import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/subpage/PageHero";
import ContactBand from "@/components/subpage/ContactBand";
import { BUSINESS_AREAS, PRODUCTS } from "@/data/site";
import s from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "사업영역 | (주)세종호이스트크레인",
  description:
    "호이스트 크레인, 그랩·갠트리 크레인, 유지보수·이전설치, 철구조물 제작 — 운반하역 설비의 전 과정을 책임집니다.",
};

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Business"
        title="사업영역"
        desc="설계부터 제작·설치·유지보수까지, 운반하역 설비의 전 과정을 책임집니다."
      />

      <section className={s.sectionWhite}>
        {BUSINESS_AREAS.map((area, idx) => (
          <div
            key={area.slug}
            id={area.slug}
            className={`${s.bizRow} ${idx % 2 === 1 ? s.bizReverse : ""}`}
          >
            <div className={s.bizVisual}>
              <Image
                src={area.image}
                alt={area.title}
                fill
                className={s.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className={s.chip}>{area.en}</span>
            </div>

            <div className={`${s.bizContent} ${idx % 2 === 1 ? s.bizContentTint : ""}`}>
              <p className={s.bizIndex}>{String(idx + 1).padStart(2, "0")}</p>
              <h2 className={s.bizTitle}>{area.title}</h2>
              <p className={s.bizTitleEn}>{area.en}</p>
              <p className={s.bizDesc}>{area.desc}</p>

              <ul className={s.scopeList} style={{ marginBottom: 28 }}>
                {area.points.map((point) => (
                  <li key={point} className={s.scopeItem}>
                    {point}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link href="/support/inquiry" className={s.primaryBtn}>
                  견적 문의하기
                </Link>
                <Link href="/portfolio" className={s.ghostBtn}>
                  시공사례 보기
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className="container">
          <div className={s.centerHeader}>
            <p className={s.eyebrow}>Products</p>
            <h2 className={s.headline}>제품 라인업</h2>
            <p className={s.body}>제품별 사양은 상세페이지에서 확인하실 수 있습니다.</p>
          </div>

          <div className={s.portfolioGrid}>
            {PRODUCTS.map((product) => (
              <Link
                key={product.slug}
                href={`/business/${product.slug}`}
                className={s.portfolioCard}
              >
                <div className={s.portfolioThumb}>
                  <Image
                    src={product.image}
                    alt={product.titleKr}
                    fill
                    className={s.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className={s.portfolioBody}>
                  <span className={s.portfolioCat}>{product.title}</span>
                  <h3 className={s.portfolioTitle}>{product.titleKr}</h3>
                  <p className={s.portfolioClient}>{product.specs[0].value}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
