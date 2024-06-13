import { ReactNode } from 'react'

import {
  Box,
  Link as ChakraLink,
  Code,
  Flex,
  LinkProps,
  Text,
} from '@chakra-ui/react'

export const Section = (props: { title: string; contents: ReactNode }) => {
  return (
    <Box mt="24px">
      <Text textStyle="pre-heading-02">{props.title}</Text>
      <Box mt="12px">{props.contents}</Box>
    </Box>
  )
}

export const Link = (props: LinkProps) => {
  return <ChakraLink textDecor="underline" {...props} />
}

export const LinkTags = (props: { data: { text: string; href: string }[] }) => {
  return (
    <Flex wrap="wrap" gap="8px" mt="20px">
      {props.data.map((item, idx) => (
        <Code key={idx}>
          <Link target="_blank" href={item.href}>
            <Text>{item.text}</Text>
          </Link>
        </Code>
      ))}
    </Flex>
  )
}
