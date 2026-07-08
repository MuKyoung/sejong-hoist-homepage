"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./StorySection.module.css";

const SLIDES = [
  {
    image: "/images/hero-02.jpg",
    title: ["최대 350TON,", "검증된 시공 실적"],
    sub: "설계부터 제작·설치·안전인증까지, 초대형 크레인의 전 과정을 직접 수행합니다.",
    caption: "350TON 겐트리 크레인 · LS ELECTRIC 부산사업장",
  },
  {
    image: "/images/hero-04.jpg",
    title: ["현장의 하중과 안전을", "설계와 제작으로 풉니다"],
    sub: "안전 계수와 납기, 두 가지 리스크를 설계 단계부터 수치로 통제합니다.",
    caption: "350/50TON 그라브 크레인 · LS ELECTRIC 부산사업장",
  },
  {
    image: "/images/hero-03.jpg",
    title: ["대형 그라브 크레인의", "설계·제작·설치"],
    sub: "옥외 대형 설비까지 — 풍하중·구조 해석을 반영한 맞춤 설계로 시공합니다.",
    caption: "250/50TON 그라브 크레인 · LS ELECTRIC 부산사업장",
  },
  {
    image: "/images/pf-ceiling30.jpg",
    title: ["옥내 천장크레인부터", "유지보수·A/S까지"],
    sub: "정기 점검과 신속한 A/S로 고객 설비의 가동률을 지킵니다.",
    caption: "30TON 천장크레인 · LS ELECTRIC 부산사업장",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function StorySection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const active = SLIDES[idx];

  return (
    <section className={s.section} aria-label="세종호이스트크레인 대표 프로젝트">
      <div className="container">
        <div className={s.kv}>
          <div className={s.slides} aria-hidden>
            {SLIDES.map((slide, i) => (
              <div
                key={slide.image}
                className={`${s.slide} ${i === idx ? s.slideActive : ""}`}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className={s.image}
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  priority={i === 0}
                />
              </div>
            ))}
            <div className={s.overlay} />
          </div>

          <div className={s.content}>
            <div className={s.inner}>
              <p className={s.eyebrow}>Sejong Hoist Crane · Since 1999</p>
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
                <Link href="/portfolio" className={s.ghostBtn}>
                  시공사례 보기
                </Link>
              </div>
            </div>
          </div>

          <div className={s.bottomBar}>
            <div className={s.bottomInner}>
              <p className={s.caption}>{active.caption}</p>
              <div className={s.controls}>
                <div className={s.dots} role="tablist" aria-label="슬라이드 선택">
                  {SLIDES.map((slide, i) => (
                    <button
                      key={slide.image}
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
      </div>
    </section>
  );
}
