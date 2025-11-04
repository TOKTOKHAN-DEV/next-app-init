import { defineRecipe } from '@chakra-ui/react'
// theme/utils/makeCompoundVariants.ts
import { RecipeCompoundVariant } from '@chakra-ui/react'

type ColorPalette = 'primary' | 'grey' | 'red'
type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'unstyled'

const makeCompoundVariants = (
  colorPalettes: ColorPalette[],
  variants: ButtonVariant[],
): RecipeCompoundVariant<{
  variant: ButtonVariant
  colorPalette: ColorPalette
}>[] => {
  return colorPalettes
    .flatMap((scheme) =>
      variants.map((variant) => {
        if (variant === 'solid') {
          if (scheme === 'red') {
            return {
              variant,
              colorPalette: scheme,
              css: {
                bg: `accent.${scheme}.2`,
                color: 'white',
                _hover: {
                  bg: `accent.${scheme}.3`,
                },
              },
            }
          }

          if (scheme === 'grey') {
            return {
              variant,
              colorPalette: scheme,
              css: {
                bg: `${scheme}.2`,
                color: 'grey.8',
                _hover: {
                  bg: `${scheme}.3`,
                },
                _active: {
                  bg: `${scheme}.3`,
                },
                _disabled: {
                  opacity: '0.4',
                },
              },
            }
          }

          return {
            variant,
            colorPalette: scheme,
            css: {
              bg: `${scheme}.4`,
              color: 'white',
              _hover: {
                bg: `${scheme}.5`,
              },
              _active: {
                bg: `${scheme}.4`,
              },
              _disabled: {
                opacity: '0.4',
              },
            },
          }
        }

        if (variant === 'outline') {
          if (scheme === 'red') {
            return {
              variant,
              colorPalette: scheme,
              css: {
                bg: 'transparent',
                color: `accent.${scheme}.2`,
                borderColor: `accent.${scheme}.2`,
                _hover: {
                  color: `accent.${scheme}.3`,
                  borderColor: `accent.${scheme}.3`,
                },
              },
            }
          }

          if (scheme === 'grey') {
            return {
              variant,
              colorPalette: scheme,
              css: {
                bg: 'white',
                color: `${scheme}.8`,
                borderColor: `${scheme}.2`,
                _hover: {
                  backgroundColor: `${scheme}.1`,
                },
                _disabled: {
                  opacity: '0.4',
                },
              },
            }
          }

          return {
            variant,
            colorPalette: scheme,
            css: {
              bg: 'transparent',
              color: `${scheme}.4`,
              borderColor: `${scheme}.4`,
              _hover: {
                color: `${scheme}.5`,
                borderColor: `${scheme}.5`,
              },
            },
          }
        }

        if (variant === 'ghost') {
          if (scheme === 'red') {
            return {
              variant,
              colorPalette: scheme,
              css: {
                bg: 'transparent',
                color: `accent.${scheme}.2`,
                _hover: {
                  bg: '#1b1c1d0d',
                },
              },
            }
          }

          if (scheme === 'grey') {
            return {
              variant,
              colorPalette: scheme,
              css: {
                bg: 'transparent',
                color: `grey.8`,
                _hover: {
                  bg: '#1b1c1d0d',
                },
              },
            }
          }

          return {
            variant,
            colorPalette: scheme,
            css: {
              bg: 'transparent',
              color: `${scheme}.4`,
              _hover: {
                bg: '#1b1c1d0d',
              },
              _disabled: {
                opacity: '0.4',
              },
            },
          }
        }

        if (variant === 'unstyled') {
          return {
            variant,
            colorPalette: scheme,
            css: {
              justifyContent: 'initial',
            },
          }
        }

        return {
          variant,
          colorPalette: scheme,
          css: {
            bg: 'transparent',
          },
        }
      }),
    )
    .filter(Boolean)
}

export const buttonRecipe = defineRecipe({
  className: 'chakra-button',
  base: {
    display: 'inline-flex',
    appearance: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 'l2',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    borderWidth: '1px',
    borderColor: 'transparent',
    cursor: 'button',
    flexShrink: '0',
    outline: '0',
    isolation: 'isolate',
    transitionProperty: 'common',
    transitionDuration: 'moderate',
    focusVisibleRing: 'outside',
    _disabled: {
      layerStyle: 'disabled',
      opacity: '0.4',
    },
    _icon: {
      flexShrink: '0',
    },
  },
  variants: {
    size: {
      sm: {
        minW: '32px',
        minH: '32px',
        px: '12px',
        textStyle: 'pre-caption-1',
        columnGap: '4px',
        borderRadius: '6px',
        _icon: {
          width: '18px',
          height: '18px',
        },
      },
      md: {
        minW: '40px',
        minH: '40px',
        px: '16px',
        textStyle: 'pre-body-7',
        columnGap: '6px',
        borderRadius: '8px',
        _icon: {
          width: '24px',
          height: '24px',
        },
      },
      lg: {
        minW: '48px',
        minH: '48px',
        px: '24px',
        textStyle: 'pre-body-4',
        columnGap: '8px',
        borderRadius: '10px',
        _icon: {
          width: '24px',
          height: '24px',
        },
      },
    },
    fullWidth: {
      true: {
        w: '100%',
      },
    },
    colorPalette: {
      primary: {},
      grey: {},
      red: {},
    },
    variant: {
      solid: {},
      outline: {},
      ghost: {},
      unstyled: {},
    },
  },
  compoundVariants: makeCompoundVariants(
    ['primary', 'grey', 'red'],
    ['solid', 'outline', 'ghost', 'unstyled'],
  ),
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    colorPalette: 'primary',
  },
})
