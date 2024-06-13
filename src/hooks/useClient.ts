import { useEffect } from 'react'

import { useGlobalContext } from '@/stores/global/state'

export const useClient = () => {
  const isClient = useGlobalContext((ctx) => ctx.state.isClient)
  const dispatch = useGlobalContext((ctx) => ctx.dispatch)

  useEffect(() => {
    dispatch({
      type: 'SET_IS_CLIENT',
      payload: true,
    })
  }, [dispatch])

  return isClient
}
