// TEMPORARY: round 2 hero designs for the owner's preview pages. Remove with app/preview-home before merging.
import { HeroDark, HeroFinder, HeroLight, HeroReviews, HeroRotating } from '@/components/home/HeroDesigns'

export const heroRound2 = [
  { key: 'light', name: 'בהיר ונקי', text: 'רקע לבן, תמונה בצורת קשת וכרטיסים קטנים שמרחפים.', Hero: HeroLight },
  { key: 'dark', name: 'כהה וספורטיבי', text: 'רקע כהה, כותרת ענקית "שיקום ברמה אולימפית." ותמונת ספורטאי.', Hero: HeroDark },
  { key: 'rotating', name: 'כותרת שמתחלפת', text: '"לחזור ___ בלי כאב", המילה באמצע מתחלפת: לרוץ, לעבודה, לישון טוב...', Hero: HeroRotating },
  { key: 'finder', name: 'חיפוש כמו באתר הזמנות', text: 'בוחרים מה כואב, ונפתח WhatsApp עם הבעיה כבר כתובה.', Hero: HeroFinder },
  { key: 'reviews', name: 'ביקורות זזות', text: 'פס של ביקורות אמיתיות מגוגל שזז לאט לרוחב המסך.', Hero: HeroReviews },
]
