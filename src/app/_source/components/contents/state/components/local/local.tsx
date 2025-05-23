import { CountBox } from '../@layout/count-box'
import { Section } from '../@layout/section'
import { useCountContext, withCountProvider } from './contexts/count'

export const Local = withCountProvider(() => {
  const count = useCountContext((store) => store.count)
  const set = useCountContext((store) => store.set)
  const reset = useCountContext((store) => store.reset)

  return (
    <Section title={'Count Provider'}>
      <CountBox
        count={count}
        onReset={() => reset('count')}
        onDecrease={() => set('count', (prev) => prev - 1)}
        onIncrease={() => set('count', (prev) => prev + 1)}
      />
    </Section>
  )
})
