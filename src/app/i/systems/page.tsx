import { Card } from "@/shared/ui/card"
import { BuildList } from "@/widgets/BuildList"
import { DashboardHeader } from "@/widgets/DashboardHeader"

export default async function Systems() {
  return (
    <main className="w-full">
      <DashboardHeader />
      <Card className="flex flex-col filter border-none rounded-none">
        <BuildList />
      </Card>
    </main>
  )
}
