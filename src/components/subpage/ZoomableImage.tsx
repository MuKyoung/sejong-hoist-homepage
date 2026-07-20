"use client";

/* 사진 클릭 확대 라이트박스 (26.07.16 클라이언트 요청 — 사업영역 사진) */

import { useEffect, useState } from "react";
import Image from "next/image";
import s from "./ZoomableImage.module.css";

export default function ZoomableImage({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={s.trigger}
        onClick={() => setOpen(true)}
        aria-label={`${alt} 크게 보기`}
      >
        <Image src={src} alt={alt} fill className={s.img} sizes={sizes} />
        <span className={s.hint} aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className={s.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <figure className={s.frame}>
            <Image src={src} alt={alt} fill className={s.full} sizes="92vw" />
          </figure>
          <button type="button" className={s.close} aria-label="닫기" onClick={() => setOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
