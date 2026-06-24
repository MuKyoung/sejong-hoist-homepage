"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV = [
  {
    label: "회사소개",
    href: "/about",
    cols: [
      {
        title: "기업정보",
        items: [
          { label: "기업개요", href: "/about" },
          { label: "CEO 인사말", href: "/about/ceo" },
          { label: "연혁", href: "/about/history" },
          { label: "찾아오시는 길", href: "/about/location" },
        ],
      },
    ],
  },
  {
    label: "사업영역",
    href: "/business",
    cols: [
      {
        title: "크레인",
        items: [
          { label: "천장크레인", href: "/business/overhead-crane" },
          { label: "갠트리크레인", href: "/business/gantry-crane" },
        ],
      },
      {
        title: "호이스트 & 특수",
        items: [
          { label: "호이스트", href: "/business/hoist" },
          { label: "특수크레인", href: "/business/special-crane" },
        ],
      },
    ],
  },
  {
    label: "납품실적",
    href: "/portfolio",
    cols: [],
  },
  {
    label: "고객지원",
    href: "/support",
    cols: [
      {
        title: "고객지원",
        items: [
          { label: "공지사항", href: "/support/notice" },
          { label: "온라인 문의", href: "/support/inquiry" },
          { label: "AS 시스템 ↗", href: "https://sejong-hoist.vercel.app", external: true },
        ],
      },
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [activeIdx, setActiveIdx]   = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExp, setMobileExp]   = useState<number | null>(null);
  const leaveTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enter = (i: number) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveIdx(i);
  };
  const leave = () => {
    leaveTimer.current = setTimeout(() => setActiveIdx(null), 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_#e2e8f0,0_4px_24px_-4px_rgba(0,0,0,0.08)]" : "shadow-[0_1px_0_0_#e2e8f0]"
      }`}
    >
      {/* ── 상단 유틸리티 바 ── */}
      <div className="hidden lg:block border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-10 xl:px-20">
          <div className="flex items-center justify-end h-9 gap-6">
            <a
              href="tel:0317771234"
              className="text-[11px] text-slate-500 hover:text-orange-500 transition-colors flex items-center gap-1.5"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.94 5.94l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              031-777-1234
            </a>
            <a
              href="mailto:info@sejong-hoist.com"
              className="text-[11px] text-slate-500 hover:text-orange-500 transition-colors"
            >
              info@sejong-hoist.com
            </a>
            <a
              href="https://sejong-hoist.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-500 hover:text-orange-500 transition-colors flex items-center gap-1"
            >
              AS 시스템
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── 메인 네비게이션 바 ── */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20">
        <div className="flex items-center h-16 lg:h-[68px] gap-8 lg:gap-12">

          {/* 로고 */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/sejong-logo.png"
              alt="세종호이스트크레인"
              width={148}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden lg:flex items-center flex-1">
            {NAV.map((item, i) => (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => enter(i)}
                onMouseLeave={leave}
              >
                <Link
                  href={item.href}
                  className={`block px-4 py-6 text-[13.5px] font-semibold tracking-[-0.01em] transition-colors relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:transition-transform after:duration-200 after:origin-left ${
                    activeIdx === i
                      ? "text-orange-500 after:bg-orange-500 after:scale-x-100"
                      : "text-slate-700 hover:text-slate-900 after:bg-orange-500 after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* 우측 CTA */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <Link
              href="/support/inquiry"
              className="inline-flex items-center gap-2 bg-[#0B1E4E] hover:bg-[#162f72] text-white text-[12.5px] font-bold tracking-wide px-5 py-2.5 transition-colors duration-200"
            >
              무료 상담 문의
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>

          {/* 모바일 햄버거 */}
          <button
            className="lg:hidden ml-auto flex flex-col justify-center gap-[5px] w-10 h-10 -mr-2"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="메뉴 열기/닫기"
            aria-expanded={mobileOpen}
          >
            <span className={`block w-5 h-[1.5px] bg-slate-800 transition-all duration-250 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-slate-800 transition-all duration-250 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-slate-800 transition-all duration-250 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── 메가 드롭다운 ── */}
      {activeIdx !== null && NAV[activeIdx].cols.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.12)]"
          onMouseEnter={() => enter(activeIdx)}
          onMouseLeave={leave}
        >
          <div className="max-w-[1440px] mx-auto px-10 xl:px-20 py-10">
            <div className="flex gap-16">
              {NAV[activeIdx].cols.map((col, ci) => (
                <div key={ci} className="min-w-[140px]">
                  <p className="text-[10.5px] font-bold tracking-[0.15em] uppercase text-orange-500 mb-5">
                    {col.title}
                  </p>
                  <ul className="space-y-0.5">
                    {col.items.map((it, li) => (
                      <li key={li}>
                        {"external" in it && it.external ? (
                          <a
                            href={it.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setActiveIdx(null)}
                            className="flex items-center gap-1.5 text-[14px] text-slate-500 hover:text-[#0B1E4E] py-2 transition-colors"
                          >
                            {it.label}
                          </a>
                        ) : (
                          <Link
                            href={it.href}
                            onClick={() => setActiveIdx(null)}
                            className="block text-[14px] text-slate-500 hover:text-[#0B1E4E] py-2 transition-colors font-medium"
                          >
                            {it.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 모바일 풀스크린 메뉴 ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[100dvh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-slate-100 px-6 pb-6">
          {NAV.map((item, i) => (
            <div key={i} className="border-b border-slate-100 last:border-0">
              <button
                onClick={() => setMobileExp(mobileExp === i ? null : i)}
                className="flex items-center justify-between w-full py-4 text-[14px] font-semibold text-slate-800"
              >
                <span>{item.label}</span>
                {item.cols.length > 0 && (
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className={`text-slate-400 transition-transform duration-200 ${mobileExp === i ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                )}
              </button>
              {mobileExp === i && item.cols.length > 0 && (
                <div className="pb-3 pl-3">
                  {item.cols.flatMap(c => c.items).map((it, li) => (
                    <a
                      key={li}
                      href={it.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-[13px] text-slate-500 hover:text-orange-500 py-2.5 pl-3 border-l-2 border-slate-100 hover:border-orange-400 transition-all"
                      {...("external" in it && it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {it.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-5 space-y-3">
            <Link
              href="/support/inquiry"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#0B1E4E] text-white text-[13px] font-bold"
            >
              무료 상담 문의
            </Link>
            <a
              href="tel:0317771234"
              className="flex items-center justify-center gap-2 w-full py-3.5 border border-slate-200 text-slate-600 text-[13px] font-semibold"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.94 5.94l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              031-777-1234
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
