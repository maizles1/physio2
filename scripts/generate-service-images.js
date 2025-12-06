#!/usr/bin/env node

/**
 * סקריפט ליצירת תמונות AI לשירותי הפיזיותרפיה
 * 
 * שימוש:
 * 1. הגדר REPLICATE_API_TOKEN או OPENAI_API_KEY ב-.env.local
 * 2. הרץ: node scripts/generate-service-images.js
 * 
 * אפשרויות:
 * - Replicate (מומלץ): חינמי/זול, משתמש ב-Stable Diffusion
 * - OpenAI DALL-E: דורש תשלום, איכות גבוהה
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// הגדרות
const SERVICES = [
  {
    id: 'back-pain',
    title: 'טיפול בכאבי גב',
    prompt: 'Professional physiotherapy treatment, therapist massaging patient\'s back on treatment table, medical clinic setting, professional photography, natural lighting, realistic, high quality, 800x600',
    unsplashQuery: 'physiotherapy back massage treatment table',
    imageKeywords: ['back', 'spine', 'back pain', 'massage', 'physiotherapy'],
  },
  {
    id: 'shoulder-pain',
    title: 'טיפול בכאבי כתף',
    prompt: 'Professional physiotherapist treating young woman\'s shoulder, therapist hands on patient shoulder, medical treatment session, clinical setting, professional medical care, realistic, professional photography, 800x600',
    unsplashQuery: 'physiotherapist treating young woman shoulder therapy',
    imageKeywords: ['shoulder', 'shoulder pain', 'shoulder joint', 'physiotherapy', 'young woman', 'shoulder treatment'],
  },
  {
    id: 'neck-knee-pain',
    title: 'טיפול בכאבי צוואר וברך',
    prompt: 'Physical therapy session for neck and knee pain, physiotherapist treating patient, professional medical care, clinical environment, realistic, high quality, 800x600',
    unsplashQuery: 'physical therapy neck knee treatment',
    imageKeywords: ['neck', 'knee', 'neck pain', 'knee pain', 'physical therapy'],
  },
  {
    id: 'post-surgery',
    title: 'שיקום לאחר ניתוחים',
    prompt: 'Post-surgery rehabilitation, patient doing exercises with physiotherapist, medical facility, recovery session, professional photography, realistic, 800x600',
    unsplashQuery: 'post surgery rehabilitation exercises physiotherapy',
    imageKeywords: ['surgery', 'rehabilitation', 'post surgery', 'recovery', 'exercises'],
  },
  {
    id: 'vestibular',
    title: 'שיקום וסטיבולרי',
    prompt: 'Vestibular rehabilitation session, balance exercises, physiotherapist helping patient with balance training, medical clinic, professional, realistic, 800x600',
    unsplashQuery: 'balance exercises vestibular rehabilitation therapy',
    imageKeywords: ['balance', 'vestibular', 'vertigo', 'balance exercises', 'equilibrium'],
  },
  {
    id: 'tmj',
    title: 'טיפול במפרק הלסת',
    prompt: 'TMJ treatment session, physiotherapist working on patient\'s jaw, professional medical care, clinical setting, realistic, professional photography, 800x600',
    unsplashQuery: 'tmj jaw treatment physiotherapy facial therapy',
    imageKeywords: ['jaw', 'tmj', 'temporomandibular', 'facial', 'jaw pain'],
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
async function generateWithUnsplashDirect(serviceId, query) {
  // משתמש ב-URL ישיר של תמונות מ-Unsplash (חינמי)
  // לא דורש API key
  return getFallbackImageUrl(serviceId, query);
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
 * תמונות fallback - מיפוי מדויק לפי service.id
 * תמונות אמיתיות רלוונטיות של פיזיותרפיה (חינמי לשימוש מסחרי)
 */
