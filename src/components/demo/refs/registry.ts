/* 영역 × 스타일 레지스트리 — 시안 페이지와 커스텀 믹서 공용 */

import type { ComponentType } from "react";
import type { RefStyle } from "./data";
import { MjuHeader, MjuHero, MjuAbout, MjuBusiness, MjuProjects, MjuNews } from "./MjuSections";
import { YsHeader, YsHero, YsAbout, YsBusiness, YsProjects, YsNews } from "./YsSections";
import { ShiHeader, ShiHero, ShiAbout, ShiBusiness, ShiProjects, ShiNews } from "./ShiSections";

export type Area = "header" | "hero" | "about" | "business" | "projects" | "news";

export const AREA_LABEL: Record<Area, string> = {
  header: "헤더",
  hero: "히어로",
  about: "회사소개",
  business: "사업영역",
  projects: "시공 실적",
  news: "뉴스·푸터",
};

export const AREAS: Area[] = ["header", "hero", "about", "business", "projects", "news"];

export const REGISTRY: Record<Area, Record<RefStyle, ComponentType>> = {
  header: { mju: MjuHeader, ys: YsHeader, shi: ShiHeader },
  hero: { mju: MjuHero, ys: YsHero, shi: ShiHero },
  about: { mju: MjuAbout, ys: YsAbout, shi: ShiAbout },
  business: { mju: MjuBusiness, ys: YsBusiness, shi: ShiBusiness },
  projects: { mju: MjuProjects, ys: YsProjects, shi: ShiProjects },
  news: { mju: MjuNews, ys: YsNews, shi: ShiNews },
};
