'use client'

import { use } from 'react'

import { Flex, Text } from '@chakra-ui/react'

import { PhotoType } from '@/apis/photo/types/model/photo'

import ImageAsNext from '../ImageAsNext'

interface FetchPhotoListProps {
  photosPromise: Promise<PhotoType[]>
}
const FetchPhotoList = ({ photosPromise }: FetchPhotoListProps) => {
  const photos = use(photosPromise)

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
          <ImageAsNext
            src={url}
            alt="image"
            h="60px"
            w="60px"
            sizes="60px"
            isDisabledSkeleton
          />
        </Flex>
      ))}
    </Flex>
  )
}

export default FetchPhotoList
