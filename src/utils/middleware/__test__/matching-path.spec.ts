import { matchingPath } from '../matching-path'

describe('matchingPath', () => {
  test('should return true if any path matches the pathname', () => {
    const paths = ['/home', '/about', '/contact']
    const pathname = '/about/team'
    const result = matchingPath(paths, pathname)
    expect(result).toBe(true)
  })

  test('should return false if no path matches the pathname', () => {
    const paths = ['/home', '/about', '/contact']
    const pathname = '/profile/settings'
    const result = matchingPath(paths, pathname)
    expect(result).toBe(false)
  })

  test('should work as a curried function', () => {
    const paths = ['/home', '/about', '/contact']
    const curriedFunction = matchingPath(paths)
    const result = curriedFunction('/contact/info')
    expect(result).toBe(true)
  })

  test('should return false for empty path array', () => {
    const paths: string[] = []
    const pathname = '/any/path'
    const result = matchingPath(paths, pathname)
    expect(result).toBe(false)
  })

  test('should return false for empty pathname', () => {
    const paths = ['/home', '/about', '/contact']
    const pathname = ''
    const result = matchingPath(paths, pathname)
    expect(result).toBe(false)
  })
})
