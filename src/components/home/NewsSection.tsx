"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Megaphone, Award, Newspaper, Users } from "lucide-react";

const NEWS = [
  {
    id: 1,
    cat: "수주",
    icon: <Megaphone size={13} />,
    date: "2024.11.15",
    title: "현대제철 당진 200T 천장크레인 공급 계약 체결",
    desc: "납기 2025년 3월 예정. 설치 후 3년 무상 A/S 포함.",
    color: "text-blue-600 bg-blue-50",
  },
  {
    id: 2,
    cat: "인증",
    icon: <Award size={13} />,
    date: "2024.09.03",
    title: "ISO 9001:2015 품질경영시스템 갱신 인증 완료",
    desc: "3년 주기 심사 완료, 국제 품질 기준 지속 적합성 유지.",
    color: "text-green-600 bg-green-50",
  },
  {
    id: 3,
    cat: "보도",
    icon: <Newspaper size={13} />,
    date: "2024.07.22",
    title: "2024 스마트팩토리 솔루션 엑스포 A-23 부스 참가",
    desc: "창원 CECO, 최신 지능형 크레인 시스템 실물 시연 예정.",
    color: "text-purple-600 bg-purple-50",
  },
  {
    id: 4,
    cat: "채용",
    icon: <Users size={13} />,
    date: "2024.06.10",
    title: "2024 하반기 생산기술·영업직 신입/경력 공개 채용",
    desc: "크레인 설계·생산·현장관리·영업 분야 상시 지원 가능.",
    color: "text-orange-600 bg-orange-50",
  },
];

const E = [0.22, 1, 0.36, 1] as never;

export default function NewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#f8fafc] py-20 lg:py-28" aria-label="최신 소식">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20">

        {/* 헤더 */}
        <div ref={ref} className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 lg:mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
              className="text-[10.5px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-3 flex items-center gap-2"
            >
              <span className="w-5 h-[1px] bg-orange-500 block" />
              News &amp; Notice
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: E, delay: 0.08 }}
              className="font-black text-[#0B1E4E] tracking-[-0.04em] leading-none"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              최신 소식
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, ease: E, delay: 0.2 }}>
            <Link href="/support/notice" className="group inline-flex items-center gap-2 text-[12.5px] font-bold text-slate-500 hover:text-[#0B1E4E] transition-colors">
              전체 보기
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* 뉴스 리스트 */}
        <div className="space-y-2">
          {NEWS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: E, delay: 0.08 + i * 0.07 }}
            >
              <Link
                href={`/support/notice/${item.id}`}
                className="group flex items-center gap-4 bg-white hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-md px-5 lg:px-7 py-5 transition-all duration-200"
              >
                {/* 날짜 */}
                <span className="hidden sm:block flex-shrink-0 w-24 text-[11.5px] font-semibold text-slate-400 tabular-nums">{item.date}</span>

                {/* 카테고리 */}
                <span className={`flex-shrink-0 inline-flex items-center gap-1 text-[10.5px] font-bold px-2.5 py-1 ${item.color}`}>
                  {item.icon}
                  {item.cat}
                </span>

                {/* 제목 */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-bold text-slate-800 group-hover:text-[#0B1E4E] transition-colors truncate">{item.title}</h3>
                  <p className="text-[12px] text-slate-400 truncate mt-0.5 hidden sm:block">{item.desc}</p>
                </div>

                {/* 화살표 */}
                <ArrowRight size={14} className="flex-shrink-0 text-slate-300 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
