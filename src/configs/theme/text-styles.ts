import { defineTextStyles } from '@chakra-ui/react'

import { textStyles as generated } from '@/generated/tokens/text-styles'

export const textStyles = defineTextStyles({
  ...generated,
})
