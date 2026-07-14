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

    let lastY = -1;

    const follow = (clientY: number, overButton: boolean) => {
      // 버튼 위에 커서가 있는 동안은 제자리에 멈춰서 클릭이 쉽도록
      if (active && overButton) {
        target = current;
        return;
      }
      target = clampY(clientY - el.offsetHeight / 2);
      if (!active) {
        active = true;
        current = el.getBoundingClientRect().top;
        el.classList.add(s.follow);
        raf = requestAnimationFrame(tick);
      }
    };

    // 마우스 이동 + 휠 스크롤 모두에서 커서 위치를 추적
    const onMove = (e: MouseEvent) => {
      lastY = e.clientY;
      follow(e.clientY, el.contains(e.target as Node));
    };

    // 스크롤바 드래그 등 wheel 없는 스크롤도 마지막 커서 위치로 따라오도록
    const onScroll = () => {
      if (lastY >= 0) follow(lastY, false);
    };

    const onResize = () => {
      if (active) target = clampY(target);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("wheel", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("wheel", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      el.classList.remove(s.follow);
      el.style.transform = "";
    };
  }, []);

  return (
    <Link ref={ref} href="/support/inquiry" className={s.fab}>
      <span className={s.mark} aria-hidden />
      {locale === "en" ? "Get a Quote" : "견적 문의"}
    </Link>
  );
}
