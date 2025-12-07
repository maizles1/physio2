# מדריך העלאה ל-GitHub - שלב אחר שלב

## שלב 1: יצירת Personal Access Token ב-GitHub

1. **לך ל-GitHub:**
   - פתח דפדפן ולך ל: https://github.com/settings/tokens
   - או: GitHub → התמונה שלך (ימין למעלה) → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **צור Token חדש:**
   - לחץ על "Generate new token" → "Generate new token (classic)"

3. **הגדר את ה-Token:**
   - **Note:** תן שם, למשל: `physio2-upload`
   - **Expiration:** בחר תאריך תפוגה (מומלץ: 90 days או No expiration)
   - **Select scopes:** סמן את התיבה `repo` (זה יבחר את כל התיבות תחתיו)

4. **צור את ה-Token:**
   - לחץ "Generate token" בתחתית הדף
   - **חשוב:** העתק את ה-Token מיד! הוא יופיע רק פעם אחת
   - שמור את ה-Token במקום בטוח

## שלב 2: העלאת הקוד ל-GitHub

### אופציה A: שימוש ב-Terminal (מומלץ)

1. **פתח Terminal:**
   - לחץ `Cmd + Space` וחפש "Terminal"
   - או פתח את Terminal ב-Cursor

2. **נווט לתיקיית הפרויקט:**
   ```bash
   cd /Users/andrey/Documents/physio2
   ```

3. **בדוק את מצב ה-Git:**
   ```bash
   git status
   ```
   - צריך לראות "nothing to commit, working tree clean"

4. **העלה את הקוד:**
   ```bash
   git push -u origin main
   ```

5. **כאשר תתבקש:**
   - **Username:** `maizles1`
   - **Password:** הדבק את ה-Personal Access Token שיצרת (לא הסיסמה של GitHub!)

### אופציה B: שימוש ב-GitHub Desktop

1. **הורד והתקן GitHub Desktop:**
   - לך ל: https://desktop.github.com/
   - הורד והתקן את התוכנה

2. **התחבר ל-GitHub:**
   - פתח את GitHub Desktop
   - התחבר עם החשבון שלך

3. **הוסף את הפרויקט:**
   - File → Add Local Repository
   - בחר את התיקייה: `/Users/andrey/Documents/physio2`
   - לחץ "Add repository"

4. **העלה את הקוד:**
   - לחץ על "Publish repository" או "Push origin"
   - בחר את ה-repository: `maizles1/physio2`
   - לחץ "Publish repository"

## שלב 3: בדיקה שהקוד עלה בהצלחה

1. **לך ל-GitHub:**
   - פתח: https://github.com/maizles1/physio2

2. **בדוק:**
   - צריך לראות את כל הקבצים והתיקיות
   - צריך לראות את ה-README.md
   - צריך לראות את כל התיקיות: `app/`, `components/`, `config/`, וכו'

## פתרון בעיות

### בעיה: "Authentication failed"
**פתרון:**
- ודא שהשתמשת ב-Personal Access Token ולא בסיסמה
- ודא שה-Token עדיין תקף
- נסה ליצור Token חדש

### בעיה: "Repository not found"
**פתרון:**
- ודא שה-repository קיים ב-GitHub
- ודא שיש לך הרשאות ל-repository
- בדוק את ה-URL: `https://github.com/maizles1/physio2.git`

### בעיה: "Permission denied"
**פתרון:**
- ודא שה-Token כולל הרשאות `repo`
- נסה ליצור Token חדש עם כל ההרשאות

### בעיה: "Large files"
**פתרון:**
- אם יש קבצים גדולים, GitHub מגביל ל-100MB
- בדוק אם יש תמונות גדולות ב-`public/images/`
- אפשר להשתמש ב-Git LFS לקבצים גדולים

## פקודות נוספות שימושיות

```bash
# בדיקת מצב
git status

# בדיקת ה-remote
git remote -v

# בדיקת ה-commits
git log --oneline -5

# עדכון אחרי שינויים
git add .
git commit -m "תיאור השינויים"
git push
```

## מה הלאה?

לאחר שהקוד עלה ל-GitHub, תוכל:
- לשתף את הקוד עם אחרים
- לעבוד על הפרויקט ממחשבים שונים
- להגדיר CI/CD (Continuous Integration)
- לפרוס את האתר ל-Vercel/Netlify ישירות מ-GitHub

---

**עזרה נוספת:**
- [GitHub Documentation](https://docs.github.com/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

