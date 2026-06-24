import Link from "next/link";
import Image from "next/image";

const LINKS = [
  {
    label: "제품 문의",
    desc: "크레인 도입 상담 및\n제품 사양 문의",
    href: "/support/inquiry",
  },
  {
    label: "현장 방문 상담",
    desc: "전문 엔지니어가\n현장을 직접 방문합니다",
    href: "/support/inquiry",
  },
  {
    label: "납품실적",
    desc: "세종의 크레인이\n설치된 현장들",
    href: "/portfolio",
  },
  {
    label: "AS 시스템",
    desc: "현장 보고서 작성\n및 장비 관리",
    href: "https://sejong-hoist.vercel.app",
    external: true,
  },
];

export default function ContactSection() {
  return (
    <section className="relative bg-[#060f25] overflow-hidden">
      {/* 배경 이미지 - 희미하게 */}
      <div className="absolute inset-0">
        <Image
          src="/images/sejong_4.png"
          alt=""
          fill
          className="object-cover opacity-10"
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 pt-24 pb-0">

        {/* 메인 텍스트 - 한화 "가슴속에 불꽃을 품고 있는 당신은..." 스타일 */}
        <h2
          className="text-white font-bold leading-[1.1] mb-2"
          style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
        >
          크레인 도입을 계획하고
        </h2>
        <h2
          className="text-white font-bold leading-[1.1] mb-12"
          style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
        >
          계신가요?
        </h2>

        {/* 링크 그리드 - 한화 인재채용 4개 카테고리 스타일 */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
          {LINKS.map((item, i) => (
            item.external ? (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-0 md:px-8 py-12 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-colors"
              >
                <p className="text-white font-bold text-lg md:text-xl mb-3 group-hover:text-[#f47c20] transition-colors">
                  {item.label}
                </p>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                  {item.desc}
                </p>
                <p className="mt-6 text-[#f47c20] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  바로가기 ↗
                </p>
              </a>
            ) : (
              <Link
                key={i}
                href={item.href}
                className="group px-0 md:px-8 py-12 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-colors"
              >
                <p className="text-white font-bold text-lg md:text-xl mb-3 group-hover:text-[#f47c20] transition-colors">
                  {item.label}
                </p>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                  {item.desc}
                </p>
                <p className="mt-6 text-[#f47c20] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  바로가기 →
                </p>
              </Link>
            )
          ))}
        </div>

      </div>
    </section>
  );
}
