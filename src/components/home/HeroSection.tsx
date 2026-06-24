"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const VIDEOS = [
  "/videos/47713-451772938_medium.mp4",
  "/videos/12716-241674181_medium.mp4",
  "/videos/27239-362518579_medium.mp4",
];

const E = [0.22, 1, 0.36, 1] as never;

export default function HeroSection() {
  const [videoIdx, setVideoIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[#06090f] -mt-16 lg:-mt-[104px]"
      aria-label="메인 히어로"
    >
      {/* ── 영상 배경 ── */}
      <AnimatePresence mode="sync">
        <motion.video
          key={videoIdx}
          autoPlay
          muted
          playsInline
          onEnded={() => setVideoIdx(i => (i + 1) % VIDEOS.length)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={VIDEOS[videoIdx]} type="video/mp4" />
        </motion.video>
      </AnimatePresence>

      {/* 오버레이: 좌하단 진하게 */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/55 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* ── 메인 콘텐츠 ── */}
      <div className="absolute inset-0 flex flex-col justify-between pt-16 lg:pt-[104px] pb-0">

        {/* 상단 영역 비움 — 헤더 공간 */}
        <div />

        {/* 중앙: 메인 카피 */}
        <div className="px-6 lg:px-10 xl:px-20 max-w-[1440px] mx-auto w-full">
          {/* 레이블 */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: E, delay: 0.1 }}
            className="flex items-center gap-3 mb-6 lg:mb-8"
          >
            <span className="w-8 h-[1px] bg-orange-400 block" />
            <span className="text-[10.5px] font-bold tracking-[0.3em] uppercase text-orange-400">
              Industrial Crane Manufacturer
            </span>
          </motion.div>

          {/* 헤드라인 — 디자인의 주인공 */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "105%" }}
              animate={mounted ? { y: "0%" } : {}}
              transition={{ duration: 0.9, ease: E, delay: 0.2 }}
              className="font-black text-white leading-[0.92] tracking-[-0.045em] mb-4 lg:mb-6 break-keep"
              style={{ fontSize: "clamp(2.2rem, 9.5vw, 8rem)" }}
            >
              중력의 한계를<br />
              <span className="text-orange-400">다시 그리다</span>
            </motion.h1>
          </div>

          {/* 서브 */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: E, delay: 0.5 }}
            className="text-white/60 max-w-[460px] leading-[1.8] mb-8 lg:mb-10"
            style={{ fontSize: "clamp(0.875rem, 1.4vw, 1rem)" }}
          >
            1984년부터 40년. 천장크레인·갠트리크레인·호이스트 전문 제조.
            현대제철·삼성중공업·포스코 등 국내 주요 산업 현장에 500+ 납품.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: E, delay: 0.62 }}
            className="flex flex-wrap items-center gap-3 lg:gap-4"
          >
            <Link
              href="/support/inquiry"
              className="group inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-400 text-white font-bold tracking-wide px-7 py-4 transition-all duration-200 text-[13px]"
            >
              무료 상담 문의
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2.5 border border-white/30 hover:border-white/70 text-white/80 hover:text-white font-semibold px-7 py-4 transition-all duration-200 text-[13px] hover:bg-white/5"
            >
              납품 실적 보기
            </Link>
          </motion.div>
        </div>

        {/* ── 하단 스탯 스트립 ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: E, delay: 0.75 }}
          className="border-t border-white/10 bg-black/30 backdrop-blur-sm mt-10 lg:mt-12"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20">
            <div className="flex items-stretch divide-x divide-white/10 overflow-x-auto scrollbar-none">
              {[
                { num: "1984", label: "설립" },
                { num: "500+", label: "납품" },
                { num: "200T", label: "하중" },
                { num: "ISO", label: "인증" },
              ].map((s, i) => (
                <div key={i} className="flex-shrink-0 px-4 sm:px-6 py-3 lg:px-8 lg:py-5 flex items-center gap-2 sm:gap-3">
                  <span className="font-black text-white tabular-nums text-[1.1rem] sm:text-[1.25rem] lg:text-[1.5rem] tracking-tight">{s.num}</span>
                  <span className="text-[10px] sm:text-[11px] text-white/40 font-semibold leading-tight">{s.label}</span>
                </div>
              ))}
              {/* 전화 — sm 이상에서만 표시 */}
              <div className="hidden sm:flex flex-shrink-0 px-6 py-3 lg:px-8 lg:py-5 items-center gap-3 ml-auto">
                <a href="tel:0317771234" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                  <Phone size={14} />
                  <span className="text-[13px] font-bold">031-777-1234</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 비디오 전환 도트 */}
      <div className="absolute bottom-[4.5rem] lg:bottom-[5rem] right-6 lg:right-10 xl:right-20 flex gap-2">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setVideoIdx(i)}
            aria-label={`영상 ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === videoIdx ? "w-5 h-1.5 bg-orange-400" : "w-1.5 h-1.5 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
