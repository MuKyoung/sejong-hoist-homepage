import Link from "next/link";

const subNav = [
  { label: "공지사항", href: "/support/notice" },
  { label: "온라인 문의", href: "/support/inquiry" },
  { label: "AS 시스템", href: "https://sejong-hoist.vercel.app", external: true },
];

export default function SupportPage() {
  return (
    <>
      {/* 페이지 히어로 */}
      <section className="relative bg-[#0a1f5c] pt-32 pb-16">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">SUPPORT</p>
          <h1 className="text-white text-5xl font-bold mb-4">고객지원</h1>
          <p className="text-white/50">세종호이스트크레인 고객지원 센터</p>
        </div>
      </section>

      {/* 서브 네비게이션 */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-[1400px] mx-auto px-6">
          <nav className="flex gap-8 overflow-x-auto">
            {subNav.map((item) => (
              "external" in item && item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 text-sm font-semibold whitespace-nowrap border-b-2 border-transparent text-gray-400 hover:text-gray-700 flex items-center gap-1"
                >
                  {item.label} ↗
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-4 text-sm font-semibold whitespace-nowrap border-b-2 border-transparent text-gray-400 hover:text-gray-700"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>

      {/* 지원 옵션 */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-3">CUSTOMER SUPPORT</p>
            <h2 className="text-3xl font-bold text-[#0a1f5c]">무엇을 도와드릴까요?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                ),
                title: "공지사항",
                desc: "세종호이스트크레인의 최신 소식과 공지사항을 확인하세요.",
                href: "/support/notice",
                label: "공지사항 보기",
                external: false,
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                ),
                title: "온라인 문의",
                desc: "제품 구입, 견적, 기술 상담 등 궁금한 점을 문의해 주세요.",
                href: "/support/inquiry",
                label: "문의하기",
                external: false,
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                  </svg>
                ),
                title: "AS 시스템",
                desc: "현장 AS 보고서 작성, 장비 현황 조회, 관리자 승인을 처리합니다.",
                href: "https://sejong-hoist.vercel.app",
                label: "AS 시스템 접속",
                external: true,
              },
            ].map((card) => (
              <div key={card.title} className="bg-gray-50 p-10 group hover:bg-[#0a1f5c] transition-colors duration-300 cursor-pointer">
                <div className="text-[#0a1f5c] group-hover:text-orange-400 transition-colors mb-6">
                  {card.icon}
                </div>
                <h3 className="text-[#0a1f5c] group-hover:text-white text-xl font-bold mb-3 transition-colors">{card.title}</h3>
                <p className="text-gray-500 group-hover:text-white/50 text-sm leading-relaxed mb-8 transition-colors">{card.desc}</p>
                {card.external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a1f5c] group-hover:text-orange-400 transition-colors border-b border-current pb-0.5"
                  >
                    {card.label} ↗
                  </a>
                ) : (
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a1f5c] group-hover:text-orange-400 transition-colors border-b border-current pb-0.5"
                  >
                    {card.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section className="py-20 bg-[#060f30]">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">CONTACT</p>
          <h2 className="text-white text-3xl font-bold mb-8">직접 연락하세요</h2>
          <div className="flex flex-wrap justify-center gap-8 text-white/50 text-sm">
            <div className="text-center">
              <p className="text-white/30 text-xs mb-1">대표번호</p>
              <a href="tel:0317771234" className="text-white text-xl font-bold hover:text-orange-400 transition-colors">031-777-1234</a>
            </div>
            <div className="w-px bg-white/10 hidden md:block" />
            <div className="text-center">
              <p className="text-white/30 text-xs mb-1">팩스</p>
              <p className="text-white text-xl font-bold">031-777-5678</p>
            </div>
            <div className="w-px bg-white/10 hidden md:block" />
            <div className="text-center">
              <p className="text-white/30 text-xs mb-1">이메일</p>
              <a href="mailto:info@sejong-hoist.com" className="text-white text-xl font-bold hover:text-orange-400 transition-colors">info@sejong-hoist.com</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
