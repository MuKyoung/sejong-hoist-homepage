import Link from "next/link";
import Image from "next/image";

const footerLinks = [
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
      { label: "AS 시스템", href: "https://sejong-hoist.vercel.app", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#060f30] text-white">
      {/* 상단 */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* 회사 정보 */}
            <div className="lg:col-span-2">
              <Image
                src="/images/sejong-logo.png"
                alt="세종호이스트크레인"
                width={140}
                height={35}
                className="h-9 w-auto brightness-0 invert mb-6"
              />
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                세종호이스트크레인은 천장크레인, 갠트리크레인,<br />
                호이스트 분야의 전문 제조기업으로<br />
                산업 현장의 안전과 효율을 책임집니다.
              </p>
              <div className="space-y-2 text-sm text-white/50">
                <p>
                  <span className="text-white/30 mr-2">TEL</span>
                  <a href="tel:0317771234" className="hover:text-orange-400 transition-colors">031-777-1234</a>
                </p>
                <p>
                  <span className="text-white/30 mr-2">FAX</span>
                  031-777-5678
                </p>
                <p>
                  <span className="text-white/30 mr-2">EMAIL</span>
                  <a href="mailto:info@sejong-hoist.com" className="hover:text-orange-400 transition-colors">
                    info@sejong-hoist.com
                  </a>
                </p>
                <p>
                  <span className="text-white/30 mr-2">ADDR</span>
                  경기도 안산시 단원구 산단로 XXX
                </p>
              </div>
            </div>

            {/* 링크 그룹 */}
            {footerLinks.map((group, idx) => (
              <div key={idx}>
                <h4 className="text-white font-semibold text-sm mb-5 pb-3 border-b border-white/10">
                  {group.title}
                </h4>
                <ul className="space-y-2.5">
                  {group.links.map((link, lidx) => (
                    <li key={lidx}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/50 hover:text-orange-400 text-sm transition-colors flex items-center gap-1"
                        >
                          {link.label}
                          <span className="text-xs">↗</span>
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-white/50 hover:text-orange-400 text-sm transition-colors"
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

      {/* 하단 카피라이트 */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} SEJONG HOIST & CRANE. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">개인정보처리방침</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white/60 transition-colors">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
