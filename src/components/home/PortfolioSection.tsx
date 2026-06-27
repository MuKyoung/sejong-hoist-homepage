"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import s from "./PortfolioSection.module.css";

const WORKS = [
  { id: 1, client: "엘에스일렉트릭㈜",      cat: "Double Girder Crane", spec: "5TON / 10TON",  year: "2024", img: "/images/sejong_1.png", large: true },
  { id: 2, client: "그라브 갠트리크레인",    cat: "Gantry Crane",        spec: "350TON",        year: "2023", img: "/images/sejong_2.png", large: false },
  { id: 3, client: "방폭 호이스트 크레인",   cat: "Explosion-Proof",     spec: "3TON Single",   year: "2023", img: "/images/sejong_3.png", large: false },
  { id: 4, client: "한국자동차연구원",        cat: "Overhead Crane",      spec: "천장크레인",     year: "2022", img: "/images/sejong_4.png", large: true },
];

const CLIENTS = ["엘에스일렉트릭㈜","한국자동차연구원","자동차부품인증시험센터","여수산업안전체험교육장","항공보안장비시험인증센터","강원특별자치도","㈜JKS","미디어테크","우양","KR 산업"];

const E = [0.2, 0.6, 0.25, 1] as never;

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
              시공사례
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: E, delay: 0.2 }}
          >
            <Link href="/portfolio" className={s.allLink}>
              전체 시공사례 <ArrowRight size={12} />
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
          <p className={s.clientsLabel}>주요 시공처</p>
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
