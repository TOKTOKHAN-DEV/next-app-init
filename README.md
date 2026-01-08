# Next.js starter (App Router) [![](https://img.shields.io/badge/node-v20+-blue)](https://nodejs.org/en/) [![](https://img.shields.io/badge/pnpm-v8.15.9+-green.svg)](https://pnpmpkg.com/)

Next.js App Router 기반의 스타터 프로젝트입니다. 공통 인프라(로그인, 소셜 로그인, 테마, 상태관리 등)를 포함하고 있어 신규 프로젝트의 베이스로 사용할 수 있습니다.

**주요 기술 스택**

- Next.js 15.5.9 (App Router)
- React 19.0.3
- TypeScript 5.4.5
- Chakra UI v3.28.1 (Panda CSS)
- Zustand 4.5.5 (상태 관리)
- TanStack Query v5.45.1 (React Query)
- 자체 개발 CLI 도구 (tokript2)

# 🚀 Quick Start

Use this template 버튼을 활용해서 프로젝트의 repository를 생성해주세요.

## 환경 설정

1. **환경변수 설정**

`.env.local` 파일을 생성하고, 아래 [환경 변수](#-환경-변수) 섹션에 나온 키들을 설정합니다.

```bash
touch .env.local
```

2. **패키지 설치 및 개발 서버 실행**

```bash
pnpm install
pnpm dev
```

# Scripts

프로젝트 시작 스크립트부터, 업무를 위한 유용한 스크립트에 대한 설명입니다. 패키지 매니저는 pnpm을 사용합니다.

## 기본 실행 스크립트

### 개발 모드 시작하기

```bash
pnpm run dev
```

Turbopack 기반 개발 서버를 시작합니다.

### 프로덕션 모드 시작하기

개발 모드와 다르게, build된 파일로 프로젝트를 시작합니다.

```bash
pnpm run start
```

### Build & 분석

```bash
# 프로덕션 빌드
pnpm run build

# 번들 크기 분석
pnpm run analyze
```

## 코드 품질 관리

### Lint & Type Check

```bash
# 타입 체크 + ESLint 실행
pnpm run lint

# 스테이징된 파일만 검사
pnpm run lint:staged

# 타입 체크만 실행
pnpm run type-check
```

### 코드 포맷팅

```bash
pnpm run format
```

### 테스트

```bash
# 전체 테스트 실행 (커버리지 포함)
pnpm run test

# 와치 모드로 테스트
pnpm run test:watch
```

## 자동화 도구 (tokript2)

회사에서 개발한 CLI 도구로 다양한 코드 생성 작업을 자동화합니다.

### 커밋 컨벤션

```bash
pnpm run commit
```

회사 커밋 컨벤션에 맞는 커밋 메시지 작성을 도와줍니다.

### 코드 자동 생성

#### API 생성

```bash
pnpm run tokript gen:api
```

Swagger 스키마에서 다음을 자동 생성합니다:

- API 함수 (fetch 기반)
- TypeScript 타입 정의
- React Query 훅 (useQuery, useMutation)

#### 아이콘 컴포넌트 생성

```bash
pnpm run tokript gen:icon
```

`public/icons/` 폴더의 SVG 파일들을 Chakra UI v3 호환 Icon 컴포넌트로 자동 변환합니다.

> **주의**: SVG 파일의 `fill`이나 `stroke` 값을 `"currentColor"`로 설정하면 `color` props로 색상 제어가 가능합니다.

#### 이미지 경로 객체 생성

```bash
pnpm run tokript gen:img
```

`public/images/` 폴더 구조를 분석하여 타입 안전한 이미지 경로 객체를 생성합니다.

#### 테마 타입 생성

```bash
pnpm run tokript gen:theme
```

Chakra UI v3 테마 설정을 분석하여 TypeScript 타입 정의를 생성합니다.

- 커스텀 컬러 자동완성
- 반응형 텍스트 스타일 (mobile/tablet/desktop)
- 다크모드 토큰 지원

### 유틸리티

#### 정리 작업

```bash
pnpm run clean-up
```

`@delete:line`, `@delete:file`, `@delete:folder` 주석이 포함된 예시 파일들을 제거합니다.

#### 체크리스트 진행률 업데이트

```bash
pnpm run checklist:progress
```

프로젝트 체크리스트의 완료율을 자동으로 계산하여 업데이트합니다.

# Git Hooks & Life Cycle Scripts

### pre-commit

커밋 전에 스테이징된 파일에 대해 lint와 prettier를 실행합니다.

```bash
npx lint-staged
```

### pre-push

원격 저장소에 push하기 전에 빌드 테스트를 실행합니다.

```bash
pnpm run build
```

### post-install

패키지 설치 후 Chakra UI 테마 타입을 자동 생성합니다.

```bash
pnpm run theme
```

### prepare

전체 패키지 설치 시 Husky 설정과 Node.js 버전을 확인합니다.

```bash
husky install && node_modules/.bin/ls-engines
```

# 📁 폴더 구조

Next.js 15의 App Router를 사용한 폴더 구조입니다.

## Root Directory Layout

```
├── public                  # 정적 자원
│   ├── fonts              # 폰트 파일
│   ├── icons              # SVG 아이콘
│   └── images             # 이미지 파일
├── src
│   ├── actions            # Server Actions
│   ├── apis               # API 정의 및 React Query
│   ├── app                # App Router (페이지 라우팅)
│   ├── components         # 공용 컴포넌트
│   ├── configs            # 앱 설정 파일
│   ├── constants          # 상수 정의
│   ├── generated          # 자동 생성 파일
│   ├── hooks              # 공용 훅
│   ├── providers          # Context Providers
│   ├── stores             # Zustand 상태 관리
│   ├── types              # 공용 타입 정의
│   └── utils              # 유틸리티 함수
├── README.md
└── ...
```

## App Directory (페이지 라우팅)

App Router 방식을 사용합니다.

```
app/
├── api/                  # API Routes
│   ├── cache/            # 캐시 무효화 API
│   └── test/             # 테스트용 API (cookies/fetch/revalidate)
├── login/                # 로그인 페이지
│   ├── _source/         # 로그인 페이지 전용 소스
│   │   ├── components/  # 로그인 컴포넌트
│   │   └── hooks/       # 로그인 훅
│   └── page.tsx         # 로그인 페이지
├── social/               # 소셜 로그인
│   └── callback/         # 소셜 콜백
│       ├── _source/     # 콜백 페이지 전용 소스
│       │   ├── components/  # 콜백 컴포넌트
│       │   └── types/       # 콜백 타입
│       └── page.tsx         # 콜백 페이지
├── test/                 # 테스트 페이지
├── layout.tsx           # 루트 레이아웃
├── page.tsx             # 홈페이지 (/)
├── not-found.tsx        # 404 페이지
├── error.tsx            # 에러 페이지
├── robots.ts            # 로봇 텍스트 생성
└── sitemap.xml          # 사이트맵
```

**특징:**

- 폴더 기반 라우팅 (폴더명이 URL 경로)
- `layout.tsx`로 중첩 레이아웃 관리
- Server Components, Server Actions 지원
- `_source` 패턴으로 페이지별 소스 관리

## \_source 패턴

App Router에서 페이지별 소스를 체계적으로 관리하는 패턴입니다.

```
app/example/
├── _source/              # 페이지 전용 소스
│   ├── components/      # 페이지 전용 컴포넌트
│   ├── hooks/           # 페이지 전용 훅
│   ├── types/           # 페이지 전용 타입
│   └── utils/           # 페이지 전용 유틸
└── page.tsx             # 페이지 컴포넌트
```

## Server Actions

```
actions/
└── cookie.ts            # 쿠키 관련 서버 액션
```

**사용 예시:**

```typescript
// actions/cookie.ts
'use server'

export async function setCookie(key: string, value: string) {
  const { cookies } = await import('next/headers')
  cookies().set(key, value)
}
```

## Components Directory

```
components/
├── @layout/              # 레이아웃 관련 컴포넌트
├── @modal/               # 모달 컴포넌트
├── @template/            # 템플릿 컴포넌트
├── analytics/            # 분석 도구 컴포넌트 (GA, GTM 등)
├── ui/                   # UI 컴포넌트 (Chakra UI v3 확장)
│   ├── avatar.tsx        # 아바타
│   ├── button.tsx        # 버튼
│   ├── dialog.tsx        # 다이얼로그
│   ├── drawer.tsx        # 드로어
│   └── ...
├── form-helper.tsx       # 폼 도우미
├── image-as-next.tsx     # 이미지 래퍼
├── open-btn.tsx          # 링크/버튼 오프너
├── select.tsx            # 셀렉트 래퍼
├── splash.tsx            # 스플래시 화면
└── ...
```

**특징:**

- `@` 접두사로 카테고리 구분
- `ui/` 폴더는 Chakra UI v3 확장 컴포넌트들
- 재사용 가능한 컴포넌트 위주

## 상태 관리 (Zustand)

```
stores/
├── cookie/              # 쿠키 상태
├── global/              # 전역 상태
├── local/               # 로컬 상태 (localStorage 연동)
└── session/             # 세션 상태 (sessionStorage 연동)
```

## API 구조

```
apis/
├── @http-client/        # HTTP 클라이언트 설정
└── s3-file-uploader/    # 파일 업로드 API
    ├── S3FileUploaderApi.ts           # API 함수
    └── S3FileUploaderApi.query.ts     # React Query 훅
```

## 설정 파일들

```
configs/
├── fetch/              # Fetch 클라이언트 설정
├── react-query/        # TanStack Query 설정
├── theme/              # Chakra UI v3 테마
│   ├── recipes/       # 컴포넌트 스타일
│   ├── slot-recipes/  # 복합 컴포넌트 스타일
│   ├── semantic-tokens/ # 시맨틱 토큰 (다크모드 등)
│   └── tokens/        # 디자인 토큰
└── env.ts              # 환경변수 타입 정의
```

## 자동 생성 파일들

```
generated/
├── fonts/              # 폰트 설정
├── icons/              # SVG → React 컴포넌트
├── path/               # 이미지/라우트 경로 객체
└── tokens/             # 테마 타입 정의
```

## Providers

```
providers/
├── app-provider.tsx    # 앱 전체 프로바이더
└── theme-provider.tsx  # 테마 프로바이더
```

# 환경 변수

`.env.local` 파일을 생성하여 아래 환경 변수들을 설정하세요.

## 필수 환경 변수

```bash
# 앱 기본 설정
NEXT_PUBLIC_API_BASE_URL=       # API 서버 URL
NEXT_PUBLIC_APP_NAME=           # 앱 이름
NEXT_PUBLIC_DOMAIN=             # 도메인

# 인증
NEXT_PUBLIC_AUTH_TOKEN_KEY=     # 인증 토큰 키

# 소셜 로그인
NEXT_PUBLIC_GOOGLE_CLIENT_ID=   # Google OAuth
NEXT_PUBLIC_KAKAO_CLIENT_ID=    # Kakao OAuth
NEXT_PUBLIC_NAVER_CLIENT_ID=    # Naver OAuth
NEXT_PUBLIC_APPLE_CLIENT_ID=    # Apple OAuth
NEXT_PUBLIC_FACEBOOK_CLIENT_ID= # Facebook OAuth

# 분석 도구
NEXT_PUBLIC_GA_KEY=             # Google Analytics
NEXT_PUBLIC_GTM_KEY=            # Google Tag Manager
NEXT_PUBLIC_FACEBOOK_PIXEL_KEY= # Facebook Pixel
NEXT_PUBLIC_KAKAO_PIXEL_KEY=    # Kakao Pixel

# API Revalidation
NEXT_X_API_KEY=                 # API Revalidation 키
```

환경 변수는 `src/configs/env.ts`에서 타입 안전하게 관리됩니다.

# 개발 가이드

## 코딩 컨벤션

- **TypeScript**: 엄격한 타입 검사 활성화 (`strict: true`)
- **ESLint**: `eslint.config.mts` (flat config) 기반 설정 사용
- **Prettier**: `.prettierrc.js` 설정 사용
- **Import 순서**: `@trivago/prettier-plugin-sort-imports`로 자동 정렬

## 페이지 추가 방법

### 1. 기본 페이지 구조

```typescript
// app/example/page.tsx
export default function ExamplePage() {
  return <div>Example Page</div>
}
```

### 2. \_source 패턴 활용

```bash
app/example/
├── _source/
│   ├── components/
│   │   └── example-form.tsx
│   └── hooks/
│       └── useExampleForm.ts
└── page.tsx
```

```typescript
// app/example/page.tsx
import { ExampleForm } from './_source/components/example-form'

export default function ExamplePage() {
  return <ExampleForm />
}
```

### 3. 레이아웃 추가

```typescript
// app/example/layout.tsx
export default function ExampleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="example-layout">
      {children}
    </div>
  )
}
```

## Server Components vs Client Components

### Server Components (기본값)

```typescript
// 데이터 페칭, 서버에서 렌더링
export default async function ServerPage() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data}</div>
}
```

### Client Components

```typescript
'use client' // 클라이언트 컴포넌트 지시자

import { useState } from 'react'

export default function ClientPage() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

## Server Actions 사용법

```typescript
// actions/example.ts
'use server'

export async function createExample(formData: FormData) {
  const name = formData.get('name')
  // 서버 작업 수행
  return { success: true }
}
```

```typescript
// app/example/_source/components/example-form.tsx
import { createExample } from '@/actions/example'

export function ExampleForm() {
  return (
    <form action={createExample}>
      <input name="name" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## 성능 최적화

### 이미지 최적화

- Next.js Image 컴포넌트 사용 권장
- `ImageAsNext` 래퍼 컴포넌트 활용
- 적절한 `sizes` 속성 설정

### 코드 스플리팅

```typescript
// 동적 임포트
import { lazy } from 'react'

const HeavyComponent = lazy(() => import('./heavy-component'))
```

### 메타데이터 최적화

```typescript
// app/example/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Example Page',
  description: 'Example page description',
}
```

## 테스트

- **Jest**: 테스트 프레임워크
- **Testing Library**: React 컴포넌트 테스트
- **MSW**: API 모킹

```bash
# 테스트 실행
pnpm test

# 와치 모드
pnpm test:watch
```

# 배포

## 빌드 최적화

- **SWC 컴파일러**: 빠른 컴파일 속도
- **이미지 최적화**: 자동 WebP 변환
- **폰트 최적화**: 로컬 폰트 자체 호스팅
- **App Router**: 향상된 SEO 및 성능

## Vercel 배포 (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

## 기타 배포 플랫폼

Next.js는 다양한 플랫폼에서 배포 가능:

- Netlify
- AWS (Amplify, EC2)
- Google Cloud Platform
- 자체 호스팅

# 문제 해결

## 자주 발생하는 이슈

### 1. 테마 타입 오류

```bash
pnpm run theme
```

### 2. 하이드레이션 불일치

- Server/Client 컴포넌트 구분 확인
- `useClient` 훅으로 클라이언트 확인

### 3. Server Actions 오류

- `'use server'` 지시자 확인
- 서버 컴포넌트에서만 직접 호출

### 4. 빌드 실패

```bash
# 타입 체크
pnpm run type-check

# 린트 실행
pnpm run lint
```

## 도움이 필요할 때

- **회사 CLI 도구**: `pnpm run tokript --help`
- **Next.js 공식 문서**: [nextjs.org](https://nextjs.org)
- **Chakra UI v3 문서**: [v3.chakra-ui.com](https://v3.chakra-ui.com)
