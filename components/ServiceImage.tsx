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
  const [hasLoaded, setHasLoaded] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isSvg = imgSrc.endsWith('.svg') || imgSrc.endsWith('.svg?')

  // Reset when src changes
  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
    setIsLoading(true)
    setHasLoaded(false)

    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current)
    }

    // Set timeout for image loading (10 seconds) - switch to fallback if needed
    timeoutRef.current = setTimeout(() => {
      if (src !== fallbackSrc) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Image loading timeout: ${src}, switching to fallback`)
        }
        setHasError(true)
        setImgSrc(fallbackSrc)
        setIsLoading(true)
        setHasLoaded(false)
      }
    }, 10000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
      }
    }
  }, [src, fallbackSrc]) // Only reset when src or fallbackSrc changes

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Image load error: ${imgSrc}, switching to fallback: ${fallbackSrc}`)
      }
      setHasError(true)
      setImgSrc(fallbackSrc)
      setIsLoading(true)
      setHasLoaded(false)
    } else if (hasError && imgSrc === fallbackSrc) {
      // If fallback also fails, show placeholder but keep trying
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Both image and fallback failed for: ${alt}`)
      }
    }
  }

  const handleLoad = () => {
    // Clear all timeouts when image loads successfully
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current)
    }
    setIsLoading(false)
    setHasLoaded(true)
  }
  
  // Fallback timer: if image doesn't load after timeout, show it anyway
  useEffect(() => {
    // Don't run if already loaded or not loading
    if (hasLoaded || !isLoading) return
    
    const timeout = isSvg ? 1500 : 3000
    fallbackTimerRef.current = setTimeout(() => {
      // Force show the image even if onLoad wasn't called
      setIsLoading(false)
      setHasLoaded(true)
    }, timeout)
    
    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
      }
    }
  }, [isLoading, isSvg, hasLoaded])

  // For SVG, use regular img tag as Next.js Image can have issues with SVG
  if (isSvg) {
    return (
      <div className="relative w-full h-full">
        {isLoading && !hasLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" aria-hidden="true" />
        )}
        <img
          src={imgSrc}
          alt={alt}
          className={`${className || 'object-cover'} w-full h-full ${isLoading && !hasLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
    )
  }

  return (
    <>
      {isLoading && !hasLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" aria-hidden="true" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={`${className || 'object-cover'} w-full h-full ${isLoading && !hasLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        onError={handleError}
        onLoad={handleLoad}
        onLoadingComplete={handleLoad}
      />
    </>
  )
}
