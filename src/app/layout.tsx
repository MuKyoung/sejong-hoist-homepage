import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "세종호이스트크레인 | SEJONG HOIST & CRANE",
  description: "세종호이스트크레인 - 천장크레인, 갠트리크레인, 호이스트 전문 제조기업. 40년 이상의 기술력으로 산업 현장의 안전과 효율을 책임집니다.",
  keywords: "세종호이스트, 천장크레인, 갠트리크레인, 호이스트, 크레인 제조, 산업용 크레인",
  openGraph: {
    title: "세종호이스트크레인 | SEJONG HOIST & CRANE",
    description: "천장크레인, 갠트리크레인, 호이스트 전문 제조기업",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link rel="icon" href="/images/sejong-logo.png" type="image/png" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
