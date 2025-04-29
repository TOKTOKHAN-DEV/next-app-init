import { PropsWithChildren } from 'react'

import { Container, ContainerProps, Text } from '@chakra-ui/react'

interface PageTemplateProps extends ContainerProps {
  title: string
}

export const PageTemplate = ({
  title,
  children,
  ...props
}: PropsWithChildren<PageTemplateProps>) => {
  return (
    <Container template {...props}>
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
