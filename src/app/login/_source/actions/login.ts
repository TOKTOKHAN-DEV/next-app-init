'use server'

// import { cookies } from 'next/headers'
// import { UserLoginType } from '@/swagger/@types/data-contracts'
import { LoginFormDataType } from '../hooks/useLoginForm'

// import fetchExtended from '@/configs/fetch/fetch-extend'
// import { jwtDecode } from '@toktokhan-dev/universal'
// import { calcMaxAge } from '@/utils/middleware/calc-max-age'
// import { getJwtCookieOptions } from '@/utils/middleware/get-jwt-cookie-option'

/**
 *
 * @param data
 * @description swagger 기반으로 generate 된 api 혹은 login api를 넣어주세요
 */
export async function login(data: LoginFormDataType) {
  // const { id, password } = data
  // try {
  //   const response = await fetchExtended(`/v1/user/login/`, {
  //     body: JSON.stringify({
  //       username: id,
  //       password,
  //     }),
  //     method: 'POST',
  //   })
  //   if (response.ok) {
  //     const res = response.body as any
  //     const { access, refresh } = res
  //     const decodedAccess = jwtDecode(access)
  //     const decodedRefresh = jwtDecode(refresh)
  //     const refreshMaxAge = calcMaxAge({ exp: decodedRefresh?.exp })
  //     cookies().set('access', access, getJwtCookieOptions(refreshMaxAge))
  //     cookies().set('refresh', refresh, getJwtCookieOptions(refreshMaxAge))
  //   }
  //   return response.ok
  // } catch (error) {
  //   throw new Error(`Error during login: ${error}`)
  // }
}
