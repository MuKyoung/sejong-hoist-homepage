"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import s from "./Header.module.css";

type NavChild = { label: string; labelEn: string; href: string };
type NavItem = { label: string; labelEn: string; href: string; children?: NavChild[] };

const NAV: NavItem[] = [
  {
    label: "회사소개",
    labelEn: "About",
    href: "/about",
    children: [
      { label: "인사말", labelEn: "Greeting", href: "/about" },
      { label: "연혁", labelEn: "History", href: "/about/history" },
      { label: "조직도", labelEn: "Organization", href: "/about/organization" },
      { label: "오시는 길", labelEn: "Location", href: "/about/location" },
    ],
  },
  {
    label: "사업영역",
    labelEn: "Business",
    href: "/business",
    children: [
      { label: "오버헤드 크레인", labelEn: "Overhead Crane", href: "/business#overhead" },
      { label: "겐트리 크레인", labelEn: "Gantry Crane", href: "/business#gantry" },
      { label: "모노레일", labelEn: "Monorail", href: "/business#monorail" },
      { label: "서스펜션 크레인", labelEn: "Suspension Crane", href: "/business#suspension" },
      { label: "지브 크레인", labelEn: "Jib Crane", href: "/business#jib" },
      { label: "ETC", labelEn: "Grab & Others", href: "/business#etc" },
      { label: "제품 라인업", labelEn: "Products", href: "/business#products" },
    ],
  },
  { label: "시공사례", labelEn: "Projects", href: "/portfolio" },
  {
    label: "기술·인증",
    labelEn: "Technology",
    href: "/technology",
    children: [
      { label: "보유 인증", labelEn: "Certifications", href: "/technology#certs" },
      { label: "보유 자격 인력", labelEn: "Qualified People", href: "/technology#license" },
      { label: "안전관리 체계", labelEn: "Safety", href: "/technology#safety" },
    ],
  },
  {
    label: "견적·문의",
    labelEn: "Contact",
    href: "/support/inquiry",
    children: [
      { label: "견적 문의", labelEn: "Request a Quote", href: "/support/inquiry" },
      { label: "공지사항", labelEn: "Notice", href: "/support/notice" },
      { label: "고객지원", labelEn: "Support", href: "/support" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isEn = pathname === "/en" || pathname?.startsWith("/en/");

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Link href={isEn ? "/en" : "/"} className={s.logoLink} aria-label="세종호이스트크레인 홈">
          <Image
            src="/images/sejong-logo.png"
            alt="세종호이스트크레인"
            width={180}
            height={44}
            style={{ width: "auto", height: "36px", objectFit: "contain" }}
            priority
          />
        </Link>

        <nav className={s.nav} aria-label="주요 메뉴">
          {NAV.map((item) => (
            <div
              key={item.href}
              className={`${s.navItem} ${isActive(item.href) ? s.navItemActive : ""}`}
            >
              <Link
                href={item.href}
                className={`${s.navLink} ${isActive(item.href) ? s.navLinkActive : ""}`}
              >
                {isEn ? item.labelEn : item.label}
              </Link>
              {item.children && (
                <div className={s.dropdown}>
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className={s.dropLink}>
                      {isEn ? child.labelEn : child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className={s.right}>
          <div className={`${s.navItem} ${s.langItem}`}>
            <button type="button" className={s.langBtn} aria-haspopup="true">
              {isEn ? "ENG" : "KOR"}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={`${s.dropdown} ${s.langDropdown}`}>
              <Link href="/" className={s.dropLink}>한국어</Link>
              <Link href="/en" className={s.dropLink}>English</Link>
            </div>
          </div>
          <div className={s.phones}>
            <a href="tel:0448650801" className={s.phone}>
              <span className={s.phoneLabel}>{isEn ? "Tel" : "대표"}</span>044-865-0801
            </a>
            <a href="tel:01076051510" className={s.phone}>
              <span className={s.phoneLabel}>{isEn ? "Mobile" : "모바일"}</span>010-7605-1510
            </a>
          </div>
          <button
            type="button"
            className={s.menuBtn}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${s.menuBar} ${s.menuBarTop} ${open ? s.menuBarTopOpen : ""}`} />
            <span className={`${s.menuBar} ${s.menuBarMid} ${open ? s.menuBarMidOpen : ""}`} />
            <span className={`${s.menuBar} ${s.menuBarBot} ${open ? s.menuBarBotOpen : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={s.mobilePanel}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.2, 0.6, 0.25, 1] }}
          >
            <div className={s.mobileInner}>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={s.mobileLink}
                  onClick={() => setOpen(false)}
                >
                  {isEn ? item.labelEn : item.label}
                </Link>
              ))}
              <div className={s.mobileLang}>
                <Link href="/" className={s.mobileLangLink} onClick={() => setOpen(false)}>
                  한국어
                </Link>
                <Link href="/en" className={s.mobileLangLink} onClick={() => setOpen(false)}>
                  English
                </Link>
              </div>
              <div className={s.mobileLang}>
                <a href="tel:0448650801" className={s.mobileLangLink}>
                  {isEn ? "Tel" : "대표"} 044-865-0801
                </a>
                <a href="tel:01076051510" className={s.mobileLangLink}>
                  {isEn ? "Mobile" : "모바일"} 010-7605-1510
                </a>
              </div>
              <Link
                href="/support/inquiry"
                className={s.mobileCta}
                onClick={() => setOpen(false)}
              >
                {isEn ? "Request a Quote" : "견적 문의"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
