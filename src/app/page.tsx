import StorySection from "@/components/home/StorySection";
import BusinessAreasSection from "@/components/home/BusinessAreasSection";
import PortfolioPreviewSection from "@/components/home/PortfolioPreviewSection";
import MissionStatsSection from "@/components/home/MissionStatsSection";
import NewsSection from "@/components/home/NewsSection";
import InquiryBannerSection from "@/components/home/InquiryBannerSection";

export default function HomePage() {
  return (
    <>
      <StorySection />
      <BusinessAreasSection />
      <PortfolioPreviewSection />
      <MissionStatsSection />
      <NewsSection />
      <InquiryBannerSection />
    </>
  );
}
