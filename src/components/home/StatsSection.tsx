"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 40, suffix: "+", label: "업력", sub: "Years of Experience" },
  { value: 500, suffix: "+", label: "납품 실적", sub: "Delivery Records" },
  { value: 99.8, suffix: "%", label: "고객 만족도", sub: "Customer Satisfaction", decimal: true },
  { value: 24, suffix: "H", label: "A/S 대응", sub: "Service Response" },
];

function CountUp({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {decimal ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-[#0a1f5c] relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">
            WHY SEJONG
          </p>
          <h2 className="text-white text-4xl font-bold">
            숫자로 증명하는<br />세종호이스트크레인
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/5 hover:bg-white/10 transition-colors p-10 text-center group"
            >
              <div className="text-5xl font-black text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                <CountUp target={stat.value} suffix={stat.suffix} decimal={stat.decimal} />
              </div>
              <p className="text-white font-semibold mb-1">{stat.label}</p>
              <p className="text-white/30 text-xs tracking-wider uppercase">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
