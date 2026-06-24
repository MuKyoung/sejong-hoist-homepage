"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const WORKS = [
  {
    id: 1,
    client: "현대제철",
    category: "천장크레인",
    spec: "200T × 2대",
    year: "2023",
    img: "/images/sejong_1.png",
    desc: "당진제철소 후판 공장 대형 크레인 신규 설치",
  },
  {
    id: 2,
    client: "한화솔루션",
    category: "갠트리크레인",
    spec: "80T × 1대",
    year: "2023",
    img: "/images/sejong_2.png",
    desc: "여수 석유화학 단지 원료 이송용 갠트리크레인",
  },
  {
    id: 3,
    client: "LG화학",
    category: "특수크레인",
    spec: "방폭 30T × 3대",
    year: "2022",
    img: "/images/sejong_3.png",
    desc: "배터리 원자재 창고 방폭 환경 특수 크레인 일괄 납품",
  },
  {
    id: 4,
    client: "삼성중공업",
    category: "갠트리크레인",
    spec: "120T × 4대",
    year: "2022",
    img: "/images/sejong_4.png",
    desc: "거제 조선소 선박 블록 야적장용 대형 갠트리크레인",
  },
  {
    id: 5,
    client: "포스코",
    category: "천장크레인",
    spec: "150T × 2대",
    year: "2021",
    img: "/images/sejong_1.png",
    desc: "광양제철소 슬라브 핸들링 크레인 교체 설치",
  },
  {
    id: 6,
    client: "기아자동차",
    category: "호이스트",
    spec: "5T × 20대",
    year: "2021",
    img: "/images/sejong_2.png",
    desc: "화성공장 도장라인 전동 호이스트 대규모 납품",
  },
];

const E = [0.22, 1, 0.36, 1] as never;

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-24 lg:py-32" aria-label="납품실적">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20">

        {/* 섹션 헤더 */}
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-orange-500 mb-3 flex items-center gap-2"
            >
              <span className="block w-4 h-[1px] bg-orange-500" />
              Portfolio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.08 }}
              className="font-black text-slate-900 tracking-[-0.03em] leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)" }}
            >
              주요 납품실적
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: E, delay: 0.2 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[12.5px] font-bold text-slate-500 hover:text-[#0B1E4E] transition-colors group"
            >
              전체 실적 보기
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* 납품 그리드 — 비대칭 마소네리 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {WORKS.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.08 + i * 0.07 }}
              className={`group relative overflow-hidden ${i === 0 || i === 3 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="relative overflow-hidden bg-slate-100 aspect-[3/2]">
                <Image
                  src={w.img}
                  alt={`${w.client} 납품 현장`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* 카테고리 배지 */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-orange-500 text-white text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1">
                    {w.category}
                  </span>
                </div>

                {/* 하단 정보 */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/60 text-[11px] font-semibold tracking-wide mb-1">{w.year}</p>
                      <h3 className="text-white font-black text-[16px] tracking-[-0.01em] leading-tight mb-1">{w.client}</h3>
                      <p className="text-white/70 text-[12px] leading-snug max-w-[240px]">{w.desc}</p>
                    </div>
                    <div className="flex-shrink-0 ml-3">
                      <span className="block text-right text-white/55 text-[11px] font-bold">{w.spec}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 클라이언트 로고 마퀴 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: E, delay: 0.5 }}
          className="mt-16 pt-12 border-t border-slate-100"
        >
          <p className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-slate-300 text-center mb-8">
            주요 납품처
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {["현대제철", "한화솔루션", "LG화학", "삼성중공업", "포스코", "기아자동차", "한국전력", "현대모비스"].map((name, i) => (
              <span key={i} className="text-[13px] font-bold text-slate-300 hover:text-slate-500 transition-colors cursor-default">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
