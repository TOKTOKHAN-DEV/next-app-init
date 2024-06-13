import { getJwtCookieOptions } from '../get-jwt-cookie-option'

describe('getJwtCookieOptions', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should return correct options without maxAge', () => {
    const options = getJwtCookieOptions()
    expect(options).toEqual({
      sameSite: 'strict',
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
  })

  it('should return correct options with maxAge', () => {
    const maxAge = 3600
    const options = getJwtCookieOptions(maxAge)
    expect(options).toEqual({
      sameSite: 'strict',
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge,
    })
  })

  it('should set secure to true when NODE_ENV is production', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      writable: true,
    })
    const options = getJwtCookieOptions()
    expect(options.secure).toBe(true)
  })

  it('should set secure to false when NODE_ENV is not production', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      writable: true,
    })
    const options = getJwtCookieOptions()
    expect(options.secure).toBe(false)
  })

  it('should always have sameSite, path, and httpOnly set correctly', () => {
    const options = getJwtCookieOptions()
    expect(options.sameSite).toBe('strict')
    expect(options.path).toBe('/')
    expect(options.httpOnly).toBe(true)
  })
})
