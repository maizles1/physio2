'use client'

import { useEffect, useRef } from 'react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title: string
}

export default function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      
      // Focus trap - focus first element
      const firstFocusable = modalRef.current?.querySelector('button')
      firstFocusable?.focus()
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const modalElement = modalRef.current
      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }

      modalElement.addEventListener('keydown', handleTabKey)
      return () => {
        modalElement.removeEventListener('keydown', handleTabKey)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      ref={modalRef}
    >
      <div className="relative w-full max-w-6xl bg-black rounded-lg overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          aria-label="סגור סרטון"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Title */}
        <div className="absolute top-4 right-16 z-10 bg-black/70 px-4 py-2 rounded-lg">
          <h3 id="video-modal-title" className="text-white font-semibold text-sm sm:text-base">
            {title}
          </h3>
        </div>

        {/* Video Container */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
          <iframe
            ref={iframeRef}
            src={videoUrl}
            title={title}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

