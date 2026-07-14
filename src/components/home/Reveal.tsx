"use client";

import { useEffect, useRef, useState } from "react";
import s from "./Reveal.module.css";

/** 스크롤 진입 시 1회 페이드업. 서버 섹션 내부에서 래퍼로 사용.
 *  bare: 래퍼 자체는 애니메이션하지 않고 data-reveal 어트리뷰트만 토글
 *  (자식 요소를 CSS로 스태거할 때 사용 — 섹션 모듈에서
 *  `:global([data-reveal="on"]) .item { animation: ... }` 패턴으로 참조) */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  bare = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  bare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={on ? "on" : "off"}
      className={bare ? className : `${s.reveal} ${on ? s.on : ""} ${className}`}
      style={!bare && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
