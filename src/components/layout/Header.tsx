"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import s from "./Header.module.css";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

const NAV: NavItem[] = [
  {
    label: "회사소개",
    href: "/about",
    children: [
      { label: "인사말", href: "/about" },
      { label: "연혁", href: "/about/history" },
      { label: "조직도", href: "/about/organization" },
      { label: "오시는 길", href: "/about/location" },
    ],
  },
  {
    label: "사업영역",
    href: "/business",
    children: [
      { label: "호이스트 크레인", href: "/business#hoist" },
      { label: "그랩·갠트리 크레인", href: "/business#gantry" },
      { label: "유지보수·이전설치", href: "/business#maintenance" },
      { label: "철구조물 제작", href: "/business#steel" },
      { label: "제품 라인업", href: "/business" },
    ],
  },
  { label: "시공사례", href: "/portfolio" },
  {
    label: "기술·인증",
    href: "/technology",
    children: [
      { label: "보유 인증", href: "/technology#certs" },
      { label: "구조해석 역량", href: "/technology#analysis" },
      { label: "안전관리 체계", href: "/technology#safety" },
    ],
  },
  {
    label: "견적·문의",
    href: "/support/inquiry",
    children: [
      { label: "견적 문의", href: "/support/inquiry" },
      { label: "공지사항", href: "/support/notice" },
      { label: "고객지원", href: "/support" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Link href="/" className={s.logoLink} aria-label="세종호이스트크레인 홈">
          <Image
            src="/images/sejong-logo.png"
            alt="세종호이스트크레인"
            width={180}
            height={44}
            style={{ width: "auto", height: "28px", objectFit: "contain" }}
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
                {item.label}
              </Link>
              {item.children && (
                <div className={s.dropdown}>
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className={s.dropLink}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className={s.right}>
          <a href="tel:0448650801" className={s.phone}>044-865-0801</a>
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
                  {item.label}
                </Link>
              ))}
              <Link
                href="/support/inquiry"
                className={s.mobileCta}
                onClick={() => setOpen(false)}
              >
                견적 문의
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
