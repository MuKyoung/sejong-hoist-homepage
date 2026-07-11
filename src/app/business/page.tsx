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
    "호이스트 크레인, 그랩·갠트리 크레인, 유지보수·이전설치, 철구조물 제작까지 운반하역 설비의 전 과정을 책임집니다.",
};

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Business"
        title="사업영역"
        desc="설계부터 제작·설치·유지보수까지, 운반하역 설비의 전 과정을 책임집니다."
      />

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <div className={s.prodLayout}>
            <aside className={s.sideNav} aria-label="사업영역 바로가기">
              <p className={s.sideTitle}>사업영역</p>
              {BUSINESS_AREAS.map((area) => (
                <a key={area.slug} href={`#${area.slug}`} className={s.sideLink}>
                  {area.title}
                </a>
              ))}
              <p className={s.sideTitle}>제품</p>
              <a href="#products" className={s.sideLink}>
                제품 라인업
              </a>
            </aside>

            <div className={s.prodMain}>
              {BUSINESS_AREAS.map((area, idx) => (
                <article key={area.slug} id={area.slug} className={s.areaCard}>
                  <div className={s.areaPhoto}>
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      className={s.image}
                      sizes="(max-width: 767px) 100vw, 320px"
                    />
                  </div>
                  <div className={s.areaBody}>
                    <p className={s.areaEn}>
                      {String(idx + 1).padStart(2, "0")} · {area.en}
                    </p>
                    <h2 className={s.areaTitle}>{area.title}</h2>
                    <p className={s.areaDesc}>{area.desc}</p>
                    <ul className={s.scopeList}>
                      {area.points.map((point) => (
                        <li key={point} className={s.scopeItem}>
                          {point}
                        </li>
                      ))}
                    </ul>

                    {area.photos.length > 1 && (
                      <div className={s.areaThumbs}>
                        {area.photos.slice(1).map((photo, i) => (
                          <div key={photo} className={s.areaThumb}>
                            <Image
                              src={photo}
                              alt={`${area.title} 시공 사진 ${i + 2}`}
                              fill
                              className={s.image}
                              sizes="140px"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}

              <div id="products" className={s.prodHead}>
                <h2 className={`${s.headline} ${s.headlineNavy}`}>제품 라인업</h2>
                <p className={s.body}>
                  제품별 상세 사양은 각 제품 페이지에서 확인하실 수 있습니다.
                </p>
              </div>

              <div className={s.prodGrid}>
                {PRODUCTS.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/business/${product.slug}`}
                    className={s.prodCard}
                  >
                    <div className={s.prodThumb}>
                      <Image
                        src={product.image}
                        alt={product.titleKr}
                        fill
                        className={s.image}
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 300px"
                      />
                    </div>
                    <div className={s.prodBody}>
                      <p className={s.prodEn}>{product.title}</p>
                      <h3 className={s.prodName}>{product.titleKr}</h3>
                      <p className={s.prodSpec}>
                        {product.specs[0].label} {product.specs[0].value}
                      </p>
                      <span className={s.prodMore}>자세히 보기 →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
