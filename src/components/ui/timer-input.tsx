'use client'

import { useEffect } from 'react'

import { Input, InputProps, Text } from '@chakra-ui/react'

import { useTimer } from '@/hooks/useTimer'

import { InputGroup } from './input-group'

interface Props extends InputProps {
  onTimerEnd: () => void
  hiddenTimer?: boolean
}

export const TimerInput = ({ onTimerEnd, hiddenTimer, ...props }: Props) => {
  const { minutes, seconds, clearTimer } = useTimer({
    initialMinutes: 3,
    initialSeconds: 0,
    onTimerEnd,
  })

  useEffect(() => {
    if (hiddenTimer) {
      clearTimer()
    }
  }, [hiddenTimer])

  return (
    <InputGroup
      clearable={false}
      endOffset={'-10px'}
      endElement={
        !hiddenTimer ?
          <Text textStyle={'ko-body-6'} color={'grey.5'}>
            {minutes}:{seconds < 10 ? '0' : ''}
            {seconds}
          </Text>
        : null
      }
      w={'100%'}
    >
      <Input {...props} />
    </InputGroup>
  )
}
