import { Ref, forwardRef, memo } from 'react'

import Image from 'next/image'

import {
  Box,
  ChakraProps,
  PropsOf,
  Skeleton,
  useControllableState,
} from '@chakra-ui/react'

export interface ImageAsNextProps
  extends Omit<ChakraProps, 'fill'>,
    Pick<
      PropsOf<typeof Image>,
      | 'src'
      | 'alt'
      | 'sizes'
      | 'loader'
      | 'fill'
      | 'quality'
      | 'priority'
      | 'loading'
      | 'placeholder'
      | 'blurDataURL'
      | 'unoptimized'
      | 'onLoad'
      | 'onError'
    > {
  isDisabledSkeleton?: boolean
  isLoading?: boolean
}

const ImageAsNext = forwardRef(function ImageAsNext(
  {
    src,
    alt,
    fill = true,
    loader,
    quality,
    priority = false,
    loading,
    placeholder,
    blurDataURL,
    unoptimized,
    onLoad,
    onError,
    sizes = 'auto',
    isLoading,
    isDisabledSkeleton,
    ...props
  }: ImageAsNextProps,
  ref: Ref<HTMLImageElement>,
) {
  const [_isLoading, setIsLoading] = useControllableState({
    value: isLoading,
    defaultValue: true,
  })

  const isShowSkelton = !isDisabledSkeleton && _isLoading

  return (
    <Box position="relative" overflow="hidden" objectFit="contain" {...props}>
      <Skeleton
        w="100%"
        h="100%"
        position="absolute"
        objectFit="inherit"
        objectPosition="inherit"
        isLoaded={!isShowSkelton}
      >
        <Image
          ref={ref}
          src={src}
          alt={alt}
          fill={fill}
          loader={loader}
          quality={quality}
          priority={priority}
          loading={loading}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          unoptimized={unoptimized}
          onLoad={(t) => {
            setIsLoading(false)
            onLoad?.(t)
          }}
          onError={(t) => {
            setIsLoading(false)
            onError?.(t)
          }}
          sizes={sizes}
          style={{
            objectFit: 'inherit',
            objectPosition: 'inherit',
          }}
        />
      </Skeleton>
    </Box>
  )
})

export default memo(ImageAsNext)
