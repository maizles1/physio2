import Link from 'next/link'

export default function AboutPreview() {
  return (
    <section className="section-spacing bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="mb-6 text-gray-900">
              אודות הקליניקה
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
              מכון פיזיותרפיה פרטי באשדוד - פיזיותרפיה.פלוס הוקם מתוך חזון לספק טיפול איכותי ומקצועי למטופלים. 
              אנדריי מייזלס, פיזיותרפיסט פרטי מומלץ באשדוד, פיזיותרפיסט מקצועי בעל תואר שני ופיזיותרפיסט לשעבר של נבחרת ישראל בג&apos;ודו, מתמחה במגוון רחב של תחומי שיקום וטיפול, תוך הקפדה על גישה אישית ומותאמת לכל מטופל.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              המכון מצויד במיטב הציוד המקצועי והטכניקות המתקדמות, 
              כדי להביא לתוצאות מיטביות ולשיפור משמעותי באיכות החיים של המטופלים.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">ניסיון רב</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-600 mb-1">5000+</div>
                <div className="text-gray-700">מטופלים מרוצים</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="btn btn-primary"
                aria-label="קרא עוד על הקליניקה ועל אנדריי מייזלס"
              >
                קרא עוד עלינו
              </Link>
              <Link
                href="/services"
                className="btn btn-secondary"
                aria-label="צפה בשירותי הפיזיותרפיה שלנו"
              >
                השירותים שלנו
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white h-48 flex flex-col justify-center">
                <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-bold text-lg mb-2">איכות גבוהה</h3>
                <p className="text-white">טיפול מקצועי ברמה גבוהה ביותר</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white h-48 flex flex-col justify-center">
                <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="font-bold text-lg mb-2">צוות מקצועי</h3>
                <p className="text-green-100">מטפלים מוסמכים ומיומנים</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white h-48 flex flex-col justify-center">
                <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h3 className="font-bold text-lg mb-2">טיפול אישי</h3>
                <p className="text-purple-100">תוכנית טיפול מותאמת לכל מטופל</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white h-48 flex flex-col justify-center">
                <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-bold text-lg mb-2">תוצאות מהירות</h3>
                <p className="text-orange-100">שיפור משמעותי בזמן קצר</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

