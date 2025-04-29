'use client'

import { useRouter } from 'next/navigation'

import { Flex, Text } from '@chakra-ui/react'

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
    <Flex flex={1} bg="black" h="100vh">
      <Text>Internet Server Error</Text>
    </Flex>
  )
}
