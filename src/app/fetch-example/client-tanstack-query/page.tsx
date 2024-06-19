// @delete:file
// @delete:folder
import Link from 'next/link'

import { Center, Flex, Text } from '@chakra-ui/layout'

import QueryPhotoList from '@/components/Photo/QueryPhotoList'
import QueryTodoList from '@/components/Todo/QueryTodoList'

export default function ClientTanstackQuery() {
  return (
    <Center flexDir="column">
      <Text fontSize="50px" fontWeight={700}>
        client-side useQuery
      </Text>
      <Link href="/fetch-example">go to example list</Link>

      <Flex justifyContent="space-between">
        <Flex flexDir="row" justifyContent="center" gap="32px" w="100%">
          <Flex flexDir="column" w="700px">
            <Text fontSize="30px" fontWeight={500}>
              Todo List
            </Text>
            <QueryTodoList />
          </Flex>
          <Flex flexDir="column" w="700px">
            <Text fontSize="30px" fontWeight={500}>
              Photo List
            </Text>
            <QueryPhotoList />
          </Flex>
        </Flex>
      </Flex>
    </Center>
  )
}
