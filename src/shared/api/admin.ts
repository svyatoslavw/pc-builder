"use server"

import { createClient } from "@supabase/supabase-js"

export async function supabaseAdmin() {
  const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PRIVATE_SUPABASE_ADMIN!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
  return supabase
}
