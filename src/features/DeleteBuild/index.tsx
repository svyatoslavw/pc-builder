"use client"

import { FileMinus2Icon } from "lucide-react"
import React from "react"
import toast from "react-hot-toast"

import { useActions, useTypedSelector } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/select"

const DeleteBuild = () => {
  const { deleteBuild } = useActions()
  const [item, setItem] = React.useState("")
  const builds = useTypedSelector((state) => state.builds)

  const deleteBuildHandler = (item: string) => {
    deleteBuild(item)
    toast.success("System deleted!")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2 text-sm">
          <FileMinus2Icon size={18} /> Delete System
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
                {builds.map((build) => (
                  <SelectItem key={build.id} value={build.id}>
                    {build.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogClose disabled={!item}>
          <Button disabled={!item} type="submit" onClick={() => deleteBuildHandler(item)}>
            Delete system
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export { DeleteBuild }
