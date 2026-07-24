import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RefSubPage } from "@/components/demo/refs/subpages";
import RefSwitch from "@/components/demo/refs/RefSwitch";
import { SUBS, type RefSub } from "@/components/demo/refs/data";

export const dynamicParams = false;
export function generateStaticParams() {
  return SUBS.map((s) => ({ sub: s.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ sub: string }> }): Promise<Metadata> {
  const { sub } = await params;
  const m = SUBS.find((s) => s.key === sub);
  return {
    title: `${m?.label ?? ""} · 시네마틱 미니멀 시안 | 세종호이스트크레인`,
    robots: { index: false, follow: false },
  };
}

export default async function ShiSubPage({ params }: { params: Promise<{ sub: string }> }) {
  const { sub } = await params;
  if (!SUBS.some((s) => s.key === sub)) notFound();
  return (
    <>
      <RefSubPage style="shi" page={sub as RefSub} />
      <RefSwitch current="shi" />
    </>
  );
}
