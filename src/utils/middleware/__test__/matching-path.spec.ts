// matchingPath.spec.ts
import { matchingPath } from '../matching-path'

describe('matchingPath', () => {
  it('should return true when pathname includes one of the paths', () => {
    const paths = ['/home', '/about', '/contact']
    const pathname = '/about-us'
    expect(matchingPath(paths, pathname)).toBe(true)
  })

  it('should return false when pathname does not include any of the paths', () => {
    const paths = ['/home', '/about', '/contact']
    const pathname = '/services'
    expect(matchingPath(paths, pathname)).toBe(false)
  })

  it('should return true when pathname exactly matches one of the paths', () => {
    const paths = ['/home', '/about', '/contact']
    const pathname = '/home'
    expect(matchingPath(paths, pathname)).toBe(true)
  })

  it('should return false for an empty paths array', () => {
    const paths: string[] = []
    const pathname = '/home'
    expect(matchingPath(paths, pathname)).toBe(false)
  })

  it('should return false for an empty pathname', () => {
    const paths = ['/home', '/about', '/contact']
    const pathname = ''
    expect(matchingPath(paths, pathname)).toBe(false)
  })

  it('should handle paths with special characters', () => {
    const paths = ['/home', '/about-us', '/contact@us']
    const pathname = '/contact@us'
    expect(matchingPath(paths, pathname)).toBe(true)
  })

  it('should be case sensitive', () => {
    const paths = ['/Home', '/About', '/Contact']
    const pathname = '/home'
    expect(matchingPath(paths, pathname)).toBe(false)
  })
})
