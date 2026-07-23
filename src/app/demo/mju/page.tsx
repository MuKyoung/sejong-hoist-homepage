import type { Metadata } from "next";
import { MjuHeader, MjuHero, MjuAbout, MjuBusiness, MjuProjects, MjuNews } from "@/components/demo/refs/MjuSections";
import RefSwitch from "@/components/demo/refs/RefSwitch";

/* 레퍼런스 시안 A : 명지대 산학협력단 스타일 "리서치 포털" (design-refs/REF-A-MJU.md) */

export const metadata: Metadata = {
  title: "레퍼런스 시안 · 리서치 포털 | 세종호이스트크레인",
  description: "명지대 산학협력단 스타일 데모 시안 (딥블루 포털 · 기하 도형 · 포토 타일)",
  robots: { index: false, follow: false },
};

export default function DemoRefMjuPage() {
  return (
    <>
      <MjuHeader />
      <MjuHero />
      <MjuAbout />
      <MjuBusiness />
      <MjuProjects />
      <MjuNews />
      <RefSwitch current="mju" />
    </>
  );
}
