import { Center, Text } from '@chakra-ui/react'

/**
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default function HomePage() {
  return (
    <Center
      h={'100%'}
      color={'text.primary'}
      borderRadius={'8px'}
      flexDir={'column'}
    >
      <Text color="brand.400" textStyle={['pre-heading-01', 'pre-display-05']}>
        toktokhan-dev
      </Text>
      <Text textStyle={['pre-heading-05', 'pre-heading-03']}>
        Next app template
      </Text>
    </Center>
  )
}
