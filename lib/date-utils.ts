/**
 * Utilities להמרת תאריכים עבריים ל-Date objects
 */

/**
 * ממיר תאריך עברי לפורמט 'DD MMMM YYYY' ל-Date object
 * דוגמאות: '25 בינואר 2025', '15 במרץ 2024'
 */
export function parseHebrewDate(hebrewDate: string): Date {
  // מיפוי חודשים עבריים לאנגליים
  const monthMap: Record<string, number> = {
    'ינואר': 0,
    'פברואר': 1,
    'מרץ': 2,
    'מרס': 2, // חלופה
    'אפריל': 3,
    'מאי': 4,
    'יוני': 5,
    'יולי': 6,
    'אוגוסט': 7,
    'ספטמבר': 8,
    'אוקטובר': 9,
    'נובמבר': 10,
    'דצמבר': 11,
  }

  // הסרת המילה "ב" אם קיימת (כמו "בינואר" -> "ינואר")
  const cleanedDate = hebrewDate.replace(/^ב/, '').trim()
  
  // פירוק התאריך: יום, חודש, שנה
  // פורמט: "25 בינואר 2025" או "25 ינואר 2025"
  const parts = cleanedDate.split(/\s+/)
  
  if (parts.length < 3) {
    // אם לא הצלחנו לפרק, נחזיר תאריך נוכחי
    console.warn(`לא הצלחתי לפרק את התאריך: ${hebrewDate}`)
    return new Date()
  }

  const day = parseInt(parts[0], 10)
  const monthName = parts[1].replace(/^ב/, '') // הסרת "ב" אם קיימת
  const year = parseInt(parts[2], 10)

  const month = monthMap[monthName]
  
  if (month === undefined) {
    console.warn(`חודש לא מזוהה: ${monthName} בתאריך: ${hebrewDate}`)
    return new Date()
  }

  if (isNaN(day) || isNaN(year)) {
    console.warn(`תאריך לא תקין: ${hebrewDate}`)
    return new Date()
  }

  return new Date(year, month, day)
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
