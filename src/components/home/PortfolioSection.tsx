import Image from "next/image";
import Link from "next/link";

const ITEMS = [
  { src: "/images/sejong_1.png", title: "이중거더 천장크레인", sub: "반도체 제조 현장 · 30T" },
  { src: "/images/sejong_2.png", title: "대용량 천장크레인",   sub: "발전소 · 200T" },
  { src: "/images/sejong_3.png", title: "야외 갠트리크레인",   sub: "물류센터 · 50T" },
  { src: "/images/sejong_4.png", title: "대형 갠트리크레인",   sub: "중공업 현장 · 100T" },
];

export default function PortfolioSection() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        {/* 헤딩 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[#f47c20] text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              Portfolio
            </p>
            <h2
              className="text-[#0a1c4a] font-bold leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              현장에서 증명된<br />세종호이스트크레인의 납품실적
            </h2>
          </div>
          <Link href="/portfolio" className="text-[#0a1c4a] text-sm font-semibold link-underline self-start md:self-auto shrink-0">
            납품실적 전체 보기 →
          </Link>
        </div>

        {/* 그리드 - 비대칭 레이아웃 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* 첫 번째: 크게 */}
          <div className="col-span-2 row-span-2 relative overflow-hidden group" style={{ minHeight: "420px" }}>
            <Image
              src={ITEMS[0].src}
              alt={ITEMS[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-7">
              <p className="text-white/50 text-xs mb-1">{ITEMS[0].sub}</p>
              <p className="text-white font-bold text-xl">{ITEMS[0].title}</p>
            </div>
          </div>

          {/* 나머지 3개 */}
          {ITEMS.slice(1).map((item, i) => (
            <div key={i} className="relative overflow-hidden group" style={{ minHeight: "200px" }}>
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-white/50 text-[10px] mb-0.5">{item.sub}</p>
                <p className="text-white font-semibold text-sm">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
