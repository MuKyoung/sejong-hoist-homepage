import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/subpage/PageHero";
import SubNav from "@/components/subpage/SubNav";
import ContactBand from "@/components/subpage/ContactBand";
import { COMPANY } from "@/data/site";
import s from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "회사소개 | (주)세종호이스트크레인",
  description: "Wire Hoist·Chain Hoist·Crane 전문 제조기업 (주)세종호이스트크레인을 소개합니다.",
};

const ABOUT_NAV = [
  { label: "기업개요", href: "/about" },
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
          <div className={s.twoCol}>
            <div>
              <p className={s.eyebrow}>Company Overview</p>
              <h2 className={`${s.headline} ${s.headlineNavy}`}>
                현장의 하중과 안전을
                <br />
                설계와 제작으로 풀어냅니다
              </h2>
              <p className={s.body}>
                (주)세종호이스트크레인은 Wire Hoist, Chain Hoist, Explosion-Proof Hoist,
                Crane 등 운반하역 기계를 전문으로 제조·시공하는 기업입니다.
              </p>
              <p className={s.body}>
                반도체, 자동차, 철강, 중공업, 공공 시설 등 다양한 산업 현장에
                맞춤형 설비를 납품해 왔으며, 최대 350TON급 그라브 갠트리크레인 시공
                실적을 보유하고 있습니다.
              </p>
              <p className={s.body}>
                설계·제작·설치·A/S까지 원스톱으로 대응하며, 현장 중심의 기술력으로
                고객의 생산성과 안전을 함께 높입니다.
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

            <div className={s.visual} style={{ marginBottom: 40 }}>
              <Image
                src="/images/sejong_2.png"
                alt="세종호이스트크레인 시공 현장"
                fill
                className={s.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className={s.statCard}>
                <p className={s.statNum}>350T</p>
                <p className={s.statLabel}>최대 시공 하중<br />그라브 갠트리크레인</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionAlt}`}>
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

      <section className={`${s.section} ${s.sectionWhite}`}>
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
