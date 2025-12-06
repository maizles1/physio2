# יצירת תמונות AI לשירותי הפיזיותרפיה

סקריפט זה יוצר תמונות מקצועיות לכל סוג טיפול באמצעות:
- Replicate (Stable Diffusion) - תמונות AI מותאמות
- OpenAI DALL-E - תמונות AI באיכות גבוהה
- Unsplash - תמונות stock חינמיות (ללא API key נדרש)

## דרישות

**אופציונלי:** API Key לאחת מהאפשרויות הבאות (אם אין API key, הסקריפט ישתמש בתמונות stock חינמיות):
- Replicate API Token (מומלץ - חינמי/זול)
- OpenAI API Key (דורש תשלום)

## הגדרה

**אופציונלי:** API key לאחת מהאפשרויות הבאות (אם אין API key, הסקריפט ישתמש בתמונות stock חינמיות):

### אפשרות 1: Replicate (מומלץ - AI images)

1. הירשם ל-[Replicate](https://replicate.com)
2. קבל API token מ-[Account Settings](https://replicate.com/account/api-tokens)
3. הוסף ל-`.env.local`:
   ```
   REPLICATE_API_TOKEN=your_token_here
   ```
   **יתרונות:** תמונות AI מותאמות אישית, חינמי/זול

### אפשרות 2: OpenAI DALL-E (AI images)

1. הירשם ל-[OpenAI](https://platform.openai.com)
2. קבל API key מ-[API Keys](https://platform.openai.com/api-keys)
3. הוסף ל-`.env.local`:
   ```
   OPENAI_API_KEY=your_key_here
   ```
   **יתרונות:** איכות גבוהה מאוד, דורש תשלום

### אפשרות 3: Unsplash (Stock photos)

1. הירשם ל-[Unsplash Developers](https://unsplash.com/developers)
2. צור אפליקציה וקבל Access Key
3. הוסף ל-`.env.local`:
   ```
   UNSPLASH_ACCESS_KEY=your_key_here
   ```
   **יתרונות:** חינמי (50 requests/hour), תמונות אמיתיות

## הרצה

**ללא API key (מומלץ להתחלה):**
```bash
node scripts/generate-service-images.js
```
הסקריפט יוריד תמונות stock חינמיות מ-Unsplash.

**עם API key (לתמונות AI מותאמות):**
1. הוסף API key ל-`.env.local`
2. הרץ: `node scripts/generate-service-images.js`

הסקריפט ייצור 6 תמונות:
- `back-pain/service-image.jpg` - טיפול בכאבי גב
- `shoulder-pain/service-image.jpg` - טיפול בכאבי כתף
- `neck-knee-pain/service-image.jpg` - טיפול בכאבי צוואר וברך
- `post-surgery/service-image.jpg` - שיקום לאחר ניתוחים
- `vestibular/service-image.jpg` - שיקום וסטיבולרי
- `tmj/service-image.jpg` - טיפול במפרק הלסת

## הערות

- התמונות נשמרות ב-`public/images/services/{service-id}/service-image.jpg`
- כל תמונה היא 800x600 פיקסלים
- הסקריפט ממתין 2 שניות בין כל תמונה (rate limiting)

