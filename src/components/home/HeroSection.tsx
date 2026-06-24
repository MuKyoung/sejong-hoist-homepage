"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const VIDEOS = [
  "/videos/4763-179741146_medium.mp4",
  "/videos/4764-179741142_medium.mp4",
  "/videos/4765-179741137_medium.mp4",
  "/videos/4768-179741152_medium.mp4",
  "/videos/5497-184226939_medium.mp4",
  "/videos/12716-241674181_medium.mp4",
  "/videos/27239-362518579_medium.mp4",
  "/videos/47713-451772938_medium.mp4",
  "/videos/48420-453832153_medium.mp4",
  "/videos/144584-785095786_medium.mp4",
  "/videos/159052-818026310_medium.mp4",
  "/videos/161515-823603558_medium.mp4",
];

const SLIDES = [
  { video: 0,  tab: "크레인",  line1: "산업을",      line2: "움직이는 힘",   sub: "40년의 기술력으로 대한민국 산업현장의\n안전과 효율을 책임집니다" },
  { video: 3,  tab: "호이스트", line1: "강인함이",     line2: "일상이 되는 곳", sub: "최고의 품질과 안전을 기준으로\n모든 크레인을 설계·제작합니다" },
  { video: 6,  tab: "크레인",  line1: "신뢰를 쌓아온", line2: "세종의 기술",    sub: "고객의 현장에 맞는 맞춤형 솔루션으로\n안전한 작업 환경을 만듭니다" },
  { video: 9,  tab: "특수크레인", line1: "미래를 향한", line2: "도전과 혁신",   sub: "지속적인 연구개발로 더 안전하고\n더 강한 크레인을 만들어 갑니다" },
];

const DURATION = 7000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState<number | null>(null);
  const [titleKey, setTitleKey]     = useState(0);
  const videoRefs  = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef   = useRef<NodeJS.Timeout | null>(null);

  const go = useCallback((next: number) => {
    setPrev(current);
    setCurrent(next);
    setTitleKey(k => k + 1);
  }, [current]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      go((current + 1) % SLIDES.length);
    }, DURATION);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current, go]);

  useEffect(() => {
    SLIDES.forEach((s, i) => {
      const el = videoRefs.current[i];
      if (!el) return;
      if (i === current) { el.currentTime = 0; el.play().catch(() => {}); }
      else el.pause();
    });
  }, [current]);

  const jump = (i: number) => {
    if (i === current) return;
    if (timerRef.current) clearInterval(timerRef.current);
    go(i);
    timerRef.current = setInterval(() => go((i + 1) % SLIDES.length), DURATION);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a1c4a]">

      {/* ── 비디오 레이어 ── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <video
            ref={el => { videoRefs.current[i] = el; }}
            src={VIDEOS[s.video]}
            className="hero-video"
            muted
            loop
            playsInline
            preload={i === current ? "auto" : "none"}
          />
        </div>
      ))}

      {/* ── 오버레이 ── */}
      <div className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to right, rgba(10,28,74,0.75) 0%, rgba(10,28,74,0.3) 60%, transparent 100%)" }}
      />
      <div className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }}
      />

      {/* ── 콘텐츠 ── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between px-8 md:px-16 py-10 md:py-14">

        {/* 상단: 슬라이드 번호 (우측) */}
        <div className="flex justify-end">
          <div className="hidden md:flex flex-col items-end gap-3">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => jump(i)} className="group flex items-center gap-2.5">
                <span className={`text-[11px] font-mono transition-colors ${i === current ? "text-white" : "text-white/30 group-hover:text-white/60"}`}>
                  0{i + 1}
                </span>
                <span className={`block h-px transition-all duration-300 ${i === current ? "w-10 bg-[#f47c20]" : "w-5 bg-white/20 group-hover:bg-white/40"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* 하단: 메인 텍스트 + 탭 */}
        <div>
          {/* 텍스트 */}
          <div key={titleKey} className="mb-10 fade-up">
            <span className="hero-title block">{SLIDES[current].line1}</span>
            <span className="hero-title block text-[#f47c20]">{SLIDES[current].line2}</span>
            <div className="w-12 h-[2px] bg-[#f47c20] my-6" />
            <p className="text-white/60 text-sm md:text-base leading-relaxed" style={{ whiteSpace: "pre-line" }}>
              {SLIDES[current].sub}
            </p>
          </div>

          {/* Defense/ICT 스타일 탭 */}
          <div className="flex items-end gap-0 border-t border-white/20">
            {[
              {
                label: "크레인",
                en: "Crane",
                desc: "천장크레인, 갠트리크레인 등 산업현장 맞춤 크레인 시스템을 설계·제작합니다.",
                links: ["천장크레인", "갠트리크레인"],
                href: "/business",
              },
              {
                label: "호이스트 & 특수",
                en: "Hoist & Special",
                desc: "체인호이스트부터 반도체·원자력 특수 크레인까지 전 분야를 커버합니다.",
                links: ["호이스트", "특수크레인"],
                href: "/business",
              },
            ].map((tab, ti) => (
              <div
                key={ti}
                className="group flex-1 border-r border-white/20 last:border-r-0 cursor-pointer"
              >
                <div className="px-6 py-6 md:py-8">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-bold text-base md:text-lg">{tab.label}</p>
                    <Link href={tab.href} className="text-white/40 group-hover:text-[#f47c20] text-sm transition-colors">
                      →
                    </Link>
                  </div>
                  <p className="text-[10px] text-white/30 tracking-widest uppercase mb-3">{tab.en}</p>
                  <p className="hidden md:block text-white/50 text-xs leading-relaxed mb-4">{tab.desc}</p>
                  <div className="hidden md:flex gap-3">
                    {tab.links.map(l => (
                      <Link
                        key={l}
                        href={tab.href}
                        className="text-white/40 hover:text-white text-xs border border-white/20 hover:border-white/50 px-3 py-1 transition-all"
                      >
                        {l}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCROLL 인디케이터 ── */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2">
        <div className="relative w-px h-14 bg-white/20 overflow-hidden scroll-line" />
        <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Scroll</p>
      </div>

      {/* ── 진행 바 ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-30">
        <div
          key={`prog-${titleKey}`}
          className="h-full bg-[#f47c20]"
          style={{ animation: `progressBar ${DURATION}ms linear forwards` }}
        />
      </div>

      <style jsx>{`
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
