// @delete:file
'use client'

import { Button } from '@chakra-ui/react'

import createTodo from '@/actions/createTodo'

// @delete:file

interface RevalidateButtonProps {
  revalidate: () => Promise<void>
}
export default function RevalidateButton({
  revalidate,
}: RevalidateButtonProps) {
  const handleRevalidate = async () => {
    await createTodo()
  }
  return (
    <form action={revalidate}>
      <Button type="submit">revalidate (form action)</Button>
      <Button bgColor="blue.100" onClick={handleRevalidate}>
        revalidate (event handler)
      </Button>
    </form>
  )
}
