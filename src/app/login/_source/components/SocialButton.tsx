'use client'

import { useEffect } from 'react'

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
} from '@toktokhan-fe/react-web'

import { ENV } from '@/configs/env'

const SOCIAL_CONFIGS = [
  {
    name: 'Kakao',
    Client: Kakao,
    Button: KakaoButton,
    IconButton: KakaoIconButton,
    clientId: ENV.KAKAO_CLIENT_ID,
  },
  {
    name: 'Naver',
    Client: Naver,
    Button: NaverButton,
    IconButton: NaverIconButton,
    clientId: ENV.NAVER_CLIENT_ID,
  },
  {
    name: 'Google',
    Client: Google,
    Button: GoogleButton,
    IconButton: GoogleIconButton,
    clientId: ENV.GOOGLE_CLIENT_ID,
  },
  {
    name: 'Facebook',
    Client: Facebook,
    Button: FacebookButton,
    IconButton: FacebookIconButton,
    clientId: ENV.FACEBOOK_CLIENT_ID,
  },
  {
    name: 'Apple',
    Client: Apple,
    Button: AppleButton,
    IconButton: AppleIconButton,
    clientId: ENV.APPLE_CLIENT_ID,
  },
]

export default function SocialButton() {
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl')

  const { colorMode } = useColorMode()
  const { data } = useOauthPopupListener()

  const handleLogin = <T extends { new (clientId: string): any }>(
    Client: T,
    clientId: string,
    method: 'loginToPopup' | 'loginToLink',
    extraParams: Record<string, any> = {},
  ) => {
    const client = new Client(clientId)
    const loginMethod = client[method]
    loginMethod({
      redirect_uri: `${window.origin}/social/callback`,
      return_url: returnUrl || '/login',
      ...extraParams,
    })
  }

  useEffect(() => {
    if (data) {
      alert(`팝업 로그인 성공 ${JSON.stringify(data)}`)
    }
  }, [data])

  return (
    <>
      <HStack mt={'30px'} spacing={4} flexWrap={'wrap'}>
        {SOCIAL_CONFIGS.map(({ name, Client, Button, clientId = '' }) => (
          <Button
            key={name}
            colorMode={colorMode}
            onClick={() =>
              handleLogin(Client, clientId, 'loginToLink', {
                ...(name === 'Google' && {
                  scope: [GOOGLE_AUTH_SCOPE.email, GOOGLE_AUTH_SCOPE.profile],
                }),
              })
            }
            style={{}}
          />
        ))}
      </HStack>
      <HStack mt={'20px'} flexWrap={'wrap'} spacing={4}>
        {SOCIAL_CONFIGS.map(({ name, Client, IconButton, clientId = '' }) => (
          <IconButton
            key={name}
            colorMode={colorMode}
            onClick={() =>
              handleLogin(Client, clientId, 'loginToPopup', {
                ...(name === 'Google' && {
                  scope: [GOOGLE_AUTH_SCOPE.email, GOOGLE_AUTH_SCOPE.profile],
                }),
              })
            }
          />
        ))}
      </HStack>
    </>
  )
}
