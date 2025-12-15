#!/usr/bin/env node

/**
 * סקריפט ליצירת תמונות AI למאמרי הבלוג
 * 
 * שימוש:
 * 1. הגדר REPLICATE_API_TOKEN או OPENAI_API_KEY ב-.env.local
 * 2. הרץ: node scripts/generate-blog-images.js
 * 
 * אפשרויות:
 * - Replicate (מומלץ): חינמי/זול, משתמש ב-Stable Diffusion
 * - OpenAI DALL-E: דורש תשלום, איכות גבוהה
 * - Unsplash: תמונות חינמיות (fallback)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// הגדרות מאמרי הבלוג
const BLOG_POSTS = [
  {
    id: '83',
    slug: 'running-injuries-prevention-treatment-guide',
    title: 'רצים בטיילת באשדוד? המדריך המקיף לפציעות ריצה',
    imageFilename: 'running-injuries-guide.jpg',
    prompt: 'Runner on beach promenade, running injuries prevention, knee pain, shin splints, professional runner stretching, sports physiotherapy, realistic, high quality, 800x600',
    unsplashQuery: 'runner beach promenade running injuries knee pain',
    imageKeywords: ['running', 'runner', 'beach', 'promenade', 'knee pain', 'sports injury', 'physiotherapy'],
  },
  {
    id: '82',
    slug: 'ergonomics-work-from-home-guide',
    title: 'יושבים כל היום? המדריך המלא לארגונומיה נכונה',
    imageFilename: 'ergonomics-work-from-home.jpg',
    prompt: 'Ergonomic workspace setup, person working at computer, proper posture, office chair, monitor at eye level, home office, professional photography, realistic, 800x600',
    unsplashQuery: 'ergonomic workspace home office computer setup proper posture',
    imageKeywords: ['ergonomics', 'workspace', 'computer', 'office chair', 'home office', 'posture'],
  },
  {
    id: '81',
    slug: 'hip-knee-replacement-rehabilitation-guide',
    title: 'ניתוח החלפת ירך או ברך כל מה שצריך לדעת',
    imageFilename: 'hip-knee-replacement.jpg',
    prompt: 'Post-surgery rehabilitation, patient doing exercises with physiotherapist, knee replacement recovery, medical facility, professional care, realistic, 800x600',
    unsplashQuery: 'knee replacement rehabilitation physiotherapy exercises recovery',
    imageKeywords: ['knee replacement', 'hip replacement', 'rehabilitation', 'physiotherapy', 'recovery', 'exercises'],
  },
  {
    id: '80',
    slug: 'why-waste-time-at-orthopedist',
    title: 'למה אתם מבזבזים זמן אצל אורטופד?',
    imageFilename: 'orthopedist-vs-physiotherapist.jpg',
    prompt: 'Physiotherapist treating patient, hands-on therapy, medical consultation, professional healthcare, clinical setting, realistic, professional photography, 800x600',
    unsplashQuery: 'physiotherapist treating patient hands-on therapy medical consultation',
    imageKeywords: ['physiotherapist', 'orthopedist', 'medical consultation', 'therapy', 'treatment'],
  },
  {
    id: '79',
    slug: 'what-happens-in-physiotherapy-treatment',
    title: 'מה קורה בטיפול פיזיותרפיה?',
    imageFilename: 'physiotherapy-treatment-process.jpg',
    prompt: 'Physiotherapy treatment session, therapist examining patient, clinical assessment, medical care, professional physiotherapy clinic, realistic, high quality, 800x600',
    unsplashQuery: 'physiotherapy treatment session therapist examining patient clinical assessment',
    imageKeywords: ['physiotherapy', 'treatment', 'therapy session', 'clinical assessment', 'medical care'],
  },
  {
    id: '78',
    slug: 'vertigo-bppv-complete-guide',
    title: 'טיפול בסחרחורות',
    imageFilename: 'vertigo-bppv.jpg',
    prompt: 'Vestibular rehabilitation, balance exercises, physiotherapist helping patient with vertigo treatment, medical clinic, professional care, realistic, 800x600',
    unsplashQuery: 'vertigo balance exercises vestibular rehabilitation therapy',
    imageKeywords: ['vertigo', 'balance', 'vestibular', 'rehabilitation', 'dizziness', 'balance exercises'],
  },
];

// טעינת משתני סביבה
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

/**
 * הורדת תמונה מ-URL ושמירתה
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Redirect
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

/**
 * יצירת תמונה באמצעות Replicate API
 */
async function generateWithReplicate(prompt) {
  const Replicate = require('replicate');
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  console.log('Creating image with Replicate (Stable Diffusion)...');
  
  const output = await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    {
      input: {
        prompt: prompt,
        width: 800,
        height: 600,
        num_outputs: 1,
      }
    }
  );

  if (Array.isArray(output) && output.length > 0) {
    return output[0];
  }
  return output;
}

/**
 * יצירת תמונה באמצעות OpenAI DALL-E
 */
async function generateWithOpenAI(prompt) {
  const OpenAI = require('openai');
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log('Creating image with OpenAI DALL-E...');
  
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    size: "1024x1024",
    quality: "standard",
    n: 1,
  });

  return response.data[0].url;
}

/**
 * יצירת תמונה באמצעות Unsplash (חינמי, לא דורש API key)
 * משתמש ב-URL ישיר של תמונות ידועות
 */
async function generateWithUnsplashDirect(postId, query) {
  // משתמש ב-URL ישיר של תמונות מ-Unsplash (חינמי)
  // לא דורש API key
  return getFallbackImageUrl(postId, query);
}

/**
 * יצירת תמונה באמצעות Unsplash API (חיפוש דינמי)
 */
