"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import s from "./PortfolioSection.module.css";

const WORKS = [
  { id: 1, client: "현대제철",   cat: "천장크레인",  spec: "200T × 2대",    year: "2023", img: "/images/sejong_1.png", large: true },
  { id: 2, client: "한화솔루션", cat: "갠트리크레인", spec: "80T × 1대",     year: "2023", img: "/images/sejong_2.png", large: false },
  { id: 3, client: "LG화학",    cat: "특수크레인",  spec: "방폭 30T × 3대", year: "2022", img: "/images/sejong_3.png", large: false },
  { id: 4, client: "삼성중공업", cat: "갠트리크레인", spec: "120T × 4대",    year: "2022", img: "/images/sejong_4.png", large: true },
];

const CLIENTS = ["현대제철","한화솔루션","LG화학","삼성중공업","포스코","기아자동차","한국전력","현대모비스","SK하이닉스","롯데케미칼"];

const E = [0.22, 1, 0.36, 1] as never;

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={s.section} aria-label="납품실적">
      <div className={s.inner}>
        <div ref={ref} className={s.header}>
          <div>
            <motion.p className={s.tag}
              initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
            >
              <span className={s.tagLine} /> Portfolio
            </motion.p>
            <motion.h2 className={s.sectionTitle}
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.08 }}
            >
              주요 납품실적
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: E, delay: 0.2 }}
          >
            <Link href="/portfolio" className={s.allLink}>
              전체 실적 보기 <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>

        <div className={s.grid}>
          {WORKS.map((w, i) => (
            <motion.div
              key={w.id}
              className={`${s.card} ${w.large ? s.cardLarge : s.cardSquare}`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: E, delay: 0.05 * i }}
            >
              <Image src={w.img} alt={`${w.client} 납품 현장`} fill className={s.cardImg}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className={s.cardOverlay} />
              <span className={s.badge}>{w.cat}</span>
              <div className={s.cardInfo}>
                <div>
                  <p className={s.cardMeta}>{w.year} · {w.spec}</p>
                  <h3 className={s.cardClient}>{w.client}</h3>
                </div>
                <div className={s.cardArrow}><ArrowUpRight size={15} color="#ffffff" /></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className={s.clientsWrap}
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: E, delay: 0.5 }}
        >
          <p className={s.clientsLabel}>주요 납품처</p>
          <div className={s.marqueeOuter}>
            <div className={s.marqueeInner}>
              {[...CLIENTS, ...CLIENTS].map((name, i) => (
                <span key={i} className={s.clientName}>{name}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
