import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'הצהרת נגישות',
  description: 'הצהרת נגישות של אתר פיזיותרפיה.פלוס - מחויבותנו לנגישות השירותים והאתר.',
}

export default function AccessibilityPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden py-12 sm:py-16" style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">הצהרת נגישות</h1>
          <p className="text-lg sm:text-xl text-white">מחויבותנו לנגישות השירותים והאתר</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
            <div className="bg-blue-50 border-r-4 p-6 mb-8" style={{ borderColor: '#2A3080' }}>
              <p className="text-lg font-semibold mb-2" style={{ color: '#2A3080' }}>
                עדכון אחרון: {new Date().toLocaleDateString('he-IL')}
              </p>
              <p className="text-gray-700">
                קליניקת פיזיותרפיה.פלוס מחויבת לספק נגישות לכלל המטופלים והמבקרים באתר ובקליניקה.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2A3080' }}>נגישות האתר</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אתר פיזיותרפיה.פלוס מופעל לפי תקן WCAG 2.1 ברמה AA. אנו עושים מאמצים מתמידים 
              להבטיח שכל דפי האתר והתוכן נגישים ונוחים לשימוש עבור כל המשתמשים, כולל אנשים 
              עם מוגבלויות.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>מה עשינו כדי לשפר את הנגישות?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>תמיכה מלאה בכיוון RTL (עברית)</li>
              <li>ניגודיות צבעים מתאימה לקריאה</li>
              <li>ניווט באמצעות מקלדת</li>
              <li>תגיות אלטרנטיביות לתמונות</li>
              <li>מבנה HTML סמנטי ונגיש</li>
              <li>גודל טקסט ניתן לשינוי</li>
              <li>תמיכה בקוראי מסך</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>נגישות הקליניקה</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              הקליניקה שלנו ממוקמת במרכז כלניות, אשדוד, ואנו שואפים להבטיח נגישות פיזית 
              לכל המטופלים. הקליניקה נגישה לכיסאות גלגלים וכוללת שירותים נגישים.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>דיווח על בעיית נגישות</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אם נתקלתם בבעיית נגישות באתר או בקליניקה, נשמח לשמוע מכם. אנא צרו איתנו קשר:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  טלפון: <a href="tel:0508838982" className="text-[#2080C0] hover:underline">050-883-8982</a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  דואר אלקטרוני: <a href="/contact" className="text-[#2080C0] hover:underline">דרך טופס יצירת קשר</a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  כתובת: מרכז כלניות, אשדוד
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>פנייה לממונה על הנגישות</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אם לא טיפלנו בבקשתכם בצורה מספקת, תוכלו לפנות לממונה על הנגישות במשרד הכלכלה והתעשייה:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-2">
                <strong>משרד הכלכלה והתעשייה - הממונה על נגישות</strong>
              </p>
              <p className="text-gray-700 mb-2">טלפון: 03-666-2600</p>
              <p className="text-gray-700 mb-2">פקס: 03-666-2633</p>
              <p className="text-gray-700">דוא&quot;ל: <a href="mailto:negishut@economy.gov.il" className="text-[#2080C0] hover:underline">negishut@economy.gov.il</a></p>
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>הבטחת איכות</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אנו ממשיכים לשפר את הנגישות של האתר והשירותים שלנו. האתר נבדק באופן קבוע 
              לבעיות נגישות, ואנו פועלים לתיקון כל בעיה שזוהתה.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

