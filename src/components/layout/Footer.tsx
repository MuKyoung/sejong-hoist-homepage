import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import s from "./Footer.module.css";

const LINKS = [
  {
    title: "회사소개",
    items: [
      { label: "인사말",    href: "/about" },
      { label: "오시는 길", href: "/about/location" },
    ],
  },
  {
    title: "제품소개",
    items: [
      { label: "Wire Hoist",            href: "/business/wire-hoist" },
      { label: "Chain Hoist",           href: "/business/chain-hoist" },
      { label: "Explosion-Proof Hoist", href: "/business/explosion-proof-hoist" },
      { label: "Crane",                 href: "/business/crane" },
      { label: "Hoist & Crane",         href: "/business/hoist-crane" },
    ],
  },
  {
    title: "시공사례",
    items: [
      { label: "전체 시공사례", href: "/portfolio" },
    ],
  },
  {
    title: "고객지원",
    items: [
      { label: "견적문의", href: "/support/inquiry" },
      { label: "자료실",   href: "/support/catalog" },
      { label: "공지사항", href: "/support/notice" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.top}>
          {/* 브랜드 */}
          <div className={s.brand}>
            <div className={s.logoWrap}>
              <Image src="/images/sejong-logo.png" alt="세종호이스트" width={130} height={34}
                style={{ width: "auto", height: "28px", objectFit: "contain" }}
              />
            </div>
            <p className={s.tagline}>
              Wire Hoist · Chain Hoist · Explosion-Proof Hoist<br />
              Crane 전문 제조기업.<br />
              대표이사 김승용
            </p>
            <div className={s.contact}>
              <div className={s.contactItem}>
                <Phone size={12} className={s.contactIcon} />
                <span>044-865-0801 / 010-7605-1510</span>
              </div>
              <div className={s.contactItem}>
                <Mail size={12} className={s.contactIcon} />
                <span>sj@sjhoist.com</span>
              </div>
              <div className={s.contactItem}>
                <MapPin size={12} className={s.contactIcon} />
                <span>세종특별자치시 부강면 시목부강로 314</span>
              </div>
            </div>
          </div>

          {/* 링크 컬럼 */}
          <div className={s.linkColumns}>
            {LINKS.map((col) => (
              <div key={col.title} className={s.col}>
                <p className={s.colTitle}>{col.title}</p>
                {col.items.map((item) => (
                  <Link key={item.href} href={item.href} className={s.colLink}>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 하단 */}
        <div className={s.bottom}>
          <p className={s.copy}>
            © 2024 (주)세종호이스트크레인. All rights reserved. | 사업자등록번호 142-88-01261 | FAX 044-865-0108
          </p>
          <div className={s.bottomLinks}>
            <Link href="/privacy" className={s.bottomLink}>개인정보처리방침</Link>
            <Link href="/terms"   className={s.bottomLink}>이용약관</Link>
            <Link href="/sitemap" className={s.bottomLink}>사이트맵</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
