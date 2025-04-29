'use client'

import { ReactElement, cloneElement } from 'react'

import { useDisclosure } from '@chakra-ui/react'

interface OpenBtnProps {
  button: ReactElement<{ onClick?: () => void }>
  target: ReactElement<{ open: boolean; onClose: () => void }>
}

export const OpenBtn = ({ button, target }: OpenBtnProps) => {
  const { open, onOpen, onClose } = useDisclosure()

  return (
    <>
      {cloneElement(button, { onClick: onOpen })}
      {cloneElement(target, { open, onClose })}
    </>
  )
}
