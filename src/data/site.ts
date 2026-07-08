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

/* 회사소개 — 인사말 (2026-07 클라이언트 확정: PPTX Version 1 임팩트 톤 +
   "안 1) 리스크 통제(안전+납기)" 수정 문구 반영) */
export const GREETING = {
  headline: ["350톤의 무게,", "우리는 실패를 허용하지 않습니다."],
  quote: "보이지 않는 설계의 정밀함이 현장의 절대 안전을 만듭니다.",
  paragraphs: [
    "안녕하십니까. (주)세종호이스트크레인 대표이사 김승용입니다.",
    "초대형 크레인에 실패란 없습니다. 단 한 번의 오차도, 단 한 번의 타협도 용납되지 않는 영역, 그것이 바로 저희가 서 있는 현장입니다. 350톤급 초대형 크레인은 설비가 아니라 '리스크 관리 시스템'입니다. 저희는 안전 계수 미달, 납기 지연이라는 두 가지 리스크를 설계 단계부터 수치로 통제합니다.",
    "저희 (주)세종호이스트크레인은 25년간 이 현장을 지켜왔습니다. 그리고 2026년, 법인 체제의 책임 경영 시스템을 갖추고 대형 프로젝트를 정면으로 수행할 준비를 마쳤습니다. LS ELECTRIC 부산공장 13대 전수 안전인증 합격(적합률 100%), 부적합 0건이 그 증거입니다.",
    "LS ELECTRIC, 두산중공업, 현대위아 등 대한민국을 대표하는 기업들이 350톤급 초대형 프로젝트의 파트너로 당사를 선택했습니다. 세종호이스트크레인은 귀사의 비즈니스를 정상까지 들어 올릴 단 하나의 기술 파트너가 되겠습니다.",
  ],
  sign: "(주)세종호이스트크레인 대표이사 김 승 용 올림",
};

/* 회사소개 — 연혁 (2026-07 클라이언트 PPTX 확정 자료) */
export const HISTORY: { year: string; items: string[] }[] = [
  {
    year: "2025",
    items: [
      "LS ELECTRIC 부산사업장 350TON 겐트리 크랩 크레인 등 대형 크레인 11대 시공",
      "대표자 현장 엔지니어로 직접 참여 (2025.06~)",
      "신축공장 이전 (2025.08 예정)",
    ],
  },
  { year: "2024", items: ["상호 변경 — (주)세종호이스트크레인 (2024.12)"] },
  { year: "2019", items: ["(주)SJ테크널 사업분야 분리·확장 (2019.05)"] },
  { year: "2015", items: ["상호 변경 — 세종호이스트, 대표자 변경 (2015.08)"] },
  { year: "2006", items: ["공장 준공 — 금산군 추부면 (2006.06)"] },
  { year: "1999", items: ["회사 설립 — 정원기계 (1999.08)"] },
];

/* 회사소개 — 조직도 (2026-07 클라이언트 PPTX 확정: 대표이사→총괄이사→전무→3부) */
export const ORG_UNITS: { name: string; en: string; teams: string[] }[] = [
  { name: "관리부", en: "Administration", teams: ["경영지원", "인사총무"] },
  { name: "영업부", en: "Sales", teams: ["국내영업", "해외영업", "영업관리"] },
  {
    name: "생산부",
    en: "Production",
    teams: ["설계부", "제조부", "자재부", "생산 및 설치시운전"],
  },
];

/* 기술·인증 — 안전인증서 5권 (전 페이지를 /images/certs/{slug}/pNN.jpg 로 렌더,
   /technology/certs/[slug] 뷰어에서 전권 열람). 발급: 한국승강기안전공단 KCs 적합 */
export type CertDoc = {
  slug: string;
  title: string;
  desc: string;
  pageCount: number;
};

export const CERT_DOCS: CertDoc[] = [
  {
    slug: "cert-1",
    title: "안전인증 — 갠트리 350TON · 그라브 350/50T·250/50T",
    desc: "한국승강기안전공단 · KCs 개별 제품심사 적합",
    pageCount: 9,
  },
  {
    slug: "cert-2",
    title: "안전인증 — 콘덴스룸 크레인 3TON",
    desc: "한국승강기안전공단 · KCs 개별 제품심사 적합",
    pageCount: 4,
  },
  {
    slug: "cert-3",
    title: "안전인증 — 크레인 12대 일괄",
    desc: "한국승강기안전공단 · KCs 개별 제품심사 적합",
    pageCount: 28,
  },
  {
    slug: "cert-4",
    title: "안전인증 — 크레인 10대 일괄",
    desc: "한국승강기안전공단 · KCs 개별 제품심사 적합",
    pageCount: 26,
  },
  {
    slug: "cert-5",
    title: "안전인증 — 크레인 9대 일괄",
    desc: "한국승강기안전공단 · KCs 개별 제품심사 적합",
    pageCount: 22,
  },
];

