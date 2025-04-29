import { defineRecipe } from '@chakra-ui/react'

export const containerRecipe = defineRecipe({
  className: 'chakra-container',
  base: {
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
  },
  variants: {
    basis: {
      true: {
        p: {
          base: '0px 16px 0px',
          md: '0px',
        },
      },
    },
    template: {
      true: {
        w: '100%',
        minW: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDir: 'column',
        px: '16px',
      },
    },
    centerContent: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    fluid: {
      true: {
        maxWidth: 'full',
      },
    },
  },
})
