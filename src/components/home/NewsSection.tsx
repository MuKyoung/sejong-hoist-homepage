"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Megaphone, Award, Newspaper, Users } from "lucide-react";
import s from "./NewsSection.module.css";

const NEWS = [
  { id:1, cat:"시공", badge: s.badgeBlue,   icon:<Megaphone size={13}/>, date:"2024.11.15",
    title:"그라브 갠트리크레인 350TON 제작·설치 납품 완료",
    desc:"국내 최대급 그라브 갠트리크레인 시공 실적 달성." },
  { id:2, cat:"납품", badge: s.badgeGreen,  icon:<Award size={13}/>,     date:"2024.09.03",
    title:"엘에스일렉트릭㈜ Double Girder 5TON/10TON 크레인 납품",
    desc:"청주 2공장·수원공장 등 LS Electric 다수 현장 연속 시공." },
  { id:3, cat:"안내", badge: s.badgePurple, icon:<Newspaper size={13}/>, date:"2024.07.22",
    title:"방폭 호이스트 Single Girder 3TON 신규 라인업 추가",
    desc:"위험 Zone 1·2 대응 방폭형 호이스트 제품군 확대." },
  { id:4, cat:"문의", badge: s.badgeOrange, icon:<Users size={13}/>,     date:"2024.06.10",
    title:"온라인 견적 문의 시스템 운영 중",
    desc:"사이트 내 견적문의 페이지를 통해 24시간 접수 가능." },
];

const E = [0.2, 0.6, 0.25, 1] as never;

export default function NewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={s.section} aria-label="최신 소식">
      <div className={s.inner}>
        <div ref={ref} className={s.header}>
          <div>
            <motion.p className={s.tag}
              initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
            >
              <span className={s.tagLine} /> News &amp; Notice
            </motion.p>
            <motion.h2 className={s.sectionTitle}
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.08 }}
            >
              최신 소식
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: E, delay: 0.2 }}
          >
            <Link href="/support/notice" className={s.allLink}>
              전체 보기 <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>

        <div className={s.list}>
          {NEWS.map((item, i) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: E, delay: 0.08 + i * 0.07 }}
            >
              <Link href={`/support/notice/${item.id}`} className={s.item}>
                <span className={s.itemDate}>{item.date}</span>
                <span className={`${s.itemBadge} ${item.badge}`}>
                  {item.icon} {item.cat}
                </span>
                <div className={s.itemText}>
                  <p className={s.itemTitle}>{item.title}</p>
                  <p className={s.itemDesc}>{item.desc}</p>
                </div>
                <ArrowRight size={14} className={s.itemArrow} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
