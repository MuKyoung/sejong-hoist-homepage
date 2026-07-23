import type { Metadata } from "next";
import { ShiHeader, ShiHero, ShiAbout, ShiBusiness, ShiProjects, ShiNews } from "@/components/demo/refs/ShiSections";
import RefSwitch from "@/components/demo/refs/RefSwitch";

/* 레퍼런스 시안 C : 삼성중공업 스타일 "시네마틱 미니멀" (design-refs/REF-C-SHI.md) */

export const metadata: Metadata = {
  title: "레퍼런스 시안 · 시네마틱 미니멀 | 세종호이스트크레인",
  description: "삼성중공업 스타일 데모 시안 (풀블리드 영상 히어로 · 등분할 포토 패널 · 미니멀 화이트)",
  robots: { index: false, follow: false },
};

export default function DemoRefShiPage() {
  return (
    <>
      <ShiHeader />
      <ShiHero />
      <ShiAbout />
      <ShiBusiness />
      <ShiProjects />
      <ShiNews />
      <RefSwitch current="shi" />
    </>
  );
}
