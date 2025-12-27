import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'צור קשר - פיזיותרפיה.פלוס',
  description: 'צרו קשר עם מכון פיזיותרפיה.פלוס באשדוד. טלפון: 050-883-8982, כתובת: מרכז כלניות, אשדוד. זמינים בימים ראשון-חמישי 08:00-20:00, שישי 08:00-14:00.',
  keywords: [
    'צור קשר פיזיותרפיה',
    'פיזיותרפיה אשדוד',
    'טלפון פיזיותרפיסט',
    'כתובת קליניקה אשדוד',
  ],
  openGraph: {
    title: 'צור קשר - פיזיותרפיה.פלוס',
    description: 'צרו קשר עם מכון פיזיותרפיה.פלוס באשדוד',
    url: 'https://physio-plus.co.il/contact',
  },
  alternates: {
    canonical: 'https://physio-plus.co.il/contact',
  },
  other: {
    'geo.region': 'IL',
    'geo.placename': 'אשדוד',
    'geo.position': '31.8044;34.6553',
    'ICBM': '31.8044, 34.6553',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}










