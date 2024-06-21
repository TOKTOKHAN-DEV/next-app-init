// @delete:file
'use client'

import { Button } from '@chakra-ui/react'

import createTodo from '@/actions/createTodo'

export default function RevalidateButton() {
  const handleRevalidate = async () => {
    await createTodo()
  }
  return <Button onClick={handleRevalidate}>revalidate</Button>
}
