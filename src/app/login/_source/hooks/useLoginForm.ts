import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

export type LoginFormDataType = {
  id: string
  password: string
}

export const loginFormSchema = yup.object().shape({
  id: yup
    .string()
    .required('필수 항목을 입력해 주세요')
    .email('올바른 이메일 양식을 입력해 주세요'),
  password: yup.string().required('필수 항목을 입력해 주세요'),
})

const useLoginForm = (options?: UseFormProps<LoginFormDataType>) => {
  return useForm<LoginFormDataType>({
    resolver: yupResolver(loginFormSchema),
    mode: 'onChange',
    ...options,
  })
}

export default useLoginForm
