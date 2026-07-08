import type { Metadata } from "next";
import StorySection from "@/components/home/StorySection";
import OverviewMosaicSection from "@/components/home/OverviewMosaicSection";
import BusinessCirclesSection from "@/components/home/BusinessCirclesSection";
import StatsHighlightSection from "@/components/home/StatsHighlightSection";
import PortfolioPreviewSection from "@/components/home/PortfolioPreviewSection";
import SupportStripSection from "@/components/home/SupportStripSection";

export const metadata: Metadata = {
  title: "Sejong Hoist Crane | Hoists & Cranes up to 350TON",
  description:
    "Korean crane manufacturer since 1999. Design, fabrication, installation and maintenance of hoists and cranes up to 350 tons. KCs safety-certified.",
};

export default function EnHomePage() {
  return (
    <>
      <StorySection locale="en" />
      <OverviewMosaicSection locale="en" />
      <BusinessCirclesSection locale="en" />
      <StatsHighlightSection locale="en" />
      <PortfolioPreviewSection locale="en" />
      <SupportStripSection locale="en" />
    </>
  );
}