export const certCover = (doc: CertDoc) => `/images/certs/${doc.slug}/p01.jpg`;
export const certPage = (doc: CertDoc, n: number) =>
  `/images/certs/${doc.slug}/p${String(n).padStart(2, "0")}.jpg`;
export const getCertDocBySlug = (slug: string) =>
  CERT_DOCS.find((d) => d.slug === slug);

/* 기술·인증 — 서면심사도서 11권 (표지만 게시; 본문은 수백 페이지 기술도서) */
export const REVIEW_DOCS: { title: string; pages: number; image: string }[] = [
  { title: "총조립 30TON (SJ-30-26400)", pages: 88, image: "/images/certs/docs/doc-01.jpg" },
  { title: "총조립 350/50TON (SJ-350-50-28300)", pages: 327, image: "/images/certs/docs/doc-02.jpg" },
  { title: "본체조립 30TON (SJ-30-26400)", pages: 89, image: "/images/certs/docs/doc-03.jpg" },
  { title: "본체조립 250/50TON (SJ-250-50-28300)", pages: 322, image: "/images/certs/docs/doc-04.jpg" },
  { title: "자재창고 5TON (SJ-5-15800)", pages: 88, image: "/images/certs/docs/doc-05.jpg" },
  { title: "옥내창고 30TON (SJ-30-24100)", pages: 88, image: "/images/certs/docs/doc-06.jpg" },
  { title: "시험실 5TON (SJ-5-26800)", pages: 88, image: "/images/certs/docs/doc-07.jpg" },
  { title: "시험실 20TON (SJ-20-26800)", pages: 88, image: "/images/certs/docs/doc-08.jpg" },
  { title: "포장장 5TON (SJ-5-14900)", pages: 88, image: "/images/certs/docs/doc-09.jpg" },
  { title: "옥외동 350TON (SJ-350-21000)", pages: 303, image: "/images/certs/docs/doc-10.jpg" },
  { title: "콘덴서룸 3TON (SJ-3-17900)", pages: 88, image: "/images/certs/docs/doc-11.jpg" },
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
  "전기·전자",
  "자동차",
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
  /* ※ 실제 현장 사진 기반 (2026-07 수신). 부산 6건은 클라이언트 PPTX 실적표로
     고객사(LS ELECTRIC 부산사업장)·연도(2025) 확정. 모노레일·윈치 건의
     고객사·기간은 추정 — 확정값 수신 시 교체 */
  {
    slug: "gantry-350",
    src: "/images/pf-gantry350.jpg",
    gallery: ["/images/pf-gantry350.jpg", "/images/pf-gantry350-2.jpg", "/images/pf-gantry350-3.jpg"],
    title: "겐트리 크레인 350TON",
    client: "LS ELECTRIC 부산사업장",
    category: "겐트리",
    industry: "전기·전자",
    capacity: "350T",
    capacityBucket: "50T+",
    year: "2025",
    location: "부산 옥외동",
    period: "",
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
    client: "LS ELECTRIC 부산사업장",
    category: "그라브",
    industry: "전기·전자",
    capacity: "350T / 50T",
    capacityBucket: "50T+",
    year: "2025",
    location: "부산 총조립반",
    period: "",
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
    client: "LS ELECTRIC 부산사업장",
    category: "그라브",
    industry: "전기·전자",
    capacity: "250T / 50T",
    capacityBucket: "50T+",
    year: "2025",
    location: "부산 본체조립반",
    period: "",
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
    client: "LS ELECTRIC 부산사업장",
    category: "천장크레인",
    industry: "전기·전자",
    capacity: "30T",
    capacityBucket: "20~50T",
    year: "2025",
    location: "부산 총조립반·옥내창고",
    period: "",
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
    client: "LS ELECTRIC 부산사업장",
    category: "천장크레인",
    industry: "전기·전자",
    capacity: "20T",
    capacityBucket: "5~20T",
    year: "2025",
    location: "부산 시험실",
    period: "",
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
    client: "LS ELECTRIC 부산사업장",
    category: "천장크레인",
    industry: "전기·전자",
    capacity: "3T",
    capacityBucket: "~5T",
    year: "2025",
    location: "부산 콘덴스룸",
    period: "",
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
    period: "",
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
    date: "2025.10.02",
    category: "납품실적",
    title: "겐트리 크랩 크레인 350TON 제작·설치 및 안전인증 취득",
    important: true,
  },
  {
    id: 3,
    date: "2025.06.20",
    category: "납품실적",
    title: "LS ELECTRIC 부산사업장 Double Girder 30TON 크레인 5대 납품",
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
