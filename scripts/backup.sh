#!/bin/bash

# ============================================
# סקריפט גיבוי לאתר Physio2
# Backup Script for Physio2 Website
# ============================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="physio2"
BACKUP_DIR="${HOME}/physio2-backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="${PROJECT_NAME}_backup_${TIMESTAMP}"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}גיבוי אתר Physio2${NC}"
echo -e "${BLUE}Physio2 Website Backup${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# Create backup directory if it doesn't exist
mkdir -p "${BACKUP_PATH}"

echo -e "${GREEN}✓${NC} תיקיית גיבוי נוצרה: ${BACKUP_PATH}"

# Function to copy files/directories
copy_item() {
    local source="$1"
    local dest="$2"
    local description="$3"
    
    if [ -e "${PROJECT_ROOT}/${source}" ]; then
        cp -r "${PROJECT_ROOT}/${source}" "${dest}/"
        echo -e "${GREEN}✓${NC} ${description}"
    else
        echo -e "${YELLOW}⚠${NC} ${description} - לא נמצא"
    fi
}

# 1. Source code and configuration
echo ""
echo -e "${BLUE}מעתיק קבצי קוד ותצורה...${NC}"
copy_item "app" "${BACKUP_PATH}" "תיקיית app"
copy_item "components" "${BACKUP_PATH}" "תיקיית components"
copy_item "config" "${BACKUP_PATH}" "תיקיית config"
copy_item "lib" "${BACKUP_PATH}" "תיקיית lib"
copy_item "scripts" "${BACKUP_PATH}" "תיקיית scripts"
copy_item "public" "${BACKUP_PATH}" "תיקיית public"
copy_item "analysis" "${BACKUP_PATH}" "תיקיית analysis"

# 2. Configuration files
echo ""
echo -e "${BLUE}מעתיק קבצי תצורה...${NC}"
copy_item "package.json" "${BACKUP_PATH}" "package.json"
copy_item "package-lock.json" "${BACKUP_PATH}" "package-lock.json"
copy_item "tsconfig.json" "${BACKUP_PATH}" "tsconfig.json"
copy_item "next.config.ts" "${BACKUP_PATH}" "next.config.ts"
copy_item "next-env.d.ts" "${BACKUP_PATH}" "next-env.d.ts"
copy_item "postcss.config.mjs" "${BACKUP_PATH}" "postcss.config.mjs"
copy_item "eslint.config.mjs" "${BACKUP_PATH}" "eslint.config.mjs"
copy_item "middleware.ts" "${BACKUP_PATH}" "middleware.ts"
copy_item "vercel.json" "${BACKUP_PATH}" "vercel.json"
copy_item ".vercelignore" "${BACKUP_PATH}" ".vercelignore"
copy_item ".npmrc" "${BACKUP_PATH}" ".npmrc"
copy_item ".gitignore" "${BACKUP_PATH}" ".gitignore"

# 3. Documentation files
echo ""
echo -e "${BLUE}מעתיק קבצי תיעוד...${NC}"
copy_item "README.md" "${BACKUP_PATH}" "README.md"
copy_item "env.example" "${BACKUP_PATH}" "env.example"

# Copy all markdown documentation files
if [ -d "${PROJECT_ROOT}" ]; then
    find "${PROJECT_ROOT}" -maxdepth 1 -name "*.md" -type f | while read -r file; do
        filename=$(basename "$file")
        if [ "$filename" != "README.md" ]; then
            cp "$file" "${BACKUP_PATH}/"
            echo -e "${GREEN}✓${NC} ${filename}"
        fi
    done
fi

# 4. Environment variables (if accessible)
echo ""
echo -e "${BLUE}מעתיק משתני סביבה...${NC}"
if [ -f "${PROJECT_ROOT}/.env.local" ]; then
    cp "${PROJECT_ROOT}/.env.local" "${BACKUP_PATH}/.env.local.backup"
    echo -e "${GREEN}✓${NC} .env.local"
