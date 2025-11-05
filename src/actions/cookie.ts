'use server'

import {
  RequestCookie,
  ResponseCookie,
} from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

export async function setCookie(
  ...args:
    | [key: string, value: string, cookie?: Partial<ResponseCookie>]
    | [options: ResponseCookie]
) {
  const cookieStore = await cookies()
  cookieStore.set(...args)
}

export async function removeCookie(
  ...args: [key: string] | [options: Omit<ResponseCookie, 'value' | 'expires'>]
) {
  const cookieStore = await cookies()
  cookieStore.delete(...args)
}

export async function getCookie(...args: [name: string] | [RequestCookie]) {
  const cookieStore = await cookies()
  return cookieStore.get(...args)
}
