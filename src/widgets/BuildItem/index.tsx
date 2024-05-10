import { BuildCard } from "@/entities/build/ui/BuildCard"
import { RenameBuild } from "@/features/RenameBuild"
import type { IBuild } from "@/shared/lib/types"

const BuildItem = ({ build }: { build: IBuild }) => {
  return (
    <BuildCard build={build}>
      <RenameBuild build={build} />
    </BuildCard>
  )
}

export { BuildItem }
