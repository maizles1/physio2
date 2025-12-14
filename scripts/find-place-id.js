/**
 * סקריפט למציאת Place ID לפי כתובת העסק
 */

const https = require('https')
const querystring = require('querystring')

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
          resolve(jsonData)
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`))
        }
      })
    }).on('error', (error) => {
      reject(error)
    })
  })
}

async function findPlaceId(address, apiKey) {
  log(`\n🔍 מחפש Place ID עבור: "${address}"...`, 'cyan')
  
  try {
    // חיפוש Place ID לפי כתובת
    const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${querystring.stringify({
      input: address,
      inputtype: 'textquery',
      fields: 'place_id,name,formatted_address,rating,user_ratings_total',
      key: apiKey,
      language: 'iw',
    })}`
    
    log('📡 שולח בקשה ל-Google Places API...', 'blue')
    const searchData = await httpsRequest(searchUrl)
    
    if (searchData.status === 'OK' && searchData.candidates && searchData.candidates.length > 0) {
      const place = searchData.candidates[0]
      log('\n✅ נמצא מקום!', 'green')
      log(`   שם: ${place.name || 'לא זמין'}`, 'blue')
      log(`   כתובת: ${place.formatted_address || 'לא זמין'}`, 'blue')
      
      if (place.rating) {
        log(`   דירוג: ${place.rating} ⭐`, 'blue')
      }
      
      if (place.user_ratings_total) {
        log(`   מספר ביקורות: ${place.user_ratings_total}`, 'blue')
      }
      
      log(`\n🎯 Place ID:`, 'cyan')
      log(`   ${place.place_id}`, 'green')
      
      log('\n📝 העתק את ה-Place ID הזה לקובץ .env.local:', 'yellow')
      log(`   NEXT_PUBLIC_GOOGLE_PLACE_ID=${place.place_id}`, 'yellow')
      
      return place.place_id
    } else {
      log(`❌ לא נמצא מקום. סטטוס: ${searchData.status}`, 'red')
      if (searchData.error_message) {
        log(`   ${searchData.error_message}`, 'yellow')
      }
      return null
    }
  } catch (error) {
    log(`❌ שגיאה בחיפוש: ${error.message}`, 'red')
    return null
  }
}

async function main() {
  log('🔍 מחפש Place ID עבור הקליניקה...', 'cyan')
  log('='.repeat(50), 'blue')
  
  // כתובת הקליניקה
  const address = 'יקינטון 3, אשדוד'
  
  log(`\n📍 כתובת הקליניקה: ${address}`, 'blue')
  log('\n💡 כדי למצוא את ה-Place ID, יש צורך ב-API Key מ-Google Cloud Console', 'yellow')
  log('   אם אין לך API Key, תוכל:', 'yellow')
  log('   1. לפתוח את הקליניקה ב-Google Maps', 'yellow')
  log('   2. ללחוץ על "שתף"', 'yellow')
  log('   3. להעתיק את הקישור ולמצוא את ה-Place ID בתוכו', 'yellow')
  
  // בדיקה אם יש API Key בקובץ .env.local
  const fs = require('fs')
  const path = require('path')
  const envPath = path.join(process.cwd(), '.env.local')
  
  let apiKey = null
  
  if (fs.existsSync(envPath)) {
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
    
    apiKey = env.GOOGLE_MAPS_API_KEY
  }
  
  if (apiKey && apiKey.trim() !== '') {
    log('\n✅ נמצא API Key בקובץ .env.local', 'green')
    log('   משתמש ב-API Key כדי למצוא את ה-Place ID...', 'blue')
    
    const placeId = await findPlaceId(address, apiKey)
    
    if (placeId) {
      log('\n' + '='.repeat(50), 'blue')
      log('\n✅ מצאת את ה-Place ID!', 'green')
      log('\n📝 עכשיו:', 'cyan')
      log('   1. פתח את הקובץ .env.local', 'yellow')
      log(`   2. הוסף את השורה: NEXT_PUBLIC_GOOGLE_PLACE_ID=${placeId}`, 'yellow')
      log('   3. שמור את הקובץ', 'yellow')
      log('   4. הרץ: npm run check-reviews', 'yellow')
    } else {
      log('\n❌ לא הצלחתי למצוא את ה-Place ID', 'red')
      log('\n💡 נסה למצוא אותו ידנית:', 'cyan')
      log('   1. פתח Google Maps: https://www.google.com/maps', 'yellow')
      log(`   2. חפש: "${address}"`, 'yellow')
      log('   3. לחץ על "שתף" ולחפש את ה-Place ID בקישור', 'yellow')
    }
  } else {
    log('\n⚠️  לא נמצא API Key בקובץ .env.local', 'yellow')
    log('\n📝 כדי למצוא את ה-Place ID אוטומטית:', 'cyan')
    log('   1. צור API Key ב-Google Cloud Console (ראה GOOGLE-BUSINESS-SETUP.md)', 'yellow')
    log('   2. הוסף אותו לקובץ .env.local: GOOGLE_MAPS_API_KEY=המפתח_שלך', 'yellow')
    log('   3. הרץ שוב את הסקריפט הזה', 'yellow')
    log('\n💡 או מצא אותו ידנית:', 'cyan')
    log('   1. פתח Google Maps: https://www.google.com/maps', 'yellow')
    log(`   2. חפש: "${address}"`, 'yellow')
    log('   3. לחץ על "שתף" ולחפש את ה-Place ID בקישור', 'yellow')
  }
  
  log('', 'reset')
}

main().catch(error => {
  log(`\n❌ שגיאה כללית: ${error.message}`, 'red')
  process.exit(1)
})






