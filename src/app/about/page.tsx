import Image from "next/image";
import Link from "next/link";

const subNav = [
  { label: "기업개요", href: "/about" },
  { label: "CEO 인사말", href: "/about/ceo" },
  { label: "연혁", href: "/about/history" },
  { label: "찾아오시는 길", href: "/about/location" },
];

export default function AboutPage() {
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
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">ABOUT</p>
          <h1 className="text-white text-5xl font-bold mb-4">회사소개</h1>
          <p className="text-white/50">세종호이스트크레인을 소개합니다</p>
        </div>
      </section>

      {/* 서브 네비게이션 */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-[1400px] mx-auto px-6">
          <nav className="flex gap-8 overflow-x-auto">
            {subNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-4 text-sm font-semibold whitespace-nowrap border-b-2 border-[#0a1f5c] text-[#0a1f5c]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 기업개요 콘텐츠 */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="section-label mb-4">COMPANY OVERVIEW</p>
              <h2 className="text-4xl font-bold text-[#0a1f5c] mb-8 leading-tight title-line">
                산업의 심장,<br />크레인을 만드는 기업
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                세종호이스트크레인은 1984년 창립 이래 40년 이상의 기술력을 바탕으로 천장크레인, 갠트리크레인, 호이스트 분야의 전문 제조기업으로 성장해왔습니다.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                반도체, 자동차, 철강, 조선, 발전 등 국내 주요 산업 현장에 세종의 크레인이 설치되어 있으며, 정밀한 설계와 견고한 제작, 철저한 품질관리로 고객의 신뢰를 얻어왔습니다.
              </p>
              <p className="text-gray-600 leading-relaxed mb-10">
                앞으로도 지속적인 기술 개발과 고객 중심의 서비스로 산업 현장의 안전과 효율을 책임지는 기업이 되겠습니다.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "설립", value: "1984년" },
                  { label: "업종", value: "산업용 크레인 제조" },
                  { label: "대표이사", value: "홍길동" },
                  { label: "소재지", value: "경기도 안산시" },
                ].map((info) => (
                  <div key={info.label} className="border-l-2 border-orange-500 pl-4">
                    <p className="text-gray-400 text-xs mb-1">{info.label}</p>
                    <p className="text-[#0a1f5c] font-bold">{info.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square rounded-none overflow-hidden">
                <Image
                  src="/images/sejong_2.png"
                  alt="세종호이스트크레인 시공 현장"
                  fill
                  className="object-cover"
                />
              </div>
              {/* 강조 카드 */}
              <div className="absolute -bottom-8 -left-8 bg-[#0a1f5c] text-white p-8 shadow-2xl">
                <p className="text-4xl font-black text-orange-400">40+</p>
                <p className="text-sm text-white/70 mt-1">Years of<br />Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-3">CORE VALUES</p>
            <h2 className="text-3xl font-bold text-[#0a1f5c]">세종이 추구하는 가치</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "안전 최우선",
                desc: "모든 크레인은 최고 수준의 안전 기준을 충족하도록 설계하고 제작합니다. 고객의 안전이 세종의 최우선 가치입니다.",
              },
              {
                num: "02",
                title: "기술 혁신",
                desc: "지속적인 R&D 투자와 기술 개발로 더 강하고 더 정밀한 크레인을 만들어 갑니다.",
              },
              {
                num: "03",
                title: "고객 신뢰",
                desc: "납품 전 과정에서 투명한 소통과 책임감 있는 서비스로 고객의 신뢰를 쌓아갑니다.",
              },
            ].map((value) => (
              <div key={value.num} className="bg-white p-10 group hover:shadow-xl transition-shadow duration-300">
                <p className="text-orange-500/20 font-black text-6xl mb-4">{value.num}</p>
                <h3 className="text-[#0a1f5c] text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
