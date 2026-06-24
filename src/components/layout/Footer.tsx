import Link from "next/link";
import Image from "next/image";

const FOOTER_NAV = [
  {
    title: "회사소개",
    links: [
      { label: "기업개요", href: "/about" },
      { label: "CEO 인사말", href: "/about/ceo" },
      { label: "연혁", href: "/about/history" },
      { label: "찾아오시는 길", href: "/about/location" },
    ],
  },
  {
    title: "사업영역",
    links: [
      { label: "천장크레인", href: "/business/overhead-crane" },
      { label: "갠트리크레인", href: "/business/gantry-crane" },
      { label: "호이스트", href: "/business/hoist" },
      { label: "특수크레인", href: "/business/special-crane" },
    ],
  },
  {
    title: "납품실적",
    links: [
      { label: "납품실적 보기", href: "/portfolio" },
    ],
  },
  {
    title: "고객지원",
    links: [
      { label: "공지사항", href: "/support/notice" },
      { label: "온라인 문의", href: "/support/inquiry" },
      { label: "AS 시스템 ↗", href: "https://sejong-hoist.vercel.app", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      {/* ── 상단: 로고 + 회사정보 + 링크 ── */}
      <div className="bg-[#f8fafc] border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-20">

            {/* 좌: 로고 + 회사 정보 */}
            <div>
              <Image
                src="/images/sejong-logo.png"
                alt="세종호이스트크레인"
                width={148}
                height={40}
                className="h-10 w-auto mb-7"
              />
              <p className="text-slate-500 text-[13.5px] leading-[1.85] mb-7 max-w-[280px]">
                천장크레인·갠트리크레인·호이스트 전문 제조기업.<br />
                40년의 기술력으로 산업 현장의<br />
                안전과 효율을 책임집니다.
              </p>
              <div className="space-y-2.5 text-[13px]">
                <a
                  href="tel:0317771234"
                  className="flex items-center gap-3 group"
                >
                  <span className="text-[10.5px] font-bold tracking-[0.1em] text-slate-400 w-10">TEL</span>
                  <span className="text-slate-600 group-hover:text-orange-500 transition-colors font-medium">031-777-1234</span>
                </a>
                <div className="flex items-center gap-3">
                  <span className="text-[10.5px] font-bold tracking-[0.1em] text-slate-400 w-10">FAX</span>
                  <span className="text-slate-600">031-777-5678</span>
                </div>
                <a
                  href="mailto:info@sejong-hoist.com"
                  className="flex items-center gap-3 group"
                >
                  <span className="text-[10.5px] font-bold tracking-[0.1em] text-slate-400 w-10">EMAIL</span>
                  <span className="text-slate-600 group-hover:text-orange-500 transition-colors">info@sejong-hoist.com</span>
                </a>
                <div className="flex items-start gap-3">
                  <span className="text-[10.5px] font-bold tracking-[0.1em] text-slate-400 w-10 mt-0.5">ADDR</span>
                  <span className="text-slate-600">경기도 안산시 단원구 산단로 XXX</span>
                </div>
              </div>
            </div>

            {/* 우: 링크 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {FOOTER_NAV.map((group, idx) => (
                <div key={idx}>
                  <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-5">
                    {group.title}
                  </h4>
                  <ul className="space-y-3">
                    {group.links.map((link, lidx) => (
                      <li key={lidx}>
                        {"external" in link && link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[13.5px] text-slate-500 hover:text-orange-500 transition-colors flex items-center gap-1"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-[13.5px] text-slate-500 hover:text-[#0B1E4E] transition-colors"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 하단: 카피라이트 ── */}
      <div className="bg-[#0B1E4E]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11.5px] text-white/40 tracking-wide">
              © {new Date().getFullYear()} SEJONG HOIST &amp; CRANE Co., Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-[11.5px] text-white/40">
              <Link href="/privacy" className="hover:text-white/70 transition-colors">개인정보처리방침</Link>
              <span className="text-white/20">|</span>
              <Link href="/terms" className="hover:text-white/70 transition-colors">이용약관</Link>
              <span className="text-white/20">|</span>
              <Link href="/sitemap" className="hover:text-white/70 transition-colors">사이트맵</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
