'use client'

// 05: all clinic videos in a swipeable row (bold design).
import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import VideoModal from '@/components/VideoModal'
import { videosConfig } from '@/config/videos.config'
import { BoldHeading, BoldSection, INK, PAPER, YELLOW, display } from '@/components/home/boldTheme'

function getVideoId(url: string): string | null {
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/) || url.match(/\/embed\/([^?&]+)/) || url.match(/\/shorts\/([^?&]+)/)
  return m ? m[1] : null
}

const ORDER = ['המלצות מטופלים', 'קליניקה לפיזיותרפיה', 'טיפול בסחרחורות', 'ייעוץ לפני ניתוח']

const videos = [...videosConfig]
  .sort((a, b) => {
    const ia = ORDER.indexOf(a.title)
    const ib = ORDER.indexOf(b.title)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })
  .map((v) => ({ ...v, id: getVideoId(v.youtubeUrl) }))
  .filter((v): v is typeof v & { id: string } => !!v.id && v.id !== 'PLACEHOLDER')

// Google requires a real upload date for VideoObject; videos without one are left out rather than given a made-up date.
const videoSchemas = videos.filter((v) => !!v.uploadDate).map((v) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: v.title,
  description: v.description,
  thumbnailUrl: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
  contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
  embedUrl: `https://www.youtube.com/embed/${v.id}`,
  uploadDate: v.uploadDate,
  publisher: { '@type': 'Organization', '@id': 'https://physio-plus.co.il/#organization', name: 'פיזיותרפיה.פלוס' },
}))

export default function BoldVideos() {
  const [open, setOpen] = useState<{ url: string; title: string } | null>(null)
  if (videos.length === 0) return null
  return (
    <>
      {videoSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <BoldSection surface="ink">
        <BoldHeading surface="ink" index="06" label="סרטונים" title="תראו בעצמכם" />
        <ul className="-mx-5 px-5 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 list-none my-0! lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {videos.map((v, i) => (
            <li key={v.id} className="m-0! w-[70%] sm:w-[42%] lg:w-auto flex-shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setOpen({ url: `https://www.youtube.com/embed/${v.id}`, title: v.title })}
                className="group block! w-full h-auto! min-h-0! p-0! m-0! bg-transparent! border-0! shadow-none! text-right focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ outlineColor: YELLOW }}
                aria-label={`צפייה בסרטון: ${v.title}`}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden border-2" style={{ borderColor: PAPER, boxShadow: `6px 6px 0 ${YELLOW}` }}>
                  <Image
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={`תמונת תצוגה: ${v.title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 42vw, 280px"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
                  <div
                    className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                    style={{ background: YELLOW }}
                    aria-hidden="true"
                  >
                    <Play className="h-7 w-7 translate-x-[-1px]" style={{ color: INK, fill: INK }} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className={`${display.className} text-[1.9rem] leading-none`} style={{ color: PAPER }}>
                      {v.title}
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-2 text-sm lg:hidden" style={{ color: 'rgba(243,238,229,0.7)' }} aria-hidden="true">
          החליקו לסרטונים נוספים ←
        </div>
      </BoldSection>
      {open && <VideoModal isOpen onClose={() => setOpen(null)} videoUrl={open.url} title={open.title} />}
    </>
  )
}
