# בדיקת דומיין - מדריך אבחון

## מה הבעיה המדויקת?

אם האתר לא עולה בדומיין החדש, בואו נזהה את הבעיה:

### 1. בדוק את הסטטוס ב-Vercel Dashboard

1. לך ל: https://vercel.com/dashboard
2. בחר את הפרויקט שלך
3. לחץ על **Settings** → **Domains**
4. בדוק את הסטטוס של הדומיין:
   - ✅ **Valid Configuration** - הכל תקין
   - ⚠️ **Invalid Configuration** - יש בעיה ב-DNS
   - ⏳ **Pending** - ממתין ל-DNS propagation

### 2. בדוק DNS

**בטרמינל:**
```bash
# בדוק את ה-DNS records
nslookup yourdomain.com
# או
dig yourdomain.com
```

**מה לחפש:**
- אם אתה רואה `cname.vercel-dns.com` או IP של Vercel - זה תקין
- אם אתה רואה שגיאה או לא מוצא כלום - יש בעיה ב-DNS

### 3. בדוק את האתר ישירות

**נסה לגשת:**
- `https://yourdomain.com` - מה אתה רואה?
- `http://yourdomain.com` - מה קורה?

**שגיאות נפוצות:**
- **"This site can't be reached"** - בעיית DNS
- **"SSL Certificate Error"** - ממתין ל-SSL (זה נורמלי, יכול לקחת עד 24 שעות)
- **"404 Not Found"** - הדומיין לא מוגדר ב-Vercel
- **"Access Denied"** - בעיית CORS או אבטחה

### 4. בדוק את ה-Logs ב-Vercel

1. לך ל: **Deployments** → בחר את ה-Deployment האחרון
2. לחץ על **View Function Logs**
3. חפש שגיאות או אזהרות

### 5. בדוק Environment Variables

1. **Settings** → **Environment Variables**
2. ודא שיש:
   - `ALLOWED_ORIGINS` עם הדומיין החדש
   - כל המשתנים האחרים הנדרשים

### 6. נסה Redeploy

לפעמים פשוט צריך לעשות Redeploy:
1. **Deployments** → בחר את ה-Deployment האחרון
2. לחץ **Redeploy**

## פתרונות לפי סוג הבעיה

### בעיה: "Invalid Configuration" ב-Vercel

**פתרון:**
1. ודא שה-DNS records מוגדרים נכון ב-registrar
2. בדוק שה-CNAME מצביע ל-`cname.vercel-dns.com`
3. המתן 1-2 שעות ל-propagation

### בעיה: "SSL Certificate Pending"

**פתרון:**
- זה נורמלי! Vercel מנפיק SSL אוטומטית
- זה יכול לקחת עד 24 שעות
- בדרך כלל זה קורה תוך כמה דקות

### בעיה: האתר עובד אבל API לא עובד

**פתרון:**
1. עדכן את `ALLOWED_ORIGINS` ב-Environment Variables:
   ```
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com,https://physiotherapy.plus,https://www.physiotherapy.plus
   ```
2. Redeploy את הפרויקט

### בעיה: "Access Denied" או CORS Error

**פתרון:**
1. ודא שהדומיין ב-`ALLOWED_ORIGINS`
2. Redeploy
3. נסה לנקות את ה-cache של הדפדפן

## מה לשלוח לי כדי לעזור

אם עדיין לא עובד, שלח לי:

1. **שם הדומיין** (למשל: `example.com`)
2. **מה אתה רואה ב-Vercel Dashboard** (סטטוס הדומיין)
3. **מה השגיאה** שאתה רואה כשאתה מנסה לגשת לאתר
4. **הלוגים מ-Vercel** (אם יש שגיאות)

## בדיקה מהירה

הרץ את הפקודות הבאות בטרמינל:

```bash
# בדוק DNS
nslookup yourdomain.com

# בדוק אם האתר מגיב
curl -I https://yourdomain.com

# בדוק SSL
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
```

אם כל זה עובד אבל האתר עדיין לא עולה, הבעיה כנראה בקוד או בהגדרות Vercel.




