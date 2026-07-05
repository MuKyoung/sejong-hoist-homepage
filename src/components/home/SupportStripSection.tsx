import Link from "next/link";
import s from "./SupportStripSection.module.css";

const CELLS = [
  {
    href: "/support/inquiry",
    title: "온라인 문의",
    desc: "견적·기술 문의를\n온라인으로 접수합니다.",
  },
  {
    href: "/support",
    title: "고객지원",
    desc: "공지사항과 A/S 안내를\n확인할 수 있습니다.",
  },
  {
    href: "/about/location",
    title: "오시는 길",
    desc: "세종특별자치시 부강면\n오시는 길을 안내합니다.",
  },
];

export default function SupportStripSection() {
  return (
    <section className={s.section} aria-label="고객지원 바로가기">
      <div className="container">
        <div className={s.strip}>
          <div className={`${s.cell} ${s.splitCell}`}>
            <Link href="/business" className={s.half}>
              <span className={s.halfTitle}>사업영역</span>
            </Link>
            <Link href="/portfolio" className={s.half}>
              <span className={s.halfTitle}>시공사례</span>
            </Link>
          </div>

          {CELLS.map((cell) => (
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
