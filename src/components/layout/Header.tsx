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
  const [scrolled, setScrolled]       = useState(false);
  const [activeIdx, setActiveIdx]     = useState<number | null>(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [mobileExp, setMobileExp]     = useState<number | null>(null);
  const leaveTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enter = (i: number) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveIdx(i);
  };
  const leave = () => {
    leaveTimer.current = setTimeout(() => setActiveIdx(null), 120);
  };

  const transparent = !scrolled && !mobileOpen && activeIdx === null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent ? "bg-transparent" : "bg-[#0a1c4a]"}`}>

      {/* ── 메인 바 ── */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="flex items-center h-[72px] gap-10">

          {/* 로고 */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/sejong-logo.png"
              alt="세종호이스트크레인"
              width={148}
              height={36}
              className="h-9 w-auto brightness-0 invert"
              priority
            />
          </Link>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {NAV.map((item, i) => (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => enter(i)}
                onMouseLeave={leave}
              >
                <Link
                  href={item.href}
                  className={`px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
                    activeIdx === i ? "text-[#f47c20]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* 우측 버튼 */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <a
              href="https://sejong-hoist.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold tracking-[0.1em] uppercase border border-white/30 text-white/70 hover:border-[#f47c20] hover:text-[#f47c20] px-4 py-2 transition-all duration-200"
            >
              AS 시스템
            </a>
            <Link
              href="/support/inquiry"
              className="text-[11px] font-bold tracking-[0.1em] uppercase bg-[#f47c20] text-white hover:bg-[#d96a10] px-5 py-2 transition-colors duration-200"
            >
              문의하기
            </Link>
          </div>

          {/* 모바일 햄버거 */}
          <button
            className="lg:hidden ml-auto text-white p-1 flex flex-col gap-[5px]"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="메뉴"
          >
            <span className={`block w-5 h-[1.5px] bg-current transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-current transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-current transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── 메가 드롭다운 ── */}
      {activeIdx !== null && NAV[activeIdx].cols.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 bg-[#0a1c4a] border-t border-white/10 shadow-2xl"
          onMouseEnter={() => enter(activeIdx)}
          onMouseLeave={leave}
        >
          <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-10">
            <div className="flex gap-16">
              {NAV[activeIdx].cols.map((col, ci) => (
                <div key={ci}>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#f47c20] mb-5">
                    {col.title}
                  </p>
                  <ul className="space-y-1">
                    {col.items.map((it, li) => (
                      <li key={li}>
                        {"external" in it && it.external ? (
                          <a
                            href={it.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setActiveIdx(null)}
                            className="block text-white/60 hover:text-white text-sm py-1.5 transition-colors"
                          >
                            {it.label}
                          </a>
                        ) : (
                          <Link
                            href={it.href}
                            onClick={() => setActiveIdx(null)}
                            className="block text-white/60 hover:text-white text-sm py-1.5 transition-colors"
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

      {/* ── 모바일 메뉴 ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#060f25] border-t border-white/10">
          <div className="px-6 py-4">
            {NAV.map((item, i) => (
              <div key={i} className="border-b border-white/5">
                <button
                  onClick={() => setMobileExp(mobileExp === i ? null : i)}
                  className="flex items-center justify-between w-full py-4 text-white text-sm font-semibold"
                >
                  {item.label}
                  {item.cols.length > 0 && (
                    <span className={`text-white/40 text-xs transition-transform duration-200 ${mobileExp === i ? "rotate-180" : ""}`}>▼</span>
                  )}
                </button>
                {mobileExp === i && item.cols.length > 0 && (
                  <div className="pb-4 pl-4">
                    {item.cols.flatMap(c => c.items).map((it, li) => (
                      <a
                        key={li}
                        href={it.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-white/50 hover:text-white text-sm py-2 transition-colors"
                        {...("external" in it && it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {it.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-3 pt-5 pb-2">
              <Link href="/support/inquiry" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-3 bg-[#f47c20] text-white text-xs font-bold">문의하기</Link>
              <a href="https://sejong-hoist.vercel.app" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-3 border border-white/20 text-white text-xs font-bold">AS 시스템</a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
