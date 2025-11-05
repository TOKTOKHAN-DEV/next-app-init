# ESLint 직접 설정 가이드

## 개요
`@toktokhan-dev/eslint-config`를 사용하지 않고 직접 ESLint를 설정하기 위해 필요한 패키지 목록입니다.

---

## 📦 설치 필요 패키지

### 필수 패키지 (필수 설치)

#### 1. TypeScript ESLint (ESLint 9 호환)
```bash
pnpm add -D typescript-eslint@^8.0.0
```

**설명:**
- ESLint 9, TypeScript 5.9, React 19 완전 호환
- 단일 패키지로 `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin` 포함
- TypeScript 코드 린팅을 위한 필수

---

#### 2. React 플러그인
```bash
pnpm add -D eslint-plugin-react@^7.37.0 eslint-plugin-react-hooks@^5.0.0
```

**설명:**
- `eslint-plugin-react`: React 컴포넌트 린팅 규칙
- `eslint-plugin-react-hooks`: React Hooks 사용 규칙 (React 19 지원)
- React 19 및 ESLint 9 호환

---

#### 3. Prettier 통합 (이미 설치되어 있을 수 있음)
```bash
pnpm add -D eslint-config-prettier@^9.1.0
```

**설명:**
- ESLint와 Prettier 간 충돌 방지
- `eslint-plugin-prettier`는 **제거 권장** (성능 저하)
- Prettier는 별도로 실행: `pnpm format`

---

### 선택적 패키지 (권장)

#### 4. Import 정렬 및 검증
```bash
pnpm add -D eslint-plugin-import@^2.31.0
```

**설명:**
- Import 문의 유효성 검사
- Import 순서 및 중복 검사
- TypeScript 경로 별칭 지원

---

#### 5. 접근성 (a11y) 검사
```bash
pnpm add -D eslint-plugin-jsx-a11y@^6.10.2
```

**설명:**
- JSX 요소의 접근성 검사
- 웹 접근성 표준 준수 확인
- 선택적이지만 권장

---

## 📋 전체 설치 명령어

### 필수 패키지만 설치
```bash
pnpm add -D \
  typescript-eslint@^8.0.0 \
  eslint-plugin-react@^7.37.0 \
  eslint-plugin-react-hooks@^5.0.0 \
  eslint-config-prettier@^9.1.0
```

### 필수 + 권장 패키지 설치
```bash
pnpm add -D \
  typescript-eslint@^8.0.0 \
  eslint-plugin-react@^7.37.0 \
  eslint-plugin-react-hooks@^5.0.0 \
  eslint-config-prettier@^9.1.0 \
  eslint-plugin-import@^2.31.0 \
  eslint-plugin-jsx-a11y@^6.10.2
```

---

## 🗑️ 제거할 패키지

### 제거 명령어
```bash
pnpm remove @toktokhan-dev/eslint-config
```

**주의:** 
- 제거 전에 새로운 설정 파일을 작성해야 합니다.
- 제거 후 `pnpm install` 실행하여 lock 파일 업데이트

---

## ⚙️ ESLint 설정 파일

