'use client'

import { useSearchParams } from 'next/navigation'

import { useColorMode } from '@chakra-ui/color-mode'
import { HStack } from '@chakra-ui/react'
import {
  Apple,
  AppleButton,
  AppleIconButton,
  Facebook,
  FacebookButton,
  FacebookIconButton,
  GOOGLE_AUTH_SCOPE,
  Google,
  GoogleButton,
  GoogleIconButton,
  Kakao,
  KakaoButton,
  KakaoIconButton,
  Naver,
  NaverButton,
  NaverIconButton,
  useOauthPopupListener,
} from '@toktokhan-dev/react-web'

import { OauthCallback } from '@/app/social/callback/_source/types'
import { ENV } from '@/configs/env'

const kakao = new Kakao(ENV.KAKAO_CLIENT_ID)
const naver = new Naver(ENV.NAVER_CLIENT_ID)
const google = new Google(ENV.GOOGLE_CLIENT_ID)
const facebook = new Facebook(ENV.FACEBOOK_CLIENT_ID)
const apple = new Apple(ENV.APPLE_CLIENT_ID)

export default function SocialButton() {
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl')

  const { colorMode } = useColorMode()

  useOauthPopupListener<OauthCallback>({
    onSuccess: (res) => {
      console.log('res', res)
      // if (!res?.code || !res.state) return // TODO: error handling
      // mutateAsync({
      //   data: {
      //     code: res.code,
      //     type: res.state.type,
      //   },
      // }).then((res) =>
      // save token to client storage
      //
    },
    onFail: () => {
      // console.log('fail')
    },
  })

  return (
    <>
      <HStack mt={'30px'} spacing={4} flexWrap={'wrap'}>
        <KakaoButton
          colorMode={colorMode}
          onClick={() =>
            kakao.loginToLink({
              redirect_uri: `${window.origin}/social/callback`,
              state: {
                returnUrl: returnUrl || '/',
                type: 'kakao',
              },
            })
          }
        />
        <NaverButton
          colorMode={colorMode}
          onClick={() =>
            naver.loginToLink({
              redirect_uri: `${window.origin}/social/callback`,
              state: {
                returnUrl: returnUrl || '/',
                type: 'naver',
              },
            })
          }
        />
        <GoogleButton
          colorMode={colorMode}
          onClick={() =>
            google.loginToLink({
              redirect_uri: `${window.origin}/social/callback`,
              scope: [GOOGLE_AUTH_SCOPE.email, GOOGLE_AUTH_SCOPE.profile],
              state: {
                returnUrl: returnUrl || '/',
                type: 'google',
              },
            })
          }
        />
        <FacebookButton
          colorMode={colorMode}
          onClick={() =>
            facebook.loginToLink({
              redirect_uri: `${window.origin}/social/callback`,
              state: {
                returnUrl: returnUrl || '/',
                type: 'facebook',
              },
            })
          }
        />
        <AppleButton
          colorMode={colorMode}
          onClick={() =>
            apple.loginToLink({
              redirect_uri: `${window.origin}/social/callback`,
              state: {
                returnUrl: returnUrl || '/',
                type: 'apple',
              },
            })
          }
        />
      </HStack>
      <HStack mt={'20px'} flexWrap={'wrap'} spacing={4}>
        <KakaoIconButton
          colorMode={colorMode}
          onClick={() =>
            kakao.loginToPopup({
              redirect_uri: `${window.origin}/social/callback`,
              state: {
                returnUrl: returnUrl || '/login',
                type: 'kakao',
              },
            })
          }
        />
        <NaverIconButton
          colorMode={colorMode}
          onClick={() =>
            naver.loginToPopup({
              redirect_uri: `${window.origin}/social/callback`,
              state: {
                returnUrl: returnUrl || '/login',
                type: 'naver',
              },
            })
          }
        />
        <GoogleIconButton
          colorMode={colorMode}
          onClick={() =>
            google.loginToPopup({
              redirect_uri: `${window.origin}/social/callback`,
              scope: [GOOGLE_AUTH_SCOPE.email, GOOGLE_AUTH_SCOPE.profile],
              state: {
                returnUrl: returnUrl || '/login',
                type: 'google',
              },
            })
          }
        />
        <FacebookIconButton
          colorMode={colorMode}
          onClick={() =>
            facebook.loginToPopup({
              redirect_uri: `${window.origin}/social/callback`,
              state: {
                returnUrl: returnUrl || '/login',
                type: 'facebook',
              },
            })
          }
        />
        <AppleIconButton
          colorMode={colorMode}
          onClick={() =>
            apple.loginToPopup({
              redirect_uri: `${window.origin}/social/callback`,
              state: {
                returnUrl: returnUrl || '/login',
                type: 'apple',
              },
            })
          }
        />
      </HStack>
    </>
  )
}
