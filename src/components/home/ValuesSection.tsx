"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const VALUES = [
  {
    num: "01",
    title: "검증된 제조 역량",
    desc: "국내 자체 공장 생산. 핵심 부품 직납으로 납기·품질을 동시에 통제. ISO 9001 인증 품질관리 시스템 운영.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M16 3L3 9v14l13 6 13-6V9L16 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M3 9l13 6 13-6M16 15v14" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "현장 맞춤 설계",
    desc: "단순 카탈로그 납품이 아닌, 고객 공정을 직접 분석하여 최적화된 사양을 제안. 특수 환경(방폭·클린룸·내열)도 대응.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M4 28L12 4l6 12 4-6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "신속한 A/S 대응",
    desc: "전국 서비스 네트워크로 긴급 출동 24시간 이내. 설비 가동 중단 최소화를 위한 예방정비 시스템 운영.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 9v8l5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "안전 최우선 철학",
    desc: "산업안전보건법 기준 초과 설계. 전 제품 출하 전 부하 테스트 및 안전장치 검증. 현장 작업자 안전 교육 병행 제공.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M16 4l10 4v10c0 6-10 10-10 10S6 24 6 18V8l10-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 16l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const E = [0.22, 1, 0.36, 1] as never;

export default function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#f8fafc] py-24 lg:py-32" aria-label="세종호이스트의 강점">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16 lg:gap-20 items-start">

          {/* 좌: 섹션 헤더 + 이미지 */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-orange-500 mb-3 flex items-center gap-2"
            >
              <span className="block w-4 h-[1px] bg-orange-500" />
              Why Sejong
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.08 }}
              className="font-black text-slate-900 tracking-[-0.03em] leading-tight mb-6"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)" }}
            >
              세종호이스트를<br />
              선택하는 이유
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.15 }}
              className="text-[14px] text-slate-500 leading-[1.9] mb-10"
            >
              1984년 창업 이후, 오직 크레인과 호이스트만을
              전문으로 해온 기업입니다. 단순 제조를 넘어
              현장의 문제를 함께 해결하는 파트너입니다.
            </motion.p>

            {/* 현장 이미지 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: E, delay: 0.25 }}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src="/images/sejong_1.png"
                alt="세종호이스트 시공 현장"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white text-[11px] font-bold tracking-[0.15em] uppercase opacity-80">
                  실제 시공 현장 ·  2024
                </p>
              </div>
            </motion.div>
          </div>

          {/* 우: 밸류 리스트 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 pt-2">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: E, delay: 0.1 + i * 0.08 }}
                className="bg-white border border-slate-100 p-7 hover:border-slate-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 bg-[#f0f4ff] flex items-center justify-center text-[#0B1E4E] group-hover:bg-[#0B1E4E] group-hover:text-white transition-colors duration-300">
                    {v.icon}
                  </div>
                  <span className="text-[11px] font-black text-slate-200 tracking-tight">{v.num}</span>
                </div>
                <h3 className="text-[15.5px] font-bold text-slate-900 tracking-[-0.01em] mb-3">
                  {v.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-[1.85]">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
