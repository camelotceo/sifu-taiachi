import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createContactSubmission } from '@/lib/data/contacts'

// Initialize Resend with API key validation
const apiKey = process.env.RESEND_API_KEY
console.log('🔑 Resend API Key Status:', apiKey ? 'Present' : 'Missing')
console.log('🔑 API Key Length:', apiKey ? apiKey.length : 0)
console.log('🔑 API Key Prefix:', apiKey ? apiKey.substring(0, 10) + '...' : 'N/A')

if (!apiKey) {
  console.error('❌ RESEND_API_KEY environment variable is not set!')
}

// Initialize Resend client
let resend
try {
  resend = new Resend(apiKey)
  console.log('✅ Resend client initialized successfully')
} catch (error) {
  console.error('❌ Failed to initialize Resend client:', error)
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const requestId = Math.random().toString(36).substring(7)
  
  console.log(`\n📧 [${requestId}] Email API Request Started`)
  console.log(`📧 [${requestId}] Timestamp: ${new Date().toISOString()}`)
  console.log(`📧 [${requestId}] Request URL: ${request.url}`)
  console.log(`📧 [${requestId}] Request Method: ${request.method}`)

  // Check if Resend client is properly initialized
  if (!resend) {
    console.error(`❌ [${requestId}] Resend client not initialized`)
    return NextResponse.json(
      { 
        error: 'Email service not configured',
        details: 'Resend client failed to initialize. Check API key and server logs.',
        requestId 
      },
      { status: 500 }
    )
  }

  try {
    // Log request headers
    console.log(`📧 [${requestId}] Request Headers:`, {
      'content-type': request.headers.get('content-type'),
      'user-agent': request.headers.get('user-agent'),
      'origin': request.headers.get('origin'),
    })

    // Parse request body
    let requestBody
    try {
      requestBody = await request.json()
      console.log(`📧 [${requestId}] Request Body Parsed Successfully`)
      console.log(`📧 [${requestId}] Request Body Keys:`, Object.keys(requestBody))
    } catch (parseError) {
      console.error(`❌ [${requestId}] Failed to parse request body:`, parseError)
      return NextResponse.json(
        { 
          error: 'Invalid JSON in request body',
          details: parseError instanceof Error ? parseError.message : 'Unknown parsing error',
          requestId 
        },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = requestBody

    // Log form data (without sensitive info)
    console.log(`📧 [${requestId}] Form Data:`, {
      name: name ? `${name.substring(0, 3)}***` : 'Missing',
      email: email ? `${email.substring(0, 3)}***@${email.split('@')[1] || '***'}` : 'Missing',
      subject: subject ? `${subject.substring(0, 20)}${subject.length > 20 ? '...' : ''}` : 'Missing',
      messageLength: message ? message.length : 0,
    })

    // Validate required fields
    const validationErrors = []
    if (!name || name.trim() === '') validationErrors.push('Name is required')
    if (!email || email.trim() === '') validationErrors.push('Email is required')
    if (!subject || subject.trim() === '') validationErrors.push('Subject is required')
    if (!message || message.trim() === '') validationErrors.push('Message is required')

    if (validationErrors.length > 0) {
      console.error(`❌ [${requestId}] Validation Errors:`, validationErrors)
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationErrors,
          requestId 
        },
        { status: 400 }
      )
    }

    console.log(`✅ [${requestId}] Form validation passed`)

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.error(`❌ [${requestId}] Invalid email format:`, email)
      return NextResponse.json(
        { 
          error: 'Invalid email format',
          requestId 
        },
        { status: 400 }
      )
    }

    console.log(`✅ [${requestId}] Email format validation passed`)
    console.log(`📧 [${requestId}] Attempting to send email via Resend...`)

    // Prepare email data
    const emailData = {
      from: 'Tai Chi with Dr. Beauvais <noreply@taichiwithdrbeauvais.com>',
      to: ['info@taichiwithdrbeauvais.com'],
      cc: ['lfelican@icloud.com', 'drbeauvais1@yahoo.com'],
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>Note:</strong> This email was sent from the contact form on your website.
            </p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        ---
        This email was sent from the contact form on your website.
      `
    }

    console.log(`📧 [${requestId}] Email data prepared:`, {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      htmlLength: emailData.html.length,
      textLength: emailData.text.length,
    })

    // Send email using Resend
    const resendStartTime = Date.now()
    const { data, error } = await resend.emails.send(emailData)
    const resendEndTime = Date.now()

    console.log(`📧 [${requestId}] Resend API call completed in ${resendEndTime - resendStartTime}ms`)

    if (error) {
      console.error(`❌ [${requestId}] Resend API Error:`, {
        error,
        errorType: typeof error,
        errorMessage: error?.message,
        errorCode: error?.name,
        fullError: JSON.stringify(error, null, 2),
      })
      
      return NextResponse.json(
        { 
          error: 'Failed to send email via Resend',
          details: error?.message || 'Unknown Resend error',
          resendError: error,
          requestId 
        },
        { status: 500 }
      )
    }

    console.log(`✅ [${requestId}] Email sent successfully via Resend:`, {
      emailId: data?.id,
      data: data,
    })

    // Store submission in database
    try {
      await createContactSubmission({
        name, email, subject, message,
        resend_email_id: data?.id,
      })
      console.log(`✅ [${requestId}] Submission stored in database`)
    } catch (dbError) {
      console.error(`⚠️ [${requestId}] Failed to store submission in DB (email still sent):`, dbError)
    }

    // Send thank-you email to the submitter
    console.log(`📧 [${requestId}] Sending thank-you email to ${email}...`)
    const thankYouData = {
      from: 'Tai Chi with Dr. Beauvais <noreply@taichiwithdrbeauvais.com>',
      to: [email],
      subject: 'Thank You for Contacting Tai Chi with Dr. Beauvais',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            Thank You for Reaching Out!
          </h2>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="line-height: 1.6; color: #4b5563;">Dear ${name},</p>
            <p style="line-height: 1.6; color: #4b5563;">
              Thank you for contacting us! We have received your message and appreciate you reaching out.
            </p>
            <p style="line-height: 1.6; color: #4b5563;">
              Danielle will review your inquiry and get back to you as soon as possible.
            </p>
            <p style="line-height: 1.6; color: #4b5563;">
              In the meantime, feel free to explore our website for more information about our Tai Chi programs and wellness offerings.
            </p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #f3e8ff; border-radius: 8px; border-left: 4px solid #7c3aed;">
            <p style="margin: 0; color: #6b21a8; font-size: 14px;">
              Warm regards,<br>
              <strong>Tai Chi with Dr. Beauvais</strong>
            </p>
          </div>
        </div>
      `,
      text: `Dear ${name},\n\nThank you for contacting us! We have received your message and appreciate you reaching out.\n\nDanielle will review your inquiry and get back to you as soon as possible.\n\nIn the meantime, feel free to explore our website for more information about our Tai Chi programs and wellness offerings.\n\nWarm regards,\nTai Chi with Dr. Beauvais`
    }

    const { data: thankYouResult, error: thankYouError } = await resend.emails.send(thankYouData)

    if (thankYouError) {
      console.error(`❌ [${requestId}] Thank-you email failed:`, thankYouError)
    } else {
      console.log(`✅ [${requestId}] Thank-you email sent:`, thankYouResult?.id)
    }

    const totalTime = Date.now() - startTime
    console.log(`📧 [${requestId}] Total request time: ${totalTime}ms`)

    return NextResponse.json(
      {
        message: 'Email sent successfully',
        id: data?.id,
        thankYouId: thankYouResult?.id,
        requestId,
        processingTime: totalTime
      },
      { status: 200 }
    )

  } catch (error) {
    const totalTime = Date.now() - startTime
    console.error(`❌ [${requestId}] Unexpected error:`, {
      error,
      errorType: typeof error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined,
      totalTime,
    })

    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        requestId,
        processingTime: totalTime
      },
      { status: 500 }
    )
  }
}
