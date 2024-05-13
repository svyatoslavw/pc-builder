import { DashboardPage } from "@/_pages/dashboard/DashboardPage"
import { DashboardHeader } from "@/widgets/DashboardHeader"

export default async function Dashboard() {
  return (
    <main className="flex flex-col min-h-screen w-full items-start">
      <DashboardHeader />
      <DashboardPage />
    </main>
  )
}
