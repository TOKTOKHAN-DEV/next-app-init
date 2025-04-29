import { Center, Text } from '@chakra-ui/react'

/**
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default function HomePage() {
  return (
    <Center h={'100%'} borderRadius={'8px'} flexDir={'column'}>
      <Text color={'primary.3'} textStyle={'pre-heading-01'}>
        TOKTOKHAN.DEV
      </Text>
      <Text color={'content.1'} textStyle={'pre-heading-02'}>
        Next App Template
      </Text>
    </Center>
  )
}
