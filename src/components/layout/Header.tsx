"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone, ExternalLink } from "lucide-react";
import s from "./Header.module.css";

const NAV = [
  { label: "회사소개", href: "/about",
    sub: [
      { label: "회사개요", href: "/about" },
      { label: "연혁",     href: "/about/history" },
      { label: "조직도",   href: "/about/organization" },
      { label: "인증현황", href: "/about/certifications" },
    ]
  },
  { label: "사업영역", href: "/business",
    sub: [
      { label: "천장크레인",  href: "/business/overhead-crane" },
      { label: "갠트리크레인", href: "/business/gantry-crane" },
      { label: "호이스트",    href: "/business/hoist" },
      { label: "특수크레인",  href: "/business/special-crane" },
    ]
  },
  { label: "납품실적", href: "/portfolio", sub: [] },
  { label: "고객지원", href: "/support",
    sub: [
      { label: "공지사항", href: "/support/notice" },
      { label: "묻고답하기", href: "/support/faq" },
      { label: "견적문의",  href: "/support/inquiry" },
      { label: "카탈로그",  href: "/support/catalog" },
    ]
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`${s.header} ${scrolled ? s.headerScrolled : ""}`}>
      {/* 유틸리티 바 */}
      <div className={s.utilBar}>
        <div className={s.utilInner}>
          <span className={s.utilLeft}>경기도 화성시 삼성1로 1 | 사업자등록번호 123-45-67890</span>
          <div className={s.utilRight}>
            <a href="tel:0317771234" className={s.utilLink}>
              <Phone size={11} /> 031-777-1234
            </a>
            <a href="mailto:info@sejong-hoist.co.kr" className={s.utilLink}>
              <ExternalLink size={11} /> 이메일 문의
            </a>
            <Link href="/support/catalog" className={s.utilLink}>
              카탈로그 다운로드
            </Link>
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className={s.nav} aria-label="주요 메뉴">
        <div className={s.navInner}>
          {/* 로고 */}
          <Link href="/" className={s.logoLink} aria-label="세종호이스트 홈">
            <Image src="/images/sejong-logo.png" alt="세종호이스트" width={160} height={40}
              style={{ width: "auto", height: "36px", objectFit: "contain" }}
              priority
            />
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className={s.desktopMenu}>
            {NAV.map((item) => (
              <div key={item.href} className={s.menuItem}>
                {item.sub.length > 0 ? (
                  <>
                    <button className={s.menuBtn}>
                      {item.label}
                      <ChevronDown size={13} className={s.chevron} />
                    </button>
                    <div className={s.dropdown}>
                      {item.sub.map((sub) => (
                        <Link key={sub.href} href={sub.href} className={s.dropItem}>{sub.label}</Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className={s.menuBtn} style={{ textDecoration: "none" }}>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* 우측 액션 */}
          <div className={s.actions}>
            <a href="tel:0317771234" className={s.phoneLinkDesktop}>
              <Phone size={14} /> 031-777-1234
            </a>
            <Link href="/support/inquiry" className={s.inquiryBtn}>
              견적 문의
            </Link>
            {/* 햄버거 */}
            <button
              className={s.hamburger}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={mobileOpen}
            >
              <span className={`${s.bar} ${mobileOpen ? s.barTopOpen : s.barTop}`} />
              <span className={`${s.bar} ${mobileOpen ? s.barMidOpen : s.barMid}`} />
              <span className={`${s.bar} ${mobileOpen ? s.barBotOpen : s.barBot}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={s.mobileMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={s.mobileInner}>
              {NAV.map((item) => (
                <div key={item.href} className={s.mobileGroup}>
                  <p className={s.mobileGroupLabel}>{item.label}</p>
                  {item.sub.length > 0 ? (
                    item.sub.map((sub) => (
                      <Link key={sub.href} href={sub.href} className={s.mobileLink}
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))
                  ) : (
                    <Link href={item.href} className={s.mobileLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className={s.mobileActions}>
                <a href="tel:0317771234" className={s.mobilePhone}>
                  <Phone size={15} /> 031-777-1234
                </a>
                <Link href="/support/inquiry" className={s.mobileInquiry}
                  onClick={() => setMobileOpen(false)}
                >
                  견적 문의하기
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
