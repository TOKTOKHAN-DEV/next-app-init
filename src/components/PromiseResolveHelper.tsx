import { ReactNode } from 'react'

type AwaitResolveRenderFunction<T> = (props: { data: T }) => ReactNode

interface PromiseResolveHelperProps<T> {
  promise: Promise<T>
  children: ReactNode | AwaitResolveRenderFunction<T>
}

export default async function PromiseResolveHelper<T>({
  promise,
  children,
}: PromiseResolveHelperProps<T>) {
  const resolvedData = await promise

  return (
    <>
      {typeof children === 'function' ?
        children({ data: resolvedData })
      : children}
    </>
  )
}
