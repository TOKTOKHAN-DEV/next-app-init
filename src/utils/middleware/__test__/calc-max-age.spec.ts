import { calcMaxAge } from '../calc-max-age'

describe('calcMaxAge', () => {
  it('should return -1 when exp is undefined', () => {
    expect(calcMaxAge()).toBe(-1)
  })

  it('should return the difference between exp and current time when exp is a future timestamp', () => {
    const currentTime = Math.floor(Date.now() / 1000)
    const futureTime = currentTime + 1000
    expect(calcMaxAge(futureTime)).toBe(1000)
  })

  it('should return a negative value when exp is a past timestamp', () => {
    const currentTime = Math.floor(Date.now() / 1000)
    const pastTime = currentTime - 1000
    expect(calcMaxAge(pastTime)).toBe(-1000)
  })
})
