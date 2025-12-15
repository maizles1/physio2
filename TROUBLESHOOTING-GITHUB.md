# פתרון בעיות העלאה ל-GitHub

## בעיה: HTTP 400 או Authentication failed

### פתרון 1: ודא שה-Token תקין

1. לך ל: https://github.com/settings/tokens
2. בדוק שה-Token עדיין קיים ולא פג תוקף
3. ודא שה-Token כולל הרשאות `repo` (כל ההרשאות)

### פתרון 2: נקה את ה-Credentials השמורים

הרץ את הפקודות הבאות:

```bash
cd /Users/andrey/Documents/physio2

# מחק credentials שמורים
git credential-osxkeychain erase <<EOF
host=github.com
protocol=https
EOF

# נסה שוב
git push -u origin main
```

### פתרון 3: השתמש ב-Token ישירות ב-URL (זמני)

החלף `YOUR_TOKEN` ב-Token האמיתי שלך:

```bash
cd /Users/andrey/Documents/physio2
git remote set-url origin https://YOUR_TOKEN@github.com/maizles1/physio2.git
git push -u origin main
```

**אז תחזיר את ה-URL ל-normal:**
```bash
git remote set-url origin https://github.com/maizles1/physio2.git
```

### פתרון 4: GitHub Desktop (הכי קל)

1. הורד: https://desktop.github.com/
2. התחבר עם החשבון שלך
3. File → Add Local Repository
4. בחר: `/Users/andrey/Documents/physio2`
5. לחץ "Publish repository"

### פתרון 5: בדוק את ה-Token

ודא שה-Token:
- ✅ כולל הרשאות `repo`
- ✅ לא פג תוקף
- ✅ הועתק נכון (ללא רווחים מיותרים)

### פתרון 6: צור Token חדש

אם כלום לא עובד, צור Token חדש:

1. לך ל: https://github.com/settings/tokens
2. מחק את ה-Token הישן (אם יש)
3. צור Token חדש עם כל ההרשאות
4. נסה שוב

## שגיאות נפוצות

### "Repository not found"
- ודא שה-repository קיים: https://github.com/maizles1/physio2
- ודא שיש לך הרשאות

### "Permission denied"
- ודא שה-Token כולל הרשאות `repo`
- נסה Token חדש

### "Large files"
- GitHub מגביל קבצים ל-100MB
- בדוק אם יש תמונות גדולות

## פקודות לבדיקה

```bash
# בדוק את ה-remote
git remote -v

# בדוק את ה-commits
git log --oneline -5

# בדוק את המצב
git status

# נסה push שוב
git push -u origin main
```





