'use client'

import React from 'react'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

import { ColorModeProvider } from '@/components/ui/color-mode'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  )
}
