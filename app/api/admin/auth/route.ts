import { NextRequest, NextResponse } from 'next/server'
import { sendMagicLink, getSessionCookieName } from '@/lib/auth'

// POST - send magic link
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Pass the request origin so the magic link points back to this deployment
    const origin = request.headers.get('origin') || request.headers.get('referer')?.replace(/\/[^/]*$/, '') || undefined
    const result = await sendMagicLink(email.trim(), origin)

    if (!result.success) {
      // Don't reveal whether the email is in the allowlist
      return NextResponse.json(
        { message: 'If this email is authorized, a login link has been sent.' },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { message: 'If this email is authorized, a login link has been sent.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - logout
export async function DELETE() {
  const response = NextResponse.json({ message: 'Logged out' })
  response.cookies.delete(getSessionCookieName())
  return response
}
