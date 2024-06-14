import { useReducer } from 'react'

import {
  createContextSelector,
  createSlice,
} from '@toktokhan-dev/react-universal'

export type GlobalStateType = {
  count: number
  isClient: boolean
}

const initialState: GlobalStateType = {
  count: 0,
  isClient: false,
}

const { reducer } = createSlice({
  initialState,
  reducers: {
    SET_COUNT: (state, count: number) => {
      state.count = count
    },
    SET_IS_CLIENT: (state, isClient: boolean) => {
      state.isClient = isClient
    },
  },
})

export const {
  Provider: GlobalContextProvider,
  useContext: useGlobalContext,
  withProvider: withGlobalContext,
} = createContextSelector(() => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { dispatch, state }
})
