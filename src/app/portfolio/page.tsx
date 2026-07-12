import PageHero from "@/components/subpage/PageHero";
import ContactBand from "@/components/subpage/ContactBand";
import { getPortfolioList } from "@/lib/cms";
import PortfolioClient from "./PortfolioClient";

export const revalidate = 300;

export default async function PortfolioPage() {
  const items = await getPortfolioList();

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="시공사례"
        desc="현장에서 검증된 세종호이스트크레인의 납품·시공 실적입니다."
      />

      <PortfolioClient items={items} />

      <ContactBand />
    </>
  );
}
