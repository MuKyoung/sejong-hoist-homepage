import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/subpage/PageHero";
import ContactBand from "@/components/subpage/ContactBand";
import { CERT_DOCS, certCover, REVIEW_DOCS, ISO_CERTS, ISO_META, QUALIFICATIONS, SAFETY_STEPS } from "@/data/site";
import s from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "기술·인증 | (주)세종호이스트크레인",
  description: "보유 인증, 구조해석 역량, 안전관리 체계로 세종호이스트크레인의 기술 기반을 소개합니다.",
};

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology & Certification"
        title="기술·인증"
        desc="구조해석 기반의 설계 역량과 안전관리 체계로 신뢰를 증명합니다."
      />

      <section id="certs" className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <div className={s.centerHeader}>
            <p className={s.eyebrow}>Certification</p>
            <h2 className={s.headline}>보유 인증</h2>
            <p className={s.body}>
              LS ELECTRIC 부산공장 크레인 13대 전수 안전인증 합격
              (적합률 100%, 부적합 0건). 카드를 클릭하면 인증서 원본을 확인할 수 있습니다.
            </p>
          </div>

          <div className={s.certGrid}>
            {CERT_DOCS.map((doc) => (
              <Link key={doc.slug} href={`/technology/certs/${doc.slug}`} className={s.certCard}>
                <div className={s.certThumb}>
                  <Image
                    src={certCover(doc)}
                    alt={doc.title}
                    fill
                    className={s.certImg}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 380px"
                  />
                </div>
                <div className={s.certBody}>
                  {doc.capacity && (
                    <p className={s.certCapacity}>{doc.capacity}</p>
                  )}
                  <h3 className={s.certTitle}>{doc.title}</h3>
                  <p className={s.certIssuer}>{doc.desc}</p>
                  <span className={s.certZoom}>전체 {doc.pageCount}페이지 보기 →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className={s.docHead}>
            <h3 className={s.docHeadTitle}>ISO 인증</h3>
            <p className={s.body}>
              품질·환경·안전보건 경영시스템 인증을 보유하고 있습니다.
              {" "}{ISO_META.issuer} 발급, 유효기간 {ISO_META.period}.
            </p>
          </div>

          <div className={s.certGrid}>
            {ISO_CERTS.map((iso) => (
              <a
                key={iso.title}
                href={iso.image}
                target="_blank"
                rel="noreferrer"
                className={s.certCard}
              >
                <div className={s.certThumb}>
                  <Image
                    src={iso.image}
                    alt={`${iso.standard} ${iso.desc} 인증서`}
                    fill
                    className={s.certImg}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 380px"
                  />
                </div>
                <div className={s.certBody}>
                  <h3 className={s.certTitle}>{iso.standard}</h3>
                  <p className={s.certIssuer}>{iso.desc} · 인증번호 {iso.certNo}</p>
                  <span className={s.certZoom}>인증서 원본 보기 →</span>
                </div>
              </a>
            ))}
          </div>

          <div className={s.docHead}>
            <h3 className={s.docHeadTitle}>크레인 구조 서면심사도서 11권</h3>
            <p className={s.body}>
              구조 계산·도면으로 구성된 심사 도서입니다. 표지를 게시하며, 본문은
              요청 시 열람하실 수 있습니다.
            </p>
          </div>

          <div className={s.docGrid}>
            {REVIEW_DOCS.map((doc) => (
              <a
                key={doc.title}
                href={doc.image}
                target="_blank"
                rel="noreferrer"
                className={s.certCard}
              >
                <div className={s.certThumb}>
                  <Image
                    src={doc.image}
                    alt={doc.title}
                    fill
                    className={s.certImg}
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 280px"
                  />
                </div>
                <div className={s.docCardBody}>
                  <h4 className={s.docCardTitle}>{doc.title}</h4>
                  <p className={s.docCardMeta}>표지 게시 · 총 {doc.pages}p</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="license" className={`${s.section} ${s.sectionAlt}`}>
        <div className="container">
          <div className={s.twoCol}>
            <div className={s.visual}>
              <Image
                src="/images/tech-analysis.jpg"
                alt="350TON 크레인 와이어 로프 위빙 작업"
                fill
                className={s.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className={s.eyebrow}>People</p>
              <h2 className={`${s.headline} ${s.headlineNavy}`}>보유 자격 인력</h2>
              <p className={s.body}>{QUALIFICATIONS.desc}</p>

              <div className={s.infoGrid} style={{ gridTemplateColumns: "1fr" }}>
                {QUALIFICATIONS.groups.map((group) => (
                  <div key={group.field} className={s.infoItem}>
                    <p className={s.infoLabel}>{group.field}</p>
                    <p className={s.infoValue}>{group.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="safety" className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <div className={s.centerHeader}>
            <p className={s.eyebrow}>Safety</p>
            <h2 className={s.headline}>안전관리 체계</h2>
            <p className={s.body}>설치 전 평가부터 정기점검까지, 단계별 안전관리를 운영합니다.</p>
          </div>

          <div className={s.gridFour}>
            {SAFETY_STEPS.map((step) => (
              <article key={step.num} className={s.valueCard}>
                <p className={s.valueNum}>{step.num}</p>
                <h3 className={s.valueTitle}>{step.title}</h3>
                <p className={s.valueDesc}>{step.desc}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      <ContactBand />
    </>
  );
}
