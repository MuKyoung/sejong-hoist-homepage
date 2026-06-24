"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PRODUCTS = [
  {
    id: "overhead-crane",
    num: "01",
    name: "천장크레인",
    nameEn: "Overhead Crane",
    desc: "공장 천장 레일에 설치되어 수평 이동과 수직 권상을 동시에 수행합니다. 최대 200톤까지 커스터마이징 설계가 가능합니다.",
    href: "/business/overhead-crane",
    videoSrc: "/videos/4763-179741146_medium.mp4",
    specs: ["Max 200T", "Span ≤ 32m", "25년+ 내구성"],
    color: "from-blue-950",
  },
  {
    id: "gantry-crane",
    num: "02",
    name: "갠트리크레인",
    nameEn: "Gantry Crane",
    desc: "지상 레일 위를 주행하는 문형 크레인으로 야외·실내 범용입니다. 조선소·철강·항만 등 중공업 현장에 특화 설계합니다.",
    href: "/business/gantry-crane",
    videoSrc: "/videos/5497-184226939_medium.mp4",
    specs: ["Max 120T", "IP65 방진·방수", "야외 설치 가능"],
    color: "from-slate-900",
  },
  {
    id: "hoist",
    num: "03",
    name: "호이스트",
    nameEn: "Electric Hoist",
    desc: "전동식 체인·와이어 권상 장치. 컴팩트한 설계로 협소 공간에도 설치 가능하며 KS 인증 정품을 공급합니다.",
    href: "/business/hoist",
    videoSrc: "/videos/4764-179741142_medium.mp4",
    specs: ["0.5T ~ 20T", "KS 인증", "단상·삼상 선택"],
    color: "from-zinc-900",
  },
  {
    id: "special-crane",
    num: "04",
    name: "특수크레인",
    nameEn: "Special Crane",
    desc: "방폭·내열·클린룸 등 특수 환경용 크레인을 고객 공정에 맞춰 설계합니다. ATEX 인증 방폭 설계 가능합니다.",
    href: "/business/special-crane",
    videoSrc: "/videos/4768-179741152_medium.mp4",
    specs: ["방폭 ATEX", "Class 10K 클린룸", "완전 맞춤 설계"],
    color: "from-neutral-900",
  },
];

const E = [0.22, 1, 0.36, 1] as never;

export default function BusinessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#06090f] py-20 lg:py-28 overflow-hidden" aria-label="사업영역">
      {/* 섹션 헤더 */}
      <div ref={ref} className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20 mb-10 lg:mb-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
              className="text-[10.5px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-3 flex items-center gap-2"
            >
              <span className="block w-5 h-[1px] bg-orange-500" />
              Business Area
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.08 }}
              className="font-black text-white tracking-[-0.04em] leading-none"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              사업영역
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: E, delay: 0.2 }}
          >
            <Link
              href="/business"
              className="group hidden sm:inline-flex items-center gap-2 text-[12px] font-bold text-white/40 hover:text-white transition-colors"
            >
              전체 제품
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Swiper 슬라이더 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: E, delay: 0.15 }}
        className="pl-6 lg:pl-10 xl:pl-20 relative"
      >
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={20}
          slidesPerView={1.15}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 2.8, spaceBetween: 28 },
            1280: { slidesPerView: 3.2, spaceBetween: 28 },
          }}
          a11y={{ prevSlideMessage: "이전 제품", nextSlideMessage: "다음 제품" }}
          className="!overflow-visible"
        >
          {PRODUCTS.map((p) => (
            <SwiperSlide key={p.id}>
              <Link href={p.href} className="group block relative overflow-hidden bg-zinc-900 aspect-[3/4]">
                {/* 영상 */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90"
                >
                  <source src={p.videoSrc} type="video/mp4" />
                </video>

                {/* 그라데이션 */}
                <div className={`absolute inset-0 bg-gradient-to-t ${p.color} via-transparent to-transparent opacity-90`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* 넘버 */}
                <div className="absolute top-5 right-5 font-black text-white/15 text-[3.5rem] leading-none tracking-tight select-none">
                  {p.num}
                </div>

                {/* 텍스트 */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-orange-400 mb-2">{p.nameEn}</p>
                  <h3 className="text-[1.4rem] font-black text-white tracking-tight mb-3 leading-tight">{p.name}</h3>
                  <p className="text-[12.5px] text-white/55 leading-[1.7] mb-4 line-clamp-2">{p.desc}</p>

                  {/* 스펙 */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.specs.map((s, i) => (
                      <span key={i} className="text-[10px] font-semibold text-white/60 border border-white/20 px-2 py-0.5">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-orange-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    자세히 보기
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
