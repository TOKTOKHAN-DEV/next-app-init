import { Suspense } from 'react'

import { Metadata } from 'next'

import {
  Box,
Code,
  ListItem,
UnorderedList,
} from '@chakra-ui/react'

import Admonition from '@/components/@Templates/Admonition'
import TemplateLayout from '@/components/@Templates/TemplateLayout'

import LoginForm from './_source/components/LoginForm'
import SocialButton from './_source/components/SocialButton'

export const metadata: Metadata = {
  title: '로그인',
}

export default function LoginPage() {
  return (
    <TemplateLayout title={'Login'}>
      <Admonition title="로그인 페이지" type="info" mb={'20px'}>
        <Box mb={'10px'} textStyle={'pre-body-03'}>
          로그인 한 유저 Block: <Code>middleware - un-auth</Code>
          <UnorderedList fontSize="14px" px="20px">
            <ListItem>로그인 페이지</ListItem>
            <ListItem>회원가입 페이지</ListItem>
          </UnorderedList>
        </Box>
        <Box textStyle={'pre-body-03'}>
          로그인 안 한 유저 Block: <Code>middleware - auth</Code>
          <UnorderedList fontSize="14px" px="20px">
            <ListItem>마이 페이지</ListItem>
            <ListItem>주문 페이지</ListItem>
          </UnorderedList>
        </Box>
      </Admonition>
      <Suspense fallback="컴포넌트 내부에서 useSearchParams 훅을 사용한다면 서스펜스를 감싸주어야 합니다.">
        <LoginForm />
      </Suspense>
      <Suspense fallback="컴포넌트 내부에서 useSearchParams 훅을 사용한다면 서스펜스를 감싸주어야 합니다.">
        <SocialButton />
      </Suspense>
    </TemplateLayout>
  )
}
