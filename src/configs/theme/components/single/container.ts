import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
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
})

const variants = defineStyle({
  basis: {
    p: {
      base: '0px 16px 0px',
      md: '0px',
    },
  },
  template: {
    w: '100%',
    minW: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDir: 'column',
    px: '16px',
  },
})

const Container = defineStyleConfig({
  baseStyle,
  variants,
})

export default Container
