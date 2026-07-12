import StorySection from "@/components/home/StorySection";
import OverviewMosaicSection from "@/components/home/OverviewMosaicSection";
import PortfolioPreviewSection from "@/components/home/PortfolioPreviewSection";
import BusinessCirclesSection from "@/components/home/BusinessCirclesSection";
import StatsHighlightSection from "@/components/home/StatsHighlightSection";
import SupportStripSection from "@/components/home/SupportStripSection";

export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <StorySection />
      <OverviewMosaicSection />
      <BusinessCirclesSection />
      <StatsHighlightSection />
      <PortfolioPreviewSection />
      <SupportStripSection />
    </>
  );
}
