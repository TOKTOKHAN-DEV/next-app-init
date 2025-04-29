'use client'

import { Flex, Text } from '@chakra-ui/react'

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
      <Text>Page Not Found</Text>
    </Flex>
  )
}
