# Next.js 15.5.6 업그레이드 수정 사항 분석

## 개요
현재 프로젝트는 Next.js `14.2.25`에서 `15.5.6`으로 업그레이드되었습니다. 이 문서는 업그레이드로 인해 **수정이 필요한 부분**을 정리합니다.

---

## 🔴 필수 수정 사항

### 1. React 19 업그레이드

**현재 상태:**
```json
// package.json
"react": "^18.3.1",
"react-dom": "^18.3.1",
"@types/react": "^18.3.3",
"@types/react-dom": "^18.3.0"
```

**Next.js 15 요구사항:**
- Next.js 15는 **React 19를 최소 요구사항**으로 합니다.
- React 18을 사용하면 호환성 문제가 발생할 수 있습니다.

**수정 필요:**
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```

**영향받는 기능:**
- `useFormState` → `useActionState`로 변경 (React 19에서 deprecated)
- `useFormStatus`에 `data`, `method`, `action` 등의 추가 키 포함

**대응 방안:**
- `pnpm install react@latest react-dom@latest @types/react@latest @types/react-dom@latest`
- React 19 마이그레이션 가이드 참고

---

### 2. 비동기 API 전환 (가장 중요)

Next.js 15에서는 동적 API들이 **비동기 함수**로 변경되었습니다.

#### 2.1. `cookies()` 비동기 처리

**문제가 있는 파일:**

**`src/configs/fetch/fetch-interceptors.ts` (Line 22)**
```typescript
// ❌ 현재 코드 (동기)
const { cookies } = await import('next/headers')
accessToken = cookies().get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)?.value
```

**수정 필요:**
```typescript
// ✅ 수정 후 (비동기)
const { cookies } = await import('next/headers')
const cookieStore = await cookies()
accessToken = cookieStore.get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)?.value
```

**`src/actions/cookie.ts` (Lines 14, 20, 24)**
```typescript
// ❌ 현재 코드
export async function setCookie(...args: ...) {
  cookies().set(...args)  // 동기 호출
}

export async function removeCookie(...args: ...) {
  cookies().delete(...args)  // 동기 호출
}

export async function getCookie(...args: ...) {
  return cookies().get(...args)  // 동기 호출
}
```

**수정 필요:**
```typescript
// ✅ 수정 후
export async function setCookie(...args: ...) {
  const cookieStore = await cookies()
  cookieStore.set(...args)
}

export async function removeCookie(...args: ...) {
  const cookieStore = await cookies()
  cookieStore.delete(...args)
}

