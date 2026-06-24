# 세종호이스트크레인 홈페이지 — 프로젝트 규칙

## 기술 스택 (변경 금지)

| 항목 | 버전/설정 |
|---|---|
| Next.js | 16 (App Router, `src/app/` 구조) |
| React | 19 |
| TypeScript | 5 (strict mode, 모든 파일 `.tsx`) |
| Tailwind CSS | **v4** — `@import "tailwindcss"` CSS-first 방식 |
| Framer Motion | 12 (`"use client"` 컴포넌트에서만 사용) |
| shadcn/ui deps | `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react` |
| Font | Pretendard (한국어 최적화 sans-serif) |
| Deployment | Vercel (master push → 자동 배포) |

---

## 디렉토리 구조

```
src/
  app/
    layout.tsx          # 루트 레이아웃 (Header, Footer 포함)
    page.tsx            # 메인 홈페이지
    demo/
      page.tsx          # 데모 셀렉터
      1/page.tsx        # Demo 1: APEX (다크 럭셔리)
      2/page.tsx        # Demo 2: NEXUS (코퍼리트 커맨드)
      3/page.tsx        # Demo 3: ATELIER (에디토리얼)
      4/page.tsx        # Demo 4: AUTHORITY (한국 기업)
    about/page.tsx
    business/page.tsx
    portfolio/page.tsx
    support/
      page.tsx
      notice/page.tsx
      inquiry/page.tsx
  components/
    layout/
      Header.tsx
      Footer.tsx
    home/
      HeroSection.tsx
      BusinessSection.tsx
      (...)
    ui/                 # shadcn/ui 스타일 공용 컴포넌트
  lib/
    utils.ts            # cn() 유틸리티
```

---

## TypeScript 규칙

```typescript
// ✅ 올바른 패턴
"use client";
import { type FC } from "react";

interface Props { title: string; count?: number; }
const MyComponent: FC<Props> = ({ title, count = 0 }) => { ... };

// ✅ framer-motion ease 타입 처리 (v12 이슈)
transition={{ ease: [0.16, 1, 0.3, 1] as never }}

// ❌ 금지: any 타입 남용
const data: any = ...;
```

---

## Tailwind CSS v4 규칙

```css
/* globals.css — CSS-first 설정 */
@import "tailwindcss";

@theme {
  /* 브랜드 색상 토큰 */
  --color-navy: #0a1c4a;
  --color-orange: #f47c20;
  --color-cream: #f6f3ee;
}

/* 사용: bg-navy, text-orange, bg-cream */
```

**금지 사항:**
- `tailwind.config.js` 생성 (v4에서 불필요)
- `bg-[#0a1c4a]` 임의값 — 반드시 CSS 변수 토큰 사용
- `style={{}}` 인라인 스타일과 Tailwind 혼용 최소화

---

## 디자인 시스템

### 타이포그래피 스케일

| 용도 | 클래스 | 비고 |
|---|---|---|
| Display (히어로) | `text-[clamp(4.5rem,13vw,11rem)] font-black` | 감각적 크기 |
| H1 | `text-[clamp(2.8rem,6vw,5rem)] font-bold` | 섹션 제목 |
| H2 | `text-[clamp(2rem,4vw,3.2rem)] font-bold` | 서브섹션 |
| H3 | `text-2xl font-semibold` | 카드 제목 |
| Body | `text-base leading-relaxed` (16px) | 본문 |
| Caption | `text-sm` (14px) | 보조 텍스트 |
| Label | `text-xs tracking-widest uppercase` | 최소 사용 |

**규칙: label 클래스는 섹션당 최대 1회**

### 간격 (8px 기반 그리드)

| 용도 | 클래스 |
|---|---|
| 섹션 상하 | `py-24 md:py-36 xl:py-44` |
| 컨테이너 좌우 | `px-6 md:px-12 xl:px-20` |
| 컨테이너 최대폭 | `max-w-[1440px] mx-auto` |
| 컴포넌트 사이 | `gap-6`, `gap-10`, `gap-16` |
| 단락 사이 | `mb-4`, `mb-6` |

### 금지 디자인 패턴

❌ `border-r border-white/5 last:border-r-0` — 그리드 선 남발  
❌ 장식용 `|` 구분자  
❌ 불필요한 그라데이션 레이어 중첩  
❌ 모든 섹션에 동일한 텍스트 계층 반복  
❌ `text-[10px] tracking-[0.3em] uppercase` — 섹션마다 반복 사용  
❌ 배경 이미지에 그라데이션 오버레이 + 텍스트 오버레이 동시 적용

### 필수 디자인 원칙

✅ 섹션마다 **다른 배경색** (흰색/어두운 섹션 교번)  
✅ 히어로 텍스트는 **뷰포트 너비의 15-20%** 크기  
✅ 여백이 럭셔리 — **넉넉한 padding**  
✅ 이미지는 **최소 50vw** 이상의 공간 확보  
✅ CTA 버튼은 **명확한 대비색**으로 1개만

---

## 애니메이션 원칙

```typescript
// ✅ 표준 ease (framer-motion v12)
const ease = [0.16, 1, 0.3, 1] as never;

// ✅ whileInView 패턴 (스크롤 트리거)
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-10%" }}
  transition={{ duration: 0.8, ease }}
/>

// ❌ 금지: 복잡한 stagger 남발
// ❌ 금지: 모든 요소에 애니메이션
```

**규칙: 페이지당 최대 3가지 애니메이션 패턴**

---

## 데모 디자인 시스템

| 데모 | 테마 | 주색 | 강조 | 배경 |
|---|---|---|---|---|
| Demo 1 APEX | 다크 럭셔리 | `#f0f0f0` | `#e8721a` | `#060606` |
| Demo 2 NEXUS | 코퍼리트 커맨드 | `#0a1c4a` | `#f47c20` | `#fff` |
| Demo 3 ATELIER | 에디토리얼 | `#111111` | `#9b7840` | `#f9f6f1` |
| Demo 4 AUTHORITY | 한국 기업 | `#0f172a` | `#f47c20` | `#f4f6f9` |
