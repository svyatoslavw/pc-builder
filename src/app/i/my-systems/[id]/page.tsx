import { Metadata } from "next"

import { MySystemPage } from "@/_pages/my-systems"
import { BuildService } from "@/entities/build/api/build.service"
import { UserService } from "@/entities/user/api/user.service"
import { CREATOR, GITHUB_URL, SITE_KEYWORDS, SITE_NAME, SITE_URL } from "@/shared/lib/config/seo.config"

export const metadata: Metadata = {
  icons: {
    icon: "icon.png",
    shortcut: "icon.png"
  },
  title: {
    absolute: `Builder - ${SITE_NAME}`,
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

export default async function MySystem({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
  const products = await BuildService.getAll(searchParams)
  const user = await UserService.getProfile()

  return <MySystemPage products={products} user={user} />
}
