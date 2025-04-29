'use client'

import { ChakraProvider } from '@chakra-ui/react'

import { system } from '@/configs/theme'

import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'

export const Provider = (props: ColorModeProviderProps) => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
