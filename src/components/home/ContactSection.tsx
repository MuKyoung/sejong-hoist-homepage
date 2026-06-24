"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MessageSquare, ArrowRight } from "lucide-react";

const E = [0.22, 1, 0.36, 1] as never;

const LINKS = [
  { icon: <Phone size={16} />, label: "전화 상담", value: "031-777-1234", sub: "평일 09:00 – 18:00", href: "tel:0317771234" },
  { icon: <Mail size={16} />, label: "이메일", value: "info@sejong-hoist.com", sub: "24시간 접수", href: "mailto:info@sejong-hoist.com" },
  { icon: <MessageSquare size={16} />, label: "온라인 문의", value: "견적·기술 문의", sub: "빠른 답변 보장", href: "/support/inquiry" },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden bg-[#0B1E4E] py-20 lg:py-28" aria-label="상담 문의">
      {/* 배경 영상 */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      >
        <source src="/videos/48420-453832153_medium.mp4" type="video/mp4" />
      </video>

      {/* 패턴 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1E4E] via-[#0B1E4E]/95 to-[#1a3a7a]/80" />

      <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-center">

          {/* 좌: 카피 */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: E }}
              className="text-[10.5px] font-bold tracking-[0.25em] uppercase text-orange-400 mb-4 flex items-center gap-2"
            >
              <span className="w-5 h-[1px] bg-orange-400 block" />
              Contact
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: E, delay: 0.08 }}
              className="font-black text-white tracking-[-0.045em] leading-[0.95] mb-6"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              프로젝트가<br />
              있으신가요?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: E, delay: 0.18 }}
              className="text-white/55 leading-[1.85] mb-10 max-w-[400px]"
              style={{ fontSize: "clamp(0.875rem, 1.3vw, 1rem)" }}
            >
              현장 조건과 요구 하중을 알려주시면,
              최적 사양과 견적을 48시간 이내 제안드립니다.
              초기 상담은 언제나 무료입니다.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: E, delay: 0.26 }}
            >
              <Link
                href="/support/inquiry"
                className="group inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 transition-colors duration-200 text-[13.5px] tracking-wide"
              >
                무료 상담 시작
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* 우: 연락처 카드 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: E, delay: 0.22 }}
            className="space-y-3"
          >
            {LINKS.map((l, i) => (
              <a
                key={i}
                href={l.href}
                className="group flex items-center gap-4 bg-white/7 hover:bg-white/12 border border-white/10 hover:border-white/20 px-5 py-4 transition-all duration-200"
              >
                <div className="w-9 h-9 bg-orange-500/20 group-hover:bg-orange-500 flex items-center justify-center text-orange-400 group-hover:text-white transition-colors duration-200 flex-shrink-0">
                  {l.icon}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold tracking-[0.1em] text-white/40 mb-0.5">{l.label}</p>
                  <p className="text-[13.5px] font-bold text-white group-hover:text-orange-400 transition-colors">{l.value}</p>
                  <p className="text-[11px] text-white/30">{l.sub}</p>
                </div>
                <ArrowRight size={12} className="text-white/20 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
