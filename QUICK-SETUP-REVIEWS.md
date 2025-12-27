# ⚡ התקנה מהירה: ביקורות מ-Google

## 📋 מה צריך לעשות? (3 שלבים פשוטים)

---

## ✅ שלב 1: מציאת Place ID (2 דקות)

### דרך מהירה ביותר:

1. **פתח דפדפן** → https://www.google.com/maps

2. **חפש:** `יקינטון 3, אשדוד` (או שם הקליניקה שלך)

3. **לחץ על שם הקליניקה** כדי לפתוח אותה

4. **לחץ על "שתף" (Share)** ← כפתור בצד שמאל

5. **לחץ על "העתק קישור"**

6. **פתח מסמך** (TextEdit, Notes) והדבק את הקישור

7. **חפש בקישור** מחרוזת שמתחילה ב-`ChIJ` 

   📌 **זה ה-Place ID!**

8. **העתק רק את החלק הזה** (מתחיל ב-ChIJ)

---

## ✅ שלב 2: יצירת API Key (10 דקות)

### הוראות מפורטות:

1. **פתח:** https://console.cloud.google.com/

2. **צור פרויקט:**
   - לחץ על שם הפרויקט למעלה
   - לחץ "New Project"
   - שם: "Physiotherapy Website"
   - לחץ "Create"

3. **הפעל Places API:**
   - חפש: `Places API`
   - לחץ על "Places API"
   - לחץ "ENABLE"

4. **צור API Key:**
   - "APIs & Services" → "Credentials"
   - לחץ "+ CREATE CREDENTIALS" → "API Key"
   - **העתק את המפתח** שנוצר

5. **הגבל את המפתח:**
   - לחץ על המפתח שיצרת
   - "API restrictions" → "Restrict key"
   - בחר רק: "Places API"
   - לחץ "SAVE"

---

## ✅ שלב 3: הוספה לקובץ `.env.local`

1. **פתח את הקובץ:** `.env.local` בתיקיית הפרויקט

2. **מצא את השורות:**
   ```
   NEXT_PUBLIC_GOOGLE_PLACE_ID=
   GOOGLE_MAPS_API_KEY=
   ```

3. **הוסף את הערכים:**
   ```
   NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJ... (החלף ב-Place ID שלך)
   GOOGLE_MAPS_API_KEY=AIza... (החלף ב-API Key שלך)
   ```

4. **שמור את הקובץ**

---

## ✅ בדיקה

הרץ בטרמינל:
```bash
npm run check-reviews
```

אם הכל תקין → תראה הודעות הצלחה! ✅

---

## 🆘 עזרה

- **מדריך מפורט:** `GOOGLE-BUSINESS-SETUP.md`
- **מדריך מהיר:** `QUICK-START-GOOGLE-REVIEWS.md`

---

## 🎯 מה קורה אחרי זה?

אחרי שתמלא את הערכים ותריץ את הבדיקה:
1. הביקורות מ-Google יופיעו אוטומטית בדף `/testimonials`
2. 3 ביקורות ראשונות יופיעו בדף הבית
3. הכל מתעדכן אוטומטית מ-Google

---

**🎉 זה הכל! פשוט מאוד!**










