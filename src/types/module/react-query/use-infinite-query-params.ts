import { UseInfiniteQueryOptions } from '@tanstack/react-query'
import { AsyncFn, AsyncFnReturn, Parameter } from '@toktokhan-dev/universal'

import { AxiosError } from 'axios'

import { WrapVariables } from './wrap-variables'

// Example : const useAnyQuery = ({ options, variables } : UseInfiniteQueryParams<typeof anyApiFn>) => {...}

export type UseInfiniteQueryParams<
  T extends AsyncFn,
  Error = AxiosError<any>,
  Data = AsyncFnReturn<T>,
  Variables = Parameter<T>,
> = {
  options?: Omit<
    UseInfiniteQueryOptions<Data, Error, Data, Data, any>,
    'queryKey' | 'queryFn'
  >
} & WrapVariables<Variables>
