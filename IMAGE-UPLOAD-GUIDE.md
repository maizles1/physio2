# מדריך העלאת תמונות לאתר

## מיקום התמונות

כל התמונות צריכות להיות בתיקייה `public/images/` בתוך הפרויקט.

## מבנה התיקיות

```
/Users/andrey/Documents/physio2/
└── public/
    └── images/
        ├── andrey-meizels.jpg          ← תמונת אנדריי מייזלס (חובה)
        ├── logo/                       ← לוגואים
        │   └── clinic-logo.png         ← לוגו האתר שלך (אופציונלי)
        ├── carousel/                   ← תמונות לקרוסלה
        │   ├── clinic-1.jpg            ← חלל טיפול מקצועי
        │   ├── clinic-2.jpg            ← ציוד מקצועי
        │   ├── clinic-3.jpg            ← חדר טיפול
        │   ├── clinic-4.jpg            ← אזור המתנה
        │   └── clinic-5.jpg            ← תמונת קליניקה כללית
        ├── insurance/                  ← לוגואי קופות חולים וביטוחים
        │   ├── clalit-logo.svg         ← לוגו כללית
        │   ├── meuhedet-logo.svg       ← לוגו מאוחדת
        │   ├── private-insurance-logo.svg ← לוגו ביטוחים פרטיים
        │   └── ministry-of-defense-logo.svg ← לוגו משרד הביטחון
        └── videos/                     ← תמונות תצוגה לסרטונים (אופציונלי)
            ├── clinic-video.jpg
            ├── about-andrey.jpg
            └── success-story.jpg
```

## לוגואים

**📸 ראה מדריך מפורט:** `LOGO-UPLOAD-GUIDE.md`

### לוגו האתר
- **מיקום:** `public/images/logo/clinic-logo.png`
- מוצג ב-Header של כל הדפים
- מומלץ: PNG או SVG, רקע שקוף

### לוגואי קופות חולים וביטוחים
- **מיקום:** `public/images/insurance/`
- מוצגים ברובריקת "קופות חולים וביטוחים" בדף הבית

## הוראות העלאה

### 1. תמונת אנדריי מייזלס (חובה)

**מיקום:** `public/images/andrey-meizels.jpg`

**דרישות:**
- פורמט: JPG, PNG או WebP
- מומלץ: רזולוציה של לפחות 800x800 פיקסלים
- צורה: ריבוע או מלבן (האתר יעשה crop לעיגול)

**איך לעלות:**
1. פתח את Finder
2. נווט ל: `/Users/andrey/Documents/physio2/public/images/`
3. העתק את התמונה ושנה את השם ל: `andrey-meizels.jpg`

### 2. תמונות קרוסלה (מומלץ - 5 תמונות)

**מיקום:** `public/images/carousel/`

**שמות הקבצים:**
- `clinic-1.jpg` - חלל טיפול מקצועי
- `clinic-2.jpg` - ציוד מקצועי
- `clinic-3.jpg` - חדר טיפול
- `clinic-4.jpg` - אזור המתנה
- `clinic-5.jpg` - תמונת קליניקה כללית

**דרישות:**
- פורמט: JPG, PNG או WebP
- מומלץ: רזולוציה של לפחות 1920x1080 פיקסלים (16:9)
- יחס צדדים: 16:9 (האתר מכוון לזה)

**איך לעלות:**
1. פתח את Finder
2. נווט ל: `/Users/andrey/Documents/physio2/public/images/carousel/`
3. העתק את התמונות ושמור בשמות הנכונים

### 3. תמונות תצוגה לסרטונים (אופציונלי)

**מיקום:** `public/images/videos/`

**שמות הקבצים:**
- `clinic-video.jpg` - תמונת תצוגה לסרטון על הקליניקה
- `about-andrey.jpg` - תמונת תצוגה לסרטון על אנדריי
- `success-story.jpg` - תמונת תצוגה לסיפור הצלחה

## טיפים לאופטימיזציה

1. **גודל קובץ**: נסה לשמור קבצים קטנים יחסית (פחות מ-500KB לכל תמונה)
2. **פורמט**: JPG טוב לרוב התמונות, PNG אם יש שקיפות
3. **כיווץ**: אפשר להשתמש בכלים כמו TinyPNG או ImageOptim לפני העלאה

## מה קורה אם אין תמונה?

אם תמונה לא קיימת, האתר יציג placeholder (רקע צבעוני עם הודעה) עד שתעלה את התמונה.

## בדיקה שהתמונות עלו

אחרי העלאת התמונות:
1. עצור את השרת (אם הוא רץ) עם `Ctrl+C`
2. הפעל שוב: `npm run dev`
3. רענן את הדפדפן

התמונות אמורות להופיע אוטומטית!

## נתיבים מלאים

- תמונת אנדריי: `/Users/andrey/Documents/physio2/public/images/andrey-meizels.jpg`
- תיקיית קרוסלה: `/Users/andrey/Documents/physio2/public/images/carousel/`
- תיקיית סרטונים: `/Users/andrey/Documents/physio2/public/images/videos/`

