import StorySection from "@/components/home/StorySection";
import StatsHighlightSection from "@/components/home/StatsHighlightSection";
import QuickNavSection from "@/components/home/QuickNavSection";
import BusinessAreasSection from "@/components/home/BusinessAreasSection";
import PortfolioPreviewSection from "@/components/home/PortfolioPreviewSection";
import NewsSection from "@/components/home/NewsSection";
import InquiryBannerSection from "@/components/home/InquiryBannerSection";

export default function HomePage() {
  return (
    <>
      <StorySection />
      <StatsHighlightSection />
      <QuickNavSection />
      <BusinessAreasSection />
      <PortfolioPreviewSection />
      <NewsSection />
      <InquiryBannerSection />
    </>
  );
}
