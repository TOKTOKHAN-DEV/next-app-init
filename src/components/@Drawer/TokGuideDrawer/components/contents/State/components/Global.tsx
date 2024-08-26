import { Button } from '@chakra-ui/react'

import { useGlobalStore } from '@/stores/global/store'

import CountBox from './@Layout/CountBox'
import Section from './@Layout/Section'

const Global = () => {
  const count = useGlobalStore((store) => store.count)
  const updateCount = useGlobalStore((store) => store.updateCount)

  const nestedCount = useGlobalStore((store) => store.nested.count)
  const set = useGlobalStore((store) => store.set)
  const reset = useGlobalStore((store) => store.reset)

  return (
    <>
      <Section title={'Count: {count: number}'}>
        <CountBox
          count={count}
          onReset={() => reset('count')}
          onDecrease={() => set('count', (prev) => prev - 1)}
          onIncrease={() => set('count', (prev) => prev + 1)}
          extra={
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() => updateCount(2)}
            >
              Click to update count (by updater fn)
            </Button>
          }
        />
      </Section>
      <Section title={'Nested Count: {nested: {count:number}'}>
        <CountBox
          count={nestedCount}
          onReset={() => reset('nested.count')}
          onDecrease={() => set('nested.count', (prev) => prev - 1)}
          onIncrease={() => set('nested.count', (prev) => prev + 1)}
        />
      </Section>
    </>
  )
}

export default Global
