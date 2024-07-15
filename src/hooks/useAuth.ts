import { useAccessStorage } from '@/stores/cookie/access'
import { useRefreshStorage } from '@/stores/cookie/refresh'

import { useClient } from './useClient'

export const useAuth = () => {
  const access = useAccessStorage()
  const refresh = useRefreshStorage()
  const isClient = useClient()

  const isLogin: boolean | null = isClient ? !!access && !!refresh : null

  return { isLogin, refresh }
}
