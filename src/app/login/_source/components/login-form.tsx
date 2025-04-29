'use client'

import { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'

import { Box, BoxProps, Button, Input } from '@chakra-ui/react'

import { FormHelper } from '@/components/form-helper'

import { useLoginForm } from '../hooks/useLoginForm'

interface LoginFormProps extends BoxProps {}

export const LoginForm = ({ ...basisProps }: LoginFormProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl') as Route

  const {
    handleSubmit,
    setError,
    register,
    formState: { errors, isValid, isDirty },
  } = useLoginForm()

  const setLoginError = () => {
    setError('id', {
      message: ' ',
    })
    setError('password', {
      message: ' ',
    })
  }

  const onSubmit = handleSubmit((data) => {})

  return (
    <Box as="form" {...basisProps}>
      <FormHelper
        mb="24px"
        label="회원 아이디"
        message={{
          error: errors.id?.message,
        }}
        required
      >
        <Input
          {...register('id')}
          autoComplete="off"
          placeholder="이메일 주소"
        />
      </FormHelper>
      <FormHelper
        label="비밀번호"
        message={{
          error: errors.password?.message,
        }}
        required
      >
        <Input
          {...register('password')}
          type="password"
          autoComplete="off"
          placeholder="비밀번호"
        />
      </FormHelper>
      <Button
        border="1px solid black"
        type="submit"
        w="100%"
        mt="40px"
        variant="solid"
        onClick={onSubmit}
        // loading={} 로딩 처리
        disabled={!isDirty || !isValid}
      >
        로그인
      </Button>
    </Box>
  )
}
