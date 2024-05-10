import { createServerClient } from "@/shared/api/server"
import { EnumCategory, type IBuild, type IProduct } from "@/shared/lib/types"

export const BuildService = {
  async getAll(searchParams: { [key: string]: string | string[] }) {
    const component = searchParams["component"] ?? EnumCategory.PROCESSOR
    const supabase = createServerClient()

    const { data: products, error } = await supabase.from(`${component}`).select("*").order("created_at", { ascending: false })

    if (error) {
      console.log(error.message)
    }

    return (products as IProduct[]) || []
  },
  async createSystem(system: IBuild, userId: string) {
    const supabase = createServerClient()

    const { error } = await supabase.from("systems").insert({
      id: system.id,
      name: system.name,
      total: system.total,
      processor_id: system.components.processor?.id,
      motherboard_id: system.components.motherboard?.id,
      memory_id: system.components.memory?.id,
      graphics_card_id: system.components.graphics_card?.id,
      case_id: system.components.case?.id,
      user_id: userId
    })

    if (error) {
      console.log(error.message)
    }

    return { error }
  }
}
