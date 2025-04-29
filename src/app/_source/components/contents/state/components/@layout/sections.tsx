import { StackProps, Text, VStack } from '@chakra-ui/react'

interface SectionsProps extends StackProps {
  title: string
  children: React.ReactNode
}

export const Sections = ({ title, children }: SectionsProps) => {
  return (
    <VStack align={'start'} w={'100%'} gap={'15px'}>
      <Text textStyle={'pre-heading-03'}>{title}</Text>
      {children}
    </VStack>
  )
}
