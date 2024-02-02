import { NextResponse, type NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ダイナミックルートのパスが一致するか確認するための正規表現
  const editPathRegex = /^\/spots\/.+\/edit$/

  console.log(req.nextUrl.pathname, "req.nextUrl.pathname")
  // ユーザーがサインインしていて、現在のパスが/loginの場合、ユーザーを/accountにリダイレクトする。
  if (user && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/account", req.url))
  }

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
