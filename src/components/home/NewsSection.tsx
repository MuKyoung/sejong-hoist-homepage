"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Megaphone, Award, Newspaper, Users } from "lucide-react";
import s from "./NewsSection.module.css";

const NEWS = [
  { id:1, cat:"수주", badge: s.badgeBlue,   icon:<Megaphone size={13}/>, date:"2024.11.15",
    title:"현대제철 당진 200T 천장크레인 공급 계약 체결",
    desc:"납기 2025년 3월 예정. 설치 후 3년 무상 A/S 포함." },
  { id:2, cat:"인증", badge: s.badgeGreen,  icon:<Award size={13}/>,     date:"2024.09.03",
    title:"ISO 9001:2015 품질경영시스템 갱신 인증 완료",
    desc:"3년 주기 심사 완료, 국제 품질 기준 지속 적합성 유지." },
  { id:3, cat:"보도", badge: s.badgePurple, icon:<Newspaper size={13}/>, date:"2024.07.22",
    title:"2024 스마트팩토리 솔루션 엑스포 A-23 부스 참가",
    desc:"창원 CECO, 최신 지능형 크레인 시스템 실물 시연 예정." },
  { id:4, cat:"채용", badge: s.badgeOrange, icon:<Users size={13}/>,     date:"2024.06.10",
    title:"2024 하반기 생산기술·영업직 신입/경력 공개 채용",
    desc:"크레인 설계·생산·현장관리·영업 분야 상시 지원 가능." },
];

const E = [0.22, 1, 0.36, 1] as never;

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
