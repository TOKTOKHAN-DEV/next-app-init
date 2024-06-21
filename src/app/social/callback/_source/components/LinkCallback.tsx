import { useRouter, useSearchParams } from 'next/navigation'

import { Button, Center } from '@chakra-ui/react'
import { useOauthLinkCallback } from '@toktokhan-dev/react-web'

import Splash from '@/components/Splash'
import { Route } from 'next'

const LinkCallback = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') as Route;
  
  const result = useOauthLinkCallback({
    onSuccess: (res) => {
      console.log('res', res)
      // mutate({ token: data?.token, socialType: data?.socialType })
    },
    onFail: () => {
      console.log('failed to login')
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
