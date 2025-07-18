'use client'

import React from 'react'

import { ChakraProvider } from '@chakra-ui/react'

import { ColorModeProvider } from '@/components/ui/color-mode'
import { system } from '@/configs/theme'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  )
}
