"use client"

import React from "react"

import { createClient } from "@/shared/api/client"

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
  text: string
  provider: "google" | "github"
}

// eslint-disable-next-line react/display-name
const OAuthButton = React.forwardRef<HTMLButtonElement, AuthButtonProps>(({ children, text, provider }, ref) => {
  const loginWithOAuth = () => {
    const supabase = createClient()

    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/confirm`
      }
    })
  }

  return (
    <button
      type="button"
      onClick={loginWithOAuth}
      ref={ref}
      className="flex w-full items-center justify-center gap-3 rounded-lg border bg-background hover:border-primary px-3 py-2 font-medium text-foreground transition-colors dark:bg-background dark:text-foreground"
    >
      {children}
      <span className="capitalize">{text}</span>
    </button>
  )
})

export { OAuthButton }
