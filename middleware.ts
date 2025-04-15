import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  // Admin route check
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin-dashboard")
  if (isAdminRoute && (!token || token.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/", req.url)) // Redirect to home if not admin
  }

  // Driver route check
  const isDriverRoute = req.nextUrl.pathname.startsWith("/driver-dashboard")
  if (isDriverRoute && (!token || token.role !== "DELIVERY_AGENT")) { // Updated role check
    return NextResponse.redirect(new URL("/", req.url)) // Redirect to home if not a delivery agent
  }

  return NextResponse.next()
}

// Define the routes this middleware should apply to
export const config = {
  matcher: [
    "/admin-dashboard/:path*",   // Match all routes starting with /admin-dashboard
    "/driver-dashboard/:path*"   // Match all routes starting with /driver-dashboard
  ]
}
