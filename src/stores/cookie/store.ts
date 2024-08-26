import { useCallback } from 'react'

import { Cookies, useCookies } from 'react-cookie'

export type CookieSetOptions = Parameters<Cookies['set']>[1]

export const COOKIE_DEFAULT_SET_OPTIONS: CookieSetOptions = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
}

export const clientCookie = new Cookies(null, COOKIE_DEFAULT_SET_OPTIONS)

export const useClientCookie = (key: string) => {
  const [values, _setCookie, _removeCookie] = useCookies([key])
  const value = values[key]

  const setCookie = useCallback(
    (value: string, options?: CookieSetOptions) => {
      _setCookie(key, value, { ...COOKIE_DEFAULT_SET_OPTIONS, ...options })
    },
    [_setCookie, key],
  )

  const removeCookie = useCallback(
    (options?: CookieSetOptions) => {
      _removeCookie(key, { ...COOKIE_DEFAULT_SET_OPTIONS, ...options })
    },
    [_removeCookie, key],
  )

  return [value, setCookie, removeCookie] as const
}
