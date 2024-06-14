import { getCookie, removeCookie, setCookie } from '@/actions/cookie'
import { ENV } from '@/configs/env'

import fetchHelper, {
  FetchArgs,
  FetchHelperDefaultOptions,
  type FetchHelper,
} from '@/utils/fetch/fetch-helper'
import { jwtDecode } from '@toktokhan-dev/universal'
import { calcMaxAge } from '@/utils/middleware/calc-max-age'
import { getJwtCookieOptions } from '@/utils/middleware/get-jwt-cookie-option'

const setAuthorizationHeader = async () => {
  let access: string | undefined

  if (typeof window !== 'undefined') {
    access = await getCookie('access').then((v) => v?.value)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { cookies } = require('next/headers')
    access = cookies().get('access')?.value
  }

  return access ? `Bearer ${access}` : undefined
}

const requestInterceptor: (
  requestArgs: FetchArgs,
  fetch: NonNullable<FetchHelperDefaultOptions['fetch']>,
) => Promise<FetchArgs> = async (args) => {
  const [url, options] = args
  const headers = new Headers(options?.headers)
  const authorizationHeader = await setAuthorizationHeader()

  if (authorizationHeader) {
    headers.set('Authorization', authorizationHeader)
  }

  return [
    url,
    {
      ...options,
      headers,
    },
  ]
}

const handleUnAuthorized = async () => {
  await removeCookie('access')
  await removeCookie('refresh')
  if (typeof window !== 'undefined') {
    window.location.replace('/')
  }
}

const handleTokenRefresh = async (
  refresh: string,
  fetch: NonNullable<FetchHelperDefaultOptions['fetch']>,
) => {
  const refreshResponse = await fetch(`${ENV.API_BASE_URL}/v1/user/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh }),
  })

  if (!refreshResponse.ok) {
    await removeCookie('access')
    await removeCookie('refresh')
    window.location.replace('/')
    throw new Error('Failed to refresh token')
  }

  const newToken = await refreshResponse.json()
  const { access: newAccess, refresh: newRefresh } = newToken
  const decodedAccess = jwtDecode(newAccess)
  const decodedRefresh = jwtDecode(newRefresh)

  const accessMaxAge = calcMaxAge(decodedAccess?.exp)
  const refreshMaxAge = calcMaxAge(decodedRefresh?.exp)

  await setCookie('access', newAccess, getJwtCookieOptions(accessMaxAge))
  await setCookie('refresh', newRefresh, getJwtCookieOptions(refreshMaxAge))

  return newAccess
}

const handleExpiredToken = async (
  requestArgs: FetchArgs,
  fetch: NonNullable<FetchHelperDefaultOptions['fetch']>,
): Promise<Response> => {
  const [url, requestInit] = requestArgs
  const refresh = await getCookie('refresh').then((v) => v?.value)

  if (!refresh) {
    await removeCookie('access')
    window.location.replace('/')
    throw new Error('No refresh token available')
  }

  try {
    const newAccess = await handleTokenRefresh(refresh, fetch)
    const modifiedRequestInit = {
      ...requestInit,
      headers: {
        ...requestInit?.headers,
        Authorization: `Bearer ${newAccess}`,
      },
    }

    return fetch(url, modifiedRequestInit)
  } catch (error) {
    window.location.replace('/')
    throw error
  }
}

const responseInterceptor: (
  response: Response,
  requestArgs: FetchArgs,
  fetch: NonNullable<FetchHelperDefaultOptions['fetch']>,
) => Promise<Response> = async (response, requestArgs, fetch) => {
  const { status } = response
  const isUnAuthorized = status === 401
  const isExpiredToken = status === 444

  if (isUnAuthorized) {
    await handleUnAuthorized()
  } else if (isExpiredToken && typeof window !== 'undefined') {
    return handleExpiredToken(requestArgs, fetch)
  }

  return response
}

export const fetchHelperInterceptors: FetchHelper = (args) =>
  fetchHelper({
    ...args,
    interceptors: {
      request: requestInterceptor,
      response: responseInterceptor,
    },
  })
