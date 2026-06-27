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

export const PORTFOLIO_CATEGORIES = ["전체", "크레인", "호이스트", "방폭", "그라브"] as const;

export const PORTFOLIO = [
  {
    src: "/images/sejong_3.png",
    title: "그라브 갠트리크레인 350TON",
    client: "중공업 현장",
    category: "그라브",
    capacity: "350T",
    year: "2024",
  },
  {
    src: "/images/sejong_2.png",
    title: "Double Girder 천장크레인",
    client: "엘에스일렉트릭㈜",
    category: "크레인",
    capacity: "5T / 10T",
    year: "2024",
  },
  {
    src: "/images/sejong_1.png",
    title: "Single Girder 천장크레인",
    client: "제조업 A",
    category: "크레인",
    capacity: "10T",
    year: "2024",
  },
  {
    src: "/images/sejong_4.png",
    title: "방폭 호이스트 3TON",
    client: "화학 플랜트 B",
    category: "방폭",
    capacity: "3T",
    year: "2024",
  },
  {
    src: "/images/sejong_1.png",
    title: "Wire Hoist 20TON",
    client: "물류센터 C",
    category: "호이스트",
    capacity: "20T",
    year: "2023",
  },
  {
    src: "/images/sejong_3.png",
    title: "갠트리크레인 80TON",
    client: "야외 작업장 D",
    category: "크레인",
    capacity: "80T",
    year: "2023",
  },
  {
    src: "/images/sejong_2.png",
    title: "Chain Hoist 5TON",
    client: "제조업 E",
    category: "호이스트",
    capacity: "5T",
    year: "2023",
  },
  {
    src: "/images/sejong_4.png",
    title: "클린룸 크레인",
    client: "반도체 F",
    category: "크레인",
    capacity: "5T",
    year: "2025",
  },
];

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
