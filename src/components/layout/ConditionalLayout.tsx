"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import FloatingCta from "./FloatingCta";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Bare routes render without the marketing header/footer.
  const isBare = pathname?.startsWith("/demo") || pathname?.startsWith("/admin");

  if (isBare) return <>{children}</>;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingCta />
    </>
  );
}
