import { CreditCardIcon, Trash2Icon } from "lucide-react"

import { SavedBuildCard } from "@/entities/build/ui/SavedBuildCard"
import { ShareSystem } from "@/features/ShareSystem"
import type { IBuild } from "@/shared/lib/types"
import { Button } from "@/shared/ui/button"

const SavedBuildItem = ({ build }: { build: IBuild }) => {
  return (
    <SavedBuildCard build={build}>
      <div className="flex gap-2">
        <Button size={"sm"} title="Checkout">
          <CreditCardIcon size={18} />
        </Button>
        <ShareSystem build={build} />
        <Button size={"sm"} title="Delete system" variant={"outline"}>
          <Trash2Icon size={18} />
        </Button>
      </div>
    </SavedBuildCard>
  )
}

export { SavedBuildItem }
