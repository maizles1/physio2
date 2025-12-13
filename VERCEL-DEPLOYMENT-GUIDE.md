# מדריך פריסה ל-Vercel - פתרון בעיות

## מה הבעיה הספציפית שאתה רואה?

### שגיאת Build
אם אתה רואה שגיאת build, זה יכול להיות בגלל:
- Dependencies שלא מותקנים
- שגיאות TypeScript
- קבצים חסרים

**פתרון:**
1. בדוק את ה-logs ב-Vercel dashboard
2. הרץ `npm run build` מקומית כדי לראות את השגיאה
3. תקן את השגיאות

### שגיאת Dependencies
אם יש בעיה עם dependencies כמו `lighthouse` או `chrome-launcher`:

**פתרון:** אלה לא נדרשים ל-build. הם רק ב-scripts. Vercel צריך רק:
- `next`
- `react`
- `react-dom`
- `typescript`

### שגיאת Environment Variables
אם אתה רואה שגיאות על משתני סביבה:

**פתרון:**
1. לך ל-Vercel Dashboard → Project → Settings → Environment Variables
2. הוסף:
   - `NEXT_PUBLIC_GOOGLE_PLACE_ID` = ה-Place ID שלך
   - `GOOGLE_MAPS_API_KEY` = ה-API Key שלך

### שגיאת קבצים גדולים
אם יש קבצים גדולים מדי:

**פתרון:**
- Vercel מגביל קבצים ל-100MB
- בדוק אם יש תמונות גדולות ב-`public/images/`
- אפשר לדחוס תמונות או להעלות אותן ל-CDN

## שלבים לפריסה ב-Vercel

### שלב 1: התחבר ל-Vercel
1. לך ל: https://vercel.com
2. לחץ "Sign Up" או "Log In"
3. בחר "Continue with GitHub"
4. אשר את ההרשאות

### שלב 2: ייבא את הפרויקט
1. לחץ "Add New Project"
2. בחר את ה-repository: `maizles1/physio2`
3. Vercel יזהה אוטומטית Next.js

### שלב 3: הגדר Environment Variables
1. לפני ה-Deploy, לחץ "Environment Variables"
2. הוסף:
   ```
   NEXT_PUBLIC_GOOGLE_PLACE_ID = [ה-Place ID שלך]
   GOOGLE_MAPS_API_KEY = [ה-API Key שלך]
   ```
3. לחץ "Add" לכל אחד

### שלב 4: Deploy
1. לחץ "Deploy"
2. המתן לסיום ה-build (2-5 דקות)
3. תקבל URL לאתר החי

## פתרון בעיות נפוצות

### בעיה: "Build failed"
**פתרון:**
```bash
# הרץ מקומית כדי לראות את השגיאה
npm run build
```

### בעיה: "Module not found"
**פתרון:**
- ודא ש-`package.json` כולל את כל ה-dependencies
- הרץ `npm install` מקומית

### בעיה: "Environment variable missing"
**פתרון:**
- הוסף את כל ה-Environment Variables ב-Vercel Dashboard
- ודא שהם מתחילים ב-`NEXT_PUBLIC_` אם צריך להיות נגישים ב-client

### בעיה: "Function timeout"
**פתרון:**
- Vercel מגביל functions ל-10 שניות (בחינם)
- אם יש API routes איטיים, צריך לשפר אותם

## בדיקה מקומית לפני Deploy

לפני העלאה ל-Vercel, ודא שהכל עובד מקומית:

```bash
# התקן dependencies
npm install

# הרץ build
npm run build

# הרץ production
npm start
```

אם הכל עובד מקומית, זה אמור לעבוד גם ב-Vercel.

## מה השגיאה המדויקת שאתה רואה?

שלח את השגיאה המדויקת מ-Vercel dashboard ואני אעזור לפתור אותה.


