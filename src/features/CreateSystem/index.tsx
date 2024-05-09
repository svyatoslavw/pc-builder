"use client"

import { FilePlus2Icon } from "lucide-react"

import { useActions } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"

const CreateSystem = () => {
  const { createConstructor } = useActions()

  return (
    <Button variant={"outline"} className="gap-2 text-sm" onClick={() => createConstructor()}>
      <FilePlus2Icon size={18} /> Create
    </Button>
  )
}

export { CreateSystem }
