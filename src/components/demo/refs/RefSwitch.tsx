"use client";

/** 레퍼런스 시안 플로팅 스위처 (좌하단) — /demo/mju·yonsei·shi·custom 공용 */

import Link from "next/link";

const ITEMS = [
  { id: "mju", href: "/demo/mju", label: "MJU" },
  { id: "ys", href: "/demo/yonsei", label: "연세" },
  { id: "shi", href: "/demo/shi", label: "삼성重" },
  { id: "custom", href: "/demo/custom", label: "커스텀" },
] as const;

export default function RefSwitch({ current }: { current: "mju" | "ys" | "shi" | "custom" }) {
  return (
    <div
      className="fixed left-3 sm:left-4 bottom-3 sm:bottom-4 z-[70] flex items-center gap-0.5 h-11 px-1.5 rounded-full backdrop-blur"
      style={{ background: "rgba(13,23,38,0.92)", boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }}
      role="navigation"
      aria-label="레퍼런스 시안 전환"
    >
      <Link href="/demo" className="px-2.5 text-[12px] text-white/50 hover:text-white transition-colors">
        ← 목록
      </Link>
      <span className="w-px h-4 bg-white/15" aria-hidden />
      {ITEMS.map((c) => (
        <Link
          key={c.id}
          href={c.href}
          className={`h-8 px-3 rounded-full flex items-center text-[12px] font-bold transition-colors ${
            current === c.id ? "bg-white text-[#16273C]" : "text-white/70 hover:text-white"
          }`}
          aria-current={current === c.id ? "page" : undefined}
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}
