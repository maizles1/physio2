'use client'

import { useState } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'

const faqs = [
  {
    question: 'איך אני יכול ליצור קשר?',
    answer: 'ניתן ליצור קשר בטלפון 050-883-8982, דרך טופס יצירת קשר באתר או דרך WhatsApp. אנו זמינים בימים ראשון-חמישי בין השעות 08:00-20:00, ובימי שישי בין 08:00-14:00.',
  },
  {
    question: 'האם הטיפול מכוסה בביטוח?',
    answer: 'רוב קופות החולים מכסות טיפולי פיזיותרפיה. אנו עובדים עם כל קופות החולים ומסייעים לך לברר את הזכאות שלך. ניתן לברר עם הקופה שלך או ליצור איתנו קשר לפרטים נוספים.',
  },
  {
    question: 'כמה זמן נמשך כל טיפול?',
    answer: 'משך הטיפול משתנה בהתאם לסוג הטיפול ולצרכים האישיים של המטופל. בדרך כלל, טיפול סטנדרטי נמשך בין 45-60 דקות. בטיפול הראשון נערכת הערכה מקיפה שיכולה להימשך מעט יותר זמן.',
  },
  {
    question: 'מה להביא לטיפול הראשון?',
    answer: 'לטיפול הראשון מומלץ להביא: הפניה מהרופא (אם קיימת), מסמכים רפואיים רלוונטיים (צילומים, בדיקות), בגדי ספורט נוחים, ולמלא מראש את הטפסים שנשלחו אליך באימייל.',
  },
  {
    question: 'כמה טיפולים נדרשים?',
    answer: 'מספר הטיפולים משתנה בהתאם לבעיה, חומרתה ולקצב ההתקדמות של המטופל. לאחר ההערכה הראשונית, נקבע תוכנית טיפול מותאמת אישית. בדרך כלל, תוכנית טיפול כוללת בין 6-12 מפגשים, תלוי בבעיה.',
  },
  {
    question: 'מה ההבדל בין פיזיותרפיה לאימון כושר?',
    answer: 'פיזיותרפיה היא טיפול רפואי המתמקד בטיפול בבעיות בריאות, שיקום מפציעות ומחלות, ושיפור תפקוד. אימון כושר מתמקד בשיפור הכושר הגופני הכללי. הפיזיותרפיסט משתמש בטכניקות טיפול ספציפיות ומותאמות למצב הרפואי של המטופל.',
  },
  {
    question: 'האם הטיפול כואב?',
    answer: 'הטיפול לא אמור להיות כואב. חלק מהטכניקות יכולות לגרום לאי נוחות קלה, אך לא לכאב משמעותי. אנו מתאימים את הטיפול לרמת הכאב והסבילות שלך. אם חווית כאב במהלך הטיפול, חשוב ליידע את המטפל.',
  },
  {
    question: 'איך מתבצע תהליך הטיפול?',
    answer: 'במפגש הראשון נערכת הערכה מקיפה של המצב הרפואי והפיזי של המטופל. לאחר מכן נקבעת תוכנית טיפול מותאמת אישית. הטיפולים הבאים כוללים תרגילים, טכניקות טיפול שונות והדרכה לביצוע תרגילים בבית.',
  },
  {
    question: 'איפה נמצאת הקליניקה?',
    answer: 'הקליניקה ממוקמת במרכז כלניות, אשדוד. יש חניה נוחה בסמוך לקליניקה. המיקום מרכזי ונגיש. ניתן לקבל הוראות הגעה מפורטות בטלפון 050-883-8982.',
  },
  {
    question: 'איך אוכל לעקוב אחר ההתקדמות שלי?',
    answer: 'הפיזיותרפיסט עוקב אחר ההתקדמות שלך בכל מפגש ומעדכן אותך על השיפור. כמו כן, תוכלו לקבל תרגילים לבית ותוכנית טיפול שתוכלו לעקוב אחריה. אנו זמינים לשאלות והתייעצויות גם בין הטיפולים.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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
          <Breadcrumbs items={[{ label: 'דף בית', href: '/' }, { label: 'שאלות נפוצות', href: '/faq' }]} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">שאלות נפוצות</h1>
          <p className="text-lg sm:text-xl text-blue-100">תשובות לשאלות הנפוצות ביותר על הקליניקה והטיפולים</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-bold text-gray-900 flex-1">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                לא מצאתם תשובה לשאלה שלכם?
              </h2>
              <p className="text-gray-700 mb-6">
                נשמח לענות על כל שאלה נוספת. צרו איתנו קשר ונחזור אליכם בהקדם.
              </p>
              <a
                href="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                צור קשר
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

