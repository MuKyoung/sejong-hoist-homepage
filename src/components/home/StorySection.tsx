"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./StorySection.module.css";

type Locale = "ko" | "en";

const SLIDES: Record<Locale, { image: string; title: string[]; sub: string; caption: string }[]> = {
  ko: [
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
      sub: "옥외 대형 설비까지, 풍하중·구조 해석을 반영한 맞춤 설계로 시공합니다.",
      caption: "250/50TON 그라브 크레인 · LS ELECTRIC 부산사업장",
    },
    {
      image: "/images/pf-ceiling30.jpg",
      title: ["옥내 천장크레인부터", "유지보수·A/S까지"],
      sub: "정기 점검과 신속한 A/S로 고객 설비의 가동률을 지킵니다.",
      caption: "30TON 천장크레인 · LS ELECTRIC 부산사업장",
    },
  ],
  en: [
    {
      image: "/images/hero-02.jpg",
      title: ["Up to 350 tons,", "proven on site"],
      sub: "Design, fabrication, installation and certification, all in-house.",
      caption: "350TON gantry crane · LS ELECTRIC Busan",
    },
    {
      image: "/images/hero-04.jpg",
      title: ["Heavy loads,", "engineered safely"],
      sub: "Safety factors and delivery risk, controlled by numbers from design.",
      caption: "350/50TON grab crane · LS ELECTRIC Busan",
    },
    {
      image: "/images/hero-03.jpg",
      title: ["Large grab cranes,", "built and installed"],
      sub: "Outdoor equipment engineered with wind-load and structural analysis.",
      caption: "250/50TON grab crane · LS ELECTRIC Busan",
    },
    {
      image: "/images/pf-ceiling30.jpg",
      title: ["Overhead cranes,", "maintenance and A/S"],
      sub: "Scheduled inspections and rapid service keep equipment running.",
      caption: "30TON overhead crane · LS ELECTRIC Busan",
    },
  ],
};

const UI: Record<Locale, { eyebrow: string; quote: string; projects: string }> = {
  ko: { eyebrow: "Sejong Hoist Crane · Since 1999", quote: "견적 문의", projects: "시공사례 보기" },
  en: { eyebrow: "Sejong Hoist Crane · Since 1999", quote: "Request a Quote", projects: "View Projects" },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function StorySection({ locale = "ko" }: { locale?: Locale }) {
  const [idx, setIdx] = useState(0);
  const slides = SLIDES[locale];
  const ui = UI[locale];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const active = slides[idx];

  return (
    <section className={`${s.section} scroll-fx`} aria-label={locale === "en" ? "Sejong Hoist Crane" : "세종호이스트크레인 소개"}>
      <div className="container">
        <div className={s.frame}>
          <div className={s.bg} aria-hidden>
            {slides.map((slide, i) => (
              <div
                key={slide.image}
                className={`${s.bgSlide} ${i === idx ? s.bgSlideActive : ""}`}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className={s.bgImage}
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  priority={i === 0}
                />
              </div>
            ))}
            <div className={s.bgScrim} />
          </div>

          <div className={s.grid}>
          <div className={s.copy}>
            <p className={s.eyebrow}>{ui.eyebrow}</p>
            <div key={idx} className={s.textSwap}>
              <h1 className={s.headline}>
                {active.title.map((line, i) => (
                  <span key={i} className={s.headlineLine}>{line}</span>
                ))}
              </h1>
              <p className={s.sub}>{active.sub}</p>
            </div>
            <div className={s.ctas}>
              <Link href="/support/inquiry" className={s.primaryBtn}>
                {ui.quote}
              </Link>
              <Link href="/portfolio" className={s.ghostBtn}>
                {ui.projects}
              </Link>
            </div>
          </div>

          <div className={s.visualWrap}>
            <div className={s.visual}>
              {slides.map((slide, i) => (
                <div
                  key={slide.image}
                  className={`${s.slide} ${i === idx ? s.slideActive : ""}`}
                  aria-hidden={i !== idx}
                >
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    className={s.image}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>

            <div className={s.controls}>
              <p className={s.caption}>{active.caption}</p>
              <div className={s.controlsRight}>
                <div className={s.dots} role="tablist" aria-label="슬라이드 선택">
                  {slides.map((slide, i) => (
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
                  {pad(slides.length)}
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
