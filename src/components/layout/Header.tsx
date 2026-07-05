"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import s from "./Header.module.css";

const NAV = [
  { label: "회사소개", href: "/about" },
  { label: "사업영역", href: "/business" },
  { label: "시공사례", href: "/portfolio" },
  { label: "기술·인증", href: "/technology" },
  { label: "견적·문의", href: "/support/inquiry" },
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
            <Link
              key={item.href}
              href={item.href}
              className={`${s.navLink} ${isActive(item.href) ? s.navLinkActive : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={s.right}>
          <a href="tel:0448650801" className={s.phone}>044-865-0801</a>
          <Link href="/support/inquiry" className={s.cta}>견적 문의</Link>
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
