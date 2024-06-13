/**
 *
 * @param exp - jwt expires time
 * @description when exp is undefined, it returns -1 and the cookie is deleted.
 */
export const calcMaxAge = ({ exp }: { exp?: number }) => {
  if (!exp) return -1
  const currentTime = Math.floor(Date.now() / 1000)
  return exp - currentTime
}
