import {
  FetchArgs,
  FetchHelperDefaultOptions,
  FetchHelperType,
  fetchHelper,
} from '@toktokhan-dev/universal'
import { jwtDecode } from '@toktokhan-dev/universal'

import { ENV } from '@/configs/env'
import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { clientCookie } from '@/stores/cookie/store'
import { calcMaxAge } from '@/utils/middleware/calc-max-age'
import { getJwtCookieOptions } from '@/utils/middleware/get-jwt-cookie-option'

const setAuthorizationHeader = async () => {
  let accessToken: string | undefined | null

  if (typeof window !== 'undefined') {
    accessToken = clientCookie.get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
  } else {
    const { cookies } = await import('next/headers')
    accessToken = cookies().get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)?.value
  }

  return accessToken ? `Bearer ${accessToken}` : undefined
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

const handleUnAuthorized = () => {
  clientCookie.remove(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
  clientCookie.remove(COOKIE_KEYS.AUTH.REFRESH_TOKEN)
  window.location.replace('/')
}

const handleTokenRefresh = async (
  refreshToken: string,
  fetch: NonNullable<FetchHelperDefaultOptions['fetch']>,
) => {
  const refreshResponse = await fetch(`${ENV.API_BASE_URL}/v1/user/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  })

  if (!refreshResponse.ok) {
    clientCookie.remove(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
    clientCookie.remove(COOKIE_KEYS.AUTH.REFRESH_TOKEN)
    window.location.replace('/')
    throw new Error('Failed to refresh token')
  }

  const newToken = await refreshResponse.json()
  const { access: newAccess, refresh: newRefresh } = newToken
  const decodedAccess = jwtDecode(newAccess)
  const decodedRefresh = jwtDecode(newRefresh)

  const accessMaxAge = calcMaxAge({ exp: decodedAccess?.exp })
  const refreshMaxAge = calcMaxAge({ exp: decodedRefresh?.exp })

  clientCookie.set(
    COOKIE_KEYS.AUTH.ACCESS_TOKEN,
    newAccess,
    getJwtCookieOptions(accessMaxAge),
  )
  clientCookie.set(
    COOKIE_KEYS.AUTH.REFRESH_TOKEN,
    newRefresh,
    getJwtCookieOptions(refreshMaxAge),
  )

  return newAccess
}

const handleExpiredToken = async (
  requestArgs: FetchArgs,
  fetch: NonNullable<FetchHelperDefaultOptions['fetch']>,
): Promise<Response> => {
  const [url, requestInit] = requestArgs
  const refreshToken = clientCookie.get(COOKIE_KEYS.AUTH.REFRESH_TOKEN)

  if (!refreshToken) {
    clientCookie.remove(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
    window.location.replace('/')
    throw new Error('No refresh token available')
  }

  try {
    const newAccessToken = await handleTokenRefresh(refreshToken, fetch)
    const modifiedRequestInit = {
      ...requestInit,
      headers: {
        ...requestInit?.headers,
        Authorization: `Bearer ${newAccessToken}`,
        'Content-Type': 'application/json',
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
  if (typeof window !== 'undefined') {
    const { status } = response
    const isUnAuthorized = status === 401
    const isExpiredToken = status === 444

    if (isUnAuthorized) {
      handleUnAuthorized()
    }

    if (isExpiredToken) {
      handleExpiredToken(requestArgs, fetch)
    }
  }
  return response
}

export const fetchHelperInterceptors: FetchHelperType = (args) => {
  return fetchHelper({
    ...args,
    interceptors: {
      request: requestInterceptor,
      response: responseInterceptor,
    },
  })
}
