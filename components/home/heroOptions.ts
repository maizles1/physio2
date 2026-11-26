// TEMPORARY: list of hero options for the owner's preview pages. Remove with app/preview-home before merging.
import type { HeroVisualKind } from '@/components/home/HeroVisual'

export const heroOptions: { kind: HeroVisualKind; name: string; text: string }[] = [
  { kind: 'fullbleed', name: 'תמונה גדולה ברקע', text: 'תמונת טיפול על כל הרוחב, והכיתוב מעליה.' },
  { kind: 'photo', name: 'תמונה במסגרת', text: 'תמונת טיפול בכרטיס מעוגל, עם דירוג גוגל.' },
  { kind: 'collage', name: 'קולאז׳ תמונות', text: 'שלוש תמונות טיפול: ברך, צוואר ושיקום.' },
  { kind: 'chips', name: 'כפתורי "מה כואב לך?"', text: 'שישה כפתורים עם תמונה קטנה. לחיצה מובילה לעמוד הטיפול.' },
  { kind: 'body', name: 'מפת גוף', text: 'ציור של גוף עם נקודות. לחיצה על תווית מובילה לעמוד הטיפול.' },
  { kind: 'stats', name: 'מספרים גדולים', text: 'בלי תמונה: 5.0 בגוגל, 5000+ מטופלים, תור תוך 24–48 שעות.' },
  { kind: 'logo', name: 'הלוגו של הקליניקה', text: 'הלוגו במרכז, עם טבעות אור שמתרחבות סביבו.' },
]
