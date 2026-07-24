/* 레퍼런스 3사 시안 공용 데이터 (design-refs/REF-*.md)
 * /demo/mju · /demo/yonsei · /demo/shi · /demo/custom 에서 사용. 데모 전용. */

import {
  COMPANY, BUSINESS_AREAS, PORTFOLIO, NOTICES,
  HISTORY, PRODUCTS, ISO_CERTS, ISO_META,
} from "@/data/site";
import { CONCEPT_NAV } from "@/components/demo/conceptNav";

export const E = [0.16, 1, 0.3, 1] as const;

export type RefStyle = "mju" | "ys" | "shi";

export const STYLE_META: Record<RefStyle, { name: string; ref: string; route: string }> = {
  mju: { name: "리서치 포털", ref: "명지대 산학협력단", route: "/demo/mju" },
  ys: { name: "모뉴멘탈 캠페인", ref: "연세대학교", route: "/demo/yonsei" },
  shi: { name: "시네마틱 미니멀", ref: "삼성중공업", route: "/demo/shi" },
};

/* 팔레트 — 각 MD 토큰 표와 동일 */
export const MJU = { royal: "#16386F", deep: "#0E2247", line: "rgba(14,34,71,0.12)" };
export const YS = { royal: "#0E4A84", ink: "#10243E", soft: "#F4F7FB" };
export const SHI = { ink: "#101820", accent: "#1E4FA3", dark: "#0D1523" };

export const NAV = CONCEPT_NAV;
export { COMPANY, BUSINESS_AREAS, PORTFOLIO, NOTICES, HISTORY, PRODUCTS, ISO_CERTS, ISO_META };

/* ── 시안 내부 하위 페이지 IA — 각 시안 헤더는 자기 스타일의 서브 페이지로 라우팅 ── */
export type RefSub = "about" | "business" | "portfolio" | "technology" | "contact";

export const SUBS: { key: RefSub; label: string; en: string; desc: string }[] = [
  { key: "about", label: "회사소개", en: "About Us", desc: "운반하역 외길 25년, 세종호이스트크레인을 소개합니다." },
  { key: "business", label: "사업영역", en: "Business", desc: "여섯 개 사업영역과 세 개의 제품 라인업으로 현장에 대응합니다." },
  { key: "portfolio", label: "시공사례", en: "Projects", desc: "전국 현장에서 검증된 대표 시공 실적입니다." },
  { key: "technology", label: "기술·인증", en: "Technology", desc: "ISO 3종과 KCs 안전인증으로 품질을 증명합니다." },
  { key: "contact", label: "견적·문의", en: "Contact", desc: "현장 조건만 알려주시면 영업일 1일 내 회신드립니다." },
];

export const refNav = (base: string) => SUBS.map((s) => ({ label: s.label, href: `${base}/${s.key}` }));

export const NAV_MJU = refNav("/demo/mju");
export const NAV_YS = refNav("/demo/yonsei");
export const NAV_SHI = refNav("/demo/shi");

export const HERO_SLIDES = [
  {
    img: "/images/hero-02.jpg",
    title: ["최대 350톤,", "검증된 시공 실적"],
    sub: "설계부터 제작·설치·안전인증까지, 초대형 크레인의 전 과정을 직접 수행합니다.",
    caption: "350TON 겐트리 크레인 · LS ELECTRIC 부산사업장",
  },
  {
    img: "/images/hero-04.jpg",
    title: ["현장의 하중과 안전을", "설계와 제작으로 풉니다"],
    sub: "안전 계수와 납기, 두 가지 리스크를 설계 단계부터 수치로 통제합니다.",
    caption: "350/50TON 그라브 크레인 · LS ELECTRIC 부산사업장",
  },
  {
    img: "/images/hero-03.jpg",
    title: ["대형 그라브 크레인의", "설계·제작·설치"],
    sub: "옥외 대형 설비까지, 풍하중·구조 해석을 반영한 맞춤 설계로 시공합니다.",
    caption: "250/50TON 그라브 크레인 · LS ELECTRIC 부산사업장",
  },
];

export const STATS = [
  { value: "25", suffix: "년+", label: "업력", desc: "1999년 설립, 운반하역 외길" },
  { value: "520", suffix: "건+", label: "누적 시공", desc: "전국 현장 납품·설치" },
  { value: "350", suffix: "TON", label: "최대 하중", desc: "겐트리 크랩 크레인" },
  { value: "100", suffix: "%", label: "안전인증 적합", desc: "13대 전수 합격, 부적합 0건" },
];

/* 보유 스톡 중 가장 기계·산업적인 컷 (실사 시공 영상 수급 시 교체) */
export const HERO_VIDEO = "/videos/4768-179741152_medium.mp4";
export const CTA_VIDEO = "/videos/48420-453832153_medium.mp4";

/* 사업영역: 시안에서 주로 쓰는 4개 + 전체 */
export const AREAS_MAIN = BUSINESS_AREAS.slice(0, 4);
export const CASES = PORTFOLIO.slice(0, 4);
