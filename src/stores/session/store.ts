import { withSetter } from '@toktokhan-dev/zustand-react'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type TodoType = {
  text: string
}

export type SessionStorage = {
  todo: TodoType[] | null
}

/**
 * zustand와 withSetter + persist + immer 사용 예제입니다.
 * 스토어 스토리지는 persist 미들웨어로 간단하게 관리할 수 있습니다.
 *
 * @see [Tokdocs] https://toktokhan-dev-docs.vercel.app/docs/zustand/overview#zustand
 * @see [zustand-persist] https://zustand.docs.pmnd.rs/migrations/migrating-to-v4#persist
 * @see [zustand-immer] https://zustand.docs.pmnd.rs/integrations/immer-middleware
 */
export const useSessionStorage = create(
  persist(
    withSetter(
      immer<SessionStorage>(() => ({
        todo: null,
      })),
    ),
    {
      name: '@toktokhan-dev',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
