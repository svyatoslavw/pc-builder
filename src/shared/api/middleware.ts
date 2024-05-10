import { type CookieOptions, createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

import { logout } from "@/app/auth/actions"

export async function updateSession(request: NextRequest) {
  const PROTECTED_PATHS = ["/settings", "/orders", "/favorite"]

  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options
        })
        response = NextResponse.next({
          request: {
            headers: request.headers
          }
        })
        response.cookies.set({
          name,
          value,
          ...options
        })
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: "",
          ...options
        })
        response = NextResponse.next({
          request: {
            headers: request.headers
          }
        })
        response.cookies.set({
          name,
          value: "",
          ...options
        })
      }
    }
  })

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  const { data } = await supabase.from("users").select("*").eq("id", user?.id).single()
  if (error?.name === "ConnectTimeoutError") {
    logout()
  }

  const url = new URL(request.url)
  const isAdminPage = request.url.includes("/admin")

  if (user) {
    if (url.pathname === "/auth") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    if (data.role !== "admin") {
      if (isAdminPage) {
        return NextResponse.redirect(new URL("/not-found", request.url))
      }
    }

    return response
  } else {
    if (PROTECTED_PATHS.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/auth", request.url))
    }
    return response
  }
}
