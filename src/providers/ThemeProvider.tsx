'use client'

import React from 'react'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import theme from '@/configs/theme'
import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { clientCookie } from '@/stores/cookie/store'

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
          get: (init) => {
            return clientCookie.get(COOKIE_KEYS.COLOR_MODE) ?? colorMode ?? init
          },
          set: (value) => {
            clientCookie.set(COOKIE_KEYS.COLOR_MODE, value)
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
