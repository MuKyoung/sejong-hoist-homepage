"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import s from "./ContactSection.module.css";

const CONTACTS = [
  { icon: <Phone size={16} />, label: "대표 전화", value: "031-777-1234",
    sub: "평일 08:30 – 17:30", href: "tel:0317771234" },
  { icon: <Mail size={16} />, label: "이메일 문의", value: "info@sejong-hoist.co.kr",
    sub: "24시간 접수 · 1영업일 이내 회신", href: "mailto:info@sejong-hoist.co.kr" },
  { icon: <MapPin size={16} />, label: "본사 위치", value: "경기도 화성시 삼성1로 1",
    sub: "서해안고속도로 비봉IC 5분", href: "https://maps.google.com" },
];

const E = [0.22, 1, 0.36, 1] as never;

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={s.section} aria-label="상담 문의">
      <video autoPlay muted loop playsInline className={s.video}>
        <source src="/videos/4763-179741146_medium.mp4" type="video/mp4" />
      </video>
      <div className={s.overlay} />

      <div ref={ref} className={s.inner}>
        <div className={s.grid}>
          {/* 좌 */}
          <div>
            <motion.p className={s.tag}
              initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
            >
              <span className={s.tagLine} /> Contact Us
            </motion.p>
            <motion.h2 className={s.headline}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: E, delay: 0.07 }}
            >
              프로젝트를<br />함께 시작하세요
            </motion.h2>
            <motion.p className={s.body}
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.2 }}
            >
              현장 방문 또는 도면 검토가 무료입니다. 연락처와 현장 개요를 남겨주시면
              담당 엔지니어가 직접 회신드립니다.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: E, delay: 0.3 }}
            >
              <Link href="/support/inquiry" className={s.cta}>
                견적 문의하기 <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* 우: 카드 */}
          <motion.div
            className={s.cards}
            initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: E, delay: 0.25 }}
          >
            {CONTACTS.map((c, i) => (
              <a key={i} href={c.href} className={s.card} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <div className={s.cardIcon}>{c.icon}</div>
                <div>
                  <p className={s.cardLabel}>{c.label}</p>
                  <p className={s.cardValue}>{c.value}</p>
                  <p className={s.cardSub}>{c.sub}</p>
                </div>
                <ArrowRight size={14} className={s.cardArrow} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
