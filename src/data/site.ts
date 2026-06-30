export const COMPANY = {
  name: "(주)세종호이스트크레인",
  ceo: "김승용",
  bizNo: "142-88-01261",
  address: "세종특별자치시 부강면 시목부강로 314",
  tel: "044-865-0801",
  mobile: "010-7605-1510",
  fax: "044-865-0108",
  email: "sj@sjhoist.com",
  mapQuery: "세종특별자치시+부강면+시목부강로+314",
};

export const PRODUCTS = [
  {
    slug: "wire-hoist",
    title: "Wire Hoist",
    titleKr: "와이어로프 호이스트",
    desc: "공장·창고·발전 현장에 최적화된 와이어로프 타입 전동 호이스트. 정밀 제어와 견고한 구조로 중·대형 하중 운반에 대응합니다.",
    specs: [
      { label: "하중 범위", value: "1T ~ 100T" },
      { label: "양정", value: "최대 50m" },
      { label: "구동", value: "전동식" },
      { label: "적용", value: "천장크레인·단독 설치" },
    ],
    image: "/images/sejong_1.png",
  },
  {
    slug: "chain-hoist",
    title: "Chain Hoist",
    titleKr: "체인 호이스트",
    desc: "소형·중형 작업에 적합한 체인 타입 호이스트. 유지보수가 용이하고 컴팩트한 설계로 다양한 현장에 유연하게 적용됩니다.",
    specs: [
      { label: "하중 범위", value: "0.5T ~ 30T" },
      { label: "양정", value: "최대 30m" },
      { label: "구동", value: "전동·수동" },
      { label: "적용", value: "정밀·소형 작업" },
    ],
    image: "/images/sejong_4.png",
  },
  {
    slug: "explosion-proof-hoist",
    title: "Explosion-Proof Hoist",
    titleKr: "방폭 호이스트",
    desc: "위험 Zone 1·2 환경에 대응하는 방폭형 호이스트. 화학·정유·가스 관련 현장의 안전 기준을 충족하도록 설계·제작합니다.",
    specs: [
      { label: "하중 범위", value: "1T ~ 20T" },
      { label: "인증", value: "방폭 인증 대응" },
      { label: "적용", value: "화학·정유·가스" },
      { label: "설계", value: "현장 맞춤형" },
    ],
    image: "/images/sejong_2.png",
  },
  {
    slug: "crane",
    title: "Crane",
    titleKr: "크레인",
    desc: "천장크레인·갠트리크레인·그라브크레인 등 현장 조건에 맞춘 크레인을 설계·제작·설치합니다. 최대 350TON급 시공 실적을 보유하고 있습니다.",
    specs: [
      { label: "하중 범위", value: "1T ~ 350T" },
      { label: "종류", value: "천장·갠트리·그라브" },
      { label: "스팬", value: "현장 맞춤 설계" },
      { label: "서비스", value: "설계·제작·설치·AS" },
    ],
    image: "/images/sejong_3.png",
  },
  {
    slug: "hoist-crane",
    title: "Hoist & Crane",
    titleKr: "호이스트·크레인 통합",
    desc: "호이스트와 크레인을 아우르는 통합 운반하역 솔루션. 설계부터 시공·A/S까지 원스톱으로 제공합니다.",
    specs: [
      { label: "범위", value: "호이스트 + 크레인" },
      { label: "하중", value: "최대 350TON" },
      { label: "대응", value: "설계·납품·시공·AS" },
      { label: "산업", value: "전자·자동차·철강·공공" },
    ],
    image: "/images/sejong_2.png",
  },
] as const;

export type ProductSlug = (typeof PRODUCTS)[number]["slug"];

/* 시공사례 필터 축 — 업종(industry) · 용량(capacityBucket) */
export const PORTFOLIO_INDUSTRIES = [
  "전체",
  "철강·중공업",
  "자동차",
  "반도체·전자",
  "화학·플랜트",
  "물류",
] as const;

export const PORTFOLIO_CAPACITY_BUCKETS = ["전체", "~5T", "5~20T", "20~50T", "50T+"] as const;

export type PortfolioIndustry = (typeof PORTFOLIO_INDUSTRIES)[number];
export type PortfolioCapacityBucket = (typeof PORTFOLIO_CAPACITY_BUCKETS)[number];

