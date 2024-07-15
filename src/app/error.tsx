'use client'

import { useRouter } from 'next/navigation'

import { Button, Center, Flex, Text } from '@chakra-ui/react'

import AppProvider from '@/providers/AppProvider'

import '../../public/fonts/pretendard/css/pretendardvariable-dynamic-subset.css'

/**
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const router = useRouter()
  const handleReset = () => {
    reset()
    router.back()
  }
  return (
    <html lang="ko">
      <body>
        <AppProvider>
          <Flex flex={1} bg="black" h="100vh">
            <Center
              flexDirection="column"
              w="100%"
              bg="black"
              gap={{ base: '60px', sm: '80px' }}
            >
              <Flex direction="column" alignItems="center">
                <Flex px="18.5px" color="white">
                  <Flex direction="column" justifyContent="space-between">
                    <Text textStyle="LargeTitle3">ERROR</Text>
                    <Text textStyle={{ base: 'Body2_E', sm: 'Title2_E' }}>
                      INTERNET
                      <br />
                      SEVER ERROR
                    </Text>
                  </Flex>
                  <Text
                    fontSize={{ base: '108px', sm: '188px', md: '188px' }}
                    fontWeight="700"
                    lineHeight={{ base: '115px', sm: '200px', md: '188px' }}
                    letterSpacing="-5.64px"
                  >
                    500
                  </Text>
                </Flex>
                <Flex
                  direction="column"
                  alignItems="center"
                  bg="#FFDE67"
                  w="100%"
                  py="12px"
                  gap="4px"
                >
                  <Text textStyle="Body1_E">
                    요청하신 페이지에 접속할 수 없습니다.
                  </Text>
                  <Text textStyle={{ base: 'Caption_E', sm: 'Body1_E' }}>
                    서비스 이용에 불편을 드려 죄송합니다. 잠시 후에 다시
                    접속하시기 바랍니다.
                  </Text>
                </Flex>
              </Flex>

              <Button
                onClick={handleReset}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="100px"
                border="1px solid white"
                bgColor="transparent"
                _hover={{
                  bgColor: 'transparent',
                }}
                w={{ base: '133px', sm: '158px', md: '188px' }}
                h={{ base: '40px', sm: '48px', md: '56px' }}
              >
                <Text textStyle="Title2_E" color="white">
                  GO BACK
                </Text>
              </Button>
            </Center>
          </Flex>
        </AppProvider>
      </body>
    </html>
  )
}
