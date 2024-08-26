import { useEffect } from 'react'

import { useGlobalStore } from '@/stores/global/store'

export const useClient = () => {
  const isClient = useGlobalStore((store) => store.isClient)
  const set = useGlobalStore((store) => store.set)

  useEffect(() => {
    set('isClient', true)
  }, [set])

  return isClient
}
