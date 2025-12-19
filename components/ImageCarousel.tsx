'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface CarouselImage {
  src: string
  alt: string
}

const images: CarouselImage[] = [
  { src: '/images/carousel/clinic-1.jpg', alt: 'קליניקת פיזיותרפיה.פלוס - חלל טיפול מקצועי' },
  { src: '/images/carousel/clinic-2.jpg', alt: 'ציוד מקצועי לטיפול פיזיותרפיה' },
  { src: '/images/carousel/clinic-3.jpg', alt: 'חדר טיפול בקליניקה' },
  { src: '/images/carousel/clinic-4.jpg', alt: 'אזור המתנה בקליניקה' },
  { src: '/images/carousel/clinic-5.jpg', alt: 'פיזיותרפיה.פלוס - מכון פיזיותרפיה פרטי באשדוד' },
]

const AUTO_PLAY_INTERVAL = 5000 // 5 seconds

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setIsAutoPlaying(false)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setIsAutoPlaying(false)
  }, [])

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, AUTO_PLAY_INTERVAL)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isAutoPlaying, isHovered])

  const currentImage = images[currentIndex]

  return (
    <section className="section-spacing bg-gray-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-6 sm:mb-8 text-primary-dark">
            הקליניקה שלנו
          </h2>
          
          <div
            className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl w-full h-[400px] sm:h-[500px] md:h-[550px] bg-gray-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            tabIndex={0}
            role="region"
            aria-label="קרוסלת תמונות של הקליניקה"
          >
            {/* Current Image */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <img
                key={`carousel-img-${currentIndex}`}
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-full w-auto h-auto"
                style={{
                  objectFit: 'contain',
                  display: 'block'
                }}
                onError={(e) => {
                  console.error(`❌ Failed to load image: ${currentImage.src}`)
                  const target = e.target as HTMLImageElement
                  target.style.visibility = 'hidden'
                }}
                onLoad={() => {
                  console.log(`✅ Image loaded successfully: ${currentImage.src}`)
                }}
              />
            </div>

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
