# 📸 מדריך העלאת תמונות שירותים

## 🎯 סיכום מהיר - איפה להעלות כל תמונה

| שירות | תיקייה | שם קובץ |
|-------|--------|---------|
| **טיפול בכאבי גב** | `public/images/services/back-pain/` | `service-image.jpg` |
| **טיפול בכאבי כתף** | `public/images/services/shoulder-pain/` | `service-image.jpg` |
| **טיפול בכאבי צוואר וברך** | `public/images/services/neck-knee-pain/` | `service-image.jpg` |
| **שיקום לאחר ניתוחים** | `public/images/services/post-surgery/` | `service-image.jpg` |
| **שיקום וסטיבולרי** | `public/images/services/vestibular/` | `service-image.jpg` |
| **טיפול במפרק הלסת (TMJ)** | `public/images/services/tmj/` | `service-image.jpg` |

---

## 📁 נתיבים מלאים (Full Paths)

### 1. טיפול בכאבי גב
```
/Users/andrey/Documents/physio2/public/images/services/back-pain/service-image.jpg
```

### 2. טיפול בכאבי כתף
```
/Users/andrey/Documents/physio2/public/images/services/shoulder-pain/service-image.jpg
```

### 3. טיפול בכאבי צוואר וברך
```
/Users/andrey/Documents/physio2/public/images/services/neck-knee-pain/service-image.jpg
```

### 4. שיקום לאחר ניתוחים
```
/Users/andrey/Documents/physio2/public/images/services/post-surgery/service-image.jpg
```

### 5. שיקום וסטיבולרי - טיפול בסחרחורות
```
/Users/andrey/Documents/physio2/public/images/services/vestibular/service-image.jpg
```

### 6. טיפול במפרק הלסת (TMJ)
```
/Users/andrey/Documents/physio2/public/images/services/tmj/service-image.jpg
```

---

## 🚀 איך להעלות תמונה לשירות?

### שיטה 1: דרך Finder (Mac)

1. פתח **Finder**
2. לחץ `Cmd+Shift+G` (או לך ל-Go > Go to Folder)
3. הדבק את הנתיב של השירות שבו אתה רוצה להעלות תמונה
   - לדוגמה: `/Users/andrey/Documents/physio2/public/images/services/back-pain/`
4. העתק את התמונה שלך לתיקייה
5. שנה את השם ל: `service-image.jpg` (חשוב!)
6. אם כבר יש תמונה בשם הזה, תחליף אותה

### שיטה 2: דרך VS Code / Cursor

1. פתח את התיקייה של השירות בפרויקט
   - לדוגמה: `public/images/services/back-pain/`
2. גרור את התמונה שלך לתיקייה
3. שנה את השם ל: `service-image.jpg`
4. אם כבר יש תמונה בשם הזה, תחליף אותה

---

## 📋 דרישות תמונה

### פורמט
- ✅ **JPG** - מומלץ (קבצים קטנים יותר)
- ✅ **PNG** - טוב לתמונות עם שקיפות
- ✅ **WebP** - פורמט מודרני (קבצים קטנים)

### גודל
- **רזולוציה מומלצת**: לפחות 800x600 פיקסלים
- **גודל קובץ**: עד 1MB (מומלץ)
- **יחס צדדים**: כל יחס (האתר יעשה crop/scale)

### שם קובץ
- ⚠️ **חייב להיות בדיוק**: `service-image.jpg`
- זה חשוב מאוד - האתר מחפש את הקובץ בשם הספציפי הזה

---

## ✅ איך יודעים שהתמונה נטענה?

1. **שמור את התמונה** בתיקייה הנכונה בשם `service-image.jpg`
2. **רענן את הדפדפן** (Cmd+R או Ctrl+R)
3. **בדוק:**
   - לך לדף השירותים: `http://localhost:3000/services`
   - או בדף הבית - רובריקת השירותים
   - התמונה שלך אמורה להופיע!

---

## 📝 הערות חשובות

- **שם קובץ מדויק**: חייב להיות בדיוק `service-image.jpg` (לא `Service-Image.jpg` או `service_image.jpg`)
- **החלפת תמונה קיימת**: אם יש כבר תמונה בשם הזה, התמונה החדשה תחליף אותה
- **Fallback**: אם התמונה לא קיימת, האתר יציג תמונת placeholder (רקע צבעוני)
- **אופטימיזציה**: האתר יעשה resize אוטומטית, אז אל תדאג אם התמונה גדולה

---

## 🔄 תהליך העלאה מפורט

### שלב 1: מצא את התמונה שלך
- בחר תמונה מהמחשב שלך שתרצה להציג לשירות

### שלב 2: פתח את התיקייה הנכונה
- פתח Finder (Mac) או Explorer (Windows)
- נווט לתיקיית השירות הרלוונטי
- לדוגמה: `public/images/services/back-pain/`

### שלב 3: העתק/העלה את התמונה
- העתק את התמונה לתיקייה
- שנה את השם ל: `service-image.jpg`

### שלב 4: בדוק שהתמונה הופיעה
- רענן את הדפדפן
- בדוק את דף השירותים באתר

---

## 🆘 בעיות נפוצות

**התמונה לא מופיעה?**
- ✓ ודא שהשם של הקובץ מדויק: `service-image.jpg` (כולל אותיות קטנות)
- ✓ ודא שהקובץ בתיקייה הנכונה
- ✓ ודא שהפורמט נתמך (JPG, PNG, WebP)
- ✓ רענן את הדפדפן (Cmd+Shift+R לניקוי cache)
- ✓ עצור והפעל מחדש את השרת (`npm run dev`)

**התמונה נראית מטושטשת?**
- ✓ העלה תמונה ברזולוציה גבוהה יותר (לפחות 800x600)
- ✓ ודא שהתמונה לא דחוסה יותר מדי

**התמונה גדולה מדי?**
- ✓ זה בסדר - האתר יעשה resize אוטומטית
- ✓ אם הקובץ גדול מדי (מעל 1MB), נסה לדחוס אותו עם ImageOptim או TinyPNG

**איך להחליף תמונה קיימת?**
- ✓ פשוט העלה תמונה חדשה באותו שם (`service-image.jpg`) והתמונה הישנה תוחלף

---

## 📍 מיקום התמונות בדף האתר

התמונות מוצגות ב:
- **דף השירותים המלא**: `/services`
- **דף הבית**: רובריקת "השירותים שלנו"
- כל תמונה מוצגת ליד תיאור השירות

---

## 💡 טיפים

1. **איכות תמונות**: השתמש בתמונות איכותיות וחדות
2. **גודל קובץ**: נסה לשמור על קבצים קטנים (עד 1MB) לטעינה מהירה
3. **פורמט**: JPG הוא בדרך כלל הבחירה הטובה ביותר (קבצים קטנים)
4. **תוכן**: בחר תמונות שמתאימות לשירות (לדוגמה: תמונת גב לשירות כאבי גב)

---

## 📖 קבצים נוספים

כל תיקיית שירות מכילה קובץ `README.md` עם הוראות ספציפיות לשירות הזה.

---

**בהצלחה! 🎉**

אם יש לך שאלות או בעיות, בדוק את קבצי ה-README בתיקיות השירותים או את המדריך הכללי `IMAGE-UPLOAD-GUIDE.md`.


