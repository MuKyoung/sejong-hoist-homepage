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
    id: "wire-hoist",
    num: "01", name: "Wire Hoist", nameEn: "Wire Rope Hoist",
    desc: "와이어 로프를 이용한 권상 장치. 중량물 인양에 최적화된 세종호이스트 주력 제품입니다. Single / Double Girder 모두 적용 가능합니다.",
    href: "/business/wire-hoist",
    videoSrc: "/videos/4763-179741146_medium.mp4",
    specs: ["0.5T ~ 350T", "Single·Double Girder", "전국 A/S"],
  },
  {
    id: "chain-hoist",
    num: "02", name: "Chain Hoist", nameEn: "Electric Chain Hoist",
    desc: "체인을 이용한 전동식 권상 장치. 컴팩트한 설계로 좁은 공간에도 설치 가능하며 경량 중량물에 탁월합니다.",
    href: "/business/chain-hoist",
    videoSrc: "/videos/5497-184226939_medium.mp4",
    specs: ["0.25T ~ 20T", "모노레일 적용 가능", "저소음 설계"],
  },
  {
    id: "explosion-proof-hoist",
    num: "03", name: "Explosion-Proof", nameEn: "Explosion-Proof Hoist",
    desc: "위험물 취급 현장을 위한 방폭형 호이스트. 석유화학·가스·도장 공장 등 폭발 위험 환경에 안전하게 적용됩니다.",
    href: "/business/explosion-proof-hoist",
    videoSrc: "/videos/4764-179741142_medium.mp4",
    specs: ["방폭 Ex 인증", "위험 Zone 1·2 대응", "내화학성 소재"],
  },
  {
    id: "crane",
    num: "04", name: "Crane", nameEn: "Overhead / Gantry Crane",
    desc: "Single·Double Girder 천장크레인, 갠트리크레인, 그라브크레인 등 현장 조건에 맞는 최적의 크레인을 설계·제작합니다.",
    href: "/business/crane",
    videoSrc: "/videos/4768-179741152_medium.mp4",
    specs: ["Max 350T (그라브)", "야외·실내 범용", "맞춤형 설계"],
  },
  {
    id: "hoist-crane",
    num: "05", name: "Hoist & Crane", nameEn: "Components & Parts",
    desc: "크레인 및 호이스트 핵심 부품 공급. 충돌방지 장치·리밋스위치·인버터 등 정품 부품을 신속하게 공급합니다.",
    href: "/business/hoist-crane",
    videoSrc: "/videos/4763-179741146_medium.mp4",
    specs: ["정품 부품 공급", "충돌방지 장치", "긴급 출동 대응"],
  },
];

const E = [0.2, 0.6, 0.25, 1] as never;

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
            제품소개
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: E, delay: 0.2 }}
        >
            <Link href="/business" className={s.allLink}>
              전체 제품 보기 <ArrowRight size={12} />
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
