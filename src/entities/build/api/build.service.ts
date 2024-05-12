import { createClient } from "@/shared/api/client"
import { createServerClient } from "@/shared/api/server"
import { EnumCategory, type IBuild, IComponent, type IProduct, type ISystem } from "@/shared/lib/types"

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
  async getAllSystems() {
    const supabase = createClient()

    const { data: systems, error } = await supabase.from("systems").select("*").order("created_at", { ascending: false })

    if (error) {
      console.log(error.message)
    }

    return (systems as IBuild[]) || []
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
      hard_drive_id: system.components.hard_drive?.id,
      power_supply_id: system.components.power_supply?.id,
      case_id: system.components.case?.id,
      ssd_id: system.components.ssd?.id,
      os_id: system.components.os?.id,
      user_id: userId
    })

    if (error) {
      console.log(error.message)
    }

    return { error }
  },
  async updateSystemVibibility(system: IBuild, userId: string) {
    const supabase = createServerClient()

    const { error } = await supabase
      .from("systems")
      .update({
        is_public: true
      })
      .eq("id", system.id)
      .eq("user_id", userId)

    if (error) {
      console.log(error.message)
    }

    return { error }
  },
  async getComponentById(table: string, id: string) {
    const supabase = createServerClient()

    const { data: component, error } = await supabase.from(table).select("*").eq("id", id).single()

    if (error) {
      console.log(error.message)
      return null
    }

    return component
  },
  async getSystemsByUserId(userId: string) {
    const supabase = createServerClient()

    const { data: systems, error } = await supabase.from("systems").select("*").eq("user_id", userId)

    if (error) {
      console.log(error.message)
      return []
    }

    const data: IBuild[] = await Promise.all(
      systems.map(async (system: ISystem) => {
        const components: IComponent = {
          processor: await this.getComponentById("processor", system.processor_id),
          motherboard: await this.getComponentById("motherboard", system.motherboard_id),
          memory: await this.getComponentById("memory", system.memory_id),
          graphics_card: await this.getComponentById("graphics_card", system.graphics_card_id),
          power_supply: await this.getComponentById("power_supply", system.power_supply_id),
          hard_drive: await this.getComponentById("hard_drive", system.hard_drive_id),
          ssd: await this.getComponentById("ssd", system.ssd_id),
          case: await this.getComponentById("case", system.case_id),
          os: await this.getComponentById("os", system.os_id)
        }

        return {
          id: system.id,
          name: system.name,
          components,
          total: system.total,
          success: system.success
        }
      })
    )

    return data
  },
  async getSystemById(id: string) {
    const supabase = createServerClient()

    const { data: system, error } = await supabase.from("systems").select("*").eq("id", id).single()

    if (error) {
      console.log(error.message)
      return null
    }

    const components: IComponent = {
      processor: await this.getComponentById("processor", system.processor_id),
      motherboard: await this.getComponentById("motherboard", system.motherboard_id),
      memory: await this.getComponentById("memory", system.memory_id),
      graphics_card: await this.getComponentById("graphics_card", system.graphics_card_id),
      hard_drive: await this.getComponentById("hard_drive", system.hard_drive_id),
      ssd: await this.getComponentById("ssd", system.ssd_id),
      power_supply: await this.getComponentById("power_supply", system.power_supply_id),
      os: await this.getComponentById("os", system.os_id),
      case: await this.getComponentById("case", system.case_id)
    }

    const data: IBuild = {
      id: system.id,
      name: system.name,
      components,
      total: system.total,
      success: system.success
    }

    return data
  }
}
