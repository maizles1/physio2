/**
 * סקריפט לניתוח אורך מאמרי הבלוג
 * מזהה מאמרים שקצרים מ-700 מילים
 */

const fs = require('fs');
const path = require('path');

// פונקציה להסרת תגיות HTML וספירת מילים
function countWords(htmlContent) {
  if (!htmlContent || typeof htmlContent !== 'string') return 0;
  
  // הסרת תגיות HTML
  let text = htmlContent.replace(/<[^>]+>/g, ' ');
  
  // הסרת רווחים מיותרים וסימני פיסוק בודדים
  text = text.replace(/\s+/g, ' ').trim();
  
  // ספירת מילים (מופרדות ברווחים)
  const words = text.split(/\s+/).filter(word => {
    const trimmed = word.trim();
    return trimmed.length > 0 && trimmed !== '&nbsp;';
  });
  
  return words.length;
}

// קריאת קובץ הקונפיג
const configPath = path.join(__dirname, '..', 'config', 'blog.config.ts');
const configContent = fs.readFileSync(configPath, 'utf-8');

// חילוץ כל המאמרים מתוך הקובץ
// נחפש מבנה של object שמתחיל ב-id
const posts = [];
const postPattern = /{\s*id:\s*'([^']+)',[\s\S]*?},\s*(?=\s*{|$)/g;

let match;
while ((match = postPattern.exec(configContent)) !== null) {
  const postBlock = match[0];
  const postId = match[1];
  
  // חילוץ slug
  const slugMatch = postBlock.match(/slug:\s*'([^']+)'/);
  if (!slugMatch) continue;
  const slug = slugMatch[1];
  
  // חילוץ title
  const titleMatch = postBlock.match(/title:\s*'([^']+)'/);
  const title = titleMatch ? titleMatch[1] : 'ללא כותרת';
  
  // חילוץ content - צריך להיות זהיר עם backticks
  const contentMatch = postBlock.match(/content:\s*`([\s\S]*?)`\s*,/);
  if (!contentMatch) continue;
  
  const content = contentMatch[1];
  const wordCount = countWords(content);
  
  posts.push({
    id: postId,
    slug,
    title,
    wordCount,
    needsExpansion: wordCount < 700
  });
}

// הפרדת מאמרים קצרים
const shortPosts = posts.filter(p => p.needsExpansion);
const longPosts = posts.filter(p => !p.needsExpansion);

// הצגת תוצאות
console.log(`\n=== ניתוח מאמרי הבלוג ===\n`);
console.log(`סה"כ מאמרים שנבדקו: ${posts.length}`);
console.log(`מאמרים מעל 700 מילים: ${longPosts.length}`);
console.log(`מאמרים שקצרים מ-700 מילים: ${shortPosts.length}\n`);

if (shortPosts.length > 0) {
  console.log('רשימת מאמרים שצריכים הרחבה:\n');
  shortPosts.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title}`);
    console.log(`   ID: ${post.id} | Slug: ${post.slug}`);
    console.log(`   אורך נוכחי: ${post.wordCount} מילים`);
    console.log(`   נדרש: 1000 מילים (צריך להוסיף ${1000 - post.wordCount} מילים)\n`);
  });
  
  // שמירת התוצאות לקובץ JSON
  const outputPath = path.join(__dirname, 'short-posts-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(shortPosts, null, 2), 'utf-8');
  console.log(`\nדוח נשמר ב: ${outputPath}`);
  
  // יצירת קובץ רשימה פשוט יותר לעבודה
  const simpleList = shortPosts.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    currentWords: p.wordCount,
    neededWords: 1000 - p.wordCount
  }));
  
  const listPath = path.join(__dirname, 'short-posts-list.json');
  fs.writeFileSync(listPath, JSON.stringify(simpleList, null, 2), 'utf-8');
  console.log(`רשימה פשוטה נשמרה ב: ${listPath}\n`);
} else {
  console.log('כל המאמרים הם מעל 700 מילים! 🎉\n');
}

// סטטיסטיקות
if (posts.length > 0) {
  const avgWords = Math.round(posts.reduce((sum, p) => sum + p.wordCount, 0) / posts.length);
  const minWords = Math.min(...posts.map(p => p.wordCount));
  const maxWords = Math.max(...posts.map(p => p.wordCount));
  
  console.log('סטטיסטיקות:');
  console.log(`  ממוצע מילים למאמר: ${avgWords}`);
  console.log(`  מאמר הקצר ביותר: ${minWords} מילים`);
  console.log(`  מאמר הארוך ביותר: ${maxWords} מילים\n`);
}










