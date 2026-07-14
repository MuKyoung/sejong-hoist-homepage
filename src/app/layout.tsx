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
  metadataBase: new URL("https://sejong-hoist-homepage.vercel.app"),
  title: "(주)세종호이스트크레인 | 350TON급 크레인·호이스트 설계·제작·설치",
  description:
    "1999년 설립, 운반하역 설비 전문기업. 350TON 겐트리 크랩 크레인 시공, KCs 안전인증 취득. 설계·제작·설치·유지보수 원스톱. 044-865-0801",
  keywords:
    "세종호이스트크레인, 천장크레인, 갠트리크레인, 그라브크레인, 호이스트, 방폭호이스트, 크레인 제작, 크레인 설치, 크레인 유지보수",
  openGraph: {
    title: "(주)세종호이스트크레인 | 350TON급 크레인·호이스트 전문",
    description:
      "350TON 겐트리 크랩 크레인 시공 실적, KCs 안전인증. 설계부터 유지보수까지 원스톱. 044-865-0801",
    type: "website",
    images: [{ url: "/images/hero-02.jpg", width: 1920, height: 897 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <head>
        <link rel="icon" href="/images/sejong-logo.png" type="image/png" />
        {/* Pretendard 동적 서브셋 — 필요한 글리프 조각만 로드 (한글 전체 셀프호스팅 대비 수십 KB 수준) */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
