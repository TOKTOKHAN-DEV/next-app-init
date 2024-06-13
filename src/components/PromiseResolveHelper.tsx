import { ReactNode } from 'react'

type ChildrenWithDataType<T> = (data: T) => ReactNode

interface PromiseResolveHelperProps<T> {
  data: Promise<Response>
  children: ReactNode | ChildrenWithDataType<T>
}

export default async function PromiseResolveHelper<T>(
  { data, children }: PromiseResolveHelperProps<T>,
) {
  const resolvedData = await data.then((res) => res.json())

  return (
    <>{typeof children === 'function' ? children(resolvedData) : children}</>
  )
}
