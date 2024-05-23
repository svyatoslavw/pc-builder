import { Metadata } from "next"

import { AdminPage } from "@/_pages/dashboard/AdminPage"
import { createServerClient } from "@/shared/api/server"
import { CREATOR, GITHUB_URL, SITE_KEYWORDS, SITE_NAME, SITE_URL } from "@/shared/lib/config/seo.config"
import { IOrder } from "@/shared/lib/types"
import { DashboardHeader } from "@/widgets/DashboardHeader"

export const metadata: Metadata = {
  title: {
    absolute: `Admin - ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`
  },
  icons: {
    icon: "icon.png",
    shortcut: "icon.png"
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    emails: `example@${SITE_NAME}`
  },
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  creator: CREATOR,
  authors: {
    name: CREATOR,
    url: GITHUB_URL
  },
  keywords: SITE_KEYWORDS
}

async function getOrders() {
  const supabase = createServerClient()

  const { data: orders, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

  if (error) {
    console.log(error.message)
  }

  return (orders as IOrder[]) || []
}

export default async function Admin() {
  const orders = await getOrders()
  return (
    <main className="flex flex-col min-h-screen w-full items-start">
      <DashboardHeader />
      <AdminPage orders={orders} />
    </main>
  )
}
