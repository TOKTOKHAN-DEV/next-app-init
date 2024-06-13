import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { isNotNullish } from '@toktokhan-fe/universal'

import { Parameter } from '@/types/utility/parameter'

import exampleApi from './ExampleApi'
import { InfiniteQueryHookParams } from '@/types/module/react-query/infinite-query-hook-params'
import { QueryHookParams } from '@/types/module/react-query/query-hook-params'
import { RequestFnReturn } from '@/types/utility/request-fn-return'

export const EXAMPLE_API_QUERY_KEY = {
  GET_LIST: (params?: Parameter<typeof exampleApi.getList>) =>
    ['example-list', params].filter(isNotNullish),
  GET_LIST_PAGINATED: (
    params?: Parameter<typeof exampleApi.getListPaginated>,
  ) => ['example-list-paginated', params].filter(isNotNullish),
  GET_BY_ID: (params?: Parameter<typeof exampleApi.getById>) =>
    ['example-by-id', params].filter(isNotNullish),
}

export function useGetExampleListQuery<
  TData = RequestFnReturn<typeof exampleApi.getList>,
>(params?: QueryHookParams<typeof exampleApi.getList, any, TData>) {
  const queryKey = EXAMPLE_API_QUERY_KEY.GET_LIST(params?.variables)
  return useQuery({
    queryKey,
    queryFn: () => exampleApi.getList(params?.variables),
    ...params?.options,
  })
}

export function useGetExampleListInfiniteQuery<
  TData = RequestFnReturn<typeof exampleApi.getListPaginated>,
>(
  params?: InfiniteQueryHookParams<
    typeof exampleApi.getListPaginated,
    any,
    TData
  >,
) {
  const queryKey = EXAMPLE_API_QUERY_KEY.GET_LIST_PAGINATED(params?.variables)
  return useInfiniteQuery({
    queryKey,
    initialPageParam: null,
    queryFn: ({ pageParam }) => {
      return exampleApi.getListPaginated({
        ...params?.variables,
        cursor: pageParam,
      })
    },
    getNextPageParam: (lastPage) => {
      const params = lastPage.next ? new URL(lastPage.next).searchParams : null
      const cursor = params ? params.get('cursor') : null
      return cursor
    },
    ...params?.options,
  })
}

export function useGetExampleByIdQuery<
  TData = RequestFnReturn<typeof exampleApi.getById>,
>(params: QueryHookParams<typeof exampleApi.getById, any, TData>) {
  const queryKey = EXAMPLE_API_QUERY_KEY.GET_BY_ID(params?.variables)
  return useQuery({
    queryKey,
    queryFn: () => exampleApi.getById(params?.variables),
    ...params?.options,
  })
}
