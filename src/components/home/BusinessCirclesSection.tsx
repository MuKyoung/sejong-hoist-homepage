import Link from "next/link";
import { BUSINESS_AREAS } from "@/data/site";
import s from "./BusinessCirclesSection.module.css";

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
              <span className={s.circleTitle}>{area.title}</span>
              <span className={s.circleEn}>{area.en}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
