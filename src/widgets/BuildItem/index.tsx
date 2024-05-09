import type { IBuild } from "@/entities/product/model/product.types"
import { BuildCard } from "@/entities/product/ui/BuildCard"
import RenameSystem from "@/features/RenameSystem"

const BuildItem = ({ build }: { build: IBuild }) => {
  return (
    <BuildCard build={build}>
      <RenameSystem build={build} />
    </BuildCard>
  )
}

export { BuildItem }