else
    echo -e "${YELLOW}⚠${NC} .env.local לא נמצא (ייתכן שהוא ב-.gitignore)"
fi

# 5. Create backup info file
echo ""
echo -e "${BLUE}יוצר קובץ מידע על הגיבוי...${NC}"
cat > "${BACKUP_PATH}/BACKUP_INFO.txt" << EOF
============================================
גיבוי אתר Physio2
Physio2 Website Backup
============================================

תאריך ושעה: $(date '+%Y-%m-%d %H:%M:%S')
Date & Time: $(date '+%Y-%m-%d %H:%M:%S')

מיקום הפרויקט: ${PROJECT_ROOT}
Project Location: ${PROJECT_ROOT}

גרסת Node.js: $(node --version 2>/dev/null || echo "לא מותקן")
Node.js Version: $(node --version 2>/dev/null || echo "Not installed")

גרסת npm: $(npm --version 2>/dev/null || echo "לא מותקן")
npm Version: $(npm --version 2>/dev/null || echo "Not installed")

תוכן הגיבוי:
Backup Contents:
- קוד מקור (Source code)
- קבצי תצורה (Configuration files)
- קבצים ציבוריים (Public assets)
- תיעוד (Documentation)
- משתני סביבה (Environment variables)

הוראות שחזור:
Restore Instructions:
1. העתק את כל הקבצים חזרה למיקום הפרויקט
   Copy all files back to project location
2. הפעל: npm install
   Run: npm install
3. ודא שקובץ .env.local קיים עם כל המשתנים
   Ensure .env.local exists with all variables
4. הפעל: npm run build
   Run: npm run build

============================================
EOF

echo -e "${GREEN}✓${NC} BACKUP_INFO.txt נוצר"

# 6. Create compressed archive
echo ""
echo -e "${BLUE}יוצר ארכיון דחוס...${NC}"
cd "${BACKUP_DIR}"
if command -v tar &> /dev/null; then
    tar -czf "${BACKUP_NAME}.tar.gz" "${BACKUP_NAME}"
    echo -e "${GREEN}✓${NC} ארכיון נוצר: ${BACKUP_NAME}.tar.gz"
    
    # Get file size
    ARCHIVE_SIZE=$(du -h "${BACKUP_NAME}.tar.gz" | cut -f1)
    echo -e "${GREEN}✓${NC} גודל הארכיון: ${ARCHIVE_SIZE}"
else
    echo -e "${YELLOW}⚠${NC} tar לא מותקן - מדלג על יצירת ארכיון"
fi

# 7. Cleanup old backups (keep last 10)
echo ""
echo -e "${BLUE}מנקה גיבויים ישנים (שומר 10 האחרונים)...${NC}"
if [ -d "${BACKUP_DIR}" ]; then
    cd "${BACKUP_DIR}"
    # Count backups (directories and archives)
    BACKUP_COUNT=$(ls -1d ${PROJECT_NAME}_backup_* 2>/dev/null | wc -l | tr -d ' ')
    
    if [ "$BACKUP_COUNT" -gt 10 ]; then
        ls -1t ${PROJECT_NAME}_backup_* 2>/dev/null | tail -n +11 | while read -r old_backup; do
            rm -rf "$old_backup"
            echo -e "${YELLOW}✓${NC} נמחק: $old_backup"
        done
    else
        echo -e "${GREEN}✓${NC} אין גיבויים ישנים למחיקה"
    fi
fi

# Summary
echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}✓ הגיבוי הושלם בהצלחה!${NC}"
echo -e "${GREEN}✓ Backup completed successfully!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "${BLUE}מיקום הגיבוי:${NC} ${BACKUP_PATH}"
echo -e "${BLUE}Backup Location:${NC} ${BACKUP_PATH}"
if [ -f "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz" ]; then
    echo -e "${BLUE}מיקום הארכיון:${NC} ${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"
    echo -e "${BLUE}Archive Location:${NC} ${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"
fi
echo ""
