import { LoaderIcon } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <LoaderIcon className="animate-spin" />
    </div>
  )
}
