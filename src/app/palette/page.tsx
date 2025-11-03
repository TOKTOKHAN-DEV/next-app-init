import { Field, Flex, Icon, Input } from '@chakra-ui/react'

import { AppleLoginButton } from '@/components/social-login-button/apple-login'
import { GoogleLoginButton } from '@/components/social-login-button/google-login'
import { KakaoLoginButton } from '@/components/social-login-button/kakao-login'
import { NaverLoginButton } from '@/components/social-login-button/naver-login'

export default function PalettePage() {
  return (
    <Flex direction="column" rowGap="24px" px="20px">
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

      <Flex columnGap="12px">
        <Flex direction="column" rowGap="8px">
          <Input placeholder="입력해 주세요" />
          <Input placeholder="Input" variant="outline" />
          <Input placeholder="Input" variant="flushed" />
        </Flex>

        <Flex direction="column" rowGap="8px">
          <Input placeholder="입력해 주세요" size="md" />
          <Input placeholder="Input" variant="outline" size="md" />
          <Input placeholder="Input" variant="flushed" size="md" />
        </Flex>
        <Flex direction="column" rowGap="8px">
          <Input placeholder="입력해 주세요" size="sm" />
          <Input placeholder="Input" variant="outline" size="sm" />
          <Input placeholder="Input" variant="flushed" size="sm" />
        </Flex>
      </Flex>

      <Flex columnGap="12px">
        <Flex direction="column" rowGap="8px">
          <Field.Root invalid direction="column" rowGap="8px">
            <Input placeholder="입력해 주세요" />
            <Input placeholder="Input" variant="outline" />
            <Input placeholder="Input" variant="flushed" />
          </Field.Root>
        </Flex>
        <Flex direction="column" rowGap="8px">
          <Input readOnly placeholder="입력해 주세요" />
          <Input readOnly placeholder="Input" variant="outline" />
          <Input readOnly placeholder="Input" variant="flushed" />
        </Flex>
        <Flex direction="column" rowGap="8px">
          <Input disabled placeholder="입력해 주세요" />
          <Input disabled placeholder="Input" variant="outline" />
          <Input disabled placeholder="Input" variant="flushed" />
        </Flex>
      </Flex>
    </Flex>
  )
}
