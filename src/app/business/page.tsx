import Image from "next/image";
import Link from "next/link";

const businesses = [
  {
    id: "overhead-crane",
    title: "천장크레인",
    titleEn: "Overhead Crane",
    desc: "공장, 창고, 발전소 등 다양한 산업 현장에 최적화된 천장크레인. 단거더형부터 이중거더형까지, 현장 조건에 맞게 설계·제작합니다.",
    specs: [
      { label: "하중 범위", value: "1T ~ 500T" },
      { label: "스팬", value: "최대 40m" },
      { label: "양정", value: "최대 50m" },
      { label: "주행 속도", value: "최대 100m/min" },
    ],
    image: "/images/sejong_2.png",
    href: "/business/overhead-crane",
  },
  {
    id: "gantry-crane",
    title: "갠트리크레인",
    titleEn: "Gantry Crane",
    desc: "야외 작업장, 조선소, 물류센터에 최적화된 갠트리크레인. 레일 위를 주행하는 고정식부터 타이어 이동식까지 다양한 형태로 제작합니다.",
    specs: [
      { label: "하중 범위", value: "5T ~ 1,000T" },
      { label: "스팬", value: "최대 60m" },
      { label: "양정", value: "최대 30m" },
      { label: "방식", value: "레일형 / 타이어형" },
    ],
    image: "/images/sejong_3.png",
    href: "/business/gantry-crane",
  },
  {
    id: "hoist",
    title: "호이스트",
    titleEn: "Hoist",
    desc: "소형 정밀 작업부터 중량물 이동까지. 체인호이스트, 와이어로프호이스트, 전동식·수동식 등 다양한 모델로 현장 맞춤 공급합니다.",
    specs: [
      { label: "하중 범위", value: "0.5T ~ 50T" },
      { label: "양정", value: "최대 30m" },
      { label: "종류", value: "체인 / 와이어로프" },
      { label: "구동", value: "전동식 / 수동식" },
    ],
    image: "/images/sejong_1.png",
    href: "/business/hoist",
  },
  {
    id: "special-crane",
    title: "특수크레인",
    titleEn: "Special Crane",
    desc: "반도체 클린룸, 원자력 발전소, 방폭 환경 등 특수한 조건의 현장을 위한 맞춤형 크레인. 엄격한 품질 기준과 전문 기술로 제작합니다.",
    specs: [
      { label: "종류", value: "방폭형 / 클린룸 / 원자력" },
      { label: "적용", value: "반도체 / 발전 / 방산" },
      { label: "인증", value: "KS, ISO, 방폭 인증" },
      { label: "설계", value: "고객 맞춤형" },
    ],
    image: "/images/sejong_4.png",
    href: "/business/special-crane",
  },
];

export default function BusinessPage() {
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
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">BUSINESS</p>
          <h1 className="text-white text-5xl font-bold mb-4">사업영역</h1>
          <p className="text-white/50">세종호이스트크레인이 제공하는 제품과 서비스</p>
        </div>
      </section>

      {/* 사업 목록 */}
      <section className="py-0 bg-white">
        {businesses.map((biz, idx) => (
          <div
            key={biz.id}
            className={`grid grid-cols-1 lg:grid-cols-2 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
          >
            {/* 이미지 */}
            <div className={`relative overflow-hidden ${idx % 2 === 1 ? "lg:order-2" : ""}`} style={{ minHeight: "450px" }}>
              <Image
                src={biz.image}
                alt={biz.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#0a1f5c]/30" />
              <div className="absolute top-8 left-8">
                <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1.5 tracking-widest uppercase">
                  {biz.titleEn}
                </span>
              </div>
            </div>

            {/* 콘텐츠 */}
            <div className={`p-12 lg:p-16 flex flex-col justify-center ${idx % 2 === 1 ? "bg-[#0a1f5c] lg:order-1" : "bg-white"}`}>
              <p className={`text-xs font-bold tracking-widest uppercase mb-4 ${idx % 2 === 1 ? "text-orange-400" : "text-orange-500"}`}>
                {String(idx + 1).padStart(2, "0")}
              </p>
              <h2 className={`text-4xl font-bold mb-6 ${idx % 2 === 1 ? "text-white" : "text-[#0a1f5c]"}`}>
                {biz.title}
              </h2>
              <div className={`w-12 h-0.5 mb-6 ${idx % 2 === 1 ? "bg-orange-500" : "bg-orange-500"}`} />
              <p className={`text-base leading-relaxed mb-10 ${idx % 2 === 1 ? "text-white/60" : "text-gray-500"}`}>
                {biz.desc}
              </p>

              {/* 스펙 */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {biz.specs.map((spec) => (
                  <div key={spec.label} className={`border-l-2 pl-3 ${idx % 2 === 1 ? "border-orange-500/30" : "border-orange-500"}`}>
                    <p className={`text-xs mb-0.5 ${idx % 2 === 1 ? "text-white/30" : "text-gray-400"}`}>{spec.label}</p>
                    <p className={`font-semibold text-sm ${idx % 2 === 1 ? "text-white" : "text-[#0a1f5c]"}`}>{spec.value}</p>
                  </div>
                ))}
              </div>

              <Link
                href={biz.href}
                className={`inline-flex items-center gap-3 w-fit px-8 py-4 font-bold text-sm group transition-all duration-200 ${
                  idx % 2 === 1
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-[#0a1f5c] text-white hover:bg-[#1a3a8f]"
                }`}
              >
                자세히 보기
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
