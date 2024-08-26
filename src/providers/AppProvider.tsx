'use client'

import { PropsWithChildren } from 'react'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import getQueryClient from '@/configs/react-query/get-query-client'
import theme from '@/configs/theme'
import { GlobalStoreProvider } from '@/stores/global/store'

const coveredTheme = {
  ...theme,
}

/**
 *
 * @param see https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-third-party-packages-and-providers
 */
function AppProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider resetCSS theme={coveredTheme}>
          <GlobalStoreProvider>{children}</GlobalStoreProvider>
        </ChakraProvider>
      </CacheProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default AppProvider
