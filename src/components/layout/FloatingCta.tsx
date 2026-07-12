"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import s from "./FloatingCta.module.css";

export default function FloatingCta({ locale = "ko" }: { locale?: "ko" | "en" }) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  // 데스크톱(마우스) 전용: 버튼의 세로 위치가 커서 Y를 부드럽게 따라간다.
  // 터치 기기·reduced-motion에서는 기존 우측 하단 고정 그대로.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = 0;
    let current = 0;
    let raf = 0;
    let active = false;

    // 헤더(64px) 아래 ~ 뷰포트 하단 안쪽으로만 이동
    const clampY = (y: number) =>
      Math.min(Math.max(y, 88), window.innerHeight - el.offsetHeight - 24);

    const tick = () => {
      current += (target - current) * 0.11;
      if (Math.abs(target - current) < 0.1) current = target;
      el.style.transform = `translate3d(0, ${current}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      // 버튼 위에 커서가 있는 동안은 제자리에 멈춰서 클릭이 쉽도록
      if (active && el.contains(e.target as Node)) {
        target = current;
        return;
      }
      target = clampY(e.clientY - el.offsetHeight / 2);
      if (!active) {
        active = true;
        current = el.getBoundingClientRect().top;
        el.classList.add(s.follow);
        raf = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      if (active) target = clampY(target);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      el.classList.remove(s.follow);
      el.style.transform = "";
    };
  }, []);

  return (
    <Link ref={ref} href="/support/inquiry" className={s.fab}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      {locale === "en" ? "Get a Quote" : "견적 문의"}
    </Link>
  );
}
