"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import s from "./StatsSection.module.css";

const STATS = [
  { number: 350, suffix: "T",  label: "최대 인양 하중",   sub: "그라브 갠트리크레인" },
  { number: 500, suffix: "+",  label: "누적 시공 실적",   sub: "공공기관·민간기업 포함" },
  { number: 5,   suffix: "종", label: "제품 라인업",      sub: "Wire·Chain·방폭·Crane·부품" },
  { number: 24,  suffix: "h",  label: "긴급 A/S 대응",   sub: "전국 출동 서비스" },
];

const E = [0.2, 0.6, 0.25, 1] as never;

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
