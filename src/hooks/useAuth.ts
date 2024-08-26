import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { useClientCookie } from '@/stores/cookie/store'

import { useClient } from './useClient'

export const useAuth = () => {
  const isClient = useClient()
  const refresh = useClientCookie(COOKIE_KEYS.AUTH.REFRESH)
  const access = useClientCookie(COOKIE_KEYS.AUTH.ACCESS)

  const hasToken = !!(refresh && access)

  const isLogin: boolean | null = isClient ? hasToken : null

  return { isLogin, refresh }
}
