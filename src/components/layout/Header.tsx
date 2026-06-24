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
      { label: "인사말",    href: "/about" },
      { label: "오시는 길", href: "/about/location" },
    ]
  },
  { label: "제품소개", href: "/business",
    sub: [
      { label: "Wire Hoist",           href: "/business/wire-hoist" },
      { label: "Chain Hoist",          href: "/business/chain-hoist" },
      { label: "Explosion-Proof Hoist", href: "/business/explosion-proof-hoist" },
      { label: "Crane",                href: "/business/crane" },
      { label: "Hoist & Crane",        href: "/business/hoist-crane" },
    ]
  },
  { label: "시공사례", href: "/portfolio", sub: [] },
  { label: "견적문의", href: "/support/inquiry", sub: [] },
  { label: "자료실",   href: "/support/catalog", sub: [] },
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
          <span className={s.utilLeft}>세종특별자치시 부강면 시목부강로 314 | 사업자등록번호 142-88-01261</span>
          <div className={s.utilRight}>
            <a href="tel:0448650801" className={s.utilLink}>
              <Phone size={11} /> 044-865-0801
            </a>
            <a href="mailto:sj@sjhoist.com" className={s.utilLink}>
              <ExternalLink size={11} /> sj@sjhoist.com
            </a>
            <Link href="/support/catalog" className={s.utilLink}>
              자료실
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
            <a href="tel:0448650801" className={s.phoneLinkDesktop}>
              <Phone size={14} /> 044-865-0801
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
                <a href="tel:0448650801" className={s.mobilePhone}>
                  <Phone size={15} /> 044-865-0801
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
