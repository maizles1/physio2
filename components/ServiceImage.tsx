'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface ServiceImageProps {
  src: string
  fallbackSrc: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

export default function ServiceImage({
  src,
  fallbackSrc,
  alt,
  className,
  sizes,
  priority = false,
}: ServiceImageProps) {
  // errorStage: 0 = trying primary, 1 = primary failed, trying fallback, 2 = fallback failed
  const [errorStage, setErrorStage] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const imgSrc =
    errorStage === 0 || src === fallbackSrc ? src : fallbackSrc
  const isSvg = imgSrc.endsWith('.svg') || imgSrc.endsWith('.svg?')
  const hasFallbackOption = src !== fallbackSrc
  const hasFinalError =
    errorStage >= 2 || (errorStage >= 1 && !hasFallbackOption)

  // After mount, if the underlying <img> element is already complete (cached
  // or loaded before React attached the onLoad listener), mark as loaded so
  // we don't get stuck on the skeleton. Defer to next tick so the setState
  // doesn't fire synchronously inside the effect body.
  useEffect(() => {
    if (isLoaded) return
    const wrap = imgWrapRef.current
    if (!wrap) return
    const img = wrap.querySelector('img')
    if (!img || !img.complete || img.naturalWidth === 0) return
    const id = window.setTimeout(() => setIsLoaded(true), 0)
    return () => window.clearTimeout(id)
  }, [imgSrc, isLoaded])

  const handleError = () => {
    setErrorStage((prev) => prev + 1)
    setIsLoaded(false)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  if (hasFinalError) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <div className="text-gray-400 text-sm text-center px-4">
          תמונה לא זמינה
        </div>
      </div>
    )
  }

  return (
    <div ref={imgWrapRef} className="absolute inset-0">
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"
          aria-hidden="true"
        />
      )}
      {isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element -- SVG paths bypass the Next image optimizer
        <img
          src={imgSrc}
          alt={alt}
          className={`${className || 'object-cover'} w-full h-full`}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          onError={handleError}
          onLoad={handleLoad}
        />
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className={className || 'object-cover'}
          sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </div>
  )
}
