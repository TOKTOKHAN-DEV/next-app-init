import { PropsWithChildren } from 'react'

import { Box, BoxProps, Text } from '@chakra-ui/react'

interface AdmonitionProps extends BoxProps {
  type: 'info' | 'warning' | 'danger' | 'success'
  //
}

const AdmonitionData = {
  info: {
    color: 'text.brand',
    bar: 'background.brand.active',
    bg: 'background.primary',
    icon: 'ℹ',
  },
  warning: {
    color: 'yellow',
    bar: 'background.brand.inverse',
    bg: 'background.primary',
    icon: 'ℹ',
  },
  danger: {
    color: 'red',
    bar: 'background.brand.inverse',
    bg: 'background.primary',
    icon: 'ℹ',
  },
  success: {
    color: 'green',
    bar: 'background.brand.inverse',
    bg: 'background.primary',
    icon: 'ℹ',
  },
} as const

const Admonition = ({
  type,
  children,
  ...props
}: PropsWithChildren<AdmonitionProps>) => {
  return (
    <Box
      pos={'relative'}
      boxShadow={'card'}
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
      <Text mb={'10px'} textStyle={'pre-heading-05'}>
        <Text as={'span'} color={'text.brand'} fontSize={'20px'}>
          {AdmonitionData[type].icon}
        </Text>
        {type?.toUpperCase()}
      </Text>
      <Box pl={'5px'}>{children}</Box>
    </Box>
  )
}

export default Admonition
