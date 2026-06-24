"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import "swiper/css";
import s from "./BusinessSection.module.css";

const PRODUCTS = [
  {
    id: "overhead-crane",
    num: "01", name: "천장크레인", nameEn: "Overhead Crane",
    desc: "공장 천장 레일에 설치되어 수평 이동과 수직 권상을 동시에 수행합니다. 최대 200톤까지 커스터마이징 설계가 가능합니다.",
    href: "/business/overhead-crane",
    videoSrc: "/videos/4763-179741146_medium.mp4",
    specs: ["Max 200T", "Span ≤ 32m", "25년+ 내구성"],
  },
  {
    id: "gantry-crane",
    num: "02", name: "갠트리크레인", nameEn: "Gantry Crane",
    desc: "지상 레일 위를 주행하는 문형 크레인으로 야외·실내 범용입니다. 조선소·철강·항만 등 중공업 현장에 특화 설계합니다.",
    href: "/business/gantry-crane",
    videoSrc: "/videos/5497-184226939_medium.mp4",
    specs: ["Max 120T", "IP65 방진·방수", "야외 설치 가능"],
  },
  {
    id: "hoist",
    num: "03", name: "호이스트", nameEn: "Electric Hoist",
    desc: "전동식 체인·와이어 권상 장치. 컴팩트한 설계로 협소 공간에도 설치 가능하며 KS 인증 정품을 공급합니다.",
    href: "/business/hoist",
    videoSrc: "/videos/4764-179741142_medium.mp4",
    specs: ["0.5T ~ 20T", "KS 인증", "단상·삼상 선택"],
  },
  {
    id: "special-crane",
    num: "04", name: "특수크레인", nameEn: "Special Crane",
    desc: "방폭·내열·클린룸 등 특수 환경용 크레인을 고객 공정에 맞춰 설계합니다. ATEX 인증 방폭 설계 가능합니다.",
    href: "/business/special-crane",
    videoSrc: "/videos/4768-179741152_medium.mp4",
    specs: ["방폭 ATEX", "Class 10K 클린룸", "완전 맞춤 설계"],
  },
];

const E = [0.22, 1, 0.36, 1] as never;

export default function BusinessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={s.section} aria-label="사업영역">
      {/* 섹션 헤더 */}
      <div ref={ref} className={s.header}>
        <div>
          <motion.p
            className={s.sectionTag}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: E }}
          >
            <span className={s.tagLine} />
            Business Area
          </motion.p>
          <motion.h2
            className={s.sectionTitle}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: E, delay: 0.08 }}
          >
            사업영역
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: E, delay: 0.2 }}
        >
          <Link href="/business" className={s.allLink}>
            전체 제품 <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>

      {/* Swiper 슬라이더 */}
      <motion.div
        className={s.swiperWrap}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: E, delay: 0.15 }}
      >
        <Swiper
          modules={[A11y]}
          spaceBetween={18}
          slidesPerView={1.15}
          breakpoints={{
            480:  { slidesPerView: 1.45, spaceBetween: 18 },
            640:  { slidesPerView: 1.8,  spaceBetween: 20 },
            768:  { slidesPerView: 2.2,  spaceBetween: 22 },
            1024: { slidesPerView: 2.8,  spaceBetween: 26 },
            1280: { slidesPerView: 3.2,  spaceBetween: 28 },
            1440: { slidesPerView: 3.8,  spaceBetween: 28 },
          }}
          style={{ overflow: "visible" }}
        >
          {PRODUCTS.map((p) => (
            <SwiperSlide key={p.id}>
              <Link href={p.href} className={s.card}>
                <video autoPlay muted loop playsInline className={s.cardVideo}>
                  <source src={p.videoSrc} type="video/mp4" />
                </video>
                <div className={s.cardGrad} />
                <div className={s.cardNum}>{p.num}</div>
                <div className={s.cardBody}>
                  <p className={s.cardEn}>{p.nameEn}</p>
                  <h3 className={s.cardName}>{p.name}</h3>
                  <p className={s.cardDesc}>{p.desc}</p>
                  <div className={s.cardSpecs}>
                    {p.specs.map((spec) => (
                      <span key={spec} className={s.cardSpec}>{spec}</span>
                    ))}
                  </div>
                  <div className={s.cardCta}>
                    자세히 보기 <ArrowUpRight size={12} />
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
