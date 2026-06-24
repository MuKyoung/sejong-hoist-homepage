import Link from "next/link";

const notices = [
  { id: 6, date: "2026.06.10", category: "회사소식", title: "세종호이스트크레인, 반도체 클린룸 전용 크레인 개발 완료", important: true },
  { id: 5, date: "2026.05.22", category: "납품실적", title: "국내 최대 규모 200톤급 천장크레인 준공식 성료", important: false },
  { id: 4, date: "2026.04.15", category: "인증·수상", title: "산업통상자원부 장관 표창 수상 - 산업기계 부문", important: false },
  { id: 3, date: "2026.03.08", category: "채용", title: "2026년 상반기 신입·경력사원 공개채용 안내", important: false },
  { id: 2, date: "2026.02.20", category: "회사소식", title: "세종호이스트크레인, ISO 9001:2015 인증 갱신 완료", important: false },
  { id: 1, date: "2026.01.30", category: "기술", title: "IoT 기반 크레인 원격 모니터링 시스템 특허 취득", important: false },
];

const categoryColors: Record<string, string> = {
  "회사소식": "bg-blue-100 text-blue-700",
  "납품실적": "bg-orange-100 text-orange-700",
  "인증·수상": "bg-green-100 text-green-700",
  "채용": "bg-purple-100 text-purple-700",
  "기술": "bg-teal-100 text-teal-700",
};

export default function NoticePage() {
  return (
    <>
      <section className="relative bg-[#0a1f5c] pt-32 pb-16">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">NOTICE</p>
          <h1 className="text-white text-5xl font-bold mb-4">공지사항</h1>
          <p className="text-white/50">세종호이스트크레인의 새로운 소식을 전달합니다</p>
        </div>
      </section>

      <section className="py-16 bg-white min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="border border-gray-200">
            {/* 헤더 */}
            <div className="hidden md:grid grid-cols-[80px_120px_1fr_120px] bg-gray-50 border-b border-gray-200 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span>번호</span>
              <span>분류</span>
              <span>제목</span>
              <span className="text-right">날짜</span>
            </div>

            {notices.map((notice) => (
              <Link
                key={notice.id}
                href={`/support/notice/${notice.id}`}
                className="grid grid-cols-1 md:grid-cols-[80px_120px_1fr_120px] items-center px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
              >
                <span className="hidden md:block text-sm text-gray-400">{notice.id}</span>
                <span className={`hidden md:inline-flex text-xs font-semibold px-2 py-0.5 rounded w-fit ${categoryColors[notice.category] || "bg-gray-100 text-gray-600"}`}>
                  {notice.category}
                </span>
                <div className="flex items-center gap-3">
                  {notice.important && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 flex-shrink-0">중요</span>
                  )}
                  <span className="text-gray-800 font-medium group-hover:text-[#0a1f5c] transition-colors">
                    {notice.title}
                  </span>
                  <span className={`md:hidden text-xs font-semibold px-2 py-0.5 rounded flex-shrink-0 ${categoryColors[notice.category] || "bg-gray-100 text-gray-600"}`}>
                    {notice.category}
                  </span>
                </div>
                <span className="hidden md:block text-sm text-gray-400 text-right">{notice.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
