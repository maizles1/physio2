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
    const rawAccessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    const accessKey = rawAccessKey ? rawAccessKey.trim() : ''

    // Log environment variable status for debugging
    if (isDevelopment) {
      console.log('Environment variables check:', {
        hasWEB3FORMS_ACCESS_KEY: !!process.env.WEB3FORMS_ACCESS_KEY,
        hasNEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: !!process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
        accessKeyLength: accessKey ? accessKey.length : 0,
        accessKeyPreview: accessKey ? `${accessKey.substring(0, 8)}...` : 'undefined',
        accessKeyValue: accessKey || 'MISSING',
      })
    }

    if (!accessKey || accessKey === 'your_access_key_here' || accessKey === '') {
      const errorMessage = isDevelopment
        ? `Web3Forms access key לא מוגדר. WEB3FORMS_ACCESS_KEY=${!!process.env.WEB3FORMS_ACCESS_KEY}, NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=${!!process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}`
        : 'שירות האימייל לא מוגדר. אנא פנה למנהל האתר.'

      if (isDevelopment) {
        console.error('Web3Forms access key missing:', {
          hasWEB3FORMS_ACCESS_KEY: !!process.env.WEB3FORMS_ACCESS_KEY,
          hasNEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: !!process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          accessKeyLength: accessKey ? accessKey.length : 0,
          accessKeyPreview: accessKey ? `${accessKey.substring(0, 8)}...` : 'undefined',
          allEnvKeys: Object.keys(process.env).filter(key => key.includes('WEB3') || key.includes('FORM')),
        })
      }

      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: 500 }
      )
    }

    // Prepare JSON payload for Web3Forms API
    // Note: Web3Forms expects 'access_key' as the field name (not 'accessKey' or 'api_key')
    // All fields must be strings
    const payload: Record<string, string> = {
      access_key: accessKey.trim(), // This is the REQUIRED field - must be exactly 'access_key'
      name: name.trim(),
      email: email.trim(),
      subject: subject || 'פנייה חדשה מהאתר',
      message: (message || '').trim(),
      botcheck: '', // Honeypot field (Web3Forms requires it for spam protection) - must be empty string
    }
    
    // Add optional fields only if they have values
    if (phone && phone.trim()) {
      payload.phone = phone.trim()
    }
    
    // Verify access_key is present before sending
    if (!payload.access_key || payload.access_key === '') {
      if (isDevelopment) {
        console.error('CRITICAL: access_key is missing from payload!', {
          accessKey,
          payloadKeys: Object.keys(payload),
        })
      }
      return NextResponse.json(
        { success: false, message: 'שגיאה פנימית: access key חסר' },
        { status: 500 }
      )
    }

    // Log payload details before sending (for debugging)
    if (isDevelopment) {
      console.log('=== Web3Forms API Request ===', {
        name,
        email,
        hasPhone: !!phone,
        hasMessage: !!message,
        accessKeyLength: accessKey.length,
        accessKeyPreview: `${accessKey.substring(0, 8)}...`,
        accessKeyFull: accessKey, // Show full key in development for debugging
        payloadKeys: Object.keys(payload),
        payloadHasAccessKey: 'access_key' in payload,
        accessKeyInPayload: payload.access_key ? `${payload.access_key.substring(0, 8)}...` : 'missing',
        payloadJSON: JSON.stringify(payload),
      })
    }

    // Call Web3Forms API with JSON format
    const requestBody = JSON.stringify(payload)
    
    if (isDevelopment) {
      console.log('Request body length:', requestBody.length)
      console.log('Request body (first 200 chars):', requestBody.substring(0, 200))
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: requestBody,
    })
    
    if (isDevelopment) {
      console.log('Web3Forms API response status:', response.status, response.statusText)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))
    }

    // Get response as text first, then parse as JSON
    const responseText = await response.text()
    let data
    
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      // If JSON parsing fails, return error with text response
      if (isDevelopment) {
        console.error('Failed to parse Web3Forms response as JSON:', {
          error: parseError,
          status: response.status,
          statusText: response.statusText,
          body: responseText,
        })
      }
      
      return NextResponse.json(
        { 
          success: false, 
          message: `תגובה לא תקינה מהשרת: ${responseText || 'אנא נסה שוב מאוחר יותר.'}` 
        },
        { status: 500 }
      )
    }

    if (isDevelopment) {
      console.log('=== Web3Forms API Response ===', {
        status: response.status,
        success: data.success,
        message: data.message,
        hasError: !data.success,
        fullResponse: data,
        responseText: responseText.substring(0, 500), // First 500 chars
      })
    }
    
    // Log the full response in development for debugging
    if (isDevelopment && !data.success) {
      console.error('=== Web3Forms ERROR Details ===', {
        responseText: responseText,
        parsedData: data,
        status: response.status,
        statusText: response.statusText,
        payloadSent: {
          ...payload,
          access_key: '***HIDDEN***',
        },
      })
    }

    // Check if request was successful
    if (!response.ok) {
      if (isDevelopment) {
        console.error('Web3Forms HTTP error:', {
          status: response.status,
          statusText: response.statusText,
          data: data,
        })
      }
      
      // Return the error message from Web3Forms if available, otherwise generic message
      const errorMessage = data.message || `שגיאה בשליחת ההודעה (${response.status}: ${response.statusText})`
      
      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
        },
        { status: response.status }
      )
    }

    // Check if Web3Forms returned an error in the response body
    if (!data.success) {
      if (isDevelopment) {
        console.error('Web3Forms returned error:', {
          success: data.success,
          message: data.message,
          data: data,
        })
      }
      
      // Return the specific error message from Web3Forms
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
