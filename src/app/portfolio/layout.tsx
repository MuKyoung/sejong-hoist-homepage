import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "시공사례 | (주)세종호이스트크레인",
  description: "천장크레인, 갠트리크레인, 호이스트 납품·시공 실적.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
