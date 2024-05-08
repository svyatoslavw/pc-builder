"use client"

import { Trash2Icon } from "lucide-react"
import toast from "react-hot-toast"

import { useActions } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"

const ResetConctructor = () => {
  const { resetConstructor } = useActions()

  const resetConctructorHandler = () => {
    resetConstructor()
    toast.success("Constructor reset successfully.")
  }

  return (
    <Button
      variant={"outline"}
      onClick={resetConctructorHandler}
      className="flex gap-1 text-gray-500"
    >
      <Trash2Icon />
      Reset Components
    </Button>
  )
}

export { ResetConctructor }
