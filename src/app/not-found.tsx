'use client'

import Link from 'next/link'

import { Center, Flex, Text } from '@chakra-ui/react'

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

/**
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export default function NotFound() {
  return (
    <Flex flex={1} h="100vh">
      <Center
        flexDirection="column"
        w="100%"
        gap={{ base: '60px', sm: '80px' }}
      >
        <Flex direction="column" alignItems="center">
          <Flex px="18px" color="white">
            <Flex
              direction="column"
              justifyContent="space-between"
              py={{ base: '8px', sm: '15px' }}
            >
              <Text color="gray.900">ERROR</Text>
              <Text color="gray.900">
                PAGE NOT
                <br />
                FOUND
              </Text>
            </Flex>
            <Text
              color="gray.900"
              fontSize={{ base: '108px', sm: '188px', md: '188px' }}
              fontWeight="700"
              lineHeight={{ base: '115px', sm: '200px', md: '188px' }}
              letterSpacing="-5.64px"
            >
              404
            </Text>
          </Flex>
        </Flex>

        <Link href="/">
          <Text color="gray.900">Return Home</Text>
        </Link>
      </Center>
    </Flex>
  )
}
