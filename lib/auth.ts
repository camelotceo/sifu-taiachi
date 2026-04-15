import { sql } from '@vercel/postgres'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { Resend } from 'resend'
import crypto from 'crypto'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-in-production')
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
const SESSION_COOKIE = 'admin_session'
const SESSION_DURATION = 7 * 24 * 60 * 60 // 7 days in seconds

export function isAllowedEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase().trim())
}

export async function sendMagicLink(email: string, requestOrigin?: string): Promise<{ success: boolean; error?: string }> {
  if (!isAllowedEmail(email)) {
    return { success: false, error: 'Email not authorized' }
  }

  const code = crypto.randomBytes(32).toString('hex')
  const codeHash = crypto.createHash('sha256').update(code).digest('hex')
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

  // Invalidate any existing unused magic links for this email
  await sql`
    UPDATE magic_links SET used = true WHERE email = ${email.toLowerCase()} AND used = false
  `

  await sql`
    INSERT INTO magic_links (email, code_hash, expires_at)
    VALUES (${email.toLowerCase()}, ${codeHash}, ${expiresAt.toISOString()})
  `

  // Use the request origin so the link always points back to the same deployment
  const baseUrl = requestOrigin || (process.env.VERCEL_BRANCH_URL
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000')
  const verifyUrl = `${baseUrl}/admin/verify?code=${code}&email=${encodeURIComponent(email.toLowerCase())}`

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: 'Tai Chi with Dr. Beauvais <noreply@taichiwithdrbeauvais.com>',
    to: [email],
    subject: 'Your Admin Login Link',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7c3aed; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
          Admin Dashboard Login
        </h2>
        <p style="line-height: 1.6; color: #4b5563;">
          Click the button below to sign in to your admin dashboard. This link expires in 15 minutes.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyUrl}" style="background: linear-gradient(to right, #7c3aed, #ec4899); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
            Sign In to Dashboard
          </a>
        </div>
        <p style="color: #9ca3af; font-size: 13px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  })

  if (error) {
    console.error('Failed to send magic link email:', error)
    return { success: false, error: 'Failed to send email' }
  }

  return { success: true }
}

export async function verifyMagicLink(code: string, email: string): Promise<{ success: boolean; token?: string; error?: string }> {
  const codeHash = crypto.createHash('sha256').update(code).digest('hex')

  const result = await sql`
    SELECT * FROM magic_links
    WHERE email = ${email.toLowerCase()}
      AND code_hash = ${codeHash}
      AND used = false
      AND expires_at > NOW()
    ORDER BY created_at DESC
    LIMIT 1
  `

  if (result.rows.length === 0) {
    return { success: false, error: 'Invalid or expired link' }
  }

  // Mark as used
  await sql`UPDATE magic_links SET used = true WHERE id = ${result.rows[0].id}`

  // Create JWT
  const token = await createSessionToken(email)
  return { success: true, token }
}

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email: email.toLowerCase(), role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(JWT_SECRET)
}

export async function validateSession(token: string): Promise<{ valid: boolean; email?: string }> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const email = payload.email as string
    if (!isAllowedEmail(email)) {
      return { valid: false }
    }
    return { valid: true, email }
  } catch {
    return { valid: false }
  }
}

export async function getSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  const result = await validateSession(token)
  if (!result.valid || !result.email) return null

  return { email: result.email }
}

export function getSessionCookieName() {
  return SESSION_COOKIE
}

export function getSessionDuration() {
  return SESSION_DURATION
}
