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
  cookies().set(...args)
}

export async function removeCookie(
  ...args: [key: string] | [options: Omit<ResponseCookie, 'value' | 'expires'>]
) {
  cookies().delete(...args)
}

export async function getCookie(...args: [name: string] | [RequestCookie]) {
  return cookies().get(...args)
}
