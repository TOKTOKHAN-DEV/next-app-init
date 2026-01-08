import { PropsWithChildren } from 'react'

import { Container, type ContainerProps } from '@chakra-ui/react/container'
import { Text } from '@chakra-ui/react/text'

interface PageTemplateProps extends ContainerProps {
  title: string
}

export const PageTemplate = ({
  title,
  children,
  ...props
}: PropsWithChildren<PageTemplateProps>) => {
  return (
    <Container {...props}>
      <Text
        pt={[0, '48px']}
        pb={'24px'}
        mb={'16px'}
        textAlign="left"
        textStyle="pre-heading-01"
        whiteSpace={'pre-line'}
      >
        {title}
      </Text>
      {children}
    </Container>
  )
}
