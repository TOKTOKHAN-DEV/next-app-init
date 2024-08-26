import { ChakraProps } from '@chakra-ui/react'

export type HomeHeaderVariantType = 'dark' | 'light' | 'transparent'
export const HOME_HEADER_VARIANTS: Record<
  HomeHeaderVariantType,
  {
    header: ChakraProps
    drawer: ChakraProps
    pointColor: ChakraProps['color']
    subColor: ChakraProps['color']
  }
> = {
  dark: {
    header: { bg: 'background.basic.1' },
    drawer: { bg: 'background.basic.1' },
    pointColor: 'content.1',
    subColor: 'brand.secondary.500',
  },
  light: {
    header: { bg: 'background.basic.1' },
    drawer: { bg: 'background.basic.1' },
    pointColor: 'content.1',
    subColor: 'brand.secondary.500',
  },
  transparent: {
    header: { bg: 'transparent' },
    drawer: { bg: 'background.basic.1' },
    pointColor: 'content.1',
    subColor: 'brand.secondary.500',
  },
}
