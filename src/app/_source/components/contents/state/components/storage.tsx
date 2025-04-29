import { useLocalStorage } from '@/stores/local/store'

import { CountBox } from './@layout/count-box'
import { Section } from './@layout/section'

export const Storage = () => {
  const count = useLocalStorage((store) => store.count)
  const set = useLocalStorage((store) => store.set)
  const reset = useLocalStorage((store) => store.reset)

  return (
    <Section title={'Local Storage'}>
      <CountBox
        count={count}
        onReset={() => reset('count')}
        onDecrease={() => set('count', (prev) => prev - 1)}
        onIncrease={() => set('count', (prev) => prev + 1)}
      />
    </Section>
  )
}
