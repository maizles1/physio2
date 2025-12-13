/**
 * סקריפט לבדיקת הגדרות Google My Business Reviews
 * בודק את כל ההגדרות והחיבור ל-Google Places API
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

// צבעים לטרמינל
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function checkEnvFile() {
  log('\n📁 בודק קובץ .env.local...', 'cyan')
  const envPath = path.join(process.cwd(), '.env.local')
  
  if (!fs.existsSync(envPath)) {
    log('❌ קובץ .env.local לא נמצא!', 'red')
    log('   אנא צור קובץ .env.local בתיקיית הפרויקט', 'yellow')
    return false
  }
  
  log('✅ קובץ .env.local נמצא', 'green')
  return true
}

function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local')
  const envContent = fs.readFileSync(envPath, 'utf8')
  const env = {}
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=')
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
      }
    }
  })
  
  return env
}

function checkEnvironmentVariables(env) {
  log('\n🔑 בודק משתני סביבה...', 'cyan')
  
  const required = {
    'NEXT_PUBLIC_GOOGLE_PLACE_ID': 'Place ID של Google My Business',
    'GOOGLE_MAPS_API_KEY': 'מפתח API מ-Google Cloud Console',
  }
  
  let allPresent = true
  
  for (const [key, description] of Object.entries(required)) {
    const value = env[key]
    
    if (!value || value.trim() === '') {
      log(`❌ ${key} לא מוגדר`, 'red')
      log(`   ${description}`, 'yellow')
      allPresent = false
    } else {
      // הצגת חלק מהערך (לא את הכל מסיבות אבטחה)
      const preview = key.includes('KEY') 
        ? value.substring(0, 10) + '...' + value.substring(value.length - 5)
        : value.substring(0, 20) + (value.length > 20 ? '...' : '')
      log(`✅ ${key}: ${preview}`, 'green')
    }
  }
  
  return allPresent
}

function httpsRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data)
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            statusText: res.statusMessage,
            json: jsonData,
          })
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`))
        }
      })
    }).on('error', (error) => {
      reject(error)
    })
  })
}

async function testGooglePlacesAPI(placeId, apiKey) {
  log('\n🌐 בודק חיבור ל-Google Places API...', 'cyan')
  
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews,rating,user_ratings_total,name&key=${encodeURIComponent(apiKey)}&language=iw`
    
    const response = await httpsRequest(url)
    
    if (!response.ok) {
      log(`❌ שגיאת HTTP: ${response.status} ${response.statusText}`, 'red')
      return { success: false, error: `HTTP ${response.status}` }
    }
    
    const data = response.json
    
    if (data.status === 'OK') {
      log('✅ חיבור ל-Google Places API הצליח!', 'green')
      
      if (data.result) {
        if (data.result.name) {
          log(`   שם העסק: ${data.result.name}`, 'blue')
        }
        
        if (data.result.rating) {
          log(`   דירוג ממוצע: ${data.result.rating} ⭐`, 'blue')
        }
        
        if (data.result.user_ratings_total) {
          log(`   סך כל הביקורות: ${data.result.user_ratings_total}`, 'blue')
        }
        
        if (data.result.reviews && Array.isArray(data.result.reviews)) {
          const reviewCount = data.result.reviews.length
          log(`   ביקורות זמינות לטעינה: ${reviewCount}`, 'blue')
          
          if (reviewCount > 0) {
            log('\n   דוגמה לביקורת אחרונה:', 'cyan')
            const latestReview = data.result.reviews[0]
            log(`   - מחבר: ${latestReview.author_name}`, 'blue')
            log(`   - דירוג: ${latestReview.rating} ⭐`, 'blue')
            log(`   - תאריך: ${latestReview.relative_time_description}`, 'blue')
            if (latestReview.text) {
              const preview = latestReview.text.substring(0, 100) + (latestReview.text.length > 100 ? '...' : '')
              log(`   - תוכן: "${preview}"`, 'blue')
            }
          } else {
            log('   ⚠️  אין ביקורות זמינות לטעינה', 'yellow')
          }
        } else {
          log('   ⚠️  אין ביקורות בנתונים', 'yellow')
        }
      }
      
      return { success: true, data: data.result }
    } else {
      log(`❌ שגיאת API: ${data.status}`, 'red')
      if (data.error_message) {
        log(`   ${data.error_message}`, 'yellow')
      }
      
      // הסבר על שגיאות נפוצות
      if (data.status === 'REQUEST_DENIED') {
        log('\n💡 טיפים:', 'cyan')
        log('   - בדוק שה-API Key תקין', 'yellow')
        log('   - וודא שהפעלת את Places API ב-Google Cloud Console', 'yellow')
        log('   - בדוק שה-API Key לא מוגבל מדי', 'yellow')
      } else if (data.status === 'INVALID_REQUEST') {
        log('\n💡 טיפים:', 'cyan')
        log('   - בדוק שה-Place ID תקין', 'yellow')
        log('   - וודא שה-Place ID שייך לעסק שלך', 'yellow')
      } else if (data.status === 'NOT_FOUND') {
        log('\n💡 טיפים:', 'cyan')
        log('   - ה-Place ID לא נמצא', 'yellow')
        log('   - בדוק שה-Place ID נכון', 'yellow')
      }
      
      return { success: false, error: data.status, message: data.error_message }
    }
  } catch (error) {
    log(`❌ שגיאה בבדיקה: ${error.message}`, 'red')
    return { success: false, error: error.message }
  }
}

async function main() {
  log('🔍 בודק הגדרות Google My Business Reviews...', 'cyan')
  log('='.repeat(50), 'blue')
  
  // 1. בדיקת קובץ .env.local
  if (!checkEnvFile()) {
    log('\n❌ הבדיקה נכשלה - אין קובץ .env.local', 'red')
    process.exit(1)
  }
  
  // 2. טעינת משתני סביבה
  const env = loadEnvFile()
  
  // 3. בדיקת משתני סביבה
  if (!checkEnvironmentVariables(env)) {
    log('\n❌ הבדיקה נכשלה - משתני סביבה חסרים', 'red')
    log('\n📝 הוסף לקובץ .env.local:', 'cyan')
    log('NEXT_PUBLIC_GOOGLE_PLACE_ID=your-place-id-here', 'yellow')
    log('GOOGLE_MAPS_API_KEY=your-api-key-here', 'yellow')
    process.exit(1)
  }
  
  // 4. בדיקת חיבור ל-API
  const placeId = env.NEXT_PUBLIC_GOOGLE_PLACE_ID
  const apiKey = env.GOOGLE_MAPS_API_KEY
  
  const apiResult = await testGooglePlacesAPI(placeId, apiKey)
  
  // 5. סיכום
  log('\n' + '='.repeat(50), 'blue')
  if (apiResult.success) {
    log('\n✅ כל הבדיקות עברו בהצלחה!', 'green')
    log('הביקורות מ-Google אמורות להיטען באתר.', 'green')
    log('\n💡 טיפים:', 'cyan')
    log('   - הפעל את השרת עם: npm run dev', 'yellow')
    log('   - בדוק את דף העדויות: http://localhost:3000/testimonials', 'yellow')
    log('   - בדוק את הלוגים בקונסולה של השרת', 'yellow')
  } else {
    log('\n❌ הבדיקה נכשלה', 'red')
    log('תקן את הבעיות ונסה שוב.', 'yellow')
  }
  log('', 'reset')
}

// הפעלת הסקריפט
main().catch(error => {
  log(`\n❌ שגיאה כללית: ${error.message}`, 'red')
  process.exit(1)
})




