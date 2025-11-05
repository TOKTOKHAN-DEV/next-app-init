# ESLint 플러그인 정리 가이드

## 개요

Next.js 15.5.6 및 React 19 업그레이드에 맞춰 ESLint 관련 플러그인들을 정리합니다.

**결정 사항:** `@toktokhan-dev/eslint-config`를 사용하지 않고 직접 관리하는 방식으로 전환합니다.

---

## 현재 설치된 ESLint 관련 패키지

### 직접 설치된 패키지 (package.json) - 2024년 현재 상태

```json
{
  "devDependencies": {
    "eslint": "^9.39.1", // ✅ 이미 업그레이드됨
    "@next/eslint-plugin-next": "^15.5.6", // ✅ 최신 버전
    "typescript-eslint": "^8.46.3", // ✅ 이미 설치됨
    "eslint-plugin-react": "^7.37.5", // ✅ 이미 설치됨
    "eslint-plugin-react-hooks": "^5.2.0", // ✅ 이미 설치됨
    "eslint-config-prettier": "^9.1.2" // ✅ 이미 설치됨
  }
}
```

### 제거 예정 패키지

- `@toktokhan-dev/eslint-config@^0.0.2` - 제거 결정됨

---

## ✅ 현재 상태 확인 (대부분 완료됨)

### 1. ESLint Core

**현재:** `eslint@^9.39.1`  
**상태:** ✅ **이미 업그레이드 완료**

**확인:**

- Next.js 15와 호환되는 ESLint 9 사용 중
- 추가 작업 불필요

---

### 2. TypeScript ESLint

**현재:** `typescript-eslint@^8.46.3`  
**상태:** ✅ **이미 설치 및 업그레이드 완료**

**확인:**

- ESLint 9, TypeScript 5.9, React 19 완전 호환
- 추가 작업 불필요

---

### 3. eslint-plugin-react-hooks

**현재:** `eslint-plugin-react-hooks@^5.2.0`  
**상태:** ✅ **이미 설치 및 업그레이드 완료**

**확인:**

- React 19 지원
- ESLint 9 호환
- 추가 작업 불필요

---

### 4. eslint-plugin-react

**현재:** `eslint-plugin-react@^7.37.5`  
**상태:** ✅ **이미 설치됨** (최신 버전 확인 권장)

**확인:**

- React 19 호환성 확인 필요
- 최신 버전으로 업데이트 검토 가능

**권장 업데이트:**

```bash
pnpm update eslint-plugin-react@latest
```

---

### 5. @next/eslint-plugin-next

**현재:** `@next/eslint-plugin-next@^15.5.6`  
**상태:** ✅ **이미 최신 버전** (유지)

**확인:** Next.js 15.5.6과 버전이 일치하므로 유지

---

### 6. eslint-config-prettier

**현재:** `eslint-config-prettier@^9.1.2`  
**상태:** ✅ **이미 설치됨** (정상)

**확인:**

- ESLint와 Prettier 충돌 방지
- 추가 작업 불필요

---

## ❌ 제거 필요

### 1. @toktokhan-dev/eslint-config

**현재:** `@toktokhan-dev/eslint-config@^0.0.2`  
**상태:** 🔴 **제거 필요**

**제거 이유:**

- 직접 관리 방식으로 전환 결정
- 필요한 패키지들이 이미 직접 설치됨

**제거 명령어:**

```bash
pnpm remove @toktokhan-dev/eslint-config
```

**주의:** 제거 전에 `.eslintrc.js` 파일을 새로운 설정으로 업데이트해야 합니다.

---

### 2. eslint-plugin-prettier (확인 필요)

**상태:** ⚠️ **확인 필요** (간접 의존성일 수 있음)

**제거 이유 (있다면):**

