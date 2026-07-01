import Link from "next/link";
import { BUSINESS_AREAS, type BusinessAreaIcon } from "@/data/site";
import s from "./BusinessAreasSection.module.css";

function AreaIcon({ name }: { name: BusinessAreaIcon }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
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

export default function BusinessAreasSection() {
  return (
    <section className={s.section} aria-label="사업영역">
      <div className="container">
        <div className={s.header}>
          <p className={s.eyebrow}>Business Areas</p>
          <h2 className={s.headline}>운반하역 현장의 처음부터 끝까지</h2>
          <p className={s.lead}>
            설계·제작·설치·유지보수까지, 세종호이스트크레인이 한 번에 책임집니다.
          </p>
        </div>

        <div className={s.grid}>
          {BUSINESS_AREAS.map((area) => (
            <Link key={area.title} href={area.href} className={s.card}>
              <span className={s.icon}>
                <AreaIcon name={area.icon} />
              </span>
              <h3 className={s.cardTitle}>{area.title}</h3>
              <p className={s.cardEn}>{area.en}</p>
              <p className={s.cardDesc}>{area.desc}</p>
              <span className={s.more}>자세히 보기 →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
