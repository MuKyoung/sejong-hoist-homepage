import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/subpage/PageHero";
import ContactBand from "@/components/subpage/ContactBand";
import { CERT_DOCS, certPage, getCertDocBySlug } from "@/data/site";
import s from "@/styles/subpage.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CERT_DOCS.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getCertDocBySlug(slug);
  if (!doc) return { title: "기술·인증" };
  return {
    title: `${doc.title} | (주)세종호이스트크레인`,
    description: `${doc.desc} — 전체 ${doc.pageCount}페이지 원본`,
    robots: { index: false },
  };
}

export default async function CertViewerPage({ params }: Props) {
  const { slug } = await params;
  const doc = getCertDocBySlug(slug);
  if (!doc) notFound();

  const pages = Array.from({ length: doc.pageCount }, (_, i) => i + 1);

  return (
    <>
      <PageHero eyebrow="Certification" title={doc.title} desc={doc.desc} />

      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className="container">
          <div className={s.docViewer}>
            <p className={s.breadcrumb}>
              <Link href="/technology#certs">기술·인증</Link>
              {" / "}
              인증서 원본 ({doc.pageCount}페이지)
            </p>

            {pages.map((n) => (
              <figure key={n} className={s.docPage}>
                <Image
                  src={certPage(doc, n)}
                  alt={`${doc.title} — ${n}페이지`}
                  width={1100}
                  height={1556}
                  style={{ width: "100%", height: "auto" }}
                  sizes="(max-width: 920px) 100vw, 880px"
                  priority={n === 1}
                />
                <figcaption className={s.docPageNum}>
                  {String(n).padStart(2, "0")} / {String(doc.pageCount).padStart(2, "0")}
                </figcaption>
              </figure>
            ))}

            <div style={{ marginTop: 32, textAlign: "center" }}>
              <Link href="/technology#certs" className={s.ghostBtn}>
                기술·인증으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
