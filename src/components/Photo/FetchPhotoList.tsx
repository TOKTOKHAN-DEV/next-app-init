'use server'

import Image from 'next/image'

import { Flex, Text } from '@chakra-ui/react'

import { PhotoType } from '@/apis/photo/types/model/photo'

interface FetchPhotoListProps {
  photos: PhotoType[]
}
/**
 * @description
 * Restricted Items in Server Component
 *
 * - Event listeners
 * - State and Lifecycle Effects
 * - Use of browser-only APIs
 * - Custom hooks that depend on state, effects, or browser-only APIs
 * - React Class components
 */
export default async function FetchPhotoList({ photos }: FetchPhotoListProps) {
  return (
    <Flex flexDir="column" gap="5px">
      {photos?.map(({ id, albumId, title, url }) => (
        <Flex
          key={id}
          flexDir="row"
          h="100px"
          border="1px solid gray"
          borderRadius="4px"
          justifyContent="space-between"
          p="20px"
        >
          <Flex flexDir="column" justifyContent="space-between" h="100%">
            <Text>albumId: {albumId}</Text>
            <Text>title: {title}</Text>
          </Flex>
          <Image src={url} alt="image" width={60} height={60} sizes="60px" />
        </Flex>
      ))}
    </Flex>
  )
}
