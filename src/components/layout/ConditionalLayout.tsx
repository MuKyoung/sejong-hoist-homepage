"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

/* 헤더 높이 보정: nav 64px (mobile) / 36px util + 68px nav = 104px (lg) */
const mainStyle: React.CSSProperties = { paddingTop: "64px" };

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDemo = pathname?.startsWith("/demo");

  if (isDemo) return <>{children}</>;

  return (
    <>
      <Header />
      <main style={mainStyle}>{children}</main>
      <Footer />
    </>
  );
}
