# Checklist של 50 פעולות SEO ידניות

רשימה מפורטת של פעולות SEO שצריך לבצע ידנית לאחר התקנת מערכת ה-SEO.

## 📊 Google Services Setup (10 פעולות)

### Google Analytics 4
- [ ] **1. יצירת Google Analytics 4 property**
  - היכנס ל-https://analytics.google.com
  - צור property חדש עבור האתר
  - העתק את Measurement ID (G-XXXXXXXXXX)
  - הוסף את ה-ID ב-`config/seo.config.ts` תחת `googleAnalyticsId`

- [ ] **2. הגדרת Goals/Events ב-GA4**
  - הגדר Goal ל-"Click to Call"
  - הגדר Goal ל-"Form Submission"
  - הגדר Goal ל-"Appointment Booking"
  - הגדר Goal ל-"WhatsApp Click"

- [ ] **3. הגדרת Custom Dimensions**
  - הוסף Custom Dimension ל-"Service Type"
  - הוסף Custom Dimension ל-"Blog Category"
  - הוסף Custom Dimension ל-"Page Type"

### Google Search Console
- [ ] **4. הוספת property ל-Google Search Console**
  - היכנס ל-https://search.google.com/search-console
  - הוסף property חדש (URL prefix או Domain)
  - אמת בעלות על האתר (HTML tag, DNS, או Google Analytics)

- [ ] **5. Submit Sitemap**
  - נווט ל-Sitemaps ב-Search Console
  - הוסף: `https://physiotherapy.plus/sitemap.xml`
  - בדוק שהסיטמאפ נטען בהצלחה

