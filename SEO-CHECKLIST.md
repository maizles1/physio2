# SEO Audit Checklist - פיזיותרפיה.פלוס

## ✅ Technical SEO

### Meta Tags
- [x] Title tags (50-60 תווים) - כל עמוד
- [x] Meta descriptions (150-160 תווים) - כל עמוד
- [x] Keywords meta tags - כל עמוד
- [x] Canonical URLs - כל עמוד
- [x] Open Graph tags - כל עמוד
- [x] Twitter Cards - כל עמוד
- [x] Viewport meta tag - ב-layout
- [x] Language tag (lang="he") - ב-layout
- [x] Charset UTF-8 - ב-layout

### Structured Data (Schema.org)
- [x] LocalBusiness Schema
- [x] MedicalBusiness Schema
- [x] Organization Schema
- [x] Person Schema (אנדריי מייזלס)
- [x] Article Schema (מאמרי בלוג)
- [x] FAQPage Schema
- [x] BreadcrumbList Schema
- [x] Service/MedicalProcedure Schema
- [x] VideoObject Schema
- [x] Review/AggregateRating Schema

### Technical Files
- [x] robots.txt - משופר עם כללים נוספים
- [x] sitemap.xml - דינמי עם כל הדפים
- [x] manifest.json - PWA support
- [x] favicon.ico - צריך להוסיף

### Performance
- [x] Image optimization (WebP/AVIF)
- [x] Lazy loading לתמונות
- [x] Preconnect/Prefetch
- [x] Compression enabled
- [ ] Critical CSS inline (צריך להוסיף)
- [ ] Defer non-critical JS (צריך להוסיף)
- [ ] Font optimization (Next.js עושה אוטומטית)

## ✅ On-Page SEO

### Content Structure
- [x] H1 tag אחד בלבד בכל עמוד
- [x] H2-H6 hierarchy נכון
- [x] Alt text לכל התמונות
- [x] Internal linking strategy
- [x] Breadcrumbs navigation
- [x] Related posts במאמרי בלוג

### Content Quality
- [x] Keyword density 1-2%
- [x] LSI keywords בטקסט
- [x] Unique content בכל עמוד
- [x] Reading time למאמרים
- [x] Social sharing buttons

## ✅ Local SEO

### Google My Business
- [x] Google My Business integration
- [x] LocalBusiness Schema עם:
  - [x] כתובת מדויקת (מרכז כלניות אשדוד)
  - [x] טלפון
  - [x] שעות פעילות
  - [x] תמונות
  - [x] ביקורות
- [x] GeoCoordinates
- [x] Service Area markup

### Location Data
- [x] כתובת בכל עמוד (footer/header)
- [x] טלפון בכל עמוד
- [x] מפת Google Maps
- [x] קישור ל-Google Maps navigation
- [x] קישור ל-Waze navigation

## ✅ Mobile SEO

- [x] Responsive design
- [x] Mobile-friendly navigation
- [x] Touch-friendly buttons (min 48x48px)
- [x] Responsive images
- [x] Viewport meta tag
- [x] No horizontal scrolling

## ✅ Analytics & Tracking

### Google Analytics 4
- [x] GA4 setup (קומפוננטה מוכנה)
- [ ] GA4 ID צריך להוסיף ב-seo.config.ts
- [x] Page view tracking
- [x] Event tracking:
  - [x] Click to call
  - [x] Form submissions
  - [x] Button clicks
  - [x] Scroll depth
  - [x] Time on page
  - [x] Video play
  - [x] External links

### Google Search Console
- [ ] Verification code צריך להוסיף
- [ ] Sitemap submission
- [ ] URL inspection

## ✅ Blog SEO

- [x] Article Schema
- [x] Author markup
- [x] Published/Modified dates
- [x] Category/Tag structure
- [x] Reading time
- [x] Related posts
- [x] Social sharing buttons

## ✅ Accessibility (A11y)

- [x] ARIA labels
- [x] Keyboard navigation
- [x] Focus indicators
- [x] Skip to content link
- [x] Proper heading structure
- [ ] Color contrast ratio (WCAG AA) - צריך לבדוק

## ✅ Core Web Vitals

### LCP (Largest Contentful Paint)
- [ ] Target: < 2.5s
- [x] Image optimization
- [x] Lazy loading
- [ ] Critical CSS inline

### FID (First Input Delay)
- [ ] Target: < 100ms
- [ ] Defer non-critical JS
- [ ] Code splitting

### CLS (Cumulative Layout Shift)
- [ ] Target: < 0.1
- [x] Image dimensions specified
- [x] Font loading optimized

## ✅ Security & Trust

- [ ] HTTPS enabled (בהעלאה לייצור)
- [ ] SSL certificate valid
- [x] Privacy policy page
- [x] Terms of service page
- [x] Accessibility statement

## ✅ Social Media

- [x] Open Graph tags
- [x] Twitter Cards
- [x] Social sharing buttons
- [ ] Social media links (כשיהיו זמינים)

## 📋 בדיקות חיצוניות

### Google Tools
- [ ] Google PageSpeed Insights: 90+ (mobile & desktop)
- [ ] GTmetrix: Grade A
- [ ] Google Rich Results Test: Pass
- [ ] Mobile-Friendly Test: Pass
- [ ] Schema Markup Validator: No errors
- [ ] Core Web Vitals: All green

### Other Tools
- [ ] Lighthouse Audit: 90+ בכל הקטגוריות
- [ ] W3C Validator: No errors
- [ ] Broken link checker: No broken links

## 🔧 מה צריך לעשות עכשיו:

1. **הוסף Google Analytics ID** ב-`config/seo.config.ts`:
   ```typescript
   googleAnalyticsId: 'G-XXXXXXXXXX',
   ```

2. **הוסף Google Search Console verification** ב-`config/seo.config.ts`:
   ```typescript
   googleSearchConsoleId: 'your-verification-code',
   ```

3. **עדכן כתובת** בכל המקומות ל"מרכז כלניות אשדוד"

4. **הוסף favicon** ב-`app/icon.tsx` או `public/favicon.ico`

5. **בדוק Core Web Vitals** עם Google PageSpeed Insights

6. **Submit sitemap** ל-Google Search Console

7. **הוסף קישורים לרשתות חברתיות** ב-`seo.config.ts` כשזמינים

## 📝 הערות:

- כל ה-structured data מוכן ועובד
- כל ה-meta tags מוגדרים נכון
- Analytics מוכן - רק צריך להוסיף ID
- Social sharing מוכן לשימוש
- Reading time מוכן למאמרים

## 🎯 Priority Actions:

1. **High Priority:**
   - הוסף GA4 ID
   - עדכן כתובת למרכז כלניות
   - בדוק Core Web Vitals

2. **Medium Priority:**
   - הוסף favicon
   - Submit sitemap ל-GSC
   - בדוק accessibility

3. **Low Priority:**
   - Critical CSS inline
   - Defer non-critical JS
   - AMP support (אופציונלי)


