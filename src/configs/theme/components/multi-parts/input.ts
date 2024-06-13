import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

export const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const Input = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    field: {},
  }),
  sizes: {
    lg: definePartsStyle({
      field: {},
    }),
    md: definePartsStyle({
      field: {},
    }),
    sm: definePartsStyle({
      field: {},
    }),
    xs: definePartsStyle({
      field: {},
    }),
  },
  variants: {
    outline: definePartsStyle({}),
    filled: definePartsStyle({}),
    flushed: definePartsStyle({}),
    unstyled: definePartsStyle({}),
  },
  defaultProps: {},
})

export default Input
