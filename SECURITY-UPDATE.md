# עדכון אבטחה - CVE-2025-66478

## ⚠️ אזהרת אבטחה קריטית

נמצאה פגיעות אבטחה קריטית ב-Next.js (CVE-2025-66478) עם דרגת חומרה מקסימלית (CVSS 10.0).

## מה הבעיה?

הפגיעות מאפשרת ביצוע קוד מרחוק (RCE) על השרת ללא אימות, דרך React Server Components.

## גרסאות שנפגעו:

- Next.js 15.x (כל הגרסאות עד 15.0.4)
- Next.js 16.x (כל הגרסאות עד 16.0.6)
- Next.js 14.3.0-canary.77 ומעלה

## גרסאות מתוקנות:

- **Next.js 15.0.5** (עבור 15.0.x)
- **Next.js 15.1.9** (עבור 15.1.x)
- **Next.js 15.2.6** (עבור 15.2.x)
- **Next.js 15.3.6** (עבור 15.3.x)
- **Next.js 15.4.8** (עבור 15.4.x)
- **Next.js 15.5.7** (עבור 15.5.x)
- **Next.js 16.0.7** (עבור 16.0.x) ✅ **זה מה שעדכנו**

## מה נעשה?

עדכנו את Next.js מ-`16.0.5` ל-`16.0.7` (הגרסה המתוקנת).

## מה לעשות עכשיו?

### 1. עדכן את ה-dependencies:
```bash
cd /Users/andrey/Documents/physio2
npm install
```

זה יתקין את Next.js 16.0.7.

### 2. בדוק שהכל עובד:
```bash
npm run build
npm start
```

### 3. העלה ל-GitHub ו-Vercel:
```bash
git add package.json package-lock.json
git commit -m "Security: Update Next.js to 16.0.7 to fix CVE-2025-66478"
git push
```

Vercel יתעדכן אוטומטית.

## חשוב מאוד:

- ⚠️ **זה עדכון אבטחה קריטי** - אל תדחה אותו!
- ⚠️ הפגיעות כבר מנוצלת בטבע - עדכן מיד!
- ✅ אין דרך לעקוף את הבעיה - רק עדכון יעזור

## מידע נוסף:

- [Next.js Security Advisory](https://nextjs.org/blog/CVE-2025-66478)
- [CVE-2025-66478 Details](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2025-66478)

## בדיקה:

לאחר העדכון, ודא שהגרסה נכונה:
```bash
npm list next
```

צריך לראות: `next@16.0.7`







