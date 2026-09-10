import Image from 'next/image'
import Link from 'next/link'
import { authorEntity, clinicEntity } from '@/config/geo.config'

export default function ArticleAuthor() {
  return (
    <aside
      className="geo-author mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6"
      aria-label="על כותב המאמר"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
        נכתב ונסקר מקצועית
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src="/images/andrey-meizels.JPG"
            alt={`${authorEntity.name}, ${authorEntity.jobTitle}`}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div>
          <p className="text-lg font-bold" style={{ color: '#2A3080' }}>
            {authorEntity.name}
          </p>
          <p className="mb-2 text-sm font-medium" style={{ color: '#2080C0' }}>
            {authorEntity.jobTitle} · {clinicEntity.clinician.credentials}
          </p>
          <p className="mb-3 text-sm leading-relaxed text-gray-700">
            {authorEntity.description}
          </p>
          <Link
            href="/about"
            className="text-sm font-medium hover:underline"
            style={{ color: '#2080C0' }}
          >
            קראו עוד על המטפל ←
          </Link>
        </div>
      </div>
    </aside>
  )
}
