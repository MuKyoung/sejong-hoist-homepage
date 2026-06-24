"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const NEWS = [
  {
    id: 1,
    category: "수주 공시",
    date: "2024.11.15",
    title: "현대제철 당진 신규 크레인 설비 공급 계약 체결",
    desc: "200T 급 천장크레인 2대 신규 공급. 납기 2025년 3월 예정.",
  },
  {
    id: 2,
    category: "인증 취득",
    date: "2024.09.03",
    title: "ISO 9001:2015 품질경영시스템 갱신 인증 완료",
    desc: "3년 주기 심사를 완료하고 국제 품질 기준 적합성을 재확인.",
  },
  {
    id: 3,
    category: "보도자료",
    date: "2024.07.22",
    title: "2024 스마트팩토리 솔루션 엑스포 참가 안내",
    desc: "창원 CECO 전시관 A-23 부스에서 최신 지능형 크레인 시스템 시연.",
  },
  {
    id: 4,
    category: "채용",
    date: "2024.06.10",
    title: "2024년 하반기 생산기술직·영업직 신입·경력 채용 공고",
    desc: "크레인 설계·생산·현장관리 분야 전문 인력 상시 채용 중.",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "수주 공시": "bg-blue-50 text-blue-600",
  "인증 취득": "bg-green-50 text-green-600",
  "보도자료": "bg-purple-50 text-purple-600",
  "채용": "bg-orange-50 text-orange-600",
};

const E = [0.22, 1, 0.36, 1] as never;

export default function NewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#f8fafc] py-24 lg:py-32" aria-label="최신 소식">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20">

        {/* 섹션 헤더 */}
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-orange-500 mb-3 flex items-center gap-2"
            >
              <span className="block w-4 h-[1px] bg-orange-500" />
              News &amp; Notice
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.08 }}
              className="font-black text-slate-900 tracking-[-0.03em] leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)" }}
            >
              최신 소식
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: E, delay: 0.2 }}
          >
            <Link
              href="/support/notice"
              className="inline-flex items-center gap-2 text-[12.5px] font-bold text-slate-500 hover:text-[#0B1E4E] transition-colors group"
            >
              전체 보기
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* 뉴스 리스트 */}
        <div className="space-y-3">
          {NEWS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: E, delay: 0.1 + i * 0.07 }}
            >
              <Link
                href={`/support/notice/${item.id}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md p-5 lg:p-6 transition-all duration-250"
              >
                {/* 날짜 */}
                <span className="flex-shrink-0 text-[12px] font-semibold text-slate-400 tabular-nums w-24">
                  {item.date}
                </span>

                {/* 카테고리 배지 */}
                <span className={`flex-shrink-0 text-[10.5px] font-bold px-2.5 py-1 w-fit ${CATEGORY_COLORS[item.category] ?? "bg-slate-50 text-slate-500"}`}>
                  {item.category}
                </span>

                {/* 제목 + 설명 */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14.5px] font-bold text-slate-800 group-hover:text-[#0B1E4E] transition-colors truncate mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[12.5px] text-slate-400 truncate">
                    {item.desc}
                  </p>
                </div>

                {/* 화살표 */}
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="flex-shrink-0 text-slate-300 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all"
                >
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
