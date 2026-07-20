"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const E = [0.16, 1, 0.3, 1] as never;

const DEMOS = [
  {
    num: "01",
    name: "APEX",
    subtitle: "다크 럭셔리",
    ref: "Apple × BMW × Caterpillar",
    palette: ["#060606", "#f0f0f0", "#e8721a"],
    desc: "순수한 어둠 위에 올린 거대한 타이포그래피. 제품이 침묵으로 말합니다. 선·장식 없음, 여백이 전부.",
    keys: ["패럴랙스 이미지", "클립 리빌 타이포", "물리 기반 카운터"],
    img: "/images/sejong_3.png",
    href: "/demo/1",
    dark: true,
  },
  {
    num: "02",
    name: "NEXUS",
    subtitle: "코퍼리트 커맨드",
    ref: "Samsung Semiconductor × Bloomberg",
    palette: ["#071129", "#f4f7fc", "#f47c20"],
    desc: "분할 화면에 라이브 데이터 대시보드. 실시간 운영 현황이 보이는 투명한 기업.",
    keys: ["실시간 메트릭 UI", "SVG 애니메이션 차트", "뉴스 스태거 리스트"],
    img: "/images/sejong_2.png",
    href: "/demo/2",
    dark: true,
  },
  {
    num: "03",
    name: "ATELIER",
    subtitle: "에디토리얼 마스터크래프트",
    ref: "Hermès × Aesop × Liebherr",
    palette: ["#f9f6f1", "#111111", "#9b7840"],
    desc: "크림 배경에 세리프 타이포그래피. 사진이 텍스트보다 크다. 브랜드 철학이 콘텐츠입니다.",
    keys: ["세리프 에디토리얼", "풀블리드 패럴랙스", "타임라인 라인 드로"],
    img: "/images/sejong_1.png",
    href: "/demo/3",
    dark: false,
  },
  {
    num: "04",
    name: "AUTHORITY",
    subtitle: "한국 기업 권위",
    ref: "Samsung.com × Hanwha Systems × SK",
    palette: ["#0f172a", "#f4f6f9", "#f47c20"],
    desc: "구조적 격자, 탭 제품 탐색, 어코디언 가치. 신뢰와 데이터로 설득하는 한국 기업 스탠다드.",
    keys: ["탭 기반 제품 탐색", "어코디언 핵심 가치", "인증 배너 + 고객사"],
    img: "/images/sejong_4.png",
    href: "/demo/4",
    dark: true,
  },
] as const;

type DemoEntry = {
  num: string; name: string; subtitle: string; ref: string;
  palette: readonly string[]; desc: string; keys: readonly string[];
  img: string; href: string; dark: boolean;
};

/* Round 2 (2026-07) : 운영 사이트의 헤더 · 히어로만 교체하는 A/B 시안 */
const HERO_DEMOS: readonly DemoEntry[] = [
  {
    num: "05",
    name: "IMMERSIVE",
    subtitle: "시안 A · 풀스크린 몰입형",
    ref: "현대일렉트릭 스타일 · 헤더 + 히어로",
    palette: ["#0B1523", "#FFFFFF", "#2C4A6E"],
    desc: "화면 전체를 채우는 영상 히어로 위에 투명 헤더. 스크롤하면 화이트 헤더로 전환되고, 메뉴에 올리면 풀와이드 메가 메뉴가 펼쳐집니다.",
    keys: ["풀스크린 영상 슬라이드", "투명 → 화이트 헤더", "풀와이드 메가 메뉴", "오토플레이 프로그레스"],
    img: "/images/hero-01.jpg",
    href: "/demo/5",
    dark: true,
  },
  {
    num: "06",
    name: "PORTAL",
    subtitle: "시안 B · 라운드 포털형",
    ref: "연세대학교 스타일 · 헤더 + 히어로",
    palette: ["#FFFFFF", "#2C4A6E", "#F1F4F9"],
    desc: "네이비 유틸 바를 얹은 2단 헤더, 라운드 배너 슬라이더, 아이콘 퀵링크 카드. 밝고 정돈된 포털형 첫인상입니다.",
    keys: ["2단 헤더 + 유틸 바", "라운드 배너 슬라이더", "아이콘 퀵링크 6종", "소프트 섀도 카드"],
    img: "/images/hero-02.jpg",
    href: "/demo/6",
    dark: false,
  },
  {
    num: "07",
    name: "MONUMENT",
    subtitle: "시안 C · 웅장한 헤비인더스트리",
    ref: "중공업 스탠다드 · 전체 페이지 리뉴얼",
    palette: ["#0C0F13", "#C69B54", "#EFECE6"],
    desc: "스틸 차콜에 브라스 골드를 얹은 대형 타이포 구성. 헤더부터 푸터까지 전체를 새로 짰고, 모션은 느리고 무겁게 흐릅니다.",
    keys: ["100svh 시네마틱 히어로", "하단 스펙바로 여백 마감", "느린 모션(리빌 1.3초)", "21:9 대표 시공사례"],
    img: "/images/hero-03.jpg",
    href: "/demo/7",
    dark: true,
  },
];

