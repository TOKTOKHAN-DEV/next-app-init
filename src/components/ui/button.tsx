import * as React from 'react'

import { AbsoluteCenter } from '@chakra-ui/react/absolute-center'
import {
  Button as ChakraButton,
  type ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react/button'
import { Span } from '@chakra-ui/react/span'
import { Spinner } from '@chakra-ui/react/spinner'

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props
    return (
      <ChakraButton disabled={loading || disabled} ref={ref} {...rest}>
        {loading && !loadingText ?
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        : loading && loadingText ?
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        : children}
      </ChakraButton>
    )
  },
)
