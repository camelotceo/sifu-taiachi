import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-in-production')
const SESSION_COOKIE = 'admin_session'

// Paths that don't require auth
const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/verify']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin/* and /api/admin/* routes
  const isAdminPage = pathname.startsWith('/admin')
  const isAdminApi = pathname.startsWith('/api/admin')

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next()
  }

  // Allow public admin paths (login, verify)
  if (PUBLIC_ADMIN_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Allow auth API routes
  if (pathname.startsWith('/api/admin/auth')) {
    return NextResponse.next()
  }

  // Check for session token
  const token = request.cookies.get(SESSION_COOKIE)?.value

  if (!token) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Validate JWT
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const email = payload.email as string

    // Verify email is in allowlist
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
    if (!adminEmails.includes(email.toLowerCase())) {
      if (isAdminApi) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Add user email to request headers for downstream use
    const response = NextResponse.next()
    response.headers.set('x-admin-email', email)
    return response
  } catch {
    // Invalid token - clear cookie and redirect
    if (isAdminApi) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    response.cookies.delete(SESSION_COOKIE)
    return response
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
