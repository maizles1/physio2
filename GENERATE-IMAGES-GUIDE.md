# מדריך יצירת תמונות AI לשירותי הפיזיותרפיה

## סקירה כללית

האתר משתמש בתמונות JPG לכל סוג טיפול. התמונות נוצרות באמצעות AI או נלקחות ממאגרי תמונות.

## יצירת תמונות

### דרך מהירה (ללא API key)

**הסקריפט כבר מוכן לעבוד ללא API key!**

פשוט הרץ:
```bash
node scripts/generate-service-images.js
```

הסקריפט יוריד תמונות stock חינמיות מ-Unsplash ויצור 6 תמונות:
- `public/images/services/back-pain/service-image.jpg`
- `public/images/services/shoulder-pain/service-image.jpg`
- `public/images/services/neck-knee-pain/service-image.jpg`
- `public/images/services/post-surgery/service-image.jpg`
- `public/images/services/vestibular/service-image.jpg`
- `public/images/services/tmj/service-image.jpg`

### דרך מתקדמת (עם AI)

לתמונות AI מותאמות אישית:

1. **קבל API key מ-Replicate** (חינמי/זול):
   - הירשם ב-[Replicate](https://replicate.com)
   - לך ל-[API Tokens](https://replicate.com/account/api-tokens)
   - העתק את ה-token

2. **הוסף ל-`.env.local`**:
   ```env
   REPLICATE_API_TOKEN=r8_your_token_here
   ```

3. **הרץ את הסקריפט**:
   ```bash
   node scripts/generate-service-images.js
   ```

## אפשרויות אחרות

### OpenAI DALL-E
```env
OPENAI_API_KEY=sk-your_key_here
```
**יתרונות:** איכות גבוהה מאוד  
**חסרונות:** דורש תשלום

### Unsplash (Stock Photos)
```env
UNSPLASH_ACCESS_KEY=your_access_key_here
```
**יתרונות:** חינמי (50 requests/hour), תמונות אמיתיות  
**חסרונות:** לא תמונות AI מותאמות

## הערות

- התמונות נשמרות אוטומטית בתיקיות המתאימות
- הקוד כבר מוגדר להשתמש ב-JPG במקום SVG
- אם אין תמונה, האתר יציג placeholder
- **התמונות מותאמות לכל סוג טיפול** - כל service.id מקבל תמונה רלוונטית ספציפית
- הסקריפט משתמש ב-service.id למיפוי מדויק של התמונות

## פתרון בעיות

**שגיאה: "No API key found"**
- ודא ש-`.env.local` קיים בתיקיית השורש
- ודא שה-API key כתוב נכון (ללא רווחים)

**שגיאה: "Failed to download"**
- בדוק את החיבור לאינטרנט
- נסה API אחר (Replicate/OpenAI/Unsplash)

**תמונות לא מופיעות באתר**
- ודא שהתמונות נשמרו ב-`public/images/services/{service-id}/service-image.jpg`
- הפעל מחדש את השרת (`npm run dev`)

