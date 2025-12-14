# מדריך יישום SEO - פיזיותרפיה.פלוס

## סקירה כללית

מערכת SEO מקצועית ומלאה נבנתה עבור האתר. כל הקבצים והקומפוננטות מוכנים לשימוש.

## קבצים שנוצרו

### 1. `config/seo.config.ts`
קובץ קונפיגורציה מרכזי עם כל ההגדרות:
- פרטי העסק
- כתובת (מרכז כלניות, אשדוד)
- קואורדינטות
- שעות פעילות
- מילות מפתח
- פונקציות עזר ל-SEO

**שימוש:**
```typescript
import { seoConfig, calculateReadingTime } from '@/config/seo.config'
```

### 2. `components/SEO.tsx`
קומפוננטה גנרית ל-SEO עם פונקציות:
- `generateSEOMetadata()` - יצירת Metadata object
- `StructuredData` - קומפוננטה ל-structured data
- `generateLocalBusinessSchema()` - יצירת LocalBusiness schema
- `generateArticleSchema()` - יצירת Article schema

**שימוש:**
```typescript
import { generateSEOMetadata, StructuredData } from '@/components/SEO'

export const metadata = generateSEOMetadata({
  title: 'כותרת העמוד',
  description: 'תיאור העמוד',
  keywords: ['מילת מפתח 1', 'מילת מפתח 2'],
  canonical: '/path',
})
```

### 3. `components/GoogleAnalytics.tsx`
קומפוננטה ל-Google Analytics 4 עם:
- Script loading
- Page view tracking
- Event tracking functions
- Hooks למעקב אחר scroll, time on page

**שימוש:**
```typescript
import GoogleAnalytics, { gtag } from '@/components/GoogleAnalytics'

// Track events
gtag.clickToCall('050-883-8982')
gtag.formSubmit('contact_form')
gtag.buttonClick('cta_button')
```

### 4. `components/SocialSharing.tsx`
קומפוננטה לשיתוף ברשתות חברתיות:
- Facebook
- WhatsApp
- Twitter
- LinkedIn
- Email

**שימוש:**
```tsx
<SocialSharing 
  title="כותרת המאמר"
  description="תיאור המאמר"
  image="/path/to/image.jpg"
  variant="horizontal" // או "vertical"
/>
```

### 5. `components/ReadingTime.tsx`
קומפוננטה לחישוב זמן קריאה משוער

**שימוש:**
```tsx
<ReadingTime content={post.content} />
```

### 6. `components/PageTracking.tsx`
קומפוננטה למעקב אוטומטי אחר:
- Page views
- Scroll depth
- Time on page

**שימוש:** כבר מוסף ל-`app/layout.tsx`

### 7. `SEO-CHECKLIST.md`
רשימת בדיקות מקיפה ל-SEO audit

## מה כבר מוכן

### ✅ Technical SEO
- [x] Meta tags (title, description, keywords)
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Canonical URLs
- [x] Structured Data (כל הסוגים)
- [x] robots.txt משופר
- [x] sitemap.xml דינמי
- [x] manifest.json

### ✅ On-Page SEO
- [x] Header hierarchy נכון
- [x] Alt text לתמונות
- [x] Internal linking
- [x] Breadcrumbs
- [x] FAQ Schema
- [x] Article Schema
- [x] Reading time
- [x] Social sharing

### ✅ Performance
- [x] Image optimization (WebP/AVIF)
- [x] Lazy loading
- [x] Preconnect/Prefetch
- [x] Compression

### ✅ Local SEO
- [x] LocalBusiness Schema
- [x] כתובת: מרכז כלניות, אשדוד
- [x] GeoCoordinates
- [x] Service Area markup

### ✅ Analytics
- [x] Google Analytics 4 setup
- [x] Event tracking functions
- [x] Page tracking
- [x] Scroll tracking
- [x] Time on page tracking

## מה צריך לעשות עכשיו

### 1. הוסף Google Analytics ID

ערוך את `config/seo.config.ts`:
```typescript
googleAnalyticsId: 'G-XXXXXXXXXX', // הוסף את ה-ID שלך
```

### 2. הוסף Google Search Console Verification

ערוך את `config/seo.config.ts`:
```typescript
googleSearchConsoleId: 'your-verification-code',
```

או הוסף meta tag ב-`app/layout.tsx`:
```html
<meta name="google-site-verification" content="your-verification-code" />
```

### 3. עדכן קישורים לרשתות חברתיות

ערוך את `config/seo.config.ts`:
```typescript
social: {
  facebook: 'https://facebook.com/your-page',
  instagram: 'https://instagram.com/your-account',
  // וכו'
},
```

### 4. בדוק Core Web Vitals

הרץ בדיקות עם:
- Google PageSpeed Insights
- GTmetrix
- Lighthouse

### 5. Submit Sitemap

1. היכנס ל-Google Search Console
2. נווט ל-Sitemaps
3. הוסף: `https://physiotherapy.plus/sitemap.xml`

## דוגמאות שימוש

### שימוש ב-SEO Component בעמוד חדש

```typescript
// app/new-page/page.tsx
import { generateSEOMetadata } from '@/components/SEO'
import { StructuredData, generateLocalBusinessSchema } from '@/components/SEO'

export const metadata = generateSEOMetadata({
  title: 'כותרת העמוד',
  description: 'תיאור העמוד',
  keywords: ['מילת מפתח 1', 'מילת מפתח 2'],
  canonical: '/new-page',
})

export default function NewPage() {
  const schema = generateLocalBusinessSchema()
  
  return (
    <>
      <StructuredData data={schema} />
      <div>תוכן העמוד</div>
    </>
  )
}
```

### שימוש ב-Event Tracking

```typescript
import { gtag } from '@/components/GoogleAnalytics'

// Track button click
<button onClick={() => {
  gtag.buttonClick('appointment_button')
  // ... rest of code
}}>
  קבע תור
</button>

// Track form submission
const handleSubmit = () => {
  gtag.formSubmit('appointment_form')
  // ... rest of code
}
```

### שימוש ב-Social Sharing

```tsx
import SocialSharing from '@/components/SocialSharing'

<SocialSharing 
  title="כותרת המאמר"
  description="תיאור המאמר"
  image="/images/blog/article.jpg"
  variant="horizontal"
/>
```

## בדיקות מומלצות

1. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - בדוק את כל ה-structured data

2. **Google Mobile-Friendly Test**
   - https://search.google.com/test/mobile-friendly

3. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - בדוק LCP, FID, CLS

4. **Schema Markup Validator**
   - https://validator.schema.org/

## הערות חשובות

1. **Google Analytics**: הקומפוננטה מוכנה, רק צריך להוסיף ID
2. **כתובת**: עודכנה ל"מרכז כלניות, אשדוד" בכל המקומות
3. **Event Tracking**: כל הקישורים לטלפון, WhatsApp, וטפסים כבר עוקבים
4. **Structured Data**: כל הסוגים מוכנים ועובדים

## תמיכה

אם יש בעיות או שאלות, בדוק:
- `SEO-CHECKLIST.md` - רשימת בדיקות
- `config/seo.config.ts` - כל ההגדרות
- `components/SEO.tsx` - פונקציות עזר






