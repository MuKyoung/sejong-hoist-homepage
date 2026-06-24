"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PRODUCTS = [
  {
    id: "overhead-crane",
    label: "01",
    name: "천장크레인",
    nameEn: "Overhead Crane",
    desc: "공장 천장 레일에 설치되어 수평 이동과 수직 권상을 동시에 수행. 최대 하중 200톤까지 커스터마이징 제작.",
    href: "/business/overhead-crane",
    videoSrc: "/videos/4763-179741146_medium.mp4",
    specs: ["최대 200T", "스팬 최대 32m", "내구연한 25년+"],
  },
  {
    id: "gantry-crane",
    label: "02",
    name: "갠트리크레인",
    nameEn: "Gantry Crane",
    desc: "지상 레일 위를 주행하는 문형 크레인. 야외·실내 범용, 조선소·철강·항만 등 중공업 현장 특화.",
    href: "/business/gantry-crane",
    videoSrc: "/videos/5497-184226939_medium.mp4",
    specs: ["최대 120T", "야외 설치 가능", "방진·방수 IP65"],
  },
  {
    id: "hoist",
    label: "03",
    name: "호이스트",
    nameEn: "Electric Hoist",
    desc: "전동식 체인·와이어 권상 장치. 컴팩트 설계로 협소 공간에도 설치 가능. KS 인증 정품.",
    href: "/business/hoist",
    videoSrc: "/videos/4764-179741142_medium.mp4",
    specs: ["0.5T ~ 20T", "단상·삼상 선택", "KS 인증"],
  },
  {
    id: "special-crane",
    label: "04",
    name: "특수크레인",
    nameEn: "Special Crane",
    desc: "방폭·내열·클린룸 등 특수 환경용 크레인. 고객 공정에 맞춘 맞춤형 설계로 납품.",
    href: "/business/special-crane",
    videoSrc: "/videos/4768-179741152_medium.mp4",
    specs: ["방폭 ATEX 인증", "클린룸 Class 10K", "맞춤 설계"],
  },
];

const E = [0.22, 1, 0.36, 1] as never;

export default function BusinessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-24 lg:py-32" aria-label="사업영역">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20">

        {/* 섹션 헤더 */}
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-orange-500 mb-3 flex items-center gap-2"
            >
              <span className="block w-4 h-[1px] bg-orange-500" />
              Business Area
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.08 }}
              className="font-black text-slate-900 tracking-[-0.03em] leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)" }}
            >
              사업영역
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: E, delay: 0.2 }}
          >
            <Link
              href="/business"
              className="inline-flex items-center gap-2 text-[12.5px] font-bold text-slate-500 hover:text-[#0B1E4E] transition-colors group"
            >
              전체 제품 보기
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* 제품 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.1 + i * 0.08 }}
            >
              <Link href={p.href} className="group block overflow-hidden bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-350">
                {/* 영상 썸네일 */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  >
                    <source src={p.videoSrc} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.15em] text-white/60">
                    {p.label}
                  </span>
                </div>

                {/* 카드 바디 */}
                <div className="p-6">
                  <p className="text-[10.5px] font-bold tracking-[0.15em] uppercase text-orange-500 mb-2">
                    {p.nameEn}
                  </p>
                  <h3 className="text-[17px] font-black text-slate-900 tracking-[-0.02em] mb-3 group-hover:text-[#0B1E4E] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-[1.75] mb-5 line-clamp-3">
                    {p.desc}
                  </p>

                  {/* 스펙 태그 */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.specs.map((spec, si) => (
                      <span key={si} className="text-[10.5px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 border border-slate-100">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#0B1E4E] group-hover:text-orange-500 transition-colors">
                    자세히 보기
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
