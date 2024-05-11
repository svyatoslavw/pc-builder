"use client"

import { Trash2Icon } from "lucide-react"
import { usePathname } from "next/navigation"
import toast from "react-hot-toast"

import { useActions } from "@/shared/lib/hooks"
import { getBuildId } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

const ResetConctructor = () => {
  const { resetConstructor } = useActions()

  const pathname = usePathname() || ""

  const id = getBuildId(pathname)

  const resetConctructorHandler = () => {
    resetConstructor(id)
    toast.success("Constructor cleared!")
  }

  return (
    <Button variant={"outline"} onClick={resetConctructorHandler} className="flex gap-1 text-gray-500">
      <Trash2Icon />
      Reset Components
    </Button>
  )
}

export { ResetConctructor }
