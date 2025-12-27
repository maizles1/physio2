# הוראות להגדרת SEO Monitoring

מדריך להגדרת מערכת ניטור SEO עם דוחות שבועיים אוטומטיים.

## 📋 דרישות מוקדמות

### 1. התקנת Dependencies

```bash
npm install
```

זה יתקין את כל ה-dependencies הנדרשים:
- `lighthouse` - לבדיקת Lighthouse
- `chrome-launcher` - להרצת Chrome headless
- `nodemailer` - לשליחת אימייל
- `node-fetch` - לביצוע HTTP requests
- `cheerio` - לפרסור HTML
- `node-cron` - להרצה אוטומטית

### 2. הגדרת משתני סביבה

צור קובץ `.env.local` (או עדכן את `.env` הקיים):

```env
# Email Configuration
SEO_REPORT_EMAIL_FROM=noreply@physiotherapy.plus
SEO_REPORT_EMAIL_TO=your-email@example.com,another-email@example.com

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Google PageSpeed Insights API (אופציונלי)
GOOGLE_PAGESPEED_API_KEY=your-api-key-here
```

### 3. הגדרת Gmail (אם משתמשים ב-Gmail)

אם אתה משתמש ב-Gmail לשליחת אימיילים:

1. הפעל "2-Step Verification" בחשבון Google שלך
2. צור "App Password":
   - לך ל: https://myaccount.google.com/apppasswords
   - צור App Password חדש
   - העתק את הסיסמה (16 תווים)
   - השתמש בה ב-`SMTP_PASS`

### 4. קבלת Google PageSpeed Insights API Key (אופציונלי)

1. לך ל: https://console.cloud.google.com/
2. צור project חדש (או בחר קיים)
3. הפעל את "PageSpeed Insights API"
4. צור API Key
5. העתק את ה-API Key ל-`.env.local`

---

## 🚀 הרצה ידנית

### הרצת בדיקת SEO בלבד:

```bash
npm run seo-audit
```

זה יריץ את הבדיקה וישמור את התוצאות ב-`reports/seo-audit-[timestamp].json`

### שליחת דוח באימייל:

```bash
npm run seo-report
```

זה ישלח דוח HTML מפורט באימייל (דורש הרצת `seo-audit` קודם)

### הרצה מלאה (בדיקה + דוח):

```bash
npm run seo-monitor
```

זה יריץ בדיקה מלאה וישלח דוח באימייל.

---

## ⏰ הגדרת Cron Job (הרצה אוטומטית)

### Linux/Mac:

1. פתח את crontab:
```bash
crontab -e
```

2. הוסף את השורה הבאה (הרצה כל יום ראשון בשעה 9:00):
```bash
0 9 * * 0 cd /path/to/physio2 && /usr/bin/node scripts/seo-monitoring.js >> /path/to/physio2/logs/seo-monitoring.log 2>&1
```

**החלף:**
- `/path/to/physio2` - הנתיב המלא לפרויקט
- `/usr/bin/node` - הנתיב ל-Node.js (בדוק עם `which node`)

### דוגמה מלאה:

```bash
# SEO Monitoring - כל יום ראשון בשעה 9:00
0 9 * * 0 cd /Users/andrey/Documents/physio2 && /usr/local/bin/node scripts/seo-monitoring.js >> /Users/andrey/Documents/physio2/logs/seo-monitoring.log 2>&1
```

### Windows (Task Scheduler):

1. פתח Task Scheduler
2. צור Task חדש
3. הגדר:
   - **Trigger**: Weekly, Sunday, 9:00 AM
   - **Action**: Start a program
   - **Program**: `node`
   - **Arguments**: `scripts/seo-monitoring.js`
   - **Start in**: `C:\path\to\physio2`

---

## 🔧 הגדרת Cron Job עם PM2 (מומלץ)

אם אתה משתמש ב-PM2 לניהול Node.js:

1. התקן PM2 (אם עדיין לא):
```bash
npm install -g pm2
```

2. צור קובץ `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'seo-monitoring',
    script: 'scripts/seo-monitoring.js',
    cron_restart: '0 9 * * 0', // כל יום ראשון בשעה 9:00
    autorestart: false,
    env: {
      NODE_ENV: 'production'
    }
  }]
}
```

3. התחל עם PM2:
```bash
pm2 start ecosystem.config.js
```

4. שמור את ה-configuration:
```bash
pm2 save
pm2 startup
```

---

## 📧 בדיקת הגדרות אימייל

לבדוק שהאימייל עובד, תוכל להריץ:

