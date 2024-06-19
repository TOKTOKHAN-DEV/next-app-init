// @delete:file
// @delete:folder
'use client'

import { Flex, Text } from '@chakra-ui/react'

import { useTodoListQuery } from '@/apis/todo/TodoApi.query'

// @delete:file
// @delete:folder

const QueryTodoList = () => {
  const { data: todos } = useTodoListQuery({
    options: {
      staleTime: 1000 * 5,
    },
  })

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

export default QueryTodoList
