// import { SocialLoginDtoTypeEnumType } from '@/generated/apis/@types/data-contracts'

export type OauthCallback = {
  returnUrl: string
  type: string
  // type: SocialLoginDtoTypeEnumType -> 'kakao' | 'google' | ...
}
