import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface UseYupFormProps<T extends yup.AnyObjectSchema> {
  schema: T
  options?: UseFormProps<yup.InferType<T>>
}

export const useYupForm = <T extends yup.AnyObjectSchema>({
  schema,
  options,
}: UseYupFormProps<T>) => {
  return useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    ...options,
  })
}
