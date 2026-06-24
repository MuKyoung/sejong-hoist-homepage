"use client";

import { useState } from "react";
import Image from "next/image";

const categories = ["전체", "천장크레인", "갠트리크레인", "호이스트", "특수크레인"];

const portfolioItems = [
  { src: "/images/sejong_1.png", title: "이중거더 천장크레인", client: "반도체 제조사 A", category: "천장크레인", capacity: "30T", year: "2025" },
  { src: "/images/sejong_2.png", title: "대용량 천장크레인", client: "발전소 B", category: "천장크레인", capacity: "200T", year: "2024" },
  { src: "/images/sejong_3.png", title: "야외 갠트리크레인", client: "물류센터 C", category: "갠트리크레인", capacity: "50T", year: "2025" },
  { src: "/images/sejong_4.png", title: "대형 갠트리크레인", client: "중공업 D", category: "갠트리크레인", capacity: "100T", year: "2024" },
  { src: "/images/sejong_1.png", title: "단거더 천장크레인", client: "자동차 E", category: "천장크레인", capacity: "10T", year: "2023" },
  { src: "/images/sejong_2.png", title: "클린룸 크레인", client: "반도체 F", category: "특수크레인", capacity: "5T", year: "2025" },
  { src: "/images/sejong_3.png", title: "이동식 갠트리크레인", client: "조선소 G", category: "갠트리크레인", capacity: "80T", year: "2023" },
  { src: "/images/sejong_4.png", title: "전동 체인호이스트", client: "제조업 H", category: "호이스트", capacity: "3T", year: "2024" },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filtered = activeCategory === "전체"
    ? portfolioItems
    : portfolioItems.filter(i => i.category === activeCategory);

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
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">PORTFOLIO</p>
          <h1 className="text-white text-5xl font-bold mb-4">납품실적</h1>
          <p className="text-white/50">현장에서 증명된 세종호이스트크레인의 기술력</p>
        </div>
      </section>

      {/* 필터 */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex gap-6 overflow-x-auto py-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeCategory === cat
                    ? "border-[#0a1f5c] text-[#0a1f5c]"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 갤러리 */}
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[#0a1f5c] font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{item.client}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400">
                        <span className="font-semibold text-gray-700">{item.capacity}</span>
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-400">{item.year}년</span>
                    </div>
                    <span className="text-orange-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      자세히 →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              해당 카테고리의 납품실적이 없습니다.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
