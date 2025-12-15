# מדריך להעלאת שינויים ל-GitHub

## שימוש מהיר

### אפשרות 1: עם סקריפט (מומלץ)
```bash
npm run git-push "הודעה ל-commit"
```

דוגמה:
```bash
npm run git-push "Fix dependencies and Vercel configuration"
```

### אפשרות 2: ישירות
```bash
bash scripts/git-push.sh "הודעה ל-commit"
```

---

## מה הסקריפט עושה?

1. ✅ בודק אם יש שינויים
2. ✅ מציג את השינויים
3. ✅ מוסיף את כל השינויים (`git add .`)
4. ✅ יוצר commit עם ההודעה שנתת
5. ✅ שואל אם להעלות ל-GitHub
6. ✅ מעלה ל-GitHub אם אישרת

---

## שימוש ידני (ללא סקריפט)

אם אתה מעדיף לעשות את זה ידנית:

```bash
# 1. בדוק מה השתנה
git status

# 2. הוסף שינויים
git add .

# 3. צור commit
git commit -m "הודעה שלך כאן"

# 4. העלה ל-GitHub
git push -u origin main
```

---

## בדיקה שהכל עלה

### 1. בדוק ב-GitHub:
- לך ל: https://github.com/maizles1/physio2
- בדוק את ה-commits האחרונים
- בדוק את הקבצים - הם אמורים להיות מעודכנים

### 2. בדוק ב-Vercel:
- אם יש לך פרויקט ב-Vercel, הוא יתעדכן אוטומטית
- לך ל-Vercel Dashboard → Deployments
- תראה deployment חדש

---

## פתרון בעיות

### שגיאה: "not a git repository"
```bash
cd /Users/andrey/Documents/physio2
git init
git remote add origin https://github.com/maizles1/physio2.git
```

### שגיאה: "authentication failed"
- צריך Personal Access Token מ-GitHub
- ראה: `GITHUB-UPLOAD-GUIDE.md`

### שגיאה: "nothing to commit"
- אין שינויים חדשים
- הכל כבר ב-commit

---

## טיפים

1. **הודעות commit טובות:**
   - `"Fix dependencies and Vercel configuration"`
   - `"Update package.json"`
   - `"Add new feature"`

2. **בדוק לפני push:**
   ```bash
   git status
   git diff --staged
   ```

3. **אם אתה לא בטוח:**
   - השתמש בסקריפט - הוא יציג לך את השינויים לפני commit
   - או עשה `git status` לפני `git add`





