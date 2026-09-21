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

/**
 * Parse a Hebrew date without throwing and without falling back to "now".
 * Returns undefined for missing, unparseable, or invalid values.
 *
 * Examples: '25 בינואר 2025', '15 במרץ 2024'
 */
export function tryParseHebrewDate(value: unknown): Date | undefined {
  if (typeof value !== 'string' || !value.trim()) {
    return undefined
  }

  try {
    // הסרת המילה "ב" אם קיימת בתחילת המחרוזת
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

    const date = new Date(year, month, day)
    if (!isValidDate(date)) {
      return undefined
    }

    // Reject overflow dates such as 31 בפברואר (JS Date would roll into March)
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return undefined
    }

    return date
  } catch {
    return undefined
  }
}

/**
 * ממיר תאריך עברי לפורמט 'DD MMMM YYYY' ל-Date object
 * דוגמאות: '25 בינואר 2025', '15 במרץ 2024'
 */
export function parseHebrewDate(hebrewDate: string): Date {
  const parsed = tryParseHebrewDate(hebrewDate)
  if (parsed) {
    return parsed
  }

  console.warn(`לא הצלחתי לפרק את התאריך: ${hebrewDate}`)
  return new Date()
}

/**
 * ממיר תאריך עברי ל-ISO 8601 (YYYY-MM-DD) עבור schema.org ו-Open Graph.
 * לא משתמשים ב-toISOString כדי להימנע מהסטת יום בגלל אזור זמן.
 */
export function toIsoDate(hebrewDate: string): string {
  const d = parseHebrewDate(hebrewDate)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
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