1. **성능 저하**: Prettier를 ESLint 규칙으로 실행하면 매번 포맷팅이 실행되어 느림
2. **역할 중복**: 포맷팅은 Prettier가, 린팅은 ESLint가 담당하는 것이 명확함
3. **오류 구분 어려움**: 포맷팅 문제와 실제 린트 오류를 구분하기 어려움
4. **권장 방식**: `eslint-config-prettier`만 사용하여 충돌 방지

**확인 방법:**

```bash
pnpm list eslint-plugin-prettier
```

**대체 방안:**

- `eslint-config-prettier` 사용 (이미 설치됨)
- Prettier는 별도로 실행: `pnpm format`
- IDE에서 저장 시 자동 포맷팅 설정

---

## ⚠️ 추가 설치 필요 (선택사항)

### 1. eslint-plugin-import (권장)

**상태:** 🔵 **선택 설치**

**용도:**

- Import 문의 유효성 검사
- Import 순서 및 중복 검사
- TypeScript 경로 별칭 지원

**설치:**

```bash
pnpm add -D eslint-plugin-import@^2.31.0
```

---

### 2. eslint-plugin-jsx-a11y (권장)

**상태:** 🔵 **선택 설치**

**용도:**

- JSX 요소의 접근성 검사
- 웹 접근성 표준 준수 확인

**설치:**

```bash
pnpm add -D eslint-plugin-jsx-a11y@^6.10.2
```

---

## ⚙️ ESLint 설정 파일 업데이트 필요

### 현재 상태

**`.eslintrc.js`:**

```javascript
const config = {
  extends: [
    '@toktokhan-dev/eslint-config/base', // ❌ 제거 필요
    'plugin:@next/next/recommended',
  ],
}

module.exports = config
```

### 업데이트 필요

`@toktokhan-dev/eslint-config`를 제거하고 직접 설정으로 변경해야 합니다.

**참고:** 상세한 설정 예시는 `ESLINT_DIRECT_SETUP.md` 파일을 참고하세요.

### ESLint 설정 파일 형식

**현재:** `.eslintrc.js` (Legacy 형식)

**ESLint 9 변경사항:**

- Flat Config (`eslint.config.mjs`) 권장
- Legacy 형식도 지원하지만, Flat Config로 마이그레이션 권장

**대응 방안:**

- **옵션 1**: Legacy 형식 유지 (`.eslintrc.js` 업데이트)
  - 기존 형식 유지하면서 설정만 업데이트
  - 간단하고 빠른 마이그레이션
- **옵션 2**: Flat Config로 마이그레이션 (권장)
  ```bash
  npx @eslint/migrate-config .eslintrc.js
  ```
  - ESLint 9의 권장 형식
  - 장기적으로 유지보수에 유리

---

## 📋 수정 체크리스트

### ✅ 완료된 항목

- [x] **ESLint 9 업그레이드** - `eslint@^9.39.1` 설치 완료
- [x] **TypeScript ESLint 설치** - `typescript-eslint@^8.46.3` 설치 완료
- [x] **React 플러그인 설치** - `eslint-plugin-react@^7.37.5` 설치 완료
- [x] **React Hooks 플러그인 설치** - `eslint-plugin-react-hooks@^5.2.0` 설치 완료
- [x] **Prettier 통합** - `eslint-config-prettier@^9.1.2` 설치 완료

### 🔴 즉시 수정 필요

- [ ] **`.eslintrc.js` 파일 업데이트**

  - `@toktokhan-dev/eslint-config` 참조 제거
  - 직접 설정으로 변경
  - `ESLINT_DIRECT_SETUP.md` 참고

- [ ] **@toktokhan-dev/eslint-config 제거**

  ```bash
  pnpm remove @toktokhan-dev/eslint-config
  ```

- [ ] **eslint-plugin-react 최신 버전 확인**
  ```bash
  pnpm update eslint-plugin-react@latest
  ```

### 🔵 선택적 수정 (권장)

- [ ] **eslint-plugin-import 설치** (권장)

  ```bash
  pnpm add -D eslint-plugin-import@^2.31.0
  ```

