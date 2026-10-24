import Link from 'next/link'
import Image from 'next/image'
import { TEAM_PHYSIO, isTeamPhysioConfigured, teamPhysioInitials } from '@/config/team.config'

export default function AboutPreview() {
  const physioName = isTeamPhysioConfigured() ? TEAM_PHYSIO.name : 'פיזיותרפיסטית מוסמכת'
  const initials = isTeamPhysioConfigured() ? teamPhysioInitials(TEAM_PHYSIO.name) : 'B.P.T'

  return (
    <section className="section-spacing bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="mb-6 text-gray-900">
              אודות הקליניקה
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
              מכון פיזיותרפיה פרטי באשדוד – פיזיותרפיה.פלוס פועלת בניהול קליני של אנדריי מייזלס (M.Sc), מייסד, מנהל קליני ופיזיותרפיסט ספורט, פיזיותרפיסט לשעבר של נבחרת ישראל בג&apos;ודו. הצוות הקליני מלווה תהליכי שיקום אורתופדי, פציעות ספורט ושיקום אקטיבי, לפי מתודולוגיה אחידה.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              המכון מצויד בכלי מדידה אובייקטיביים – דינמומטריה, מערכות BFR ואפליקציית מעקב תרגול – לשיקום אקטיבי, עם 100% השקעה ומחויבות לתהליך השיקום.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <Link
                href="/about#andrey-meizels"
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 hover:border-blue-300 transition-colors"
              >
                <span className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                  <Image
                    src="/images/andrey-meizels.JPG"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </span>
                <span>
                  <span className="block font-bold text-gray-900">אנדריי מייזלס (M.Sc)</span>
                  <span className="block text-sm text-gray-600">מייסד, מנהל קליני ופיזיותרפיסט ספורט</span>
                </span>
              </Link>
              <Link
                href="/about#team-physio"
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 hover:border-blue-300 transition-colors"
              >
                <span
                  className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0)' }}
                  aria-hidden="true"
                >
                  {TEAM_PHYSIO.imageSrc ? (
                    <Image
                      src={TEAM_PHYSIO.imageSrc}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    initials
                  )}
                </span>
                <span>
                  <span className="block font-bold text-gray-900">{physioName}</span>
                  <span className="block text-sm text-gray-600">פיזיותרפיסטית מוסמכת, B.P.T</span>
                </span>
              </Link>
            </div>
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
                aria-label="קרא עוד על הקליניקה ועל הצוות הקליני"
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
                <p className="text-green-100">צוות קליני תחת מתודולוגיה אחידה</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="font-bold text-lg mb-2">מדידה אובייקטיבית</h3>
                <p className="text-orange-100">דינמומטריה, BFR ואפליקציית מעקב תרגול</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
