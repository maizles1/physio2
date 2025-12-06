# הוראות יצירת קובץ .env.local

## צעד מהיר:

1. צור קובץ חדש בשם `.env.local` בתיקיית השורש של הפרויקט
2. העתק את התוכן הבא לקובץ:

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
```

3. החלף את `PLACEHOLDER` בקישורי ה-YouTube שלך
4. שמור את הקובץ
5. הפעל מחדש את השרת (`npm run dev`)

## לפרטים מלאים:

ראה `ENV-SETUP.md` למדריך מפורט יותר.

