'use client'

import Link from 'next/link'
import { useState } from 'react'
import ClinicLogo from './ClinicLogo'
import { gtag } from './GoogleAnalytics'
import { seoConfig } from '@/config/seo.config'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const phoneNumber = '0508838982'
  const whatsappNumber = '972508838982'
  const whatsappMessage = encodeURIComponent('שלום, אני מעוניין/ת לקבוע תור')
  const address = 'יקינטון 3 אשדוד'

  const navigation = [
    { name: 'דף בית', href: '/' },
    { 
      name: 'אודות',
      href: '/about',
    },
    {
      name: 'שירותים',
      href: '/services',
      dropdown: [
        { name: 'טיפול בכאבי גב', href: '/services#back-pain' },
        { name: 'טיפול בכאבי כתף', href: '/services#shoulder-pain' },
        { name: 'טיפול בכאבי צוואר', href: '/services#neck-pain' },
        { name: 'טיפול בכאבי ברך', href: '/services#knee-pain' },
        { name: 'שיקום לאחר ניתוחים', href: '/services#post-surgery' },
        { name: 'שיקום וסטיבולרי - טיפול בסחרחורות', href: '/services#vestibular' },
        { name: 'טיפול במפרק הלסת (TMJ)', href: '/services#tmj' },
        { name: 'ליווי קבוצות ספורט וספורטאים', href: '/services#sports-teams' },
      ]
    },
    { name: 'בלוג', href: '/blog' },
    { name: 'המלצות', href: '/testimonials' },
    { name: 'שאלות נפוצות', href: '/faq' },
    { name: 'צור קשר', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      {/* Top Bar - Contact Info */}
      <div className="hidden md:block text-white py-2.5 bg-primary-gradient">
        <div className="container">
          <div className="flex flex-row justify-between items-center text-sm flex-wrap gap-2">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <a 
                href={`tel:${phoneNumber}`} 
                onClick={() => {
                  try {
                    gtag.clickToCall(phoneNumber)
                  } catch (error) {
                    // Silently fail if gtag is not available
                    if (process.env.NODE_ENV === 'development') {
                      console.warn('Google Analytics tracking failed:', error)
                    }
                  }
                }}
                className="flex items-center gap-2 hover:opacity-90 transition-opacity min-h-[32px]" 
                aria-label={`התקשר אלינו: ${phoneNumber}`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium whitespace-nowrap">{phoneNumber}</span>
              </a>
              <span className="text-blue-200 hidden lg:inline">|</span>
              <span className="text-white hidden lg:inline">{address}</span>
            </div>
            {(seoConfig.social?.facebook || seoConfig.social?.instagram) && (
              <div className="flex items-center justify-center gap-2 flex-1">
                {seoConfig.social?.facebook && (
                  <a 
                    href={seoConfig.social.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="פייסבוק - בקר בדף שלנו בפייסבוק"
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity bg-white/30 hover:bg-white/40 border border-white/40" 
                    title="פייסבוק"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                {seoConfig.social?.instagram && (
                  <a 
                    href={seoConfig.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="אינסטגרם - בקר בפרופיל שלנו באינסטגרם"
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity bg-white/30 hover:bg-white/40 border border-white/40" 
                    title="אינסטגרם"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs sm:text-sm whitespace-nowrap">ראשון-חמישי: 08:00-20:00 | שישי: 08:00-14:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2.5 sm:py-3 md:py-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 hover:opacity-90 transition-opacity" aria-label="פיזיותרפיה.פלוס - דף בית">
            <ClinicLogo />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold leading-tight text-primary-dark">פיזיותרפיה.פלוס</h1>
              <p className="text-xs md:text-sm leading-tight text-primary">מקצוענות שמרגישים בגוף</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#2080C0] transition-colors rounded-lg hover:bg-blue-50"
                  aria-label={item.dropdown ? `${item.name} - תפריט עם אפשרויות נוספות` : item.name}
                  aria-expanded={item.dropdown ? activeDropdown === item.name : undefined}
                  aria-haspopup={item.dropdown ? 'true' : undefined}
                >
                  {item.name}
                </Link>
                {item.dropdown && activeDropdown === item.name && (
                  <div 
                    className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
                    role="menu"
                    aria-label={`תפריט משנה של ${item.name}`}
                  >
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#2080C0] transition-colors"
                        role="menuitem"
                        aria-label={`${subItem.name} - ${item.name}`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm"
              aria-label="שלח הודעת WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`tel:${phoneNumber}`}
              onClick={() => {
                try {
                  gtag.clickToCall(phoneNumber)
                } catch (error) {
                  // Silently fail if gtag is not available
                  if (process.env.NODE_ENV === 'development') {
                    console.warn('Google Analytics tracking failed:', error)
                  }
                }
              }}
              className="btn btn-primary text-sm"
              aria-label={`התקשר אלינו: ${phoneNumber}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden sm:inline">התקשר</span>
            </a>
          </div>

          {/* Mobile Action Buttons & Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${phoneNumber}`}
              onClick={() => {
                try {
                  gtag.clickToCall(phoneNumber)
                } catch (error) {
                  // Silently fail if gtag is not available
                  if (process.env.NODE_ENV === 'development') {
                    console.warn('Google Analytics tracking failed:', error)
                  }
                }
              }}
              className="p-2 bg-[#2080C0] text-white rounded-lg shadow-md hover:bg-[#004080] transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="התקשר"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#2080C0] hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="תפריט"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 animate-in slide-in-from-top">
            <div className="pt-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setActiveDropdown(null)
                    }}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-[#2080C0] rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="mr-4 mt-1 mb-2 space-y-1 border-r-2 border-blue-100">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => {
                            setMobileMenuOpen(false)
                            setActiveDropdown(null)
                          }}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#2080C0] rounded-lg transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Contact Info */}
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                <div className="px-4 py-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>ראשון-חמישי: 08:00-20:00 | שישי: 08:00-14:00</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 px-4">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    aria-label="שלח הודעת WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
