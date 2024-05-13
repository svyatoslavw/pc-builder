import { revalidatePath } from "next/cache"

import { BuildService } from "@/entities/build/api/build.service"
import { UserService } from "@/entities/user/api/user.service"
import { Empty } from "@/shared/ui/empty"
import { DashboardHeader } from "@/widgets/DashboardHeader"
import { SavedBuildItem } from "@/widgets/SavedBuildItem"

export default async function SavedSystems() {
  revalidatePath("/i/saved-systems")
  const user = await UserService.getProfile()
  if (!user.id) return
  const systems = await BuildService.getSystemsByUserId(user.id)

  return (
    <main className="w-full">
      <DashboardHeader />
      <div className="grid grid-cols-3 w-full gap-5 p-5">
        {systems.length ? (
          systems.map((system) => <SavedBuildItem build={system} key={system.id} />)
        ) : (
          <Empty reload={false} text="Systems not found" />
        )}
      </div>
    </main>
  )
}
