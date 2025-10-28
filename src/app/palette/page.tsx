import { Flex, Icon } from '@chakra-ui/react'

import { AppleLoginButton } from '@/components/social-login-button/apple-login'
import { GoogleLoginButton } from '@/components/social-login-button/google-login'
import { KakaoLoginButton } from '@/components/social-login-button/kakao-login'
import { NaverLoginButton } from '@/components/social-login-button/naver-login'

export default function PalettePage() {
  return (
    <Flex gap="8px">
      <Flex w="fit-content" direction="column" rowGap="8px">
        <KakaoLoginButton.Icon />
        <KakaoLoginButton.Full />
      </Flex>
      <Flex w="fit-content" direction="column" rowGap="8px">
        <AppleLoginButton.Icon />
        <AppleLoginButton.Full />
      </Flex>
      <Flex w="fit-content" direction="column" rowGap="8px">
        <GoogleLoginButton.Icon />
        <GoogleLoginButton.Full />
      </Flex>
      <Flex w="fit-content" direction="column" rowGap="8px">
        <NaverLoginButton.Icon />
        <NaverLoginButton.Full />
      </Flex>
    </Flex>
  )
}
