"use client";

import { useState } from "react";
import Link from "next/link";

const VALUES = [
  {
    num: "01",
    label: "안전",
    en: "Safety",
    desc: "안전을 최우선의 가치로 생각하고, 모든 크레인이 최고 수준의 안전 기준을 충족하도록 설계·제작합니다.",
  },
  {
    num: "02",
    label: "기술",
    en: "Technology",
    desc: "지속적인 R&D 투자와 기술 개발로 더 강하고 더 정밀한 크레인을 만들어 갑니다. 특허 기술로 산업 표준을 이끕니다.",
  },
  {
    num: "03",
    label: "신뢰",
    en: "Trust",
    desc: "납품 전 과정에서 투명한 소통과 책임 있는 서비스로 고객의 신뢰를 쌓아갑니다. 40년이 그 증거입니다.",
  },
  {
    num: "04",
    label: "성장",
    en: "Growth",
    desc: "고객과 함께 성장하는 기업. 지속 가능한 미래를 위해 사회적 책임을 다하고 공동의 가치를 높여갑니다.",
  },
];

export default function ValuesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-0">
      <div className="max-w-[1400px] mx-auto">

        {/* 상단: 한화 "한화시스템은 모든 이해관계자의..." 스타일 */}
        <div className="px-8 md:px-16 pt-24 pb-16 border-b border-gray-100">
          <h2
            className="text-[#0a1c4a] font-bold leading-[1.15]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            세종호이스트크레인은
          </h2>
          <h2
            className="text-[#0a1c4a] font-bold leading-[1.15]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            고객의 신뢰를 바탕으로
          </h2>
          <h2
            className="text-gray-300 font-bold leading-[1.15]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            더 안전한 산업현장을
          </h2>
          <h2
            className="text-gray-300 font-bold leading-[1.15]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            만들어 갑니다
          </h2>
        </div>

        {/* 번호형 가치 목록 - 한화 ESG 스타일 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border-t border-gray-100">
          {VALUES.map((v, i) => (
            <button
              key={i}
              className={`text-left px-8 md:px-10 py-12 border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0 transition-colors duration-200 ${
                active === i ? "bg-[#0a1c4a]" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setActive(i)}
            >
              {/* 라벨 */}
              <p className={`text-[11px] font-semibold tracking-[0.18em] uppercase mb-5 transition-colors ${
                active === i ? "text-[#f47c20]" : "text-gray-400"
              }`}>
                {v.en}
              </p>

              {/* 번호 + 제목 */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className={`font-black text-5xl leading-none transition-colors ${
                  active === i ? "text-[#f47c20]/20" : "text-gray-100"
                }`}>
                  {v.num}
                </span>
                <span className={`text-xl font-bold transition-colors ${
                  active === i ? "text-white" : "text-[#0a1c4a]"
                }`}>
                  {v.label}
                </span>
              </div>

              {/* 설명 */}
              <p className={`text-sm leading-relaxed transition-colors ${
                active === i ? "text-white/60" : "text-gray-500"
              }`}>
                {v.desc}
              </p>

              {/* 하단 라인 */}
              <div className={`mt-8 h-px transition-all duration-300 ${
                active === i ? "bg-[#f47c20] w-10" : "bg-gray-200 w-6"
              }`} />
            </button>
          ))}
        </div>

        {/* 하단 링크 */}
        <div className="px-8 md:px-16 py-10 border-t border-gray-100">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[#0a1c4a] text-sm font-semibold link-underline"
          >
            세종호이스트크레인 더 알아보기 →
          </Link>
        </div>

      </div>
    </section>
  );
}
