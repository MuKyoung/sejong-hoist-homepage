import Link from "next/link";
import { COMPANY } from "@/data/site";
import s from "./Footer.module.css";

type Locale = "ko" | "en";

const UTIL_LINKS = [
  { label: "개인정보처리방침", labelEn: "Privacy Policy", href: "/privacy" },
  { label: "이용약관", labelEn: "Terms of Use", href: "/terms" },
];

const COLUMNS = [
  {
    title: "회사소개",
    titleEn: "About",
    links: [
      { label: "인사말", labelEn: "Greeting", href: "/about" },
      { label: "연혁", labelEn: "History", href: "/about/history" },
      { label: "조직도", labelEn: "Organization", href: "/about/organization" },
      { label: "오시는 길", labelEn: "Location", href: "/about/location" },
      { label: "기존 홈페이지", labelEn: "Legacy Website", href: "https://www.sjhoist.com/" },
    ],
  },
  {
    title: "사업영역",
    titleEn: "Business",
    links: [
      { label: "오버헤드 크레인", labelEn: "Overhead Crane", href: "/business#overhead" },
      { label: "겐트리 크레인", labelEn: "Gantry Crane", href: "/business#gantry" },
      { label: "모노레일", labelEn: "Monorail", href: "/business#monorail" },
      { label: "서스펜션·지브·ETC", labelEn: "Suspension · Jib · ETC", href: "/business#suspension" },
      { label: "제품 라인업", labelEn: "Products", href: "/business#products" },
    ],
  },
  {
    title: "시공사례·기술",
    titleEn: "Projects & Tech",
    links: [
      { label: "전체 시공사례", labelEn: "All Projects", href: "/portfolio" },
      { label: "기술·인증", labelEn: "Technology", href: "/technology" },
    ],
  },
  {
    title: "고객지원",
    titleEn: "Support",
    links: [
      { label: "고객지원", labelEn: "Customer Support", href: "/support" },
      { label: "견적·문의", labelEn: "Request a Quote", href: "/support/inquiry" },
      { label: "공지사항", labelEn: "Notice", href: "/support/notice" },
      { label: "이메일 문의", labelEn: "Email Us", href: "mailto:sj@sjhoist.com" },
    ],
  },
];

function ColLink({ label, href }: { label: string; href: string }) {
  if (href.startsWith("/")) {
    return <Link href={href} className={s.colLink}>{label}</Link>;
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={s.colLink}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

export default function Footer({ locale = "ko" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.top}>
          <div className={s.brand}>
            <p className={s.wordmark}>{en ? "Sejong Hoist Crane Co., Ltd." : COMPANY.name}</p>
            <p className={s.wordmarkEn}>SEJONG HOIST CRANE</p>
            <div className={s.utils}>
              {UTIL_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={i === 0 ? s.utilPrimary : s.utilLink}
                >
                  {en ? link.labelEn : link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={s.columns}>
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className={s.colTitle}>{en ? col.titleEn : col.title}</p>
                {col.links.map((link) => (
                  <ColLink
                    key={link.href}
                    label={en ? link.labelEn : link.label}
                    href={link.href}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={s.meta}>
          {en ? (
            <p>
              314 Simokbugang-ro, Bugang-myeon, Sejong-si, Korea
              <br />
              CEO Kim Seung-yong, Kim Ha-min | Business Reg. No. {COMPANY.bizNo}
              <br />
              TEL{" "}
              <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`} className={s.metaLink}>
                {COMPANY.tel}
              </a>{" "}
              | FAX {COMPANY.fax} | E-mail{" "}
              <a href={`mailto:${COMPANY.email}`} className={s.metaLink}>
                {COMPANY.email}
              </a>
            </p>
          ) : (
            <p>
              {COMPANY.address}
              <br />
              대표이사 {COMPANY.ceo} | 사업자등록번호 {COMPANY.bizNo}
              <br />
              TEL{" "}
              <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`} className={s.metaLink}>
                {COMPANY.tel}
              </a>{" "}
              | FAX {COMPANY.fax} | E-mail{" "}
              <a href={`mailto:${COMPANY.email}`} className={s.metaLink}>
                {COMPANY.email}
              </a>
            </p>
          )}
        </div>

        <div className={s.bottom}>
          <p className={s.copy}>
            Copyright (c) {en ? "Sejong Hoist Crane Co., Ltd." : COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
