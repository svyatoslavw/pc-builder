"use client"

import { CheckIcon } from "lucide-react"
import React from "react"

import type { IBuild } from "@/entities/product/model/product.types"
import { useActions } from "@/shared/lib/hooks"
import { useOutside } from "@/shared/lib/hooks/useOutside"
import { Button } from "@/shared/ui/button"
import { CardHeader } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"

const RenameSystem = ({ build }: { build: IBuild }) => {
  const { updateConstructor } = useActions()
  const [value, setValue] = React.useState("")
  const { ref, isActive, setIsActive } = useOutside(false)

  const updateNameHandler = (id: string, name: string) => {
    updateConstructor({ id, name })
    setIsActive(false)
  }
  return (
    <CardHeader ref={ref} className="flex py-3 w-full font-semibold text-neutral-500">
      {!isActive ? (
        <div className="flex truncate h-9 items-center" onClick={() => setIsActive(true)}>
          {build.name}
        </div>
      ) : (
        <form className="flex gap-2 items-center">
          <Input
            autoFocus
            defaultValue={build.name}
            onChange={(e) => setValue(e.target.value)}
            className="p-0 flex m-0 focus-visible:ring-0 text-base bg-transparent border-none shadow-none"
            placeholder="System Name..."
          />
          <Button
            type="submit"
            onClick={() => updateNameHandler(build.id, value)}
            variant={"outline"}
            className="w-7 h-7 p-0 aspect-square"
          >
            <CheckIcon color="blue" size={16} />
          </Button>
        </form>
      )}
    </CardHeader>
  )
}

export default RenameSystem
