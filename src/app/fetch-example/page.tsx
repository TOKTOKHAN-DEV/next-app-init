// @delete:file
// @delete:folder
import { Metadata } from 'next'
import Link from 'next/link'

import { Center, ListItem, OrderedList, Text } from '@chakra-ui/react'

export const metadata: Metadata = {
  title: 'fetch example',
}
export default function FetchExamplePage() {
  return (
    <Center flexDir="column">
      <Text fontSize="70px" fontWeight={700}>
        fetch example
      </Text>
      <OrderedList>
        <ListItem>
          <Link href="/fetch-example/fetch-with-streaming">
            go to fetch-with-streaming
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/fetch-example/client-tanstack-query">
            go to client-tanstack-query
          </Link>
        </ListItem>
      </OrderedList>
    </Center>
  )
}
