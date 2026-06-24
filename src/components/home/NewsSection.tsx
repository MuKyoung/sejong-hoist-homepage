import Link from "next/link";

const NEWS = [
  { num: "01", date: "2026.06.10", title: "세종호이스트크레인, 반도체 클린룸 전용 크레인 개발 완료" },
  { num: "02", date: "2026.05.22", title: "국내 최대 규모 200톤급 천장크레인 준공식 성료" },
  { num: "03", date: "2026.04.15", title: "산업통상자원부 장관 표창 수상 — 산업기계 부문" },
  { num: "04", date: "2026.03.08", title: "2026년 상반기 신입·경력사원 공개채용 안내" },
  { num: "05", date: "2026.02.20", title: "ISO 9001:2015 품질경영시스템 인증 갱신 완료" },
  { num: "06", date: "2026.01.30", title: "IoT 기반 크레인 원격 모니터링 시스템 특허 취득" },
  { num: "07", date: "2025.12.05", title: "경기도 안산 신공장 증설 완공 — 생산능력 40% 확대" },
];

export default function NewsSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        {/* 헤딩 - 한화 "고객을 향하는 기술, 미래를 향한 도전" 스타일 */}
        <div className="mb-4">
          <p className="text-[#f47c20] text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">Newsroom</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p
                className="text-[#0a1c4a] font-bold leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                현장을 향하는 기술, 고객을 향한 신뢰.
              </p>
              <p
                className="text-gray-400 font-bold leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                세종호이스트크레인의 다양한 모습을 만나보세요.
              </p>
            </div>
            <Link href="/support/notice" className="text-[#0a1c4a] text-sm font-semibold link-underline self-start md:self-auto shrink-0">
              뉴스룸 전체 보기 →
            </Link>
          </div>
        </div>

        {/* 번호형 리스트 - 한화 스타일 */}
        <div className="mt-14 border-t border-gray-100">
          {NEWS.map((item, i) => (
            <Link
              key={i}
              href="/support/notice"
              className="news-item flex items-start md:items-center gap-6 py-6 border-b border-gray-100 hover:pl-3 transition-all duration-200 group"
            >
              {/* 번호 */}
              <span className="text-gray-200 font-black text-2xl md:text-3xl leading-none w-10 flex-shrink-0 group-hover:text-[#f47c20]/40 transition-colors">
                {item.num}
              </span>

              {/* 날짜 */}
              <span className="hidden md:block text-gray-400 text-sm font-mono w-28 flex-shrink-0">
                {item.date}
              </span>

              {/* 제목 */}
              <span className="text-gray-800 font-medium text-sm md:text-base flex-1 group-hover:text-[#0a1c4a] transition-colors">
                {item.title}
              </span>

              {/* 화살표 */}
              <span className="text-gray-300 group-hover:text-[#f47c20] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0">
                →
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
