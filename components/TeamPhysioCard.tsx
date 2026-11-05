import Image from 'next/image'
import Link from 'next/link'
import { TEAM_PHYSIO, isTeamPhysioConfigured, isPlaceholderValue } from '@/config/team.config'

/** Card for the team physiotherapist, used in "who treats you" sections. Hidden if not configured. */
export default function TeamPhysioCard() {
  if (!isTeamPhysioConfigured()) return null

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {TEAM_PHYSIO.imageSrc && (
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#2080C0]/20">
          <Image
            src={TEAM_PHYSIO.imageSrc}
            alt={`${TEAM_PHYSIO.name}, פיזיותרפיסטית מוסמכת`}
            fill
            className="object-cover object-top"
            sizes="80px"
            loading="lazy"
          />
        </div>
      )}
      <div>
        <h3 className="text-xl font-bold mb-1" style={{ color: '#2A3080' }}>
          {TEAM_PHYSIO.name}
        </h3>
        <p className="text-sm font-medium mb-3" style={{ color: '#2080C0' }}>
          פיזיותרפיסטית מוסמכת (B.P.T)
          {!isPlaceholderValue(TEAM_PHYSIO.university) && ` · ${TEAM_PHYSIO.university}`}
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          פיזיותרפיסטית בצוות הקליני של הקליניקה, מתמחה ב{TEAM_PHYSIO.specialties.join(', ')}, תחת
          המתודולוגיה הקלינית של אנדריי מייזלס.
        </p>
        <Link
          href="/about#team"
          className="inline-flex items-center gap-1 text-sm text-[#2080C0] font-semibold hover:underline"
        >
          עוד על הצוות
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

/** "Andrey Maizels and <team physio>" for section subtitles. */
export function therapistNames(): string {
  return isTeamPhysioConfigured() ? `אנדריי מייזלס ו${TEAM_PHYSIO.name}` : 'אנדריי מייזלס'
}
