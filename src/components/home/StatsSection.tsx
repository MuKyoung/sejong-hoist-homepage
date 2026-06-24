"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { number: 40, suffix: "년", label: "전문 제조 경력", sub: "1984년 창업" },
  { number: 500, suffix: "+", label: "누적 납품 건수", sub: "대·중소기업, 공공기관" },
  { number: 200, suffix: "T", label: "최대 인양 하중", sub: "맞춤형 설계 대응" },
  { number: 98, suffix: "%", label: "재주문율", sub: "품질과 A/S 신뢰" },
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
      const eased = 1 - Math.pow(1 - prog, 4);
      setVal(Math.round(eased * to));
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
    <section ref={ref} className="relative bg-white overflow-hidden py-20 lg:py-28" aria-label="주요 실적">
      {/* 배경 텍스처: 대형 반투명 숫자 */}
      <div
        aria-hidden
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 font-black text-slate-50 select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(12rem, 30vw, 28rem)", letterSpacing: "-0.06em" }}
      >
        40
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20">
        {/* 라벨 */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: E }}
          className="text-[10.5px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-12 lg:mb-16 flex items-center gap-2"
        >
          <span className="w-5 h-[1px] bg-orange-500 block" />
          Key Figures
        </motion.p>

        {/* 수치 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-slate-100">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: i * 0.08 }}
              className="md:px-7 lg:px-10 xl:px-14 first:pl-0 last:pr-0"
            >
              {/* 수치 */}
              <div
                className="font-black text-[#0B1E4E] tracking-[-0.05em] leading-none mb-3 tabular-nums"
                style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
              >
                <Counter to={s.number} suffix={s.suffix} trigger={inView} />
              </div>
              <p className="text-[13px] font-bold text-slate-700 mb-1">{s.label}</p>
              <p className="text-[11.5px] text-slate-400">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
