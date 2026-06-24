import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

/* ─── 폰트: Inter (Google Fonts, 상업용 최고 인기) ─── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "세종호이스트크레인 | SEJONG HOIST & CRANE",
  description: "40년 기술력, 523건 납품. 천장크레인·갠트리크레인·호이스트 전문 제조기업.",
  keywords: "세종호이스트, 천장크레인, 갠트리크레인, 호이스트, 크레인 제조",
  openGraph: {
    title: "세종호이스트크레인 | SEJONG HOIST & CRANE",
    description: "40년 기술력, 523건 납품. 크레인 전문 제조기업.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={inter.variable}>
      <head>
        {/* Pretendard — 한국어 최적화, 상업용 무료 */}
        <link
          rel="preload"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="icon" href="/images/sejong-logo.png" type="image/png" />
      </head>
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
