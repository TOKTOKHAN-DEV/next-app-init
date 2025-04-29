import React from 'react'

import { VStack } from '@chakra-ui/react'

import { Sections } from './components/@layout/sections'
import { Global } from './components/global'
import { Local } from './components/local'
import { Storage } from './components/storage'

export const State = () => {
  return (
    <VStack w={'100%'} gap={'20px'}>
      <Sections title={'Global State'}>
        <Global />
      </Sections>
      <Sections title={'Local State'}>
        <Local />
      </Sections>
      <Sections title={'Storage State'}>
        <Storage />
      </Sections>
    </VStack>
  )
}
