import { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button, Center } from '@chakra-ui/react'
import { useOauthLinkCallback } from '@toktokhan-dev/react-web'

import Splash from '@/components/Splash'

import { OauthCallback } from '../types'

const LinkCallback = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl') as Route

  const result = useOauthLinkCallback<OauthCallback>({
    onSuccess: (res) => {
      console.log('succeed to login', res)
      // mutateAsync({
      //   data: {
      //     code: res.code,
      //     type: res.state.type,
      //   },
      // }).then((res) =>
      // save token to client storage
      //
    },
    onFail: (res) => {
      console.log('failed to login', res)
      // router.push(res.returnUrl || '/')
    },
  })

  if (result.isLoading) return <Splash />
  return (
    <Center flex={1} h={'100vh'}>
      <Button
        onClick={() => {
          router.push(returnUrl || '/')
        }}
      >
        로그인 성공
      </Button>
    </Center>
  )
}

export default LinkCallback
