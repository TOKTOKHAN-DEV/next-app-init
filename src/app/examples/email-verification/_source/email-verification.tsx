'use client'

import { useState } from 'react'

import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'

import { FormHelper } from '@/components/form-helper'

const passwordRules = [
  {
    label: '8~20자',
    regex: /^.{8,20}$/,
  },
  {
    label: '영문 포함',
    regex: /[a-zA-Z]/,
  },
  {
    label: '숫자 포함',
    regex: /[0-9]/,
  },
  {
    label: '특수문자 포함',
    regex: /[^a-zA-Z0-9]/,
  },
]

export const EmailVerification = () => {
  const [password, setPassword] = useState('')

  const passwordMatches = passwordRules.map((rule) =>
    rule.regex.test(password || ''),
  )

  return (
    <Flex direction="column" rowGap="16px">
      <Flex direction="column" rowGap="4px">
        <FormHelper required label="이메일">
          <Flex w="full" alignItems="center" columnGap="4px">
            <Input
              variant="subtle"
              colorPalette="grey"
              placeholder="이메일을 입력해 주세요"
            />
            <Button variant="solid" size="lg" colorPalette="grey">
              번호 받기
            </Button>
          </Flex>
          <Flex w="full" alignItems="center" columnGap="4px">
            <Input
              disabled
              variant="subtle"
              colorPalette="grey"
              placeholder="인증번호를 입력해 주세요"
            />
            <Button disabled variant="solid" size="lg" colorPalette="grey">
              인증 하기
            </Button>
          </Flex>
        </FormHelper>
      </Flex>

      <FormHelper required label="비밀번호">
        <Input
          w="100%"
          variant="subtle"
          colorPalette="grey"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Flex alignItems="center" columnGap="6px" fontSize="12px">
          <Flex alignItems="center" gap="8px" wrap="wrap">
            {passwordRules.map((rule, idx) => {
              const ok = passwordMatches[idx]
              return (
                <Flex key={rule.label} alignItems="center" columnGap="4px">
                  <Box
                    width="16px"
                    height="16px"
                    bg={ok ? 'accent.green2' : 'grey.6'}
                  />
                  <Text
                    textStyle="pre-caption-2"
                    color={ok ? 'accent.green2' : 'grey.6'}
                  >
                    {rule.label}
                  </Text>
                </Flex>
              )
            })}
          </Flex>
        </Flex>
      </FormHelper>

      <FormHelper required label="비밀번호 확인">
        <Input
          w="100%"
          variant="subtle"
          colorPalette="grey"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
        />
      </FormHelper>
    </Flex>
  )
}
