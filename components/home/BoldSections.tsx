// Homepage sections in the "bold" design (paper / ink / yellow, condensed display type, hard shadows).
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Phone, Plus } from 'lucide-react'
import MeuhedetContactLink from '@/components/MeuhedetContactLink'
import LeadForm from '@/components/LeadForm'
import { homeWhatsappHref } from '@/components/home/HeroCtas'
import { BoldHeading, BoldSection, INK, PAPER, SURFACES, YELLOW, display } from '@/components/home/boldTheme'
import { getTopManualReviews } from '@/config/manual-reviews.config'
import { GOOGLE_RATING_DISPLAY, getReviewUrl } from '@/config/google-business.config'
import { TEAM_PHYSIO, isTeamPhysioConfigured } from '@/config/team.config'
import { seoConfig, getContactPhoneTel } from '@/config/seo.config'

/** Cut long text at a word boundary. */
function truncateWords(text: string, max: number) {
  if (text.length <= max) return text
  return `${text.slice(0, max).replace(/\s+\S*$/, '')}…`
}

/** Keep number ranges (24–48, 60-75) in reading order inside Hebrew text. */
function withRanges(text: string) {
  return text.split(/(\d+[–-]\d+)/).map((part, i) =>
    /^\d+[–-]\d+$/.test(part) ? (
      <span key={i} dir="ltr" className="inline-block">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

/* ---------------------------------- 01: what hurts ---------------------------------- */

const painAreas = [
  { title: 'כאבי גב', href: '/services/back-pain-ashdod', image: '/images/services/back-pain/service-image.jpg' },
  { title: 'כאבי צוואר', href: '/services/neck-pain-ashdod', image: '/images/services/neck-pain/service-image.jpg' },
  { title: 'כאבי כתף', href: '/services/shoulder-pain-ashdod', image: '/images/services/shoulder-pain/service-image.jpg' },
  { title: 'כאבי ברך', href: '/services/knee-pain-ashdod', image: '/images/services/knee-pain/service-image.jpg' },
  { title: 'ורטיגו וסחרחורות', href: '/vertigo-ashdod', image: '/images/services/vestibular/service-image.png' },
  { title: 'מפרק הלסת', href: '/services/tmj-ashdod', image: '/images/services/tmj/service-image.png' },
  { title: 'שיקום אחרי ניתוח', href: '/services/post-surgery-ashdod', image: '/images/services/post-surgery/service-image.jpg' },
  { title: 'ביקור בית', href: '/services/home-visits-ashdod', image: '/images/services/home-visits/service-image.png' },
]

export function BoldPainPicker() {
  return (
    <BoldSection surface="paper">
      <BoldHeading surface="paper" index="01" label="במה אנחנו מטפלים" title="מה כואב לך?" />
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 list-none m-0! p-0!">
        {painAreas.map((p) => (
          <li key={p.href} className="m-0!">
            <Link
              href={p.href}
              className="group block border-2 bg-white transition-transform hover:-translate-y-1"
              style={{ borderColor: INK, boxShadow: `5px 5px 0 ${INK}` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={`${p.title}: פיזיותרפיה באשדוד`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-2.5" style={{ background: INK }}>
                <h3
                  className={`${display.className} m-0!`}
                  style={{ color: PAPER, fontSize: 'clamp(1.6rem, 5vw, 1.9rem)', lineHeight: 1, fontWeight: 700, letterSpacing: 0 }}
                >
                  {p.title}
                </h3>
                <ArrowLeft className="h-5 w-5 flex-shrink-0 transition-transform group-hover:-translate-x-1" style={{ color: YELLOW }} aria-hidden="true" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href="/services" className="inline-flex items-center gap-2 font-bold underline underline-offset-4" style={{ color: INK }}>
          לכל השירותים
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </BoldSection>
  )
}

/* ---------------------------------- 02: reviews ---------------------------------- */

export function BoldReviews() {
  const reviews = getTopManualReviews(4)
  const reviewUrl = getReviewUrl()
  if (reviews.length === 0) return null
  const s = SURFACES.ink
  return (
    <BoldSection surface="ink">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
        <div className="[&>div]:mb-0!">
          <BoldHeading surface="ink" index="02" label="ביקורות בגוגל" title="מה אומרים עלינו" />
        </div>
        <div className="flex items-end gap-4">
          <div className={`${display.className} leading-[0.8]`} style={{ color: YELLOW, fontSize: 'clamp(5rem, 18vw, 8rem)' }}>
            {GOOGLE_RATING_DISPLAY}
          </div>
          <div className="pb-2">
            <div className="tracking-[0.2em]" style={{ color: YELLOW }} aria-hidden="true">
              ★★★★★
            </div>
            <div className="text-sm font-bold" style={{ color: s.sub }}>
              דירוג המטופלים בגוגל
            </div>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 list-none m-0! p-0!">
        {reviews.map((r) => (
          <li key={r.id} className="m-0! relative p-5 pt-7" style={{ background: PAPER, boxShadow: `6px 6px 0 ${YELLOW}` }}>
            <div className={`${display.className} absolute -top-6 right-4 text-[4.5rem] leading-none`} style={{ color: YELLOW }} aria-hidden="true">
              ״
            </div>
            <div className="text-[0.95rem] leading-relaxed" style={{ color: INK }}>
              {truncateWords(r.text, 170)}
            </div>
            <div className="mt-4 border-t-2 pt-3 flex items-center justify-between gap-2" style={{ borderColor: INK }}>
              <div className="font-bold" style={{ color: INK }}>
                {r.authorName}
              </div>
              <div className="text-xs tracking-[0.15em]" style={{ color: '#B47B00' }} aria-label={`${r.rating} מתוך 5 כוכבים`}>
                {'★'.repeat(r.rating)}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center">
        <Link
          href="/testimonials"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold"
          style={{ background: YELLOW, color: INK }}
        >
          לכל ההמלצות
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </Link>
        {reviewUrl && (
          <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4" style={{ color: PAPER }}>
            טופלתם אצלנו? השאירו ביקורת בגוגל
          </a>
        )}
      </div>
    </BoldSection>
  )
}

/* ---------------------------------- 03: funds & insurers ---------------------------------- */

const funds: { title: string; text: string; logo: string; link: string; href?: string; whatsapp?: string }[] = [
  {
    title: 'מאוחדת',
    text: 'ספק רשמי של מאוחדת לפיזיותרפיה ופציעות ספורט.',
    logo: '/images/insurance/Meuhedet-Logo.png',
    href: '/meuhedet',
    link: 'פרטים למבוטחי מאוחדת',
  },
  {
    title: 'משרד הביטחון',
    text: 'ספק מוכר של משרד הביטחון. זכאי משרד הביטחון מקבלים טיפול בקליניקה.',
    logo: '/images/insurance/Ministry-of-defense-logo.png',
    href: '/misrad-habitachon',
    link: 'פרטים לזכאי משרד הביטחון',
  },
  {
    title: 'כללית',
    text: 'מבוטחי כללית יכולים לקבל החזרים לפי תנאי הביטוח המשלים.',
    logo: '/images/insurance/Clalit-Logo.png',
    whatsapp: 'שלום, אשמח לברר זכאות להחזר מכללית',
    link: 'בירור זכאות בוואטסאפ',
  },
  {
    title: 'ביטוחים פרטיים',
    text: 'ביטוחים פרטיים ומשלימים כוללים לרוב החזר על פיזיותרפיה.',
    logo: '/images/insurance/private-insurance-logo.svg',
    whatsapp: 'שלום, אשמח לברר זכאות להחזר מביטוח פרטי',
    link: 'בירור זכאות בוואטסאפ',
  },
]

export function BoldInsurance() {
  return (
    <BoldSection surface="yellow">
      <BoldHeading surface="yellow" index="03" label="קופות וביטוחים" title="עם מי אנחנו עובדים" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none m-0! p-0!">
        {funds.map((f) => (
          <li key={f.title} className="m-0! flex flex-col border-2 bg-white p-5" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${INK}` }}>
            <div className="relative h-14 mb-4">
              <Image src={f.logo} alt={`${f.title} - לוגו`} fill className="object-contain object-right" sizes="200px" />
            </div>
            <h3 className="m-0! mb-1!" style={{ color: INK, fontSize: '1.25rem', fontWeight: 800 }}>
              {f.title}
            </h3>
            <div className="text-[0.95rem] leading-relaxed mb-4 flex-1" style={{ color: '#3b3f4c' }}>
              {f.text}
            </div>
            {f.whatsapp ? (
              <MeuhedetContactLink
                page="home"
                type="whatsapp"
                href={homeWhatsappHref(f.whatsapp)}
                section="insurance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#14161F]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {f.link}
              </MeuhedetContactLink>
            ) : (
              <Link href={f.href ?? '/contact'} className="inline-flex items-center gap-1.5 font-bold" style={{ color: INK }}>
                {f.link}
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </BoldSection>
  )
}

/* ---------------------------------- 04: about ---------------------------------- */

export function BoldAbout() {
  const s = SURFACES.paper
  const team = [
    {
      name: 'אנדריי מייזלס (M.Sc)',
      role: 'מייסד ומנהל קליני, פיזיותרפיסט ספורט. לשעבר פיזיותרפיסט נבחרת ישראל בג׳ודו.',
      image: '/images/andrey-meizels.JPG',
      href: '/about#andrey-meizels',
    },
    ...(isTeamPhysioConfigured()
      ? [
          {
            name: TEAM_PHYSIO.name,
            role: `פיזיותרפיסטית מוסמכת, B.P.T. ${TEAM_PHYSIO.specialties.join(', ')}.`,
            image: TEAM_PHYSIO.imageSrc,
            href: '/about#team-physio',
          },
        ]
      : []),
  ]
  return (
    <BoldSection surface="paper">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <BoldHeading surface="paper" index="04" label="אודות הקליניקה" title={<>מודדים,<br />לא מנחשים.</>} />
          <p className="m-0! mb-4!" style={{ color: s.sub, fontSize: '1.05rem' }}>
            פיזיותרפיה.פלוס הוא מכון פיזיותרפיה פרטי באשדוד, בניהולו הקליני של אנדריי מייזלס (M.Sc), לשעבר פיזיותרפיסט נבחרת
            ישראל בג׳ודו. הצוות מלווה שיקום אורתופדי, פציעות ספורט ושיקום אקטיבי, לפי שיטת עבודה אחת.
          </p>
          <p className="m-0! mb-6!" style={{ color: s.sub, fontSize: '1.05rem' }}>
            בקליניקה מודדים במקום לנחש: דינמומטריה למדידת כוח, אימון BFR ואפליקציה למעקב אחרי התרגול בבית.
          </p>
          <ul className="grid grid-cols-3 border-t-2 list-none m-0! p-0!" style={{ borderColor: INK }}>
            {[
              ['5000+', 'מטופלים'],
              ['M.Sc', 'ניהול קליני'],
              [GOOGLE_RATING_DISPLAY, 'בגוגל'],
            ].map(([n, l], i) => (
              <li key={l} className={`m-0! pt-3 ${i > 0 ? 'border-r pr-3' : ''}`} style={{ borderColor: s.rule }}>
                <div className={`${display.className} text-[2.6rem] leading-none`} style={{ color: i === 0 ? s.accent : INK }}>
                  {n}
                </div>
                <div className="text-sm font-bold" style={{ color: INK }}>
                  {l}
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 font-bold"
            style={{ background: INK, color: PAPER, boxShadow: `5px 5px 0 ${YELLOW}` }}
          >
            הכירו את הצוות
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-5 list-none m-0! p-0! lg:pt-6">
          {team.map((m, i) => (
            <li key={m.name} className={`m-0! ${i === 1 ? 'mt-10' : ''}`}>
              <Link href={m.href} className="group block">
                <div className="relative">
                  <div className="relative aspect-[3/4] overflow-hidden border-4 border-white" style={{ boxShadow: `6px 6px 0 ${i === 0 ? INK : '#1E78B8'}` }}>
                    <Image src={m.image} alt={m.name} fill className="object-cover object-top" sizes="(max-width: 1024px) 45vw, 22vw" />
                  </div>
                  <div
                    className={`absolute -top-3 ${i === 0 ? 'right-4 rotate-[6deg]' : 'left-4 rotate-[-7deg]'} h-6 w-16 opacity-85`}
                    style={{ background: YELLOW }}
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className={`${display.className} mt-4! mb-0!`}
                  style={{ color: INK, fontSize: '1.8rem', lineHeight: 1, fontWeight: 700, letterSpacing: 0 }}
                >
                  {m.name}
                </h3>
                <div className="mt-1 text-sm leading-snug" style={{ color: s.sub }}>
                  {m.role}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </BoldSection>
  )
}

/* ---------------------------------- 06: FAQ ---------------------------------- */

const faqs = [
  {
    question: 'איך מגיעים לקליניקה באשדוד והאם יש חניה?',
    answer:
      'הקליניקה של פיזיותרפיה.פלוס נמצאת במרכז כלניות, רחוב יקינטון 3 באשדוד, עם חניה סמוכה למרכז. כדאי להגיע בבגדים נוחים לתנועה ולהביא מסמכים רפואיים או בדיקות הדמיה, אם יש.',
  },
  {
    question: 'האם צריך הפניה מרופא לקבלת טיפול?',
    answer:
      'ברוב המקרים, ניתן לפנות ישירות לפיזיותרפיסט ללא הפניה מרופא. עם זאת, ישנם מצבים בהם נדרשת הפניה בהתאם לדרישות קופת החולים או חברת הביטוח שלך. מומלץ לבדוק עם הקופה או חברת הביטוח שלך מה התנאים לקבלת טיפול מכוסה. במקרים מסוימים, הפניה מרופא יכולה לעזור לקבלת החזרים מביטוח.',
  },
  {
    question: 'כמה זמן נמשך כל טיפול?',
    answer:
      'משך הטיפול משתנה בהתאם לסוג הטיפול ולצרכים האישיים של המטופל. בטיפול הראשון נערכת הערכה מקיפה שיכולה להימשך מעט יותר זמן (60-75 דקות) כדי להבין את הבעיה ולהתאים תוכנית טיפול אישית. משך הטיפול תלוי גם בחומרת הבעיה ובשיטת הטיפול הנבחרת.',
  },
  {
    question: 'האם הטיפול כואב?',
    answer:
      'הטיפול לא אמור להיות כואב. חלק מהטכניקות יכולות לגרום לאי נוחות קלה או תחושת לחץ, אך לא לכאב משמעותי. הפיזיותרפיסט מתאים את הטיפול לרמת הכאב והסבילות שלך ומעודד תקשורת פתוחה במהלך הטיפול. אם חווית כאב במהלך הטיפול, חשוב מאוד ליידע את המטפל מיד כדי להתאים את הטכניקות. המטרה היא לשפר את המצב ללא יצירת כאב נוסף.',
  },
  {
    question: 'כיצד אפשר לקבל החזרים?',
    answer:
      'אנחנו ספק של מאוחדת (למבוטחי מאוחדת שיא) וספק מוכר של משרד הביטחון. מבוטחי כללית ובעלי ביטוחים פרטיים יכולים לקבל החזרים לפי תנאי הביטוח המשלים או הפוליסה. מבוטחי שאר הקופות מטופלים באופן פרטי.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
}

export function BoldFAQ() {
  const s = SURFACES.paper
  return (
    <BoldSection surface="paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl">
        <BoldHeading surface="paper" index="06" label="שאלות נפוצות" title="לפני שמגיעים" />
        <div className="border-t-2" style={{ borderColor: INK }}>
          {faqs.map((f) => (
            <details key={f.question} className="group border-b-2" style={{ borderColor: INK }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="m-0!" style={{ color: INK, fontSize: '1.125rem', lineHeight: 1.4, fontWeight: 700, letterSpacing: 0 }}>
                  {f.question}
                </h3>
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center transition-transform group-open:rotate-45"
                  style={{ background: INK }}
                  aria-hidden="true"
                >
                  <Plus className="h-5 w-5" style={{ color: YELLOW }} />
                </div>
              </summary>
              <p className="m-0! pb-5!" style={{ color: s.sub, fontSize: '1rem' }}>
                {withRanges(f.answer)}
              </p>
            </details>
          ))}
        </div>
        <Link href="/faq" className="mt-6 inline-flex items-center gap-2 font-bold underline underline-offset-4" style={{ color: INK }}>
          לכל השאלות הנפוצות
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </BoldSection>
  )
}

/* ---------------------------------- 07: contact ---------------------------------- */

export function BoldContact() {
  const s = SURFACES.ink
  return (
    <BoldSection surface="ink" id="lead-form" className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <BoldHeading surface="ink" index="07" label="קביעת תור" title={<>מתחילים<br />לזוז.</>} />
          <div className="max-w-md text-[1.05rem] leading-relaxed mb-6" style={{ color: s.sub }}>
            כתבו לנו בוואטסאפ או התקשרו, ונמצא תור תוך {withRanges('24–48')} שעות. לא נוח לדבר? השאירו פרטים בטופס ונחזור אליכם.
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <MeuhedetContactLink
              page="home"
              type="whatsapp"
              href={homeWhatsappHref('שלום, אשמח לקבוע תור')}
              section="cta_section"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#25D366] px-6 py-4 text-lg font-extrabold text-[#14161F]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              כתבו לנו ב-WhatsApp
            </MeuhedetContactLink>
            <MeuhedetContactLink
              page="home"
              type="phone"
              href={`tel:${getContactPhoneTel()}`}
              section="cta_section"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 border-[#F3EEE5] px-6 py-4 text-lg font-bold"
            >
              <Phone className="h-5 w-5" style={{ color: PAPER }} aria-hidden="true" />
              <div style={{ color: PAPER }}>{seoConfig.contact.phone}</div>
            </MeuhedetContactLink>
          </div>
          <div className="mt-6 text-sm" style={{ color: s.sub }}>
            יקינטון 3, מרכז כלניות, אשדוד · א׳–ה׳{' '}
            <span dir="ltr" className="inline-block">
              08:00–20:00
            </span>{' '}
            · ו׳{' '}
            <span dir="ltr" className="inline-block">
              08:00–14:00
            </span>
          </div>
        </div>
        <div style={{ boxShadow: `8px 8px 0 ${YELLOW}` }}>
          <LeadForm source="home" />
        </div>
      </div>
    </BoldSection>
  )
}
