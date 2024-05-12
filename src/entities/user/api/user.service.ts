import { createServerClient } from "@/shared/api/server"
import type { IUser } from "@/shared/lib/types"

const initUser: IUser = {
  id: "",
  created_at: "",
  email: "",
  role: ""
}

export const UserService = {
  async getProfile() {
    const supabase = createServerClient()
    const { data } = await supabase.auth.getUser()

    if (data.user) {
      const { data: user, error } = await supabase.from("users").select("*").eq("id", data.user.id).single()

      if (!error) return user as IUser
    }
    return initUser as IUser
  }
}
