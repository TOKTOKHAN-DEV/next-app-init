import { UseQueryOptions } from '@tanstack/react-query'
import { AsyncFn, AsyncFnReturn, Parameter } from '@toktokhan-dev/universal'

import { AxiosError } from 'axios'

import { WrapVariables } from './wrap-variables'

// Example : const useAnyQuery = ({ options, variables } : UseQueryParams<typeof anyApiFn>) => {...}
export type UseQueryParams<
  T extends AsyncFn,
  Error = AxiosError<any>,
  Data = AsyncFnReturn<T>,
  Variables = Parameter<T>,
> = {
  options?: Omit<UseQueryOptions<Data, Error>, 'queryKey' | 'queryFn'>
} & WrapVariables<Variables>
