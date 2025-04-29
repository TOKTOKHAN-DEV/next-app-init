import { StackProps, Tag, VStack } from '@chakra-ui/react'

interface SectionProps extends StackProps {
  title: string
  children: React.ReactNode
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <VStack w={'100%'} ml={'5px'} align={'start'}>
      <Tag.Root>
        <Tag.Label>{title}</Tag.Label>
      </Tag.Root>
      <VStack w={'100%'} bg={'background.secondary'} borderRadius={'8px'}>
        {children}
      </VStack>
    </VStack>
  )
}
