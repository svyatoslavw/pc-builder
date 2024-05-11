import { BuildService } from "@/entities/build/api/build.service"
import { UserService } from "@/entities/user/api/user.service"
import { DashboardHeader } from "@/widgets/DashboardHeader"
import { SavedBuildItem } from "@/widgets/SavedBuildItem"

export default async function SavedSystems() {
  const user = await UserService.getProfile()
  if (!user.id) return
  const systems = await BuildService.getSystemsByUserId(user.id)

  return (
    <main className="w-full">
      <DashboardHeader />
      <div className="grid grid-cols-3 w-full gap-5 p-5">
        {systems.map((system) => (
          <SavedBuildItem build={system} key={system.id} />
        ))}
      </div>
    </main>
  )
}
