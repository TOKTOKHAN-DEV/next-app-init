## [1.2.1](https://github.com/TOKTOKHAN-DEV/next-init-2.0/compare/v1.2.0...v1.2.1) (2024-03-08)

## 0.0.7

### Patch Changes

- [`292540c`](https://github.com/TOKTOKHAN-DEV/next-app-init/commit/292540c4ce972202a5e6901bca9afafc45a4ac40) Thanks [@Panxoat](https://github.com/Panxoat)! - .gitignore pnpm-lock.yaml 제외

## 0.0.6

### Patch Changes

- [`1f5ff10`](https://github.com/TOKTOKHAN-DEV/next-app-init/commit/1f5ff100d35da6f94c61542c4c840284971d508a) Thanks [@Panxoat](https://github.com/Panxoat)! - package.json 수정: pnpm theme && next dev

- [`0877f0f`](https://github.com/TOKTOKHAN-DEV/next-app-init/commit/0877f0f639e3d939315563463e6f30e8b2a67cad) Thanks [@Panxoat](https://github.com/Panxoat)! - ### 1. Design Token 최신화
  - Colors
  - Typography

  ### 2. 의존성 추가
  - @trivago/prettier-plugin-sort-imports
    - gen:theme 실행시 필요함

## 0.0.5

### Patch Changes

- [`631f993`](https://github.com/TOKTOKHAN-DEV/next-app-init/commit/631f99303b19ddbdd067de848f45790ef58e524b) Thanks [@Eunkyung-Son](https://github.com/Eunkyung-Son)! - chakra-ui v3 및 @toktokhan-dev/\* 패키지 업데이트

## 0.0.4

### Patch Changes

- [`67581f2`](https://github.com/TOKTOKHAN-DEV/next-app-init/commit/67581f28dde4076ca02791ad99ae361c0fc958f6) Thanks [@Eunkyung-Son](https://github.com/Eunkyung-Son)! - chakra-ui v3 및 @toktokhan-dev/\* 패키지 업데이트

## 0.0.3

### Patch Changes

- 5487e2a: fix type

  자잘한 타입이 수정되었습니다.

- da6edb8: patch package lodash

  lodash 모듈이 내부적으로 new Function 을 사용중이라 edge runtime 에서 실행이 되지 않는 이슈를 수정했습니다.

  pnpm patch 를 사용하여 lodash package 의 `Function("return this")` 코드를 `globalThis` 를 사용하도록 변경했습니다.

  #### 참고
  - [pnpm patch](https://pnpm.io/cli/patch)
  - [lodash github issue](https://github.com/lodash/lodash/issues/5525)
  - [Nextjs: edge-dynamic-code-evaluation](https://nextjs.org/docs/messages/edge-dynamic-code-evaluation)

- 40ced79: improve cookie, font

  ### Cookie 관련 개선 사항
  - useClientCookie 를 제거했습니다. 클라이언트 에서 cookie 의 수정이 필요할땐 server action 을 통해서 수정해야합니다.
    - 랜더링에 영향이 없는 경우는 client cookie 를 사용해서 수정하는것을 권장합니다.

  - cookie 관련 랜더링 케이스의 경우는, 서버 컴포넌트에서 쿠키를 하위 컴포넌트들에게 전달하는 방식으로 해결하는것을 권장합니다.

  ### Font 관련 개선 사항
  - css 대응을 위해 chakra font type 을 느슨하게 수정했습니다.

- 44478ee: update-s3-flow

  ## s3-file-uploader 모듈 변경사항

  똑똑한 개발자의 서버 s3 구현사항이 달라짐에 따라, s3-file-upload 모듈이 수정되었습니다.

  ### Server & Client Flow 상 변경점
  1. backend server 로 부터 받는 presigned-url api 응답 schema 가 달라졌습니다. query param 으로 전달되던 값이 response body 의 fields 로 변경되었습니다.

  #### 기존

  ```json
  {
    "url": "https://s3.ap-northeast-2.amazonaws.com/toktokhan-dev/Key=...&SomeField=..."
  }
  ```

  #### 변경

  ```json
  {
    "url": "https://s3.ap-northeast-2.amazonaws.com/toktokhan-dev/Key=...",
    "fields": {
      "key": "...",
      "SomeField": "..."
    }
  }
  ```

  2. s3 로 upload 시 요청 method 와 reqeuest type 이 변경되었습니다.

  #### 기존
  - method: `PUT`
  - request-type: `File Object`

  ```ts
  const { url , fields } = await presignedUrlApi.createPresignedUrl({...});

  fetch(url, {
    method: 'PUT',
    body: file
  });

  ```

  #### 변경
  - method: `POST`
  - request-type: `FormData`

  변경된 요청 방법은 presigned-url 의 응답으로 받아온 fields 와 File, Content-Type 을 포함하는 `FormData` 로 만들어서 전달합니다.

  ```ts

  const { url , fields } = await presignedUrlApi.createPresignedUrl({...});

  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append('file', file);
  formData.append('Content-Type', file.type);

  fetch(url, {
    method: 'POST',
    body: formData
  });

  ```

  ### Client S3FileUploader 모듈 변경점

  #### 기존

  기존에는 presigned url 을 프로젝트 서버로 요청해 생성후에, s3 에 파일을 업로드 하는 플로우를 한번에 처리하기위해 아래와 같은 모듈이 있었습니다.

  ```ts
  class S3FileUploader {
      private _createPresignedUrl () {...}
      private _uploadFileToS3 () {...}

      async uploadFile (file: File) {
          const { url, fields } = await this._createPresignedUrl();
          await this._uploadFileToS3(url, fields, file);
      }

      async uploadFiles (file: File[]) {
          const { url, fields } = await this._createPresignedUrl();
          const result =  Promise.allSattled(file.map(uplaodFileToS3));
          return {
              fulfilled: result.filter(r => r.status === 'fulfilled'),
              rejected: result.filter(r => r.status === 'rejected')
          }
      }
  }
  ```

  #### 변경

  위의 방식은 gen:api 를 통해 생성된 모듈을 사용하지 못한다는 단점이 있고, File 객체의 형식이 다른 react-native 를 포함해 프로젝트마다 달라 질 수 있는 구현 사항에 따라,
  S3FileUploaderApi 모듈을 직접 수정하게 될 여지가 있다는 단점이 있었습니다.

  따라서 아래처럼, 사용되는 함수를 주입받아 flow 만 처리하는 모듈이 새롭게 만들어 졌고, S3FileUplader 모듈은 오직 s3 에 파일을 업로드 하는 역할만을 수행하도록 변경되었습니다.

  ```ts
  // S3FileUpladerApi.ts
  class S3FileUploaderApi {
      async uploadFileToS3 ({ url, formData }) {...}
  }
  // S3FileUploaderApi.query.ts
  export const { uploadFile, uploadFiles } = createS3UploadFlow({
    // 아래 부분은 프로젝트 상황에 맞게 직접 작성합니다.
    prepareUpload: async (file: File) => {
      const { name, type } = file
      // gen:api 로 생성된  presigned url 을 생성하는 api 를 직접 import 해서 사용합니다.
      const { fields, url } = await presignedUrlApi.presignedUrlCreate({ name, type })
      const formData = new FormData()

      Object.entries(fields).forEach(([k, v]) => formData.append(k, v))
      formData.append('Content-Type', file.type)
      formData.append('file', file)

      return {
        url,
        formData,
        fields,
        file,
      }
    },
    // 아래 부분은 프로젝트 상황에 맞게 직접 작성합니다.
    uploadFileToS3: async ({ url, formData, file, fields }) => {
      await s3FileUploaderApi.uploadFileToS3({ url, formData })
      ...
    },
  })

  const useS3FileUploadMutate = (...) => useMutation({ mutationFn: uploadFile })
  ```

- 2a70ddd: improve FormHelper

  #### FormHelper Component 개선사항
  - prop 네이밍 개선
    - style 관련 prop 을 그룹화
    - message 관련 prop 을 그룹화

  #### etc
  - 안쓰는 web-storage module 제거

- 8713eb6: update state-manager to zustand

  ### 전역/지역/스토리지 상태 관리 라이브러리가 변경되었습니다.

  Nextjs 와 같은 SSR 환경에선, 서버에서의 상태변경이 일어날 경우 각기 다른 클라이언트에서 서버상태를 공유하게 되는 이슈가 생길 수 있기 때문에, zustand 를 context 와 함께 사용하는 것을 권장합니다.
  [zustand-with-Next.js] https://zustand.docs.pmnd.rs/guides/nextjs

  자세한 예시와 사용법은 템플릿의 TokGuide drawer 의 `state` tab
  또는 [TOKDOCS 문서](https://toktokhan-dev-docs.vercel.app/docs/zustand/overview) 를 참고해주세요.

  TokGuide example path: `src/components/@Drawer/TokGuideDrawer/components/contents/State/State.tsx`

  ### 상태관리 라이브러리가 변경됨에 따라, cookie 또한 SyncedCookie 에서 React-Cookie 로 변경되었습니다.

  클라이언트 에서의 쿠키관리는 `react-cookie` 를 사용하고, 서버에선 `next-cookie` 를 사용합니다.
  - 관리 파일
    - 공용 Key: `src/constants/cookie-keys.ts`
    - 클라이언트: `src/stores/cookie/store.ts`
    - 서버: `src/actions/cookie.ts`

- b36c716: - @toktokhan-dev/\* 패키지 업데이트
  - update tok-cli-config
  - social login
  - publc images, icons 경로 수정
  - chakra next link 사용
  - update token.json
  - colorMode for ssr
  - Pretendard Variable fontFamily 등록
  - slack notification (admin)
  - 똑똑한 개발자 > 똑똑한개발자
- faf193f: update version of pacakges: `@toktokhan-dev/*`

  `@toktokhan-dev/*` 패키지의 버전을 업데이트 했습니다.

## 0.0.2

### Patch Changes

- edd2f1e: add tokript commit
- e966806: - @toktokhan-dev/\* 의 package들을 업데이트 했습니다.
  - HomeLayout 마크업 및 main width 추가
- 4f04a02: add gitignore

## 0.0.1

### Patch Changes

- b69d5c4: 똑똑한개발자 컨벤션이 담긴 Next.js app-router 가 적용 된 보일러 플레이트 입니다.

## 0.0.1

### Patch Changes

- b749cd0: initialize

## 1.3.1

### Patch Changes

- Updated dependencies [bb60ca7]
  - @toktokhan-dev/react-universal@0.3.1
  - @toktokhan-dev/react-web@0.3.1
  - @toktokhan-dev/universal@1.3.1

## 1.3.0

### Minor Changes

- 7baac8a: test version up

### Patch Changes

- Updated dependencies [7baac8a]
  - @toktokhan-dev/react-universal@0.3.0
  - @toktokhan-dev/react-web@0.3.0
  - @toktokhan-dev/universal@1.3.0

## 1.2.0

### Minor Changes

- ea08e81: update temp

### Patch Changes

- Updated dependencies [ea08e81]
  - @toktokhan-dev/react-universal@0.2.0
  - @toktokhan-dev/react-web@0.2.0
  - @toktokhan-dev/universal@1.2.0

## 1.1.0

### Minor Changes

- b75ab4c: update

### Patch Changes

- Updated dependencies [b75ab4c]
  - @toktokhan-dev/react-web@0.1.0

## 1.0.0

### Major Changes

- 47d8b3e: 최초 배포

### Bug Fixes

- **analytics.ts:** 🐛analytics setup ([c06d0c9](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c06d0c9d5c228e7db0097d58d88f737b6b5ba60c))

# [1.2.0](https://github.com/TOKTOKHAN-DEV/next-init-2.0/compare/v1.1.0...v1.2.0) (2024-03-08)

### Bug Fixes

- 🐛on Exit ([b588cf3](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/b588cf3c6b889ffcf189d66e1aaf76a789b6e28d))
- 🐛on-exit fix ([6b0a0f9](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/6b0a0f9adc26c0983e7992d102675074e8636247))
- 🐛onExit bug fix ([34dd1d8](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/34dd1d82fa825a92c43f1898caa884dcbedc3306))

### Features

- 🎸add type-check on lint ([d6f50ff](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d6f50ff5a936eca1cef9a750b5dc6c8671dd6d5b))
- **ContextSection.tsx:** 🎸create context example ([37f5376](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/37f5376a7449b4200b865bf1b622d3fe74bc916d))
- **format-server-errors.ts:** 🎸format and style console output for server errors ([7b137b6](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/7b137b61e506885f770ff74f6d86a4f44ddaf2a5))
- **Home.tsx:** 🎸Restructure the Context Folder with Example Components ([abcf675](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/abcf6754642501d4b9df2a7060e6b1184cc01c61))
- **useInvalidateQuires.ts:** 🎸for invalidate querykey ([9da287f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/9da287fa86d3f663cd7e075fa0a67ecf0db225ce))

### Performance Improvements

- **next-fonts:** ⚡️change to variable font (extension woff to woff2) ([ce2edf8](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/ce2edf8b1f51333e7f9d63a2d2649e1846e06ffe))

# [1.1.0](https://github.com/TOKTOKHAN-DEV/next-init-2.0/compare/v1.0.1...v1.1.0) (2023-09-15)

### Bug Fixes

- **generate-sitemap-json.js:** 🐛use dynamic import ([df72d3d](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/df72d3d8e373bd746ba90831fe4c8deaf6a44d8e))
- **LodashSection:** 🐛import lodash => lodash-es ([6581d3b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/6581d3befb4ae0c73b35dba5844c232db325e956))
- **next.config.js:** 🐛add braket ([ae2d0f3](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/ae2d0f32f31348e88481cbbd9cab13b9ee6efebf))
- **pre-push:** 🐛check-list script ([2ffb0b3](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2ffb0b3828bc8238a353eb285973c73616de1afc))
- **pre-push:** 🐛script for checklist ([98e4ae5](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/98e4ae5f0689cee71387b26f67e304d540d638b2))
- **theme:** 🐛fix overriding issue ([a61a2ed](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a61a2ed1cb2e14a989c72578f6ee59726f901ebf))
- **theme:** 🐛fix: change letter case ([6f05a89](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/6f05a89526d7e717d54bb71e4e1a3e3251609537))
- **yarn.lock:** 🐛update ([7e245d5](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/7e245d574ea631ca0280e590f85ef7cb523299b3))
- **yarn.lock:** 🐛update ([ce89e9d](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/ce89e9d2be598c56641dc0ff807938bfc35cc49c))

### Features

- 🎸add next.config options and replace lodash with lodash-es ([0ba20d9](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/0ba20d9721182d83fb283da8a8df78e9d2d4bb6a))
- 🎸checklist commit on pre-push ([2b2f330](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2b2f3306eeebb667202715680ed0610e9d4c8582))
- 🎸checklist, script ([0f7c22c](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/0f7c22c4824eb2ad12aa564af3a7f783cb33cb3f))
- **ChakraThemeSection.tsx:** 🎸apply theme section ([8223951](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/8223951f2e6b8682c62fff65f7c64caa50a721b3))
- **commit-msg:** 🎸apply conventional commit msg husky ([5e98129](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/5e9812904af5ef2cf32d067316a3b128708df429))
- **theme:** 🎸update to chakra theme ([c967ef4](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c967ef49762e2db9ffb119a64c7f2f33947e8984))

### Reverts

- Revert "chore(package.json): 🤖add lodash to devDependencies" ([c240833](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c2408332de6071ff98a90c3ab860ac2a2278e31b))

## [1.0.1](https://github.com/TOKTOKHAN-DEV/next-init-2.0/compare/v1.0.0...v1.0.1) (2023-07-18)

### Bug Fixes

- 🐛package name ([0ce7e48](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/0ce7e48c070a7a160190146fd97c44a7b9d75562))

# 1.0.0 (2023-07-18)

### Bug Fixes

- **\_document.js:** 🐛mute google-analytics-script ([f50e898](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/f50e898f3b5cdee4a9e496807b8b9444bcfaa981))
- **.prettierrc.js:** 🐛 print-width 160 => 80 ([4dbc521](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/4dbc521be4c483d81c4837dafbd675a2ba367ec8))
- **@Layout:** 🐛 remove not-using ([92e9e83](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/92e9e83febf89abd74ed774843e149da98bdbbc8))
- **@Layout:** 🐛folder-structure ([c643585](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c643585b01fd41b69e9b3dfb1d290e352d74aeaf))
- 🐛 (\_app) initailze theme ([8553df4](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/8553df485cd05f8e36c2a61b7b05692e8e7be2b8))
- 🐛 (api-gen) template of query-type, call ([82cdac5](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/82cdac510c079398754d3b7b4da9b9bea2441d7c))
- 🐛 (api-gen) templates of query-hooks ([56504e1](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/56504e1b118f7378d2185c1788d602472061fca7))
- 🐛 (gen-api) management of script-env, http-client ([a38d1e0](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a38d1e0f46a8dbac08297889f9f5979c2a03a5fd))
- 🐛 (swagger) remove swagger folder, fix procress ([f7f9457](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/f7f9457a14e2590a0282d0e139f24b4be8a2265a))
- 🐛 apply prettier on .js ([95acd17](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/95acd17e848aa504273b9e94a6ac69317bdf646d))
- 🐛 build error ([493713f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/493713f6a744e0bc3bebca51d365e373d20e205b))
- 🐛 build error ([46afc32](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/46afc320abc7f755c0f8e1f36effcb68e6869a6e))
- 🐛 build error ([6229eb8](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/6229eb848964d63238bbea28f775547314a2c856))
- 🐛 build error ([a83f620](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a83f62059afa52927851ba644ecfcb79307e83bf))
- 🐛 build error ([4d3bcc0](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/4d3bcc0c7d59f544d194e7076f5c8a5f19e5f743))
- 🐛 build-error ([fa46128](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/fa4612883f89e12408565f025d5446c9ddfcec25))
- 🐛 folder-structure by "src" folder ([7b9e0d4](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/7b9e0d40c8602da3adf6e8b3cc4e41f9c806ca3f))
- 🐛 missing for build ([0681aa8](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/0681aa874d11ab54df75912dc46c2cfade142883))
- 🐛 remove unused ([44bbfe4](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/44bbfe4af2cddc97012c5619edd25de5fd43171e))
- 🐛 replaceall -> replace ([c85ea9f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c85ea9f091ba1ac0106b5ad6c064e8b326e91fcb))
- 🐛.data -> constants ([50ed090](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/50ed0905d4551563b5907145679ef7d1775993b3))
- 🐛.types -> types ([d9ed9f6](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d9ed9f63eb04e6565026a6de63850be3fe45607c))
- 🐛axios refresh error ([d0f0cfe](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d0f0cfe1e8be1a852fd2fe2da42ceea447618218))
- 🐛axios version ([9ddfb61](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/9ddfb61e81fa7677202fcf48bb091cd3ac8698e2))
- 🐛build error ([3e08963](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/3e08963b0feb67d4e4b908fa4ad3d986c862e9db))
- 🐛change router.push to router.replce ([9c9852b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/9c9852bdfa931763b63c7a5af82648d14b576eb6))
- 🐛color scheme default dark value ([62c0d8b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/62c0d8bdc828a0c552828558ed368cc2337d087b))
- 🐛config, package version of lint ([4fedd89](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/4fedd893d3c33d05eb6960c95f1427a0d12310ca))
- 🐛fix fonts format ([298cf7e](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/298cf7ec4e0182831ac76e45b717bce0ce337c47)), closes [#58](https://github.com/TOKTOKHAN-DEV/next-init-2.0/issues/58)
- 🐛folder-naming ([55fdb41](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/55fdb41cc6d0e6b82b57debb2744772a19083fae))
- 🐛folder-structure ([aebb418](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/aebb4180a1e08288afc6451397d108236ba0d1cb))
- 🐛move useAppStore: useAppStore.ts -> store.ts ([d5dc8dd](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d5dc8dde0bfeeb16b03500e0825393d3817cb1e3))
- 🐛naming \_fragments -> components, \_hooks -> hooks ([bdfb780](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/bdfb7803a14eeaa2c8c605bcfe63fad5acfc64f4))
- 🐛next-font bug on chakra-cli ([d98abeb](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d98abebe7cdcfb3cb0bcde062d43ca644e72b2e4))
- 🐛ordering of react-query-type ([d781491](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d781491d164a131b92808de341790ddc31a008c3))
- 🐛path alias: @_ -> @/_, import-path-order ([3d9820d](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/3d9820dad6b7a44f5641932e167e30beede7485c))
- 🐛remove auth-api ([76e0fa8](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/76e0fa88b6a9a4f4ddd9f84110d9a74e7a37a5ed))
- 🐛remove default import of React ([efad0f9](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/efad0f99b1a6149c1e86473871269179c789f246))
- 🐛remove un-used ([b7c58a1](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/b7c58a10be84ad8928360342c3d8478c8d76c035))
- 🐛tokript version 0.9.2 -> 0.9.3 ([801844f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/801844f06f9d6f2082ec1bc6cbd5b117d9499148))
- 🐛tokript version 0.9.3->0.9.4: gen:img ([5071e88](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/5071e88b0650aae0e425868853776ccd702e65b0))
- 🐛useAuth -> useRefreshInterval ([a46c307](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a46c30771b1e8a91df395a348f637b66ac482524))
- add .idea ([ff2b6ad](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/ff2b6ad9bd7503a3c7735444a99eeb97d9bce1d0))
- **api-gen:** 🐛 add condition for prettier on type-file ([2673dbc](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2673dbc050ed63131898793c1049b32002c654dc))
- **api-gen:** 🐛 logics by path-changed ([adabc25](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/adabc256216f168c192088db5af7c3ef73569e31))
- **api-gen:** 🐛 type folder naming, add axios instace ([660aca4](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/660aca4423900dacc1540e2942e730170c1ef6e0))
- **apis:** 🐛 react-query-type ([344c1f0](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/344c1f0a89c4e36ab739e20249209f6c34206ca2))
- **apis:** 🐛 update by convetion ([3d4f886](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/3d4f886b08573acfcd9b08f84e3cf2a5dd9439cd))
- **apis:** 🐛example convention ([d54bef9](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d54bef912fa567fae9bd528e7a422b888064d61c))
- **breakpoints.ts:** 🐛export naming ([c6901c1](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c6901c1d1234290b596b2fb039870f47352c8edc))
- **breakpoints:** add 2xl breakpoint ([9b7376c](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/9b7376c0cd63490c38b62c28f2fd59f397d50378))
- build error ([79c711d](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/79c711dcbbb0b4f2e9d28417f50b96c130ef05df))
- **Calendar:** 🐛 naming, folder-structure ([e0f03c0](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/e0f03c0780392dde8851b3ccb0690a8cdaed5851))
- change git file name ([2f2fed1](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2f2fed17b95bbc331b800d4d41f4b31e56101bbe))
- **changelog.config.js:** 🐛 commit-scope ([f74088e](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/f74088e30f80963805dbc22522a9ad7101aa8f7b))
- **CheckBox:** 🐛 naming ([2419eb5](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2419eb525489c555becbf11a2cea4ac4d8f1a702))
- **CheckBox:** 🐛 path ([5675293](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/56752939a472402eb5a1523839b0f30f1f8423bd))
- **color-generator:** 🐛 add comment, and fix logic ([b5cb219](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/b5cb219325de95d63c9e74fc669302c1d3fd82b4))
- **components:** 🐛 clean-up ([899e661](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/899e661c89d15f27694878c0bb44a9839b1b55c5))
- **components:** 🐛 remove Input component, add Form-Helper ([868f258](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/868f258777a88a98f60605f1c2ecde11569f748d))
- **config:** 🐛 missing key ([c5383ad](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c5383adb1fbb9a92021a02aea74177f5beeb5670))
- **config:** 🐛domain naming ([cfb9095](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/cfb909551c607dfba794bfcb3ab028b1bda92d50))
- **config:** 🐛remove requireEnv func ([f63439f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/f63439f8f4f77ab94f05b76aa33bb038fd5844da))
- convention ([3cc5692](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/3cc56928357a6727dad35206907329097f859fb6))
- convention ([127d7b2](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/127d7b231f73fffc6fc48abc320d2581d33eb5ea))
- deploy ([666cd4f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/666cd4fc4a1c7680eb80f8f4fa6fac27e0de45e5))
- detail UI ([ff002b0](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/ff002b0856c3e990a653d464076ad9d7afb0ab15))
- **examples:** 🐛 move couter page to examples ([00f34a1](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/00f34a14ab92b7112770e28dd6019ae5408b710a))
- **examples:** 🐛 path ([1b137e5](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/1b137e5fcc7e2525de06f7f9d69bf650b49cb742))
- **FloatingBox:** 🐛 naming ([a09b274](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a09b27418964fa1520fbeba8cfe88cbbcff53b0d))
- **fonts:** 🐛type ([ad70b79](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/ad70b79dde82cd57a87891709a50496ede107849))
- gen-api command ([cbd7bc4](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/cbd7bc4f2a4be9af37f989217e51a7c911d53dc4))
- **gen-icon:** 🐛 logic of component name, fix read-me ([52df4cb](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/52df4cb6516b87811ed2947e4ec0cc4ffa0b234f))
- **generate-sitemap-json.js:** 🐛add sorting ([cb9a0d8](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/cb9a0d8a42fc792d04662f2189fd3d43188a536c))
- **generate-sitemap-json.js:** 🐛glob-pattern ([da48507](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/da4850738328036497a29c22ce2352353705020a))
- **HomeLayout:** 🐛 naming, path, mark-up ([8fb032d](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/8fb032dbab8a86fb7afb84ae7babb9cae71fd623))
- **HomePage:** 🐛 import of head ([dac8ac4](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/dac8ac483083fd6f449751e9700fdb225b30a32f))
- **img-gen:** 🐛 generated-object-depth ([d90ec21](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d90ec21e1fbbebb2cd1abad1b5d960db6f496689))
- input style & props.. ([220ccfc](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/220ccfcf131fcdf1bdabac1ff7b6a14fc83910ac))
- **Input:** 🐛 naming ([f56760c](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/f56760c6b46f2713145955f273e75b9988524cac))
- moved <title> from \_document to \_app(https://nextjs.org/docs/messages/no-document-title) ([dbb3f2a](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/dbb3f2adb8a514fb3dd2d259839fc1fd6920f12b))
- orval config ([2ccb630](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2ccb63026f13eceda2877cc5ab3f4aafe1149fab))
- **package.json:** 🐛chakra cli ([0521688](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/052168885220887016ae81d6f07b204b3132fbdb))
- **package.json:** 🐛project-name for git action ([b802ac5](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/b802ac5b71d37de9c24ccae90cf4b0d23f48e45f))
- **package.json:** 🐛remove not using script ([7315225](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/73152258faf3fd90c974825c2d92d529b53cad08))
- **remove-unnecessary.js:** 🐛missing ([2962646](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/29626464f183e35b8a66fa4019748403f2af3ccc))
- **remove-unnecessary.js:** 🐛missing ([bc6427b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/bc6427b7611c2fab23b13e84aac7c25684ea04aa))
- **remove-unnecessary.js:** 🐛missing ([c16936a](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c16936ac36e48c62e9d35fb387577571e8d29364))
- removed React.FC ([e8cc6ed](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/e8cc6edeb60fb9a99557f39077cbf650696e281b))
- **semanticTokens:** 🐛color structure, error case, file-name ([b06fc5b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/b06fc5be72fea94ddb7c4441c257b3b3a84e32a1))
- **sitemap.ts:** 🐛domain-url ([125d7dd](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/125d7dd5552cd7ff5aaab30eaf3a8e66732e2443))
- **SocialPage:** 🐛missing type, add-remove-indicator ([ca01795](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/ca017951faacd0e7402c8b6ff35c87cec80269e4))
- **source-gen:** 🐛 add head-title on page-resolver ([9f4a21a](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/9f4a21ac0aee720805f7b8458004ae24ac6e1d90))
- **source-gen:** 🐛 api names on template ([ce807e9](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/ce807e98b0619ee6d9cafa20b5b33187d2d88efd))
- **source-gen:** 🐛 bug caused by this-binding, improve querykey ([ee2b67b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/ee2b67bb05f6c345dc1c3cd904462307616c3e94))
- **source-gen:** 🐛 missing of query.eta ([d054469](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d0544693d4f1058f1221e047f5365c6da6f088ba))
- **source-gen:** 🐛 page-component-template import path ([215a6e5](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/215a6e520f1620f6a4a2180ad8ddf0647b8d1560))
- **StarterDocsPage:** 🐛 animation props ([cb998d8](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/cb998d8e0fda8be38f73c19a350b5f6814a7b37e))
- **styles:** 🐛 remove invalid files ([2f1b69b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2f1b69bf11336fc1fa599754c72074108bc992c5))
- **textStyles.ts:** 🐛CamelCalse -> kebob-case ([c7f39e0](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c7f39e0b7ef2a3fb32fb6690a346f4a9004dd609))
- theme ([0e5be7b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/0e5be7b26d258f509abc34459e70ef437a34fd74))
- **theme:** 🐛 colors, example of theme-color ([8c74b3a](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/8c74b3a8fc6adb57a5bd0f78f5173606be97b1f4))
- **theme:** 🐛 file-name ([d40aac2](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d40aac2365c59977c1388a8a152fd690d20caa35))
- **theme:** 🐛multi-parts type location ([5379400](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/537940025e11ceffc58c86c80ce92b0504de441a))
- **tokript.config.js:** 🐛img-base-path ([9e40685](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/9e40685737951a4382412db1c893738449e71875))
- **tokript.config.js:** 🐛update tokript, fix config ([fa71d3b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/fa71d3be76ee8b36ab961943b4cd934b0b266648)), closes [#45](https://github.com/TOKTOKHAN-DEV/next-init-2.0/issues/45)
- **tsconfig.json:** 🐛 path by path-alias ([01f9f2a](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/01f9f2aba07127a098066824bf05b7aeb4811097))
- tslint ([cb4bb6f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/cb4bb6fd3232fa9e5fd2c1155b970726ec9838d7))
- tslint ([a957bf9](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a957bf91e9fc71a999e8ffca5d5d32480d80d0a7))
- update axios version ([3e579d6](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/3e579d6b4be0abf9c35004d73b72e3ddeb751ef9))
- **useExample.context.doc.tsx:** 🐛 text ([da3ecb5](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/da3ecb5980cab17a5ddbd4658af6951657906d31))
- **utils:** 🐛 getColorTone ([4637012](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/4637012dad719a1710613846370f2e8f1f721707))
- **yarn.lock:** 🐛update ([5ff3ff7](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/5ff3ff79127f244d899ce77309c0da3ae186da9a))

### Features

- **.github:** 🎸add action for initialize ([b07ce5d](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/b07ce5d8dc1772e0c43a5ad4e76acf0ab65206d6))
- **.github:** 🎸add action for initialize ([3d01c75](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/3d01c75d291d5bbb05eec24c1c93ea80cf08a866))
- **.hugithub action:** 🎸 add github hook ([715c1fc](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/715c1fcd8015c4f35b9229729c9bf67aac153e5a))
- **.husky:** 🎸 add pre-push hook ([b4ab853](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/b4ab85393cf15315c89ee9421c49b1ca6c9255cc))
- 🎸 (api-gen) add loader and modularization ([6a3926f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/6a3926faa67151d9e2e7d89696034457bffe1301))
- 🎸 (api-gen) add mock gen ([33f7d0f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/33f7d0fdd8003bfdd29e5cd72b5ec1dd8476ec45))
- 🎸 (package.json) add script that open theme-type ([2be1557](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2be15572a0146a93889627085fe305364de19d07))
- 🎸 add api convention ([97aec42](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/97aec42807d55bfdf0f47fcc71d7a695a68c1056))
- 🎸 add auto create sitemap logic ([10f52ab](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/10f52ab4f57487533e974b9fccef5dcfa0e38c96))
- 🎸 add calendar ([a1b64c7](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a1b64c74409ba3bf8740999079379d55ea277cd7))
- 🎸 add container theme ([c5c9f29](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c5c9f2934864da5e54b5bed6fdedc77a4b872d96))
- 🎸 add examples page, ordering under spoce page ([92e4d62](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/92e4d62a3b1c305b108e7be8a3be8ea0874252bd))
- 🎸 add react-device-detect ([10da28e](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/10da28e7979b963542f43e3dded04b04f9fec31c))
- 🎸 add timepicker ([cdf7e6d](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/cdf7e6d72d15d61c149437266e860df930761a10))
- 🎸 add useShare ([a390451](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a3904516735230e5cf8b4889771cde0b428f2182))
- 🎸 add useSize -> get window size ([fa9efea](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/fa9efeac66bb8c0a9e0016a0b99381a950c5c8c9))
- 🎸 add utils format ([63cbac5](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/63cbac565d589a23ed003b65d0161b3973044382))
- 🎸 add validate ([0612400](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/061240084cae6208971e220c9c2875c056811e21))
- 🎸 add validate ([d09bf6c](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d09bf6c6f7d523c07081a37711ea96987dc46ea0))
- 🎸 init firstUploader ([772ab04](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/772ab04ff5a6d2718aac7495beb75d7eea1cbe48))
- 🎸 prettier-plugin (import-order), format script ([0c6c230](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/0c6c230db830aefa16d38e8d5a3d2c31e9182876))
- 🎸 react 17 => 18, next 11 => 12, fix errors ([f2206cc](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/f2206cc96b30cdcd0e1496658af1cb4fabeae1ff))
- 🎸 react hook form with yup example ([08a5b2e](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/08a5b2ef6ec18a74e767ecd9baf4c048344fc78f))
- 🎸 react-hook-form with react-chakra-select, radio example ([001716c](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/001716c97ba1bc3fbac378c6ab55e285674a3704))
- 🎸 뷰포트 진입여부를 알려주는 hook 추가 ([b814066](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/b8140661df5f60950520ebcc81444cafd305d18e))
- 🎸add analytics ([d5f33c3](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d5f33c3aec739771eda542eec3c9b3620026d9b2))
- 🎸add datepicker & remove 0auth, moment ([0b5a3ef](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/0b5a3ef6752418dfc176a7d61fcb8949cb68511d))
- 🎸add image path ([a1c6ccb](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a1c6ccb0fed454414a8ff9d0c26b09d448b10a76))
- 🎸add mutable type for json format ([d560b99](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d560b9903a9a05fbbbb6e1faeddcf68dcf099d08))
- 🎸add return-url state on social-login ([8784011](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/8784011e4572ab3edf222c57433a082f474e4fcb))
- 🎸add script gen:route ([2e598e6](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2e598e6a3b34b3c81ca05dd51d11660c7350e62c))
- 🎸add social example ([510fcb9](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/510fcb910eb02f10ab78b6228ef7135158f724af))
- 🎸add social examplke ([cc94a89](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/cc94a896e5850c09d9b7bd570cb71a4f185bc818))
- 🎸add toss sdk ([4857a27](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/4857a2726f96aea97233015c6b6067ebc65a0901))
- 🎸add useLogin ([e100fa6](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/e100fa68e8c5a5e3c7538b46f7c5b0cfb3d8717a))
- 🎸api refresh add ([3587550](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/3587550aff6912a6e05c6e4c4d2c924378ffbeeb))
- 🎸apply next/font ([447a9a9](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/447a9a9b51539284bef09fe62c278378aadf1a64))
- 🎸apply node minimum version ([f0b6386](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/f0b6386c86f08ad37393a55b50c2badf75b2a2a5)), closes [#51](https://github.com/TOKTOKHAN-DEV/next-init-2.0/issues/51)
- 🎸gen theme typing ([1231e5d](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/1231e5d5ba86ebc506836361f7263fdddbd91704))
- 🎸login-example with auth-guard ([6fd90ec](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/6fd90ec73e1967caff42ed153f9b107acdc96ebb))
- 🎸modal-slice, modal-hook for open by query ([e32dd3b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/e32dd3b229abfe18d0fe2c44ba5991d619fff6b9))
- 🎸remove production block ([ac40704](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/ac40704f508d297fac1f06237e89ee73fd95140f))
- 🎸set-up test ([9887317](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/9887317d76cf37091ee64de05387231c0593c8d1))
- 🎸tok-docs-dev-tool ([2e1525b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2e1525bd7929ada51f1127aec6e1a4dcb88811d3))
- 🎸versioning ([c1a0912](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c1a09129e9d7b0f52f5ff66899195ee8330a5f86))
- 🎸WIP s3-file-uploader ([02fe017](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/02fe01747fdb09d07ba08adc0223e20b46a221b5))
- add 0auth ([a49236f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a49236fbd58ecabcc24a5c05c9811f9cf7ff8653))
- add 0auth logic ([7797016](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/7797016b09b9fdd88b5e1285cf807ee360838acc))
- add 0auth module ([9a9fb5b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/9a9fb5bad2949568c7309084dcb1d58e5046abc4))
- add 0auth-sdk ([5a80132](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/5a80132ed39fff511526cb6d774e444eb9aa39b7))
- add api ([a3ccee1](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a3ccee19ade943bb953d5e1b0fbe1330c72cc739))
- add chakra, query-client provider ([9c9dee7](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/9c9dee71aed9027e34af2d058d19678056c7003e))
- add config ([e3726e7](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/e3726e730d27a4869fef326df7b0645f21fcfa00))
- add Container ([3bed789](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/3bed789bce843163545fe5170ef960196901e88d))
- add custom mount function ([aa1bbfd](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/aa1bbfdab73404425e7bfa869499d11b870dd2af))
- add floating button ([82d8606](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/82d860692df214d044b23fec3c5c451832bb3115))
- add icons ([8cf9dbe](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/8cf9dbee25ebcfe5753c9a1bca72fae930ef4cd6))
- add manifest ([b098c19](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/b098c19056d2c96ebc3334cb1a13b6b583b95169))
- add og image ([de60bc6](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/de60bc64fc68c467fdbd466aedbf3f9338e4660e))
- add orval ([cd42bc0](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/cd42bc0077b6a7d3934f4d7321b32323f2e44826))
- add sample ([ec6a594](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/ec6a5947f2745db9b6ea6fb47354be8e9b61c8ea))
- add sample component test ([42e2178](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/42e2178b11a67588c32f590590508c1396b37cef))
- add select ([f32149b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/f32149b4092b164464223a56c8a2a8a1bbe235d3))
- add social login button ([2a29cc5](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2a29cc586dbc41d4ab36f7cb6922c9ac1b7ff7f6))
- add style ([a35f7c2](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a35f7c20afc33b2e1156ca1ad4c0bdd976f62ecd))
- add styles ([e5b6df3](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/e5b6df3c645ec6275c38072c7f37ce4e0f04bca3))
- add tabbar icon ([e9f8dc6](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/e9f8dc6720ff9a837311f21c28368dee6913f4b8))
- add test page ([143e226](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/143e2267201bf145c8d616fac2a494eb1d79f9e7))
- add text component ([15f9821](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/15f98211bb217b1038bd95f41342b3c49e9db2b0))
- add utils ([756acf2](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/756acf252f74af671124a81c9a385f3bfea63598))
- **app:** 🎸 add logic for refresh-token ([c380d69](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c380d69cea44a48a33487e220502f2573cbbb64f))
- **commitizen:** 🎸 add tool to help commit ([dbb0474](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/dbb0474da22211f7c339129e4bedb3c7769acee7))
- **components:** 🎸add common components ([674c292](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/674c292de3dd05b511329ca64ebeefd252e7b9b7))
- **components:** 🎸add controlled-confirm-alert ([85ce0bd](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/85ce0bdfe5604c08927e2f7af00ff12d70de5d72))
- **config:** 🎸Add Default SEO config ([2104b50](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2104b50138c35ca7069e31fa39ec8c74e7af7931))
- **contexts:** 🎸add global-context, move app-provider -> hoc ([bf2170e](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/bf2170e55010839d8d923e439ee856a76e411f40))
- **ExamplesPage:** 🎸add modal-page ([4a43dcc](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/4a43dcc0accc1eddc17155067ce5880a7c4f98c1)), closes [#53](https://github.com/TOKTOKHAN-DEV/next-init-2.0/issues/53)
- **gen-icon:** 🎸 add script ([b559841](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/b559841d191ce1e53c4508aaca927020287bfde6))
- **getColorSemanticTokens.ts:** 🎸generate to getColorSmanticTokens with comments ([5113077](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/5113077350d356593688f7a55a7de72b050e280d))
- **hooks:** 🎸 add hooks about scroll ([4321e62](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/4321e62aef19b8492d672d7a59b833d503d6ad26))
- **img-gen:** 🎸 add options ([ce470d2](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/ce470d297c52dc0f59c5cc40aa0b0e454bebe106))
- **img-gen:** 🎸 add script ([0cdf1f3](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/0cdf1f3874defaa183b7418e34d6d8c359f3a24b))
- **LinkButton:** 🎸 add component ([48b9f3f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/48b9f3f8d6dbe0813c8b0009934d36a4f006221a))
- Login Page ([e3e147f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/e3e147fbd95503ec1b05191efa291de3b1ef0bcc))
- **nodejs:** 🎸 add utils about text-case ([44c39f6](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/44c39f682b1813a6491ca4411d651553dc5df3ab))
- **reducer.ts:** 🎸apply immer ([0011685](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/0011685434886aee37ebf5ece7a82376ca50c24d))
- remove 0auth utils ([4ed90c8](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/4ed90c868f61eced74561fccaaa53c6606306493))
- removed cypress things ([02aa415](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/02aa4151d6cc7209d4d1c3712cd264208a5c89b0))
- **S3FileUploader:** 🎸logic, example ([e465a5b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/e465a5bbbf3031c8b58583b46706557148eea606))
- **scripts:** 🎸 add prompt on script of api-gen ([6b09014](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/6b0901460e484fb89df54a5726343ad3c0eb379e))
- **scripts:** 🎸 add prompt on script of api-gen ([a1cdf84](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a1cdf84a77324697f028a8bccf0060198cf9ec9e))
- **scripts:** 🎸 api-gen ([65a97ab](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/65a97abcc708ac640cde142bda50fc470b95ab59))
- **scripts:** 🎸 api-gen ([df1f70b](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/df1f70b8a65d48b4118e49e2302bda3ea35cb7f2))
- **scripts:** 🎸clean-up script ([2d634f2](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2d634f2d7523032493388e961647e5d677b0c066))
- **semanticColors.ts:** 🎸Incorporate color into semantic token ([d398da0](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d398da0f0cf3e09f66a9b545023d5cdaf532cad7))
- **semanticTokens.ts:** 🎸create to semantic tokens for CSS variables by color mode ([a95ef05](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/a95ef056ff8f488a721817b8bd30d927efd3947e))
- seo ([cdefe54](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/cdefe54376092bdb76bfa1527857070bf1690a1c))
- set gray color ([926dc24](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/926dc24cc6c7e236a48e37b8c97ead481fcbd22f))
- social login ([556d329](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/556d32929b02a4ae1d88cb5194ad793e5ca96467))
- **source-gen:** 🎸 add api-source-gen ([dcb3841](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/dcb38419fb5a50f38cf458da0931109987590b76))
- **source-gen:** 🎸 add configuration about appName on page-gen ([0bf3bf5](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/0bf3bf5ef5aef8bbfb92b999d669a7f1bc84c8d5))
- **source-gen:** 🎸 add dynamic-route page ([8a9c2e1](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/8a9c2e1fa75cc3de5ad0f7590fc11c673748ed8a))
- **source-gen:** 🎸 add page-source-gen ([585c5bc](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/585c5bc77782e5ec37c240c882e600548ae20276))
- **source-gen:** 🎸 consider depth when generate page ([f8139ae](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/f8139ae3aa62a29dbd73052b8cb12fa0844e2537))
- **src:** 🎸add throttle & debounce example ([09400f0](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/09400f0fc2d0dd70f3349d72450618928dbf592f)), closes [#69](https://github.com/TOKTOKHAN-DEV/next-init-2.0/issues/69)
- **StarterDocsExamplesFileInputPage:** 🎸add route, remove-indicator ([e561138](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/e5611388a4a778bf14b2ce8ad95b661ab520059f))
- **StarterDocsPage:** 🎸 add page ([3b24c6f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/3b24c6f196b57db19769c34244e1c32abd811e2a))
- **StarterDocsPage:** 🎸 add roate-box ([d7cb7fa](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/d7cb7faf162aee44effe5103524f106834824b49))
- **styles:** add color pallet ([428e7fe](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/428e7fe303a26eefe03f07c5c7654f3586029ced))
- **swagger:** 🎸 add mock-service-worker ([c0198c7](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/c0198c7bfa955e0dc36e6d3966fa503b45025b38))
- **swagger:** 🎸 update orval-config ([dd33190](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/dd331902ab38406ec2fd5c6080a26dc49ec0e598))
- **theme-viewer:** 🎸 add sections about component, space, shad ([e1674aa](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/e1674aa75c731a280f7284edf5da42a44ddc9c5d))
- **theme:** 🎸 add components template for styling by theme ([39fe022](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/39fe022601fd3ecb675b4da3ed7b5ff06ddb914a))
- **ThemeViewerPage:** 🎸 add sections (radius, textStyle...) ([643245c](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/643245ce2fdf9755c57d730a291bd450d1954de1))
- **ThemeViewerPage:** 🎸 WIP-add page ([27df47f](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/27df47f826e292803d8e473cfe53baee1a8f0d52))
- **types:** 🎸add definitions ([8e183fd](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/8e183fd56b88fc2d289eb4cbc936f74616af9494))
- **useClipboard.ts:** 🎸create to clipboard hook ([b47aa20](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/b47aa20597866e4d3737ab0af301c76eb972e6fe))
- **useExample.ts:** 🎸 add context-example ([70b133e](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/70b133e517372b07ba4215e9f1247ebe6f8bf4c9))
- **useScrollSection:** 🎸 for scroll-interaction ([4a2e068](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/4a2e0686a3f09269410cf5751c57ed3eff17fb17))
- **utils:** 🎸 add func that generate color ([2b36449](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/2b3644938cf0c1d5de77deb9a0779a5b8594effd))
- **utils:** 🎸add create-slilce ([6169ef8](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/6169ef89957104c2314c5f1176850519943563b7))
- **utils:** 🎸add react-synced-storage ([cdde5d2](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/cdde5d2bdb67d124162cb2aae05341cadd90ad15))
- **utils:** 🎸array-to-record, array-to-map ([4f5f9af](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/4f5f9af8b4816bc2e3c1f46f698959691a93dd5e))
- **utils:** 🎸format ([1860cbb](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/1860cbb0dc1ca35014ddb5d2e779da32a1116e11))
- **w-start:** 🎸 add script for git-flow ([f712463](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/f712463204a29bd2d432c8b360bc41ee1d80963b))

### Performance Improvements

- ⚡️axios refresh add ([5702f05](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/5702f0586b6a6a5c124f8aca076d5f2f8ddb3000))

### Reverts

- Revert "feat(hooks): 🎸 add hooks about scroll" ([1733ca4](https://github.com/TOKTOKHAN-DEV/next-init-2.0/commit/1733ca4374ade98b9d0bcf91f843d75f84c35b4a))