- [ ] **eslint-plugin-jsx-a11y 설치** (권장)

  ```bash
  pnpm add -D eslint-plugin-jsx-a11y@^6.10.2
  ```

- [ ] **eslint-plugin-prettier 확인 및 제거** (있다면)

  ```bash
  pnpm list eslint-plugin-prettier
  # 있다면 제거
  pnpm remove eslint-plugin-prettier
  ```

- [ ] **ESLint Flat Config 마이그레이션** (선택사항)
  ```bash
  npx @eslint/migrate-config .eslintrc.js
  ```
  - 마이그레이션 후 설정 확인 및 테스트

### ✅ 테스트 필요

- [ ] `.eslintrc.js` 업데이트 후 `pnpm lint` 실행 확인
- [ ] 타입 체크: `pnpm type-check`
- [ ] 빌드 테스트: `pnpm build`
- [ ] 개발 서버: `pnpm dev`
- [ ] 린트 오류 없이 정상 동작 확인

---

## 🔧 수정 상세 가이드

### 1. package.json 현재 상태

**현재 설치된 패키지:**

```json
{
  "devDependencies": {
    "eslint": "^9.39.1", // ✅ 완료
    "@next/eslint-plugin-next": "^15.5.6", // ✅ 완료
    "typescript-eslint": "^8.46.3", // ✅ 완료
    "eslint-plugin-react": "^7.37.5", // ✅ 완료
    "eslint-plugin-react-hooks": "^5.2.0", // ✅ 완료
    "eslint-config-prettier": "^9.1.2" // ✅ 완료
  }
}
```

**제거할 패키지:**

```json
{
  "devDependencies": {
    "@toktokhan-dev/eslint-config": "^0.0.2" // ❌ 제거 필요
  }
}
```

---

### 2. .eslintrc.js 업데이트

**현재 상태:**

```javascript
// .eslintrc.js
const config = {
  extends: [
    '@toktokhan-dev/eslint-config/base', // ❌ 제거 필요
    'plugin:@next/next/recommended',
  ],
}

module.exports = config
```

