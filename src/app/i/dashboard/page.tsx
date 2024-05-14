import { DashboardPage } from "@/_pages/dashboard/DashboardPage"
import { createServerClient } from "@/shared/api/server"
import { IOrder } from "@/shared/lib/types"
import { DashboardHeader } from "@/widgets/DashboardHeader"

async function getOrders() {
  const supabase = createServerClient()

  const { data: orders, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

  if (error) {
    console.log(error.message)
  }

  return (orders as IOrder[]) || []
}

export default async function Dashboard() {
  const orders = await getOrders()
  return (
    <main className="flex flex-col min-h-screen w-full items-start">
      <DashboardHeader />
      <DashboardPage orders={orders} />
    </main>
  )
}
