import Link from 'next/link'

import { Container, ContainerProps } from '@chakra-ui/react'

import { LogoIcon } from '@/generated/icons/MyIcons'
import { ROUTES } from '@/generated/path/routes'

export const PageLayoutFooter = ({ ...props }: ContainerProps) => {
  return (
    <Container
      w={'100%'}
      basis
      display={'flex'}
      alignItems="center"
      flexDirection={'column'}
      justifyContent={'center'}
      {...props}
    >
      <Link href={ROUTES.MAIN}>
        <LogoIcon boxSize={'50px'} color={'icon.tertiary'} />
      </Link>
    </Container>
  )
}
