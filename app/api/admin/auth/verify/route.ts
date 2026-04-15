import { NextRequest, NextResponse } from 'next/server'
import { verifyMagicLink, getSessionCookieName, getSessionDuration } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { code, email } = await request.json()

    if (!code || !email) {
      return NextResponse.json({ error: 'Missing code or email' }, { status: 400 })
    }

    const result = await verifyMagicLink(code, email)

    if (!result.success || !result.token) {
      return NextResponse.json({ error: result.error || 'Verification failed' }, { status: 401 })
    }

    const response = NextResponse.json({ message: 'Verified', redirect: '/admin' })
    response.cookies.set(getSessionCookieName(), result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: getSessionDuration(),
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
