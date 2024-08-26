import { PropsWithChildren } from 'react'

import { Box, BoxProps, ChakraProps, Text } from '@chakra-ui/react'

interface AdmonitionProps extends BoxProps {
  type: 'info' | 'warning' | 'danger' | 'success'
  //
}

type AdmonitionValue = {
  color: ChakraProps['color']
  bar: ChakraProps['color']
  bg: ChakraProps['color']
  icon: string
}

const AdmonitionData: Record<AdmonitionProps['type'], AdmonitionValue> = {
  info: {
    color: 'primary.3',
    bar: 'primary.3',
    bg: 'background.basic.1',
    icon: 'i',
  },
  warning: {
    color: 'accent.yellow.2',
    bar: 'accent.yellow.2',
    bg: 'background.basic.1',
    icon: 'i',
  },
  danger: {
    color: 'accent.red.2',
    bar: 'accent.red.2',
    bg: 'background.basic.1',
    icon: 'i',
  },
  success: {
    color: 'accent.green.2',
    bar: 'accent.green.2',
    bg: 'background.basic.1',
    icon: 'i',
  },
} as const

const Admonition = ({
  type = 'info',
  children,
  ...props
}: PropsWithChildren<AdmonitionProps>) => {
  return (
    <Box
      pos={'relative'}
      boxShadow={'sm'}
      bg={AdmonitionData[type].bg}
      p={'30px'}
      borderRadius={'8px'}
      {...props}
    >
      <Box
        borderRadius={'4px'}
        w={'3px'}
        h={'100%'}
        bg={AdmonitionData[type].bar}
        pos={'absolute'}
        top={0}
        left={0}
      />
      <Text
        mb={'10px'}
        textStyle={'pre-heading-05'}
        color={AdmonitionData[type].color}
      >
        <Text
          as={'span'}
          color={AdmonitionData[type].color}
          textStyle={'pre-heading-05'}
        >
          {AdmonitionData[type].icon}{' '}
        </Text>
        {type?.toUpperCase()}
      </Text>
      <Box pl={'5px'}>{children}</Box>
    </Box>
  )
}

export default Admonition
