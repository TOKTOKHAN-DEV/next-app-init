'use client'

import { use } from 'react'

import { Flex, Text } from '@chakra-ui/react'

import { TodoType } from '@/apis/todo/types/model/todo'

interface FetchTodoListProps {
  todosPromise: Promise<TodoType[]>
}
const FetchTodoList = ({ todosPromise }: FetchTodoListProps) => {
  // Streaming data from the server to the client
  const todos = use(todosPromise)
  return (
    <Flex flexDir="column" gap="5px">
      {todos?.map(({ userId, title, completed }) => (
        <Flex
          key={`${userId}_${title}`}
          flexDir="column"
          h="100px"
          borderRadius="4px"
          border="1px solid gray"
          justifyContent="center"
          p="20px"
        >
          <Text>userId: {userId}</Text>
          <Text>title: {title}</Text>
          <Text>completed: {String(completed)}</Text>
        </Flex>
      ))}
    </Flex>
  )
}

export default FetchTodoList
