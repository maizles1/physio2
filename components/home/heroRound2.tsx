import { HeroBold } from '@/components/home/HeroConcepts'
// TEMPORARY: round 2 hero designs for the owner's preview pages. Remove with app/preview-home before merging.
import { HeroDark, HeroFinder, HeroLight, HeroReviews, HeroRotating, HeroRotatingPhoto } from '@/components/home/HeroDesigns'

export const heroRound2 = [
  { key: 'bold', name: 'נייר + תמונה בצד', text: 'העיצוב שאישרת: רקע נייר, אותיות ענקיות ותמונה מודבקת בצד.', Hero: () => <HeroBold />, highlights: false },
  { key: 'bold-ink', name: 'שחור-צהוב', text: 'אותו מבנה, על רקע שחור עם הדגשות צהובות. הכי "ספורט".', Hero: () => <HeroBold theme="ink" />, highlights: false },
  { key: 'bold-blue-poster', name: 'פוסטר כחול', text: 'רקע בכחול של הלוגו, כותרת ענקית לכל הרוחב ותמונה רחבה מתחתיה.', Hero: () => <HeroBold theme="blue" layout="poster" />, highlights: false },
  { key: 'bold-stats', name: 'מספרים גדולים, בלי תמונה', text: 'רקע נייר, ובמקום תמונה: 5.0 בגוגל, 24–48 שעות ו-5000+ מטופלים באותיות ענקיות.', Hero: () => <HeroBold layout="stats" />, highlights: false },
  { key: 'bold-ink-poster', name: 'פוסטר שחור', text: 'רקע שחור, כותרת ענקית לכל הרוחב ותמונה רחבה.', Hero: () => <HeroBold theme="ink" layout="poster" />, highlights: false },
  { key: 'rotating-photo', name: 'כותרת מתחלפת + תמונת טיפול', text: 'עיצוב 3 שבחרת, עם תמונת טיפול למעלה. התמונה זמנית עד שתשלח תמונה שלך.', Hero: HeroRotatingPhoto },
  { key: 'light', name: 'בהיר ונקי', text: 'רקע לבן, תמונה בצורת קשת וכרטיסים קטנים שמרחפים.', Hero: HeroLight },
  { key: 'dark', name: 'כהה וספורטיבי', text: 'רקע כהה, כותרת ענקית "שיקום ברמה אולימפית." ותמונת ספורטאי.', Hero: HeroDark },
  { key: 'rotating', name: 'כותרת שמתחלפת', text: '"לחזור ___ בלי כאב", המילה באמצע מתחלפת: לרוץ, לעבודה, לישון טוב...', Hero: HeroRotating },
  { key: 'finder', name: 'חיפוש כמו באתר הזמנות', text: 'בוחרים מה כואב, ונפתח WhatsApp עם הבעיה כבר כתובה.', Hero: HeroFinder },
  { key: 'reviews', name: 'ביקורות זזות', text: 'פס של ביקורות אמיתיות מגוגל שזז לאט לרוחב המסך.', Hero: HeroReviews },
]
