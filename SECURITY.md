# מדיניות אבטחה - פיזיותרפיה.פלוס

## סקירה כללית

מסמך זה מתאר את מדיניות האבטחה והשיטות המומלצות לאפליקציה.

## אמצעי אבטחה מיושמים

### 1. Security Headers

האתר משתמש ב-Security Headers הבאים:

- **X-Frame-Options: DENY** - מונע clickjacking
- **X-Content-Type-Options: nosniff** - מונע MIME type sniffing
- **Referrer-Policy: strict-origin-when-cross-origin** - שולט במידע שנשלח ב-Referer header
- **Permissions-Policy** - מגביל גישה ל-APIs של הדפדפן
- **Strict-Transport-Security (HSTS)** - כופה HTTPS
- **Content-Security-Policy (CSP)** - מגביל מקורות תוכן מותרים

### 2. Rate Limiting

- **Routes כלליים**: 100 בקשות לדקה לכל IP
- **API Routes**: 10 בקשות לדקה לכל IP
- Rate limiting מבוסס על IP address
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

### 3. API Authentication

- API routes מוגנים עם API Key authentication (ב-production)
- API Key נשלח דרך header: `X-API-Key` או query parameter: `apiKey`
- ה-API Key מוגדר ב-environment variable: `API_SECRET_KEY`

### 4. Error Handling

- ב-production: הודעות שגיאה גנריות (לא חושפות מידע רגיש)
- ב-development: הודעות שגיאה מפורטות
- Stack traces לא נשלחים ל-client

### 5. Input Validation & Sanitization

- כל ה-inputs עוברים sanitization
- Validation של email, phone, ו-formats אחרים
- הגבלת אורך inputs

### 6. CORS Configuration

- CORS מוגדר רק ל-domains מורשים
- Default: `https://physiotherapy.plus`, `https://www.physiotherapy.plus`
- ניתן להגדיר דרך `ALLOWED_ORIGINS` environment variable

## הגדרת Environment Variables

### משתנים נדרשים

```env
# Security
API_SECRET_KEY=your-strong-random-string-here

# Google Maps
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJ...
GOOGLE_MAPS_API_KEY=AIza...
```

### יצירת API Secret Key

```bash
# Generate a strong random key
openssl rand -hex 32
```

או:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## הגדרה ב-Vercel

1. לך ל-Vercel Dashboard → Project → Settings → Environment Variables
2. הוסף את כל המשתנים הנדרשים
3. **חשוב**: `API_SECRET_KEY` צריך להיות string חזק ואקראי
4. לחץ "Redeploy" כדי להחיל את השינויים

## Best Practices

### 1. API Keys

- **אל תפרסם API keys** - שמור אותם רק ב-environment variables
- **הגבל Google Maps API Key** - רק ל-APIs הנדרשים (Places API)
- **הגבל Domain** - אם אפשר, הגבל את ה-API Key לדומיין שלך בלבד
- **עקוב אחר השימוש** - בדוק ב-Google Cloud Console את השימוש

### 2. Secrets Management

- **אל תעלה `.env.local` ל-Git** - הקובץ כבר ב-`.gitignore`
- **השתמש ב-`.env.example`** - template ללא ערכים אמיתיים
- **ב-Production** - השתמש ב-Environment Variables של הפלטפורמה (Vercel)

### 3. Dependencies

- **עדכן dependencies באופן קבוע** - `npm audit` ו-`npm update`
- **עקוב אחר security advisories** - Next.js, React, וכו'
- **השתמש ב-`npm audit fix`** - לתיקון פגיעויות אוטומטיות

### 4. Monitoring

- **עקוב אחר logs** - בדוק שגיאות ב-Vercel Dashboard
- **Rate limiting alerts** - אם יש הרבה 429 responses
- **API usage** - עקוב אחר השימוש ב-Google APIs

## בדיקות אבטחה

### בדיקת Security Headers

```bash
curl -I https://physiotherapy.plus | grep -i "x-frame\|x-content\|strict-transport\|content-security"
```

### בדיקת Rate Limiting

```bash
# Make multiple rapid requests
for i in {1..15}; do curl -I https://physiotherapy.plus/api/reviews; done
# Should see 429 after 10 requests
```

### בדיקת API Authentication

```bash
# Without API key (should fail in production)
curl https://physiotherapy.plus/api/reviews

# With API key
curl -H "X-API-Key: your-api-key" https://physiotherapy.plus/api/reviews
```

## דיווח על פגיעויות

אם מצאת פגיעות אבטחה, אנא דווח ל:
- Email: [your-security-email]
- **אל תפרסם** פגיעויות בפומבי לפני תיקון

## עדכונים

- **Next.js 16.0.7** - תוקן CVE-2025-66478
- **Security Headers** - נוספו ב-[תאריך]
- **Rate Limiting** - נוסף ב-[תאריך]
- **API Authentication** - נוסף ב-[תאריך]

## משאבים

- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)








