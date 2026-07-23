import type { Metadata } from "next";
import CustomMixer from "@/components/demo/refs/CustomMixer";

/* 커스텀 믹서 — 섹션별로 레퍼런스 3사 스타일을 골라 조합하는 시연 페이지 */

export const metadata: Metadata = {
  title: "커스텀 시안 믹서 | 세종호이스트크레인",
  description: "섹션별로 MJU·연세·삼성중공업 스타일을 골라 조합하는 데모 페이지",
  robots: { index: false, follow: false },
};

export default function DemoCustomPage() {
  return <CustomMixer />;
}
