"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const VIDEOS = [
  "/videos/47713-451772938_medium.mp4",
  "/videos/12716-241674181_medium.mp4",
  "/videos/27239-362518579_medium.mp4",
];

const STATS = [
  { value: "40", unit: "년", label: "업력" },
  { value: "500", unit: "+", label: "누적 시공" },
  { value: "200", unit: "T", label: "최대 하중" },
  { value: "ISO", unit: "", label: "9001 인증" },
];

const E = [0.22, 1, 0.36, 1] as never;

export default function HeroSection() {
  const [videoIdx, setVideoIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    setVideoIdx(i => (i + 1) % VIDEOS.length);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden bg-[#050e20]"
      aria-label="메인 히어로"
    >
      {/* ── 영상 배경 ── */}
      <video
        ref={videoRef}
        key={videoIdx}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease" }}
      >
        <source src={VIDEOS[videoIdx]} type="video/mp4" />
      </video>

      {/* ── 오버레이 레이어 ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* ── 헤더 높이만큼 상단 여백 ── */}
      {/* Header는 화이트 고정이므로 히어로 내 콘텐츠가 그 아래 시작 */}
      <div className="absolute inset-0 flex flex-col justify-center pt-[104px] lg:pt-[108px]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20 w-full">
          <div className="flex items-end justify-between gap-10">

            {/* ── 좌: 메인 카피 ── */}
            <motion.div
              className="max-w-[620px]"
              style={{ y: yText, opacity: opText }}
            >
              {/* 태그 */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }}
                transition={{ duration: 0.6, ease: E, delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <span className="block w-5 h-[1px] bg-orange-400" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-orange-400">
                  Industrial Crane Manufacturer
                </span>
              </motion.div>

              {/* 헤드라인 */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }}
                transition={{ duration: 0.8, ease: E, delay: 0.35 }}
                className="text-white font-black leading-[1.0] tracking-[-0.04em] mb-6"
                style={{ fontSize: "clamp(3rem, 7.5vw, 5.5rem)" }}
              >
                무거운 것을<br />
                <span className="text-orange-400">가볍게</span> 옮기는<br />
                40년의 기술
              </motion.h1>

              {/* 서브카피 */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
                transition={{ duration: 0.8, ease: E, delay: 0.5 }}
                className="text-white/65 text-[15px] leading-[1.9] mb-10 max-w-[440px]"
              >
                천장크레인·갠트리크레인·호이스트 전문 제조.<br />
                국내 주요 제조·조선·철강 현장에 500건 이상 납품한<br />
                검증된 파트너입니다.
              </motion.p>

              {/* CTA 버튼 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
                transition={{ duration: 0.8, ease: E, delay: 0.62 }}
                className="flex items-center gap-4"
              >
                <Link
                  href="/business"
                  className="inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[13px] tracking-wide px-7 py-4 transition-colors duration-200"
                >
                  제품 보기
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2.5 border border-white/40 hover:border-white text-white font-semibold text-[13px] tracking-wide px-7 py-4 transition-all duration-200 hover:bg-white/10"
                >
                  납품 실적
                </Link>
              </motion.div>
            </motion.div>

            {/* ── 우: 스탯 카드 (데스크탑) ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : 24 }}
              transition={{ duration: 0.9, ease: E, delay: 0.7 }}
              className="hidden lg:block flex-shrink-0"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-7 min-w-[220px]">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-6">
                  Key Figures
                </p>
                <div className="space-y-5">
                  {STATS.map((s, i) => (
                    <div key={i} className="flex items-baseline justify-between gap-8">
                      <span className="text-[12px] text-white/55">{s.label}</span>
                      <span className="font-black text-white text-[1.6rem] leading-none tracking-tight tabular-nums">
                        {s.value}<span className="text-orange-400 text-[1.1rem]">{s.unit}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-7 pt-6 border-t border-white/10">
                  <a
                    href="tel:0317771234"
                    className="flex items-center gap-2.5 text-white group"
                  >
                    <div className="w-8 h-8 bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.94 5.94l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/45 leading-none mb-0.5">무료 상담</p>
                      <p className="text-[14px] font-bold tracking-tight group-hover:text-orange-400 transition-colors">031-777-1234</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── 비디오 인디케이터 ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setVideoIdx(i)}
            aria-label={`영상 ${i + 1}`}
            className={`transition-all duration-300 ${
              i === videoIdx
                ? "w-8 h-[3px] bg-orange-400"
                : "w-3 h-[3px] bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* ── 스크롤 유도 ── */}
      <motion.div
        className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40 rotate-90 mb-6">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
