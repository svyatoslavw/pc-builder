"use client"

import { SaveIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import toast from "react-hot-toast"

import { createClient } from "@/shared/api/client"
import { useTypedSelector } from "@/shared/lib/hooks"
import type { IBuild, IUser } from "@/shared/lib/types"
import { getBuildId } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

const SaveSystem = ({ user }: { user: IUser }) => {
  const systems = useTypedSelector((state) => state.builds)
  const pathname = usePathname()

  if (!pathname) return null
  if (!user) return

  const id = getBuildId(pathname)
  const system = systems.find((item) => item.id === id)
  if (!system) return

  const isNotComplete = Object.values(system.components).some((component) => component === null)

  const createSystemHandler = async (system: IBuild, userId: string) => {
    const supabase = createClient()

    const { error } = await supabase.from("systems").insert({
      id: system.id,
      name: system.name,
      total: system.total,
      processor_id: system.components.processor?.id,
      motherboard_id: system.components.motherboard?.id,
      memory_id: system.components.memory?.id,
      graphics_card_id: system.components.graphics_card?.id,
      power_supply_id: system.components.power_supply?.id,
      hard_drive_id: system.components.hard_drive?.id,
      ssd_id: system.components.ssd?.id,
      case_id: system.components.case?.id,
      os_id: system.components.os?.id,
      user_id: userId
    })

    if (error?.code === "23505") {
      toast.error("System already exists!")
    } else if (error && error?.code !== "23505") {
      toast.error(error?.message)
    } else {
      toast.success("System created!")
    }
  }
  return (
    <Button disabled={isNotComplete} onClick={() => createSystemHandler(system, user.id)} variant={"outline"} className="gap-2 text-sm">
      <SaveIcon size={18} /> Save System
    </Button>
  )
}
export { SaveSystem }