```bash
node -e "
const { sendEmailReport } = require('./scripts/seo-email-report');
const testResults = [{
  url: 'https://physiotherapy.plus',
  timestamp: new Date().toISOString(),
  lighthouse: { scores: { performance: 95, accessibility: 90, bestPractices: 90, seo: 95 } },
  metaTags: { hasIssues: false },
  structuredData: { count: 3, hasIssues: false },
  brokenLinks: { hasIssues: false }
}];
sendEmailReport(testResults).then(() => console.log('Email sent!')).catch(console.error);
"
```

---

## 📁 מבנה הקבצים

```
/scripts
  /seo-audit.js          # סקריפט לבדיקת SEO
  /seo-email-report.js   # שליחת דוח באימייל
  /seo-monitoring.js     # wrapper להרצה אוטומטית

/config
  /seo-monitoring.config.ts  # קונפיגורציה

/reports
  /seo-audit-[timestamp].json  # תוצאות בדיקות (נוצר אוטומטית)

/logs
  /seo-monitoring.log     # לוגים (אם משתמשים ב-cron)
```

---

## ⚙️ התאמה אישית

### שינוי תדירות הבדיקה:

ערוך `config/seo-monitoring.config.ts`:

```typescript
cron: {
  enabled: true,
  schedule: '0 9 * * 0', // כל יום ראשון בשעה 9:00
}
```

**דוגמאות ל-cron expressions:**
- `0 9 * * 0` - כל יום ראשון בשעה 9:00
- `0 9 * * 1` - כל יום שני בשעה 9:00
- `0 9 1 * *` - כל יום ראשון בחודש בשעה 9:00
- `0 */6 * * *` - כל 6 שעות

### שינוי עמודים לבדיקה:

ערוך `config/seo-monitoring.config.ts`:

```typescript
pagesToCheck: [
  '/',
  '/about',
  '/services',
  '/blog',
  '/contact',
  '/faq',
  '/testimonials',
  // הוסף עמודים נוספים כאן
],
```

### שינוי ספים (Thresholds):

ערוך `config/seo-monitoring.config.ts`:

```typescript
thresholds: {
  performance: 90,    // 0-100
  accessibility: 90,
  bestPractices: 90,
  seo: 95,
  pageSpeed: 90,
}
```

---

## 🐛 פתרון בעיות

### בעיה: "Chrome not found"
**פתרון**: התקן Chrome או Chrome Headless:
```bash
# Mac
brew install --cask google-chrome

# Linux
sudo apt-get install google-chrome-stable
```

### בעיה: "Email not sending"
**פתרון**:
1. בדוק את הגדרות SMTP ב-`.env.local`
2. ודא ש-App Password נכון (אם Gmail)
3. בדוק את ה-logs

### בעיה: "PageSpeed API error"
**פתרון**:
1. ודא ש-API Key נכון
2. ודא שה-API מופעל ב-Google Cloud Console
3. בדוק את ה-quota של ה-API

### בעיה: "Cron not running"
**פתרון**:
1. בדוק את ה-path ל-Node.js: `which node`
2. בדוק את ה-path לפרויקט
3. בדוק את ה-permissions
4. בדוק את ה-logs: `tail -f logs/seo-monitoring.log`

---

## 📊 קריאת התוצאות

### קבצי JSON:

התוצאות נשמרות ב-`reports/seo-audit-[timestamp].json`

כל קובץ כולל:
- תוצאות Lighthouse (performance, accessibility, best-practices, seo)
- תוצאות PageSpeed Insights
- בדיקת Meta Tags
- בדיקת Structured Data
- בדיקת Broken Links

### דוחות אימייל:

הדוחות נשלחים באימייל בפורמט HTML מפורט עם:
- סיכום כללי
- תוצאות לפי עמוד
- התראות על בעיות
- המלצות לשיפור

---

## ✅ Checklist להגדרה

- [ ] התקנתי את כל ה-dependencies (`npm install`)
- [ ] יצרתי/עדכנתי את `.env.local` עם הגדרות אימייל
- [ ] הגדרתי Gmail App Password (אם משתמשים ב-Gmail)
- [ ] קיבלתי Google PageSpeed API Key (אופציונלי)
- [ ] בדקתי שהסקריפט עובד (`npm run seo-audit`)
- [ ] בדקתי שהאימייל עובד (`npm run seo-report`)
- [ ] הגדרתי cron job (או PM2)
- [ ] בדקתי שה-cron job עובד

---

## 📞 תמיכה

אם יש בעיות:
1. בדוק את ה-logs
2. בדוק את ה-console output
3. ודא שכל ה-dependencies מותקנים
4. ודא שכל ה-environment variables מוגדרים

---

**תאריך עדכון**: ינואר 2025