- [ ] **6. בדיקת Coverage Report**
  - בדוק את ה-Coverage Report
  - פתור שגיאות (404, redirects, וכו')
  - בדוק שה-Indexing Status תקין

- [ ] **7. הגדרת URL Inspection**
  - בדוק את כל העמודים החשובים עם URL Inspection
  - ודא שכל העמודים indexed

### Google My Business
- [ ] **8. יצירה/עדכון Google My Business Profile**
  - היכנס ל-https://business.google.com
  - צור או עדכן את ה-profile
  - הוסף תמונות מקצועיות
  - הוסף שעות פעילות מדויקות

- [ ] **9. הוספת ביקורות Google**
  - בקש מלקוחות להשאיר ביקורות
  - הגב על ביקורות (חיוביות ושליליות)
  - הוסף קישור להשארת ביקורת באתר

- [ ] **10. עדכון פרטי Google My Business**
  - ודא שהכתובת נכונה: "מרכז כלניות, אשדוד"
  - עדכן טלפון: 050-883-8982
  - הוסף קטגוריות שירותים
  - הוסף תמונות של הקליניקה

## 📝 Content Optimization (12 פעולות)

### עמוד בית
- [ ] **11. אופטימיזציה של H1**
  - ודא שיש H1 אחד בלבד
  - ודא שהוא כולל מילת מפתח ראשית
  - ודא שהוא תיאורי ומדויק

- [ ] **12. אופטימיזציה של Meta Description**
  - ודא שה-Meta Description בין 150-160 תווים
  - ודא שהוא כולל CTA
  - ודא שהוא כולל מילות מפתח רלוונטיות

- [ ] **13. הוספת Internal Links**
  - הוסף קישורים פנימיים לעמודי שירותים
  - הוסף קישורים למאמרי בלוג רלוונטיים
  - ודא שיש לפחות 3-5 קישורים פנימיים בעמוד

### עמודי שירותים
- [ ] **14. אופטימיזציה של תיאורי שירותים**
  - ודא שכל שירות כולל לפחות 300 מילים
  - הוסף מילות מפתח LSI
  - הוסף תיאורים מפורטים של הטיפול

- [ ] **15. הוספת FAQ לכל שירות**
  - הוסף 3-5 שאלות נפוצות לכל שירות
  - השתמש ב-Schema.org FAQPage
  - הוסף תשובות מפורטות

- [ ] **16. הוספת Call-to-Action**
  - ודא שיש CTA ברור בכל עמוד שירות
  - הוסף קישור ל-"קבע תור"
  - הוסף קישור ל-"צור קשר"

### בלוג
- [ ] **17. אופטימיזציה של מאמרי בלוג קיימים**
  - בדוק שכל מאמר כולל לפחות 1000 מילים
  - ודא שיש H2/H3 hierarchy נכון
  - הוסף internal links למאמרים קשורים

- [ ] **18. יצירת מאמרים חדשים**
  - כתוב מאמר על "פיזיותרפיה באשדוד"
  - כתוב מאמר על "מתי צריך פיזיותרפיסט"
  - כתוב מאמר על "שיקום לאחר ניתוח"

- [ ] **19. אופטימיזציה של תמונות בבלוג**
  - ודא שכל תמונה כוללת alt text
  - ודא שכל תמונה optimized (WebP/AVIF)
  - הוסף captions לתמונות

- [ ] **20. הוספת Related Posts**
  - ודא שכל מאמר מציג Related Posts
  - ודא שה-Related Posts רלוונטיים
  - הוסף קישורים פנימיים

### עמודי תוכן נוספים
- [ ] **21. אופטימיזציה של עמוד "אודות"**
  - הוסף סיפור אישי
  - הוסף תמונות של הצוות
  - הוסף credentials והשכלה

- [ ] **22. אופטימיזציה של עמוד "צור קשר"**
  - ודא שהטופס עובד
  - הוסף מפת Google Maps
  - הוסף שעות פעילות

## 🔗 Link Building (8 פעולות)

### Internal Linking
- [ ] **23. יצירת Internal Linking Strategy**
  - זהה עמודי Hub (עמודים מרכזיים)
  - זהה עמודי Spoke (עמודים משניים)
  - צור קישורים מ-Spoke ל-Hub

- [ ] **24. הוספת Breadcrumbs**
  - ודא שכל עמוד כולל Breadcrumbs
  - ודא שה-Breadcrumbs כוללים Schema.org
  - ודא שה-Breadcrumbs נכונים

- [ ] **25. יצירת Sitemap HTML**
  - צור עמוד sitemap.html
  - הוסף קישורים לכל העמודים
  - עדכן את ה-sitemap באופן קבוע

### External Linking
- [ ] **26. רישום ב-Directories מקומיים**
  - רשום ב-אתר דפי זהב
  - רשום ב-אתר גוגל מפות
  - רשום ב-directories רפואיים

- [ ] **27. יצירת Backlinks**
  - צור קישורים מאתרים רלוונטיים
  - צור קישורים מבלוגים רפואיים
  - צור קישורים מאתרי קופות חולים

- [ ] **28. שיתוף ברשתות חברתיות**
  - שתף מאמרי בלוג בפייסבוק
  - שתף מאמרי בלוג ב-Instagram
  - שתף מאמרי בלוג ב-LinkedIn

- [ ] **29. יצירת Guest Posts**
  - כתוב Guest Post לבלוגים רפואיים
  - כתוב Guest Post לאתרי בריאות
  - הוסף קישור חזרה לאתר

- [ ] **30. שיתוף פעולה עם מטפלים אחרים**
  - צור קשרים עם מטפלים משלימים
  - הוסף קישורים הדדיים
  - צור רשת מקצועית

## 📱 Social Media Integration (5 פעולות)

- [ ] **31. יצירת פרופילי Social Media**
  - צור עמוד פייסבוק עסקי
  - צור פרופיל Instagram
  - צור פרופיל LinkedIn

- [ ] **32. הוספת קישורים ל-Social Media**
  - הוסף קישורים ב-Footer
  - הוסף קישורים ב-Header
  - עדכן את `config/seo.config.ts` עם הקישורים

- [ ] **33. יצירת תוכן ל-Social Media**
  - צור פוסטים שבועיים
  - שתף טיפים מקצועיים
  - שתף עדויות מטופלים

- [ ] **34. הוספת Social Sharing Buttons**
  - ודא שכל מאמר כולל כפתורי שיתוף
  - ודא שהכפתורים עובדים
  - בדוק שהשיתוף כולל תמונה ותיאור נכונים

- [ ] **35. אינטגרציה עם Google My Business**
  - שתף פוסטים מ-Google My Business
  - עדכן את ה-profile באופן קבוע
  - הגב על ביקורות

## ⚙️ Technical SEO (8 פעולות)

- [ ] **36. בדיקת robots.txt**
  - ודא שה-robots.txt נגיש
  - בדוק שאין שגיאות
  - ודא שה-sitemap מוזכר

- [ ] **37. בדיקת sitemap.xml**
  - ודא שה-sitemap נגיש
  - בדוק שכל העמודים כלולים
  - ודא שה-sitemap מעודכן

- [ ] **38. בדיקת Canonical URLs**
  - ודא שכל עמוד כולל canonical URL
  - בדוק שאין duplicate content
  - ודא שה-canonical URLs נכונים

- [ ] **39. בדיקת Structured Data**
  - בדוק עם Google Rich Results Test
  - ודא שאין שגיאות
  - בדוק שכל ה-Schemas תקינים

- [ ] **40. אופטימיזציה של תמונות**
  - ודא שכל התמונות optimized
  - ודא שכל התמונות כוללות alt text
  - ודא שהתמונות responsive

- [ ] **41. בדיקת Mobile-Friendliness**
  - בדוק עם Google Mobile-Friendly Test
  - ודא שהאתר responsive
  - בדוק שאין בעיות במובייל

- [ ] **42. בדיקת Page Speed**
  - בדוק עם Google PageSpeed Insights
  - ודא שהציון מעל 90 (mobile & desktop)
  - פתור בעיות performance

- [ ] **43. בדיקת SSL Certificate**
  - ודא שיש SSL certificate תקין
  - ודא שה-HTTPS מופעל
  - בדוק שאין mixed content warnings

## 📍 Local SEO (5 פעולות)

- [ ] **44. רישום ב-Directories מקומיים**
  - רשום ב-אתר דפי זהב
  - רשום ב-אתר גוגל מפות
  - רשום ב-directories רפואיים

- [ ] **45. הוספת NAP (Name, Address, Phone)**
  - ודא שה-NAP זהה בכל מקום
  - ודא שה-NAP נכון ב-Google My Business
  - ודא שה-NAP נכון באתר

- [ ] **46. יצירת עמוד "מיקום"**
  - צור עמוד עם מפה
  - הוסף הוראות הגעה
  - הוסף תמונות של המיקום

- [ ] **47. הוספת Local Keywords**
  - הוסף "פיזיותרפיה אשדוד" בכל עמוד
  - הוסף "מכון פיזיותרפיה אשדוד"
  - הוסף "פיזיותרפיסט אשדוד"

- [ ] **48. יצירת Local Content**
  - כתוב מאמר על "פיזיותרפיה באשדוד"
  - כתוב מאמר על "שירותי פיזיותרפיה באשדוד"
  - הוסף תוכן מקומי רלוונטי

## 📈 Monitoring & Analytics (2 פעולות)

- [ ] **49. הגדרת Alerts**
  - הגדר alerts ב-Google Search Console
  - הגדר alerts ב-Google Analytics
  - הגדר alerts על שגיאות

- [ ] **50. יצירת דוחות קבועים**
  - צור דוח שבועי ב-Google Analytics
  - צור דוח חודשי ב-Google Search Console
  - עקוב אחר trends ו-metrics

---

## 📌 הערות חשובות:

1. **תעדף פעולות**: התחל עם Google Services Setup (פעולות 1-10)
2. **עקוב אחר התקדמות**: סמן כל פעולה כשאתה מסיים אותה
3. **בדוק תוצאות**: אחרי כל פעולה, בדוק שהכל עובד
4. **עדכן באופן קבוע**: עדכן את התוכן והקישורים באופן קבוע

## 🎯 יעדים:

- **חודש 1**: השלם פעולות 1-25 (Google Services + Content Optimization)
- **חודש 2**: השלם פעולות 26-40 (Link Building + Technical SEO)
- **חודש 3**: השלם פעולות 41-50 (Local SEO + Monitoring)

---

**תאריך התחלה**: _______________  
**תאריך סיום מתוכנן**: _______________




