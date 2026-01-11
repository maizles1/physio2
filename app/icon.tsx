import { MetadataRoute } from 'next'

export default function icon(): MetadataRoute.Icons {
  return {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logo/clinic-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo/clinic-logo.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/logo/clinic-logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/logo/clinic-logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo/clinic-logo.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
