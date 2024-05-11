"use client"

import { FilePlus2Icon } from "lucide-react"
import toast from "react-hot-toast"

import { useActions } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"

const CreateBuild = () => {
  const { createBuild } = useActions()

  const createBuildHandler = () => {
    createBuild()
    toast.success("System created!")
  }

  return (
    <Button variant={"outline"} className="gap-2 text-sm" onClick={createBuildHandler}>
      <FilePlus2Icon size={18} /> Create System
    </Button>
  )
}

export { CreateBuild }
