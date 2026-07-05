import type { Metadata } from "next";
import PageHero from "@/components/subpage/PageHero";
import SubNav from "@/components/subpage/SubNav";
import ContactBand from "@/components/subpage/ContactBand";
import { HISTORY } from "@/data/site";
import s from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "연혁 | (주)세종호이스트크레인",
  description: "창업부터 350TON급 시공 실적까지, 세종호이스트크레인이 걸어온 길입니다.",
};

const ABOUT_NAV = [
  { label: "인사말", href: "/about" },
  { label: "연혁", href: "/about/history" },
  { label: "조직도", href: "/about/organization" },
  { label: "오시는 길", href: "/about/location" },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="History"
        title="연혁"
        desc="운반하역 외길, 세종호이스트크레인이 걸어온 길입니다."
      />
      <SubNav items={ABOUT_NAV} />

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <div className={s.histList}>
            {HISTORY.map((group) => (
              <div key={group.year} className={s.histGroup}>
                <p className={s.histYear}>{group.year}</p>
                <ul className={s.histItems}>
                  {group.items.map((item) => (
                    <li key={item} className={s.histItem}>
                      {item}
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
