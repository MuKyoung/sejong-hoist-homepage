import Link from "next/link";
import s from "./NewsSection.module.css";

const NEWS = [
  {
    id: 1,
    date: "2024.11.15",
    title: "그라브 갠트리크레인 350TON 제작·설치 납품 완료",
    desc: "국내 최대급 그라브 갠트리크레인 시공 실적을 달성했습니다.",
  },
  {
    id: 2,
    date: "2024.09.03",
    title: "엘에스일렉트릭㈜ Double Girder 5TON/10TON 크레인 납품",
    desc: "청주 2공장·수원공장 등 LS Electric 다수 현장 연속 시공.",
  },
  {
    id: 3,
    date: "2024.07.22",
    title: "방폭 호이스트 Single Girder 3TON 신규 라인업 추가",
    desc: "위험 Zone 1·2 대응 방폭형 호이스트 제품군을 확대했습니다.",
  },
  {
    id: 4,
    date: "2024.06.10",
    title: "온라인 견적 문의 시스템 운영 중",
    desc: "사이트 내 견적문의 페이지를 통해 24시간 접수가 가능합니다.",
  },
];

export default function NewsSection() {
  return (
    <section className={s.section} aria-label="주요 소식">
      <div className="container">
        <div className={s.header}>
          <div>
            <p className={s.eyebrow}>Team News</p>
            <h2 className={s.headline}>(주)세종호이스트크레인 주요 소식</h2>
          </div>
          <Link href="/support/notice" className={s.moreLink}>
            더보기
          </Link>
        </div>

        <div className={s.list}>
          {NEWS.map((item) => (
            <Link key={item.id} href={`/support/notice/${item.id}`} className={s.card}>
              <p className={s.cardDate}>{item.date}</p>
              <h3 className={s.cardTitle}>{item.title}</h3>
              <p className={s.cardDesc}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
