# מדריך הגדרת משתני סביבה (.env)

## מה זה משתני סביבה?

משתני סביבה הם משתנים שמוגדרים מחוץ לקוד, בקובץ נפרד.  
זה מאפשר לנו לשנות הגדרות ללא צורך לערוך קוד.

## למה זה טוב?

1. **פשוט יותר** - אין צורך לגעת בקוד
2. **בטוח יותר** - הקובץ `.env.local` לא נשמר ב-git
3. **נוח יותר** - קל לעדכן ולשנות
4. **גמיש** - תומך בכל סוגי הקישורים

## איך להגדיר?

### שלב 1: צור את הקובץ

צור קובץ חדש בשם `.env.local` בתיקיית השורש של הפרויקט.

**איפה?**  
באותה תיקייה שבה נמצא:
- `package.json`
- `next.config.ts`
- `README.md`

### שלב 2: העתק את התוכן

פתח את הקובץ `.env.example` (אם קיים) או העתק את התוכן הבא:

```env
# ============================================
# משתני סביבה לסרטוני YouTube
# ============================================

# סרטון 1 - סרטון על הקליניקה
VIDEO_1_URL=https://www.youtube.com/watch?v=PLACEHOLDER

# סרטון 2 - על אנדריי מייזלס
VIDEO_2_URL=https://www.youtube.com/watch?v=PLACEHOLDER

# סרטון 3 - סיפור הצלחה
VIDEO_3_URL=https://www.youtube.com/watch?v=PLACEHOLDER

# ============================================
# משתני סביבה ל-Google My Business
# ============================================

# Place ID של Google My Business
# מצא ב: https://developers.google.com/maps/documentation/places/web-service/place-id
NEXT_PUBLIC_GOOGLE_PLACE_ID=PLACEHOLDER

# Google Maps API Key
# מצא ב: https://console.cloud.google.com/apis/credentials
GOOGLE_MAPS_API_KEY=PLACEHOLDER
```

### שלב 3: החלף את PLACEHOLDER

החלף את `PLACEHOLDER` בקישורי ה-YouTube שלך.

**כל סוג קישור יעבוד:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

### שלב 4: שמור

שמור את הקובץ `.env.local`

### שלב 5: הפעל מחדש

**חשוב!** אחרי כל שינוי ב-`.env.local`, תצטרך להפעיל מחדש את השרת:

```bash
# עצור את השרת (Ctrl+C)
# הפעל מחדש:
npm run dev
```

## דוגמה מלאה

לפני:
```env
VIDEO_1_URL=https://www.youtube.com/watch?v=PLACEHOLDER
```

אחרי:
```env
VIDEO_1_URL=https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

או:
```env
VIDEO_1_URL=https://youtu.be/dQw4w9WgXcQ
```

או:
```env
VIDEO_1_URL=https://www.youtube.com/embed/dQw4w9WgXcQ
```

**כל אחד מהם יעבוד!**

## איך למצוא את הקישור?

1. פתח את הסרטון ב-YouTube
2. לחץ על "שתף" (Share)
3. העתק את הקישור
4. הדבק בקובץ `.env.local`

## טיפים

1. **אם יש לך רק 2 סרטונים:**
   - פשוט השאר את `VIDEO_3_URL` עם `PLACEHOLDER`
   - הסרטון השלישי לא יוצג

2. **אם אתה רוצה להוסיף עוד סרטונים:**
   - כרגע התומך ב-3 סרטונים
   - לעדכון נוסף, ערוך את `config/videos.config.ts`

3. **אם הסרטונים לא מופיעים:**
   - ודא שהפעלת מחדש את השרת
   - ודא שהקובץ נקרא `.env.local` (עם הנקודה בהתחלה)
   - ודא שהקישורים תקינים

## ביטחון

**חשוב:** הקובץ `.env.local` לא נשמר ב-git, כך שהוא בטוח וייחודי למחשב שלך.

אם אתה רוצה לשתף את המבנה (ללא הקישורים האמיתיים), השתמש ב-`.env.example`.

## שאלות נפוצות

**ש: האם הקובץ `.env.local` נשמר ב-git?**  
ת: לא! הקובץ `.env.local` מופיע ב-`.gitignore` ולא נשמר ב-git.

**ש: מה ההבדל בין `.env.local` ל-`.env.example`?**  
ת: `.env.example` הוא דוגמה שתומך ב-git, `.env.local` הוא הקובץ שלך עם הנתונים האמיתיים.

**ש: האם אני יכול להשתמש בשם אחר?**  
ת: לא. Next.js מחפש ספציפית את `.env.local` (או `.env`).

**ש: מה אם שכחתי להפעיל מחדש?**  
ת: הסרטונים לא יעודכנו. פשוט הפעל מחדש את השרת.

## עזרה נוספת

- ראה `YOUTUBE-VIDEOS-GUIDE.md` למדריך מפורט יותר
- ראה `config/README.md` למדריך קצר

