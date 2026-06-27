"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import s from "./MissionStatsSection.module.css";

const STATS = [
  {
    label: "누적 시공 실적",
    number: 500,
    suffix: "+",
    full: "500+",
    chip: "2026년 6월 기준",
  },
  {
    label: "최대 인양 하중",
    number: 350,
    suffix: "TON",
    full: "350TON",
    chip: "그라브 갠트리크레인",
  },
  {
    label: "제품 라인업",
    number: 5,
    suffix: "종",
    full: "5종",
    chip: "Wire·Chain·Crane·방폭·부품",
  },
];

function Counter({ to, trigger }: { to: number; trigger: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const dur = 1600;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, to]);
  return <>{val}</>;
}

export default function MissionStatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={s.section} aria-label="주요 실적">
      <div className="container" ref={ref}>
        <h2 className={s.headline}>
          운반하역 현장에서
          <br />
          누구나 안전한 설비를 누릴 수 있는 세상을 만듭니다.
        </h2>

        <div className={s.stats}>
          {STATS.map((stat) => (
            <div key={stat.label} className={s.stat}>
              <p className={s.statLabel}>{stat.label}</p>
              <div className={s.statNumberWrap}>
                <span className={s.statNumber}>
                  <Counter to={stat.number} trigger={inView} />
                </span>
              </div>
              <p className={s.statFull}>{stat.full}</p>
              <span className={s.chip}>{stat.chip}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
