import { PropsWithChildren } from 'react'

import { Container, ContainerProps, Text } from '@chakra-ui/react'

interface TemplateLayoutProps extends ContainerProps {
  title: string
}

const TemplateLayout = ({
  title,
  children,
  ...props
}: PropsWithChildren<TemplateLayoutProps>) => {
  return (
    <Container variant={'template'} {...props}>
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

export default TemplateLayout
