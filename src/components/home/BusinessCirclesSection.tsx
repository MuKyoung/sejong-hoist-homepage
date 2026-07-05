import Link from "next/link";
import { BUSINESS_AREAS, type BusinessAreaIcon } from "@/data/site";
import s from "./BusinessCirclesSection.module.css";

function AreaIcon({ name }: { name: BusinessAreaIcon }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "crane":
      return (
        <svg {...common}>
          <path d="M4 21V4h1l14 3" />
          <path d="M19 7v3" />
          <path d="M19 10v3l-4 0" />
          <path d="M15 13v3" />
          <rect x="13" y="16" width="4" height="4" rx="0.5" />
          <path d="M4 21h6" />
        </svg>
      );
    case "gantry":
      return (
        <svg {...common}>
          <path d="M3 20V6M21 20V6" />
          <path d="M2 6h20" />
          <path d="M12 6v6" />
          <rect x="9" y="12" width="6" height="4" rx="0.5" />
          <path d="M3 20h4M17 20h4" />
        </svg>
      );
    case "maintenance":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L4 17l3 3 5.4-5.3a4 4 0 0 0 5.3-5.4l-2.6 2.6-2.3-2.3 2.6-2.6z" />
        </svg>
      );
    case "steel":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V8l7-4 7 4v13" />
          <path d="M5 8l14 8M19 8L5 16" />
          <path d="M12 4v17" />
        </svg>
      );
  }
}

export default function BusinessCirclesSection() {
  const fills = [s.c1, s.c2, s.c3, s.c4];

  return (
    <section className={s.section} aria-label="사업영역">
      <div className="container">
        <div className={s.header}>
          <p className={s.eyebrow}>Business</p>
          <h2 className={s.title}>사업영역</h2>
          <p className={s.subtitle}>
            설계부터 제작·설치·유지보수까지 운반하역 설비의 전 과정을 함께합니다.
          </p>
        </div>

        <div className={s.circles}>
          {BUSINESS_AREAS.map((area, i) => (
            <Link
              key={area.title}
              href={area.href}
              className={`${s.circle} ${fills[i % fills.length]}`}
            >
              <span className={s.circleIcon}>
                <AreaIcon name={area.icon} />
              </span>
              <span className={s.circleTitle}>{area.title}</span>
              <span className={s.circleEn}>{area.en}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