async function generateWithUnsplashAPI(query) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return null; // אין API key, נחזור null ונשתמש ב-fallback
  }
  
  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&w=800&h=600&client_id=${accessKey}`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const json = JSON.parse(data);
            if (json.urls && json.urls.regular) {
              resolve(json.urls.regular);
            } else {
              reject(new Error('No image URL in response'));
            }
          } else {
            reject(new Error(`Unsplash API error: ${res.statusCode}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

/**
 * תמונות fallback - מיפוי מדויק לפי post.id
 * תמונות אמיתיות רלוונטיות (חינמי לשימוש מסחרי)
 */
function getFallbackImageUrl(postId, query) {
  // מיפוי מדויק לפי post.id - עדיפות ראשונה
  const imageMapByPostId = {
    '83': 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&h=600&fit=crop', // ריצה על חוף
    '82': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop', // עמדת עבודה ארגונומית
    '81': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop', // שיקום לאחר ניתוח
    '80': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop', // פיזיותרפיסט מטפל
    '79': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', // טיפול פיזיותרפיה
    '78': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', // תרגילי שיווי משקל
  };
  
  // אם יש postId, נשתמש בו (הכי מדויק)
  if (postId && imageMapByPostId[postId]) {
    return imageMapByPostId[postId];
  }
  
  // Fallback לפי query (אם אין postId)
  const queryLower = query ? query.toLowerCase() : '';
  
  if (queryLower.includes('running') || queryLower.includes('runner')) {
    return imageMapByPostId['83'];
  }
  if (queryLower.includes('ergonomic') || queryLower.includes('workspace') || queryLower.includes('office')) {
    return imageMapByPostId['82'];
  }
  if (queryLower.includes('replacement') || queryLower.includes('surgery') || queryLower.includes('rehabilitation')) {
    return imageMapByPostId['81'];
  }
  if (queryLower.includes('physiotherapist') || queryLower.includes('therapy')) {
    return imageMapByPostId['79'];
  }
  if (queryLower.includes('balance') || queryLower.includes('vestibular') || queryLower.includes('vertigo')) {
    return imageMapByPostId['78'];
  }
  
  // תמונה כללית של פיזיותרפיה
  return imageMapByPostId['79'];
}

/**
 * יצירת תמונה - בוחר אוטומטית בין Replicate, OpenAI, או Unsplash
 */
async function generateImage(postId, prompt, unsplashQuery) {
  // ניסיון עם Replicate
  if (process.env.REPLICATE_API_TOKEN) {
    try {
      return await generateWithReplicate(prompt);
    } catch (error) {
      console.error('Replicate failed, trying OpenAI...', error.message);
    }
  }
  
  // ניסיון עם OpenAI
  if (process.env.OPENAI_API_KEY) {
    try {
      return await generateWithOpenAI(prompt);
    } catch (error) {
      console.error('OpenAI failed, trying Unsplash API...', error.message);
    }
  }
  
  // ניסיון עם Unsplash API (אם יש API key)
  if (process.env.UNSPLASH_ACCESS_KEY) {
    try {
      console.log('Using Unsplash API (searching for relevant images)...');
      return await generateWithUnsplashAPI(unsplashQuery);
    } catch (error) {
      console.error('Unsplash API failed, using fallback images...', error.message);
    }
  }
  
  // Fallback ל-URLs ישירים (חינמי, לא דורש API key)
  console.log('Using Unsplash direct URLs (free stock photos)...');
  return generateWithUnsplashDirect(postId, unsplashQuery);
}

/**
 * יצירת כל התמונות
 */
async function generateAllImages() {
  console.log('Starting blog image generation...\n');
  
  // הודעה על API keys (אופציונלי)
  if (!process.env.REPLICATE_API_TOKEN && !process.env.OPENAI_API_KEY && !process.env.UNSPLASH_ACCESS_KEY) {
    console.log('ℹ️  No API key found - using free stock photos from Unsplash');
    console.log('   For AI-generated images, add to .env.local:');
    console.log('   REPLICATE_API_TOKEN=your_token_here (get: https://replicate.com/account/api-tokens)');
    console.log('   or OPENAI_API_KEY=your_key_here (get: https://platform.openai.com/api-keys)\n');
  }

  // יצירת תיקיית blog אם לא קיימת
  const blogDir = path.join(__dirname, '..', 'public', 'images', 'blog');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
    console.log(`📁 Created directory: ${blogDir}\n`);
  }

  for (const post of BLOG_POSTS) {
    console.log(`\n📸 Generating image for: ${post.title}`);
    console.log(`   Post ID: ${post.id}`);
    console.log(`   Slug: ${post.slug}`);
    console.log(`   Query: ${post.unsplashQuery}`);
    console.log(`   Prompt: ${post.prompt.substring(0, 80)}...`);
    
    try {
      // יצירת התמונה - מעביר post.id למיפוי מדויק
      const imageUrl = await generateImage(post.id, post.prompt, post.unsplashQuery);
      console.log(`   ✅ Image created: ${imageUrl}`);
      
      // הורדה ושמירה
      const filepath = path.join(blogDir, post.imageFilename);
      console.log(`   📥 Downloading to: ${filepath}`);
      await downloadImage(imageUrl, filepath);
      console.log(`   ✅ Saved: ${filepath}`);
      
      // המתנה קצרה בין תמונות (rate limiting)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`   ❌ Error generating image for ${post.title}:`, error.message);
    }
  }
  
  console.log('\n✨ Done! All blog images generated.');
}

// הרצה
if (require.main === module) {
  generateAllImages().catch(console.error);
}

module.exports = { generateAllImages, generateImage };




