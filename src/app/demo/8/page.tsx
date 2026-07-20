import type { Metadata } from "next";
import EditorialConcept from "@/components/demo/EditorialConcept";
import ConceptSwitch from "@/components/demo/ConceptSwitch";

/* 시안 D : 연세대 메인 × 명지대 산학협력단 믹스 — 자체 완결형 (운영 홈 섹션 미사용) */

export const metadata: Metadata = {
  title: "시안 D · 에디토리얼 포털 | 세종호이스트크레인",
  description: "메인페이지 전체 리뉴얼 시안 D (대학 포털형 에디토리얼 레이아웃 믹스)",
  robots: { index: false, follow: false },
};

export default function DemoConceptDPage() {
  return (
    <>
      <EditorialConcept />
      <ConceptSwitch current="8" />
    </>
  );
}
