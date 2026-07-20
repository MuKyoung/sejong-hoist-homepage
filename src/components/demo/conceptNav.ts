/* 실제 운영 IA(components/layout/Header.tsx의 NAV) 미러.
 * 헤더 · 히어로 시안 A(/demo/5) · B(/demo/6) 공용 데이터 — 데모 전용. */

export type ConceptNavChild = { label: string; href: string };
export type ConceptNavItem = {
  label: string;
  en: string;
  href: string;
  children: ConceptNavChild[];
};

export const CONCEPT_NAV: ConceptNavItem[] = [
  {
    label: "회사소개", en: "About Us", href: "/about",
    children: [
      { label: "인사말", href: "/about" },
      { label: "연혁", href: "/about/history" },
      { label: "조직도", href: "/about/organization" },
      { label: "오시는 길", href: "/about/location" },
    ],
  },
  {
    label: "사업영역", en: "Business", href: "/business",
    children: [
      { label: "오버헤드 크레인", href: "/business#overhead" },
      { label: "겐트리 크레인", href: "/business#gantry" },
      { label: "모노레일", href: "/business#monorail" },
      { label: "서스펜션 크레인", href: "/business#suspension" },
      { label: "지브 크레인", href: "/business#jib" },
      { label: "제품 라인업", href: "/business#products" },
    ],
  },
  {
    label: "시공사례", en: "Projects", href: "/portfolio",
    children: [{ label: "시공 실적 전체", href: "/portfolio" }],
  },
  {
    label: "기술·인증", en: "Technology", href: "/technology",
    children: [
      { label: "보유 인증", href: "/technology#certs" },
      { label: "보유 자격 인력", href: "/technology#license" },
      { label: "안전관리 체계", href: "/technology#safety" },
    ],
  },
  {
    label: "견적·문의", en: "Contact", href: "/support/inquiry",
    children: [
      { label: "견적 문의", href: "/support/inquiry" },
      { label: "공지사항", href: "/support/notice" },
      { label: "고객지원", href: "/support" },
    ],
  },
];
