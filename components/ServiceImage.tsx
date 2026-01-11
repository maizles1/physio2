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
  const [hasLoaded, setHasLoaded] = useState(false) // Track if image has successfully loaded
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isSvg = imgSrc.endsWith('.svg') || imgSrc.endsWith('.svg?')

  // Reset when src changes
  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
    setIsLoading(true)
    setHasLoaded(false) // Reset loaded state when src changes

    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current)
    }

    // Set timeout for image loading (10 seconds)
    timeoutRef.current = setTimeout(() => {
      if (src !== fallbackSrc && !hasLoaded) {
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
  }, [src, fallbackSrc, hasLoaded])

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
      // Don't set isLoading to false - let the fallback timer handle it
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
    setHasLoaded(true) // Mark as loaded - prevent disappearing
  }
  
  // Fallback: if image doesn't load after timeout, show it anyway (might be slow network or SVG issue)
  // Only run this if image hasn't loaded yet
  useEffect(() => {
    if (!isLoading || hasLoaded) return // Don't run if already loaded
    
    const timeout = isSvg ? 1500 : 3000 // Give more time for images to load
    fallbackTimerRef.current = setTimeout(() => {
      // Only force show if still loading and hasn't loaded yet
      if (isLoading && !hasLoaded) {
        setIsLoading(false)
        setHasLoaded(true) // Mark as loaded to prevent re-triggering
      }
    }, timeout)
    
    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
      }
    }
  }, [isLoading, isSvg, hasLoaded]) // Removed imgSrc, alt, hasError from dependencies

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
