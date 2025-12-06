# 📁 תיקיית הגדרות (Config)

## 🎬 עדכון קישורי YouTube באמצעות משתני סביבה

**קובץ:** `videos.config.ts`

עכשיו קל יותר! הוסף את קישורי ה-YouTube שלך דרך משתני סביבה.

### הדרך הקלה ביותר:

1. צור קובץ `.env.local` בתיקיית השורש של הפרויקט
2. הוסף את הקישורים:
   ```
   VIDEO_1_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
   VIDEO_2_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
   VIDEO_3_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
   ```
3. שמור והפעל מחדש את השרת

**כל סוג קישור יעבוד!** הקוד ימיר אוטומטית.

### לפרטים מלאים:
- ראה `ENV-SETUP.md` במדריך המלא
- ראה `.env.example` לדוגמה
