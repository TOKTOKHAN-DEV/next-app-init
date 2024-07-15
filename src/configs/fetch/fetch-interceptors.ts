import {
  FetchArgs,
  FetchHelperDefaultOptions,
  FetchHelperType,
  fetchHelper,
} from '@toktokhan-dev/universal'
import { jwtDecode } from '@toktokhan-dev/universal'

import { ENV } from '@/configs/env'
import { accessStorage } from '@/stores/cookie/access'
import { refreshStorage } from '@/stores/cookie/refresh'
import { calcMaxAge } from '@/utils/middleware/calc-max-age'
import { getJwtCookieOptions } from '@/utils/middleware/get-jwt-cookie-option'

const setAuthorizationHeader = async () => {
  let access: string | undefined | null

  if (typeof window !== 'undefined') {
    access = accessStorage.get()
  } else {
    const { cookies } = await import('next/headers')
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

const handleUnAuthorized = () => {
  accessStorage.remove()
  refreshStorage.remove()

  window.location.replace('/')
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
    accessStorage.remove()
    refreshStorage.remove()
    window.location.replace('/')
    throw new Error('Failed to refresh token')
  }

  const newToken = await refreshResponse.json()
  const { access: newAccess, refresh: newRefresh } = newToken
  const decodedAccess = jwtDecode(newAccess)
  const decodedRefresh = jwtDecode(newRefresh)

  const accessMaxAge = calcMaxAge({ exp: decodedAccess?.exp })
  const refreshMaxAge = calcMaxAge({ exp: decodedRefresh?.exp })

  accessStorage.set(newAccess, getJwtCookieOptions(accessMaxAge))
  accessStorage.set(newRefresh, getJwtCookieOptions(refreshMaxAge))

  return newAccess
}

const handleExpiredToken = async (
  requestArgs: FetchArgs,
  fetch: NonNullable<FetchHelperDefaultOptions['fetch']>,
): Promise<Response> => {
  const [url, requestInit] = requestArgs
  const refresh = refreshStorage.get()

  if (!refresh) {
    accessStorage.remove()
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
      return handleExpiredToken(requestArgs, fetch)
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
