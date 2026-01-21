import { NextResponse } from 'next/server'
import { sanitizeError } from '@/lib/security'

export const dynamic = 'force-dynamic'

const isDevelopment = process.env.NODE_ENV === 'development'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  message?: string
  subject?: string
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()
    const { name, email, phone, message, subject } = body as ContactFormData

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'שם ואימייל הם שדות חובה' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'כתובת אימייל לא תקינה' },
        { status: 400 }
      )
    }

    // Get Web3Forms access key from environment variable
    // Try WEB3FORMS_ACCESS_KEY first (new), then fallback to NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY (old) for backward compatibility
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

    if (!accessKey || accessKey === 'your_access_key_here' || accessKey.trim() === '') {
      const errorMessage = isDevelopment
        ? 'Web3Forms access key לא מוגדר. אנא הגדר את WEB3FORMS_ACCESS_KEY (או NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) ב-environment variables.'
        : 'שירות האימייל לא מוגדר. אנא פנה למנהל האתר.'

      if (isDevelopment) {
        console.error('Web3Forms access key missing:', {
          hasWEB3FORMS_ACCESS_KEY: !!process.env.WEB3FORMS_ACCESS_KEY,
          hasNEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: !!process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          accessKeyValue: accessKey ? '***' : 'undefined',
        })
      }

      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: 500 }
      )
    }

    // Prepare form data for Web3Forms
    const formDataToSend = new FormData()
    formDataToSend.append('access_key', accessKey)
    formDataToSend.append('subject', subject || 'פנייה חדשה מהאתר')
    formDataToSend.append('from_name', name)
    formDataToSend.append('name', name)
    formDataToSend.append('email', email)
    formDataToSend.append('phone', phone || '')
    formDataToSend.append('message', message || '')
    
    // Add honeypot field (Web3Forms requires it for spam protection)
    // This field should be empty - bots will fill it
    formDataToSend.append('botcheck', '')

    if (isDevelopment) {
      console.log('Sending request to Web3Forms API...', {
        name,
        email,
        hasPhone: !!phone,
        hasMessage: !!message,
      })
    }

    // Call Web3Forms API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formDataToSend,
    })

    if (isDevelopment) {
      console.log('Web3Forms response status:', response.status)
    }

    // Get response text first to see what we're dealing with
    const responseText = await response.text()

    if (!response.ok) {
      if (isDevelopment) {
        console.error('Web3Forms HTTP error:', {
          status: response.status,
          statusText: response.statusText,
          body: responseText,
        })
      }
      
      return NextResponse.json(
        {
          success: false,
          message: `שגיאה בשליחת ההודעה (${response.status}: ${response.statusText})`,
        },
        { status: response.status }
      )
    }

    // Try to parse as JSON
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      if (isDevelopment) {
        console.error('Failed to parse Web3Forms response as JSON:', parseError)
      }
      
      return NextResponse.json(
        { success: false, message: 'תגובה לא תקינה מהשרת. אנא נסה שוב מאוחר יותר.' },
        { status: 500 }
      )
    }

    if (isDevelopment) {
      console.log('Web3Forms response data:', data)
    }

    if (!data.success) {
      if (isDevelopment) {
        console.error('Web3Forms returned error:', data)
      }
      
      return NextResponse.json(
        {
          success: false,
          message: data.message || 'שגיאה בשליחת ההודעה',
        },
        { status: 400 }
      )
    }

    // Success
    return NextResponse.json({
      success: true,
      message: 'ההודעה נשלחה בהצלחה',
    })
  } catch (error) {
    // Log full error details server-side
    console.error('Error in contact API route:', error)
    
    // Return sanitized error message to client
    const errorMessage = sanitizeError(error, isDevelopment)
    
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    )
  }
}
