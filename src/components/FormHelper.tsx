import { ReactNode } from 'react'

import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  TextProps,
} from '@chakra-ui/react'

interface FormHelperProps extends FormControlProps {
  label?: string
  children: ReactNode | ReactNode[]

  message?: {
    help?: string
    error?: string
    success?: string
  }

  styles?: {
    label?: FormLabelProps
    help?: TextProps
    error?: FormErrorMessageProps
    success?: TextProps
  }
}

/**
 * Chakra 의 FormControl 을 Wrapping 하여 Label, Error Text, Success Text 등을 추가로 넘겨 줄수 있는 컴포넌트입니다.
 *
 * Chakra FormControl 은
 * Chakra 의 Form Element 를 children 으로 받아, isInvalid, isDisabled, isRequired 와 같은 상태를
 * 자식 Chakra Form Component 에게 Context 로 전달해줍니다.
 *
 * @see https://chakra-ui.com/docs/components/form/form-control
 * */
const FormHelper = ({
  //
  children,
  label,

  message,
  styles,

  ...basisProps
}: FormHelperProps) => {
  const isShowErrorText = !!message?.error
  const isShowSuccessText = !!message?.success && !isShowErrorText
  const isShowHelperText =
    !!message?.help && !isShowErrorText && !isShowSuccessText

  return (
    <FormControl isInvalid={isShowErrorText} {...basisProps}>
      {!!label && (
        <FormLabel
          textStyle="pre-body-05"
          color="content.3"
          fontWeight={600}
          mb="8px"
          {...styles?.label}
        >
          {label}
        </FormLabel>
      )}
      {children}
      {isShowErrorText && (
        <FormErrorMessage
          textStyle="pre-cation-02"
          color="accent.red.2"
          mt="8px"
          {...styles?.error}
        >
          {message?.error}
        </FormErrorMessage>
      )}
      {isShowSuccessText && (
        <FormHelperText
          textStyle="pre-cation-02"
          color="accent.green.2"
          mt="8px"
          {...styles?.success}
        >
          {message?.success}
        </FormHelperText>
      )}
      {isShowHelperText && (
        <FormHelperText
          textStyle="pre-cation-02"
          color="content.4"
          mt="8px"
          {...styles?.help}
        >
          {message?.help}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default FormHelper
