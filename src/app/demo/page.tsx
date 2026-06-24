import Link from "next/link";
import Image from "next/image";

const DEMOS = [
  {
    num: "01",
    name: "PRESTIGE",
    subtitle: "다크 럭셔리 산업 브랜드",
    ref: "Tesla × Konecranes",
    desc: "테슬라의 제품 중심 미니멀리즘과 세계 1위 크레인 기업 Konecranes의 기술 권위를 결합. 다크 배경, 풀스크린 제품 섹션, 영화적 타이포그래피.",
    principles: [
      "Peak-End Rule — 충격적 오프닝 + 강력한 마감",
      "희소성 효과 — 맞춤 제작 프리미엄 포지셔닝",
      "유창성 효과 — 부드러운 애니메이션 = 품질 지각",
      "시각적 앵커링 — 200T 먼저 → 기대치 재설정",
    ],
    palette: ["#0a0a0a", "#1a1a1a", "#f47c20", "#9a9a9a"],
    href: "/demo/1",
    img: "/images/sejong_2.png",
    tag: "다크 · 럭셔리 · 제품 중심",
  },
  {
    num: "02",
    name: "COMMAND",
    subtitle: "기업 권위 대시보드",
    ref: "Samsung × 한화시스템",
    desc: "삼성반도체·한화시스템의 기업 권위와 데이터 시각화를 결합. 실시간 현황 대시보드, 업종별 납품 실적 차트, 고객사 티커.",
    principles: [
      "권위 편향 — 인증·수상·고객사로 신뢰 구축",
      "사회적 증거 — '현재 347개 현장 가동 중'",
      "앵커링 — 최대 숫자를 첫 화면에 배치",
      "FOMO — 실시간 느낌의 LIVE 대시보드",
    ],
    palette: ["#0a1c4a", "#f47c20", "#ffffff", "#f5f7fa"],
    href: "/demo/2",
    img: "/images/sejong_1.png",
    tag: "네이비 · 데이터 · 권위",
  },
  {
    num: "03",
    name: "CRAFT",
    subtitle: "에디토리얼 장인 브랜드",
    ref: "Shinsegae ENC × Liebherr",
    desc: "신세계건설의 세련된 에디토리얼 감성과 세계적 중장비 기업 Liebherr의 장인 정신을 결합. 세리프 타이포그래피, 크림 배경, 스토리 중심 내러티브.",
    principles: [
      "미적 사용성 효과 — 아름다운 UI = 품질 지각",
      "제이가르닉 효과 — 미완성 리빌로 스크롤 유도",
      "헤일로 효과 — 디자인 품질 → 제품 품질 연상",
      "단순 노출 효과 — 반복 브랜드 노출 = 친숙함",
    ],
    palette: ["#f7f4f0", "#1a1a1a", "#c4a46b", "#6b6b6b"],
    href: "/demo/3",
    img: "/images/sejong_3.png",
    tag: "에디토리얼 · 세리프 · 스토리",
  },
  {
    num: "04",
    name: "HANWHA",
    subtitle: "한화시스템 직접 분석 스타일",
    ref: "hanwhasystems.com 직접 분석",
    desc: "한화시스템 사이트를 실제로 분석해 'CONNECT TO THE FUTURE' 초대형 타이포그래피 히어로, Persona 선택 UX, ESG 번호형 아코디언, 번호형 뉴스 리스트를 세종에 맞게 이식.",
    principles: [
      "타이포그래피 계층 효과 — 초대형 주제어 → 보조정보",
      "기대 확인(대기업 레이아웃 익숙함) — 인지적 신뢰 ↑",
      "능동적 참여 — Persona 선택 = IKEA 효과",
      "색 심리학 — Navy 권위 + Orange 행동 유발",
    ],
    palette: ["#0a1c4a", "#f47c20", "#f5f7fb", "#060f25"],
    href: "/demo/4",
    img: "/images/sejong_4.png",
    tag: "한화시스템 · 번호형 · Persona",
  },
];

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* 헤더 */}
      <div className="border-b border-white/5 px-6 md:px-14 py-5 flex items-center justify-between">
        <Link href="/">
          <Image src="/images/sejong-logo.png" alt="SEJONG" width={120} height={30} className="h-7 w-auto brightness-0 invert" />
        </Link>
        <p className="text-white/30 text-xs tracking-[0.15em] uppercase">Design Demo</p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-16">
        {/* 타이틀 */}
        <div className="mb-16">
          <p className="text-[#f47c20] text-[10px] tracking-[0.3em] uppercase mb-4">세종호이스트크레인 디자인 데모</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ letterSpacing: "-0.03em" }}>
            3가지 디자인 방향
          </h1>
          <p className="text-white/40 text-base max-w-2xl leading-relaxed">
            8개 레퍼런스 사이트 분석 + Konecranes·Liebherr 세계 사례 리서치를 바탕으로 도출한 3가지 디자인 시스템. 각 데모는 독립적인 디자인 언어와 심리학 원리를 적용합니다.
          </p>
        </div>

        {/* 데모 카드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0.5 bg-white/5">
          {DEMOS.map((demo) => (
            <Link key={demo.num} href={demo.href} className="group bg-[#0d0d0d] p-8 md:p-10 hover:bg-[#141414] transition-colors relative overflow-hidden flex flex-col">
              {/* 배경 이미지 힌트 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                <Image src={demo.img} alt="" fill className="object-cover" />
              </div>

              {/* 번호 */}
              <p className="text-white/5 font-black text-8xl absolute -top-4 -right-2 leading-none select-none">
                {demo.num}
              </p>

              <div className="relative z-10 flex flex-col flex-1">
                {/* 태그 */}
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-5">{demo.tag}</p>

                {/* 제목 */}
                <h2 className="text-3xl font-black mb-1 group-hover:text-[#f47c20] transition-colors" style={{ letterSpacing: "-0.02em" }}>
                  {demo.name}
                </h2>
                <p className="text-white/40 text-sm mb-2">{demo.subtitle}</p>
                <p className="text-[#f47c20]/60 text-[11px] tracking-wider uppercase mb-6">{demo.ref}</p>

                {/* 설명 */}
                <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1">{demo.desc}</p>

                {/* 색상 팔레트 */}
                <div className="flex gap-2 mb-8">
                  {demo.palette.map((color, ci) => (
                    <div key={ci} className="w-6 h-6 rounded-sm border border-white/10" style={{ background: color }} title={color} />
                  ))}
                </div>

                {/* 심리학 원리 */}
                <div className="mb-8">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/20 mb-3">적용 심리학</p>
                  <ul className="space-y-1.5">
                    {demo.principles.map((p, pi) => (
                      <li key={pi} className="flex items-start gap-2 text-white/30 text-xs leading-snug">
                        <span className="text-[#f47c20] flex-shrink-0 mt-0.5">•</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-semibold text-white/50 group-hover:text-white transition-colors">
                  <span className="h-px w-6 bg-current group-hover:w-10 transition-all" />
                  데모 보기 →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 리서치 근거 */}
        <div className="mt-16 border-t border-white/5 pt-12">
          <p className="text-white/20 text-xs tracking-[0.2em] uppercase mb-8">리서치 기반</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Konecranes", desc: "세계 1위 크레인 기업", insight: "데이터·디지털 통합 = 신뢰" },
              { name: "Liebherr", desc: "독일 중장비 명가", insight: "뉴스 = 활성 기업 신호" },
              { name: "Tesla.com", desc: "제품 중심 미니멀", insight: "단일 포커스 = 전환율 ↑" },
              { name: "Shinsegae ENC", desc: "한국 고급 건설", insight: "에디토리얼 = 브랜드 가치 ↑" },
            ].map((r, i) => (
              <div key={i} className="p-5 border border-white/5">
                <p className="text-white font-semibold text-sm mb-1">{r.name}</p>
                <p className="text-white/30 text-xs mb-3">{r.desc}</p>
                <p className="text-[#f47c20]/60 text-[10px]">→ {r.insight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-white/20 hover:text-white text-sm transition-colors">
            ← 메인 사이트로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