function DemoCard({ d, i }: { d: DemoEntry; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + i * 0.08, duration: 0.8, ease: E }}
    >
      <Link href={d.href} className="block group relative overflow-hidden"
        style={{ background: d.dark ? "#111" : "#f9f6f1" }}>

        {/* 이미지 */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <Image src={d.img} alt={d.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ filter: d.dark ? "brightness(0.25)" : "brightness(0.45) saturate(0.7)" }}
            sizes="(max-width:768px)100vw,50vw" />
          <div className="absolute inset-0" style={{
            background: d.dark
              ? "linear-gradient(to top, #111 0%, transparent 50%)"
              : "linear-gradient(to top, #f9f6f1 0%, transparent 50%)"
          }} />

          {/* 번호 */}
          <div className="absolute top-6 left-6">
            <span className="text-[11px] font-mono" style={{ color: d.dark ? "rgba(240,240,240,0.25)" : "rgba(17,17,17,0.3)" }}>
              {d.num}
            </span>
          </div>

          {/* 팔레트 */}
          <div className="absolute top-6 right-6 flex gap-1.5">
            {d.palette.map(c => (
              <span key={c} className="block w-4 h-4 rounded-full" style={{ background: c, border: "1px solid rgba(255,255,255,0.15)" }} />
            ))}
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div className="p-7 md:p-8" style={{ color: d.dark ? "#f0f0f0" : "#111" }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] font-mono mb-1.5" style={{ color: d.dark ? "rgba(240,240,240,0.28)" : "rgba(17,17,17,0.35)" }}>
                {d.subtitle}
              </p>
              <h2 className="text-2xl font-black tracking-tight">{d.name}</h2>
            </div>
            <span className="text-xl font-light opacity-25 group-hover:opacity-60 group-hover:translate-x-1 transition-all duration-300">→</span>
          </div>

          <p className="text-[12px] mb-5" style={{ color: d.dark ? "rgba(240,240,240,0.28)" : "rgba(17,17,17,0.38)" }}>
            레퍼런스: {d.ref}
          </p>
          <p className="text-[14px] leading-[1.75] mb-7" style={{ color: d.dark ? "rgba(240,240,240,0.5)" : "rgba(17,17,17,0.55)" }}>
            {d.desc}
          </p>

          <div className="flex flex-wrap gap-2">
            {d.keys.map(k => (
              <span key={k} className="text-[11px] px-2.5 py-1"
                style={{
                  background: d.dark ? "rgba(255,255,255,0.06)" : "rgba(17,17,17,0.06)",
                  color: d.dark ? "rgba(240,240,240,0.38)" : "rgba(17,17,17,0.42)",
                }}>
                {k}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DemoSelector() {
  return (
    <div className="min-h-screen font-sans" style={{ background: "#0a0a0a", color: "#f0f0f0" }}>

      {/* 헤더 */}
      <div className="container-xl py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: E }}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-[12px] font-mono mb-12"
            style={{ color: "rgba(240,240,240,0.28)" }}>
            ← 메인으로
          </Link>
          <p className="text-[11px] font-mono tracking-[0.35em] uppercase mb-4" style={{ color: "rgba(240,240,240,0.25)" }}>
            Design Demos v3.0
          </p>
          <h1 className="text-h1 mb-5">데모 디자인 선택</h1>
          <p className="text-[15px] leading-[1.8] max-w-xl" style={{ color: "rgba(240,240,240,0.4)" }}>
            시안을 선택하면 그 방향으로 사이트에 반영합니다. 라운드 2는 현재 운영
            사이트에서 헤더 · 히어로 영역만 교체한 A/B 시안이고, 라운드 1은 전체
            디자인 방향 데모입니다.
          </p>
        </motion.div>

        {/* 기술 스택 배지 */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2.5 mt-8"
        >
          {["Next.js 16 App Router", "TypeScript 5 strict", "Tailwind CSS v4", "Framer Motion 12", "Pretendard"].map(t => (
            <span key={t} className="text-[11px] font-mono px-3 py-1.5"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(240,240,240,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Round 2 : 헤더 · 히어로 A/B 시안 ── */}
      <div className="container-xl pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: E }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono font-bold tracking-[0.28em] uppercase px-2.5 py-1.5"
              style={{ background: "rgba(244,124,32,0.14)", color: "#f47c20" }}>
              NEW · Round 2
            </span>
            <span className="text-[11px] font-mono" style={{ color: "rgba(240,240,240,0.3)" }}>
              헤더 · 히어로 A/B 시안 · 2026-07
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight mb-3">메인 리뉴얼 시안 선택</h2>
          <p className="text-[14px] leading-[1.8] max-w-xl" style={{ color: "rgba(240,240,240,0.4)" }}>
            시안 A · B는 현재 운영 사이트에서 헤더와 히어로만 교체해 첫인상을 비교하는 안이고,
            시안 C는 헤더부터 푸터까지 전체를 새로 구성한 안입니다.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {HERO_DEMOS.map((d, i) => (
            <DemoCard key={d.num} d={d} i={i} />
          ))}
        </div>
      </div>

      {/* ── Round 1 : 전체 디자인 방향 데모 ── */}
      <div className="container-xl pb-24">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[10px] font-mono tracking-[0.28em] uppercase mb-6"
          style={{ color: "rgba(240,240,240,0.25)" }}
        >
          Round 1 · 전체 디자인 방향
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DEMOS.map((d, i) => (
            <DemoCard key={d.num} d={d} i={i} />
          ))}
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="container-xl pb-16" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-[12px] mt-10" style={{ color: "rgba(240,240,240,0.2)" }}>
          * 각 데모는 동일한 세종호이스트크레인 콘텐츠를 기반으로 하되, 완전히 다른 디자인 철학을 적용합니다.
          <br />* 라운드 2 시안(05 · 06)은 헤더와 히어로만 교체되며, 이하 섹션과 푸터는 운영 사이트 그대로입니다.
          <br />* 선택 후 해당 방향으로 실제 사이트에 반영합니다.
        </p>
      </div>
    </div>
  );
}
