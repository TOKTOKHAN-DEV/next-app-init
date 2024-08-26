import React, { ReactNode } from 'react'

import { StackProps, Tag, Text, VStack } from '@chakra-ui/react'

interface SectionProps extends StackProps {
  title: string
  children: ReactNode
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <VStack w={'100%'} ml={'5px'} align={'start'}>
      <Tag>{title}</Tag>
      <VStack w={'100%'} bg={'background.secondary'} borderRadius={'8px'}>
        {children}
      </VStack>
    </VStack>
  )
}

export default Section
