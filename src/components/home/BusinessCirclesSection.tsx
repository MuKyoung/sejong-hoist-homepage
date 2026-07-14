import Link from "next/link";
import { BUSINESS_AREAS, type BusinessAreaIcon } from "@/data/site";
import s from "./BusinessCirclesSection.module.css";
import Reveal from "./Reveal";

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
    case "monorail":
      return (
        <svg {...common}>
          <path d="M2 5h20" />
          <path d="M12 5v4" />
          <rect x="9" y="9" width="6" height="5" rx="0.5" />
          <path d="M12 14v3" />
          <path d="M10 19h4M12 17v2" />
        </svg>
      );
    case "suspension":
      return (
        <svg {...common}>
          <path d="M4 3v4M20 3v4" />
          <path d="M2 7h20" />
          <path d="M8 7v3M16 7v3" />
          <rect x="6" y="10" width="12" height="4" rx="0.5" />
          <path d="M12 14v3" />
          <path d="M12 19a2 2 0 1 0 0.001 0" />
        </svg>
      );
    case "jib":
      return (
        <svg {...common}>
          <path d="M5 21V4" />
          <path d="M3 21h6" />
          <path d="M5 5h13" />
          <path d="M5 9l8-4" />
          <path d="M16 5v5" />
          <path d="M14 12h4l-2 3z" />
        </svg>
      );
    case "grab":
      return (
        <svg {...common}>
          <path d="M12 2v5" />
          <path d="M7 9c0-2 2-3 5-3s5 1 5 3" />
          <path d="M7 9c-2 1-3 3-2 5l3 4" />
          <path d="M17 9c2 1 3 3 2 5l-3 4" />
          <path d="M8 18h8" />
        </svg>
      );
  }
}

type Locale = "ko" | "en";

const T: Record<Locale, { title: string; subtitle: string }> = {
  ko: {
    title: "사업영역",
    subtitle: "설계부터 제작·설치·유지보수까지 운반하역 설비의 전 과정을 함께합니다.",
  },
  en: {
    title: "Business Areas",
    subtitle: "From design and fabrication to installation and maintenance, we cover the full lifecycle.",
  },
};

export default function BusinessCirclesSection({ locale = "ko" }: { locale?: Locale }) {
  const fills = [s.c1, s.c2, s.c3, s.c4];
  const t = T[locale];

  return (
    <section className={s.section} aria-label={t.title}>
      <div className="container">
        <Reveal>
        <div className={s.header}>
          <p className={s.eyebrow}>Business</p>
          <h2 className={s.title}>{t.title}</h2>
          <p className={s.subtitle}>{t.subtitle}</p>
        </div>
        </Reveal>

        <Reveal bare>
        <div className={s.circles}>
          {BUSINESS_AREAS.map((area, i) => (
            <Link
              key={area.title}
              href={area.href}
              className={`${s.circle} ${fills[i % fills.length]}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={s.circleIcon}>
                <AreaIcon name={area.icon} />
              </span>
              <span className={s.circleTitle}>
                {locale === "en" ? area.en : area.title}
              </span>
              {locale === "ko" && <span className={s.circleEn}>{area.en}</span>}
            </Link>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