function getFallbackImageUrl(serviceId, query) {
  // מיפוי מדויק לפי service.id - עדיפות ראשונה
  const imageMapByServiceId = {
    'back-pain': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop', // עיסוי גב
    'shoulder-pain': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop&q=80', // טיפול בכתף - מטפל מטפל בכתף של בחורה צעירה
    'neck-knee-pain': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', // טיפול בברך/צוואר
    'post-surgery': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop', // תרגילי שיקום
    'vestibular': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', // תרגילי שיווי משקל
    'tmj': 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=600&fit=crop', // טיפול בלסת/פנים
  };
  
  // אם יש serviceId, נשתמש בו (הכי מדויק)
  if (serviceId && imageMapByServiceId[serviceId]) {
    return imageMapByServiceId[serviceId];
  }
  
  // Fallback לפי query (אם אין serviceId)
  const queryLower = query ? query.toLowerCase() : '';
  
  if (queryLower.includes('back') || queryLower.includes('spine')) {
    return imageMapByServiceId['back-pain'];
  }
  if (queryLower.includes('shoulder')) {
    return imageMapByServiceId['shoulder-pain'];
  }
  if (queryLower.includes('knee')) {
    return imageMapByServiceId['neck-knee-pain'];
  }
  if (queryLower.includes('neck')) {
    return imageMapByServiceId['neck-knee-pain'];
  }
  if (queryLower.includes('surgery') || queryLower.includes('rehabilitation')) {
    return imageMapByServiceId['post-surgery'];
  }
  if (queryLower.includes('balance') || queryLower.includes('vestibular') || queryLower.includes('vertigo')) {
    return imageMapByServiceId['vestibular'];
  }
  if (queryLower.includes('jaw') || queryLower.includes('tmj')) {
    return imageMapByServiceId['tmj'];
  }
  
  // תמונה כללית של פיזיותרפיה
  return imageMapByServiceId['back-pain'];
}

/**
 * יצירת תמונה - בוחר אוטומטית בין Replicate, OpenAI, או Unsplash
 */
async function generateImage(serviceId, prompt, unsplashQuery) {
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
  return generateWithUnsplashDirect(serviceId, unsplashQuery);
}

/**
 * יצירת כל התמונות
 */
async function generateAllImages() {
  console.log('Starting image generation...\n');
  
  // הודעה על API keys (אופציונלי)
  if (!process.env.REPLICATE_API_TOKEN && !process.env.OPENAI_API_KEY && !process.env.UNSPLASH_ACCESS_KEY) {
    console.log('ℹ️  No API key found - using free stock photos from Unsplash');
    console.log('   For AI-generated images, add to .env.local:');
    console.log('   REPLICATE_API_TOKEN=your_token_here (get: https://replicate.com/account/api-tokens)');
    console.log('   or OPENAI_API_KEY=your_key_here (get: https://platform.openai.com/api-keys)\n');
  }

  for (const service of SERVICES) {
    console.log(`\n📸 Generating image for: ${service.title}`);
    console.log(`   Service ID: ${service.id}`);
    console.log(`   Query: ${service.unsplashQuery}`);
    console.log(`   Prompt: ${service.prompt.substring(0, 80)}...`);
    
    try {
      // יצירת התמונה - מעביר service.id למיפוי מדויק
      const imageUrl = await generateImage(service.id, service.prompt, service.unsplashQuery);
      console.log(`   ✅ Image created: ${imageUrl}`);
      
      // יצירת תיקייה אם לא קיימת
      const serviceDir = path.join(__dirname, '..', 'public', 'images', 'services', service.id);
      if (!fs.existsSync(serviceDir)) {
        fs.mkdirSync(serviceDir, { recursive: true });
      }
      
      // הורדה ושמירה
      const filepath = path.join(serviceDir, 'service-image.jpg');
      console.log(`   📥 Downloading to: ${filepath}`);
      await downloadImage(imageUrl, filepath);
      console.log(`   ✅ Saved: ${filepath}`);
      
      // המתנה קצרה בין תמונות (rate limiting)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`   ❌ Error generating image for ${service.title}:`, error.message);
    }
  }
  
  console.log('\n✨ Done! All images generated.');
}

// הרצה
if (require.main === module) {
  generateAllImages().catch(console.error);
}

module.exports = { generateAllImages, generateImage };

