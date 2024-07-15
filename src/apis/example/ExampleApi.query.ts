import { useQuery } from '@tanstack/react-query'
import { isNotNullish } from '@toktokhan-dev/universal'
import { Parameter } from '@toktokhan-dev/universal'

import { UseQueryParams } from '@/types/module/react-query/use-query-params'

import exampleApi from './ExampleApi'

export const EXAMPLE_API_QUERY_KEY = {
  GET_LIST: (params?: Parameter<typeof exampleApi.getList>) =>
    ['example-list', params].filter(isNotNullish),
  GET_BY_ID: (params?: Parameter<typeof exampleApi.getById>) =>
    ['example-by-id', params].filter(isNotNullish),
}

export function useGetExampleListQuery(
  params?: UseQueryParams<typeof exampleApi.getList>,
) {
  const queryKey = EXAMPLE_API_QUERY_KEY.GET_LIST(params?.variables)
  return useQuery({
    queryKey,
    queryFn: () => exampleApi.getList(params?.variables),
    ...params?.options,
  })
}

export function useGetExampleByIdQuery(
  params: UseQueryParams<typeof exampleApi.getById>,
) {
  const queryKey = EXAMPLE_API_QUERY_KEY.GET_BY_ID(params?.variables)
  return useQuery({
    queryKey,
    queryFn: () => exampleApi.getById(params?.variables),
    ...params?.options,
  })
}
