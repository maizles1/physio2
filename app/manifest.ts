import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'פיזיותרפיה.פלוס - מכון פיזיותרפיה פרטי באשדוד',
    short_name: 'פיזיותרפיה.פלוס',
    description: 'מכון פיזיותרפיה פרטי באשדוד - טיפול מקצועי בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים ושיקום וסטיבולרי',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2080C0',
    icons: [
      {
        src: '/images/logo/clinic-logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/images/logo/clinic-logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}










