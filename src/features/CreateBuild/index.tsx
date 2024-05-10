"use client"

import { FilePlus2Icon } from "lucide-react"

import { useActions } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"

const CreateBuild = () => {
  const { createBuild } = useActions()

  return (
    <Button variant={"outline"} className="gap-2 text-sm" onClick={() => createBuild()}>
      <FilePlus2Icon size={18} /> Create System
    </Button>
  )
}

export { CreateBuild }
