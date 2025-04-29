import { Button, HStack, Text, VStack } from '@chakra-ui/react'

interface CountBoxProps {
  count: number
  onReset: () => void
  onIncrease: () => void
  onDecrease: () => void
  extra?: React.ReactNode
}

export const CountBox = ({
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
      <VStack gap={'0px'}>
        <Text textStyle={'pre-body-01'}>COUNT BOX</Text>
        <Button variant={'plain'} size={'sm'} onClick={onReset}>
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
