"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { CheckCircle2, Timer, ShieldCheck, Wrench } from "lucide-react";

const VALUES = [
  {
    id: "quality",
    icon: <CheckCircle2 size={20} />,
    tab: "제조 역량",
    title: "자체 공장 직납,\n품질을 직접 통제합니다",
    body: "국내 자체 생산 시설을 통해 핵심 부품부터 완성품까지 전 공정을 내재화했습니다. 납기 준수율 99%, ISO 9001 품질관리 시스템으로 일관된 품질을 보장합니다.",
    metrics: [
      { label: "납기 준수율", value: "99%" },
      { label: "불량 반품률", value: "0.3%↓" },
    ],
    img: "/images/sejong_1.png",
  },
  {
    id: "design",
    icon: <Wrench size={20} />,
    tab: "맞춤 설계",
    title: "카탈로그가 아닌\n현장 분석에서 시작합니다",
    body: "단순 규격 제품 납품이 아닌, 고객의 생산 공정·환경·하중 조건을 직접 분석하여 최적 사양을 제안합니다. 방폭·클린룸·내열 등 특수 환경도 대응 가능합니다.",
    metrics: [
      { label: "맞춤 설계 비율", value: "65%" },
      { label: "현장 재설계 사례", value: "0건" },
    ],
    img: "/images/sejong_2.png",
  },
  {
    id: "service",
    icon: <Timer size={20} />,
    tab: "A/S 대응",
    title: "가동 중단 시간을\n최소화하는 빠른 대응",
    body: "전국 서비스 네트워크로 긴급 요청 시 24시간 이내 현장 출동합니다. 예방 정비 계획 수립을 통해 비계획적 가동 중단을 사전에 방지합니다.",
    metrics: [
      { label: "평균 출동 시간", value: "4.2h" },
      { label: "연간 예방정비 계약사", value: "120+" },
    ],
    img: "/images/sejong_3.png",
  },
  {
    id: "safety",
    icon: <ShieldCheck size={20} />,
    tab: "안전 기준",
    title: "법정 기준을 초과하는\n안전 설계 원칙",
    body: "산업안전보건법 기준 대비 130% 이상의 안전계수로 설계합니다. 전 제품 출하 전 125% 부하 테스트 및 전기·기계 안전장치 검증을 의무화합니다.",
    metrics: [
      { label: "안전계수", value: "130%+" },
      { label: "출하 전 부하 테스트", value: "125%" },
    ],
    img: "/images/sejong_4.png",
  },
];

const E = [0.22, 1, 0.36, 1] as never;

export default function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#f8fafc] py-20 lg:py-28 overflow-hidden" aria-label="세종호이스트 강점">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20">

        {/* 헤더 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
              className="text-[10.5px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-3 flex items-center gap-2"
            >
              <span className="w-5 h-[1px] bg-orange-500 block" />
              Why Sejong
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.08 }}
              className="font-black text-[#0B1E4E] tracking-[-0.04em] leading-none"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              선택하는 이유
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: E, delay: 0.2 }}
            className="text-[13.5px] text-slate-500 leading-[1.8] max-w-[380px] hidden lg:block"
          >
            1984년부터 오직 크레인과 호이스트만을 전문으로 해온 기업.<br />
            제조부터 A/S까지 일관된 책임으로 고객 현장을 지원합니다.
          </motion.p>
        </div>

        {/* Radix Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: E, delay: 0.2 }}
        >
          <Tabs.Root defaultValue="quality">
            {/* 탭 목록 */}
            <Tabs.List className="flex gap-1 mb-8 overflow-x-auto scrollbar-none pb-1" aria-label="강점 목록">
              {VALUES.map((v) => (
                <Tabs.Trigger
                  key={v.id}
                  value={v.id}
                  className="group flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 text-[12px] sm:text-[12.5px] font-bold text-slate-500 border border-transparent
                    data-[state=active]:bg-white data-[state=active]:text-[#0B1E4E] data-[state=active]:border-slate-200 data-[state=active]:shadow-sm
                    hover:text-slate-800 transition-all duration-200 whitespace-nowrap"
                >
                  <span className="text-orange-400 flex-shrink-0">{v.icon}</span>
                  {v.tab}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {/* 탭 콘텐츠 */}
            {VALUES.map((v) => (
              <Tabs.Content key={v.id} value={v.id} className="outline-none">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_420px] gap-6 md:gap-8 lg:gap-12 items-center bg-white border border-slate-100 p-6 lg:p-10 shadow-sm">
                  {/* 좌: 텍스트 */}
                  <div>
                    <div className="w-10 h-10 bg-orange-50 text-orange-500 flex items-center justify-center mb-6">
                      {v.icon}
                    </div>
                    <h3
                      className="font-black text-[#0B1E4E] tracking-[-0.025em] leading-[1.15] mb-5 whitespace-pre-line"
                      style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                    >
                      {v.title}
                    </h3>
                    <p className="text-[14px] text-slate-500 leading-[1.85] mb-8">{v.body}</p>

                    {/* 지표 */}
                    <div className="flex items-center gap-8">
                      {v.metrics.map((m, i) => (
                        <div key={i}>
                          <div className="text-[2rem] font-black text-[#0B1E4E] tracking-tight leading-none mb-1 tabular-nums">
                            {m.value}
                          </div>
                          <div className="text-[11.5px] text-slate-400 font-semibold">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 우: 이미지 */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 order-first lg:order-last">
                    <Image
                      src={v.img}
                      alt={v.tab}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 420px"
                    />
                  </div>
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </motion.div>
      </div>
    </section>
  );
}
