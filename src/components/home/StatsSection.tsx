"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  {
    number: 1984,
    suffix: "",
    prefix: "",
    label: "설립 연도",
    desc: "40년 이상의 산업용\n크레인 전문 제조 이력",
  },
  {
    number: 500,
    suffix: "+",
    prefix: "",
    label: "누적 납품 건수",
    desc: "대기업·중소기업·공공기관\n전국 주요 산업 현장 납품",
  },
  {
    number: 200,
    suffix: "T",
    prefix: "",
    label: "최대 인양 하중",
    desc: "고객 요구사양에 따른\n맞춤형 중량물 설계 납품",
  },
  {
    number: 98,
    suffix: "%",
    prefix: "",
    label: "고객 재주문율",
    desc: "품질과 A/S로 검증된\n장기 파트너십 유지",
  },
];

const E = [0.22, 1, 0.36, 1] as never;

function AnimatedNumber({ target, suffix, prefix, trigger }: { target: number; suffix: string; prefix: string; trigger: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, target]);

  return (
    <span className="tabular-nums">
      {prefix}{current.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#0B1E4E] py-20 lg:py-28" aria-label="주요 실적">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: E, delay: i * 0.1 }}
              className="bg-[#0B1E4E] px-8 py-12 lg:py-14 xl:px-12 group hover:bg-[#122466] transition-colors duration-300"
            >
              <div
                className="font-black text-white tracking-[-0.04em] leading-none mb-3"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
              >
                <AnimatedNumber
                  target={s.number}
                  suffix={s.suffix}
                  prefix={s.prefix}
                  trigger={inView}
                />
              </div>
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-orange-400 mb-3">
                {s.label}
              </p>
              <p className="text-[12.5px] text-white/45 leading-[1.8] whitespace-pre-line hidden lg:block">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
