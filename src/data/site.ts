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
    image: "/images/prod-wire.jpg",
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
    image: "/images/prod-hoist.jpg",
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
    image: "/images/pf-cond3.jpg",
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
    image: "/images/pf-gantry350.jpg",
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
    image: "/images/pf-grab350-2.jpg",
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
    image: "/images/pf-mono1.jpg",
    href: "/business#hoist",
  },
  {
    slug: "gantry",
    icon: "gantry",
    title: "그랩·갠트리 크레인",
    en: "Grab & Gantry",
    desc: "옥외 야적장·중공업 현장을 위한 대형 갠트리·그랩 크레인. 최대 350TON 시공 실적을 보유합니다.",
    points: ["옥외 갠트리·그랩 크레인", "최대 350TON 시공 실적", "풍하중·구조 해석 반영"],
    image: "/images/area-gantry.jpg",
    href: "/business#gantry",
  },
  {
    slug: "maintenance",
    icon: "maintenance",
    title: "유지보수·이전설치",
    en: "Maintenance",
    desc: "정기 점검, 노후 설비 개보수, 크레인 이전설치까지 신속한 A/S로 설비 가동률을 지킵니다.",
    points: ["정기점검·법정검사 대응", "노후 설비 개보수", "크레인 이전·재설치"],
    image: "/images/area-maint.jpg",
    href: "/business#maintenance",
  },
  {
    slug: "steel",
    icon: "steel",
    title: "철구조물 제작",
    en: "Steel Structure",
    desc: "구조 해석 기반의 철구조물 설계·제작. 크레인 거더·주행로 등 맞춤 구조물을 공급합니다.",
    points: ["크레인 거더·주행로 제작", "구조해석 기반 설계", "현장 맞춤 철구조물"],
    image: "/images/area-steel.jpg",
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

/* 기술·인증 — 보유 인증 (2026-07 수신 안전인증서·서면심사도서 PDF 기반.
   발급기관 공식 표기는 확인 중 — 확정 시 issuer 문구 갱신) */
export const CERTIFICATIONS: { title: string; issuer: string }[] = [
  { title: "안전인증서 — 350TON 겐트리 크레인", issuer: "350/50T·250/50T 그라브 포함" },
  { title: "안전인증서 — 콘덴스룸 3TON 크레인", issuer: "크레인 안전인증" },
  { title: "안전인증서 — 크레인 12대", issuer: "일괄 안전인증" },
  { title: "안전인증서 — 크레인 10대", issuer: "일괄 안전인증" },
  { title: "안전인증서 — 크레인 9대", issuer: "일괄 안전인증" },
  { title: "서면심사도서 11건", issuer: "크레인 구조 서면심사 (총조립·옥외동·시험실 외)" },
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
  /* ※ 실제 현장 사진 기반 (2026-07 수신). 고객사명·업종·연도·기간은 추정치 —
     클라이언트 확정값 수신 시 교체 */
  {
    slug: "gantry-350",
    src: "/images/pf-gantry350.jpg",
    gallery: ["/images/pf-gantry350.jpg", "/images/pf-gantry350-2.jpg", "/images/pf-gantry350-3.jpg"],
    title: "겐트리 크레인 350TON",
    client: "부산 생산공장",
    category: "겐트리",
    industry: "철강·중공업",
    capacity: "350T",
    capacityBucket: "50T+",
    year: "2025",
    location: "부산 옥외동",
    period: "기간 확인 중",
    scope: ["구조 설계·해석", "제작", "현장 설치", "하중 시험·안전인증"],
    description:
      "국내 최대급 350TON 겐트리 크레인을 설계·제작·설치했습니다. TROLLEY 인양, 와이어 로프 위빙, 웨이트(하중) 시험까지 전 과정을 자체 수행했으며 안전인증을 취득했습니다.",
    specs: [
      { label: "정격하중", value: "350TON" },
      { label: "형식", value: "겐트리" },
      { label: "설치", value: "옥외" },
      { label: "인증", value: "안전인증 취득" },
    ],
  },
  {
    slug: "grab-350-50",
    src: "/images/pf-grab350.jpg",
    gallery: ["/images/pf-grab350.jpg", "/images/area-gantry.jpg", "/images/pf-grab350-2.jpg"],
    title: "그라브 크레인 350/50TON",
    client: "부산 생산공장",
    category: "그라브",
    industry: "철강·중공업",
    capacity: "350T / 50T",
    capacityBucket: "50T+",
    year: "2025",
    location: "부산 총조립반",
    period: "기간 확인 중",
    scope: ["구조 설계·해석", "제작", "현장 설치", "안전인증"],
    description:
      "주권 350TON / 보권 50TON 그라브 크레인입니다. 총조립반 라인에 설치되어 대형 중량물 취급을 담당하며, 안전인증을 취득했습니다.",
    specs: [
      { label: "정격하중", value: "350TON / 50TON" },
      { label: "형식", value: "그라브" },
      { label: "설치", value: "총조립반" },
      { label: "인증", value: "안전인증 취득" },
    ],
  },
  {
    slug: "grab-250-50",
    src: "/images/pf-grab250.jpg",
    gallery: ["/images/pf-grab250.jpg", "/images/area-steel.jpg", "/images/pf-grab250-2.jpg"],
    title: "그라브 크레인 250/50TON",
    client: "부산 생산공장",
    category: "그라브",
    industry: "철강·중공업",
    capacity: "250T / 50T",
    capacityBucket: "50T+",
    year: "2025",
    location: "부산 본체조립반",
    period: "기간 확인 중",
    scope: ["제작", "거더·TROLLEY 출하", "현장 설치", "안전인증"],
    description:
      "주권 250TON / 보권 50TON 그라브 크레인입니다. 거더와 TROLLEY를 자체 제작·출하하여 본체조립반에 설치했으며, 안전인증을 취득했습니다.",
    specs: [
      { label: "정격하중", value: "250TON / 50TON" },
      { label: "형식", value: "그라브" },
      { label: "설치", value: "본체조립반" },
      { label: "인증", value: "안전인증 취득" },
    ],
  },
  {
    slug: "ceiling-30",
    src: "/images/pf-ceiling30.jpg",
    gallery: ["/images/pf-ceiling30.jpg", "/images/pf-ceiling30-2.jpg", "/images/pf-ceiling30-3.jpg"],
    title: "천장크레인 30TON",
    client: "부산 생산공장",
    category: "천장크레인",
    industry: "철강·중공업",
    capacity: "30T",
    capacityBucket: "20~50T",
    year: "2024",
    location: "부산 총조립반·옥내창고",
    period: "기간 확인 중",
    scope: ["제작", "거더 양중·설치", "시운전"],
    description:
      "총조립반과 옥내창고에 30TON 천장크레인을 설치했습니다. 거더·새들 제작부터 양중·설치·시운전까지 원스톱으로 수행했습니다.",
    specs: [
      { label: "정격하중", value: "30TON" },
      { label: "형식", value: "천장크레인" },
      { label: "설치", value: "옥내" },
      { label: "구동", value: "전동식" },
    ],
  },
  {
    slug: "test-20",
    src: "/images/pf-test20.jpg",
    gallery: ["/images/pf-test20.jpg", "/images/pf-test20-2.jpg", "/images/pf-test20-3.jpg"],
    title: "시험실 천장크레인 20TON",
    client: "부산 생산공장",
    category: "천장크레인",
    industry: "철강·중공업",
    capacity: "20T",
    capacityBucket: "5~20T",
    year: "2024",
    location: "부산 시험실",
    period: "기간 확인 중",
    scope: ["주행레일 설치", "거더 출하·설치", "시운전"],
    description:
      "시험실 동에 20TON 천장크레인을 설치했습니다. 주행레일 시공부터 거더 출하·설치까지 일괄 수행했습니다.",
    specs: [
      { label: "정격하중", value: "20TON" },
      { label: "형식", value: "천장크레인" },
      { label: "설치", value: "시험실" },
      { label: "구동", value: "전동식" },
    ],
  },
  {
    slug: "cond-3",
    src: "/images/pf-cond3.jpg",
    gallery: ["/images/pf-cond3.jpg"],
    title: "콘덴스룸 크레인 3TON",
    client: "부산 생산공장",
    category: "천장크레인",
    industry: "화학·플랜트",
    capacity: "3T",
    capacityBucket: "~5T",
    year: "2024",
    location: "부산 콘덴스룸",
    period: "기간 확인 중",
    scope: ["제작", "현장 설치", "안전인증"],
    description:
      "콘덴스룸(콘덴서룸) 환경에 3TON 크레인을 설치했습니다. 설비 특성을 고려한 맞춤 사양으로 제작했으며, 안전인증을 취득했습니다.",
    specs: [
      { label: "정격하중", value: "3TON" },
      { label: "형식", value: "천장크레인" },
      { label: "설치", value: "콘덴스룸" },
      { label: "인증", value: "안전인증 취득" },
    ],
  },
  {
    slug: "mono-1",
    src: "/images/pf-mono1.jpg",
    gallery: ["/images/pf-mono1.jpg", "/images/pf-mono1-2.jpg", "/images/pf-mono1-3.jpg"],
    title: "모노레일 호이스트 크레인 1TON",
    client: "제조 공장",
    category: "호이스트",
    industry: "자동차",
    capacity: "1T",
    capacityBucket: "~5T",
    year: "2026",
    location: "생산 라인",
    period: "2026.05",
    scope: ["지지 기둥·주행빔 설치", "강재 천공", "호이스트 설치", "시운전"],
    description:
      "생산 라인에 1TON 모노레일 호이스트 크레인을 신설했습니다. 지지 기둥과 주행빔 설치, 강재 천공 등 구조 공사부터 호이스트 설치·시운전까지 일괄 수행했습니다.",
    specs: [
      { label: "정격하중", value: "1TON" },
      { label: "형식", value: "모노레일 호이스트" },
      { label: "공사", value: "주행빔·지지 기둥 신설" },
      { label: "구동", value: "전동식" },
    ],
  },
  {
    slug: "winch-05",
    src: "/images/pf-winch05.jpg",
    gallery: ["/images/pf-winch05.jpg"],
    title: "윈치 이동 설치 0.5TON",
    client: "제조 공장",
    category: "호이스트",
    industry: "물류",
    capacity: "0.5T",
    capacityBucket: "~5T",
    year: "2024",
    location: "생산 현장",
    period: "기간 확인 중",
    scope: ["기존 설비 이설", "재설치·시운전"],
    description:
      "기존 0.5TON 윈치를 신규 위치로 이동 설치했습니다. 소형 설비의 이설·재설치도 신속하게 대응합니다.",
    specs: [
      { label: "정격하중", value: "0.5TON" },
      { label: "형식", value: "윈치" },
      { label: "공사", value: "이동 설치" },
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
