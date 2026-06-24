"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const WORKS = [
  { id: 1, client: "현대제철", cat: "천장크레인", spec: "200T × 2대", year: "2023", img: "/images/sejong_1.png", size: "large" },
  { id: 2, client: "한화솔루션", cat: "갠트리크레인", spec: "80T × 1대", year: "2023", img: "/images/sejong_2.png", size: "small" },
  { id: 3, client: "LG화학", cat: "특수크레인", spec: "방폭 30T × 3대", year: "2022", img: "/images/sejong_3.png", size: "small" },
  { id: 4, client: "삼성중공업", cat: "갠트리크레인", spec: "120T × 4대", year: "2022", img: "/images/sejong_4.png", size: "large" },
];

const CLIENTS = ["현대제철", "한화솔루션", "LG화학", "삼성중공업", "포스코", "기아자동차", "한국전력", "현대모비스", "SK하이닉스", "롯데케미칼"];

const E = [0.22, 1, 0.36, 1] as never;

function WorkCard({ w, delay }: { w: typeof WORKS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLarge = w.size === "large";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: E, delay }}
      className={`group relative overflow-hidden bg-slate-100 ${isLarge ? "aspect-[4/3]" : "aspect-square"}`}
    >
      <Image
        src={w.img}
        alt={`${w.client} 납품 현장`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* 카테고리 배지 */}
      <div className="absolute top-4 left-4">
        <span className="bg-orange-500 text-white text-[9.5px] font-bold tracking-[0.1em] uppercase px-2.5 py-1">
          {w.cat}
        </span>
      </div>

      {/* 정보 */}
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 flex items-end justify-between">
        <div>
          <p className="text-white/50 text-[10.5px] font-bold tracking-wide mb-1">{w.year} · {w.spec}</p>
          <h3 className="text-white font-black text-[1.15rem] lg:text-[1.35rem] tracking-tight">{w.client}</h3>
        </div>
        <div className="w-9 h-9 bg-orange-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
          <ArrowUpRight size={15} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-20 lg:py-28" aria-label="납품실적">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20">

        {/* 헤더 */}
        <div ref={ref} className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 lg:mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
              className="text-[10.5px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-3 flex items-center gap-2"
            >
              <span className="w-5 h-[1px] bg-orange-500 block" />
              Portfolio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.08 }}
              className="font-black text-[#0B1E4E] tracking-[-0.04em] leading-none"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              주요 납품실적
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: E, delay: 0.2 }}
          >
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-[12.5px] font-bold text-slate-500 hover:text-[#0B1E4E] transition-colors"
            >
              전체 실적 보기
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* 비대칭 그리드 — 큰 카드 + 작은 카드 2개 + 큰 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {WORKS.map((w, i) => (
            <WorkCard key={w.id} w={w} delay={0.05 * i} />
          ))}
        </div>

        {/* 클라이언트 롤 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: E, delay: 0.5 }}
          className="mt-12 pt-10 border-t border-slate-100"
        >
          <p className="text-[9.5px] font-bold tracking-[0.25em] uppercase text-slate-300 text-center mb-7">주요 납품처</p>
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-8 lg:gap-12 animate-marquee whitespace-nowrap">
              {[...CLIENTS, ...CLIENTS].map((name, i) => (
                <span key={i} className="text-[13px] font-bold text-slate-300 flex-shrink-0">{name}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
