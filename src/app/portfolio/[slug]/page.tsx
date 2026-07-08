import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/subpage/PageHero";
import ContactBand from "@/components/subpage/ContactBand";
import { PORTFOLIO, getPortfolioBySlug } from "@/data/site";
import s from "@/styles/subpage.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PORTFOLIO.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) return { title: "시공사례" };
  return {
    title: `${item.title} | (주)세종호이스트크레인`,
    description: item.description,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) notFound();

  const info: { label: string; value: string }[] = [
    { label: "업종", value: item.industry },
    { label: "정격용량", value: item.capacity },
    { label: "제품유형", value: item.category },
    { label: "시공연도", value: `${item.year}년` },
    { label: "고객사", value: item.client },
    { label: "현장", value: item.location },
  ];

  return (
    <>
      <PageHero eyebrow="Portfolio" title={item.title} desc={item.description} />

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <p className={s.breadcrumb}>
            <Link href="/portfolio">시공사례</Link>
            {" / "}
            {item.title}
          </p>

          <div className={s.productHero}>
            <div>
              <div className={s.visual}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className={s.image}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <span className={s.chip}>{item.capacity}</span>
              </div>

              {item.gallery.length > 1 && (
                <div className={s.galleryRow}>
                  {item.gallery.map((src, i) => (
                    <div key={`${src}-${i}`} className={s.galleryThumb}>
                      <Image
                        src={src}
                        alt={`${item.title} 사진 ${i + 1}`}
                        fill
                        className={s.image}
                        sizes="(max-width: 1024px) 33vw, 16vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className={s.eyebrow}>Project Overview</p>
              <h2 className={`${s.headline} ${s.headlineNavy}`}>프로젝트 개요</h2>

              <div className={s.infoGrid}>
                {info.map((row) => (
                  <div key={row.label} className={s.infoItem}>
                    <p className={s.infoLabel}>{row.label}</p>
                    <p className={s.infoValue}>{row.value}</p>
                  </div>
                ))}
              </div>

              {item.period && (
                <>
                  <p className={s.specLabel} style={{ marginTop: 32, marginBottom: 12 }}>
                    공사기간
                  </p>
                  <p className={s.body}>{item.period}</p>
                </>
              )}

              <p className={s.specLabel} style={{ marginTop: 24, marginBottom: 12 }}>
                작업범위
              </p>
              <ul className={s.scopeList}>
                {item.scope.map((step) => (
                  <li key={step} className={s.scopeItem}>
                    {step}
                  </li>
                ))}
              </ul>

              <div className={s.specGrid} style={{ marginTop: 32 }}>
                {item.specs.map((spec) => (
                  <div key={spec.label} className={s.specItem}>
                    <p className={s.specLabel}>{spec.label}</p>
                    <p className={s.specValue}>{spec.value}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link href="/support/inquiry" className={s.primaryBtn}>
                  견적 문의하기
                </Link>
                <Link href="/portfolio" className={s.ghostBtn}>
                  전체 시공사례
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
