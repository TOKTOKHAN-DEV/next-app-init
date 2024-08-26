import React, { ReactNode } from 'react'

import { StackProps, Text, VStack } from '@chakra-ui/react'

interface SectionsProps extends StackProps {
  title: string
  children: ReactNode
}

const Sections = ({ title, children }: SectionsProps) => {
  return (
    <VStack align={'start'} w={'100%'} spacing={'15px'}>
      <Text textStyle={'pre-heading-03'}>{title}</Text>
      {children}
    </VStack>
  )
}

export default Sections
