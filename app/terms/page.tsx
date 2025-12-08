import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'תנאי שימוש - פיזיותרפיה.פלוס',
  description: 'תנאי השימוש באתר פיזיותרפיה.פלוס - כללים והנחיות לשימוש באתר.',
}

export default function TermsPage() {
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">תנאי שימוש</h1>
          <p className="text-lg sm:text-xl text-white">כללים והנחיות לשימוש באתר</p>
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
                על ידי שימוש באתר פיזיותרפיה.פלוס, אתם מסכימים לתנאי השימוש הבאים. אנא קראו אותם בעיון.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2A3080' }}>1. הגדרת השימוש באתר</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אתר פיזיותרפיה.פלוס (להלן: &quot;האתר&quot;) הוא אתר מידע ושירותים של קליניקת פיזיותרפיה.פלוס (להלן: &quot;הקליניקה&quot; או &quot;אנו&quot;). השימוש באתר כפוף לתנאי השימוש המפורטים להלן.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              על ידי גישה ושימוש באתר, אתם מאשרים שקראתם, הבנתם והסכמתם להיות כפופים לתנאי השימוש הללו. אם אינכם מסכימים לתנאים אלה, אנא אל תשתמשו באתר.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>2. שימוש מותר באתר</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אתם רשאים להשתמש באתר למטרות הבאות בלבד:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>צפייה במידע על השירותים והטיפולים המוצעים</li>
              <li>יצירת קשר עם הקליניקה</li>
              <li>קביעת תורים</li>
              <li>קריאת מאמרים ותוכן מקצועי</li>
              <li>כל שימוש אחר שהותר במפורש על ידינו</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>3. הגבלות שימוש</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אסור לכם:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>להשתמש באתר למטרות בלתי חוקיות או בלתי מוסריות</li>
              <li>לנסות לגשת לאזורים מוגנים או לא מורשים באתר</li>
              <li>להפריע לתפקוד התקין של האתר או לנסות לחדור אליו</li>
              <li>להעתיק, לשכפל או להפיץ את תוכן האתר ללא רשות</li>
              <li>להשתמש בתוכן האתר למטרות מסחריות ללא רשות</li>
              <li>להעלות או לשלוח תוכן מזיק, וירוסים או קוד זדוני</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>4. זכויות יוצרים</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              כל התוכן באתר, כולל אך לא רק: טקסטים, תמונות, לוגואים, עיצוב, קוד ותכנות (להלן: &quot;התוכן&quot;), הוא בבעלות הקליניקה או מוגן בזכויות יוצרים וזכויות קניין רוחני אחרות.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              אסור להעתיק, לשכפל, להפיץ, לפרסם או להשתמש בתוכן ללא רשות מפורשת בכתב מהקליניקה, למעט שימוש אישי ולא מסחרי למטרות מידע בלבד.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>5. מידע ותוכן משתמשים</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              כאשר אתם מעלים, שולחים או מספקים תוכן דרך האתר (כמו הודעות בטופסי יצירת קשר), אתם מאשרים:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>שהתוכן שסיפקתם הוא מדויק ומהימן</li>
              <li>שיש לכם את הזכות לספק את התוכן</li>
              <li>שהתוכן לא מפר זכויות של אחרים</li>
              <li>שאנו רשאים להשתמש בתוכן למטרות מתן השירותים</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>6. אחריות והגבלות</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>מידע באתר:</strong> אנו משתדלים לספק מידע מדויק ועדכני, אך איננו מתחייבים שהמידע באתר שלם, מדויק או מעודכן. השימוש במידע באתר הוא על אחריותכם הבלעדית.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>שירותים רפואיים:</strong> המידע באתר אינו מהווה ייעוץ רפואי או תחליף לטיפול רפואי. לקבלת ייעוץ רפואי, יש לפנות לרופא או לפיזיותרפיסט מוסמך.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>תפקוד האתר:</strong> אנו לא מתחייבים שהאתר יהיה זמין ללא הפרעות או שגיאות. אנו רשאים להפסיק או לשנות את האתר בכל עת ללא הודעה מוקדמת.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>7. קישורים לאתרים חיצוניים</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              האתר עשוי להכיל קישורים לאתרים חיצוניים. אנו לא אחראים לתוכן, מדיניות הפרטיות או הפרקטיקות של אתרים חיצוניים אלה. השימוש באתרים חיצוניים הוא על אחריותכם הבלעדית.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>8. שינויים בתנאים</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              אנו רשאים לעדכן את תנאי השימוש מעת לעת. כל עדכון יפורסם בדף זה עם תאריך העדכון. המשך השימוש באתר לאחר פרסום השינויים מהווה הסכמה לתנאים המעודכנים. מומלץ לבדוק את התנאים מעת לעת.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>9. ביטול והשעיה</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              אנו רשאים להפסיק או להשעות את הגישה שלכם לאתר בכל עת, ללא הודעה מוקדמת, אם נקבע שהשימוש שלכם באתר מפר את תנאי השימוש או את החוק.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>10. חוק שולט וסמכות שיפוט</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              תנאי השימוש הללו כפופים לחוקי מדינת ישראל. כל מחלוקת הנובעת משימוש באתר או מתנאי השימוש תידון בבתי המשפט המוסמכים בישראל בלבד.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>11. יצירת קשר</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אם יש לכם שאלות או הערות בנוגע לתנאי השימוש, אנא צרו איתנו קשר:
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
              על ידי שימוש באתר, אתם מאשרים שקראתם, הבנתם והסכמתם לתנאי השימוש הללו. אם אינכם מסכימים לתנאים אלה, אנא אל תשתמשו באתר.
            </p>

            <div className="bg-blue-50 border-r-4 p-6 mt-8" style={{ borderColor: '#2A3080' }}>
              <p className="text-gray-700">
                <strong>הערה:</strong> תנאי השימוש הללו משלימים את <Link href="/privacy" className="text-[#2080C0] hover:underline">מדיניות הפרטיות</Link> שלנו. מומלץ לקרוא גם את מדיניות הפרטיות.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}




