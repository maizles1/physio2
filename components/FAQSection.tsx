'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'מהי פיזיותרפיה ומתי כדאי לפנות?',
    answer: 'פיזיותרפיה היא מקצוע רפואי המתמקד בשיקום ושיפור התפקוד הגופני באמצעות תרגילים, טיפולים ידניים ושימוש בטכנולוגיות מתקדמות. מומלץ לפנות לפיזיותרפיסט במקרים של כאבים כרוניים, פציעות ספורט, שיקום לאחר ניתוחים, בעיות יציבה, בעיות במפרקים, וקשיי תנועה. הפיזיותרפיסט מסייע בשיפור התפקוד, הפחתת כאב, ושיקום מפציעות ומחלות.',
  },
  {
    question: 'האם צריך הפניה מרופא לקבלת טיפול?',
    answer: 'ברוב המקרים, ניתן לפנות ישירות לפיזיותרפיסט ללא הפניה מרופא. עם זאת, ישנם מצבים בהם נדרשת הפניה בהתאם לדרישות קופת החולים או חברת הביטוח שלך. מומלץ לבדוק עם הקופה או חברת הביטוח שלך מה התנאים לקבלת טיפול מכוסה. במקרים מסוימים, הפניה מרופא יכולה לעזור לקבלת החזרים מביטוח.',
  },
  {
    question: 'כמה זמן נמשך כל טיפול?',
    answer: 'משך הטיפול משתנה בהתאם לסוג הטיפול ולצרכים האישיים של המטופל. בטיפול הראשון נערכת הערכה מקיפה שיכולה להימשך מעט יותר זמן (60-75 דקות) כדי להבין את הבעיה ולהתאים תוכנית טיפול אישית. משך הטיפול תלוי גם בחומרת הבעיה ובשיטת הטיפול הנבחרת.',
  },
  {
    question: 'האם הטיפול כואב?',
    answer: 'הטיפול לא אמור להיות כואב. חלק מהטכניקות יכולות לגרום לאי נוחות קלה או תחושת לחץ, אך לא לכאב משמעותי. הפיזיותרפיסט מתאים את הטיפול לרמת הכאב והסבילות שלך ומעודד תקשורת פתוחה במהלך הטיפול. אם חווית כאב במהלך הטיפול, חשוב מאוד ליידע את המטפל מיד כדי להתאים את הטכניקות. המטרה היא לשפר את המצב ללא יצירת כאב נוסף.',
  },
  {
    question: 'כיצד אפשר לקבל החזרים?',
    answer: 'החזרים מכללית, ועובדים עם מבוטחי מאוחדת שיא. שאר הקופות באופן פרטי. החזרים מהביטוחים הפרטיים, תלוי ביטוח של המטופל.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ color: '#2A3080' }}>
              שאלות נפוצות
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              תשובות לשאלות הנפוצות ביותר על הטיפולים והקליניקה
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900 flex-1">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-[#2080C0] flex-shrink-0 mr-4 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {openIndex === index && (
                    <div className="px-6 pb-4">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">לא מצאתם תשובה לשאלה שלכם?</p>
            <a
              href="/faq"
              className="inline-block text-[#2080C0] font-semibold hover:text-[#2A3080] transition-colors underline"
              aria-label="צפה בכל השאלות הנפוצות"
            >
              צפה בכל השאלות הנפוצות
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

