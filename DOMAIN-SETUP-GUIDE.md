# מדריך הגדרת דומיין ב-Vercel

## הבעיה: האתר לא עולה בדומיין החדש

אם Vercel פעיל אבל הדומיין החדש לא עובד, זה בדרך כלל בגלל אחת מהסיבות הבאות:

## שלב 1: הוסף את הדומיין ב-Vercel Dashboard

1. **לך ל-Vercel Dashboard:**
   - https://vercel.com/dashboard
   - בחר את הפרויקט שלך

2. **לך להגדרות הדומיין:**
   - לחץ על **Settings** (הגדרות)
   - לחץ על **Domains** (דומיינים) בתפריט הצד

3. **הוסף את הדומיין החדש:**
   - לחץ על **Add Domain** (הוסף דומיין)
   - הזן את הדומיין שלך (למשל: `yourdomain.com`)
   - לחץ **Add**

4. **הוסף גם את הגרסה עם www:**
   - הוסף גם `www.yourdomain.com` אם זה רלוונטי

## שלב 2: הגדר DNS Records

Vercel ייתן לך את ה-DNS records שצריך להוסיף. בדרך כלל:

### אופציה A: CNAME Record (מומלץ)
```
Type: CNAME
Name: @ (או www)
Value: cname.vercel-dns.com
```

### אופציה B: A Records
```
Type: A
Name: @
Value: 76.76.21.21
```

**איפה להוסיף:**
- לך ל-registrar של הדומיין שלך (למשל: GoDaddy, Namecheap, וכו')
- מצא את ה-DNS Settings
- הוסף את ה-records ש-Vercel נתן לך

## שלב 3: המתן ל-DNS Propagation

- DNS propagation יכול לקחת **15 דקות עד 48 שעות**
- בדרך כלל זה לוקח **1-2 שעות**
- תוכל לבדוק את הסטטוס ב-Vercel Dashboard

## שלב 4: הוסף את הדומיין ל-Environment Variables

1. **ב-Vercel Dashboard:**
   - Settings → Environment Variables

2. **עדכן את `ALLOWED_ORIGINS`:**
   ```
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com,https://physiotherapy.plus,https://www.physiotherapy.plus
   ```
   
   **או הוסף דומיין חדש:**
   ```
   ALLOWED_ORIGINS=https://physiotherapy.plus,https://www.physiotherapy.plus,https://yourdomain.com,https://www.yourdomain.com
   ```

3. **Redeploy את הפרויקט:**
   - לחץ על **Deployments**
   - לחץ על ה-deployment האחרון
   - לחץ **Redeploy**

## שלב 5: בדוק את הסטטוס

### בדיקות מהירות:

1. **בדוק ב-Vercel Dashboard:**
   - Settings → Domains
   - צריך לראות ✅ (סמל ירוק) ליד הדומיין

2. **בדוק DNS:**
   ```bash
   # בטרמינל
   nslookup yourdomain.com
   # או
   dig yourdomain.com
   ```

3. **בדוק את האתר:**
   - נסה לגשת ל-`https://yourdomain.com`
   - אם אתה רואה שגיאת SSL, זה אומר שה-DNS עובד אבל ה-SSL עדיין לא מוכן

## בעיות נפוצות ופתרונות

### בעיה: "Invalid Configuration"
**פתרון:** ודא שה-DNS records מוגדרים נכון

### בעיה: "DNS Not Configured"
**פתרון:** 
- בדוק שה-DNS records נוספו ב-registrar
- המתן ל-propagation (עד 48 שעות)

### בעיה: "SSL Certificate Pending"
**פתרון:**
- זה נורמלי! Vercel מנפיק SSL אוטומטית
- זה יכול לקחת עד 24 שעות
- בדרך כלל זה קורה תוך כמה דקות

### בעיה: האתר עובד אבל API לא עובד
**פתרון:**
- ודא שהוספת את הדומיין ל-`ALLOWED_ORIGINS`
- Redeploy את הפרויקט

### בעיה: "Domain Already in Use"
**פתרון:**
- הדומיין כבר קשור לפרויקט אחר ב-Vercel
- הסר אותו מהפרויקט הקודם או העבר אותו

## בדיקת תקינות

לאחר שהכל מוגדר, בדוק:

1. ✅ הדומיין מופיע ב-Vercel Dashboard עם ✅ ירוק
2. ✅ `https://yourdomain.com` עובד
3. ✅ `https://www.yourdomain.com` עובד (אם הוספת)
4. ✅ SSL Certificate פעיל (🔒 ב-address bar)
5. ✅ API routes עובדים (אם יש)

## מה לעשות עכשיו?

1. **הוסף את הדומיין ב-Vercel Dashboard** (שלב 1)
2. **הגדר DNS** (שלב 2)
3. **הוסף ל-ALLOWED_ORIGINS** (שלב 4)
4. **המתן 1-2 שעות** ל-propagation
5. **בדוק שוב**

אם אחרי 24 שעות זה עדיין לא עובד, שלח לי:
- שם הדומיין
- מה אתה רואה ב-Vercel Dashboard
- מה השגיאה שאתה מקבל






