// @delete:file
'use client'

import { Fragment, PropsWithChildren, useState } from 'react'

import { Button, Text } from '@chakra-ui/react'

// @delete:file

export default function ClientComponent({ children }: PropsWithChildren) {
  const [count, setCount] = useState(0)
  return (
    <Fragment>
      <Text>{count}</Text>
      <Button onClick={() => setCount((prev) => prev + 1)}>up</Button>
      {children}
    </Fragment>
  )
}
