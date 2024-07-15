import { useMutation } from '@tanstack/react-query'
import { Parameter, isNotNullish } from '@toktokhan-dev/universal'

import { UseMutationParams } from '@/types/module/react-query/use-mutation-params'

import exampleApi from './ExampleApi'

export const EXAMPLE_API_MUTATION_KEY = {
  CREATE: (params?: Parameter<typeof exampleApi.create>) =>
    ['example-create', params].filter(isNotNullish),
  UPDATE: (params?: Parameter<typeof exampleApi.update>) =>
    ['example-update', params].filter(isNotNullish),
  DELETE: (id?: Parameter<typeof exampleApi.delete>) =>
    ['example-delete', id].filter(isNotNullish),
}

export const useCreateExampleMutation = (
  params?: UseMutationParams<typeof exampleApi.create>,
) => {
  return useMutation({ mutationFn: exampleApi.create, ...params?.options })
}

export const useUpdateExampleMutation = (
  params?: UseMutationParams<typeof exampleApi.update>,
) => {
  return useMutation({ mutationFn: exampleApi.update, ...params?.options })
}

export const useDeleteExampleMutation = (
  params?: UseMutationParams<typeof exampleApi.delete>,
) => {
  return useMutation({ mutationFn: exampleApi.delete, ...params?.options })
}
