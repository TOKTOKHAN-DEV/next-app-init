import { useQuery } from '@tanstack/react-query'
import { Parameter } from '@toktokhan-dev/universal'

import { UseQueryParams } from '@/types/module/react-query/use-query-params'

import { todoApi } from './TodoApi'

/**
 * QUERY_KEYS
 */
export const QUERY_KEY_TODO_API = {
  LIST: (variables?: Parameter<typeof todoApi.todoList>) =>
    ['TODO_LIST', variables].filter((key) => typeof key !== 'undefined'),
  RETRIEVE: (variables?: Parameter<typeof todoApi.todoRetrieve>) =>
    ['TODO_RETRIEVE', variables].filter((key) => typeof key !== 'undefined'),
}

/**
 * No description
 *
 * @tags todos
 * @name TodosList
 * @summary Todos 목록 조회
 * @request GET:/todos
 * @secure */

export function useTodoListQuery(
  params?: UseQueryParams<typeof todoApi.todoList>,
) {
  const queryKey = QUERY_KEY_TODO_API.LIST(params?.variables)
  return useQuery({
    queryKey,
    queryFn: () => todoApi.todoList(params?.variables),
    ...params?.options,
  })
}

/**
 * No description
 *
 * @tags todos
 * @name TodosRetrieve
 * @summary Todos 상세 조회
 * @request GET:/todos/{id}
 * @secure */

export function useTodoRetrieveQuery(
  params: UseQueryParams<typeof todoApi.todoRetrieve>,
) {
  const queryKey = QUERY_KEY_TODO_API.RETRIEVE(params.variables)
  return useQuery({
    queryKey,
    queryFn: () => todoApi.todoRetrieve(params.variables),
    ...params?.options,
  })
}
