# CMS 설정 가이드 (Supabase)

관리자 CMS는 `/admin` 경로에서 동작합니다. Supabase(데이터베이스 + 인증)를
연결해야 실제로 사용할 수 있습니다. 아래 절차를 **한 번** 수행하세요.

## 1. Supabase 프로젝트 생성
1. https://supabase.com 에서 프로젝트를 생성합니다.
2. **Project Settings → API** 에서 다음 값을 복사합니다.
   - `Project URL`
   - `anon` `public` key

## 2. 환경변수 설정
`.env.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

Vercel 배포에도 동일한 두 변수를 **Project → Settings → Environment Variables**에
추가합니다. (`.env.local`은 커밋되지 않습니다.)

## 3. 데이터베이스 스키마 실행
Supabase 대시보드 **SQL Editor**에서 저장소의 [`supabase/schema.sql`](supabase/schema.sql)
전체를 붙여넣고 실행합니다. 테이블(`profiles`, `notices`, `portfolio`, `inquiries`)과
RLS 보안 정책이 생성됩니다.

## 4. 첫 관리자 계정
1. Supabase **Authentication → Users → Add user**로 이메일/비밀번호 계정을 만듭니다.
   (트리거가 `profiles` 행을 자동 생성합니다.)
2. SQL Editor에서 해당 계정을 관리자로 승격합니다.
   ```sql
   update public.profiles set role = 'admin' where email = 'you@example.com';
   ```
3. `/admin/login`에서 로그인합니다.

이후 관리자는 **회원 관리** 화면에서 다른 계정의 권한(`관리자`/`편집자`)을 바꿀 수
있습니다. 새 계정 초대는 Supabase 콘솔에서 진행합니다.

## 보안 설계 요약
- **인증**: Supabase Auth. 세션은 httpOnly 쿠키에 저장되며 미들웨어가 `/admin`을
  요청마다 검증합니다(`getUser()`로 JWT 재검증 — 위조/만료 토큰 차단).
- **권한(RLS)**: 모든 접근 통제는 데이터베이스 RLS로 강제합니다.
  - 문의(`inquiries`): 누구나 **접수(insert)만** 가능, 조회·수정은 staff만.
  - 게시물/시공사례: 게시된 것만 공개 조회, 편집은 staff만.
  - 회원/권한(`profiles`): 관리자(admin)만 변경.
- **역할**: `admin`(회원·권한 관리 포함), `editor`(콘텐츠·문의 처리).
- **시크릿**: 코드에 비밀번호/키를 두지 않습니다. 전부 환경변수.

## 미설정 상태
환경변수가 없으면 마케팅 사이트는 정상 동작하고, `/admin`은 "설정되지 않았습니다"
안내를 표시합니다. 공개 문의 폼은 접수 확인 UX를 유지합니다(설정 후 실제 저장).

## 공개 페이지 자동 반영 (구현됨)
- 공지(`notices`)·시공사례(`portfolio`)는 **DB에 게시된 행이 있으면 그것을,
  없으면 `site.ts` 정적 데이터를** 보여줍니다 (`src/lib/cms.ts`).
- 관리자에서 저장/삭제하면 `revalidatePath`로 홈·목록·상세가 즉시 재생성되고,
  그 외에도 5분(ISR) 주기로 갱신됩니다.
- 시공사례 이미지는 관리자 화면에서 업로드 → Supabase Storage
  `portfolio-images` 버킷(공개 읽기, staff 쓰기 — schema.sql에 정책 포함)에
  저장됩니다. 첫 등록 전까지는 기존 8건(정적)이 그대로 노출됩니다.
- 견적 문의 첨부파일: 고객이 최대 3개(개당 10MB)까지 도면·사진 등을 첨부할 수
  있습니다. **비공개** `inquiry-files` 버킷에 저장되며(schema.sql 재실행으로
  생성) 관리자 문의 화면에서만 서명 URL(1시간)로 다운로드됩니다.

## 다음 단계 (예정)
- 문의 접수 시 이메일 알림: Supabase Dashboard → Database Webhooks에서
  `inquiries` INSERT 웹훅 + 메일 서비스(예: Resend) 연동. 알림 수신 이메일과
  메일 서비스 키가 필요합니다.
- `cms.` 서브도메인 승격(커스텀 도메인 + DNS 준비 시 미들웨어 host 라우팅).
- 로그인 실패 레이트리밋 강화(Supabase Auth 설정).
