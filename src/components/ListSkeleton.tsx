// @delete:file
import { Flex, Skeleton } from '@chakra-ui/react'

export default function ListSkeleton() {
  return (
    <Flex flexDir="column" gap="5px">
      <Skeleton w="700px" h="100px" />
      <Skeleton w="700px" h="100px" />
      <Skeleton w="700px" h="100px" />
      <Skeleton w="700px" h="100px" />
      <Skeleton w="700px" h="100px" />
      <Skeleton w="700px" h="100px" />
      <Skeleton w="700px" h="100px" />
      <Skeleton w="700px" h="100px" />
    </Flex>
  )
}
