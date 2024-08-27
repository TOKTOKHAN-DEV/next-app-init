import React from 'react'

import { VStack } from '@chakra-ui/react'

import Sections from './components/@Layout/Sections'
import Global from './components/Global'
import { Local } from './components/Local'
import Storage from './components/Storage'

export const State = () => {
  return (
    <VStack w={'100%'} spacing={'20px'}>
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
