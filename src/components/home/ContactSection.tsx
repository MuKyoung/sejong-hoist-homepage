"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const E = [0.22, 1, 0.36, 1] as never;

const QUICK_LINKS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.94 5.94l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: "전화 상담",
    value: "031-777-1234",
    href: "tel:0317771234",
    sub: "평일 09:00 – 18:00",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "이메일 문의",
    value: "info@sejong-hoist.com",
    href: "mailto:info@sejong-hoist.com",
    sub: "24시간 접수 가능",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    label: "온라인 문의",
    value: "견적·기술 문의",
    href: "/support/inquiry",
    sub: "빠른 답변 보장",
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0B1E4E] py-24 lg:py-28 relative overflow-hidden" aria-label="상담 문의">
      {/* 배경 영상 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-15"
      >
        <source src="/videos/48420-453832153_medium.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-14 lg:gap-20 items-center">

          {/* 좌: 카피 */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-orange-400 mb-3 flex items-center gap-2"
            >
              <span className="block w-4 h-[1px] bg-orange-400" />
              Contact Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: E, delay: 0.08 }}
              className="font-black text-white tracking-[-0.04em] leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              프로젝트 계획이<br />
              있으신가요?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: E, delay: 0.16 }}
              className="text-[14.5px] text-white/55 leading-[1.9] mb-10 max-w-[400px]"
            >
              현장 조건과 요구 하중을 알려주시면,<br />
              최적 사양과 견적을 빠르게 제안드립니다.<br />
              초기 상담은 언제나 무료입니다.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: E, delay: 0.24 }}
            >
              <Link
                href="/support/inquiry"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[13.5px] tracking-wide px-8 py-4 transition-colors duration-200"
              >
                무료 상담 시작하기
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* 우: 연락처 카드 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: E, delay: 0.2 }}
            className="space-y-3"
          >
            {QUICK_LINKS.map((ql, i) => (
              <a
                key={i}
                href={ql.href}
                className="flex items-center gap-4 bg-white/8 hover:bg-white/14 border border-white/10 hover:border-white/20 p-5 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200">
                  {ql.icon}
                </div>
                <div className="flex-1">
                  <p className="text-[10.5px] font-bold tracking-[0.1em] text-white/40 mb-0.5">{ql.label}</p>
                  <p className="text-[14px] font-bold text-white group-hover:text-orange-400 transition-colors">{ql.value}</p>
                  <p className="text-[11px] text-white/35">{ql.sub}</p>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/25 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all flex-shrink-0">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
