import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import s from "./Footer.module.css";

const LINKS = [
  {
    title: "회사소개",
    items: [
      { label: "회사개요",  href: "/about" },
      { label: "연혁",      href: "/about/history" },
      { label: "조직도",    href: "/about/organization" },
      { label: "인증현황",  href: "/about/certifications" },
    ],
  },
  {
    title: "사업영역",
    items: [
      { label: "천장크레인",   href: "/business/overhead-crane" },
      { label: "갠트리크레인", href: "/business/gantry-crane" },
      { label: "호이스트",     href: "/business/hoist" },
      { label: "특수크레인",   href: "/business/special-crane" },
    ],
  },
  {
    title: "납품실적",
    items: [
      { label: "전체 포트폴리오", href: "/portfolio" },
      { label: "산업별 사례",     href: "/portfolio#industry" },
    ],
  },
  {
    title: "고객지원",
    items: [
      { label: "공지사항",   href: "/support/notice" },
      { label: "묻고답하기", href: "/support/faq" },
      { label: "견적문의",   href: "/support/inquiry" },
      { label: "카탈로그",   href: "/support/catalog" },
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
              1984년부터 40년.<br />
              천장크레인·갠트리크레인·호이스트<br />
              전문 제조 기업.
            </p>
            <div className={s.contact}>
              <div className={s.contactItem}>
                <Phone size={12} className={s.contactIcon} />
                <span>031-777-1234 (평일 08:30–17:30)</span>
              </div>
              <div className={s.contactItem}>
                <Mail size={12} className={s.contactIcon} />
                <span>info@sejong-hoist.co.kr</span>
              </div>
              <div className={s.contactItem}>
                <MapPin size={12} className={s.contactIcon} />
                <span>경기도 화성시 삼성1로 1</span>
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
            © 2024 세종호이스트 주식회사. All rights reserved. | 사업자등록번호 123-45-67890
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
