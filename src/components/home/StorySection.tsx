"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./StorySection.module.css";

const SLIDES = [
  {
    image: "/images/sejong_2.png",
    tag: "Hoist & Crane",
    title: ["현장의 하중과 안전을", "설계와 제작으로 풉니다"],
  },
  {
    image: "/images/sejong_3.png",
    tag: "Gantry Crane",
    title: ["최대 350TON,", "검증된 시공 실적"],
  },
  {
    image: "/images/sejong_1.png",
    tag: "Wire Hoist",
    title: ["정밀 제어와 견고한 구조의", "운반하역 솔루션"],
  },
  {
    image: "/images/sejong_4.png",
    tag: "Maintenance & A/S",
    title: ["설계부터 유지보수까지", "원스톱으로 책임집니다"],
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
    <section className={s.section} aria-label="세종호이스트크레인 대표 이미지">
      <div className={s.slides} aria-hidden>
        {SLIDES.map((slide, i) => (
          <div key={slide.image + i} className={`${s.slide} ${i === idx ? s.slideActive : ""}`}>
            <Image
              src={slide.image}
              alt=""
              fill
              className={s.image}
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
        <div className={s.overlay} />
      </div>

      <div className={s.content}>
        <div className="container">
          <div className={s.inner}>
            <p className={s.tag}>{active.tag}</p>
            <h1 className={s.headline}>
              {active.title.map((line, i) => (
                <span key={i} className={s.headlineLine}>{line}</span>
              ))}
            </h1>
            <p className={s.sub}>
              Wire·Chain·방폭 호이스트부터 천장·갠트리 크레인까지,
              설계·제작·설치·A/S를 한 번에 제공합니다.
            </p>

            <div className={s.ctas}>
              <Link href="/business" className={s.primaryBtn}>제품 보기</Link>
              <Link href="/support/inquiry" className={s.ghostBtn}>견적 문의</Link>
            </div>
          </div>
        </div>
      </div>

      <div className={s.controls}>
        <div className="container">
          <div className={s.controlsInner}>
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
    </section>
  );
}
