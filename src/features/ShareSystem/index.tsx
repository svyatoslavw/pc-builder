"use client"

import { Label } from "@radix-ui/react-label"
import { Copy, ShareIcon } from "lucide-react"
import toast from "react-hot-toast"

import { createClient } from "@/shared/api/client"
import type { IBuild, IUser } from "@/shared/lib/types"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"

async function getProfile() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    const { data: user, error } = await supabase.from("users").select("*").eq("id", data.user.id).single()

    if (!error) return user as IUser
  }
  return null
}
async function updateSystemVibibility(system: IBuild) {
  const supabase = createClient()
  const user = await getProfile()
  if (!user) return

  const { error } = await supabase
    .from("systems")
    .update({
      is_public: true
    })
    .eq("id", system.id)
    .eq("user_id", user.id)

  if (error) {
    console.log(error.message)
    return error
  }

  return null
}

const ShareSystem = ({ build }: { build: IBuild }) => {
  const link = window.location.origin + "/i/systems/" + build.id

  const shareSystemhandler = async (build: IBuild) => {
    //const error = await updateSystemVibibility(build)

    window.navigator.clipboard.writeText(link)
    toast.success("Link copied!")
    // if (!error) {
    //   window.navigator.clipboard.writeText(link)
    //   toast.success("Link copied!")
    // } else {
    //   console.log(error)
    // }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} title="Share" variant={"outline"}>
          <ShareIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={link} readOnly />
          </div>
          <Button onClick={() => shareSystemhandler(build)} type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ShareSystem }
