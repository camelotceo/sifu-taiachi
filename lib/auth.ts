import type { NextRequest } from "next/server"

export interface AdminUser {
  id: string
  username: string
  role: "admin"
}

// Simple password-based authentication (in production, use proper auth)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "taichi2024!", // Change this in production
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function generateToken(user: AdminUser): string {
  // Simple token generation - in production, use proper JWT with secret
  const payload = {
    ...user,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  }
  return Buffer.from(JSON.stringify(payload)).toString("base64")
}

export function validateToken(token: string): AdminUser | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8")
    const payload = JSON.parse(decoded)

    // Check if token is expired
    if (payload.exp && Date.now() > payload.exp) {
      return null
    }

    if (payload.username === ADMIN_CREDENTIALS.username && payload.role === "admin") {
      return {
        id: payload.id,
        username: payload.username,
        role: payload.role,
      }
    }
    return null
  } catch (error) {
    console.error("Token validation error:", error)
    return null
  }
}

export function getAuthToken(request: NextRequest): string | null {
  return request.cookies.get("admin-token")?.value || null
}
