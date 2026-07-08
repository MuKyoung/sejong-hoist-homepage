import type { Metadata } from "next";
import PageHero from "@/components/subpage/PageHero";
import SubNav from "@/components/subpage/SubNav";
import ContactBand from "@/components/subpage/ContactBand";
import { COMPANY, ORG_UNITS } from "@/data/site";
import s from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "조직도 | (주)세종호이스트크레인",
  description: "설계·기술부터 생산·시공·A/S까지, 세종호이스트크레인의 조직 구성입니다.",
};

const ABOUT_NAV = [
  { label: "인사말", href: "/about" },
  { label: "연혁", href: "/about/history" },
  { label: "조직도", href: "/about/organization" },
  { label: "오시는 길", href: "/about/location" },
];

export default function OrganizationPage() {
  return (
    <>
      <PageHero
        eyebrow="Organization"
        title="조직도"
        desc="설계부터 A/S까지, 전 과정을 책임지는 조직 구성입니다."
      />
      <SubNav items={ABOUT_NAV} />

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <div className={s.orgTop}>
            <p className={s.orgTopTitle}>대표이사</p>
            <p className={s.orgTopSub}>{COMPANY.ceo}</p>
          </div>
          <div className={s.orgStem} aria-hidden />
          <div className={s.orgLv2}>총괄이사</div>
          <div className={s.orgStem} aria-hidden />
          <div className={s.orgLv3}>전무</div>
          <div className={s.orgStem} aria-hidden />

          <div className={s.orgBranch}>
            {ORG_UNITS.map((unit) => (
              <div key={unit.name} className={s.orgCol}>
                <div className={s.orgDeptHead}>
                  {unit.name}
                  <span className={s.orgDeptEn}>{unit.en}</span>
                </div>
                <ul className={s.orgDeptBody}>
                  {unit.teams.map((team) => (
                    <li key={team} className={s.orgTeam}>
                      {team}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
