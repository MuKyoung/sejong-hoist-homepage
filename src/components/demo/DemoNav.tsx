"use client";

/**
 * DemoNav : 4개 데모 공용 반응형 내비게이션
 * - 모바일: 햄버거 버튼 + 풀스크린 오버레이
 * - 태블릿/데스크톱: 수평 링크 + CTA 버튼
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface NavLink { label: string; href: string; }

interface DemoNavProps {
  /** "dark" = 투명 다크 (Demo 1·2), "light" = 크림 반투명 (Demo 3), "white" = 흰색 (Demo 4) */
  variant: "dark" | "light" | "white";
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  /** CTA 색상 (hex) */
  ctaColor?: string;
  /** 모바일 메뉴 배경 */
  mobileOverlayBg?: string;
}

const DEFAULTS: NavLink[] = [
  { label: "제품", href: "/business" },
  { label: "납품실적", href: "/portfolio" },
  { label: "회사소개", href: "/about" },
  { label: "문의", href: "/support/inquiry" },
];

const E = [0.22, 1, 0.36, 1] as never;

export default function DemoNav({
  variant,
  links = DEFAULTS,
  ctaLabel = "무료 상담",
  ctaHref = "/support/inquiry",
  ctaColor = "#f47c20",
  mobileOverlayBg,
}: DemoNavProps) {
  const [open, setOpen] = useState(false);

  /* 스타일 팔레트 */
  const isDark = variant === "dark";
  const isLight = variant === "light";
  const isWhite = variant === "white";

  const navBg = isDark
    ? "rgba(4,4,4,0.80)"
    : isLight
    ? "rgba(249,246,241,0.88)"
    : "rgba(255,255,255,1)";
  const navBorder = isDark
    ? "rgba(255,255,255,0.05)"
    : isLight
    ? "rgba(17,17,17,0.06)"
    : "rgba(15,23,42,0.08)";
  const logoFilter = isDark ? "brightness(0) invert(1)" : "none";
  const logoOpacity = isDark ? 0.6 : 0.65;
  const linkColor = isDark
    ? "rgba(255,255,255,0.35)"
    : isLight
    ? "rgba(17,17,17,0.38)"
    : "rgba(15,23,42,0.45)";
  const linkHover = isDark ? "#fff" : isLight ? "#000" : "#0f172a";
  const burgerColor = isDark ? "#ebebeb" : isLight ? "#111" : "#0f172a";

  const overlayBg = mobileOverlayBg ?? (isDark ? "rgba(4,4,4,0.97)" : isLight ? "rgba(22,18,12,0.97)" : "rgba(15,23,42,0.97)");

  return (
    <>
      {/* ── 내비게이션 바 ── */}
      {/* white(불투명) variant는 sticky — fixed는 긴 뷰포트(축소 보기)에서
          Chromium이 페이지 아래에 고스트 페인트하는 문제가 있음 */}
      <nav
        className={`${isWhite ? "sticky top-0 w-full" : "fixed top-0 inset-x-0"} z-50 flex items-center justify-between px-5 sm:px-8 md:px-12 h-14 md:h-16`}
        style={{
          background: navBg,
          // 완전 불투명(white)에는 blur 불필요 — body overflow clip과 만나
          // 고정 nav가 페이지 아래에 고스트 페인트되는 Chromium 버그 회피
          ...(isWhite
            ? {}
            : { backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }),
          borderBottom: `1px solid ${navBorder}`,
        }}
      >
        {/* 로고 */}
        <Link href="/demo" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/images/sejong-logo.png" alt="SEJONG"
            width={90} height={20}
            className="h-5 md:h-[22px] w-auto transition-opacity hover:opacity-100"
            style={{ filter: logoFilter, opacity: logoOpacity }}
          />
        </Link>

        {/* 데스크톱 링크 */}
        <div className="hidden md:flex items-center gap-0.5 text-[12px]" style={{ color: linkColor }}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="px-3.5 py-2 rounded transition-colors"
              style={{ color: linkColor }}
              onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
              onMouseLeave={e => (e.currentTarget.style.color = linkColor)}>
              {l.label}
            </a>
          ))}
        </div>

        {/* 우측: CTA + 햄버거 */}
        <div className="flex items-center gap-3">
          <a href={ctaHref}
            className="hidden sm:block text-[11px] font-bold px-4 py-2.5 tracking-wide hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ background: ctaColor, color: "#fff" }}>
            {ctaLabel}
          </a>

          {/* 햄버거 버튼 */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden relative w-9 h-9 flex flex-col justify-center items-end gap-[5px] p-1"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          >
            <motion.span
              className="block h-[2px] rounded-full"
              style={{ background: burgerColor, originX: "right" }}
              animate={{ width: open ? 20 : 20, rotate: open ? -45 : 0, y: open ? 7 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[2px] w-5 rounded-full"
              style={{ background: burgerColor }}
              animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-[2px] rounded-full"
              style={{ background: burgerColor, originX: "right" }}
              animate={{ width: open ? 20 : 14, rotate: open ? 45 : 0, y: open ? -7 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </nav>

      {/* ── 모바일 풀스크린 메뉴 ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: E }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: overlayBg, paddingTop: "3.5rem" }}
          >
            <nav className="flex flex-col px-7 pt-10 gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.label} href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, ease: E }}
                  className="font-black py-4 text-white border-b flex items-center justify-between group"
                  style={{ fontSize: "clamp(1.6rem,7vw,2.2rem)", letterSpacing: "-0.03em", borderColor: "rgba(255,255,255,0.08)" }}
                >
                  {l.label}
                  <span className="text-lg opacity-25 group-hover:opacity-70 group-hover:translate-x-1 transition-all">→</span>
                </motion.a>
              ))}
            </nav>

            {/* 모바일 CTA */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
              className="px-7 pt-8"
            >
              <a href={ctaHref} onClick={() => setOpen(false)}
                className="block text-center py-4 font-bold text-[14px] tracking-wide"
                style={{ background: ctaColor, color: "#fff" }}>
                {ctaLabel}
              </a>
            </motion.div>

            {/* 연락처 */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.38 }}
              className="px-7 pt-5"
            >
              <a href="tel:0448650801" className="text-[14px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                044-865-0801
              </a>
            </motion.div>

            {/* 데모 목록 링크 */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              className="absolute bottom-8 right-7"
            >
              <Link href="/demo" onClick={() => setOpen(false)}
                className="text-[11px] font-mono"
                style={{ color: "rgba(255,255,255,0.2)" }}>
                ← 데모 목록
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
