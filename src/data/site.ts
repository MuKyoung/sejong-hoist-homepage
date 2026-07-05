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

/* 홈 랜딩 — 회사 개요 바로가기 그리드 (LS Company Overview 형태) */
export const HOME_QUICKNAV = [
  { no: "01", title: "회사소개", en: "About Us", desc: "운반하역 외길, 세종호이스트크레인의 여정", href: "/about" },
  { no: "02", title: "사업영역", en: "Business", desc: "호이스트·크레인 설계·제작·설치·유지보수", href: "/business" },
  { no: "03", title: "시공사례", en: "Portfolio", desc: "업종·용량별 납품·시공 실적", href: "/portfolio" },
  { no: "04", title: "견적·문의", en: "Contact", desc: "온라인 견적 요청 및 기술 상담", href: "/support/inquiry" },
] as const;

/* 사업영역 — 홈 서클 + /business 본문 공용 (클라이언트 4대 영역) */
export type BusinessAreaIcon = "crane" | "gantry" | "maintenance" | "steel";

export const BUSINESS_AREAS: {
  slug: string;
  icon: BusinessAreaIcon;
  title: string;
  en: string;
  desc: string;
  points: string[];
  image: string;
  href: string;
}[] = [
  {
    slug: "hoist",
    icon: "crane",
    title: "호이스트 크레인",
    en: "Hoist Crane",
    desc: "와이어·체인·방폭 호이스트부터 천장크레인까지, 현장 조건에 맞춰 설계·제작·설치합니다.",
    points: ["와이어·체인·방폭 호이스트", "천장크레인 설계·제작·설치", "인버터 정밀 제어 사양"],
    image: "/images/sejong_2.png",
    href: "/business#hoist",
  },
  {
    slug: "gantry",
    icon: "gantry",
    title: "그랩·갠트리 크레인",
    en: "Grab & Gantry",
    desc: "옥외 야적장·중공업 현장을 위한 대형 갠트리·그랩 크레인. 최대 350TON 시공 실적을 보유합니다.",
    points: ["옥외 갠트리·그랩 크레인", "최대 350TON 시공 실적", "풍하중·구조 해석 반영"],
    image: "/images/sejong_3.png",
    href: "/business#gantry",
  },
  {
    slug: "maintenance",
    icon: "maintenance",
    title: "유지보수·이전설치",
    en: "Maintenance",
    desc: "정기 점검, 노후 설비 개보수, 크레인 이전설치까지 신속한 A/S로 설비 가동률을 지킵니다.",
    points: ["정기점검·법정검사 대응", "노후 설비 개보수", "크레인 이전·재설치"],
    image: "/images/sejong_1.png",
    href: "/business#maintenance",
  },
  {
    slug: "steel",
    icon: "steel",
    title: "철구조물 제작",
    en: "Steel Structure",
    desc: "구조 해석 기반의 철구조물 설계·제작. 크레인 거더·주행로 등 맞춤 구조물을 공급합니다.",
    points: ["크레인 거더·주행로 제작", "구조해석 기반 설계", "현장 맞춤 철구조물"],
    image: "/images/sejong_4.png",
    href: "/business#steel",
  },
];

/* 회사소개 — 인사말 (※ 더미 초안: 대표 확인 후 실제 문구로 교체) */
export const GREETING = {
  headline: ["현장의 안전과 신뢰를", "가장 무겁게 들어 올립니다"],
  paragraphs: [
    "안녕하십니까. (주)세종호이스트크레인 대표이사 김승용입니다.",
    "저희는 운반하역 기계 한 길을 걸어오며 와이어로프·체인·방폭 호이스트와 천장·갠트리 크레인을 설계부터 제작·설치·유지보수까지 원스톱으로 공급해 왔습니다. 최대 350TON급 그라브 갠트리크레인 시공 실적은 축적된 기술력과 현장 경험의 결과라고 자부합니다.",
    "무거운 하중을 다루는 일은 곧 사람의 안전을 다루는 일입니다. 세종호이스트크레인은 한 번의 납품이 아니라 설비의 전 생애주기를 함께하는 파트너로서, 고객의 생산 현장이 멈추지 않도록 끝까지 책임지겠습니다.",
  ],
  sign: "(주)세종호이스트크레인 대표이사 김승용",
};

