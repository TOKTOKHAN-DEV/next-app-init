'use client'

import { ReactElement, ReactNode, useCallback, useState } from 'react'

export interface StepProps {
  name: string
  children: ReactNode
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>
}

export const useStepForm = <T extends string>(defaultStep: T) => {
  const [currentStep, setCurrentStep] = useState<T[number]>(defaultStep)

  const Step = useCallback(({ children }: StepProps): ReactElement => {
    return <>{children}</>
  }, [])

  const Funnel = useCallback(
    ({ children }: FunnelProps) => {
      const targetStep = children.find(
        (childStep) => childStep.props.name === currentStep,
      )

      if (!targetStep) {
        return null
      }

      return targetStep
    },
    [currentStep],
  )

  return {
    Funnel,
    Step,
    setCurrentStep,
    currentStep,
  }
}
