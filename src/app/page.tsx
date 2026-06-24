import HeroSection from "@/components/home/HeroSection";
import BusinessSection from "@/components/home/BusinessSection";
import StatsSection from "@/components/home/StatsSection";
import ValuesSection from "@/components/home/ValuesSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import NewsSection from "@/components/home/NewsSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BusinessSection />
      <StatsSection />
      <ValuesSection />
      <PortfolioSection />
      <NewsSection />
      <ContactSection />
    </>
  );
}
