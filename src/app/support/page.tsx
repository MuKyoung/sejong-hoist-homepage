import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/subpage/PageHero";
import SubNav from "@/components/subpage/SubNav";
import ContactBand from "@/components/subpage/ContactBand";
import { COMPANY } from "@/data/site";
import s from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "고객지원 | (주)세종호이스트크레인",
  description: "공지사항, 견적 문의, A/S 안내. TEL 044-865-0801",
};

const SUPPORT_NAV = [
  { label: "고객지원", href: "/support" },
  { label: "공지사항", href: "/support/notice" },
  { label: "견적 문의", href: "/support/inquiry" },
];

const CARDS = [
  {
    title: "공지사항",
    desc: "납품 실적, 제품 소식, 회사 안내 등 최신 소식을 확인하세요.",
    href: "/support/notice",
    label: "공지사항 보기",
    external: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: "견적 문의",
    desc: "제품 견적, 기술 상담, 납품·시공 문의를 온라인으로 접수할 수 있습니다.",
    href: "/support/inquiry",
    label: "문의하기",
    external: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: "기존 홈페이지",
    desc: "제품 카탈로그 및 추가 자료는 기존 홈페이지에서 확인하실 수 있습니다.",
    href: "https://www.sjhoist.com/",
    label: "sjhoist.com",
    external: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="고객지원"
        desc="견적·기술 문의와 공지사항을 통해 빠르게 도와드립니다."
      />
      <SubNav items={SUPPORT_NAV} />

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <div className={s.centerHeader}>
            <p className={s.eyebrow}>Customer Support</p>
            <h2 className={s.headline}>무엇을 도와드릴까요?</h2>
          </div>

          <div className={s.supportGrid}>
            {CARDS.map((card) => (
              <article key={card.title} className={s.supportCard}>
                <div className={s.supportIcon}>{card.icon}</div>
                <h3 className={s.supportTitle}>{card.title}</h3>
                <p className={s.supportDesc}>{card.desc}</p>
                {card.external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.supportLink}
                  >
                    {card.label} ↗
                  </a>
                ) : (
                  <Link href={card.href} className={s.supportLink}>
                    {card.label} →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className="container">
          <div className={s.centerHeader}>
            <p className={s.eyebrow}>Contact</p>
            <h2 className={s.headline}>직접 연락하기</h2>
          </div>
          <div className={s.contactGrid}>
            <div>
              <p className={s.contactItemLabel}>대표전화</p>
              <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`} className={s.contactItemValue}>
                {COMPANY.tel}
              </a>
            </div>
            <div>
              <p className={s.contactItemLabel}>휴대전화</p>
              <a href={`tel:${COMPANY.mobile.replace(/-/g, "")}`} className={s.contactItemValue}>
                {COMPANY.mobile}
              </a>
            </div>
            <div>
              <p className={s.contactItemLabel}>이메일</p>
              <a href={`mailto:${COMPANY.email}`} className={s.contactItemValue}>
                {COMPANY.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
