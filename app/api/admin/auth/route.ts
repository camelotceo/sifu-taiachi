import { type NextRequest, NextResponse } from "next/server"
import { validateCredentials, generateToken, validateToken, getAuthToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (validateCredentials(username, password)) {
      const user = { id: "1", username, role: "admin" as const }
      const token = generateToken(user)

      const response = NextResponse.json({
        success: true,
        user,
        message: "Login successful",
      })

      response.cookies.set("admin-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })

      return response
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" })
  response.cookies.set("admin-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  })
  return response
}

export async function GET(request: NextRequest) {
  const token = getAuthToken(request)

  if (token) {
    const user = validateToken(token)
    if (user) {
      return NextResponse.json({ user, authenticated: true })
    }
  }

  return NextResponse.json({ error: "Not authenticated", authenticated: false }, { status: 401 })
}
