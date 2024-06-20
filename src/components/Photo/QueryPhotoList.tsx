// @delete:file
// @delete:folder
'use client'

import { Flex, Text } from '@chakra-ui/react'

import { usePhotoListQuery } from '@/apis/photo/PhotoApi.query'

import ImageAsNext from '../ImageAsNext'

// @delete:file
// @delete:folder

const QueryPhotoList = () => {
  const { data: photoList } = usePhotoListQuery({
    options: {
      staleTime: 1000 * 5,
    },
  })

  return (
    <Flex flexDir="column" gap="5px">
      {photoList?.map(({ id, albumId, title, url }) => (
        <Flex
          key={id}
          flexDir="row"
          h="100px"
          border="1px solid gray"
          borderRadius="4px"
          justifyContent="space-between"
          p="20px"
        >
          <Flex flexDir="column" justifyContent="space-between">
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

export default QueryPhotoList
