import { Center, type CenterProps } from '@chakra-ui/react/center'
import { Spinner } from '@chakra-ui/react/spinner'

export const Splash = (props: CenterProps) => {
  return (
    <Center w="100vw" h="100vh" bg="gray.100" {...props}>
      <Spinner
        borderWidth="4px"
        animationDuration="0.65s"
        color="primary.500"
        size="xl"
      />
    </Center>
  )
}
