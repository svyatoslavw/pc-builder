"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import * as z from "zod"

import { LoginSchema } from "@/entities/user/ui/forms/useLoginForm"
import { RegisterSchema } from "@/entities/user/ui/forms/useRegisterForm"
import { createServerClient } from "@/shared/api/server"

export async function login(data: z.infer<typeof LoginSchema>) {
  const supabase = createServerClient()

  const res = await supabase.auth.signInWithPassword({
    email: data.email as string,
    password: data.password as string
  })

  revalidatePath("/", "layout")
  return JSON.stringify(res)
}

export async function register(data: z.infer<typeof RegisterSchema>) {
  const supabase = createServerClient()

  const res = await supabase.auth.signUp({
    email: data.email,
    password: data.password
  })

  return JSON.stringify(res)
}

export async function loginWithOAuth(provider: "github" | "google") {
  const supabase = createServerClient()

  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/confirm`
    }
  })
}

export async function logout() {
  const supabase = createServerClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error(error)
  }

  revalidatePath("/auth")
  revalidatePath("/saved-systems")
  revalidatePath("/", "layout")
}

export async function revalidate() {
  revalidateTag("saved-systems")
}
