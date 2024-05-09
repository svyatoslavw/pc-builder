"use client"

import { FileMinus2Icon } from "lucide-react"
import React from "react"

import { useActions, useTypedSelector } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/select"

const DeleteSystem = () => {
  const { deleteConstructor } = useActions()
  const [item, setItem] = React.useState("")
  const products = useTypedSelector((state) => state.products)

  console.log("@item", item)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2 text-sm">
          <FileMinus2Icon size={18} /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete system</DialogTitle>
          <DialogDescription>Please select the system you want to delete.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select onValueChange={(value) => setItem(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a system" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Systems</SelectLabel>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogClose disabled={!item}>
          <Button disabled={!item} type="submit" onClick={() => deleteConstructor(item)}>
            Delete system
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export { DeleteSystem }
