# 📸 העלאת תמונה לשירות: הרצאות

## 🎯 איפה מוסיפים תמונה?

**תיקייה בפרויקט (בדיוק כאן):**
```
public/images/services/lectures/
```

**שם הקובץ (בדיוק כך):** `service-image.jpg`

**נתיב מלא במחשב:**
```
/Users/andrey/Documents/physio2/public/images/services/lectures/service-image.jpg
```

---

## 🚀 איך להעלות?

### דרך Cursor / VS Code
1. בפאנל השמאלי: **public** → **images** → **services** → **lectures**
2. גרור את התמונה לתוך התיקייה **lectures** (לא לתיקייה אחרת)
3. **חשוב:** שם הקובץ חייב להיות בדיוק **service-image.jpg**  
   (אם השם שונה – התמונה לא תיטען)

### דרך Finder (Mac)
1. **Finder** → `Cmd+Shift+G`
2. הדבק: `/Users/andrey/Documents/physio2/public/images/services/lectures/`
3. העתק את התמונה לתיקייה
4. שם הקובץ: **service-image.jpg**

---

## 🔄 החלפה בתמונה אמיתית (אופציונלי)

כרגע מוצגת תמונת placeholder (SVG). אם תרצה תמונת צילום:
1. שים קובץ **service-image.jpg** בתיקייה הזו
2. ב-**components/ServicesPreview.tsx** החלף את השורה:
   - **מ:** `imagePath: '/images/services/lectures/service-image.svg',`
   - **ל:** `imagePath: '/images/services/lectures/service-image.jpg',`

---

## 📋 דרישות

- **פורמט:** JPG (מומלץ) או PNG
- **גודל:** עד כ־1MB, רזולוציה מומלצת לפחות 800×600
