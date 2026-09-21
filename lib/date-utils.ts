/**
 * Utilities להמרת תאריכים עבריים ל-Date objects
 */

const HEBREW_MONTHS: Record<string, number> = {
  ינואר: 0,
  פברואר: 1,
  מרץ: 2,
  מרס: 2, // חלופה
  אפריל: 3,
  מאי: 4,
  יוני: 5,
  יולי: 6,
  אוגוסט: 7,
  ספטמבר: 8,
  אוקטובר: 9,
  נובמבר: 10,
  דצמבר: 11,
}

export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

function calendarDate(year: number, month: number, day: number): Date | undefined {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return undefined
  }

  const date = new Date(year, month, day)
  if (!isValidDate(date)) {
    return undefined
  }

  // Reject overflow dates such as 31 בפברואר (JS Date would roll into March)
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return undefined
  }

  return date
}

function parseIsoCalendarDate(value: string): Date | undefined {
  const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!match) {
    return undefined
  }

  return calendarDate(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
}

/**
 * Parse a Hebrew (or ISO) date without throwing and without falling back to "now".
 * Returns undefined for missing, unparseable, or invalid values.
 *
 * Examples: '25 בינואר 2025', '15 במרץ 2024', '2026-05-03'
 */
export function tryParseHebrewDate(value: unknown): Date | undefined {
  if (typeof value !== 'string' || !value.trim()) {
    return undefined
  }

  try {
    const isoDate = parseIsoCalendarDate(value)
    if (isoDate) {
      return isoDate
    }

    const cleanedDate = value.replace(/^ב/, '').trim()
    const parts = cleanedDate.split(/\s+/)
    if (parts.length < 3) {
      return undefined
    }

    const day = parseInt(parts[0], 10)
    const monthName = parts[1].replace(/^ב/, '')
    const year = parseInt(parts[2], 10)
    const month = HEBREW_MONTHS[monthName]

    if (month === undefined || Number.isNaN(day) || Number.isNaN(year)) {
      return undefined
    }

    return calendarDate(year, month, day)
  } catch {
    return undefined
  }
}

/**
 * ממיר תאריך עברי לפורמט 'DD MMMM YYYY' ל-Date object
 * דוגמאות: '25 בינואר 2025', '15 במרץ 2024'
 *
 * Never throws and never returns Invalid Date. Unparseable input falls back to now.
 */
export function parseHebrewDate(hebrewDate: string): Date {
  const parsed = tryParseHebrewDate(hebrewDate)
  if (parsed) {
    return parsed
  }

  console.warn(`לא הצלחתי לפרק את התאריך: ${hebrewDate}`)
  return new Date()
}

function formatCalendarDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * ממיר תאריך עברי ל-ISO 8601 (YYYY-MM-DD) עבור schema.org ו-Open Graph.
 * לא משתמשים ב-toISOString כדי להימנע מהסטת יום בגלל אזור זמן.
 */
export function toIsoDate(hebrewDate: string): string {
  return formatCalendarDate(parseHebrewDate(hebrewDate))
}

/**
 * Format a date for sitemap <lastmod>. Returns undefined instead of throwing
 * or emitting an invalid W3C datetime.
 */
export function toSitemapLastmod(value: unknown): string | undefined {
  try {
    if (typeof value === 'string' && value.trim()) {
      const parsed = tryParseHebrewDate(value) ?? new Date(value)
      if (isValidDate(parsed)) {
        return formatCalendarDate(parsed)
      }
      return undefined
    }

    if (!isValidDate(value)) {
      return undefined
    }

    return formatCalendarDate(value)
  } catch {
    return undefined
  }
}

/**
 * השוואת שני תאריכים עבריים
 * מחזיר מספר חיובי אם a חדש יותר מ-b, שלילי אם a ישן יותר, ו-0 אם שווים
 */
export function compareHebrewDates(a: string, b: string): number {
  const dateA = parseHebrewDate(a)
  const dateB = parseHebrewDate(b)
  return dateB.getTime() - dateA.getTime() // מהחדש לישן
}
