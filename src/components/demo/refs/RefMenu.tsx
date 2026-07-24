"use client";

/* 레퍼런스 시안 공용 풀스크린 메뉴 — 스타일 토큰(bg/accent)만 갈아끼움.
 * MJU·연세: xl 미만에서 햄버거 노출(데스크톱은 GNB), 삼성重: 상시 노출(원 사이트 문법). */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { COMPANY, E } from "./data";

export default function RefMenu({
  items,
  bg,
  barColor,
  triggerClass = "xl:hidden",
  barShadow = false,
}: {
  items: { label: string; href: string }[];
  bg: string;
  barColor: string;
  /** 트리거 노출 제어 (기본: xl 미만에서만) */
  triggerClass?: string;
  /** 투명 헤더 등 밝은 사진 위에서 흰 막대가 묻히지 않도록 */
  barShadow?: boolean;
}) {
  const [open, setOpen] = useState(false);

  /* 오버레이 열림 동안 배경 스크롤 잠금 */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${triggerClass} relative w-10 h-10 flex flex-col justify-center items-end gap-[7px] group`}
        aria-label="전체 메뉴 열기"
        aria-expanded={open}
      >
        <span className="block h-[2px] w-7 rounded-full transition-all duration-300 group-hover:w-5"
          style={{ background: barColor, boxShadow: barShadow ? "0 1px 6px rgba(0,0,0,0.45)" : "none" }} />
        <span className="block h-[2px] w-5 rounded-full transition-all duration-300 group-hover:w-7"
          style={{ background: barColor, boxShadow: barShadow ? "0 1px 6px rgba(0,0,0,0.45)" : "none" }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col"
            style={{ background: bg }}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: E }}
          >
            <div className="flex items-center justify-end h-16 shrink-0" style={{ paddingInline: "clamp(20px,3.5vw,48px)" }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white text-[26px] font-light transition-colors"
                aria-label="메뉴 닫기"
              >
                ×
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center gap-1 overflow-y-auto"
              style={{ paddingInline: "clamp(28px,8vw,96px)" }} aria-label="전체 메뉴">
              {items.map((item, i) => (
                <motion.div key={item.href}
                  initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.7, ease: E }}>
                  <Link href={item.href} onClick={() => setOpen(false)}
                    className="group flex items-center justify-between py-4 text-white font-extrabold tracking-[-0.02em] border-b"
                    style={{ fontSize: "clamp(1.5rem,4.5vw,2.2rem)", borderColor: "rgba(255,255,255,0.14)" }}>
                    {item.label}
                    <span className="text-[20px] font-light opacity-30 transition-all duration-300 group-hover:opacity-80 group-hover:translate-x-1.5">→</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="shrink-0 flex flex-wrap items-center justify-between gap-3 py-7 text-[13px] text-white/55"
              style={{ paddingInline: "clamp(28px,8vw,96px)", borderTop: "1px solid rgba(255,255,255,0.12)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
            >
              <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`} className="hover:text-white transition-colors tabular-nums">
                대표전화 {COMPANY.tel}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">{COMPANY.email}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
