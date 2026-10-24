import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getMastersCredentialSchema, getUniversitySchema, getClinicEntityRef } from '@/config/geo.config'
import {
  TEAM_PHYSIO,
  isPlaceholderValue,
  isTeamPhysioConfigured,
  teamPhysioInitials,
} from '@/config/team.config'

const aboutLead =
  'הצוות הקליני של פיזיותרפיה.פלוס – בניהולו של אנדריי מייזלס (M.Sc), מייסד, מנהל קליני ופיזיותרפיסט ספורט'

export const metadata: Metadata = {
  title: 'הצוות הקליני – אנדריי מייזלס (M.Sc), מייסד, מנהל קליני ופיזיותרפיסט ספורט',
  description: `${aboutLead}. מכון פיזיותרפיה פרטי באשדוד, לשעבר נבחרת ישראל בג'ודו.`,
  authors: [{ name: 'אנדריי מייזלס' }],
  openGraph: {
    title: aboutLead,
    description: `${aboutLead}. מכון פיזיותרפיה פרטי באשדוד, לשעבר נבחרת ישראל בג'ודו.`,
    url: 'https://physio-plus.co.il/about',
    type: 'website',
    locale: 'he_IL',
    images: [
      {
        url: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
        width: 1200,
        height: 630,
        alt: aboutLead,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: aboutLead,
    description: `${aboutLead}. מכון פיזיותרפיה פרטי באשדוד.`,
    images: ['https://physio-plus.co.il/images/logo/clinic-logo.png'],
  },
  alternates: {
    canonical: 'https://physio-plus.co.il/about',
  },
  other: {
    'geo.region': 'IL',
    'geo.placename': 'אשדוד',
  },
}

const methodologyTools = [
  { title: 'דינמומטר Lafayette', detail: 'מדידת כוח אובייקטיבית' },
  { title: 'מערכת BFR', detail: 'אימון עם הגבלת זרימת דם' },
  { title: 'NMES', detail: 'גירוי חשמלי עצבי-שרירי' },
  { title: 'אפליקציית תרגול', detail: 'מעקב דיגיטלי בין הטיפולים' },
]

const teamHighlights = [
  {
    title: 'סינרגיה קלינית מלאה',
    text: 'עבודה לפי פרוטוקולי האבחון, המדידה והשיקום של פיזיותרפיה.פלוס.',
    icon: 'link' as const,
  },
  {
    title: 'ציוד ומכשור מתקדם',
    text: 'שימוש שוטף בדינמומטריה, מערכות BFR ואפליקציית התרגול של המכון.',
    icon: 'bolt' as const,
  },
  {
    title: 'מענה מותאם לנשים ומתאמנות',
    text: 'אפשרות לליווי מקצועי על ידי פיזיותרפיסטית אישה בסביבה נוחה ומותאמת.',
    icon: 'user' as const,
  },
  {
    title: '100% השקעה בתהליך',
    text: 'מחויבות מלאה למעקב, התקדמות בהדרגה וחזרה בטוחה לתפקוד ולספורט.',
    icon: 'check' as const,
  },
]

function HighlightIcon({ name }: { name: (typeof teamHighlights)[number]['icon'] }) {
  const common = {
    className: 'w-6 h-6 text-white',
    fill: 'none',
    stroke: 'currentColor',
    viewBox: '0 0 24 24',
    'aria-hidden': true as const,
  }

  if (name === 'link') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    )
  }

  if (name === 'bolt') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }

  if (name === 'user') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function TeamPhysioPortrait() {
  if (TEAM_PHYSIO.imageSrc) {
    return (
      <Image
        src={TEAM_PHYSIO.imageSrc}
        alt={`${TEAM_PHYSIO.name}, פיזיותרפיסטית מוסמכת`}
        fill
        className="object-cover w-full h-full"
        sizes="(max-width: 768px) 100vw, 33vw"
        quality={90}
      />
    )
  }

  const initials = isTeamPhysioConfigured() ? teamPhysioInitials(TEAM_PHYSIO.name) : 'B.P.T'

  return (
    <div
      className="w-full h-full flex items-center justify-center text-white"
      style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}
      role="img"
      aria-label={isTeamPhysioConfigured() ? TEAM_PHYSIO.name : 'פיזיותרפיסטית מוסמכת'}
    >
      <div className="text-center px-4">
        <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full bg-white/15 border-4 border-white/30 flex items-center justify-center text-3xl sm:text-4xl font-bold">
          {initials}
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const credentialSchema = {
    '@context': 'https://schema.org',
    ...getMastersCredentialSchema(),
    description: 'תואר שני (M.Sc) בפיזיותרפיה מאוניברסיטת אריאל',
    about: {
      '@type': 'EducationalOccupationalProgram',
      programType: 'Graduate Program',
      occupationalCategory: 'Physical Therapy',
    },
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://physio-plus.co.il/about#andrey-meizels',
    name: 'אנדריי מייזלס',
    alternateName: ['Andrey Meizels', 'Andrey Maizles'],
    jobTitle: 'מייסד, מנהל קליני ופיזיותרפיסט ספורט',
    description:
      'אנדריי מייזלס (M.Sc) – מייסד, מנהל קליני ופיזיותרפיסט ספורט. בעל תואר שני (M.Sc) ותואר ראשון (B.P.T) בפיזיותרפיה מאוניברסיטת אריאל, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו ושל סיירת חרוב.',
    url: 'https://physio-plus.co.il/about',
    image: 'https://physio-plus.co.il/images/andrey-meizels.JPG',
    telephone: '+972-50-883-8982',
    knowsLanguage: ['he', 'Hebrew'],
    worksFor: getClinicEntityRef(),
    knowsAbout: [
      'Physical Therapy',
      'Rehabilitation',
      'Orthopedic Physical Therapy',
      'Vestibular Rehabilitation',
      'Sports Medicine',
      'Pain Management',
      'Post-Surgical Rehabilitation',
      'TMJ Treatment',
    ],
    hasCredential: getMastersCredentialSchema(),
    alumniOf: getUniversitySchema(),
    memberOf: {
      '@type': 'SportsTeam',
      name: 'נבחרת ישראל בג\'ודו',
      roleName: 'פיזיותרפיסט',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Physiotherapist',
      occupationLocation: {
        '@type': 'City',
        name: 'אשדוד',
      },
      skills: [
        'טיפול בכאבי גב',
        'טיפול בכאבי כתף',
        'שיקום לאחר ניתוחים',
        'שיקום וסטיבולרי',
        'טיפול במפרק הלסת',
      ],
    },
  }

  const teamPhysioSchema = isTeamPhysioConfigured()
    ? {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://physio-plus.co.il/about#team-physio',
        name: TEAM_PHYSIO.name,
        jobTitle: 'פיזיותרפיסטית מוסמכת',
        description:
          'פיזיותרפיסטית מוסמכת (B.P.T) בצוות הקליני של פיזיותרפיה.פלוס. מתמחה בשיקום אורתופדי, פציעות ספורט ושיקום אקטיבי, תחת המתודולוגיה הקלינית של אנדריי מייזלס.',
        url: 'https://physio-plus.co.il/about#team-physio',
        ...(TEAM_PHYSIO.imageSrc
          ? { image: `https://physio-plus.co.il${TEAM_PHYSIO.imageSrc}` }
          : {}),
        worksFor: getClinicEntityRef(),
        knowsAbout: ['Orthopedic Rehabilitation', 'Sports Injuries', 'Active Rehabilitation', ...TEAM_PHYSIO.specialties],
        ...(!isPlaceholderValue(TEAM_PHYSIO.university)
          ? {
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: TEAM_PHYSIO.university,
              },
            }
          : {}),
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          educationalLevel: "Bachelor's Degree",
          name: 'תואר ראשון בפיזיותרפיה (B.P.T)',
        },
      }
    : null

  const teamPhysioLabel = isTeamPhysioConfigured()
    ? `${TEAM_PHYSIO.name}, B.P.T – פיזיותרפיסטית מוסמכת`
    : 'פיזיותרפיסטית מוסמכת, B.P.T'

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {teamPhysioSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(teamPhysioSchema) }}
        />
      )}
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">אודות הקליניקה</h1>
          <p className="text-lg sm:text-xl text-white">הכירו את פיזיותרפיה.פלוס והצוות הקליני שלנו</p>
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

            <dl className="geo-facts grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
              <div>
                <dt className="text-sm font-semibold text-gray-500">שם הקליניקה</dt>
                <dd className="text-lg font-bold text-gray-900">פיזיותרפיה.פלוס</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">מנהל קליני</dt>
                <dd className="text-lg font-bold text-gray-900">אנדריי מייזלס (M.Sc) – מייסד, מנהל קליני ופיזיותרפיסט ספורט</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">השכלה</dt>
                <dd className="text-lg font-bold text-gray-900">תואר שני (M.Sc) ותואר ראשון (B.P.T) בפיזיותרפיה, אוניברסיטת אריאל</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">צוות קליני</dt>
                <dd className="text-lg font-bold text-gray-900">{teamPhysioLabel}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">כתובת</dt>
                <dd className="text-lg font-bold text-gray-900">יקינטון 3, מרכז כלניות, אשדוד</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">טלפון</dt>
                <dd className="text-lg font-bold text-gray-900">
                  <a href="tel:+972-50-883-8982" className="hover:underline" style={{ color: '#2080C0' }}>050-883-8982</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">שעות פעילות</dt>
                <dd className="text-base font-medium text-gray-900">ראשון–חמישי 08:00–20:00 · שישי 08:00–14:00 · שבת סגור</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">ביטוחים</dt>
                <dd className="text-base font-medium text-gray-900">החזרים מכללית · מאוחדת שיא · משרד הביטחון · ביטוחים פרטיים</dd>
              </div>
            </dl>

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
                <h3 className="text-xl font-bold mb-2" style={{ color: '#2A3080' }}>שיקום אקטיבי ומדיד</h3>
                <p className="text-gray-600">100% השקעה ומחויבות לתהליך השיקום, עם מדידה אובייקטיבית</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#2A3080' }}>הצוות הקליני</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              צוות קליני אחד, מתודולוגיה אחת – בניהולו הקליני של אנדריי מייזלס
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Part A — Andrey Meizels */}
            <div id="andrey-meizels" className="bg-white rounded-xl shadow-lg overflow-hidden scroll-mt-24">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 w-full">
                  <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
                    <Image
                      src="/images/andrey-meizels.JPG"
                      alt="אנדריי מייזלס (M.Sc), מייסד, מנהל קליני ופיזיותרפיסט ספורט"
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={90}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#2A3080' }}>
                    אנדריי מייזלס (M.Sc) – מייסד, מנהל קליני ופיזיותרפיסט ספורט
                  </h3>
                  <p className="text-lg mb-4" style={{ color: '#2080C0' }}>
                    תואר שני <bdi dir="ltr">M.Sc</bdi> ותואר ראשון <bdi dir="ltr">B.P.T</bdi> בפיזיותרפיה, אוניברסיטת אריאל
                  </p>

                  <div className="space-y-4 mb-6">
                    <h4 className="text-xl font-bold mb-2" style={{ color: '#2A3080' }}>נעים להכיר, אנדריי מייזלס</h4>
                    <p className="text-gray-700 leading-relaxed">
                      כמי שמחפש <strong>פיזיותרפיסט פרטי באשדוד</strong>, חשוב לדעת שהגוף מופקד בידיים מנוסות ומקצועיות.
                      אנדריי מייזלס הוא פיזיותרפיסט מוסמך בעל תואר שני (M.Sc) ותואר ראשון (B.P.T) בפיזיותרפיה מאוניברסיטת אריאל, מייסד הקליניקה ומנהלה הקליני.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      את הניסיון הקליני והמעשי צבר במקומות התובעניים ביותר: שימש כפיזיותרפיסט של נבחרת ישראל בג&apos;ודו,
                      שם טיפל בספורטאי עלית תחת עומס קיצוני, וכפיזיותרפיסט של יחידת העילית סיירת חרוב,
                      שם התמודד עם פציעות מורכבות בשטח.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      את הניסיון הזה תרגם אנדריי לפרוטוקולי הטיפול האחידים של הקליניקה, לכלי מדידה אובייקטיביים – דינמומטר Lafayette, מערכת BFR ו-NMES – ולפלטפורמת תרגול דיגיטלית שמלווה כל מטופל בין הטיפולים.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      היום הסטנדרט הזה הוא מתודולוגיית הקליניקה: שירותי <strong>פיזיותרפיה פרטית באשדוד</strong>,
                      עם התמחות בשיקום ספורט ובטיפול במגוון כאבים אורתופדיים – מכאבי גב וצוואר ועד שיקום לאחר ניתוח.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      כל מטופל שמגיע לקליניקה ראוי לאותו יחס, דיוק ומקצועיות שמקבלים לוחמים וספורטאי עלית.
                      הגישה היא שיקום אקטיבי, עם 100% השקעה ומחויבות לתהליך השיקום ומדידה אובייקטיבית לאורך הדרך.
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-bold text-gray-900 mb-3">התמחויות:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        טיפול בכאבי גב, כתף, צוואר וברך
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        שיקום לאחר ניתוחים
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        שיקום וסטיבולרי - טיפול בסחרחורות
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        טיפול במפרק הלסת (TMJ)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#2A3080' }}>כלי המדידה והשיקום של הקליניקה</h3>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {methodologyTools.map((tool) => (
                  <li key={tool.title} className="rounded-lg bg-white border border-blue-100 px-3 py-4 text-center shadow-sm">
                    <p className="font-bold text-gray-900">{tool.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{tool.detail}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Part B — Female physiotherapist */}
            <div id="team-physio" className="bg-white rounded-xl shadow-lg overflow-hidden scroll-mt-24">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 w-full">
                  <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
                    <TeamPhysioPortrait />
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#2A3080' }}>
                    <bdi>{TEAM_PHYSIO.name}</bdi>
                    <bdi dir="ltr">, B.P.T</bdi>
                    {' – פיזיותרפיסטית מוסמכת'}
                  </h3>
                  {!isPlaceholderValue(TEAM_PHYSIO.university) && (
                    <p className="text-base text-gray-600 mb-3">{TEAM_PHYSIO.university}</p>
                  )}
                  <p
                    className="inline-flex max-w-full rounded-full px-4 py-1.5 text-sm font-semibold text-white mb-4 leading-snug"
                    style={{ background: 'linear-gradient(to bottom right, #40C0F0, #2080C0)' }}
                  >
                    הצוות הקליני | שיקום אורתופדי, פציעות ספורט ושיקום אקטיבי
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    פיזיותרפיסטית מוסמכת (בוגרת תואר ראשון B.P.T בפיזיותרפיה), שנבחרה בקפידה לצוות הקליני של פיזיותרפיה.פלוס. מתמחה בליווי תהליכי שיקום אורתופדיים, פציעות ספורט ושיקום אקטיבי. פועלת תחת מתודולוגיית האבחון והמדידה הקפדנית של הקליניקה – כולל שימוש במערכות BFR, מדידות כוח ממוחשבות (דינמומטריה) ובניית תוכניות תרגול מותאמות, בסינרגיה ובקרה קלינית משותפת עם אנדריי מייזלס.
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {teamHighlights.map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'linear-gradient(to bottom right, #40C0F0, #2080C0)' }}
                        >
                          <HighlightIcon name={item.icon} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-bold text-gray-900 mb-3">התמחויות:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                      {TEAM_PHYSIO.specialties.map((specialty) => (
                        <li key={specialty} className="flex items-center gap-2">
                          <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {specialty}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-8 text-center text-white" style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}>
              <h3 className="text-2xl font-bold mb-3 text-white">תיאום תור בצוות הקליני</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
                נתאים את המטפל או המטפלת בצוות לפי סוג השיקום, ונבנה תוכנית שמבוססת על מדידה אובייקטיבית ושיקום אקטיבי.
              </p>
              <Link
                href="/contact"
                className="btn btn-secondary btn-large"
                aria-label="לתיאום תור והתאמת מטפל/ת בצוות הקליני"
              >
                לתיאום תור והתאמת מטפל/ת בצוות הקליני
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
