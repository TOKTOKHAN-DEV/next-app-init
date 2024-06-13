import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

/**
 *
 * @param maxAge - 쿠키 만료 기한. input이 없을 때는 session 쿠키로 저장됩니다.
 * @description 쿠키 저장 시 최상위 보안 설정 된 권장 옵션입니다.
 */
export const getJwtCookieOptions = (
  maxAge?: number,
): Partial<ResponseCookie> => ({
  sameSite: 'strict',
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  ...(maxAge && { maxAge }),
})
