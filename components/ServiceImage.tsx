'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isSvg = imgSrc.endsWith('.svg') || imgSrc.endsWith('.svg?')
  // Removed isLargeImage check - Next.js will optimize PNG images to WebP/AVIF automatically

  // Reset when src changes
  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
    setIsLoading(true)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set timeout for image loading (10 seconds)
    timeoutRef.current = setTimeout(() => {
      if (src !== fallbackSrc) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Image loading timeout: ${src}, switching to fallback`)
        }
        setHasError(true)
        setImgSrc(fallbackSrc)
        setIsLoading(true)
      }
    }, 10000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [src, fallbackSrc])

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Image load error: ${imgSrc}, switching to fallback: ${fallbackSrc}`)
      }
      setHasError(true)
      setImgSrc(fallbackSrc)
      setIsLoading(true)
    } else if (hasError && imgSrc === fallbackSrc) {
      // If fallback also fails, show placeholder but keep trying
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Both image and fallback failed for: ${alt}`)
      }
      // Don't set isLoading to false - let the fallback timer handle it
    }
  }

  const handleLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsLoading(false)
  }
  
  // Fallback: if image doesn't load after timeout, show it anyway (might be slow network or SVG issue)
  useEffect(() => {
    if (!isLoading) return
    
    const timeout = isSvg ? 1000 : 2000 // SVG should load faster, give it less time
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false)
      }
    }, timeout)
    
    return () => clearTimeout(fallbackTimer)
  }, [isLoading, imgSrc, alt, isSvg, hasError])

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
        priority={priority || isSvg} // Prioritize SVG to load faster
        loading={priority || isSvg ? undefined : 'lazy'}
        onError={handleError}
        onLoad={handleLoad}
        onLoadingComplete={handleLoad}
      />
    </>
  )
}

