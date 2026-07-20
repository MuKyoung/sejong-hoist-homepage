import type { Metadata } from "next";
import YsConcept from "@/components/demo/YsConcept";
import ConceptSwitch from "@/components/demo/ConceptSwitch";
import OverviewMosaicSection from "@/components/home/OverviewMosaicSection";
import BusinessCirclesSection from "@/components/home/BusinessCirclesSection";
import StatsHighlightSection from "@/components/home/StatsHighlightSection";
import PortfolioPreviewSection from "@/components/home/PortfolioPreviewSection";
import SupportStripSection from "@/components/home/SupportStripSection";
import Footer from "@/components/layout/Footer";
import FloatingCta from "@/components/layout/FloatingCta";

/* 시안 B : 헤더+히어로만 교체, 이하 섹션은 운영 홈과 동일 구성 */

export const metadata: Metadata = {
  title: "시안 B · 라운드 포털형 헤더/히어로 | 세종호이스트크레인",
  description: "메인페이지 헤더 · 히어로 교체 시안 B (연세대학교 스타일 레퍼런스)",
  robots: { index: false, follow: false },
};

export const revalidate = 300;

export default function DemoConceptBPage() {
  return (
    <>
      <YsConcept />
      <main>
        <OverviewMosaicSection />
        <BusinessCirclesSection />
        <StatsHighlightSection />
        <PortfolioPreviewSection />
        <SupportStripSection />
      </main>
      <Footer />
      <FloatingCta />
      <ConceptSwitch current="6" />
    </>
  );
}
