"use client"

import { Trash2Icon } from "lucide-react"
import { usePathname } from "next/navigation"
import toast from "react-hot-toast"

import { useActions } from "@/shared/lib/hooks"
import { getBuildId } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

const ResetConstructor = () => {
  const { resetConstructor } = useActions()

  const pathname = usePathname() || ""

  const id = getBuildId(pathname)

  const resetConctructorHandler = () => {
    resetConstructor(id)
    toast.success("Constructor cleared!")
  }

  return (
    <Button variant={"ghost"} onClick={resetConctructorHandler} className="flex gap-1 text-gray-500">
      <Trash2Icon />
      <span className="2xl:flex xl:flex lg:flex hidden">Reset Components</span>
    </Button>
  )
}

export { ResetConstructor }
