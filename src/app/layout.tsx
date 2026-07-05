import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "(주)세종호이스트크레인 | Wire Hoist · Chain Hoist · Crane 전문 제조",
  description: "Wire Hoist, Chain Hoist, Explosion-Proof Hoist, Crane 전문 제조기업. 최대 350TON. 세종특별자치시 부강면. 044-865-0801",
  keywords: "세종호이스트크레인, Wire Hoist, Chain Hoist, 방폭호이스트, 천장크레인, 갠트리크레인, 크레인제조, 호이스트",
  openGraph: {
    title: "(주)세종호이스트크레인 | Hoist & Crane 전문 제조",
    description: "Wire·Chain·방폭 호이스트, 크레인 전문 제조기업. 044-865-0801 / sj@sjhoist.com",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <head>
        <link rel="icon" href="/images/sejong-logo.png" type="image/png" />
      </head>
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
