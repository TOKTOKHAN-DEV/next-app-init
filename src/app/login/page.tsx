import { Suspense } from 'react'

import { Metadata } from 'next'

import {
  Box,
  Center,
  Code,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'

import LoginForm from './_source/components/LoginForm'
import SocialButton from './_source/components/SocialButton'

export const metadata: Metadata = {
  title: '로그인',
}

export default function LoginPage() {
  return (
    <Center flexDirection="column">
      <Box p="20px" flexDirection="column">
        <Box>
          로그인 한 유저 Block:{' '}
          <Code color="primary.500">middleware - un-auth</Code>
          <Box px="20px">
            <Text>예시</Text>
            <UnorderedList fontSize="14px" px="20px">
              <ListItem>로그인 페이지</ListItem>
              <ListItem>회원가입 페이지</ListItem>
            </UnorderedList>
          </Box>
        </Box>
        <Box>
          로그인 안 한 유저 Block:{' '}
          <Code color="primary.500">middleware - auth</Code>
          <Box px="20px">
            <Text>예시</Text>
            <UnorderedList fontSize="14px" px="20px">
              <ListItem>마이 페이지</ListItem>
              <ListItem>주문 페이지</ListItem>
            </UnorderedList>
          </Box>
        </Box>
      </Box>
      <Suspense fallback="컴포넌트 내부에서 useSearchParams 훅을 사용한다면 서스펜스를 감싸주어야 합니다.">
        <LoginForm />
      </Suspense>
      <Suspense fallback="컴포넌트 내부에서 useSearchParams 훅을 사용한다면 서스펜스를 감싸주어야 합니다.">
        <SocialButton />
      </Suspense>
    </Center>
  )
}
