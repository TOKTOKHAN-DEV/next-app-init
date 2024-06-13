import { useCallback } from 'react'

import { useQueryClient } from '@tanstack/react-query'

/**
 * @category Hooks
 */
export const useInvalidateQuires = () => {
  const queryClient = useQueryClient()

  const invalidate = useCallback(
    (...queryKeys: any[]) => {
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey: queryKey }),
      )
    },
    [queryClient],
  )

  return invalidate
}
