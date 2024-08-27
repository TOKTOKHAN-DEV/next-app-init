'use client'

import { createStoreContext, withSetter } from '@toktokhan-dev/zustand-react'

import { immer } from 'zustand/middleware/immer'

export type HomeState = {
  count: number
}

export const {
  Provider: HomeStateProvider,
  useContext: useHomeStateContext,
  withProvider: withHomeStateProvider,
} = createStoreContext(
  withSetter(
    immer<HomeState>(() => ({
      count: 0,
    })),
  ),
)