export type PortfolioItem = {
  slug: string;
  src: string;
  gallery: string[];
  title: string;
  client: string;
  category: string; // 제품유형 — 라벨 표기용 (필터 아님)
  industry: Exclude<PortfolioIndustry, "전체">;
  capacity: string; // 표시용
  capacityBucket: Exclude<PortfolioCapacityBucket, "전체">; // 필터용
  year: string;
  location: string;
  period: string;
  scope: string[];
  description: string;
  specs: { label: string; value: string }[];
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    slug: "grab-gantry-350",
    src: "/images/sejong_3.png",
    gallery: ["/images/sejong_3.png", "/images/sejong_1.png", "/images/sejong_2.png"],
    title: "그라브 갠트리크레인 350TON",
    client: "중공업 현장",
    category: "그라브",
    industry: "철강·중공업",
    capacity: "350T",
    capacityBucket: "50T+",
    year: "2024",
    location: "충청권 중공업 야적장",
    period: "2024.05 ~ 2024.11 (약 6개월)",
    scope: ["구조 설계·해석", "제작", "현장 설치", "시운전·인계"],
    description:
      "대형 자재 하역을 위한 350TON급 그라브 갠트리크레인을 설계·제작·설치한 대표 실적입니다. 옥외 환경과 고하중 조건을 고려한 구조 해석을 기반으로 안정적인 운용성을 확보했습니다.",
    specs: [
      { label: "정격하중", value: "350TON" },
      { label: "형식", value: "그라브 갠트리" },
      { label: "스팬", value: "현장 맞춤 설계" },
      { label: "구동", value: "전동식" },
    ],
  },
  {
    slug: "double-girder-ls",
    src: "/images/sejong_2.png",
    gallery: ["/images/sejong_2.png", "/images/sejong_4.png", "/images/sejong_3.png"],
    title: "Double Girder 천장크레인",
    client: "엘에스일렉트릭㈜",
    category: "크레인",
    industry: "반도체·전자",
    capacity: "5T / 10T",
    capacityBucket: "5~20T",
    year: "2024",
    location: "전자부품 생산동",
    period: "2024.07 ~ 2024.09 (약 3개월)",
    scope: ["제작", "현장 설치", "안전 검사 대응"],
    description:
      "전자부품 생산라인에 5TON·10TON 더블거더 천장크레인을 납품했습니다. 정밀 운반이 요구되는 환경에 맞춰 저진동·정밀 제어 사양으로 구성했습니다.",
    specs: [
      { label: "정격하중", value: "5TON / 10TON" },
      { label: "형식", value: "Double Girder" },
      { label: "제어", value: "인버터 정밀 제어" },
      { label: "구동", value: "전동식" },
    ],
  },
  {
    slug: "single-girder-10",
    src: "/images/sejong_1.png",
    gallery: ["/images/sejong_1.png", "/images/sejong_3.png", "/images/sejong_4.png"],
    title: "Single Girder 천장크레인 10TON",
    client: "제조업 A",
    category: "크레인",
    industry: "자동차",
    capacity: "10T",
    capacityBucket: "5~20T",
    year: "2024",
    location: "자동차 부품 공장",
    period: "2024.03 ~ 2024.05 (약 2개월)",
    scope: ["제작", "현장 설치", "시운전"],
    description:
      "자동차 부품 공장의 라인 운반용 10TON 싱글거더 천장크레인을 제작·설치했습니다. 공간 효율을 고려한 컴팩트 설계로 적용했습니다.",
    specs: [
      { label: "정격하중", value: "10TON" },
      { label: "형식", value: "Single Girder" },
      { label: "양정", value: "현장 기준" },
      { label: "구동", value: "전동식" },
    ],
  },
  {
    slug: "ex-hoist-3",
    src: "/images/sejong_4.png",
    gallery: ["/images/sejong_4.png", "/images/sejong_2.png", "/images/sejong_1.png"],
    title: "방폭 호이스트 3TON",
    client: "화학 플랜트 B",
    category: "방폭",
    industry: "화학·플랜트",
    capacity: "3T",
    capacityBucket: "~5T",
    year: "2024",
    location: "화학 공정동 (Zone 1)",
    period: "2024.02 ~ 2024.03 (약 1.5개월)",
    scope: ["방폭 사양 설계", "제작", "현장 설치"],
    description:
      "위험 Zone 1 환경에 대응하는 3TON 방폭 호이스트를 공급했습니다. 화학 공정의 안전 기준을 충족하도록 방폭 사양으로 설계·제작했습니다.",
    specs: [
      { label: "정격하중", value: "3TON" },
      { label: "형식", value: "방폭 호이스트" },
      { label: "방폭등급", value: "Zone 1 대응" },
      { label: "구동", value: "전동식" },
    ],
  },
  {
    slug: "wire-hoist-20",
    src: "/images/sejong_1.png",
    gallery: ["/images/sejong_1.png", "/images/sejong_2.png", "/images/sejong_3.png"],
    title: "Wire Hoist 20TON",
    client: "물류센터 C",
    category: "호이스트",
    industry: "물류",
    capacity: "20T",
    capacityBucket: "5~20T",
    year: "2023",
    location: "물류센터 상차장",
    period: "2023.10 ~ 2023.11 (약 1개월)",
    scope: ["제작", "현장 설치"],
    description:
      "물류센터 상차 작업용 20TON 와이어로프 호이스트를 공급했습니다. 반복 하역에 견디는 견고한 구조로 구성했습니다.",
    specs: [
      { label: "정격하중", value: "20TON" },
      { label: "형식", value: "Wire Rope Hoist" },
      { label: "양정", value: "최대 18m" },
      { label: "구동", value: "전동식" },
    ],
  },
  {
    slug: "double-girder-30",
    src: "/images/sejong_3.png",
    gallery: ["/images/sejong_3.png", "/images/sejong_1.png", "/images/sejong_4.png"],
    title: "Double Girder 천장크레인 30TON",
    client: "물류센터 G",
    category: "크레인",
    industry: "물류",
    capacity: "30T",
    capacityBucket: "20~50T",
    year: "2023",
    location: "대형 물류 허브",
    period: "2023.08 ~ 2023.10 (약 2개월)",
    scope: ["제작", "현장 설치", "시운전"],
    description:
      "대형 물류 허브의 중량물 운반용 30TON 더블거더 천장크레인을 공급했습니다. 넓은 스팬 조건에 맞춘 구조 설계를 적용했습니다.",
    specs: [
      { label: "정격하중", value: "30TON" },
      { label: "형식", value: "Double Girder" },
      { label: "스팬", value: "광폭 설계" },
      { label: "구동", value: "전동식" },
    ],
  },
  {
    slug: "gantry-80",
    src: "/images/sejong_3.png",
    gallery: ["/images/sejong_3.png", "/images/sejong_2.png", "/images/sejong_1.png"],
    title: "갠트리크레인 80TON",
    client: "야외 작업장 D",
    category: "크레인",
    industry: "철강·중공업",
    capacity: "80T",
    capacityBucket: "50T+",
    year: "2023",
    location: "옥외 철구조물 작업장",
    period: "2023.04 ~ 2023.07 (약 3개월)",
    scope: ["구조 설계·해석", "제작", "현장 설치"],
    description:
      "옥외 철구조물 작업장의 중량물 취급용 80TON 갠트리크레인을 설계·제작·설치했습니다. 옥외 하중·풍하중 조건을 반영한 구조 해석을 수행했습니다.",
    specs: [
      { label: "정격하중", value: "80TON" },
      { label: "형식", value: "갠트리" },
      { label: "주행", value: "레일 주행식" },
      { label: "구동", value: "전동식" },
    ],
  },
  {
    slug: "chain-hoist-5",
    src: "/images/sejong_2.png",
    gallery: ["/images/sejong_2.png", "/images/sejong_4.png", "/images/sejong_1.png"],
    title: "Chain Hoist 5TON",
    client: "제조업 E",
    category: "호이스트",
    industry: "자동차",
    capacity: "5T",
    capacityBucket: "~5T",
    year: "2023",
    location: "자동차 부품 라인",
    period: "2023.03 (약 2주)",
    scope: ["제작", "현장 설치"],
    description:
      "자동차 부품 라인의 소형 운반용 5TON 체인 호이스트를 공급했습니다. 유지보수가 용이한 컴팩트 사양으로 적용했습니다.",
    specs: [
      { label: "정격하중", value: "5TON" },
      { label: "형식", value: "Chain Hoist" },
      { label: "양정", value: "최대 12m" },
      { label: "구동", value: "전동식" },
    ],
  },
  {
    slug: "cleanroom-5",
    src: "/images/sejong_4.png",
    gallery: ["/images/sejong_4.png", "/images/sejong_3.png", "/images/sejong_2.png"],
    title: "클린룸 크레인 5TON",
    client: "반도체 F",
    category: "크레인",
    industry: "반도체·전자",
    capacity: "5T",
    capacityBucket: "~5T",
    year: "2025",
    location: "반도체 클린룸",
    period: "2025.01 ~ 2025.02 (약 1.5개월)",
    scope: ["클린룸 사양 설계", "제작", "현장 설치"],
    description:
      "반도체 클린룸 환경에 대응하는 5TON 크레인을 공급했습니다. 분진 발생을 억제하는 클린룸 사양으로 설계·제작했습니다.",
    specs: [
      { label: "정격하중", value: "5TON" },
      { label: "형식", value: "클린룸 크레인" },
      { label: "환경", value: "클린룸 대응" },
      { label: "구동", value: "전동식" },
    ],
  },
];

export function getPortfolioBySlug(slug: string): PortfolioItem | undefined {
  return PORTFOLIO.find((item) => item.slug === slug);
}

export const NOTICES = [
  {
    id: 4,
    date: "2024.11.15",
    category: "납품실적",
    title: "그라브 갠트리크레인 350TON 제작·설치 납품 완료",
    important: true,
  },
  {
    id: 3,
    date: "2024.09.03",
    category: "납품실적",
    title: "엘에스일렉트릭㈜ Double Girder 5TON/10TON 크레인 납품",
    important: false,
  },
  {
    id: 2,
    date: "2024.07.22",
    category: "제품",
    title: "방폭 호이스트 Single Girder 3TON 신규 라인업 추가",
    important: false,
  },
  {
    id: 1,
    date: "2024.06.10",
    category: "회사소식",
    title: "온라인 견적 문의 시스템 운영 중",
    important: false,
  },
];

export const NOTICE_CATEGORIES: Record<string, "tint" | "navy" | "muted"> = {
  회사소식: "tint",
  납품실적: "navy",
  제품: "muted",
  채용: "tint",
  기술: "muted",
};
