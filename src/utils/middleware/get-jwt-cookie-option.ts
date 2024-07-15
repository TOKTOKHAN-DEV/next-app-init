import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import { CookieOptions } from '@toktokhan-dev/react-web'

/**
 *
 * @param maxAge - 쿠키 만료 기한. input이 없을 때는 session 쿠키로 저장됩니다.
 * @description 쿠키 저장 시 권장 옵션입니다.
 * httpOnly - false 는 cookie를 서버와 클라이언트에서 사용하기 위함입니다.
 * 보안을 위하여 *dangerouslySetInnerHTML* 를 사용하는 곳에 sanitize로 감싸주세요
 */
export const getJwtCookieOptions = (
  maxAge?: number,
): Partial<ResponseCookie> & CookieOptions => ({
  sameSite: 'strict',
  path: '/',
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  ...(maxAge && { maxAge }),
})
