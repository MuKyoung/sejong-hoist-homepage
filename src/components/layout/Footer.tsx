import Link from "next/link";
import s from "./Footer.module.css";

const COLUMNS = [
  {
    title: "회사소개",
    links: [
      { label: "인사말", href: "/about" },
      { label: "오시는 길", href: "/about/location" },
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
      { label: "견적문의", href: "/support/inquiry" },
      { label: "자료실", href: "/support/catalog" },
      { label: "공지사항", href: "/support/notice" },
    ],
  },
  {
    title: "문의",
    links: [
      { label: "견적 문의", href: "/support/inquiry" },
      { label: "이메일 문의", href: "mailto:sj@sjhoist.com" },
    ],
  },
  {
    title: "관련 링크",
    links: [
      { label: "기존 홈페이지", href: "https://www.sjhoist.com/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.columns}>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className={s.colTitle}>{col.title}</p>
              {col.links.map((link) => (
                <Link key={link.href} href={link.href} className={s.colLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className={s.company}>
          <p className={s.companyName}>(주)세종호이스트크레인</p>
          <p className={s.companyMeta}>
            사업자등록번호 142-88-01261 | 대표이사 김승용<br />
            세종특별자치시 부강면 시목부강로 314
          </p>

          <div className={s.infoGrid}>
            <div className={s.infoItem}>
              <p className={s.infoLabel}>이메일</p>
              <a href="mailto:sj@sjhoist.com" className={s.infoValue}>sj@sjhoist.com</a>
            </div>
            <div className={s.infoItem}>
              <p className={s.infoLabel}>고객센터</p>
              <a href="tel:0448650801" className={s.infoValue}>044-865-0801</a>
            </div>
            <div className={s.infoItem}>
              <p className={s.infoLabel}>팩스</p>
              <p className={s.infoValue}>044-865-0108</p>
            </div>
          </div>
        </div>

        <div className={s.bottom}>
          <p className={s.copy}>
            Copyright (c) (주)세종호이스트크레인. All rights reserved.
          </p>
          <div className={s.legal}>
            <Link href="/privacy" className={s.legalLink}>개인정보처리방침</Link>
            <Link href="/terms" className={s.legalLink}>이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
