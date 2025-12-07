# פתרון בעיות Vercel - מדריך מפורט

## מה השגיאה המדויקת שאתה רואה?

### 1. שגיאת Build Failed

**תסמינים:**
- Build נכשל ב-Vercel
- רואה שגיאות ב-logs

**פתרונות:**

#### בדוק מקומית:
```bash
cd /Users/andrey/Documents/physio2
npm install
npm run build
```

אם זה לא עובד מקומית, תקן את השגיאות.

#### בעיות נפוצות:
- **TypeScript errors** - תקן שגיאות TypeScript
- **Missing dependencies** - הרץ `npm install`
- **Import errors** - בדוק ש-paths נכונים

### 2. שגיאת Environment Variables

**תסמינים:**
- האתר עובד אבל API לא עובד
- רואה שגיאות על משתני סביבה

**פתרון:**
1. לך ל-Vercel Dashboard
2. Project → Settings → Environment Variables
3. הוסף:
   - `NEXT_PUBLIC_GOOGLE_PLACE_ID` = [ה-Place ID שלך]
   - `GOOGLE_MAPS_API_KEY` = [ה-API Key שלך]
4. לחץ "Redeploy" כדי להחיל את השינויים

### 3. שגיאת Dependencies

**תסמינים:**
- Build נכשל בגלל dependencies
- שגיאות על `lighthouse` או `chrome-launcher`

**פתרון:**
- אלה כבר הועברו ל-devDependencies
- Vercel לא צריך אותם ל-build
- אם עדיין יש בעיה, אפשר להסיר אותם לחלוטין

### 4. שגיאת קבצים גדולים

**תסמינים:**
- Build נכשל בגלל קבצים גדולים
- שגיאה על file size limit

**פתרון:**
- Vercel מגביל קבצים ל-100MB
- בדוק תמונות גדולות ב-`public/images/`
- דחוס תמונות או העלה ל-CDN

### 5. שגיאת Timeout

**תסמינים:**
- Build לוקח יותר מדי זמן
- Function timeout

**פתרון:**
- בדוק אם יש API routes איטיים
- שפר את הביצועים
- Vercel (חינם) מגביל ל-10 שניות

### 6. בעיית דומיין - האתר לא עולה בדומיין החדש

**תסמינים:**
- Vercel פעיל אבל הדומיין החדש לא עובד
- האתר עובד ב-vercel.app אבל לא בדומיין המותאם אישית

**פתרון מהיר:**
1. **הוסף את הדומיין ב-Vercel:**
   - Settings → Domains → Add Domain
   - הזן את הדומיין שלך

2. **הגדר DNS:**
   - לך ל-registrar של הדומיין
   - הוסף את ה-DNS records ש-Vercel נתן לך
   - בדרך כלל: CNAME → `cname.vercel-dns.com`

3. **עדכן Environment Variables:**
   - Settings → Environment Variables
   - עדכן `ALLOWED_ORIGINS` לכלול את הדומיין החדש:
     ```
     ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com,https://physiotherapy.plus,https://www.physiotherapy.plus
     ```

4. **Redeploy:**
   - Deployments → Redeploy

5. **המתן:**
   - DNS propagation: 1-2 שעות (עד 48 שעות)
   - SSL Certificate: כמה דקות עד 24 שעות

**מדריך מפורט:** ראה `DOMAIN-SETUP-GUIDE.md`

## שלבים לפריסה מוצלחת

### שלב 1: בדיקה מקומית
```bash
npm install
npm run build
npm start
```

אם זה עובד מקומית, זה אמור לעבוד גם ב-Vercel.

### שלב 2: הגדר Environment Variables
ב-Vercel Dashboard:
- Settings → Environment Variables
- הוסף את כל המשתנים הנדרשים

### שלב 3: Deploy
- לחץ "Deploy"
- המתן לסיום
- בדוק את ה-logs אם יש שגיאות

## מה לעשות עכשיו?

1. **בדוק את ה-Logs ב-Vercel:**
   - לך ל-Deployments
   - לחץ על ה-Deployment האחרון
   - קרא את ה-Logs

2. **שלח לי את השגיאה המדויקת:**
   - העתק את השגיאה מה-Logs
   - שלח לי ואני אעזור לפתור

3. **או נסה Deploy מחדש:**
   - ב-Vercel Dashboard
   - לחץ "Redeploy"

## קבצים שנוצרו

יצרתי:
- `vercel.json` - תצורת Vercel
- `.vercelignore` - קבצים להתעלם מהם
- `VERCEL-DEPLOYMENT-GUIDE.md` - מדריך מפורט
- `VERCEL-TROUBLESHOOTING.md` - מדריך זה

## מה השגיאה המדויקת?

שלח את השגיאה המדויקת מ-Vercel ואני אעזור לפתור אותה.

