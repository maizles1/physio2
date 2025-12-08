'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Image from 'next/image'

interface CarouselImage {
  src: string
  alt: string
}

const images: CarouselImage[] = [
  { src: '/images/carousel/clinic-1.jpg', alt: 'קליניקת פיזיותרפיה.פלוס - חלל טיפול מקצועי' },
  { src: '/images/carousel/clinic-2.jpg', alt: 'ציוד מקצועי לטיפול פיזיותרפיה' },
  { src: '/images/carousel/clinic-3.jpeg', alt: 'חדר טיפול בקליניקה' },
  { src: '/images/carousel/clinic-4.jpeg', alt: 'אזור המתנה בקליניקה' },
  { src: '/images/carousel/clinic-5.jpg', alt: 'פיזיותרפיה.פלוס - מכון פיזיותרפיה פרטי באשדוד' },
  { src: '/images/carousel/clinic-6.jpg', alt: 'חלל טיפול נוסף בקליניקה' },
  { src: '/images/carousel/clinic-7.jpg', alt: 'אזור טיפול בקליניקה' },
  { src: '/images/carousel/clinic-8.jpg', alt: 'קליניקת פיזיותרפיה.פלוס - חלל מקצועי' },
]

const AUTO_PLAY_INTERVAL = 5000 // 5 seconds

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)
  const [containerHeight, setContainerHeight] = useState<number>(400)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const imagesContainerRef = useRef<HTMLDivElement>(null)

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setProgress(0)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setIsAutoPlaying(false)
    setProgress(0)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setIsAutoPlaying(false)
    setProgress(0)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselRef.current?.contains(document.activeElement)) return

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          goToPrevious()
          break
        case 'ArrowLeft':
          e.preventDefault()
          goToNext()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(0)
          break
        case 'End':
          e.preventDefault()
          goToSlide(images.length - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious, goToSlide])

  // Auto-play and progress tracking
  useEffect(() => {
    if (!isAutoPlaying || isHovered) {
      // Use setTimeout to avoid synchronous setState in effect
      const timer = setTimeout(() => setProgress(0), 0)
      return () => clearTimeout(timer)
    }

    // Progress interval (update every 50ms for smooth animation)
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (AUTO_PLAY_INTERVAL / 50))
        return newProgress >= 100 ? 0 : newProgress
      })
    }, 50)

    // Auto-play interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      setTimeout(() => setProgress(0), 0)
    }, AUTO_PLAY_INTERVAL)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [isAutoPlaying, isHovered, currentIndex])

  const currentImage = useMemo(() => images[currentIndex], [currentIndex])

  // Update container height based on current image - match exact image aspect ratio
  useEffect(() => {
    const updateHeight = () => {
      if (!imagesContainerRef.current || !carouselRef.current) return
      
      const currentImageElement = imagesContainerRef.current.querySelector(
        `div[data-image-index="${currentIndex}"] img`
      ) as HTMLImageElement | null
      
      if (currentImageElement && currentImageElement.complete) {
        const naturalWidth = currentImageElement.naturalWidth
        const naturalHeight = currentImageElement.naturalHeight
        
        if (naturalWidth && naturalHeight) {
          const containerWidth = carouselRef.current.clientWidth || 1200
          const aspectRatio = naturalWidth / naturalHeight
          
          // Calculate height based on exact aspect ratio of the image
          let calculatedHeight = containerWidth / aspectRatio
          
          // Only apply max height to prevent images from being too large on screen
          // But allow the container to match the image's natural aspect ratio
          const maxHeight = typeof window !== 'undefined' 
            ? window.innerWidth < 640 
              ? window.innerHeight * 0.7 // Mobile: 70vh
              : window.innerWidth < 1024
              ? window.innerHeight * 0.75 // Tablet: 75vh
              : window.innerHeight * 0.8 // Desktop: 80vh
            : 600
          
          // Minimum height to prevent too small images
          const minHeight = typeof window !== 'undefined' && window.innerWidth < 640 ? 200 : 250
          
          // Use calculated height if within bounds, otherwise use the limit
          // This ensures the container matches the image's aspect ratio as closely as possible
          const finalHeight = Math.max(
            minHeight,
            Math.min(calculatedHeight, maxHeight)
          )
          
          // Set height to match image aspect ratio exactly
          setContainerHeight(finalHeight)
        }
      }
    }

    // Wait a bit for image to load
    const timeoutId = setTimeout(updateHeight, 100)
    updateHeight()

    // Also update on window resize
    const handleResize = () => {
      updateHeight()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
    }
  }, [currentIndex])

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8" style={{ color: '#2A3080' }}>
            הקליניקה שלנו
          </h2>
          
          <div
            ref={carouselRef}
            className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl w-full"
            style={{ 
              minHeight: '200px',
              height: containerHeight ? `${containerHeight}px` : '400px',
              transition: 'height 0.5s ease-in-out',
              width: '100%'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            tabIndex={0}
            role="region"
            aria-label="קרוסלת תמונות של הקליניקה"
          >
            {/* Images */}
            <div ref={imagesContainerRef} className="relative w-full h-full bg-gray-50">
              {images.map((image, index) => {
                const isCurrent = index === currentIndex
                return (
                  <div
                    key={index}
                    data-image-index={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      isCurrent ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={!isCurrent}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain w-full h-full"
                      priority={index === 0}
                      loading={index === 0 ? undefined : 'lazy'}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      onLoad={() => {
                        if (index === currentIndex) {
                          setTimeout(() => {
                            const img = imagesContainerRef.current?.querySelector(
                              `div[data-image-index="${index}"] img`
                            ) as HTMLImageElement | null
                            if (img && img.complete && carouselRef.current) {
                              const naturalWidth = img.naturalWidth
                              const naturalHeight = img.naturalHeight
                              if (naturalWidth && naturalHeight) {
                                const containerWidth = carouselRef.current.clientWidth || 1200
                                const aspectRatio = naturalWidth / naturalHeight
                                const calculatedHeight = containerWidth / aspectRatio
                                
                                // Only apply max height to prevent images from being too large on screen
                                // But allow the container to match the image's natural aspect ratio
                                const maxHeight = typeof window !== 'undefined' 
                                  ? window.innerWidth < 640 
                                    ? window.innerHeight * 0.7 // Mobile: 70vh
                                    : window.innerWidth < 1024
                                    ? window.innerHeight * 0.75 // Tablet: 75vh
                                    : window.innerHeight * 0.8 // Desktop: 80vh
                                  : 600
                                
                                // Minimum height to prevent too small images
                                const minHeight = typeof window !== 'undefined' && window.innerWidth < 640 ? 200 : 250
                                
                                // Use calculated height if within bounds, otherwise use the limit
                                // This ensures the container matches the image's aspect ratio as closely as possible
                                const finalHeight = Math.max(
                                  minHeight,
                                  Math.min(calculatedHeight, maxHeight)
                                )
                                
                                // Set height to match image aspect ratio exactly
                                setContainerHeight(finalHeight)
                              }
                            }
                          }, 50)
                        }
                      }}
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const placeholder = target.parentElement?.querySelector('.image-placeholder') as HTMLElement
                        if (placeholder) {
                          placeholder.classList.remove('hidden')
                          placeholder.classList.add('flex')
                        }
                      }}
                    />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#2080C0] to-[#2A3080] hidden items-center justify-center image-placeholder" role="img" aria-label={image.alt}>
                      <div className="text-center text-white p-8">
                        <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-lg font-medium mb-2">{image.alt}</p>
                        <p className="text-sm opacity-75">תמונה זמנית - יש להוסיף תמונה לקובץ: {image.src}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Progress Bar */}
            {isAutoPlaying && !isHovered && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
                <div
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                  aria-hidden="true"
                />
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="תמונה קודמת"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="תמונה הבאה"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10" role="tablist" aria-label="ניווט בין תמונות">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 sm:h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ${
                    index === currentIndex
                      ? 'bg-white w-6 sm:w-8'
                      : 'bg-white/50 hover:bg-white/75 w-2 sm:w-3'
                  }`}
                  aria-label={`עבור לתמונה ${index + 1} מתוך ${images.length}`}
                  aria-selected={index === currentIndex}
                  role="tab"
                />
              ))}
            </div>

            {/* Current image info for screen readers */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              תמונה {currentIndex + 1} מתוך {images.length}: {currentImage.alt}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
