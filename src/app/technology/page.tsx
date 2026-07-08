import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/subpage/PageHero";
import ContactBand from "@/components/subpage/ContactBand";
import { CERTIFICATIONS, TECH_CAPABILITY, SAFETY_STEPS } from "@/data/site";
import s from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "기술·인증 | (주)세종호이스트크레인",
  description: "보유 인증, 구조해석 역량, 안전관리 체계 — 세종호이스트크레인의 기술 기반입니다.",
};

function CertIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5 7.5 21l4.5-2.5L16.5 21 15 13.5" />
    </svg>
  );
}

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology & Certification"
        title="기술·인증"
        desc="구조해석 기반의 설계 역량과 안전관리 체계로 신뢰를 증명합니다."
      />

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <div className={s.centerHeader}>
            <p className={s.eyebrow}>Certification</p>
            <h2 className={s.headline}>보유 인증</h2>
            <p className={s.body}>
              LS ELECTRIC 부산공장 크레인 13대 전수 안전인증 합격
              (적합률 100%, 부적합 0건) — 안전인증서·서면심사도서 원본을 보유하고 있습니다.
            </p>
          </div>

          <div className={s.supportGrid}>
            {CERTIFICATIONS.map((cert) => (
              <article key={cert.title} className={s.supportCard}>
                <div className={s.supportIcon}>
                  <CertIcon />
                </div>
                <h3 className={s.supportTitle}>{cert.title}</h3>
                <p className={s.supportDesc}>{cert.issuer}</p>
                <span className={s.portfolioCat}>인증서 원본 보유</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionAlt}`}>
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
              <p className={s.eyebrow}>Engineering</p>
              <h2 className={`${s.headline} ${s.headlineNavy}`}>구조해석 역량</h2>
              <p className={s.body}>{TECH_CAPABILITY.desc}</p>

              <div className={s.infoGrid}>
                {TECH_CAPABILITY.points.map((point) => (
                  <div key={point.label} className={s.infoItem}>
                    <p className={s.infoLabel}>{point.label}</p>
                    <p className={s.infoValue}>{point.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionWhite}`}>
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

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/support/inquiry" className={s.primaryBtn}>
              기술 상담 문의
            </Link>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
