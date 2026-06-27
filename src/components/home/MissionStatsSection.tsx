"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import s from "./MissionStatsSection.module.css";

const STATS = [
  {
    id: "projects",
    label: "누적 시공 실적",
    number: 500,
    full: "500+",
    chip: "2026년 6월 기준",
    visual: "trend" as const,
  },
  {
    id: "tonnage",
    label: "최대 인양 하중",
    number: 350,
    full: "350TON",
    chip: "그라브 갠트리크레인",
    visual: "gauge" as const,
    max: 400,
  },
  {
    id: "lineup",
    label: "제품 라인업",
    number: 5,
    full: "5종",
    chip: "Wire·Chain·Crane·방폭·부품",
    visual: "segments" as const,
  },
];

const YEARLY = [
  { year: "2021", value: 68 },
  { year: "2022", value: 82 },
  { year: "2023", value: 95 },
  { year: "2024", value: 112 },
  { year: "2025", value: 128 },
];

const INDUSTRIES = [
  { name: "전자·반도체", pct: 35 },
  { name: "자동차·부품", pct: 28 },
  { name: "철강·중공업", pct: 22 },
  { name: "공공·연구", pct: 15 },
];

const PRODUCTS = [
  { name: "Wire Hoist", pct: 35, color: "#2d91ff" },
  { name: "Crane", pct: 30, color: "#192d82" },
  { name: "Chain Hoist", pct: 15, color: "#0257d7" },
  { name: "방폭 Hoist", pct: 12, color: "#728094" },
  { name: "부품", pct: 8, color: "#cae7ff" },
];

const MAX_YEAR = Math.max(...YEARLY.map((y) => y.value));

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

function TrendBars({ active }: { active: boolean }) {
  return (
    <div className={s.trendBars} aria-hidden>
      {YEARLY.map((item) => (
        <div key={item.year} className={s.trendCol}>
          <div
            className={s.trendBar}
            style={{
              height: active ? `${(item.value / MAX_YEAR) * 100}%` : "0%",
            }}
          />
          <span className={s.trendYear}>{item.year.slice(2)}</span>
        </div>
      ))}
    </div>
  );
}

function GaugeBar({ value, max, active }: { value: number; max: number; active: boolean }) {
  const pct = (value / max) * 100;
  return (
    <div className={s.gauge} aria-hidden>
      <div className={s.gaugeTrack}>
        <div
          className={s.gaugeFill}
          style={{ width: active ? `${pct}%` : "0%" }}
        />
        <div className={s.gaugeMark} style={{ left: `${pct}%` }} />
      </div>
      <div className={s.gaugeScale}>
        <span>0</span>
        <span>100T</span>
        <span>200T</span>
        <span>300T</span>
        <span>{max}T</span>
      </div>
    </div>
  );
}

function SegmentRow({ count, active }: { count: number; active: boolean }) {
  const labels = ["Wire", "Chain", "Crane", "방폭", "부품"];
  return (
    <div className={s.segmentRow} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${s.segment} ${active ? s.segmentOn : ""}`}
          style={{ transitionDelay: active ? `${i * 80}ms` : "0ms" }}
        >
          <span className={s.segmentLabel}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ active }: { active: boolean }) {
  let acc = 0;
  const gradient = PRODUCTS.map((p) => {
    const start = acc;
    acc += p.pct;
    return `${p.color} ${start}% ${acc}%`;
  }).join(", ");

  return (
    <div className={s.donutWrap}>
      <div
        className={`${s.donut} ${active ? s.donutActive : ""}`}
        style={{ background: active ? `conic-gradient(${gradient})` : undefined }}
        aria-hidden
      >
        <div className={s.donutHole}>
          <span className={s.donutCenter}>5</span>
          <span className={s.donutCenterSub}>제품군</span>
        </div>
      </div>
      <ul className={s.legend}>
        {PRODUCTS.map((p) => (
          <li key={p.name} className={s.legendItem}>
            <span className={s.legendDot} style={{ background: p.color }} />
            <span className={s.legendName}>{p.name}</span>
            <span className={s.legendPct}>{p.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
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
            <div key={stat.id} className={s.statCard}>
              <p className={s.statLabel}>{stat.label}</p>
              <span className={s.statNumber}>
                <Counter to={stat.number} trigger={inView} />
              </span>
              <p className={s.statFull}>{stat.full}</p>
              <span className={s.chip}>{stat.chip}</span>

              <div className={s.statVisual}>
                {stat.visual === "trend" && <TrendBars active={inView} />}
                {stat.visual === "gauge" && (
                  <GaugeBar value={stat.number} max={stat.max ?? 400} active={inView} />
                )}
                {stat.visual === "segments" && (
                  <SegmentRow count={stat.number} active={inView} />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={s.charts}>
          <article className={s.chartCard}>
            <h3 className={s.chartTitle}>연도별 시공 추이</h3>
            <p className={s.chartDesc}>최근 5년간 납품·시공 건수</p>
            <div className={s.barChart} role="img" aria-label="2021년 68건에서 2025년 128건까지 증가">
              {YEARLY.map((item) => (
                <div key={item.year} className={s.barCol}>
                  <span className={s.barValue}>{item.value}</span>
                  <div className={s.barTrack}>
                    <div
                      className={s.barFill}
                      style={{ height: inView ? `${(item.value / MAX_YEAR) * 100}%` : "0%" }}
                    />
                  </div>
                  <span className={s.barLabel}>{item.year}</span>
                </div>
              ))}
            </div>
          </article>

          <article className={s.chartCard}>
            <h3 className={s.chartTitle}>산업별 납품 비율</h3>
            <p className={s.chartDesc}>주요 납품처 산업 분포</p>
            <ul className={s.hBarList}>
              {INDUSTRIES.map((item, i) => (
                <li key={item.name} className={s.hBarItem}>
                  <span className={s.hBarName}>{item.name}</span>
                  <div className={s.hBarTrack}>
                    <div
                      className={s.hBarFill}
                      style={{
                        width: inView ? `${item.pct}%` : "0%",
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                  </div>
                  <span className={s.hBarPct}>{item.pct}%</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${s.chartCard} ${s.chartCardWide}`}>
            <h3 className={s.chartTitle}>제품군 구성</h3>
            <p className={s.chartDesc}>누적 시공 기준 제품군 비중</p>
            <DonutChart active={inView} />
          </article>
        </div>
      </div>
    </section>
  );
}
