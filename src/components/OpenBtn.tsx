'use client'

import { ReactElement, cloneElement } from 'react'

import { useDisclosure } from '@chakra-ui/react'

interface OpenBtnProps {
  button: ReactElement
  target: ReactElement
}

export const OpenBtn = ({ button, target }: OpenBtnProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      {cloneElement(button, {
        onClick: onOpen,
      })}
      {cloneElement(target, {
        isOpen,
        onClose,
      })}
    </>
  )
}
