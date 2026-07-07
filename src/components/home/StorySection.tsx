"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./StorySection.module.css";

const SLIDES = [
  {
    image: "/images/hero-02.jpg",
    title: ["최대 350TON,", "검증된 시공 실적"],
    sub: "350TON 겐트리 크레인 — 설계부터 설치·안전인증까지 직접 수행했습니다.",
  },
  {
    image: "/images/hero-04.jpg",
    title: ["현장의 하중과 안전을", "설계와 제작으로 풉니다"],
    sub: "350/50TON 그라브 크레인 — 옥외 대형 설비까지 책임집니다.",
  },
  {
    image: "/images/hero-03.jpg",
    title: ["대형 그라브 크레인의", "설계·제작·설치"],
    sub: "250/50TON 그라브 크레인을 현장 조건에 맞춰 시공했습니다.",
  },
  {
    image: "/images/pf-ceiling30.jpg",
    title: ["옥내 천장크레인부터", "유지보수·A/S까지"],
    sub: "30TON 천장크레인 설치 — 정기 점검과 신속한 A/S로 가동률을 지킵니다.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function StorySection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const active = SLIDES[idx];

  return (
    <section className={s.section} aria-label="세종호이스트크레인 소개">
      <div className="container">
        <div className={s.grid}>
          <div className={s.copy}>
            <p className={s.eyebrow}>Sejong Hoist Crane</p>
            <h1 className={s.headline}>
              {active.title.map((line, i) => (
                <span key={i} className={s.headlineLine}>{line}</span>
              ))}
            </h1>
            <p className={s.sub}>{active.sub}</p>
            <div className={s.ctas}>
              <Link href="/support/inquiry" className={s.primaryBtn}>
                견적 문의
              </Link>
              <Link href="/business" className={s.ghostBtn}>
                사업영역 보기
              </Link>
            </div>
          </div>

          <div className={s.visualWrap}>
            <div className={s.visual}>
              {SLIDES.map((slide, i) => (
                <div
                  key={slide.image + i}
                  className={`${s.slide} ${i === idx ? s.slideActive : ""}`}
                  aria-hidden={i !== idx}
                >
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    className={s.image}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>

            <div className={s.controls}>
              <div className={s.dots} role="tablist" aria-label="슬라이드 선택">
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.image + i}
                    type="button"
                    role="tab"
                    aria-selected={i === idx}
                    aria-label={`${i + 1}번 슬라이드`}
                    className={`${s.dot} ${i === idx ? s.dotActive : ""}`}
                    onClick={() => setIdx(i)}
                  />
                ))}
              </div>
              <p className={s.counter}>
                <span className={s.counterNow}>{pad(idx + 1)}</span>
                <span className={s.counterSep}> / </span>
                {pad(SLIDES.length)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
