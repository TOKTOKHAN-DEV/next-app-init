import { Link } from '@chakra-ui/next-js'
import { Container, ContainerProps } from '@chakra-ui/react'

import { LogoIcon } from '@/generated/icons/MyIcons'
import { ROUTES } from '@/generated/path/routes'

export default function HomeFooter({ ...props }: ContainerProps) {
  return (
    <Container
      w={'100%'}
      variant={'base'}
      display={'flex'}
      alignItems="center"
      flexDirection={'column'}
      justifyContent={'center'}
      {...props}
    >
      <Link variant={'unstyled'} href={ROUTES.MAIN}>
        <LogoIcon boxSize={'50px'} color={'icon.tertiary'} />
      </Link>
    </Container>
  )
}
