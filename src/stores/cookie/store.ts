import { Cookies } from 'react-cookie'

export type CookieSetOptions = Parameters<Cookies['set']>[1]

export const COOKIE_DEFAULT_SET_OPTIONS: CookieSetOptions = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
}

export const clientCookie = new Cookies(null, COOKIE_DEFAULT_SET_OPTIONS)
