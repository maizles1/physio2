'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ServiceImageProps {
  src: string
  fallbackSrc: string
  alt: string
  className?: string
  sizes?: string
}

export default function ServiceImage({ src, fallbackSrc, alt, className, sizes }: ServiceImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const isSvg = imgSrc.endsWith('.svg')

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      unoptimized={isSvg}
      onError={() => {
        if (!hasError && imgSrc !== fallbackSrc) {
          setHasError(true)
          setImgSrc(fallbackSrc)
        }
      }}
    />
  )
}

