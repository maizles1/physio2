import { MetadataRoute } from 'next'

export default function appleIcon(): MetadataRoute.AppleIcon {
  return {
    url: '/images/logo/clinic-logo.png',
    sizes: '180x180',
    type: 'image/png',
  }
}
