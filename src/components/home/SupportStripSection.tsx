import Link from "next/link";
import s from "./SupportStripSection.module.css";

type Locale = "ko" | "en";

const CELLS: Record<Locale, { href: string; title: string; desc: string }[]> = {
  ko: [
    { href: "/support/inquiry", title: "온라인 문의", desc: "견적·기술 문의를\n온라인으로 접수합니다." },
    { href: "/support", title: "고객지원", desc: "공지사항과 A/S 안내를\n확인할 수 있습니다." },
    { href: "/about/location", title: "오시는 길", desc: "세종특별자치시 부강면\n오시는 길을 안내합니다." },
  ],
  en: [
    { href: "/support/inquiry", title: "Online Inquiry", desc: "Request quotations and\ntechnical support online." },
    { href: "/support", title: "Customer Support", desc: "Notices and after-sales\nservice information." },
    { href: "/about/location", title: "Location", desc: "How to reach our plant\nin Sejong, Korea." },
  ],
};

const HALVES: Record<Locale, [string, string]> = {
  ko: ["사업영역", "시공사례"],
  en: ["Business", "Projects"],
};

export default function SupportStripSection({ locale = "ko" }: { locale?: Locale }) {
  const halves = HALVES[locale];
  return (
    <section className={s.section} aria-label={locale === "en" ? "Quick links" : "고객지원 바로가기"}>
      <div className="container">
        <div className={s.strip}>
          <div className={`${s.cell} ${s.splitCell}`}>
            <Link href="/business" className={s.half}>
              <span className={s.halfTitle}>{halves[0]}</span>
            </Link>
            <Link href="/portfolio" className={s.half}>
              <span className={s.halfTitle}>{halves[1]}</span>
            </Link>
          </div>

          {CELLS[locale].map((cell) => (
            <Link key={cell.href} href={cell.href} className={s.cell}>
              <span className={s.cellTitle}>{cell.title}</span>
              <span className={s.cellDesc}>{cell.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
