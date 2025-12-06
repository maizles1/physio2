import { Metadata } from 'next'
import Link from 'next/link'
import { getPlaceId, getReviewUrl } from '@/config/google-business.config'

export const metadata: Metadata = {
  title: 'השאר ביקורת - פיזיותרפיה.פלוס',
  description: 'עזור לנו ולאחרים - השאר ביקורת על השירותים שלנו ב-Google',
  robots: {
    index: false, // Don't index this page
    follow: false,
  },
}

export default function ReviewPage() {
  const placeId = getPlaceId()
  const reviewUrl = getReviewUrl()

  if (!placeId || !reviewUrl) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold mb-4">Google Business לא מוגדר</h1>
          <p className="text-gray-600 mb-6">נא להגדיר NEXT_PUBLIC_GOOGLE_PLACE_ID ב-.env.local</p>
          <Link
            href="/testimonials"
            className="text-blue-600 hover:underline"
          >
            חזרה לדף העדויות
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: '#2A3080' }}>
            תודה על הרצון לעזור!
          </h1>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            הביקורת שלך חשובה לנו מאוד ומעזרת לאנשים אחרים למצוא את השירותים הטובים ביותר.
          </p>

          <div className="bg-blue-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2A3080' }}>
              איך להשאיר ביקורת?
            </h2>
            <ol className="text-right space-y-4 mb-6 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</span>
                <span className="text-right">לחץ על הכפתור למטה להשארת ביקורת ב-Google</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</span>
                <span className="text-right">תועבר לדף הביקורת של העסק שלנו ב-Google (ייפתח בחלון חדש)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</span>
                <span className="text-right">השאר את הביקורת שלך (דירוג וטקסט)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</span>
                <span className="text-right">לחץ &quot;פרסם&quot; או &quot;Publish&quot;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</span>
                <span className="text-right">חזור לדף העדויות שלנו - הביקורת תועתק אוטומטית ותופיע שם תוך מספר שעות!</span>
              </li>
            </ol>
          </div>

          <div className="mb-8">
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#2080C0] hover:bg-[#004080] text-white font-bold text-lg py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={() => {
                // After opening Google, show message to come back
                setTimeout(() => {
                  if (typeof window !== 'undefined') {
                    window.alert('לאחר שתפרסם את הביקורת ב-Google, חזור לדף העדויות שלנו כדי לראות אותה!')
                  }
                }, 1000)
              }}
            >
              <svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>השאר ביקורת ב-Google</span>
            </a>
          </div>

          <div className="bg-green-50 border-r-4 border-green-500 rounded-lg p-6 mb-8 text-right">
            <p className="text-gray-800 mb-3">
              <strong className="text-lg">✅ מה כבר עובד:</strong>
            </p>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>הביקורות מ-Google מועתקות אוטומטית לאתר דרך Google Places API</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>כל ביקורת שתפרסם ב-Google תופיע באתר שלנו תוך מספר שעות</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border-r-4 border-blue-400 rounded-lg p-6 mb-8 text-right">
            <p className="text-gray-800 mb-2">
              <strong>💡 איך זה עובד:</strong>
            </p>
            <p className="text-gray-700">
              לאחר שתפרסם את הביקורת ב-Google, חזור לדף העדויות שלנו. 
              <br />
              <strong>הביקורת תועתק אוטומטית</strong> ותופיע בדף העדויות תוך מספר שעות (תלוי בעדכון של Google).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              חזרה לדף העדויות
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              חזרה לדף הבית
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

