import { Field as ChakraField, Text, TextProps } from '@chakra-ui/react'

interface FormHelperProps extends Omit<ChakraField.RootProps, 'label'> {
  label?: React.ReactNode
  children: React.ReactNode | React.ReactNode[]

  message?: {
    help?: string
    error?: string
    success?: string
  }

  styles?: {
    label?: TextProps
    help?: TextProps
    error?: TextProps
    success?: TextProps
  }
}

/**
 * Chakra 의 Field를 Wrapping 하여 Label, Error Text, Success Text 등을 추가로 넘겨 줄수 있는 컴포넌트입니다.
 *
 * Chakra Field를
 * Chakra 의 Form Element 를 children 으로 받아, isInvalid, isDisabled, isRequired 와 같은 상태를
 * 자식 Chakra Form Component 에게 Context 로 전달해줍니다.
 *
 * @see https://chakra-ui.com/docs/components/field
 * */
export const FormHelper = ({
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
    <ChakraField.Root invalid={isShowErrorText} {...basisProps}>
      {!!label && (
        <ChakraField.Label>
          {label} {!!basisProps.required && <ChakraField.RequiredIndicator />}
        </ChakraField.Label>
      )}
      {children}
      {isShowErrorText && (
        <ChakraField.ErrorText {...styles?.error}>
          {message?.error}
        </ChakraField.ErrorText>
      )}
      {isShowSuccessText && (
        <ChakraField.HelperText {...styles?.success}>
          {message?.success}
        </ChakraField.HelperText>
      )}
      {isShowHelperText && (
        <ChakraField.HelperText {...styles?.help}>
          {message?.help}
        </ChakraField.HelperText>
      )}
    </ChakraField.Root>
  )
}
