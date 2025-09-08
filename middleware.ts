import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { validateToken } from "./lib/auth"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add pathname to headers for layout detection
  response.headers.set("x-pathname", request.nextUrl.pathname)

  // Admin route protection
  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login") {
    const token = request.cookies.get("admin-token")?.value

    if (!token || !validateToken(token)) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
