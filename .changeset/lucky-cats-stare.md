---
'@toktokhan-dev/next-app-init': patch
---

improve cookie, font

### Cookie 관련 개선 사항

- useClientCookie 를 제거했습니다. 클라이언트 에서 cookie 의 수정이 필요할땐 server action 을 통해서 수정해야합니다.

  - 랜더링에 영향이 없는 경우는 client cookie 를 사용해서 수정하는것을 권장합니다.

- cookie 관련 랜더링 케이스의 경우는, 서버 컴포넌트에서 쿠키를 하위 컴포넌트들에게 전달하는 방식으로 해결하는것을 권장합니다.

### Font 관련 개선 사항

- css 대응을 위해 chakra font type 을 느슨하게 수정했습니다.