export async function getCookie(...args: ...) {
  const cookieStore = await cookies()
  return cookieStore.get(...args)
}
```

#### 2.2. `params` 비동기 처리

**문제가 있는 파일:**

**`src/app/api/cache/[[...revalidateName]]/route.ts` (Lines 43-51)**
```typescript
// ❌ 현재 코드
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      revalidateName: string | string[]
    }
  },
) {
  const { revalidateName } = params  // 동기 접근
  // ...
}
```

**수정 필요:**
```typescript
// ✅ 수정 후
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      revalidateName: string | string[]
    }>
  },
) {
  const { revalidateName } = await params  // 비동기 접근
  // ...
}
```

**참고:** 페이지 컴포넌트(`page.tsx`)에서도 `params`를 사용하는 경우 동일하게 수정이 필요합니다.

---

### 3. `@next/bundle-analyzer` 버전 업데이트

**현재 상태:**
```json
// package.json
"@next/bundle-analyzer": "^14.2.4"
```

**수정 필요:**
```json
{
  "devDependencies": {
    "@next/bundle-analyzer": "^15.5.6"
  }
}
```

**영향:**
- Next.js 15와 호환되지 않을 수 있습니다.
- 빌드 시 오류 발생 가능성

---

## 🟡 선택적 수정 사항 (권장)

### 4. 캐싱 동작 변경 대응

**변경 내용:**
- GET 라우트 핸들러가 기본적으로 캐싱되지 않음
- 클라이언트 라우터 캐시의 기본 만료 시간이 0으로 변경

**현재 프로젝트 영향:**
- `src/app/api/cache/[[...revalidateName]]/route.ts`는 DELETE 메서드만 사용하므로 직접적인 영향 없음
- 향후 GET 라우트 핸들러 추가 시 명시적 캐싱 설정 필요

**대응 방안 (필요 시):**
```javascript
// next.config.js
module.exports = {
  experimental: {
    clientRouterCacheConfig: {
      default: {
        revalidate: false  // 이전 동작 유지
      }
    }
  }
}
```

---

### 5. ESLint 통합 변경

**변경 내용:**
- `next lint` 명령어가 더 이상 권장되지 않음
- 명시적인 린터 구성 사용 권장

**현재 프로젝트:**
```json
// package.json
"lint": "pnpm type-check && next lint"
```

**대응 방안:**
- 현재 설정도 동작하지만, 향후 변경 대비 필요
- ESLint 설정을 명시적으로 관리하는 것을 권장

---

## 🟢 확인 필요 사항

### 6. `useSearchParams()` 사용 확인

**현재 상태:**
- `src/app/login/_source/components/login-form.tsx` - `useSearchParams()` 사용 (클라이언트 컴포넌트)
- `src/app/login/_source/components/social-button.tsx` - `useSearchParams()` 사용 (클라이언트 컴포넌트)
- `src/app/social/callback/_source/components/link-callback.tsx` - `useSearchParams()` 사용 (클라이언트 컴포넌트)

**확인 결과:**
- ✅ 모두 `'use client'` 지시자를 사용하는 클라이언트 컴포넌트
- ✅ `useSearchParams()`는 클라이언트 훅이므로 비동기 변경의 영향 없음
- ✅ `src/app/login/page.tsx`에서 Suspense로 감싸져 있어 정상 동작

**수정 불필요:** 클라이언트 컴포넌트에서는 변경 없음

---

### 7. 미들웨어 확인

**현재 상태:**
- `src/middleware.ts`에서 대부분의 코드가 주석 처리됨
- `NextRequest`와 `NextResponse` 사용 - 정상 동작

**확인 결과:**
- ✅ 미들웨어는 `NextRequest`를 직접 받으므로 `params` 비동기 변경의 영향 없음
- ✅ 미들웨어는 Edge Runtime에서 실행되므로 별도 수정 불필요

**수정 불필요:** 현재 상태로 정상 동작

---

### 8. 이미지 최적화 확인

**현재 상태:**
- `src/components/image-as-next.tsx`에서 `next/image` 사용
- `next.config.js`에서 `remotePatterns` 설정

**확인 결과:**
- ✅ Next.js 15에서도 `next/image` API는 동일하게 동작
- ✅ `remotePatterns` 설정도 유지됨

**수정 불필요:** 현재 설정 유지

---

## 📋 수정 체크리스트

### 즉시 수정 필요 (Critical)

- [ ] **React 19 업그레이드**
  - [ ] `react` 및 `react-dom` 업데이트
  - [ ] `@types/react` 및 `@types/react-dom` 업데이트
  - [ ] React 19 breaking changes 확인 및 대응

- [ ] **`cookies()` 비동기 처리**
  - [ ] `src/configs/fetch/fetch-interceptors.ts` 수정
  - [ ] `src/actions/cookie.ts` 수정

- [ ] **`params` 비동기 처리**
  - [ ] `src/app/api/cache/[[...revalidateName]]/route.ts` 수정

- [ ] **`@next/bundle-analyzer` 업데이트**
  - [ ] `package.json`에서 버전 업데이트

### 테스트 필요

- [ ] 타입 체크: `pnpm type-check`
- [ ] 빌드 테스트: `pnpm build`
- [ ] 개발 서버 테스트: `pnpm dev`
- [ ] API 라우트 테스트: `/api/cache/*` 엔드포인트 확인
- [ ] 쿠키 관련 기능 테스트: 로그인/인증 플로우 확인

---

## 🔧 자동 마이그레이션 도구 사용

Next.js에서 제공하는 codemod를 사용하여 일부 변경사항을 자동으로 적용할 수 있습니다:

```bash
npx @next/codemod@latest upgrade latest
```

**주의:** 이 도구는 모든 변경사항을 자동으로 처리하지 못할 수 있으므로, 수동으로 확인 및 수정이 필요합니다.

---

## 📝 파일별 수정 상세

### 1. `src/configs/fetch/fetch-interceptors.ts`

**수정 전:**
```typescript
const setAuthorizationHeader = async () => {
  let accessToken: string | undefined | null

  if (typeof window !== 'undefined') {
    accessToken = clientCookie.get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
  } else {
    const { cookies } = await import('next/headers')
    accessToken = cookies().get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)?.value
  }

  return accessToken ? `Bearer ${accessToken}` : undefined
}
```

**수정 후:**
```typescript
const setAuthorizationHeader = async () => {
  let accessToken: string | undefined | null

  if (typeof window !== 'undefined') {
    accessToken = clientCookie.get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
  } else {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    accessToken = cookieStore.get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)?.value
  }

  return accessToken ? `Bearer ${accessToken}` : undefined
}
```

---

### 2. `src/actions/cookie.ts`

**수정 전:**
```typescript
'use server'

import { cookies } from 'next/headers'

export async function setCookie(...args: ...) {
  cookies().set(...args)
}

export async function removeCookie(...args: ...) {
  cookies().delete(...args)
}

export async function getCookie(...args: ...) {
  return cookies().get(...args)
}
```

**수정 후:**
```typescript
'use server'

import { cookies } from 'next/headers'

export async function setCookie(...args: ...) {
  const cookieStore = await cookies()
  cookieStore.set(...args)
}

export async function removeCookie(...args: ...) {
  const cookieStore = await cookies()
  cookieStore.delete(...args)
}

export async function getCookie(...args: ...) {
  const cookieStore = await cookies()
  return cookieStore.get(...args)
}
```

---

### 3. `src/app/api/cache/[[...revalidateName]]/route.ts`

**수정 전:**
```typescript
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      revalidateName: string | string[]
    }
  },
) {
  const isValidApiKey = req.headers.get('x-api-key') === API_KEY

  if (!isValidApiKey) {
    return handleInvalidRequest()
  }

  const { revalidateName } = params

  if (!revalidateName) {
    return new Response(JSON.stringify({}), {
      status: 400,
      statusText: 'bad request',
    })
  }

  const searchParams = new URLSearchParams(req.nextUrl.searchParams)
  const id = searchParams.get('id')

  return handleValidRequest(revalidateName, id)
}
```

**수정 후:**
```typescript
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      revalidateName: string | string[]
    }>
  },
) {
  const isValidApiKey = req.headers.get('x-api-key') === API_KEY

  if (!isValidApiKey) {
    return handleInvalidRequest()
  }

  const { revalidateName } = await params

  if (!revalidateName) {
    return new Response(JSON.stringify({}), {
      status: 400,
      statusText: 'bad request',
    })
  }

  const searchParams = new URLSearchParams(req.nextUrl.searchParams)
  const id = searchParams.get('id')

  return handleValidRequest(revalidateName, id)
}
```

---

### 4. `package.json`

**수정 전:**
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^14.2.4",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0"
  }
}
```

**수정 후:**
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^15.5.6",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```

---

## ⚠️ 주의사항

1. **React 19 호환성**
   - 일부 서드파티 라이브러리가 React 19를 아직 지원하지 않을 수 있습니다.
   - `@chakra-ui/react`, `@emotion/react` 등이 React 19를 지원하는지 확인 필요

2. **타입 오류**
   - TypeScript 타입 정의가 변경되었을 수 있습니다.
   - `pnpm type-check` 실행 후 발생하는 타입 오류를 해결해야 합니다.

3. **테스트 필요**
   - 인증/인가 플로우 (쿠키 사용)
   - API 라우트 동작
   - 서버 액션 동작

---

## 📚 참고 자료

- [Next.js 15 업그레이드 가이드](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [React 19 릴리스 노트](https://react.dev/blog/2024/12/05/react-19)
- [Next.js 15.5 릴리스 노트](https://nextjs.org/blog/next-15-5)

---

## 결론

Next.js 15.5.6 업그레이드로 인해 **4개의 파일**에서 수정이 필요합니다:

1. ✅ `src/configs/fetch/fetch-interceptors.ts` - `cookies()` 비동기 처리
2. ✅ `src/actions/cookie.ts` - `cookies()` 비동기 처리
3. ✅ `src/app/api/cache/[[...revalidateName]]/route.ts` - `params` 비동기 처리
4. ✅ `package.json` - React 19 및 의존성 업데이트

모든 수정 사항은 **비동기 API 전환**과 **React 19 요구사항** 때문입니다. 수정 후 충분한 테스트를 통해 정상 동작을 확인하시기 바랍니다.

