"use client";

import { useEffect, useRef, useState } from "react";
import s from "./StatsHighlightSection.module.css";

const STATS = [
  { label: "업력", value: 40, suffix: "년+", desc: "운반하역 외길, 축적된 시공 노하우", bars: [45, 60, 72, 86, 100] },
  { label: "누적 시공", value: 520, suffix: "건+", desc: "전국 현장의 납품·설치 실적", bars: [35, 52, 68, 84, 100] },
  { label: "최대 하중", value: 350, suffix: "TON", desc: "그라브 갠트리크레인 시공 실적", bars: [30, 50, 70, 88, 100] },
];

function CountUp({ target, run }: { target: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const dur = 1200;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return <>{n.toLocaleString()}</>;
}

export default function StatsHighlightSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={s.section} aria-label="주요 실적" ref={ref}>
      <div className="container">
        <div className={s.header}>
          <p className={s.eyebrow}>Performance</p>
          <h2 className={s.headline}>숫자로 보는 세종호이스트크레인</h2>
        </div>

        <div className={s.grid}>
          {STATS.map((st) => (
            <div key={st.label} className={s.card}>
              <div className={s.top}>
                <p className={s.cardLabel}>{st.label}</p>
                <p className={s.number}>
                  <CountUp target={st.value} run={visible} />
                  <span className={s.suffix}>{st.suffix}</span>
                </p>
                <p className={s.cardDesc}>{st.desc}</p>
              </div>
              <div className={s.bars} aria-hidden>
                {st.bars.map((h, i) => (
                  <span
                    key={i}
                    className={s.bar}
                    style={{ height: visible ? `${h}%` : "0%", transitionDelay: `${i * 90}ms` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
