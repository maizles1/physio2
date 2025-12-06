# מדריך הגדרת Google My Business Reviews באתר

מדריך מפורט להגדרת ביקורות מ-Google My Business באתר באמצעות Google Places API.

## תקציר

האתר משתמש ב-Google Places API לטעינת ביקורות מ-Google My Business ולהצגתן באתר. כמו כן, ניתן ליצור קישור שמאפשר ללקוחות להשאיר ביקורת ב-Google My Business עם מעבר אוטומטי חזרה לאתר.

## שלב 1: יצירת Google Cloud Project

1. לך ל-[Google Cloud Console](https://console.cloud.google.com/)
2. לחץ על "New Project" (פרויקט חדש)
3. תן שם לפרויקט (למשל: "Physiotherapy Plus Website")
4. לחץ "Create"

## שלב 2: הפעלת Google Places API

1. בפרויקט שיצרת, לך ל-"APIs & Services" > "Library"
2. חפש "Places API"
3. בחר "Places API" מהרשימה
4. לחץ "Enable" (הפעל)

**חשוב**: וודא שהפעלת **Places API** ולא רק Maps JavaScript API.

## שלב 3: יצירת API Key

1. לך ל-"APIs & Services" > "Credentials"
2. לחץ "Create Credentials" > "API Key"
3. העתק את ה-API Key שנוצר
4. לחץ "Edit API Key" (ערוך מפתח API)
5. בהגבלות:
   - **Application restrictions**: בחר "HTTP referrers" (עבור אתר) או "None" (לא מומלץ לייצור)
   - **API restrictions**: בחר "Restrict key" ובחר "Places API"
6. שמור את השינויים

**אבטחה**: 
- אל תשתף את ה-API Key בפומבי
- הגבל את ה-API Key רק ל-API הנדרש (Places API)
- שמור את ה-API Key בסוד

## שלב 4: מציאת Place ID

יש כמה דרכים למצוא את ה-Place ID:

### דרך 1: דרך Google My Business

1. לך ל-[Google My Business](https://www.google.com/business/)
2. בחר את העסק שלך
3. לחץ על "Info" (מידע)
4. גלול למטה למצוא את ה-"Business ID" או חפש "Place ID"

### דרך 2: דרך Google Maps

1. פתח את [Google Maps](https://www.google.com/maps)
2. חפש את העסק שלך
3. לחץ על העסק
4. לחץ על "Share" (שתף)
5. בחר "Embed a map"
6. בקוד שיוצג, חפש את ה-Place ID (נראה כמו: `ChIJ...`)

### דרך 3: דרך Place ID Finder

1. לך ל-[Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. חפש את העסק שלך
3. העתק את ה-Place ID

### דרך 4: דרך Google Places API

אם יש לך כבר את הכתובת, תוכל להשתמש ב-Google Places API Autocomplete:

```bash
curl "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=יקינטון 3, אשדוד&inputtype=textquery&fields=place_id&key=YOUR_API_KEY"
```

## שלב 5: הגדרת משתני סביבה

1. צור קובץ `.env.local` בתיקיית השורש של הפרויקט (אם עדיין לא קיים)

2. הוסף את המשתנים הבאים:

```env
# Google My Business / Google Places API
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJ... (החלף ב-Place ID שלך)
GOOGLE_MAPS_API_KEY=AIza... (החלף ב-API Key שלך)
```

**דוגמה**:
```env
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJN1t_tDeuEmsRUsoyG83frY4
GOOGLE_MAPS_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz
```

**הערות**:
- `NEXT_PUBLIC_GOOGLE_PLACE_ID` - חייב להתחיל ב-`NEXT_PUBLIC_` כדי להיות זמין ב-Client Side
- `GOOGLE_MAPS_API_KEY` - לא צריך `NEXT_PUBLIC_` כי הוא נשאר ב-Server Side בלבד

3. שמור את הקובץ

## שלב 6: בדיקת פעילות

### בדיקה ידנית של API

תוכל לבדוק את ה-API ישירות דרך הדפדפן:

```
https://maps.googleapis.com/maps/api/place/details/json?place_id=YOUR_PLACE_ID&fields=reviews,rating,user_ratings_total&key=YOUR_API_KEY&language=iw
```

החלף:
- `YOUR_PLACE_ID` - ב-Place ID שלך
- `YOUR_API_KEY` - ב-API Key שלך

אם הכל תקין, תקבל JSON עם הביקורות.

### בדיקה דרך האתר

1. הפעל את השרת:
   ```bash
   npm run dev
   ```

2. לך לכתובת: `http://localhost:3000/api/reviews`

3. אם הכל תקין, תקבל JSON עם ביקורות

4. לך לדף העדויות: `http://localhost:3000/testimonials`

5. הביקורות מ-Google אמורות להופיע

## שלב 7: הגדרת קישור להשארת ביקורת

הקישור להשארת ביקורת נוצר אוטומטית. הוא כולל:
- Place ID של העסק
- מעביר ישירות לדף השארת ביקורת ב-Google

**חשוב לדעת:** Google לא תומך ב-redirect אוטומטי לאחר מילוי ביקורת. הקישור מעביר לדף הביקורת, ואחרי שהמשתמש מפרסם את הביקורת, הוא צריך לחזור ידנית לאתר.

הקישור נוצר בפורמט:
```
https://search.google.com/local/writereview?placeid=PLACE_ID
```

הקישור זמין בקומפוננטה `LeaveReviewButton` ובדף `/review` עם הוראות מפורטות.

## פתרון בעיות

### בעיה: "Google Places API not configured"

**פתרון**:
1. וודא שיצרת את קובץ `.env.local`
2. וודא שהשמות נכונים: `NEXT_PUBLIC_GOOGLE_PLACE_ID` ו-`GOOGLE_MAPS_API_KEY`
3. הפעל מחדש את השרת (חשוב!)

### בעיה: "INVALID_REQUEST" או שגיאת API

**פתרון**:
1. וודא שה-API Key תקין
2. וודא שהפעלת את Places API ב-Google Cloud Console
3. וודא שה-Place ID נכון
4. בדוק ב-Google Cloud Console שה-API Key מוגבל נכון (Places API)

### בעיה: "REQUEST_DENIED"

**פתרון**:
1. בדוק שה-API Key לא מוגבל מדי
2. וודא שהפעלת את Places API
3. בדוק שה-API Key לא פג תוקף
4. וודא שלא הגעת למגבלת השימוש (Quota)

### בעיה: אין ביקורות מוצגות

**פתרון**:
1. בדוק שיש ביקורות ב-Google My Business
2. בדוק שה-API מחזיר ביקורות (ראה שלב 6)
3. בדוק את הקונסול בדפדפן לשגיאות

### בעיה: ביקורות לא מעודכנות

**פתרון**:
- הביקורות נשמרות ב-cache למשך שעה
- כדי לעדכן מיידית, עצור והפעל מחדש את השרת
- או חכה שעה לעדכון אוטומטי

## הגדרות מתקדמות

### שינוי זמן Cache

בקובץ `app/api/reviews/route.ts`, שנה את:
```typescript
export const revalidate = 3600 // seconds
```

### הוספת ביקורות מקומיות

אם תרצה להוסיף גם ביקורות מקומיות (לא מ-Google), תוכל לעדכן את `app/testimonials/page.tsx` לשילוב של ביקורות מ-Google וביקורות מקומיות.

## עלויות

Google Places API מציע **$200 credit חינם מדי חודש** לחשבונות חדשים.

לאחר מכן:
- **Places Details** (כולל Reviews): $17 לכל 1,000 קריאות
- **Places Details (Basic Data)**: $4.60 לכל 1,000 קריאות

עם cache של שעה, הכמות תהיה קטנה מאוד (כ-24-48 קריאות ביום, בהתאם למספר המשתמשים).

## אבטחה

1. **אל תפרסם את ה-API Key** - שמור אותו רק ב-`.env.local`
2. **הגבל את ה-API Key** - רק ל-API הנדרש (Places API)
3. **הגבל Domain** - אם אפשר, הגבל את ה-API Key לדומיין שלך בלבד
4. **עקוב אחר השימוש** - בדוק ב-Google Cloud Console את השימוש

## עזרה נוספת

- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)

## שאלות נפוצות

**ש: האם אני צריך לשלם?**  
ת: יש לך $200 credit חינם מדי חודש. רוב האתרים לא עוברים את הסכום הזה.

**ש: כמה ביקורות יוצגו?**  
ת: כל הביקורות מ-Google My Business יוצגו.

**ש: האם הביקורות מתעדכנות אוטומטית?**  
ת: כן, כל שעה. ניתן לשנות את ההגדרה.

**ש: האם אפשר להוסיף ביקורות ידנית?**  
ת: כן, ניתן לעדכן את הקוד כדי להוסיף גם ביקורות מקומיות.

