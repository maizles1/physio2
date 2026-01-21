# בדיקת הגדרת Web3Forms

## בדיקה מהירה

### 1. בדיקה מקומית (Development)

הרץ את הפקודה הבאה:
```bash
npm run dev
```

ואז:
1. לך ל-`http://localhost:3000/contact`
2. פתח את ה-Console בדפדפן (F12 → Console)
3. פתח את ה-Terminal שבו רץ השרת
4. נסה לשלוח טופס
5. בדוק את ה-logs ב-Console וב-Terminal

**מה לחפש:**
- ב-Terminal: האם רואים `accessKeyPreview: "508775fc..."`?
- ב-Terminal: האם רואים `payloadHasAccessKey: true`?
- ב-Console: מה השגיאה המדויקת?

### 2. בדיקה ב-Production (Vercel)

1. לך ל-Vercel Dashboard → Project → Settings → Environment Variables
2. ודא שיש משתנה:
   - **Name**: `WEB3FORMS_ACCESS_KEY`
   - **Value**: `508775fc-382e-4616-97d8-c21fa7e907ea`
   - **Environment**: Production ✓
3. אם אין - הוסף אותו
4. אם יש - ודא שהערך נכון (ללא רווחים)
5. **חשוב**: בצע Redeploy לאחר הוספת/עדכון המשתנה

### 3. בדיקת Logs ב-Vercel

1. לך ל-Vercel Dashboard → Deployments
2. לחץ על ה-deployment האחרון
3. לך ל-Functions → `/api/contact`
4. נסה לשלוח טופס
5. בדוק את ה-Logs - מה כתוב שם?

## פתרון בעיות נפוצות

### "Invalid or missing API key" ב-Production

**סיבות אפשריות:**
1. המשתנה לא מוגדר ב-Vercel
2. המשתנה מוגדר אבל לא בוצע Redeploy
3. המשתנה מוגדר בשם שגוי (למשל `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` במקום `WEB3FORMS_ACCESS_KEY`)
4. יש רווחים בערך של המשתנה

**פתרון:**
1. ודא שהמשתנה `WEB3FORMS_ACCESS_KEY` קיים ב-Vercel
2. ודא שהערך הוא בדיוק: `508775fc-382e-4616-97d8-c21fa7e907ea` (ללא רווחים)
3. בצע Redeploy
4. בדוק את ה-Logs ב-Vercel

### "Invalid or missing API key" ב-Development

**סיבות אפשריות:**
1. הקובץ `.env.local` לא קיים
2. המשתנה לא מוגדר ב-`.env.local`
3. השרת לא רענן את ה-environment variables

**פתרון:**
1. ודא שקיים קובץ `.env.local` בתיקיית השורש
2. ודא שיש בו: `WEB3FORMS_ACCESS_KEY=508775fc-382e-4616-97d8-c21fa7e907ea`
3. עצור את השרת (Ctrl+C) והפעל מחדש: `npm run dev`

## בדיקת Access Key

האם ה-access key תקין? בדוק ב-Web3Forms Dashboard:
1. לך ל: https://web3forms.com
2. התחבר לחשבון שלך
3. בדוק את ה-Access Key שלך
4. ודא שהוא תואם ל: `508775fc-382e-4616-97d8-c21fa7e907ea`

## בדיקת Network Request

בדפדפן:
1. פתח DevTools (F12)
2. לך ל-Network tab
3. נסה לשלוח טופס
4. חפש את הבקשה ל-`/api/contact`
5. לחץ עליה ובדוק:
   - Request Payload - האם יש `access_key`?
   - Response - מה השגיאה המדויקת?
