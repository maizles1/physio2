import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY

// Initialize Resend only if API key exists
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: NextRequest) {
  try {
    // Check if Resend API key is configured
    if (!resendApiKey || !resend) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'שירות האימייל לא מוגדר. אנא פנה למנהל האתר.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'כל השדות נדרשים' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'כתובת אימייל לא תקינה' },
        { status: 400 }
      )
    }

    console.log('Attempting to send email:', { name, email, phone, subject })

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // צריך להחליף לדומיין מאומת ב-Resend
      to: ['maizles1@gmail.com'],
      subject: `הודעה חדשה מטופס יצירת קשר: ${subject}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2080C0; border-bottom: 2px solid #2080C0; padding-bottom: 10px;">
            הודעה חדשה מטופס יצירת קשר
          </h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>שם:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 10px 0;"><strong>אימייל:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p style="margin: 10px 0;"><strong>טלפון:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>
            <p style="margin: 10px 0;"><strong>נושא:</strong> ${escapeHtml(subject)}</p>
            <div style="margin-top: 20px;">
              <p style="margin-bottom: 10px;"><strong>הודעה:</strong></p>
              <div style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd;">
                ${escapeHtml(message)}
              </div>
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">
            הודעה זו נשלחה מטופס יצירת קשר באתר פיזיותרפיה.פלוס<br/>
            ניתן להגיב ישירות לאימייל זה כדי ליצור קשר עם השולח
          </p>
        </div>
      `,
      replyTo: email,
    })

    if (error) {
      console.error('Resend error details:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { 
          error: 'שגיאה בשליחת ההודעה. אנא נסה שוב מאוחר יותר.',
          details: process.env.NODE_ENV === 'development' ? error : undefined
        },
        { status: 500 }
      )
    }

    console.log('Email sent successfully:', data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Contact form error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        error: 'שגיאה בשליחת ההודעה. אנא נסה שוב מאוחר יותר.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
