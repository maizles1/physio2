# מדריך פשוט: איך להוסיף ביקורות מ-Google לאתר

## מה צריך לעשות? (בקצרה)

צריך 2 דברים:
1. **Place ID** - מספר מזהה של העסק ב-Google
2. **API Key** - מפתח גישה ל-Google

## שלב 1: מציאת Place ID

### דרך פשוטה:

1. פתח דפדפן (Chrome, Safari וכו')
2. לך ל-[Google Maps](https://www.google.com/maps)
3. חפש את הקליניקה שלך (למשל: "פיזיותרפיה.פלוס אשדוד")
4. לחץ על שם הקליניקה
5. **לחץ על "שתף" (Share)** - כפתור בצד שמאל
6. בחלון שנפתח, לחץ על **"העתק קישור"**
7. הקישור שנוצר נראה כך: `https://www.google.com/maps/place/.../@31.8124,34.6624,17z/data=!3m1!4b1!4m6!3m5!1s0x1502a6...`
8. בתוך הקישור יש מחרוזת כמו `ChIJ...` - **זה ה-Place ID**

**או דרך אחרת:**
- פתח את הקליניקה ב-Google Maps
- לחץ עם כפתור ימין על העסק
- בחר "מה המקום הזה?"
- החיפוש יראה את המידע - חלק ממנו הוא ה-Place ID

## שלב 2: יצירת API Key

### שלבים:

1. לך ל-[Google Cloud Console](https://console.cloud.google.com/)
   - אם אין לך חשבון Google - צור אחד (זה בחינם)
   
2. צור פרויקט חדש:
   - לחץ על שם הפרויקט למעלה (או "Select a project")
   - לחץ "New Project"
   - תן שם: "Physiotherapy Website" (או כל שם אחר)
   - לחץ "Create"

3. הפעל את Places API:
   - בחיפוש למעלה, חפש: **"Places API"**
   - לחץ על "Places API"
   - לחץ על כפתור **"Enable"** (הפעל)
   - זה בחינם עד 5000 בקשות בחודש

4. צור API Key:
   - בצד שמאל, לך ל: **"APIs & Services"** > **"Credentials"**
   - לחץ על **"+ CREATE CREDENTIALS"**
   - בחר **"API Key"**
   - תוצג הודעה עם ה-API Key - **העתק אותו** (נראה כמו: `AIzaSy...`)
   - **חשוב**: שמור את המפתח במקום בטוח!

5. (מומלץ) הגבל את ה-API Key:
   - לחץ על ה-API Key שיצרת (לחץ עליו ברשימה)
   - תחת "API restrictions":
     - בחר **"Restrict key"**
     - בחר רק: **"Places API"**
   - לחץ "Save"

## שלב 3: הוספה לקובץ

1. פתח את הקובץ: **`.env.local`** בתיקיית הפרויקט
2. מצא את השורות:
   ```
   NEXT_PUBLIC_GOOGLE_PLACE_ID=
   GOOGLE_MAPS_API_KEY=
   ```
3. הוסף את הערכים אחרי הסימן `=`:
   ```
   NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJ... (החלף ב-Place ID שלך)
   GOOGLE_MAPS_API_KEY=AIzaSy... (החלף ב-API Key שלך)
   ```

**דוגמה:**
```
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJN1t_tDeuEmsRUsoyG83frY4
GOOGLE_MAPS_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz
```

4. שמור את הקובץ

## שלב 4: בדיקה

פתח טרמינל והרץ:
```bash
npm run check-reviews
```

אם הכל תקין, תראה:
- ✅ קובץ .env.local נמצא
- ✅ NEXT_PUBLIC_GOOGLE_PLACE_ID: ...
- ✅ GOOGLE_MAPS_API_KEY: ...
- ✅ חיבור ל-Google Places API הצליח!
- שם העסק: ...
- דירוג ממוצע: ...
- ביקורות זמינות: ...

## שלב 5: הפעלת השרת

לאחר שהכל מוגדר:
```bash
npm run dev
```

ואז:
- לך ל: `http://localhost:3000/testimonials`
- הביקורות מ-Google אמורות להופיע!

## שאלות נפוצות

**ש: זה עולה כסף?**
ת: יש לך 5000 בקשות בחודש בחינם. לך כנראה לא תגיע לזה.

**ש: איפה מופיעות הביקורות?**
ת: בדף `/testimonials` ובדף הבית (3 ביקורות).

**ש: מה אם אין לי ביקורות ב-Google?**
ת: יוצגו ביקורות מקומיות (דוגמה). כשתשיג ביקורות ב-Google, הן יופיעו אוטומטית.

**ש: איך אני מוצא את ה-Place ID?**
ת: ראה שלב 1 למעלה - יש כמה דרכים.

## עזרה נוספת?

אם יש בעיות:
1. הרץ `npm run check-reviews` - הוא יראה מה הבעיה
2. בדוק שהכל מועתק נכון ב-`.env.local` (ללא רווחים מיותרים)
3. וודא שהשרת הופעל מחדש אחרי הוספת הערכים


