import Link from "next/link";
import { HOME_QUICKNAV } from "@/data/site";
import s from "./QuickNavSection.module.css";

export default function QuickNavSection() {
  return (
    <section className={s.section} aria-label="바로가기">
      <div className="container">
        <div className={s.grid}>
          {HOME_QUICKNAV.map((item) => (
            <Link key={item.href} href={item.href} className={s.card}>
              <span className={s.no}>{item.no}</span>
              <div className={s.body}>
                <p className={s.en}>{item.en}</p>
                <h3 className={s.title}>{item.title}</h3>
                <p className={s.desc}>{item.desc}</p>
              </div>
              <span className={s.more}>
                VIEW MORE
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
