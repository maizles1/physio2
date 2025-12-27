'use client'

import { useState } from 'react'
import Image from 'next/image'
import VideoModal from './VideoModal'
import { videosConfig } from '@/config/videos.config'
import { getTopManualReviews, type ManualReview } from '@/config/manual-reviews.config'

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

// Fallback testimonials if no manual reviews available
const fallbackTestimonials: ManualReview[] = [
  {
    id: 'local-1',
    authorName: 'דני כהן',
    rating: 5,
    date: new Date().toISOString(),
    relativeTimeDescription: 'לפני שבוע',
    text: 'הטיפול שקיבלתי בקליניקה היה מעולה. הצוות המקצועי והגישה האישית עזרו לי לחזור לפעילות תוך זמן קצר. ממליץ בחום!',
  },
  {
    id: 'local-2',
    authorName: 'שרה לוי',
    rating: 5,
    date: new Date().toISOString(),
    relativeTimeDescription: 'לפני שבועיים',
    text: 'לאחר ניתוח ברך, השיקום בקליניקה היה מדהים. הפיזיותרפיסטים סבלניים ומקצועיים, והתוצאות מעבר למצופה.',
  },
  {
    id: 'local-3',
    authorName: 'יוסי אברהם',
    rating: 5,
    date: new Date().toISOString(),
    relativeTimeDescription: 'לפני חודש',
    text: 'סבלתי מכאבי גב כרוניים במשך שנים. הטיפול בקליניקה שינה את חיי. היום אני יכול לחזור לפעילות יומיומית ללא כאבים.',
  },
]

export default function VideosSection() {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null)
  const [showAdditionalVideos, setShowAdditionalVideos] = useState(false)

  const openVideo = (video: Video) => {
    const embedUrl = convertToEmbedUrl(video.youtubeUrl)
    setSelectedVideo({ url: embedUrl, title: video.title })
  }

  // Get testimonials
  const manualReviews = getTopManualReviews(3)
  const testimonials = manualReviews.length > 0 ? manualReviews : fallbackTestimonials
  const displayTestimonials = testimonials.slice(0, 3)

  // Separate videos into main video and additional videos
  const mainVideo = videos[0]
  const additionalVideos = videos.slice(1)

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
                הצצה על הקליניקה
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                הכירו את הקליניקה, את אנדריי מייזלס ואת הגישה הטיפולית המקצועית
              </p>
            </div>

            {/* Testimonials Section */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {displayTestimonials.map((testimonial) => (
                  <article
                    key={testimonial.id}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
                    role="article"
                    aria-label={`עדות של ${testimonial.authorName}`}
                  >
                    <div className="flex gap-1 mb-4" aria-label={`דירוג: ${testimonial.rating} מתוך 5 כוכבים`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      &quot;{testimonial.text.length > 150 ? testimonial.text.substring(0, 150) + '...' : testimonial.text}&quot;
                    </p>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="font-bold text-gray-900">{testimonial.authorName}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.relativeTimeDescription}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Main Video Section */}
            {mainVideo && (() => {
              const videoId = getVideoId(mainVideo.youtubeUrl)
              const hasValidVideoId = videoId && videoId !== 'PLACEHOLDER' && !mainVideo.youtubeUrl.includes('PLACEHOLDER')
              const thumbnailUrl = hasValidVideoId
                ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                : null

              return (
                <div className="mb-8">
                  <article
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer max-w-4xl mx-auto"
                    aria-label={`סרטון: ${mainVideo.title}`}
                    onClick={() => openVideo(mainVideo)}
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-[#2080C0] to-[#2A3080] overflow-hidden group w-full">
                      {hasValidVideoId && thumbnailUrl ? (
                        <Image
                          src={thumbnailUrl}
                          alt={`תמונת תצוגה: ${mainVideo.title}`}
                          fill
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 1024px) 100vw, 896px"
                          loading="lazy"
                          onError={(e) => {
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
                        {mainVideo.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                        {mainVideo.description}
                      </p>
                      <button
                        className="text-[#2080C0] font-medium hover:text-[#2A3080] flex items-center gap-2 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          openVideo(mainVideo)
                        }}
                        aria-label={`צפה בסרטון: ${mainVideo.title}`}
                      >
                        צפה בסרטון
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    </div>
                  </article>
                </div>
              )
            })()}

            {/* Additional Videos Button */}
            {additionalVideos.length > 0 && (
              <div className="text-center mb-8">
                <button
                  onClick={() => setShowAdditionalVideos(!showAdditionalVideos)}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  aria-label={showAdditionalVideos ? 'הסתר סרטונים נוספים' : 'הצג סרטונים נוספים'}
                >
                  {showAdditionalVideos ? 'הסתר סרטונים נוספים' : 'לסרטונים נוספים'}
                </button>
              </div>
            )}

            {/* Additional Videos Section */}
            {showAdditionalVideos && additionalVideos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {additionalVideos.map((video) => {
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
            )}
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
