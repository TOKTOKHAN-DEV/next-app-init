'use client'

import React from 'react'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import theme from '@/configs/theme'
import { colorModeStorage } from '@/stores/cookie/color-mode'

const coveredTheme = {
  ...theme,
}

export const ThemeProvider = ({
  colorMode,
  children,
}: {
  colorMode?: any
  children: React.ReactNode
}) => {
  return (
    <CacheProvider>
      <ChakraProvider
        resetCSS
        colorModeManager={{
          type: 'cookie',
          ssr: true,
          get: (init) => colorMode ?? init,
          set: (value) => {
            colorModeStorage.set(value)
          },
        }}
        theme={coveredTheme}
      >
        <ColorModeScript
          initialColorMode={coveredTheme.initialColorMode}
          type="cookie"
        />
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}
