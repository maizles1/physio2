# 🎬 איך להוסיף קישורי YouTube - דרך פשוטה!

## 📍 איפה?

**קובץ פשוט אחד:** 
```
config/videos.config.ts
```

פשוט פתח את הקובץ הזה והכנס את הקישורים!

## 🚀 איך עושים את זה?

### שלב 1: פתח את הקובץ

פתח את הקובץ:
```
/Users/andrey/Documents/physio2/config/videos.config.ts
```

### שלב 2: מצא את השורות עם הקישורים

תראה משהו כזה:

```typescript
export const videosConfig: VideoConfig[] = [
  {
    title: 'סרטון על הקליניקה',
    description: 'סיור וירטואלי בקליניקת פיזיותרפיה.פלוס...',
    youtubeUrl: 'https://www.youtube.com/watch?v=PLACEHOLDER', // ← כאן!
  },
  {
    title: 'על אנדריי מייזלס',
    description: 'הכרות עם אנדריי מייזלס...',
    youtubeUrl: 'https://www.youtube.com/watch?v=PLACEHOLDER', // ← כאן!
  },
  // ... וכו'
]
```

### שלב 3: החלף את הקישורים

פשוט **העתק והדבק** את קישור ה-YouTube שלך במקום `PLACEHOLDER` או במקום הקישור הקיים.

**כל סוג קישור יעבוד:**
- ✅ `https://www.youtube.com/watch?v=VIDEO_ID`
- ✅ `https://youtu.be/VIDEO_ID`
- ✅ `https://www.youtube.com/embed/VIDEO_ID`

### שלב 4: שמור

שמור את הקובץ (`Cmd + S`) - האתר יתעדכן אוטומטית!

## 📝 דוגמה

**לפני:**
```typescript
youtubeUrl: 'https://www.youtube.com/watch?v=PLACEHOLDER',
```

**אחרי:**
```typescript
youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
```

או פשוט:
```typescript
youtubeUrl: 'https://youtu.be/dQw4w9WgXcQ',
```

## 💡 טיפים

1. **איך להשיג את הקישור:**
   - פתח את הסרטון ב-YouTube
   - לחץ על "שתף"
   - העתק את הקישור (כל סוג יעבוד!)

2. **לעדכן כותרת/תיאור:**
   - פשוט ערוך את `title` או `description` באותו קובץ

3. **להוסיף או למחוק סרטונים:**
   - הוסף שורה חדשה עם `{ title: '...', description: '...', youtubeUrl: '...' }`
   - או מחק שורה כדי להסיר סרטון

4. **אם יש לך פחות מ-3 סרטונים:**
   - פשוט מחק את השורות שלא צריך מהרשימה

## ✨ מה קורה אחר כך?

- ✅ הקישורים יומרו אוטומטית לפורמט הנכון
- ✅ תמונות התצוגה יטענו אוטומטית מ-YouTube
- ✅ הסרטונים יופיעו באתר עם Modal יפה

**זה הכל!** 🎉

