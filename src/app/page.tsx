import StorySection from "@/components/home/StorySection";
import QuickNavSection from "@/components/home/QuickNavSection";
import BusinessAreasSection from "@/components/home/BusinessAreasSection";
import PortfolioPreviewSection from "@/components/home/PortfolioPreviewSection";
import NewsSection from "@/components/home/NewsSection";
import InquiryBannerSection from "@/components/home/InquiryBannerSection";

export default function HomePage() {
  return (
    <>
      <StorySection />
      <QuickNavSection />
      <BusinessAreasSection />
      <PortfolioPreviewSection />
      <NewsSection />
      <InquiryBannerSection />
    </>
  );
}
