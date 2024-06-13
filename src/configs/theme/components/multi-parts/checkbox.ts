import { checkboxAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const Checkbox = defineMultiStyleConfig({
  baseStyle: definePartsStyle({}),
  sizes: {
    lg: definePartsStyle({}),
    md: definePartsStyle({}),
    sm: definePartsStyle({}),
    xs: definePartsStyle({}),
  },
  defaultProps: {},
})
export default Checkbox
