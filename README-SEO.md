# מערכת SEO מקצועית - פיזיותרפיה.פלוס

## סקירה כללית

מערכת SEO מקצועית ומלאה נבנתה עבור האתר. כל הקבצים והקומפוננטות מוכנים לשימוש מיידי.

## קבצים שנוצרו

### 1. `config/seo.config.ts`
קובץ קונפיגורציה מרכזי עם כל ההגדרות:
- פרטי העסק (שם, כתובת, טלפון)
- כתובת: **מרכז כלניות, אשדוד**
- קואורדינטות GPS
- שעות פעילות
- מילות מפתח ראשיות
- פונקציות עזר (calculateReadingTime, optimizeMetaDescription, וכו')

### 2. `components/SEO.tsx`
קומפוננטה גנרית ל-SEO עם:
- `generateSEOMetadata()` - יצירת Metadata object מלא
- `StructuredData` - קומפוננטה ל-structured data
- `generateLocalBusinessSchema()` - יצירת LocalBusiness schema
- `generateArticleSchema()` - יצירת Article schema

### 3. `components/GoogleAnalytics.tsx`
קומפוננטה ל-Google Analytics 4:
- Script loading אוטומטי
- Page view tracking
- Event tracking functions (clickToCall, formSubmit, buttonClick, וכו')
- Hooks למעקב אחר scroll depth ו-time on page

### 4. `components/SocialSharing.tsx`
קומפוננטה לשיתוף ברשתות חברתיות:
- Facebook, WhatsApp, Twitter, LinkedIn, Email
- Event tracking אוטומטי
- תמיכה ב-native share API במובייל

### 5. `components/ReadingTime.tsx`
קומפוננטה לחישוב וצגת זמן קריאה משוער

### 6. `components/PageTracking.tsx`
קומפוננטה למעקב אוטומטי אחר:
- Page views
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page

### 7. `SEO-CHECKLIST.md`
רשימת בדיקות מקיפה ל-SEO audit

### 8. `SEO-IMPLEMENTATION-GUIDE.md`
מדריך יישום מפורט עם דוגמאות

## מה כבר מוכן ועובד

### ✅ Technical SEO
- [x] Meta tags (title, description, keywords) - כל עמוד
- [x] Open Graph tags - כל עמוד
- [x] Twitter Cards - כל עמוד
- [x] Canonical URLs - כל עמוד
- [x] Structured Data:
  - LocalBusiness Schema
  - MedicalBusiness Schema
  - Organization Schema
  - Person Schema
  - Article Schema
  - FAQPage Schema
  - BreadcrumbList Schema
  - Service/MedicalProcedure Schema
  - VideoObject Schema
  - Review/AggregateRating Schema
- [x] robots.txt משופר
- [x] sitemap.xml דינמי
- [x] manifest.json (PWA support)

### ✅ On-Page SEO
- [x] Header hierarchy נכון (H1, H2, H3)
- [x] Alt text לכל התמונות
- [x] Internal linking strategy
- [x] Breadcrumbs navigation
- [x] Reading time למאמרים
- [x] Social sharing buttons

### ✅ Performance
- [x] Image optimization (WebP/AVIF)
- [x] Lazy loading לתמונות
- [x] Preconnect/Prefetch
- [x] Compression enabled

### ✅ Local SEO
- [x] כתובת: **מרכז כלניות, אשדוד** (עודכן בכל המקומות)
- [x] LocalBusiness Schema מלא
- [x] GeoCoordinates
- [x] Service Area markup
- [x] Google Maps integration

### ✅ Analytics & Tracking
- [x] Google Analytics 4 setup (מוכן - צריך רק ID)
- [x] Event tracking:
  - Click to call (כל הקישורים לטלפון)
  - Form submissions
  - Button clicks
  - Scroll depth
  - Time on page
  - Video play
  - External links
  - WhatsApp clicks

## מה צריך לעשות עכשיו

### 1. הוסף Google Analytics ID

ערוך את `config/seo.config.ts`:
```typescript
googleAnalyticsId: 'G-XXXXXXXXXX', // הוסף את ה-ID שלך מ-Google Analytics
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
  linkedin: 'https://linkedin.com/company/your-company',
  youtube: 'https://youtube.com/@your-channel',
},
```

### 4. בדוק Core Web Vitals

הרץ בדיקות עם:
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Lighthouse**: בדפדפן Chrome

### 5. Submit Sitemap

1. היכנס ל-Google Search Console
2. נווט ל-Sitemaps
3. הוסף: `https://physiotherapy.plus/sitemap.xml`

### 6. בדוק Structured Data

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/

## דוגמאות שימוש

### שימוש ב-SEO Component בעמוד חדש

```typescript
// app/new-page/page.tsx
import { generateSEOMetadata } from '@/components/SEO'
import { StructuredData, generateLocalBusinessSchema } from '@/components/SEO'

export const metadata = generateSEOMetadata({
  title: 'כותרת העמוד',
  description: 'תיאור העמוד (150-160 תווים)',
  keywords: ['מילת מפתח 1', 'מילת מפתח 2'],
  canonical: '/new-page',
  type: 'website',
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
  gtag.formSubmit('contact_form')
  // ... rest of code
}

// Track click to call
<a href="tel:0508838982" onClick={() => gtag.clickToCall('050-883-8982')}>
  התקשר
</a>
```

### שימוש ב-Social Sharing

```tsx
import SocialSharing from '@/components/SocialSharing'

<SocialSharing 
  title="כותרת המאמר"
  description="תיאור המאמר"
  image="/images/blog/article.jpg"
  variant="horizontal" // או "vertical"
/>
```

### שימוש ב-Reading Time

```tsx
import ReadingTime from '@/components/ReadingTime'

<ReadingTime content={post.content} />
```

## בדיקות מומלצות

### Google Tools
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

### Other Tools
- **GTmetrix**: https://gtmetrix.com/
- **Lighthouse**: בדפדפן Chrome (F12 > Lighthouse)
- **W3C Validator**: https://validator.w3.org/

## Checklist מהיר

- [ ] הוסף Google Analytics ID
- [ ] הוסף Google Search Console verification
- [ ] עדכן קישורים לרשתות חברתיות
- [ ] בדוק Core Web Vitals
- [ ] Submit sitemap ל-Google Search Console
- [ ] בדוק Structured Data עם Google Rich Results Test
- [ ] בדוק Mobile-Friendly Test
- [ ] בדוק PageSpeed Insights

## הערות חשובות

1. **כתובת עודכנה**: כל המופעים של "יקינטון 3" עודכנו ל"מרכז כלניות, אשדוד"
2. **Event Tracking**: כל הקישורים לטלפון, WhatsApp, וטפסים כבר עוקבים
3. **Structured Data**: כל הסוגים מוכנים ועובדים
4. **Performance**: Image optimization, lazy loading, preconnect - הכל מוכן

## תמיכה

לפרטים נוספים, ראה:
- `SEO-CHECKLIST.md` - רשימת בדיקות מפורטת
- `SEO-IMPLEMENTATION-GUIDE.md` - מדריך יישום עם דוגמאות
- `config/seo.config.ts` - כל ההגדרות







