"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { CheckCircle2, Timer, ShieldCheck, Wrench } from "lucide-react";
import s from "./ValuesSection.module.css";

const VALUES = [
  {
    id: "quality", icon: <CheckCircle2 size={20} />, tab: "제조 역량",
    title: "자체 공장 직납,\n품질을 직접 통제합니다",
    body: "국내 자체 생산 시설을 통해 핵심 부품부터 완성품까지 전 공정을 내재화했습니다. 납기 준수율 99%, ISO 9001 품질관리 시스템으로 일관된 품질을 보장합니다.",
    metrics: [{ label: "납기 준수율", value: "99%" }, { label: "불량 반품률", value: "0.3%↓" }],
    img: "/images/sejong_1.png",
  },
  {
    id: "design", icon: <Wrench size={20} />, tab: "맞춤 설계",
    title: "카탈로그가 아닌\n현장 분석에서 시작합니다",
    body: "단순 규격 제품 납품이 아닌, 고객의 생산 공정·환경·하중 조건을 직접 분석하여 최적 사양을 제안합니다. 방폭·클린룸·내열 등 특수 환경도 대응 가능합니다.",
    metrics: [{ label: "맞춤 설계 비율", value: "65%" }, { label: "현장 재설계 사례", value: "0건" }],
    img: "/images/sejong_2.png",
  },
  {
    id: "service", icon: <Timer size={20} />, tab: "A/S 대응",
    title: "가동 중단 시간을\n최소화하는 빠른 대응",
    body: "전국 서비스 네트워크로 긴급 요청 시 24시간 이내 현장 출동합니다. 예방 정비 계획 수립을 통해 비계획적 가동 중단을 사전에 방지합니다.",
    metrics: [{ label: "평균 출동 시간", value: "4.2h" }, { label: "예방정비 계약사", value: "120+" }],
    img: "/images/sejong_3.png",
  },
  {
    id: "safety", icon: <ShieldCheck size={20} />, tab: "안전 기준",
    title: "법정 기준을 초과하는\n안전 설계 원칙",
    body: "산업안전보건법 기준 대비 130% 이상의 안전계수로 설계합니다. 전 제품 출하 전 125% 부하 테스트 및 전기·기계 안전장치 검증을 의무화합니다.",
    metrics: [{ label: "안전계수", value: "130%+" }, { label: "출하 전 부하 테스트", value: "125%" }],
    img: "/images/sejong_4.png",
  },
];

const E = [0.22, 1, 0.36, 1] as never;

export default function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={s.section} aria-label="세종호이스트 강점">
      <div className={s.inner}>
        <div ref={ref} className={s.header}>
          <div>
            <motion.p className={s.tag}
              initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
            >
              <span className={s.tagLine} /> Why Sejong
            </motion.p>
            <motion.h2 className={s.sectionTitle}
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.08 }}
            >
              선택하는 이유
            </motion.h2>
          </div>
          <motion.p className={s.headerDesc}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: E, delay: 0.2 }}
          >
            1984년부터 오직 크레인과 호이스트만을 전문으로 해온 기업.<br />
            제조부터 A/S까지 일관된 책임으로 고객 현장을 지원합니다.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: E, delay: 0.2 }}
        >
          <Tabs.Root defaultValue="quality">
            <Tabs.List className={s.tabList} aria-label="강점 목록">
              {VALUES.map((v) => (
                <Tabs.Trigger key={v.id} value={v.id} className={s.tabTrigger}>
                  <span className={s.tabIcon}>{v.icon}</span>
                  {v.tab}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {VALUES.map((v) => (
              <Tabs.Content key={v.id} value={v.id} className={s.tabContent}>
                <div className={s.tabPanel}>
                  <div className={s.tabTextArea}>
                    <div className={s.tabIconBox}>{v.icon}</div>
                    <h3 className={s.tabTitle}>{v.title}</h3>
                    <p className={s.tabBody}>{v.body}</p>
                    <div className={s.metrics}>
                      {v.metrics.map((m, i) => (
                        <div key={i}>
                          <div className={s.metricNum}>{m.value}</div>
                          <div className={s.metricLabel}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={s.tabImage}>
                    <Image src={v.img} alt={v.tab} fill style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 300px, 420px"
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
