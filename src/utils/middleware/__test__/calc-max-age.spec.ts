import { calcMaxAge } from '../calc-max-age'

// calcMaxAge.spec.ts
describe('calcMaxAge', () => {
  it('should return -1 when exp is undefined', () => {
    const result = calcMaxAge({})
    expect(result).toBe(-1)
  })

  it('should return the correct max age when exp is provided', () => {
    const currentTime = Math.floor(Date.now() / 1000)
    const exp = currentTime + 1000 // exp is 1000 seconds in the future
    const result = calcMaxAge({ exp })
    expect(result).toBe(1000)
  })

  it('should return a negative value when exp is in the past', () => {
    const currentTime = Math.floor(Date.now() / 1000)
    const exp = currentTime - 1000 // exp is 1000 seconds in the past
    const result = calcMaxAge({ exp })
    expect(result).toBe(-1000)
  })

  it('should handle very large exp values', () => {
    const exp = Number.MAX_SAFE_INTEGER
    const result = calcMaxAge({ exp })
    expect(result).toBeGreaterThan(0) // Result should be a large positive number
  })

  it('should handle current exp time correctly', () => {
    const currentTime = Math.floor(Date.now() / 1000)
    const exp = currentTime // exp is the current time
    const result = calcMaxAge({ exp })
    expect(result).toBe(0)
  })
})
