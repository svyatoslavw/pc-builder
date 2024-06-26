import { CreateBuild } from "@/features/CreateBuild"
import { DeleteBuild } from "@/features/DeleteBuild"
import { Card } from "@/shared/ui/card"
import { BuildList } from "@/widgets/BuildList"
import { DashboardHeader } from "@/widgets/DashboardHeader"

const MySystemsPage = () => {
  return (
    <main className="w-full">
      <DashboardHeader>
        <CreateBuild />
        <DeleteBuild />
      </DashboardHeader>
      <Card className="flex flex-col filter border-none shadow-none rounded-none">
        <BuildList />
      </Card>
    </main>
  )
}

export { MySystemsPage }
