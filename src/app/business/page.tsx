import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/subpage/PageHero";
import ContactBand from "@/components/subpage/ContactBand";
import { PRODUCTS } from "@/data/site";
import s from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "제품소개 | (주)세종호이스트크레인",
  description: "Wire Hoist, Chain Hoist, Explosion-Proof Hoist, Crane, Hoist & Crane 제품 라인업.",
};

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="제품소개"
        desc="현장 조건에 맞춘 호이스트·크레인 솔루션을 설계·제작·시공합니다."
      />

      <section className={s.sectionWhite}>
        {PRODUCTS.map((product, idx) => (
          <div
            key={product.slug}
            className={`${s.bizRow} ${idx % 2 === 1 ? s.bizReverse : ""}`}
          >
            <div className={s.bizVisual}>
              <Image
                src={product.image}
                alt={product.titleKr}
                fill
                className={s.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className={s.chip}>{product.title}</span>
            </div>

            <div className={`${s.bizContent} ${idx % 2 === 1 ? s.bizContentTint : ""}`}>
              <p className={s.bizIndex}>{String(idx + 1).padStart(2, "0")}</p>
              <h2 className={s.bizTitle}>{product.titleKr}</h2>
              <p className={s.bizTitleEn}>{product.title}</p>
              <p className={s.bizDesc}>{product.desc}</p>

              <div className={s.specGrid}>
                {product.specs.map((spec) => (
                  <div key={spec.label} className={s.specItem}>
                    <p className={s.specLabel}>{spec.label}</p>
                    <p className={s.specValue}>{spec.value}</p>
                  </div>
                ))}
              </div>

              <Link href={`/business/${product.slug}`} className={s.ghostBtn}>
                자세히 보기
              </Link>
            </div>
          </div>
        ))}
      </section>

      <ContactBand />
    </>
  );
}
