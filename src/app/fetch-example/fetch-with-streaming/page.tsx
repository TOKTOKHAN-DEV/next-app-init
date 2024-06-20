// @delete:file
// @delete:folder
import { Suspense } from 'react'

import Link from 'next/link'

import { Center, Flex, Text } from '@chakra-ui/react'

import { photoApi } from '@/apis/photo/PhotoApi'
import { todoApi } from '@/apis/todo/TodoApi'
import ClientComponent from '@/components/ClientComponent'
import ListSkeleton from '@/components/ListSkeleton'
import FetchPhotoList from '@/components/Photo/FetchPhotoList'
import RevalidateButton from '@/components/RevalidateButton'
import FetchTodoList from '@/components/Todo/FetchTodoList'

export default async function FetchWithStreaming() {
  return (
    <Center flexDir="column">
      <Text fontSize="50px" fontWeight={700}>
        fetch with streaming
      </Text>
      <Link href="/fetch-example">go to example list</Link>
      <ClientComponent>
        <Flex w="100%" gap="40px" justifyContent="center" flexDir="row">
          <Flex flexDir="column" alignItems="center" w="700px">
            <Flex
              alignItems="center"
              justifyContent="center"
              gap="32px"
              w="100%"
            >
              <Text fontSize="30px" fontWeight={500}>
                Todo List
              </Text>
              <RevalidateButton />
            </Flex>
            <Suspense fallback={<ListSkeleton />}>
              <FetchTodoList
                todosPromise={todoApi.todoList({
                  params: {
                    cache: 'force-cache',
                  },
                })}
              />
            </Suspense>
          </Flex>
          <Flex flexDir="column" alignItems="center" w="700px">
            <Text fontSize="30px" fontWeight={500}>
              Photo List
            </Text>
            <Suspense fallback={<ListSkeleton />}>
              <FetchPhotoList
                photosPromise={photoApi.photoList({
                  params: {
                    cache: 'force-cache',
                  },
                })}
              />
            </Suspense>
          </Flex>
        </Flex>
      </ClientComponent>
    </Center>
  )
}