/* 회사소개 — 연혁 (※ 더미: 실제 연혁 자료 수신 시 교체) */
export const HISTORY: { year: string; items: string[] }[] = [
  { year: "2025", items: ["반도체 클린룸 크레인 5TON 납품", "온라인 견적 시스템 운영 개시"] },
  {
    year: "2024",
    items: [
      "그라브 갠트리크레인 350TON 제작·설치 (최대 실적)",
      "엘에스일렉트릭㈜ Double Girder 5T/10T 크레인 납품",
      "방폭 호이스트 Single Girder 3TON 라인업 추가",
    ],
  },
  { year: "2023", items: ["갠트리크레인 80TON 설치", "물류센터 30TON 더블거더 공급"] },
  { year: "2019", items: ["방폭 호이스트 제품군 확대 (Zone 1·2 대응)"] },
  { year: "2008", items: ["법인 전환 — (주)세종호이스트크레인"] },
  { year: "1985", items: ["세종호이스트 창업, 운반하역기계 사업 개시"] },
];

/* 회사소개 — 조직도 (※ 더미: 실제 조직 구성 수신 시 교체) */
export const ORG_UNITS: { name: string; en: string; desc: string }[] = [
  { name: "경영지원", en: "Management", desc: "경영기획·재무·구매" },
  { name: "설계·기술", en: "Engineering", desc: "구조 설계·해석, 도면" },
  { name: "생산·제작", en: "Production", desc: "가공·용접·조립·검사" },
  { name: "시공·설치", en: "Installation", desc: "현장 설치·시운전" },
  { name: "A/S·안전", en: "Service & Safety", desc: "정기점검·긴급 출동·안전관리" },
];

/* 기술·인증 — 보유 인증 (※ 더미 목록: 실제 인증서 스캔/명칭 수신 시 교체) */
export const CERTIFICATIONS: { title: string; issuer: string }[] = [
  { title: "안전인증 (크레인·호이스트)", issuer: "산업안전보건 인증" },
  { title: "ISO 9001", issuer: "품질경영시스템" },
  { title: "ISO 14001", issuer: "환경경영시스템" },
  { title: "공장등록증", issuer: "제조 시설 등록" },
  { title: "연구개발전담부서", issuer: "기술 역량 인정" },
  { title: "특허·실용신안", issuer: "보유 지식재산권" },
];

/* 기술·인증 — 구조해석 역량 */
export const TECH_CAPABILITY = {
  desc: "모든 크레인·철구조물은 시공 전에 구조 계산과 해석을 거칩니다. 하중 조건·스팬·주행 환경을 반영한 설계로 처짐과 피로를 관리하고, 옥외 설비는 풍하중까지 검토합니다.",
  points: [
    { label: "구조 해석", value: "강도·처짐·좌굴 검토" },
    { label: "맞춤 설계", value: "현장 실측 기반 도면" },
    { label: "하중 시험", value: "정격하중 시운전 검증" },
    { label: "옥외 대응", value: "풍하중·내식 사양" },
  ],
};

/* 기술·인증 — 안전관리 체계 */
export const SAFETY_STEPS: { num: string; title: string; desc: string }[] = [
  { num: "01", title: "위험성 평가", desc: "설치 전 현장 조건과 작업 위험 요소를 평가하고 대책을 수립합니다." },
  { num: "02", title: "표준 작업 절차", desc: "제작·설치·시운전 전 과정을 표준 절차(SOP)에 따라 수행합니다." },
  { num: "03", title: "법정검사 대응", desc: "안전검사·정기검사 일정을 관리하고 수검을 대행 지원합니다." },
  { num: "04", title: "정기점검·A/S", desc: "점검 주기에 맞춘 예방 정비와 신속한 출동 체계를 운영합니다." },
];

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
