'use server'

import { cookies } from 'next/headers'

type CookieStore = Awaited<ReturnType<typeof cookies>>
type SetCookieArgs = Parameters<CookieStore['set']>
type DeleteCookieArgs = Parameters<CookieStore['delete']>
type GetCookieArgs = Parameters<CookieStore['get']>

export async function setCookie(...args: SetCookieArgs) {
  const cookieStore = await cookies()
  cookieStore.set(...args)
}

export async function removeCookie(...args: DeleteCookieArgs) {
  const cookieStore = await cookies()

  cookieStore.delete(...args)
}

export async function getCookie(...args: GetCookieArgs) {
  const cookieStore = await cookies()
  return cookieStore.get(...args)
}
