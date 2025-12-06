# קליניקת הפיזיותרפיה - אתר מקצועי

אתר מקצועי מקיף לקליניקת פיזיותרפיה, המבוסס על עקרונות העיצוב של אתרים רפואיים מובילים.

## תכונות

### דפים עיקריים
- **דף בית** - Hero section, הצגת שירותים, עדויות, מידע על הקליניקה
- **אודות** - מידע על הקליניקה, הצוות והחזון
- **שירותים** - פירוט מלא של כל השירותים המוצעים
- **בלוג** - מאמרים מקצועיים וטיפים
- **עדויות** - ביקורות מ-Google My Business + ביקורות מקומיות
- **FAQ** - שאלות נפוצות עם תשובות מפורטות
- **צור קשר** - טופס יצירת קשר ופרטי התקשרות
- **קביעת תור** - טופס מקוון לקביעת תורים

### תכונות מתקדמות
- ✅ **ביקורות מ-Google My Business** - טעינה אוטומטית והצגת ביקורות מ-Google Places API
- ✅ **קישור להשארת ביקורת** - כפתור שמאפשר ללקוחות להשאיר ביקורת ב-Google עם מעבר אוטומטי חזרה לאתר
- ✅ **Structured Data** - Review Schema (JSON-LD) ל-SEO מיטבי

### תכונות עיצוב
- ✅ עיצוב רספונסיבי מלא (מובייל, טאבלט, דסקטופ)
- ✅ תמיכה בעברית עם כיוון RTL
- ✅ Header עם ניווט מלא ותפריט נפתח
- ✅ Footer מפורט עם קישורים ומידע
- ✅ צבעים מקצועיים ומודרניים
- ✅ אנימציות ועיצוב מודרני

## התקנה

```bash
npm install
```

## הרצה מקומית

```bash
npm run dev
```

פתח [http://localhost:3000](http://localhost:3000) בדפדפן.

## בנייה לייצור

```bash
npm run build
npm start
```

## טכנולוגיות

- **Next.js 16** - מסגרת React עם Server Components
- **TypeScript** - תכנות מונחה טיפוסים
- **Tailwind CSS 4** - עיצוב מודרני ורספונסיבי
- **App Router** - מערכת ניתוב מתקדמת של Next.js

## מבנה הפרויקט

```
physio2/
├── app/                  # דפים (App Router)
│   ├── about/           # דף אודות
│   ├── services/        # דף שירותים
│   ├── blog/            # דף בלוג
│   ├── testimonials/    # דף עדויות
│   ├── faq/             # דף שאלות נפוצות
│   ├── contact/         # דף צור קשר
│   ├── appointment/     # דף קביעת תור
│   ├── layout.tsx       # Layout ראשי
│   └── page.tsx         # דף בית
├── components/          # קומפוננטות
│   ├── Header.tsx       # Header עם ניווט
│   ├── Footer.tsx       # Footer
│   ├── HeroSection.tsx  # Hero section לדף הבית
│   ├── ServicesPreview.tsx
│   ├── AboutPreview.tsx
│   ├── TestimonialsPreview.tsx
│   └── CTASection.tsx
└── public/              # קבצים סטטיים
```

## התאמה אישית

### שינוי פרטי קשר
עדכן את פרטי הקשר בקובץ `components/Header.tsx`:
- מספר טלפון
- כתובת אימייל
- כתובת פיזית
- שעות פעילות

### הוספת תמונות
הוסף תמונות לתיקייה `public/images/` והשתמש בהן בקומפוננטות.

### שינוי צבעים
עדכן את הצבעים בקובץ `app/globals.css` או ישירות בקומפוננטות באמצעות Tailwind.

### הגדרת Google My Business Reviews
כדי להציג ביקורות מ-Google My Business באתר:
1. ראה את המדריך המפורט ב-`GOOGLE-BUSINESS-SETUP.md`
2. הגדר משתני סביבה בקובץ `.env.local`:
   - `NEXT_PUBLIC_GOOGLE_PLACE_ID` - Place ID של העסק
   - `GOOGLE_MAPS_API_KEY` - API Key ל-Google Places API

## משאבים

- [תיעוד Next.js](https://nextjs.org/docs) - למד על תכונות Next.js
- [Tailwind CSS](https://tailwindcss.com/docs) - תיעוד Tailwind CSS

## פריסה ב-Vercel

הדרך הקלה ביותר לפרוס את האפליקציה היא באמצעות [Vercel Platform](https://vercel.com/new).

פשוט חבר את ה-repository שלך ל-Vercel והוא יזהה את Next.js ויפרוס את האתר אוטומטית.
