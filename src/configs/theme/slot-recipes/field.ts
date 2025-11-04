import { defineSlotRecipe } from '@chakra-ui/react'

export const fieldSlotRecipe = defineSlotRecipe({
  className: 'chakra-field',
  slots: [
    'root',
    'errorText',
    'helperText',
    'input',
    'label',
    'select',
    'textarea',
    'requiredIndicator',
    'requiredIndicator',
  ],
  base: {
    requiredIndicator: {
      color: 'primary.4',
      lineHeight: '1',
    },
    root: {
      display: 'flex',
      width: 'full',
      position: 'relative',
      gap: '4px',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'start',
      textStyle: 'pre-body-7',
      color: 'grey.7',
      userSelect: 'none',
      _disabled: {
        opacity: '0.5',
      },
    },
    errorText: {
      color: 'accent.red2',
      textStyle: 'pre-caption-2',
    },
    helperText: {
      color: 'grey.6',
      textStyle: 'pre-caption-2',
    },
  },
  variants: {
    orientation: {
      vertical: {
        root: {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
      },
      horizontal: {
        root: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        label: {
          flex: '0 0 var(--field-label-width, 80px)',
        },
      },
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})
