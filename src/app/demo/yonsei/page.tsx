import type { Metadata } from "next";
import { YsHeader, YsHero, YsAbout, YsBusiness, YsProjects, YsNews } from "@/components/demo/refs/YsSections";
import RefSwitch from "@/components/demo/refs/RefSwitch";

/* 레퍼런스 시안 B : 연세대학교 스타일 "모뉴멘탈 캠페인" (design-refs/REF-B-YONSEI.md) */

export const metadata: Metadata = {
  title: "레퍼런스 시안 · 모뉴멘탈 캠페인 | 세종호이스트크레인",
  description: "연세대학교 스타일 데모 시안 (로열블루 · 초대형 캠페인 타이포 · 부채꼴 마스크)",
  robots: { index: false, follow: false },
};

export default function DemoRefYonseiPage() {
  return (
    <>
      <YsHeader />
      <YsHero />
      <YsAbout />
      <YsBusiness />
      <YsProjects />
      <YsNews />
      <RefSwitch current="ys" />
    </>
  );
}
