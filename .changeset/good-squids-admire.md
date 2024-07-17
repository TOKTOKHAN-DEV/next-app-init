---
'@toktokhan-dev/next-app-init': patch
---

patch package lodash

lodash 모듈이 내부적으로 new Function 을 사용중이라 edge runtime 에서 실행이 되지 않는 이슈를 수정했습니다.

pnpm patch 를 사용하여 lodash package 의 `Function("return this")` 코드를 `globalThis` 를 사용하도록 변경했습니다.

#### 참고

- [pnpm patch](https://pnpm.io/cli/patch)
- [lodash github issue](https://github.com/lodash/lodash/issues/5525)
- [Nextjs: edge-dynamic-code-evaluation](https://nextjs.org/docs/messages/edge-dynamic-code-evaluation)
