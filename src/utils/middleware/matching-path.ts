export const matchingPath = (paths: string[], pathname: string) =>
  paths.some((path) => pathname.includes(path))
