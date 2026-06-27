import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/subpage/PageHero";
import ContactBand from "@/components/subpage/ContactBand";
import { PRODUCTS } from "@/data/site";
import s from "@/styles/subpage.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "제품소개" };
  return {
    title: `${product.titleKr} | (주)세종호이스트크레인`,
    description: product.desc,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      <PageHero
        eyebrow={product.title}
        title={product.titleKr}
        desc={product.desc}
      />

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <p className={s.breadcrumb}>
            <Link href="/business">제품소개</Link>
            {" / "}
            {product.titleKr}
          </p>

          <div className={s.productHero}>
            <div className={s.visual}>
              <Image
                src={product.image}
                alt={product.titleKr}
                fill
                className={s.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            <div>
              <p className={s.eyebrow}>Specifications</p>
              <h2 className={`${s.headline} ${s.headlineNavy}`}>제품 사양</h2>
              <div className={s.specGrid}>
                {product.specs.map((spec) => (
                  <div key={spec.label} className={s.specItem}>
                    <p className={s.specLabel}>{spec.label}</p>
                    <p className={s.specValue}>{spec.value}</p>
                  </div>
                ))}
              </div>

              <p className={s.body} style={{ marginTop: 24 }}>
                현장 조건·하중·스팬에 맞춘 맞춤 설계가 가능합니다.
                견적 및 기술 상담은 아래 버튼을 통해 문의해 주세요.
              </p>

              <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link href="/support/inquiry" className={s.primaryBtn}>
                  견적 문의하기
                </Link>
                <Link href="/business" className={s.ghostBtn}>
                  전체 제품 보기
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
