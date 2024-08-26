'use client'

import { PropsWithChildren } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import getQueryClient from '@/configs/react-query/get-query-client'
import { GlobalStoreProvider } from '@/stores/global/store'

/**
 *
 * @param see https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-third-party-packages-and-providers
 */
function AppProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStoreProvider>{children}</GlobalStoreProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default AppProvider
