import { useCallback, useRef, useState } from 'react'

import type { UseMutationResult } from '@tanstack/react-query'

// 기본 타입 정의 (fallback용)
export interface DefaultSendRequest {
  email: string
  [key: string]: any
}

export interface DefaultSendResponse {
  codeToken?: string
  code?: string
  [key: string]: any
}

export interface DefaultVerifyRequest {
  code: string
  codeToken?: string
  [key: string]: any
}

export interface DefaultVerifyResponse {
  success?: boolean
  [key: string]: any
}

export interface UseVerifyEmailOptions<
  TSendRequest = DefaultSendRequest,
  TSendResponse = DefaultSendResponse,
  TVerifyRequest = DefaultVerifyRequest,
  TVerifyResponse = DefaultVerifyResponse,
  TSendError = unknown,
  TVerifyError = unknown,
> {
  /**
   * 이메일 값을 가져오는 함수
   */
  getEmailValue: () => string

  /**
   * 인증번호 값을 가져오는 함수
   */
  getVerificationCodeValue: () => string

  /**
   * 전송 API용 mutation hook (외부에서 주입)
   */
  useSendMutation: () => UseMutationResult<
    TSendResponse,
    TSendError,
    TSendRequest
  >

  /**
   * 검증 API용 mutation hook (외부에서 주입)
   */
  useVerifyMutation: () => UseMutationResult<
    TVerifyResponse,
    TVerifyError,
    TVerifyRequest
  >

  /**
   * 전송 요청 데이터 생성 함수
   */
  createSendRequest: (email: string) => TSendRequest

  /**
   * 검증 요청 데이터 생성 함수
   */
  createVerifyRequest: (
    code: string,
    sendResponse?: TSendResponse,
  ) => TVerifyRequest

  /**
   * 인증번호 전송 성공 시 실행될 콜백 (API response 포함)
   */
  onSendSuccess?: (response: TSendResponse) => void

  /**
   * 인증번호 검증 성공 시 실행될 콜백 (API response 포함)
   */
  onVerifySuccess?: (response: TVerifyResponse) => void

  /**
   * 인증번호 전송 실패 시 실행될 콜백
   */
  onSendError?: (error: TSendError) => void

  /**
   * 인증번호 검증 실패 시 실행될 콜백
   */
  onVerifyError?: (error: TVerifyError) => void

  /**
   * 타이머 설정 (초 단위, 기본값: 180초)
   */
  timerDuration?: number

  /**
   * 커스텀 메시지 설정
   */
  messages?: {
    sendSuccess?: string
    verifySuccess?: string
    sendError?: string
    verifyError?: string
    timerExpired?: string
  }
}

export const useVerifyEmail = <
  TSendRequest = DefaultSendRequest,
  TSendResponse = DefaultSendResponse,
  TVerifyRequest = DefaultVerifyRequest,
  TVerifyResponse = DefaultVerifyResponse,
  TSendError = unknown,
  TVerifyError = unknown,
>(
  options: UseVerifyEmailOptions<
    TSendRequest,
    TSendResponse,
    TVerifyRequest,
    TVerifyResponse,
    TSendError,
    TVerifyError
  >,
) => {
  const {
    getEmailValue,
    getVerificationCodeValue,
    useSendMutation,
    useVerifyMutation,
    createSendRequest,
    createVerifyRequest,
    onSendSuccess,
    onVerifySuccess,
    onSendError,
    onVerifyError,
  } = options

  // 상태 관리
  const [isSentCode, setIsSentCode] = useState(false)
  const [isVerifiedCode, setIsVerifiedCode] = useState(false)
  const [sendResponse, setSendResponse] = useState<TSendResponse | undefined>(
    undefined,
  )

  // 외부에서 주입받은 mutation hooks 사용
  const sendMutation = useSendMutation()
  const verifyMutation = useVerifyMutation()

  // mutation 성공/실패 처리를 위한 effect 대체 패턴
  const handleSendSuccess = useCallback(
    (response: TSendResponse) => {
      setIsSentCode(true)
      setSendResponse(response)

      // 외부 성공 콜백 실행 (response 전달)
      onSendSuccess?.(response)
    },
    [onSendSuccess],
  )

  const handleSendError = useCallback(
    (error: TSendError) => {
      console.error('Error sending verification code:', error)

      if ((error as Response).status === 409) {
        // 외부 실패 콜백 실행
        onSendError?.(error)
      }
    },
    [onSendError],
  )

  const handleVerifySuccess = useCallback(
    (response: TVerifyResponse) => {
      setIsVerifiedCode(true)

      // 외부 성공 콜백 실행 (response 전달)
      onVerifySuccess?.(response)
    },
    [onVerifySuccess],
  )

  const handleVerifyError = useCallback(
    (error: TVerifyError) => {
      console.error('Error verifying email:', error)

      // 외부 실패 콜백 실행
      onVerifyError?.(error)
    },
    [onVerifyError],
  )
  /**
   * 이메일 인증번호 전송
   */
  const handleSendEmailVerificationCode = useCallback(async () => {
    const email = getEmailValue()

    if (!email) {
      return
    }

    try {
      const requestData = createSendRequest(email)
      const response = await sendMutation.mutateAsync(requestData)
      handleSendSuccess(response)
    } catch (error) {
      handleSendError(error as TSendError)
    }
  }, [
    getEmailValue,
    createSendRequest,
    sendMutation,
    handleSendSuccess,
    handleSendError,
  ])

  /**
   * 이메일 인증번호 검증
   */
  const handleVerifyEmailVerificationCode = useCallback(async () => {
    const code = getVerificationCodeValue()

    if (!code) {
      return
    }

    try {
      const requestData = createVerifyRequest(code, sendResponse)
      const response = await verifyMutation.mutateAsync(requestData)

      handleVerifySuccess(response)
    } catch (error) {
      handleVerifyError(error as TVerifyError)
    }
  }, [
    getVerificationCodeValue,
    createVerifyRequest,
    sendResponse,
    verifyMutation,
    handleVerifySuccess,
    handleVerifyError,
  ])

  /**
   * 초기화 함수 (재사용 시 상태 초기화)
   */
  const reset = useCallback(() => {
    setIsSentCode(false)
    setIsVerifiedCode(false)
    setSendResponse(undefined)
    sendMutation.reset()
    verifyMutation.reset()
  }, [sendMutation, verifyMutation])

  return {
    // 핸들러 함수들
    handleSendEmailVerificationCode,
    handleVerifyEmailVerificationCode,

    // 상태들 (tanstack-query의 상태 활용)
    isSentCode,
    isVerifiedCode,

    sendMutation,
    verifyMutation,
    isPendingSendCode: sendMutation.isPending,
    isSuccessSendCode: sendMutation.isSuccess,
    isErrorSendCode: sendMutation.isError,
    isPendingVerifyCode: verifyMutation.isPending,
    isSuccessVerifyCode: verifyMutation.isSuccess,
    isErrorVerifyCode: verifyMutation.isError,
    // API 응답 데이터 (타입 안전)
    sendData: sendMutation.data,
    verifyData: verifyMutation.data,
    sendError: sendMutation.error,
    verifyError: verifyMutation.error,
    sendResponse, // 내부에서 관리하는 전송 응답

    // 유틸리티
    reset,

    // 원본 mutation 객체 (고급 사용을 위해)
    mutations: {
      send: sendMutation,
      verify: verifyMutation,
    },
  }
}

export type UseVerifyEmailReturn = ReturnType<typeof useVerifyEmail>
