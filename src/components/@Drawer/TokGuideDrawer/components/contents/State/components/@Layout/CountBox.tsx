import { ReactNode } from 'react'

import { Button, HStack, Text, VStack } from '@chakra-ui/react'

import { count } from 'console'
import { set } from 'lodash'

interface CountBoxProps {
  count: number
  onReset: () => void
  onIncrease: () => void
  onDecrease: () => void
  extra?: ReactNode
}

const CountBox = ({
  count,
  onDecrease,
  onIncrease,
  onReset,
  extra,
}: CountBoxProps) => {
  return (
    <VStack
      w={'100%'}
      bg={'background.secondary'}
      py={'20px'}
      borderRadius={'8px'}
    >
      <VStack spacing={'0px'}>
        <Text textStyle={'pre-body-01'}>COUNT BOX</Text>
        <Button variant={'unstyled'} size={'sm'} onClick={onReset}>
          Reset
        </Button>
      </VStack>
      <HStack>
        <Button size={'sm'} onClick={onDecrease}>
          Decrease
        </Button>
        <Text w={'50px'} textAlign={'center'}>
          {count}
        </Text>
        <Button size={'sm'} onClick={onIncrease}>
          Increase
        </Button>
      </HStack>
      {extra}
    </VStack>
  )
}

export default CountBox
