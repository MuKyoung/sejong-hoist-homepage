"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import s from "./HeroSection.module.css";

const VIDEOS = [
  "/videos/47713-451772938_medium.mp4",
  "/videos/12716-241674181_medium.mp4",
  "/videos/27239-362518579_medium.mp4",
];

const STATS = [
  { num: "1984", label: "설립" },
  { num: "500+", label: "납품" },
  { num: "200T", label: "하중" },
  { num: "ISO",  label: "인증" },
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
    <section className={s.section} aria-label="메인 히어로">

      {/* 영상 배경 */}
      <AnimatePresence mode="sync">
        <motion.video
          key={videoIdx}
          autoPlay muted playsInline
          onEnded={() => setVideoIdx(i => (i + 1) % VIDEOS.length)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className={s.video}
        >
          <source src={VIDEOS[videoIdx]} type="video/mp4" />
        </motion.video>
      </AnimatePresence>

      <div className={s.overlayAngle} />
      <div className={s.overlayBottom} />

      {/* 메인 콘텐츠 */}
      <div className={s.content}>
        <div />

        <div className={s.inner}>
          {/* 레이블 */}
          <motion.div
            className={s.label}
            initial={{ opacity: 0, x: -16 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: E, delay: 0.1 }}
          >
            <span className={s.labelLine} />
            <span className={s.labelText}>Industrial Crane Manufacturer</span>
          </motion.div>

          {/* 헤드라인 */}
          <div className={s.headlineWrap}>
            <motion.h1
              className={s.headline}
              initial={{ y: "105%" }}
              animate={mounted ? { y: "0%" } : {}}
              transition={{ duration: 0.9, ease: E, delay: 0.2 }}
            >
              중력의 한계를<br />
              <span className={s.headlineAccent}>다시 그리다</span>
            </motion.h1>
          </div>

          {/* 서브카피 */}
          <motion.p
            className={s.sub}
            initial={{ opacity: 0, y: 14 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: E, delay: 0.5 }}
          >
            1984년부터 40년. 천장크레인·갠트리크레인·호이스트 전문 제조.<br />
            현대제철·삼성중공업·포스코 등 국내 주요 산업 현장에 500+ 납품.
          </motion.p>

          {/* CTA */}
          <motion.div
            className={s.ctas}
            initial={{ opacity: 0, y: 12 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: E, delay: 0.62 }}
          >
            <Link href="/support/inquiry" className={s.ctaPrimary}>
              무료 상담 문의
              <ArrowRight size={14} />
            </Link>
            <Link href="/portfolio" className={s.ctaSecondary}>
              납품 실적 보기
            </Link>
          </motion.div>
        </div>

        {/* 하단 스탯 스트립 */}
        <motion.div
          className={s.strip}
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: E, delay: 0.75 }}
        >
          <div className={s.stripInner}>
            {STATS.map((stat) => (
              <div key={stat.num} className={s.stripItem}>
                <span className={s.stripNum}>{stat.num}</span>
                <span className={s.stripLabel}>{stat.label}</span>
              </div>
            ))}
            <div className={s.stripPhone}>
              <a href="tel:0317771234" className={s.stripPhoneLink}>
                <Phone size={14} />
                031-777-1234
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 비디오 전환 도트 */}
      <div className={s.dots}>
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setVideoIdx(i)}
            aria-label={`영상 ${i + 1}`}
            className={i === videoIdx ? s.dotActive : s.dotInactive}
          />
        ))}
      </div>
    </section>
  );
}
