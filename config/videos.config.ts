/**
 * ============================================
 * קובץ הגדרת סרטוני YouTube - באמצעות משתני סביבה
 * ============================================
 * 
 * הוראות פשוטות:
 * 1. צור קובץ .env.local בתיקיית השורש של הפרויקט
 * 2. הוסף את קישורי ה-YouTube שלך:
 *    VIDEO_1_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
 *    VIDEO_2_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
 *    VIDEO_3_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
 * 3. שמור את הקובץ והפעל מחדש את השרת
 * 
 * כל סוג קישור יעבוד:
 * ✅ https://www.youtube.com/watch?v=VIDEO_ID
 * ✅ https://youtu.be/VIDEO_ID  
 * ✅ https://www.youtube.com/embed/VIDEO_ID
 * 
 * אם לא הגדרת משתני סביבה, האתר ישתמש ב-PLACEHOLDER.
 * ראה .env.example לדוגמה מלאה.
 */

export interface VideoConfig {
  title: string
  description: string
  youtubeUrl: string // קישור YouTube - כל סוג יעבוד!
}

// קריאת משתני סביבה - עם fallback ל-PLACEHOLDER אם לא הוגדרו
const getVideoUrl = (envVar: string | undefined, fallback: string = 'https://www.youtube.com/watch?v=PLACEHOLDER'): string => {
  if (!envVar || envVar.trim() === '' || envVar.includes('PLACEHOLDER')) {
    return fallback
  }
  return envVar.trim()
}

export const videosConfig: VideoConfig[] = [
  // ============================================
  // סרטון 1 - קליניקה לפיזיותרפיה
  // ============================================
  {
    title: 'קליניקה לפיזיותרפיה',
    description: 'סיור וירטואלי בקליניקת פיזיותרפיה.פלוס והכרות עם המרחב המקצועי',
    youtubeUrl: getVideoUrl(process.env.VIDEO_1_URL, 'https://youtu.be/vapxc4WxnVw?si=9DqE4KXnLCEMbY7X'),
  },

  // ============================================
  // סרטון 2 - סחרחורות
  // ============================================
  {
    title: 'טיפול בסחרחורות',
    description: 'מידע על טיפול ושיקום וסטיבולרי לטיפול בבעיות סחרחורות',
    youtubeUrl: getVideoUrl(process.env.VIDEO_2_URL, 'https://youtube.com/shorts/ksRucESMhBg?si=mi65US70Q4X7jjrx'),
  },

  // ============================================
  // סרטון 3 - ממליצים
  // ============================================
  {
    title: 'המלצות מטופלים',
    description: 'מה אומרים המטופלים על הטיפול בקליניקת פיזיותרפיה.פלוס',
    youtubeUrl: getVideoUrl(process.env.VIDEO_3_URL, 'https://youtube.com/shorts/z_WEEAvCYww?si=eAjPlhalpdaOdVAh'),
  },

  // ============================================
  // סרטון 4 - ייעוץ לפני ניתוח
  // ============================================
  {
    title: 'ייעוץ לפני ניתוח',
    description: 'ייעוץ מקצועי של פיזיותרפיסט לפני ניתוח להכנה מיטבית לשיקום',
    youtubeUrl: getVideoUrl(process.env.VIDEO_4_URL, 'https://youtube.com/shorts/Zfwxv37iXh4?si=3VHWHLuara9YU8hO'),
  },
]
