import { useQuery } from '@tanstack/react-query'
import { Parameter } from '@toktokhan-dev/universal'

import { UseQueryParams } from '@/types/module/react-query/use-query-params'

import { photoApi } from './PhotoApi'

/**
 * QUERY_KEYS
 */
export const QUERY_KEY_PHOTO_API = {
  LIST: (variables?: Parameter<typeof photoApi.photoList>) =>
    ['PHOTO_LIST', variables].filter((key) => typeof key !== 'undefined'),
  RETRIEVE: (variables?: Parameter<typeof photoApi.photoRetrieve>) =>
    ['PHOTO_RETRIEVE', variables].filter((key) => typeof key !== 'undefined'),
}

/**
 * No description
 *
 * @tags photos
 * @name PhotosList
 * @summary photo 목록 조회
 * @request GET:/photos
 * @secure */

export function usePhotoListQuery(
  params?: UseQueryParams<typeof photoApi.photoList>,
) {
  const queryKey = QUERY_KEY_PHOTO_API.LIST(params?.variables)
  return useQuery({
    queryKey,
    queryFn: () => photoApi.photoList(params?.variables).then((res) => res),
    ...params?.options,
  })
}

/**
 * No description
 *
 * @tags photos
 * @name PhotoRetrieve
 * @summary photo 상세 조회
 * @request GET:/photos/{id}
 * @secure */

export function useTodosRetrieveQuery(
  params: UseQueryParams<typeof photoApi.photoRetrieve>,
) {
  const queryKey = QUERY_KEY_PHOTO_API.RETRIEVE(params.variables)
  return useQuery({
    queryKey,
    queryFn: () => photoApi.photoRetrieve(params.variables),
    ...params?.options,
  })
}
