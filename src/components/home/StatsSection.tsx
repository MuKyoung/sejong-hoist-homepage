"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import s from "./StatsSection.module.css";

const STATS = [
  { number: 40,  suffix: "년", label: "전문 제조 경력",  sub: "1984년 창업" },
  { number: 500, suffix: "+", label: "누적 납품 건수",  sub: "대·중소기업, 공공기관" },
  { number: 200, suffix: "T", label: "최대 인양 하중",  sub: "맞춤형 설계 대응" },
  { number: 98,  suffix: "%", label: "재주문율",         sub: "품질과 A/S 신뢰" },
];

const E = [0.22, 1, 0.36, 1] as never;

function Counter({ to, suffix, trigger }: { to: number; suffix: string; trigger: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const dur = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - prog, 4)) * to));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, to]);
  return <>{val.toLocaleString()}{suffix}</>;
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className={s.section} aria-label="주요 실적">
      <div aria-hidden className={s.bg40}>40</div>
      <div ref={ref} className={s.inner}>
        <motion.p
          className={s.tag}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: E }}
        >
          <span className={s.tagLine} />
          Key Figures
        </motion.p>
        <div className={s.grid}>
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className={s.item}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: i * 0.08 }}
            >
              <div className={s.num}>
                <Counter to={stat.number} suffix={stat.suffix} trigger={inView} />
              </div>
              <p className={s.label}>{stat.label}</p>
              <p className={s.sub}>{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
