'use client'

import * as React from 'react'

import type { BoxProps, InputElementProps } from '@chakra-ui/react'
import {
  Group,
  HStack,
  IconButton,
  InputElement,
  mergeRefs,
} from '@chakra-ui/react'

import { XIcon } from '@/generated/icons/MyIcons'

export interface InputGroupProps extends BoxProps {
  startElementProps?: InputElementProps
  endElementProps?: InputElementProps
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  children: React.ReactElement<InputElementProps>
  startOffset?: InputElementProps['paddingStart']
  endOffset?: InputElementProps['paddingEnd']
  clearable?: boolean
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(props, ref) {
    const {
      startElement,
      startElementProps,
      endElement,
      endElementProps,
      children,
      startOffset = '6px',
      endOffset = '6px',
      clearable = true,
      ...rest
    } = props

    const groupRef = React.useRef<HTMLDivElement>(null)
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    const child =
      React.Children.only<React.ReactElement<InputElementProps>>(children)

    const handleClear = () => {
      const groupElement = groupRef.current
      if (!groupElement) return

      const inputElement = groupElement.querySelector(
        'input',
      ) as HTMLInputElement
      if (inputElement) {
        inputElement.value = ''
        inputElement.focus()
        setHasValue(false)
        const event = new Event('input', { bubbles: true })
        inputElement.dispatchEvent(event)
      }
    }

    return (
      <Group ref={mergeRefs(groupRef, ref)} {...rest}>
        {startElement && (
          <InputElement pointerEvents="none" {...startElementProps}>
            {startElement}
          </InputElement>
        )}
        {React.cloneElement(child, {
          ...children.props,
          onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(true)
            child.props.onFocus?.(e)
          },
          onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false)
            child.props.onBlur?.(e)
          },
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setHasValue(e.target.value.length > 0)
            child.props.onChange?.(e)
          },
          ...(startElement && {
            ps: `calc(var(--input-height) - ${startOffset})`,
          }),
          ...(endElement && {
            pe: `calc(var(--input-height) - ${endOffset} - ${
              clearable ? '-20px' : '0px'
            })`,
          }),
        })}

        <InputElement placement="end" {...endElementProps}>
          <HStack>
            {clearable && hasValue && isFocused && (
              <IconButton
                borderRadius={'full'}
                boxSize={'20px'}
                bg={'grey.3'}
                onMouseDown={(e) => {
                  handleClear()
                }}
                aria-label="Clear input"
              >
                <XIcon boxSize={'12px'} />
              </IconButton>
            )}
            {endElement}
          </HStack>
        </InputElement>
      </Group>
    )
  },
)
