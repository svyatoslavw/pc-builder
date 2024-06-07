import { Metadata } from "next"
import { revalidatePath } from "next/cache"

import { BuildService } from "@/entities/build/api/build.service"
import { UserService } from "@/entities/user/api/user.service"
import { CREATOR, GITHUB_URL, SITE_KEYWORDS, SITE_NAME, SITE_URL } from "@/shared/lib/config/seo.config"
import { Empty } from "@/shared/ui/empty"
import { DashboardHeader } from "@/widgets/DashboardHeader"
import { SavedBuildItem } from "@/widgets/SavedBuildItem"

export const metadata: Metadata = {
  icons: {
    icon: "icon.png",
    shortcut: "icon.png"
  },
  title: {
    absolute: `Saved Systems - ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`
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

export default async function SavedSystems() {
  revalidatePath("/i/saved-systems")
  const user = await UserService.getProfile()
  if (!user.id) return
  const systems = await BuildService.getSystemsByUserId(user.id)

  return (
    <main className="w-full overflow-hidden">
      <DashboardHeader />
      <div className="grid filter 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 overflow-auto w-full gap-5 p-5">
        {systems.length ? (
          systems.map((system) => <SavedBuildItem build={system} key={system.id} />)
        ) : (
          <Empty reload={false} text="Systems not found" />
        )}
      </div>
    </main>
  )
}
