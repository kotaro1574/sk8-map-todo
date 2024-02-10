import { NextResponse, type NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    if (req.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/account", req.url))
    }
  }

  const editPathRegex = /^\/spots\/.+\/edit$/

  if (!user) {
    if (
      req.nextUrl.pathname.match(editPathRegex) ||
      req.nextUrl.pathname === "/spots/create" ||
      req.nextUrl.pathname === "/account"
    ) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
  return res
}

export const config = {
  matcher: ["/", "/account", "/login", "/spots/create", "/spots/:path*/edit"],
}
