import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { clientCookie, useClientCookie } from '@/stores/cookie/store'

import CountBox from './@Layout/CountBox'
import Section from './@Layout/Section'

const Cookie = () => {
  const [count, setCount] = useClientCookie(COOKIE_KEYS.COUNT)

  return (
    <Section title={'Cookie'}>
      <CountBox
        count={count}
        onReset={() => setCount('0')}
        onDecrease={() => setCount(`${Number(count) - 1}`)}
        onIncrease={() =>
          clientCookie.set(COOKIE_KEYS.COUNT, `${Number(count) + 1}`)
        }
      />
    </Section>
  )
}

export default Cookie
