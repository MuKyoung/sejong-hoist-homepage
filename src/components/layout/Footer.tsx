import Link from "next/link";
import { COMPANY } from "@/data/site";
import s from "./Footer.module.css";

const UTIL_LINKS = [
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
];

const COLUMNS = [
  {
    title: "회사소개",
    links: [
      { label: "인사말", href: "/about" },
      { label: "오시는 길", href: "/about/location" },
      { label: "기존 홈페이지", href: "https://www.sjhoist.com/" },
    ],
  },
  {
    title: "제품소개",
    links: [
      { label: "Wire Hoist", href: "/business/wire-hoist" },
      { label: "Chain Hoist", href: "/business/chain-hoist" },
      { label: "Explosion-Proof", href: "/business/explosion-proof-hoist" },
      { label: "Crane", href: "/business/crane" },
      { label: "Hoist & Crane", href: "/business/hoist-crane" },
    ],
  },
  {
    title: "시공사례",
    links: [{ label: "전체 시공사례", href: "/portfolio" }],
  },
  {
    title: "고객지원",
    links: [
      { label: "고객지원", href: "/support" },
      { label: "견적문의", href: "/support/inquiry" },
      { label: "공지사항", href: "/support/notice" },
      { label: "이메일 문의", href: "mailto:sj@sjhoist.com" },
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

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.top}>
          <div className={s.brand}>
            <p className={s.wordmark}>{COMPANY.name}</p>
            <p className={s.wordmarkEn}>SEJONG HOIST CRANE</p>
            <div className={s.utils}>
              {UTIL_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={i === 0 ? s.utilPrimary : s.utilLink}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={s.columns}>
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className={s.colTitle}>{col.title}</p>
                {col.links.map((link) => (
                  <ColLink key={link.href} label={link.label} href={link.href} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={s.meta}>
          <p>
            {COMPANY.address}
            <br />
            대표이사 {COMPANY.ceo} | 사업자등록번호 {COMPANY.bizNo}
            <br />
            TEL {COMPANY.tel} | FAX {COMPANY.fax} | E-mail {COMPANY.email}
          </p>
        </div>

        <div className={s.bottom}>
          <p className={s.copy}>
            Copyright (c) {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
