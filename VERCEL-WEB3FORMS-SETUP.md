# הגדרת Web3Forms ב-Vercel

## הוראות להגדרת טופס יצירת קשר ב-production

### שלב 1: הוספת Environment Variable ב-Vercel

1. לך ל-Vercel Dashboard: https://vercel.com
2. בחר את הפרויקט שלך
3. לך ל: **Settings** → **Environment Variables**
4. לחץ על **Add New**
5. הוסף את המשתנה הבא:
   - **Name**: `WEB3FORMS_ACCESS_KEY`
   - **Value**: `508775fc-382e-4616-97d8-c21fa7e907ea` ⚠️ **חשוב: העתק את הערך הזה בדיוק**
   - **Environment**: בחר **Production** (וגם **Preview** אם רלוונטי)
6. לחץ **Save**

### שלב 2: Redeploy

לאחר הוספת המשתנה, יש לבצע Redeploy:

1. לך ל-**Deployments** בפרויקט
2. לחץ על ה-3 נקודות (⋯) ליד ה-deployment האחרון
3. בחר **Redeploy**
4. המתן לסיום ה-deployment

### שלב 3: בדיקה

לאחר ה-deployment:
1. לך לעמוד "צור קשר" באתר
2. מלא את הטופס
3. שלח את הטופס
4. אמור לראות הודעת הצלחה

## הערות חשובות

- **אבטחה**: ה-access key לא חשוף ל-client (נשמר ב-server-side בלבד)
- **Fallback**: אם יש כבר `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` ב-Vercel, הוא יעבוד זמנית, אבל עדיף להסיר אותו ולהוסיף רק `WEB3FORMS_ACCESS_KEY`
- **פיתוח מקומי**: המשתנה כבר מוגדר ב-`.env.local` (לא נדחף ל-Git)

## פתרון בעיות

### הטופס עדיין מציג "שירות האימייל לא מוגדר"

1. ודא שהוספת את `WEB3FORMS_ACCESS_KEY` ב-Vercel (לא `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`)
2. ודא שביצעת Redeploy לאחר הוספת המשתנה
3. בדוק את ה-logs ב-Vercel Dashboard → Deployments → ה-deployment האחרון → Functions → `/api/contact`

### שגיאת 500

- בדוק את ה-logs ב-Vercel
- ודא שה-access key תקין (לא כולל רווחים או תווים מיוחדים)
- ודא שה-access key לא פג תוקף ב-Web3Forms

## קישורים שימושיים

- Web3Forms Dashboard: https://web3forms.com
- Vercel Dashboard: https://vercel.com/dashboard
