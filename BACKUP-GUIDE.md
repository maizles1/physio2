# מדריך גיבוי אתר Physio2
# Physio2 Website Backup Guide

## סקירה כללית / Overview

סקריפט הגיבוי יוצר עותק מלא של כל הקבצים החשובים של האתר, כולל:
The backup script creates a complete copy of all important website files, including:

- ✅ קוד מקור (Source code)
- ✅ קבצי תצורה (Configuration files)
- ✅ קבצים ציבוריים (Public assets - images, logos, etc.)
- ✅ תיעוד (Documentation)
- ✅ משתני סביבה (Environment variables - .env.local)

## איך להפעיל / How to Run

### שיטה 1: באמצעות npm
### Method 1: Using npm

```bash
npm run backup
```

### שיטה 2: ישירות
### Method 2: Direct execution

```bash
bash scripts/backup.sh
```

או:
Or:

```bash
./scripts/backup.sh
```

## מיקום הגיבויים / Backup Location

הגיבויים נשמרים בתיקייה:
Backups are saved in:

```
~/physio2-backups/
```

כל גיבוי נקרא בשם:
Each backup is named:

```
physio2_backup_YYYYMMDD_HHMMSS
```

לדוגמה:
For example:

```
physio2_backup_20250115_143022
```

## מה נשמר בגיבוי? / What's Included?

### קבצים ותיקיות שנשמרים:
### Files and folders included:

1. **קוד מקור / Source Code:**
   - `app/` - כל דפי האתר
   - `components/` - כל הקומפוננטות
   - `lib/` - ספריות עזר
   - `config/` - קבצי תצורה
   - `scripts/` - סקריפטים

2. **קבצי תצורה / Configuration:**
   - `package.json` ו-`package-lock.json`
   - `tsconfig.json`
   - `next.config.ts`
   - `middleware.ts`
   - `vercel.json`
   - `.env.local` (אם קיים)

3. **קבצים ציבוריים / Public Assets:**
   - `public/` - כל התמונות, לוגואים, וקבצים ציבוריים

4. **תיעוד / Documentation:**
   - כל קבצי ה-`.md` בתיקיית השורש

5. **קובץ מידע / Info File:**
   - `BACKUP_INFO.txt` - מידע על הגיבוי והוראות שחזור

## ארכיון דחוס / Compressed Archive

הסקריפט יוצר גם ארכיון דחוס (`.tar.gz`) של הגיבוי:
The script also creates a compressed archive (`.tar.gz`) of the backup:

```
physio2_backup_20250115_143022.tar.gz
```

זה שימושי ל:
This is useful for:
- העברה למחשב אחר / Transferring to another computer
- שמירה בענן / Cloud storage
- חיסכון במקום / Saving disk space

## ניקוי גיבויים ישנים / Old Backup Cleanup

הסקריפט שומר אוטומטית רק את 10 הגיבויים האחרונים.
The script automatically keeps only the last 10 backups.

גיבויים ישנים יותר נמחקים אוטומטית.
Older backups are automatically deleted.

## שחזור מגיבוי / Restore from Backup

### שלב 1: העתק את הקבצים
### Step 1: Copy the files

```bash
# העתק את כל הקבצים מהגיבוי חזרה לפרויקט
# Copy all files from backup back to project
cp -r ~/physio2-backups/physio2_backup_YYYYMMDD_HHMMSS/* /path/to/physio2/
```

### שלב 2: התקן תלויות
### Step 2: Install dependencies

```bash
cd /path/to/physio2
npm install
```

### שלב 3: ודא משתני סביבה
### Step 3: Verify environment variables

ודא שקובץ `.env.local` קיים עם כל המשתנים הנדרשים.
Ensure `.env.local` exists with all required variables.

אם יש קובץ `.env.local.backup` בגיבוי, העתק אותו:
If there's a `.env.local.backup` file in the backup, copy it:

```bash
cp ~/physio2-backups/physio2_backup_YYYYMMDD_HHMMSS/.env.local.backup .env.local
```

### שלב 4: בנה את האתר
### Step 4: Build the website

```bash
npm run build
```

## גיבוי אוטומטי / Automated Backups

### באמצעות cron (Linux/macOS)
### Using cron (Linux/macOS)

להפעלה יומית בשעה 2:00 בלילה:
To run daily at 2:00 AM:

```bash
# פתח את crontab
# Open crontab
crontab -e

# הוסף את השורה הבאה (החלף את הנתיב)
# Add the following line (replace the path)
0 2 * * * cd /Users/andrey/Documents/physio2 && npm run backup
```

### באמצעות launchd (macOS)
### Using launchd (macOS)

צור קובץ `~/Library/LaunchAgents/com.physio2.backup.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.physio2.backup</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>/Users/andrey/Documents/physio2/scripts/backup.sh</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>2</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    <key>StandardOutPath</key>
    <string>/tmp/physio2-backup.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/physio2-backup-error.log</string>
</dict>
</plist>
```

ואז הפעל:
Then run:

```bash
launchctl load ~/Library/LaunchAgents/com.physio2.backup.plist
```

## הערות חשובות / Important Notes

⚠️ **אבטחה / Security:**
- קובץ `.env.local` מכיל מידע רגיש (API keys, secrets)
- `.env.local` file contains sensitive information (API keys, secrets)
- ודא שהגיבויים מוגנים ולא נגישים לאחרים
- Ensure backups are protected and not accessible to others
- שקול להצפין גיבויים לפני העברה לענן
- Consider encrypting backups before uploading to cloud

💡 **טיפים / Tips:**
- הפעל גיבוי לפני עדכונים גדולים
- Run backup before major updates
- שמור גיבוי גם בענן (Google Drive, Dropbox, etc.)
- Keep a backup in the cloud as well (Google Drive, Dropbox, etc.)
- בדוק מדי פעם שהגיבויים תקינים
- Periodically verify that backups are valid

## פתרון בעיות / Troubleshooting

### שגיאה: "Permission denied"
### Error: "Permission denied"

```bash
chmod +x scripts/backup.sh
```

### שגיאה: "tar: command not found"
### Error: "tar: command not found"

זה לא קריטי - הגיבוי עדיין נוצר, רק ללא ארכיון דחוס.
This is not critical - backup is still created, just without compressed archive.

### הגיבוי לא כולל .env.local
### Backup doesn't include .env.local

זה נורמלי אם הקובץ ב-.gitignore. הסקריפט מנסה לגבות אותו בכל זאת.
This is normal if the file is in .gitignore. The script still tries to backup it.

אם זה לא עובד, העתק ידנית:
If it doesn't work, copy manually:

```bash
cp .env.local ~/physio2-backups/physio2_backup_YYYYMMDD_HHMMSS/.env.local.backup
```

## תמיכה / Support

אם יש בעיות או שאלות, בדוק את קובץ `BACKUP_INFO.txt` בכל גיבוי.
If you have issues or questions, check the `BACKUP_INFO.txt` file in each backup.

