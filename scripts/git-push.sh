#!/bin/bash

# סקריפט להעלאת שינויים ל-GitHub אוטומטית
# שימוש: ./scripts/git-push.sh "הודעה ל-commit"

set -e  # עצור אם יש שגיאה

# צבעים לטרמינל
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔄 בודק שינויים...${NC}"

# בדוק אם יש שינויים
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✅ אין שינויים להעלות${NC}"
    exit 0
fi

# הצג את השינויים
echo -e "${YELLOW}📋 השינויים:${NC}"
git status --short

# קבל הודעת commit
COMMIT_MSG="${1:-Update files}"

echo -e "${YELLOW}📝 מוסיף שינויים...${NC}"
git add .

echo -e "${YELLOW}💾 יוצר commit...${NC}"
git commit -m "$COMMIT_MSG"

echo -e "${GREEN}✅ Commit נוצר בהצלחה!${NC}"

# שאל אם להעלות ל-GitHub
read -p "האם להעלות ל-GitHub? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🚀 מעלה ל-GitHub...${NC}"
    git push -u origin main
    echo -e "${GREEN}✅ השינויים עלו ל-GitHub בהצלחה!${NC}"
else
    echo -e "${YELLOW}ℹ️  השינויים נשמרו מקומית. להעלות מאוחר יותר, הרץ: git push${NC}"
fi








