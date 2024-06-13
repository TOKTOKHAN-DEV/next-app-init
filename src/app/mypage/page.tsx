import { Metadata } from 'next'

import { Center, Text } from '@chakra-ui/react'

export const metadata: Metadata = {
  title: '마이페이지',
}
export default function MyPage() {
  return (
    <Center>
      <Text>로그인 해야지만 접근할 수 있는 페이지 입니다.</Text>
    </Center>
  )
}
