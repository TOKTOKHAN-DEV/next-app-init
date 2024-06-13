'use client'

import { Button, ButtonProps } from '@chakra-ui/react'

export const SideBtn = (props: ButtonProps) => {
  return (
    <Button
      fontSize={'10px'}
      position="fixed"
      right="0"
      top="50%"
      bg="blue.500"
      color="white"
      borderRadius="none"
      wordBreak={'break-all'}
      p="0"
      minW="0"
      h="70px"
      transform={'translateY(-50%)'}
      sx={{
        writingMode: 'vertical-rl',
      }}
      {...props}
    >
      TOK GUIDE
    </Button>
  )
}
