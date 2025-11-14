---
'@toktokhan-dev/next-app-init': major
---

# Core Changes

- Core framework version upgrade

  - next@15.5.6
  - react@19.0.0, react-dom@19.0.0, @types/react@19.0.0, @types/react-dom@19.0.0

- @toktokhan-dev/eslint-conifg, @toktokhan-dev/prettier-config, @toktokhan-dev/ts-config 제거
  - 이 레포지토리에서 관련 package를 관리하는 것으로 변경
    - _+add dependency_) typescript-eslint@^8.0.0, eslint-plugin-react@^7.37.0, eslint-plugin-react-hooks@^5.0.0, eslint-config-prettier@^9.1.0
    - .prettierrc.js -> 기존 설정 유지
    - .eslintrc.js + .eslintignore -> 삭제 및 eslint.config.mjs + @typescript-eslint recommended 적용
      - [no-restricted-imports + @chakra-ui/react](https://chakra-ui.com/guides/component-bundle-optimization)

## Misc Changes

- @react-compiler + @babel-plugin-react-compiler
  - ⚠️ next@15.5.6에서 react-compiler는 [실험 기능으로 적용](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/reactCompiler)되었습니다. 선택적으로 사용해 주세요
- @phosphor-icons/react
- @next/third-parties@15.5.6
