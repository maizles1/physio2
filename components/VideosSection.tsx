'use client'

import { useState } from 'react'
import Image from 'next/image'
import VideoModal from './VideoModal'
import { videosConfig } from '@/config/videos.config'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  youtubeUrl: string
}

// המרת ה-config ל-format שהקומפוננטה מצפה
const videos: Video[] = videosConfig.map((config, index) => ({
  id: String(index + 1),
  title: config.title,
  description: config.description,
  thumbnail: '/images/videos/clinic-video.jpg', // fallback - תמונה אמיתית נטענת אוטומטית מ-YouTube
  youtubeUrl: config.youtubeUrl,
}))

// פונקציה להמרת קישור YouTube רגיל ל-Embed URL
function convertToEmbedUrl(url: string): string {
  // אם כבר בפורמט embed, החזר כמו שהוא
  if (url.includes('/embed/')) {
    return url
  }

  // חלץ את ה-ID מהקישור
  let videoId = ''

  // פורמט: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^&]+)/)
  if (watchMatch) {
    videoId = watchMatch[1]
  }

  // פורמט: https://youtu.be/VIDEO_ID
  if (!videoId) {
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
    if (shortMatch) {
      videoId = shortMatch[1]
    }
  }

  // פורמט: https://youtube.com/shorts/VIDEO_ID או https://www.youtube.com/shorts/VIDEO_ID
  if (!videoId) {
    const shortsMatch = url.match(/\/shorts\/([^?&]+)/)
    if (shortsMatch) {
      videoId = shortsMatch[1]
    }
  }

  // פורמט: https://www.youtube.com/embed/VIDEO_ID (כבר embed)
  if (!videoId) {
    const embedMatch = url.match(/\/embed\/([^?&]+)/)
    if (embedMatch) {
      return url
    }
  }

  // אם לא מצאנו ID, החזר את הקישור המקורי
  if (!videoId) {
    console.warn('לא ניתן למצוא Video ID בקישור:', url)
    return url
  }

  return `https://www.youtube.com/embed/${videoId}`
}

// פונקציה לחילוץ Video ID (לצורך תמונת Thumbnail)
function getVideoId(url: string): string | null {
  // פורמט: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^&]+)/)
  if (watchMatch) return watchMatch[1]

  // פורמט: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return shortMatch[1]

  // פורמט: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/\/embed\/([^?&]+)/)
  if (embedMatch) return embedMatch[1]

  // פורמט: https://youtube.com/shorts/VIDEO_ID או https://www.youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/\/shorts\/([^?&]+)/)
  if (shortsMatch) return shortsMatch[1]

  return null
}

export default function VideosSection() {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null)

  const openVideo = (video: Video) => {
    const embedUrl = convertToEmbedUrl(video.youtubeUrl)
    setSelectedVideo({ url: embedUrl, title: video.title })
  }

  // Create VideoObject schemas for all videos
  const videoSchemas = videos.map((video) => {
    const videoId = getVideoId(video.youtubeUrl)
    if (!videoId) return null

    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.title,
      description: video.description,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      uploadDate: new Date().toISOString(), // You can update this with actual upload dates
      contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      publisher: {
        '@type': 'Organization',
        name: 'פיזיותרפיה.פלוס',
        logo: {
          '@type': 'ImageObject',
          url: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
        },
      },
    }
  }).filter(Boolean)

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <>
      {videoSchemas.map((schema, index) => (
        schema && (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )
      ))}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="mb-3 sm:mb-4 text-primary-dark">
                סרטונים על הקליניקה
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                הכירו את הקליניקה, את אנדריי מייזלס ואת הגישה הטיפולית המקצועית
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {videos.map((video) => {
                const videoId = getVideoId(video.youtubeUrl)
                // רק אם יש Video ID תקין (לא PLACEHOLDER) - טען תמונה מ-YouTube
                const hasValidVideoId = videoId && videoId !== 'PLACEHOLDER' && !video.youtubeUrl.includes('PLACEHOLDER')
                const thumbnailUrl = hasValidVideoId
                  ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                  : null

                return (
                  <article
                    key={video.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
                    aria-label={`סרטון: ${video.title}`}
                    onClick={() => openVideo(video)}
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-[#2080C0] to-[#2A3080] overflow-hidden group w-full">
                      {hasValidVideoId && thumbnailUrl ? (
                        <Image
                          src={thumbnailUrl}
                          alt={`תמונת תצוגה: ${video.title}`}
                          fill
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to placeholder if thumbnail doesn't load
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <div className="bg-white/90 rounded-full p-4 sm:p-5 group-hover:scale-110 transition-transform shadow-lg">
                          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary-dark">
                        {video.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                        {video.description}
                      </p>
                      <button
                        className="text-[#2080C0] font-medium hover:text-[#2A3080] flex items-center gap-2 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          openVideo(video)
                        }}
                        aria-label={`צפה בסרטון: ${video.title}`}
                      >
                        צפה בסרטון
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={closeVideo}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </>
  )
}
