import { Button, Text } from '@chakra-ui/react'

interface ToggleColorModeButtonViewProps {
  colorMode: 'dark' | 'light'
  toggleColorMode: () => void
}

export const ToggleColorModeButtonView = ({
  colorMode,
  toggleColorMode,
}: ToggleColorModeButtonViewProps) => {
  return (
    <Button
      position="fixed"
      top="100px"
      right="100px"
      bg={'primary.3'}
      onClick={toggleColorMode}
      w="50px"
      h="50px"
      borderRadius="full"
      p="0"
    >
      {colorMode === 'light' ?
        <Text>DARK</Text>
      : <Text>LIGHT</Text>}
    </Button>
  )
}
