import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const Container = defineStyleConfig({
  baseStyle: defineStyle({
    w: '100%',
    mx: 'auto',
    maxW: {
      base: '100%',
      sm: '780px',
      md: '980px',
      lg: '1280px',
      xl: '1480px',
      '2xl': '1780px',
    },
    px: '0',
  }),
})

export default Container
