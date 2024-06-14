import { UseMutationOptions } from '@tanstack/react-query'
import { AsyncFn, AsyncFnReturn, Parameter } from '@toktokhan-dev/universal'

import { AxiosError } from 'axios'

// Example : const useAnyMutation = ({ options, variables } : UseMutationParams<typeof anyApiFn>) => {...}

export type UseMutationParams<
  T extends AsyncFn,
  Error = AxiosError<any>,
  Data = AsyncFnReturn<T>,
  Variables = Parameter<T>,
> = {
  options?: Omit<
    UseMutationOptions<Data, Error, Variables>,
    'mutationFn' | 'mutationKey'
  >
}