### 옵션 1: Legacy 형식 (`.eslintrc.js`) - 현재 형식 유지

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
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier', // eslint-config-prettier - 항상 마지막에 위치
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
    'jsx-a11y',
  ],
  settings: {
    react: {
      version: 'detect', // React 버전 자동 감지
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // TypeScript 관련
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // React 관련
    'react/react-in-jsx-scope': 'off', // Next.js는 자동으로 import
    'react/prop-types': 'off', // TypeScript로 타입 체크
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Import 관련
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
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

---

### 옵션 2: Flat Config 형식 (`eslint.config.mjs`) - ESLint 9 권장

```javascript
// eslint.config.mjs
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import typescriptEslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import prettierConfig from 'eslint-config-prettier'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

export default typescriptEslint.config(
  // Base configs
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...typescriptEslint.configs.recommendedTypeChecked,
  
  // Next.js config
  {
    plugins: {
      '@next/next': fixupPluginRules(nextPlugin),
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
  
  // React config
  {
    plugins: {
      react: fixupPluginRules(reactPlugin),
      'react-hooks': fixupPluginRules(reactHooksPlugin),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  
  // Import config
  {
    plugins: {
      import: fixupPluginRules(importPlugin),
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  
  // JSX A11y config
  {
    plugins: {
      'jsx-a11y': fixupPluginRules(jsxA11yPlugin),
    },
    rules: {
      ...jsxA11yPlugin.configs.recommended.rules,
    },
  },
  
  // Prettier config (always last)
  prettierConfig,
  
  // Project-specific config
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
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
    },
  },
  
  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      '*.config.js',
      '*.config.mjs',
    ],
  },
)
```

**Flat Config 사용 시 추가 패키지:**
```bash
pnpm add -D @eslint/compat @eslint/eslintrc
```

---

## 📊 패키지 요약

### 필수 설치 패키지

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `typescript-eslint` | ^8.0.0 | TypeScript 린팅 |
| `eslint-plugin-react` | ^7.37.0 | React 컴포넌트 린팅 |
| `eslint-plugin-react-hooks` | ^5.0.0 | React Hooks 린팅 |
| `eslint-config-prettier` | ^9.1.0 | Prettier 충돌 방지 |

### 권장 설치 패키지

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `eslint-plugin-import` | ^2.31.0 | Import 문 검증 |
| `eslint-plugin-jsx-a11y` | ^6.10.2 | 접근성 검사 |

### 이미 설치된 패키지 (유지)

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `eslint` | ^9.39.1 | ESLint 코어 |
| `@next/eslint-plugin-next` | ^15.5.6 | Next.js 린팅 |
| `prettier` | ^3.3.2 | 코드 포맷팅 |

### 제거할 패키지

| 패키지 | 버전 | 제거 이유 |
|--------|------|-----------|
| `@toktokhan-dev/eslint-config` | ^0.0.2 | 직접 관리로 전환 |

---

## 🔄 마이그레이션 순서

1. **새 패키지 설치**
   ```bash
   pnpm add -D typescript-eslint@^8.0.0 eslint-plugin-react@^7.37.0 eslint-plugin-react-hooks@^5.0.0 eslint-config-prettier@^9.1.0
   ```

2. **설정 파일 작성**
   - `.eslintrc.js` 수정 또는 `eslint.config.mjs` 생성

3. **테스트**
   ```bash
   pnpm lint
   ```

4. **기존 패키지 제거**
   ```bash
   pnpm remove @toktokhan-dev/eslint-config
   ```

5. **최종 확인**
   ```bash
   pnpm install
   pnpm lint
   pnpm type-check
   ```

---

## ⚠️ 주의사항

1. **TypeScript 경로 별칭**
   - `tsconfig.json`의 `paths` 설정이 제대로 인식되는지 확인
   - `eslint-plugin-import`의 `typescript` resolver 사용

2. **타입 체크 성능**
   - `@typescript-eslint/recommended-type-checked`는 타입 정보를 사용하므로 느릴 수 있음
   - 필요 시 `recommended`만 사용 고려

3. **Prettier 통합**
   - `eslint-plugin-prettier`는 사용하지 않음 (성능 저하)
   - `eslint-config-prettier`만 사용하여 충돌 방지
   - Prettier는 별도 실행

4. **Flat Config 마이그레이션**
   - ESLint 9에서는 Flat Config가 권장되지만 필수 아님
   - Legacy 형식도 계속 지원됨
   - 점진적 마이그레이션 가능

---

## 📚 참고 자료

- [TypeScript ESLint v8 Guide](https://typescript-eslint.io/)
- [ESLint 9 Migration Guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0)
- [Next.js ESLint Configuration](https://nextjs.org/docs/app/building-your-application/configuring/eslint)
- [React ESLint Plugin](https://github.com/jsx-eslint/eslint-plugin-react)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)

---

## 결론

### 최소 설치 (필수)
```bash
pnpm add -D typescript-eslint@^8.0.0 eslint-plugin-react@^7.37.0 eslint-plugin-react-hooks@^5.0.0 eslint-config-prettier@^9.1.0
```

### 권장 설치 (필수 + 권장)
```bash
pnpm add -D typescript-eslint@^8.0.0 eslint-plugin-react@^7.37.0 eslint-plugin-react-hooks@^5.0.0 eslint-config-prettier@^9.1.0 eslint-plugin-import@^2.31.0 eslint-plugin-jsx-a11y@^6.10.2
```

설치 후 `.eslintrc.js` 파일을 위의 예시를 참고하여 작성하시면 됩니다.

