"use client";

/** 헤더 · 히어로 시안 A/B 데모 공용 플로팅 스위처 (좌하단, FAB와 반대편) */

import Link from "next/link";

export default function ConceptSwitch({ current }: { current: "5" | "6" }) {
  return (
    <div
      className="fixed left-3 sm:left-4 bottom-3 sm:bottom-4 z-[70] flex items-center gap-0.5 h-11 px-1.5 rounded-full backdrop-blur"
      style={{ background: "rgba(13,23,38,0.92)", boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }}
      role="navigation"
      aria-label="시안 전환"
    >
      <Link href="/demo" className="px-2.5 text-[12px] text-white/50 hover:text-white transition-colors">
        ← 목록
      </Link>
      <span className="w-px h-4 bg-white/15" aria-hidden />
      <Link
        href="/demo/5"
        className={`h-8 px-3 rounded-full flex items-center text-[12px] font-bold transition-colors ${
          current === "5" ? "bg-white text-[#16273C]" : "text-white/70 hover:text-white"
        }`}
        aria-current={current === "5" ? "page" : undefined}
      >
        시안 A
      </Link>
      <Link
        href="/demo/6"
        className={`h-8 px-3 rounded-full flex items-center text-[12px] font-bold transition-colors ${
          current === "6" ? "bg-white text-[#16273C]" : "text-white/70 hover:text-white"
        }`}
        aria-current={current === "6" ? "page" : undefined}
      >
        시안 B
      </Link>
      <span className="hidden sm:block w-px h-4 bg-white/15" aria-hidden />
      <Link href="/" className="hidden sm:block px-2.5 text-[12px] text-white/50 hover:text-white transition-colors">
        현재 사이트
      </Link>
    </div>
  );
}
