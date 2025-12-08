'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface ServiceImageProps {
  src: string
  fallbackSrc: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

export default function ServiceImage({ src, fallbackSrc, alt, className, sizes, priority = false }: ServiceImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const isSvg = imgSrc.endsWith('.svg')

  // Reset when src changes
  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
    setIsLoading(true)
  }, [src])

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" aria-hidden="true" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={`${className || 'object-cover'} w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        unoptimized={isSvg}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        onError={() => {
          if (!hasError && imgSrc !== fallbackSrc) {
            setHasError(true)
            setImgSrc(fallbackSrc)
            setIsLoading(true)
          }
        }}
        onLoad={() => {
          setIsLoading(false)
        }}
        onLoadingComplete={() => {
          setIsLoading(false)
        }}
      />
    </>
  )
}