**업데이트 후 (Legacy 형식 유지):**

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended',
    'prettier', // eslint-config-prettier - 항상 마지막에 위치
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/react-in-jsx-scope': 'off', // Next.js는 자동으로 import
    'react/prop-types': 'off', // TypeScript로 타입 체크
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'build/',
    'dist/',
    '*.config.js',
    '*.config.mjs',
  ],
}
```

**주의:** 상세한 설정은 `ESLINT_DIRECT_SETUP.md` 파일을 참고하세요.

---

### 3. Flat Config 마이그레이션 (선택사항)

**Flat Config로 전환하는 경우:**

```bash
npx @eslint/migrate-config .eslintrc.js
```

또는 수동으로 `eslint.config.mjs` 생성 (예시는 `ESLINT_DIRECT_SETUP.md` 참고)

---

## 📊 패키지 정리 요약

| 패키지                         | 현재 버전  | 권장 버전 | 상태         | 비고                  |
| ------------------------------ | ---------- | --------- | ------------ | --------------------- |
| `eslint`                       | **9.39.1** | 9.39.1    | ✅ 완료      | 업그레이드 완료       |
| `@next/eslint-plugin-next`     | **15.5.6** | 15.5.6    | ✅ 유지      | 이미 최신             |
| `typescript-eslint`            | **8.46.3** | 8.46.3    | ✅ 완료      | 설치 완료             |
| `eslint-plugin-react`          | **7.37.5** | 최신 확인 | 🟡 확인 필요 | 업데이트 검토         |
| `eslint-plugin-react-hooks`    | **5.2.0**  | 5.2.0     | ✅ 완료      | 설치 완료             |
| `eslint-config-prettier`       | **9.1.2**  | 9.1.2     | ✅ 완료      | 설치 완료             |
| `@toktokhan-dev/eslint-config` | 0.0.2      | -         | ❌ 제거 필요 | 제거 결정됨           |
| `eslint-plugin-import`         | -          | ^2.31.0   | 🔵 선택 설치 | 권장 (미설치)         |
| `eslint-plugin-jsx-a11y`       | -          | ^6.10.2   | 🔵 선택 설치 | 권장 (미설치)         |
| `eslint-plugin-prettier`       | 확인 필요  | -         | ❌ 제거 권장 | 확인 후 제거 (있다면) |

---

## 🚨 주의사항

1. **설정 파일 업데이트 순서**

   - **먼저** `.eslintrc.js` 파일을 업데이트해야 합니다.
   - 그 다음 `@toktokhan-dev/eslint-config`를 제거합니다.
   - 순서를 지키지 않으면 린트 오류가 발생할 수 있습니다.

2. **ESLint 9 마이그레이션**

   - Flat Config로 전환하는 것이 권장되지만, 기존 설정도 동작합니다.
   - 점진적 마이그레이션 가능: `ESLINT_USE_FLAT_CONFIG=false` 설정
   - Legacy 형식(`.eslintrc.js`)도 계속 지원됨

3. **React 19 호환성**

   - React 19와 ESLint 플러그인 호환성 확인 완료
   - `eslint-plugin-react-hooks` v5가 React 19를 지원
   - `eslint-plugin-react` v7.37.5는 React 19 호환

4. **타입 체크 성능**

   - `@typescript-eslint/recommended-type-checked`는 타입 정보를 사용하므로 느릴 수 있음
   - 필요 시 `recommended`만 사용 고려

5. **테스트 중요성**
   - 설정 변경 후 모든 린트 규칙이 정상 동작하는지 확인
   - CI/CD 파이프라인에서도 테스트 필요
   - `pnpm lint` 실행하여 오류 확인

---

## 📚 참고 자료

- [ESLint 9 Migration Guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0)
- [TypeScript ESLint v8 Release Notes](https://typescript-eslint.io/blog/announcing-typescript-eslint-v8/)
- [Next.js 15 ESLint Guide](https://nextjs.org/docs/app/building-your-application/configuring/eslint)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)

---

## 결론

### ✅ 완료된 항목

1. ✅ **ESLint 9 업그레이드** - `eslint@^9.39.1` 설치 완료
2. ✅ **TypeScript ESLint 설치** - `typescript-eslint@^8.46.3` 설치 완료
3. ✅ **React 플러그인 설치** - 모두 설치 완료
4. ✅ **Prettier 통합** - `eslint-config-prettier` 설치 완료

### 🔴 즉시 수정 필요

1. **`.eslintrc.js` 파일 업데이트** - `@toktokhan-dev/eslint-config` 제거 및 직접 설정으로 변경
2. **@toktokhan-dev/eslint-config 제거** - 패키지 제거
3. **설정 테스트** - `pnpm lint` 실행하여 정상 동작 확인

### 🔵 선택적 수정 (권장)

1. **eslint-plugin-import 설치** - Import 문 검증 (권장)
2. **eslint-plugin-jsx-a11y 설치** - 접근성 검사 (권장)
3. **eslint-plugin-react 최신 버전 확인** - 업데이트 검토
4. **Flat Config 마이그레이션** - 장기적으로 권장하지만 필수 아님

### 📝 다음 단계

1. `ESLINT_DIRECT_SETUP.md` 파일 참고하여 `.eslintrc.js` 업데이트
2. `@toktokhan-dev/eslint-config` 제거
3. `pnpm lint` 실행하여 정상 동작 확인
4. 필요 시 추가 플러그인 설치 (`eslint-plugin-import`, `eslint-plugin-jsx-a11y`)

**대부분의 필수 패키지는 이미 설치되어 있으므로, 설정 파일 업데이트만 완료하면 됩니다.**
