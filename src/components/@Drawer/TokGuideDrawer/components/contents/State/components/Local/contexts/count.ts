import { createStoreContext, withSetter } from '@toktokhan-dev/zustand-react'

export type LocalStateType = {
  count: number
  nested: {
    count: number
  }
  add: (num: number) => void
}

export const {
  Provider: CountProvider,
  useContext: useCountContext,
  withProvider: withCountProvider,
} = createStoreContext(
  withSetter<LocalStateType>((set) => ({
    count: 0,
    nested: {
      count: 0,
    },
    add: (count: number) =>
      set((state) => {
        return {
          ...state,
          count: state.count + count,
        }
      }),
  })),
)
