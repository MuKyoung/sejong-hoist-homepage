import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/subpage/PageHero";
import SubNav from "@/components/subpage/SubNav";
import ContactBand from "@/components/subpage/ContactBand";
import { COMPANY } from "@/data/site";
import s from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "오시는 길 | (주)세종호이스트크레인",
  description: `${COMPANY.address}. TEL ${COMPANY.tel}`,
};

const ABOUT_NAV = [
  { label: "기업개요", href: "/about" },
  { label: "오시는 길", href: "/about/location" },
];

export default function LocationPage() {
  const mapSrc = `https://map.kakao.com/?q=${COMPANY.mapQuery}`;

  return (
    <>
      <PageHero
        eyebrow="Location"
        title="오시는 길"
        desc="세종호이스트크레인 본사로 방문 전 연락 주시면 안내해 드립니다."
      />
      <SubNav items={ABOUT_NAV} />

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <div className={s.twoCol}>
            <div>
              <p className={s.eyebrow}>Address</p>
              <h2 className={`${s.headline} ${s.headlineNavy}`}>{COMPANY.name}</h2>

              <ul className={s.detailList}>
                <li className={s.detailItem}>
                  <span className={s.detailLabel}>주소</span>
                  <span className={s.detailValue}>{COMPANY.address}</span>
                </li>
                <li className={s.detailItem}>
                  <span className={s.detailLabel}>대표전화</span>
                  <span className={s.detailValue}>
                    <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`}>{COMPANY.tel}</a>
                  </span>
                </li>
                <li className={s.detailItem}>
                  <span className={s.detailLabel}>휴대전화</span>
                  <span className={s.detailValue}>
                    <a href={`tel:${COMPANY.mobile.replace(/-/g, "")}`}>{COMPANY.mobile}</a>
                  </span>
                </li>
                <li className={s.detailItem}>
                  <span className={s.detailLabel}>팩스</span>
                  <span className={s.detailValue}>{COMPANY.fax}</span>
                </li>
                <li className={s.detailItem}>
                  <span className={s.detailLabel}>이메일</span>
                  <span className={s.detailValue}>
                    <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                  </span>
                </li>
              </ul>

              <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
                <a
                  href={mapSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.primaryBtn}
                >
                  카카오맵에서 보기
                </a>
                <Link href="/support/inquiry" className={s.ghostBtn}>
                  방문 전 문의하기
                </Link>
              </div>
            </div>

            <div>
              <iframe
                title="세종호이스트크레인 위치"
                className={s.mapFrame}
                src={`https://www.google.com/maps?q=${COMPANY.mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
