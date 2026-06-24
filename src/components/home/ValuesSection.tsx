"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { CheckCircle2, Timer, ShieldCheck, Wrench } from "lucide-react";
import s from "./ValuesSection.module.css";

const VALUES = [
  {
    id: "wire", icon: <CheckCircle2 size={20} />, tab: "Wire Hoist",
    title: "중량물 인양의 핵심,\nWire Rope Hoist",
    body: "와이어 로프 방식의 권상 장치로 0.5T부터 350T까지 폭넓은 하중 범위를 커버합니다. Single·Double Girder 모두 적용 가능하며 엘에스일렉트릭 등 대형 공장에 다수 납품된 검증된 제품입니다.",
    metrics: [{ label: "최대 하중", value: "350T" }, { label: "시공 실적", value: "500+" }],
    img: "/images/sejong_1.png",
  },
  {
    id: "chain", icon: <Wrench size={20} />, tab: "Chain Hoist",
    title: "소형·경량에 최적화된\nChain Hoist",
    body: "체인 방식으로 협소한 공간에도 설치할 수 있습니다. 0.25T부터 20T까지 지원하며 모노레일 시스템과 연계한 물류 자동화 환경에도 적합합니다.",
    metrics: [{ label: "최소 하중", value: "0.25T" }, { label: "설치 높이", value: "Low Head" }],
    img: "/images/sejong_2.png",
  },
  {
    id: "explosion", icon: <ShieldCheck size={20} />, tab: "방폭 Hoist",
    title: "위험 환경을 위한\nExplosion-Proof Hoist",
    body: "석유화학·가스·도장 공장 등 폭발 위험 환경에서 안전하게 운용할 수 있는 방폭형 호이스트입니다. 위험 Zone 1·2 대응, 내화학성 소재 적용으로 현장 안전을 보장합니다.",
    metrics: [{ label: "방폭 인증", value: "Ex" }, { label: "Zone 대응", value: "1·2" }],
    img: "/images/sejong_3.png",
  },
  {
    id: "crane", icon: <Timer size={20} />, tab: "Crane",
    title: "현장 맞춤 설계로\n만드는 크레인",
    body: "천장크레인·갠트리크레인·그라브크레인까지 고객 현장의 공간·하중·환경 조건을 직접 분석해 최적 사양을 설계합니다. 최대 350TON 그라브 갠트리크레인까지 제작 가능합니다.",
    metrics: [{ label: "최대 제작", value: "350T" }, { label: "크레인 종류", value: "5종+" }],
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
              제품 라인업
            </motion.h2>
          </div>
          <motion.p className={s.headerDesc}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: E, delay: 0.2 }}
          >
            Wire Hoist · Chain Hoist · Explosion-Proof · Crane.<br />
            현장 조건에 맞는 최적의 제품을 설계·제작·시공합니다.
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
