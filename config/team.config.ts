/**
 * פרטי הפיזיותרפיסטית בצוות הקליני.
 * עדכנו כאן שם, אוניברסיטה, נתיב תמונה והתמחויות.
 * השינוי מופיע בעמוד אודות ובתצוגה המקדימה בדף הבית.
 */

export interface TeamPhysio {
  name: string
  university: string
  /** נתיב מקומי, למשל '/images/team/physio.jpg'. ריק = אווטאר ראשי תיבות */
  imageSrc: string
  specialties: string[]
}

export const TEAM_PHYSIO: TeamPhysio = {
  name: '[שם הפיזיותרפיסטית]',
  university: '[שם האוניברסיטה]',
  imageSrc: '',
  specialties: ['שיקום אורתופדי', 'פציעות ספורט', 'שיקום אקטיבי'],
}

export function isPlaceholderValue(value: string): boolean {
  const trimmed = value.trim()
  return trimmed === '' || trimmed.startsWith('[')
}

export function isTeamPhysioConfigured(physio: TeamPhysio = TEAM_PHYSIO): boolean {
  return !isPlaceholderValue(physio.name)
}

export function teamPhysioInitials(name: string): string {
  const cleaned = name.replace(/[\[\]]/g, '').trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'B.P.T'
  return parts
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
}
