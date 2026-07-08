import type { Metadata } from "next";
import { existsSync } from "fs";
import { join } from "path";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/subpage/PageHero";
import SubNav from "@/components/subpage/SubNav";
import ContactBand from "@/components/subpage/ContactBand";
import { COMPANY, GREETING } from "@/data/site";
import s from "@/styles/subpage.module.css";

// 대표 서명 이미지가 준비되면(public/images/ceo-sign.png) 자동 표시
const hasSign = existsSync(join(process.cwd(), "public", "images", "ceo-sign.png"));

export const metadata: Metadata = {
  title: "회사소개 | (주)세종호이스트크레인",
  description: "인사말과 기업개요로 운반하역기계 전문 제조기업 (주)세종호이스트크레인을 소개합니다.",
};

const ABOUT_NAV = [
  { label: "인사말", href: "/about" },
  { label: "연혁", href: "/about/history" },
  { label: "조직도", href: "/about/organization" },
  { label: "오시는 길", href: "/about/location" },
];

const VALUES = [
  {
    num: "01",
    title: "안전 최우선",
    desc: "모든 설비는 현장 안전 기준을 충족하도록 설계·제작합니다. 고객과 작업자의 안전이 최우선입니다.",
  },
  {
    num: "02",
    title: "기술 혁신",
    desc: "지속적인 기술 개발과 현장 피드백을 반영해 더 정밀하고 견고한 운반하역 설비를 만듭니다.",
  },
  {
    num: "03",
    title: "고객 신뢰",
    desc: "설계부터 납품·시공·A/S까지 투명한 소통과 책임감 있는 서비스로 신뢰를 쌓아갑니다.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="회사소개"
        desc="운반하역 현장의 안전과 품질을 책임지는 (주)세종호이스트크레인입니다."
      />
      <SubNav items={ABOUT_NAV} />

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <div className={s.greetWrap}>
            <p className={s.eyebrow}>CEO Greeting</p>
            <h2 className={s.greetHeadline}>
              {GREETING.headline[0]}
              <br />
              {GREETING.headline[1]}
            </h2>
            <p className={s.greetQuoteC}>“{GREETING.quote}”</p>

            <div className={s.greetBody}>
              <p className={s.greetLead}>{GREETING.paragraphs[0]}</p>
              <p className={s.body} style={{ marginTop: 20 }}>
                {GREETING.paragraphs[1]}
              </p>
              <p className={s.body}>{GREETING.paragraphs[2]}</p>
              <p className={s.body}>{GREETING.paragraphs[3]}</p>
            </div>

            <div className={s.greetSignBlock}>
              <p className={s.greetRole}>(주)세종호이스트크레인 대표이사</p>
              <div className={s.greetNameRow}>
                <p className={s.greetName}>김 승 용</p>
                {hasSign && (
                  <Image
                    src="/images/ceo-sign.png"
                    alt="대표이사 김승용 서명"
                    width={140}
                    height={56}
                    style={{ height: 46, width: "auto" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className="container">
          <div className={s.twoCol}>
            <div>
              <div className={s.visual}>
                <Image
                  src="/images/about-01.jpg"
                  alt="세종호이스트크레인 사옥 전경"
                  fill
                  className={s.image}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <p className={s.visualCaption}>세종호이스트크레인 사옥 전경</p>
            </div>
            <div>
              <p className={s.eyebrow}>Company</p>
              <h2 className={`${s.headline} ${s.headlineNavy}`}>기업개요</h2>
              <p className={s.body}>
                1999년 설립 이후 운반하역 설비 한길을 걸어온 크레인·호이스트
                전문 기업입니다.
              </p>
              <div className={s.infoGrid}>
                <div className={s.infoItem}>
                  <p className={s.infoLabel}>대표이사</p>
                  <p className={s.infoValue}>{COMPANY.ceo}</p>
                </div>
                <div className={s.infoItem}>
                  <p className={s.infoLabel}>업종</p>
                  <p className={s.infoValue}>호이스트·크레인 제조</p>
                </div>
                <div className={s.infoItem}>
                  <p className={s.infoLabel}>소재지</p>
                  <p className={s.infoValue}>{COMPANY.address}</p>
                </div>
                <div className={s.infoItem}>
                  <p className={s.infoLabel}>사업자번호</p>
                  <p className={s.infoValue}>{COMPANY.bizNo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <div className={s.centerHeader}>
            <p className={s.eyebrow}>Core Values</p>
            <h2 className={s.headline}>세종이 추구하는 가치</h2>
          </div>
          <div className={s.cardGrid}>
            {VALUES.map((v) => (
              <article key={v.num} className={s.valueCard}>
                <p className={s.valueNum}>{v.num}</p>
                <h3 className={s.valueTitle}>{v.title}</h3>
                <p className={s.valueDesc}>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className="container" style={{ textAlign: "center" }}>
          <p className={s.eyebrow}>Location</p>
          <h2 className={s.headline}>오시는 길</h2>
          <p className={s.body} style={{ maxWidth: 480, margin: "0 auto 24px" }}>
            {COMPANY.address}
          </p>
          <Link href="/about/location" className={s.ghostBtn}>
            상세 위치 보기
          </Link>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
