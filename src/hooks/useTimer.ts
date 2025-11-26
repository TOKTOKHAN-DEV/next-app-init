import { useEffect, useRef, useState } from 'react'

export const useTimer = ({
  initialMinutes,
  initialSeconds,
  onTimerEnd,
}: {
  initialMinutes: number
  initialSeconds: number
  onTimerEnd: () => void
}) => {
  const [minutes, setMinutes] = useState(initialMinutes)
  const [seconds, setSeconds] = useState(initialSeconds)

  const interval = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    interval.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1)
      } else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1)
          setSeconds(59)
        }
      }
    }, 1000)

    if (seconds === 0 && minutes === 0) {
      clearInterval(interval.current)
      onTimerEnd()
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
  }, [minutes, seconds])

  return {
    restartTimer: () => {
      setMinutes(initialMinutes)
      setSeconds(initialSeconds)
    },
    clearTimer: () => {
      if (interval.current) {
        clearInterval(interval.current)
      }
    },
    minutes,
    seconds,
  }
}
