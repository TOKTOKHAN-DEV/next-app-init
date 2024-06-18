import { calcMaxAge } from '../calc-max-age'

// calcMaxAge.spec.ts
describe('calcMaxAge', () => {
  it('should return -1 when exp is undefined', () => {
    const result = calcMaxAge({})
    expect(result).toBe(-1)
  })

  it('should calculate the correct max age when exp is provided', () => {
    const currentTime = Math.floor(Date.now() / 1000)
    const exp = currentTime + 3600
    const result = calcMaxAge({ exp })
    expect(result).toBe(3600)
  })

  it('should calculate the correct max age when exp is in the past', () => {
    const currentTime = Math.floor(Date.now() / 1000)
    const exp = currentTime - 3600
    const result = calcMaxAge({ exp })
    expect(result).toBeLessThan(0)
  })
})
