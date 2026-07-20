import type { Metadata } from "next";
import MonumentConcept from "@/components/demo/MonumentConcept";
import ConceptSwitch from "@/components/demo/ConceptSwitch";

/* 시안 C : 웅장 컨셉 — 헤더부터 푸터까지 자체 완결형 (운영 홈 섹션 미사용) */

export const metadata: Metadata = {
  title: "시안 C · 웅장한 헤비인더스트리 | 세종호이스트크레인",
  description: "메인페이지 전체 리뉴얼 시안 C (스틸 차콜 + 브라스, 대형 타이포와 느린 모션)",
  robots: { index: false, follow: false },
};

export default function DemoConceptCPage() {
  return (
    <>
      <MonumentConcept />
      <ConceptSwitch current="7" />
    </>
  );
}
