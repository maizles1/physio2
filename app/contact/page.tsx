'use client'

import { useState } from 'react'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { gtag } from '@/components/GoogleAnalytics'

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
  privacyConsent?: string
  _submit?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacyConsent: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      return 'כתובת אימייל היא שדה חובה'
    }
    if (!emailRegex.test(email)) {
      return 'כתובת אימייל לא תקינה'
    }
    return undefined
  }

  const validatePhone = (phone: string): string | undefined => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '')
    
    if (!phone) {
      return 'מספר טלפון הוא שדה חובה'
    }
    
    // Check if it's Israeli phone number (10 digits, can start with 0 or +972)
    if (cleanPhone.length === 10 && (cleanPhone.startsWith('0') || cleanPhone.startsWith('5'))) {
      return undefined
    }
    if (cleanPhone.length === 12 && cleanPhone.startsWith('972')) {
      return undefined
    }
    
    return 'מספר טלפון לא תקין. יש להזין מספר טלפון ישראלי (10 ספרות)'
  }

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'שם מלא הוא שדה חובה'
        }
        if (value.trim().length < 2) {
          return 'שם חייב להכיל לפחות 2 תווים'
        }
        return undefined

      case 'email':
        return validateEmail(value)

      case 'phone':
        return validatePhone(value)

      case 'subject':
        if (!value) {
          return 'נושא הוא שדה חובה'
        }
        return undefined

      case 'message':
        if (!value.trim()) {
          return 'הודעה היא שדה חובה'
        }
        if (value.trim().length < 10) {
          return 'הודעה חייבת להכיל לפחות 10 תווים'
        }
        if (value.length > 1000) {
          return 'הודעה לא יכולה להכיל יותר מ-1000 תווים'
        }
        return undefined

      default:
        return undefined
    }
  }

  const validatePrivacyConsent = (consent: boolean): string | undefined => {
    if (!consent) {
      return 'יש לאשר את הסכמתכם למדיניות הפרטיות'
    }
    return undefined
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setTouched({ ...touched, [name]: true })
    
    if (type === 'checkbox') {
      const error = validatePrivacyConsent(checked)
      setErrors({ ...errors, [name]: error })
    } else {
      const error = validateField(name, value)
      setErrors({ ...errors, [name]: error })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked })
      if (touched[name]) {
        const error = validatePrivacyConsent(checked)
        setErrors({ ...errors, [name]: error })
      }
    } else {
      setFormData({ ...formData, [name]: value })
      // Clear error if field is touched and valid
      if (touched[name]) {
        const error = validateField(name, value)
        setErrors({ ...errors, [name]: error })
      }
    }
    
    // Clear success message when user starts typing
    if (submitSuccess) {
      setSubmitSuccess(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {} as Record<string, boolean>)
    setTouched(allTouched)

    // Validate all fields
    const newErrors: FormErrors = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'privacyConsent') {
        const error = validatePrivacyConsent(value as boolean)
        if (error) {
          newErrors.privacyConsent = error
        }
      } else {
        const error = validateField(key, value as string)
        if (error) {
          newErrors[key as keyof FormErrors] = error
        }
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Submit form
    setIsSubmitting(true)
    
    try {
      // Get Web3Forms access key from environment variable or use default
      // In Next.js, NEXT_PUBLIC_* variables are available at build time
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '508775fc-382e-4616-97d8-c21fa7e907ea'
      
      if (!accessKey || accessKey === 'your_access_key_here') {
        throw new Error('שירות האימייל לא מוגדר. אנא פנה למנהל האתר.')
      }

      console.log('Preparing to send form to Web3Forms:', { 
        name: formData.name, 
        email: formData.email, 
        subject: formData.subject,
        hasAccessKey: !!accessKey
      })

      // Prepare form data for Web3Forms
      const formDataToSend = new FormData()
      formDataToSend.append('access_key', accessKey)
      formDataToSend.append('subject', `פנייה חדשה מהאתר - ${formData.subject}`)
      formDataToSend.append('from_name', formData.name)
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone || '')
      formDataToSend.append('message', formData.message)
      
      // Add honeypot field (Web3Forms requires it for spam protection)
      // This field should be empty - bots will fill it
      formDataToSend.append('botcheck', '')

      console.log('Sending request to Web3Forms API...')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formDataToSend,
      })
      
      console.log('Web3Forms response status:', response.status)
      console.log('Web3Forms response headers:', Object.fromEntries(response.headers.entries()))

      // Get response text first to see what we're dealing with
      const responseText = await response.text()
      console.log('Web3Forms response text:', responseText)

      if (!response.ok) {
        console.error('Web3Forms HTTP error:', {
          status: response.status,
          statusText: response.statusText,
          body: responseText
        })
        throw new Error(`שגיאה בשליחת ההודעה (${response.status}: ${response.statusText})`)
      }

      // Try to parse as JSON
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('Failed to parse Web3Forms response as JSON:', parseError)
        throw new Error('תגובה לא תקינה מהשרת. אנא נסה שוב מאוחר יותר.')
      }

      console.log('Web3Forms response data:', data)

      if (!data.success) {
        console.error('Web3Forms returned error:', data)
        throw new Error(data.message || 'שגיאה בשליחת ההודעה')
      }
      
      // Track form submission
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        try {
          window.gtag('event', 'form_submit', {
            form_name: 'contact_form',
          })
        } catch (error) {
          // Silently fail if gtag is not available
          if (process.env.NODE_ENV === 'development') {
            console.warn('Google Analytics tracking failed:', error)
          }
        }
      }
      
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', privacyConsent: false })
      setTouched({})
      setErrors({})
      
      // Scroll to success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      // Handle error
      const errorMessage = error instanceof Error ? error.message : 'שגיאה בשליחת ההודעה. אנא נסה שוב מאוחר יותר.'
      setErrors({ ...errors, _submit: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  const maxMessageLength = 1000
  const messageLength = formData.message.length

  return (
    <div className="bg-white">
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
          <Breadcrumbs items={[{ label: 'דף בית', href: '/' }, { label: 'צור קשר', href: '/contact' }]} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">צור קשר</h1>
          <p className="text-lg sm:text-xl text-white">אנחנו כאן כדי לעזור - צרו איתנו קשר בכל דרך שמתאימה לכם</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">שלחו לנו הודעה</h2>
              
              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg" role="alert" aria-live="polite">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-green-900">ההודעה נשלחה בהצלחה!</p>
                      <p className="text-sm text-green-700">נחזור אליך בהקדם האפשרי.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Error */}
              {errors._submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="assertive">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-red-900">{errors._submit}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    שם מלא *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${
                      errors.name && touched.name
                        ? 'border-red-500 focus:ring-red-500'
                        : touched.name && !errors.name
                        ? 'border-green-500'
                        : 'border-gray-300'
                    }`}
                    aria-label="שם מלא"
                    aria-required="true"
                    aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                    aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                  />
                  {touched.name && errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                  {touched.name && !errors.name && formData.name && (
                    <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      נראה טוב
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    אימייל *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${
                      errors.email && touched.email
                        ? 'border-red-500 focus:ring-red-500'
                        : touched.email && !errors.email
                        ? 'border-green-500'
                        : 'border-gray-300'
                    }`}
                    aria-label="כתובת אימייל"
                    aria-required="true"
                    aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                    aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                  />
                  {touched.email && errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                  {touched.email && !errors.email && formData.email && (
                    <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      נראה טוב
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    טלפון *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${
                      errors.phone && touched.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : touched.phone && !errors.phone
                        ? 'border-green-500'
                        : 'border-gray-300'
                    }`}
                    aria-label="מספר טלפון"
                    aria-required="true"
                    aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                    placeholder="050-123-4567"
                  />
                  {touched.phone && errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.phone}
                    </p>
                  )}
                  {touched.phone && !errors.phone && formData.phone && (
                    <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      נראה טוב
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    נושא *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${
                      errors.subject && touched.subject
                        ? 'border-red-500 focus:ring-red-500'
                        : touched.subject && !errors.subject
                        ? 'border-green-500'
                        : 'border-gray-300'
                    }`}
                    aria-label="נושא ההודעה"
                    aria-required="true"
                    aria-invalid={errors.subject && touched.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject && touched.subject ? 'subject-error' : undefined}
                  >
                    <option value="">בחר נושא</option>
                    <option value="question">שאלה כללית</option>
                    <option value="insurance">ביטוח</option>
                    <option value="info">מידע על שירותים</option>
                    <option value="other">אחר</option>
                  </select>
                  {touched.subject && errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      הודעה *
                    </label>
                    <span className={`text-xs ${messageLength > maxMessageLength ? 'text-red-600' : messageLength > maxMessageLength * 0.9 ? 'text-yellow-600' : 'text-gray-500'}`}>
                      {messageLength} / {maxMessageLength}
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y text-base ${
                      errors.message && touched.message
                        ? 'border-red-500 focus:ring-red-500'
                        : touched.message && !errors.message
                        ? 'border-green-500'
                        : 'border-gray-300'
                    }`}
                    aria-label="תוכן ההודעה"
                    aria-required="true"
                    aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                    aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                    maxLength={maxMessageLength}
                  />
                  {touched.message && errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.message}
                    </p>
                  )}
                  {touched.message && !errors.message && formData.message && (
                    <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      נראה טוב
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy-consent"
                      name="privacyConsent"
                      required
                      checked={formData.privacyConsent}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
                        errors.privacyConsent && touched.privacyConsent
                          ? 'border-red-500'
                          : ''
                      }`}
                      aria-label="הסכמה למדיניות פרטיות"
                      aria-required="true"
                      aria-invalid={errors.privacyConsent && touched.privacyConsent ? 'true' : 'false'}
                      aria-describedby={errors.privacyConsent && touched.privacyConsent ? 'privacy-consent-error' : undefined}
                    />
                    <label htmlFor="privacy-consent" className="text-sm text-gray-700 leading-relaxed">
                      אני מסכים/ה ל<Link href="/privacy" target="_blank" className="text-blue-600 hover:underline font-medium">מדיניות הפרטיות</Link> ולטיפול במידע האישי שלי *
                    </label>
                  </div>
                  {touched.privacyConsent && errors.privacyConsent && (
                    <p id="privacy-consent-error" className="mt-2 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.privacyConsent}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-h-[48px] text-base sm:text-lg"
                  aria-label="שלח הודעה"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      שולח...
                    </>
                  ) : (
                    'שלח הודעה'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">פרטי התקשרות</h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">כתובת</h3>
                  <p className="text-gray-700">יקינטון 3 אשדוד</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">טלפון</h3>
                    <p className="text-gray-700">
                      <a 
                        href="tel:0508838982" 
                        onClick={() => gtag.clickToCall('050-883-8982')}
                        className="hover:text-blue-600" 
                        aria-label="התקשר: 050-883-8982"
                      >
                        050-883-8982
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">אימייל</h3>
                  <p className="text-gray-700">
                    <a href="/contact" className="hover:text-blue-600">
                      דרך טופס יצירת קשר
                    </a>
                  </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">שעות פעילות</h3>
                    <p className="text-gray-700">
                      ראשון-חמישי: 08:00-20:00<br />
                      שישי: 08:00-14:00<br />
                      שבת: סגור
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-6 sm:mt-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">איך להגיע</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=יקינטון+3+אשדוד"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm sm:text-base min-h-[48px]"
                    aria-label="פתח ניווט ב-Google Maps"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="whitespace-nowrap">פתח ב-Google Maps</span>
                  </a>
                  <a
                    href="https://waze.com/ul?q=יקינטון 3 אשדוד"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#33CCFF] hover:bg-[#2BB5E6] text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm sm:text-base min-h-[48px]"
                    aria-label="פתח ניווט ב-Waze"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6 0 5.302-4.298 9.6-9.6 9.6-5.302 0-9.6-4.298-9.6-9.6 0-5.302 4.298-9.6 9.6-9.6zm0 1.92c-4.234 0-7.68 3.446-7.68 7.68 0 4.234 3.446 7.68 7.68 7.68 4.234 0 7.68-3.446 7.68-7.68 0-4.234-3.446-7.68-7.68-7.68zm-.96 2.88v1.44h1.92v7.68h-1.92v1.44h5.76v-1.44h-1.92V8.64h1.92V7.2H11.04z"/>
                    </svg>
                    <span className="whitespace-nowrap">נווט ב-Waze</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
