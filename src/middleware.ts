import { NextRequest, NextResponse } from 'next/server'

// import { calcMaxAge } from './utils/middleware/calc-max-age'
// import { getJwtCookieOptions } from './utils/middleware/get-jwt-cookie-option'
import { matchingPath } from './utils/middleware/matching-path'

// import { jwtDecode } from '@toktokhan-dev/universal'
// import { ENV } from './configs/env'

const PATHS = {
  AUTH: ['mypage'],
  UN_AUTH: ['/join', '/login'],
}

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies: requestCookies, url } = request
  const { pathname } = nextUrl

  // const access = requestCookies.get('access')?.value
  const refresh = requestCookies.get('refresh')?.value

  // const decodedAccess = access && jwtDecode(access).exp
  // const accessExp = decodedAccess || 0
  // const accessExp1HourBefore = accessExp - 3600
  // const isTryRefresh =
  //   refresh && (!access || Date.now() / 1000 >= accessExp1HourBefore)

  // let isRefreshSuccess = false
  // let isRefreshError = false

  // if (isTryRefresh) {
  //   try {
  //     const refreshResponse = await fetch(
  //       `${ENV.API_BASE_URL}/v1/user/refresh/`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ refresh }),
  //       },
  //     )

  //     if (refreshResponse.ok) {
  //       const newToken = await refreshResponse.json()
  //       const { access, refresh } = newToken

  //       requestCookies.set('access', access)
  //       requestCookies.set('refresh', refresh)
  //       isRefreshSuccess = true

  //     } else {
  //       isRefreshError = true
  //       requestCookies.delete('access')
  //       requestCookies.delete('refresh')
  //       console.log('Refresh failed with status:', refreshResponse.status)
  //     }
  //   } catch (error) {
  //     isRefreshError = true
  //     requestCookies.delete('access')
  //     requestCookies.delete('refresh')
  //     console.error('Error during refresh:', error)
  //   }
  // }

  const response = NextResponse.next({ request })
  // const { cookies: responseCookies } = response

  // if (isRefreshError) {
  //   responseCookies.delete('access')
  //   responseCookies.delete('refresh')
  //   isRefreshSuccess = false
  // }
  // if (isRefreshSuccess) {
  //   const refreshedReqAccess = requestCookies.get('access')?.value
  //   const refreshedReqRefresh = requestCookies.get('refresh')?.value

  //   if (refreshedReqAccess && refreshedReqRefresh) {
  //     const decodedAccess = jwtDecode(refreshedReqAccess)
  //     const decodedRefresh = jwtDecode(refreshedReqRefresh)

  //     const accessMaxAge = calcMaxAge({exp: decodedAccess?.exp})
  //     const refreshMaxAge = calcMaxAge({exp: decodedRefresh?.exp})

  //     responseCookies.set(
  //       'access',
  //       refreshedReqAccess,
  //       getJwtCookieOptions(accessMaxAge),
  //     )
  //     responseCookies.set(
  //       'refresh',
  //       refreshedReqRefresh,
  //       getJwtCookieOptions(refreshMaxAge),
  //     )
  //     isRefreshSuccess = false
  //   } else {
  //     responseCookies.delete('access')
  //     responseCookies.delete('refresh')
  //   }
  // }

  if (!refresh && matchingPath(PATHS.AUTH, pathname)) {
    return NextResponse.redirect(new URL(`/login?returnUrl=${pathname}`, url))
  }

  if (refresh && matchingPath(PATHS.UN_AUTH, pathname)) {
    return NextResponse.redirect(new URL('/', url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|sitemap.json|sitemap.xml|manifest.json|icons|videos|fonts|images|favicon.ico).*)',
  ],
}
