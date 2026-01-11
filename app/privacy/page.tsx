import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'מדיניות פרטיות - פיזיותרפיה.פלוס',
  description: 'מדיניות הפרטיות של אתר פיזיותרפיה.פלוס - מידע על איסוף, שימוש והגנה על המידע האישי שלכם.',
  alternates: {
    canonical: 'https://physio-plus.co.il/privacy',
  },
}

export default function PrivacyPage() {
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">מדיניות פרטיות</h1>
          <p className="text-lg sm:text-xl text-white">מחויבותנו להגנה על הפרטיות שלכם</p>
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
                קליניקת פיזיותרפיה.פלוס מחויבת להגנה על הפרטיות שלכם. מדיניות זו מסבירה איך אנו אוספים, משתמשים ומגנים על המידע האישי שלכם.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2A3080' }}>1. בעל האתר</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-gray-700 mb-2"><strong>שם העסק:</strong> פיזיותרפיה.פלוס</p>
              <p className="text-gray-700 mb-2"><strong>בעל העסק:</strong> אנדריי מייזלס</p>
              <p className="text-gray-700 mb-2"><strong>כתובת:</strong> מרכז כלניות, אשדוד</p>
              <p className="text-gray-700 mb-2"><strong>טלפון:</strong> <a href="tel:0508838982" className="text-[#2080C0] hover:underline">050-883-8982</a></p>
              <p className="text-gray-700"><strong>יצירת קשר:</strong> <Link href="/contact" className="text-[#2080C0] hover:underline">דרך טופס יצירת קשר</Link></p>
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>2. סוגי המידע שאנו אוספים</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אנו אוספים מידע אישי שאתם מספקים לנו מרצונכם, כולל:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>שם מלא</li>
              <li>מספר טלפון</li>
              <li>כתובת אימייל</li>
              <li>הודעות ופרטים נוספים שאתם מספקים בטופסי יצירת קשר</li>
              <li>פרטי תור (תאריך, שעה, סוג שירות) - בטופס קביעת תור</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>3. מטרות איסוף המידע</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אנו משתמשים במידע האישי שלכם למטרות הבאות:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>יצירת קשר עמכם בתגובה לפניות שלכם</li>
              <li>קביעת תורים וניהול התורים</li>
              <li>שיפור השירותים שאנו מספקים</li>
              <li>שליחת עדכונים חשובים (רק אם ביקשתם זאת במפורש)</li>
              <li>עמידה בחובות משפטיות וחוקיות</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>4. אופן השימוש במידע</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              המידע האישי שלכם משמש אותנו אך ורק למטרות שפורטו לעיל. אנו לא מוכרים, משכירים או מעבירים את המידע שלכם לצדדים שלישיים למטרות שיווקיות.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              אנו עשויים לשתף את המידע שלכם עם ספקי שירותים המסייעים לנו להפעיל את האתר (כמו שירותי אירוח), אך רק במידה הנדרשת ולפי הסכמים המגנים על הפרטיות שלכם.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>5. שמירה והגנה על המידע</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אנו נוקטים אמצעי אבטחה מתאימים להגנה על המידע האישי שלכם מפני גישה לא מורשית, שימוש, שינוי או חשיפה. בין היתר:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>שימוש בפרוטוקול HTTPS להצפנת המידע</li>
              <li>אבטחת השרתים והמערכות שלנו</li>
              <li>גישה מוגבלת למידע רק לעובדים הזקוקים לו</li>
              <li>גיבויים סדירים של המידע</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>6. זכויותיכם</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              לפי חוק הגנת הפרטיות, התשמ&quot;א-1981, יש לכם זכויות הבאות:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>זכות גישה:</strong> אתם רשאים לבקש לקבל העתק של המידע האישי שאנו מחזיקים עליכם</li>
              <li><strong>זכות תיקון:</strong> אתם רשאים לבקש לתקן מידע לא מדויק או לא מעודכן</li>
              <li><strong>זכות מחיקה:</strong> אתם רשאים לבקש למחוק את המידע האישי שלכם (בכפוף לחובות משפטיות)</li>
              <li><strong>זכות התנגדות:</strong> אתם רשאים להתנגד לעיבוד המידע שלכם למטרות מסוימות</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              כדי לממש את זכויותיכם, אנא צרו איתנו קשר דרך <Link href="/contact" className="text-[#2080C0] hover:underline">טופס יצירת קשר</Link> או בטלפון: <a href="tel:0508838982" className="text-[#2080C0] hover:underline">050-883-8982</a>.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>7. עוגיות (Cookies) וכלי ניתוח</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              האתר שלנו עשוי להשתמש בעוגיות (Cookies) ובכלי ניתוח כמו Google Analytics כדי לשפר את חוויית המשתמש ולנתח את השימוש באתר. המידע שנאסף הוא אנונימי ולא מזהה אתכם אישית.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              אתם יכולים להגדיר את הדפדפן שלכם לדחות עוגיות, אך זה עלול להשפיע על תפקוד חלק מהפונקציות באתר.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>8. שיתוף עם צדדים שלישיים</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אנו לא מוכרים, משכירים או מעבירים את המידע האישי שלכם לצדדים שלישיים למטרות שיווקיות. אנו עשויים לשתף מידע עם:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>ספקי שירותי אירוח ואבטחה - רק במידה הנדרשת להפעלת האתר</li>
              <li>רשויות משפטיות - אם נדרש לפי חוק או צו בית משפט</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>9. שמירת מידע</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              אנו שומרים את המידע האישי שלכם כל עוד הוא נדרש למטרות שפורטו במדיניות זו, או כנדרש לפי חוק. לאחר מכן, המידע יימחק או יועבר לאנונימיות.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>10. עדכון המדיניות</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              אנו רשאים לעדכן את מדיניות הפרטיות מעת לעת. כל עדכון יפורסם בדף זה עם תאריך העדכון. מומלץ לבדוק את המדיניות מעת לעת כדי להישאר מעודכנים.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>11. יצירת קשר</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אם יש לכם שאלות, בקשות או הערות בנוגע למדיניות הפרטיות שלנו, אנא צרו איתנו קשר:
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
                  יצירת קשר: <Link href="/contact" className="text-[#2080C0] hover:underline">דרך טופס יצירת קשר</Link>
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

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>12. הסכמה</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              בשימוש באתר זה ובמסירת מידע אישי, אתם מסכימים למדיניות הפרטיות שלנו. אם אינכם מסכימים למדיניות זו, אנא אל תשתמשו באתר ואל תמסרו מידע אישי.
            </p>

            <div className="bg-blue-50 border-r-4 p-6 mt-8" style={{ borderColor: '#2A3080' }}>
              <p className="text-gray-700">
                <strong>הערה:</strong> מדיניות זו תואמת את חוק הגנת הפרטיות, התשמ&quot;א-1981, ותיקון 13 לחוק (שנכנס לתוקף באוגוסט 2025).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}




