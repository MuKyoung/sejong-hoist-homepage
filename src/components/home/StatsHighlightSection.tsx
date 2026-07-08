"use client";

import { useEffect, useRef, useState } from "react";
import s from "./StatsHighlightSection.module.css";

const STATS = [
  { label: "업력", value: 25, suffix: "년+", desc: "1999년 설립, 운반하역 외길" },
  { label: "누적 시공", value: 520, suffix: "건+", desc: "전국 현장의 납품·설치 실적" },
  { label: "최대 하중", value: 350, suffix: "TON", desc: "겐트리 크랩 크레인 시공 실적" },
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
        <div className={s.grid}>
          {STATS.map((st) => (
            <div key={st.label} className={s.cell}>
              <p className={s.label}>{st.label}</p>
              <p className={s.number}>
                <CountUp target={st.value} run={visible} />
                <span className={s.suffix}>{st.suffix}</span>
              </p>
              <p className={s.desc}>{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
