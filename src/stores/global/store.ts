import { createStoreContext, withSetter } from '@toktokhan-dev/zustand-react'

import { immer } from 'zustand/middleware/immer'

export type GlobalStore = {
  isClient: boolean
  count: number
  nested: {
    count: number
  }
  updateCount: (num: number) => void
}

/**
 * zustand와 withSetter + context + immer 사용 예제입니다.
 *
 * Nextjs 와 같은 SSR 환경에선, 서버에서의 상태변경이 일어날 경우 각기 다른 클라이언트에서 서버상태를 공유하게 되는 이슈가 생길 수 있기 때문에, zustand 를 context 와 함께 사용하는 것을 권장합니다.
 * @see [zustand-with-Next.js] https://zustand.docs.pmnd.rs/guides/nextjs
 *
 * @see [Tokdocs] https://toktokhan-dev-docs.vercel.app/docs/zustand/overview#zustand
 * @see [zustand-immer] https://zustand.docs.pmnd.rs/integrations/immer-middleware
 */
export const {
  Provider: GlobalStoreProvider,
  useContext: useGlobalStore,
  withProvider: withGlobalProvider,
} = createStoreContext(
  withSetter(
    immer<GlobalStore>((set, get, store) => ({
      isClient: false,
      count: 0,
      nested: {
        count: 0,
      },
      // 간단한 상태 수정은 따로 함수를 정의할 필요가 없지만,
      // 복잡한 상태 업데이트 함수정의를 위해서는 아래와 같이 할 수 있습니다.
      updateCount: (count: number) =>
        set((state) => {
          state.count = +((state.count / count) * 3 + 1).toFixed(2)
        }),
    })),
  ),
)
