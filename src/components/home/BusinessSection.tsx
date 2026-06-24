import Link from "next/link";
import Image from "next/image";

export default function BusinessSection() {
  return (
    <section className="bg-[#0d1a3a]">
      {/* 상단 헤딩 - 한화 "첨단 디지털 방산기술과 ICT 기술과의 시너지" 스타일 */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 pt-20 pb-14">
        <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-3">
          천장크레인부터 특수크레인까지,
        </h2>
        <h2 className="text-white/50 text-2xl md:text-4xl font-bold leading-tight">
          세종호이스트크레인의 기술이 산업현장을 바꿉니다.
        </h2>
      </div>

      {/* 분할 패널 - 한화 Defense/ICT */}
      <div className="flex flex-col md:flex-row">

        {/* 왼쪽 패널: 크레인 (Defense 포지션) */}
        <div className="biz-panel flex-1 relative min-h-[480px] md:min-h-[540px] group cursor-pointer">
          <Image
            src="/images/sejong_2.png"
            alt="천장크레인"
            fill
            className="object-cover brightness-50 group-hover:brightness-40 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c4a]/90 via-[#0a1c4a]/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14">
            <p className="text-[#f47c20] text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              Crane
            </p>
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-5">크레인</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
              첨단 기술을 기반으로 천장크레인, 갠트리크레인 분야에서 산업현장이 필요로 하는 최상의 솔루션을 제공합니다.
            </p>

            <ul className="space-y-2 mb-10">
              {["천장크레인", "갠트리크레인"].map(item => (
                <li key={item}>
                  <Link
                    href="/business"
                    className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors group/link"
                  >
                    <span className="w-5 h-px bg-white/20 group-hover/link:w-8 group-hover/link:bg-[#f47c20] transition-all duration-200" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/business"
              className="inline-flex items-center gap-2 text-white text-sm font-semibold link-underline w-fit"
            >
              사업영역 전체 보기 →
            </Link>
          </div>
        </div>

        {/* 오른쪽 패널: 호이스트 & 특수 (ICT 포지션) */}
        <div className="biz-panel flex-1 relative min-h-[480px] md:min-h-[540px] group cursor-pointer">
          <Image
            src="/images/sejong_3.png"
            alt="호이스트 & 특수크레인"
            fill
            className="object-cover brightness-50 group-hover:brightness-40 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060f25]/90 via-[#060f25]/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14">
            <p className="text-[#f47c20] text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              Hoist & Special
            </p>
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-5">호이스트 & 특수</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
              최고의 기술력과 노하우로 호이스트부터 반도체·원자력 특수 크레인까지 맞춤형 솔루션을 제공합니다.
            </p>

            <ul className="space-y-2 mb-10">
              {["호이스트", "특수크레인"].map(item => (
                <li key={item}>
                  <Link
                    href="/business"
                    className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors group/link"
                  >
                    <span className="w-5 h-px bg-white/20 group-hover/link:w-8 group-hover/link:bg-[#f47c20] transition-all duration-200" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/business"
              className="inline-flex items-center gap-2 text-white text-sm font-semibold link-underline w-fit"
            >
              사업영역 전체 보기 →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
