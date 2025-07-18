import { Center, CenterProps, Spinner } from '@chakra-ui/react'

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
