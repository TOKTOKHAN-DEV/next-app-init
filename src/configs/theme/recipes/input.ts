import { defineRecipe } from '@chakra-ui/react'

export const inputRecipe = defineRecipe({
  className: 'chakra-input',
  base: {
    width: '100%',
    minWidth: '0',
    outline: '0',
    position: 'relative',
    textAlign: 'start',
    _disabled: {
      layerStyle: 'disabled',
    },
    _placeholder: {
      textStyle: 'pre-body-6',
      color: 'grey.5',
    },
    textStyle: 'pre-body-6',
    color: 'grey.8',
    lineHeight: 'normal !important',
  },
  variants: {
    variant: {
      subtle: {
        borderWidth: '1px',
        borderColor: 'transparent',
        bg: 'grey.1',
        _focusVisible: {
          bg: 'primary.1',
          borderColor: 'primary.4',
        },
        _invalid: {
          borderColor: 'accent.red2',
          bg: 'accent.red1',
        },
        _readOnly: {
          bg: 'grey.1',
          pointerEvents: 'none',
        },
        _disabled: {
          bg: 'grey.1',
          _placeholder: {
            color: 'grey.5',
          },
        },
      },
      outline: {
        bg: 'transparent',
        borderWidth: '1px',
        borderColor: 'grey.2',
        _focusVisible: {
          borderColor: 'primary.4',
        },
        _invalid: {
          borderColor: 'accent.red2',
        },
        _readOnly: {
          borderColor: 'grey.1',
        },
        _disabled: {
          borderColor: 'grey.2',
          _placeholder: {
            color: 'grey.5',
          },
        },
      },

      flushed: {
        bg: 'transparent',
        borderBottomWidth: '1px',
        borderBottomColor: 'grey.2',
        borderRadius: '0',
        _focusVisible: {
          borderColor: 'primary.4',
        },
        _invalid: {
          borderColor: 'accent.red2',
        },
        _readOnly: {
          borderColor: 'grey.1',
        },
        _disabled: {
          borderColor: 'grey.2',
          _placeholder: {
            color: 'grey.5',
          },
        },
      },
    },
    size: {
      sm: {
        pl: '8px',
        borderRadius: '6px',
        minH: '32px',
        textStyle: 'pre-caption-2',
        _placeholder: {
          textStyle: 'pre-caption-2',
        },
      },
      md: {
        pl: '10px',
        borderRadius: '8px',
        minH: '40px',
        textStyle: 'pre-body-6',
        _placeholder: {
          textStyle: 'pre-body-6',
        },
      },
      lg: {
        pl: '12px',
        borderRadius: '10px',
        minH: '48px',
        textStyle: 'pre-body-6',
        _placeholder: {
          textStyle: 'pre-body-6',
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: 'flushed',
      size: 'sm',
      css: {
        pl: '0px',
        minH: '32px',
      },
    },
    {
      variant: 'flushed',
      size: 'md',
      css: {
        pl: '0px',
        minH: '40px',
      },
    },
    {
      variant: 'flushed',
      size: 'lg',
      css: {
        pl: '0px',
        minH: '48px',
      },
    },
  ],
  defaultVariants: {
    size: 'lg',
    variant: 'subtle',
  },
})
