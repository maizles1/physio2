import { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'אודות - פיזיותרפיה.פלוס',
  description: 'למידע על מכון פיזיותרפיה.פלוס ואנדריי מייזלס. פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו, עם ניסיון עשיר בטיפול ושיקום. מכון פיזיותרפיה פרטי באשדוד.',
  authors: [{ name: 'אנדריי מייזלס' }],
  openGraph: {
    title: 'אודות פיזיותרפיה.פלוס - אנדריי מייזלס',
    description: 'אנדריי מייזלס, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו, מנהל מכון פיזיותרפיה פרטי באשדוד. ניסיון עשיר בטיפול ושיקום.',
    url: 'https://physiotherapy.plus/about',
  },
  alternates: {
    canonical: 'https://physiotherapy.plus/about',
  },
  other: {
    'geo.region': 'IL',
    'geo.placename': 'אשדוד',
  },
}

export default function AboutPage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'אנדריי מייזלס',
    jobTitle: 'פיזיותרפיסט מקצועי',
    description: 'פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו, מתמחה בטיפול בכאבים, שיקום לאחר ניתוחים ושיקום וסטיבולרי',
    url: 'https://physiotherapy.plus/about',
    image: 'https://physiotherapy.plus/images/andrey-meizels.JPG',
    worksFor: {
      '@type': 'MedicalBusiness',
      name: 'פיזיותרפיה.פלוס',
      url: 'https://physiotherapy.plus',
    },
    knowsAbout: [
      'Physical Therapy',
      'Rehabilitation',
      'Orthopedic Physical Therapy',
      'Vestibular Rehabilitation',
      'Sports Medicine',
      'Pain Management',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'אוניברסיטה (תואר שני בפיזיותרפיה)',
    },
    memberOf: {
      '@type': 'SportsTeam',
      name: 'נבחרת ישראל בג\'ודו',
      roleName: 'פיזיותרפיסט',
    },
  }

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
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
          <Breadcrumbs items={[{ label: 'דף בית', href: '/' }, { label: 'אודות', href: '/about' }]} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">אודות הקליניקה</h1>
          <p className="text-lg sm:text-xl text-white">הכירו את פיזיותרפיה.פלוס ואנדריי מייזלס</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#2A3080' }}>הסיפור שלנו</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                פיזיותרפיה.פלוס הוקמה מתוך חזון לספק טיפול איכותי ומקצועי למטופלים, 
                תוך התמקדות בגישה אישית ומותאמת לכל מטופל. הקליניקה ממוקמת במרכז כלניות באשדוד 
                ומספקת שירותי פיזיותרפיה מקצועיים במגוון רחב של תחומים.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                הקליניקה מצוידת במיטב הציוד המקצועי והטכנולוגיות המתקדמות ביותר, 
                המאפשרות לספק טיפול יעיל ומותאם אישית. אנו מאמינים כי כל מטופל 
                הוא ייחודי ודורש גישה מותאמת לצרכיו הספציפיים.
              </p>
            </div>

            {/* Vision Section */}
            <div id="vision" className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-12 border border-blue-100">
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#2A3080' }}>החזון שלנו</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                החזון שלנו הוא להיות הקליניקה המובילה בתחום הפיזיותרפיה באשדוד והסביבה, 
                המספקת טיפול איכותי, מקצועי ומותאם אישית לכל מטופל. 
                אנו שואפים להביא לשיפור משמעותי באיכות החיים של המטופלים שלנו, 
                תוך הקפדה על גישה מקצועית, סבלנית ואנושית.
              </p>
            </div>

            {/* Values Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'linear-gradient(to bottom right, #40C0F0, #2080C0)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#2A3080' }}>מקצועיות</h3>
                <p className="text-gray-600">צוות מקצועי ומוסמך עם ניסיון רב שנים</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'linear-gradient(to bottom right, #2080C0, #004080)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#2A3080' }}>טיפול אישי</h3>
                <p className="text-gray-600">גישה מותאמת אישית לכל מטופל</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'linear-gradient(to bottom right, #40C0F0, #2A3080)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#2A3080' }}>תוצאות</h3>
                <p className="text-gray-600">מחויבות להשגת תוצאות מיטביות</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#2A3080' }}>הצוות המקצועי</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              פגשו את אנדריי מייזלס, הפיזיותרפיסט המקצועי שלנו
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Andrey Meizels */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 w-full">
                  <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
                    <Image
                      src="/images/andrey-meizels.JPG"
                      alt="אנדריי מייזלס, פיזיותרפיסט מקצועי"
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#2A3080' }}>אנדריי מייזלס</h3>
                  <p className="text-lg mb-4" style={{ color: '#2080C0' }}>פיזיותרפיסט מקצועי, מנהל הקליניקה</p>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      אנדריי מייזלס הוא פיזיותרפיסט מקצועי בעל תואר שני, עם ניסיון רב שנים בתחום השיקום והטיפול. 
                      הוא שימש כפיזיותרפיסט של נבחרת ישראל בג&apos;ודו, ומתמחה בטיפול בכאבים, שיקום לאחר ניתוחים, ושיקום וסטיבולרי.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      עם גישה מקצועית ומותאמת אישית, אנדריי מסייע למטופליו להשיג שיפור משמעותי 
                      בתפקוד ואיכות החיים. הוא מאמין בטיפול הוליסטי המשולב עם טכניקות מתקדמות 
                      וציוד מקצועי, המאפשר השגת תוצאות מיטביות.
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-bold text-gray-900 mb-3">התמחויות:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        טיפול בכאבי גב, כתף, צוואר וברך
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        שיקום לאחר ניתוחים
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        שיקום וסטיבולרי - טיפול בסחרחורות
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        טיפול במפרק הלסת (TMJ)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
