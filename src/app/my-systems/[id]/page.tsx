import { Metadata } from "next"

import { MySystemPage } from "@/_pages/my-systems"
import { BuildService } from "@/entities/build/api/build.service"
import { EnumSortBy } from "@/entities/filter/model/filter.types"
import { UserService } from "@/entities/user/api/user.service"
import { CREATOR, GITHUB_URL, SITE_KEYWORDS, SITE_NAME, SITE_URL } from "@/shared/lib/config/seo.config"
import { EnumCategory } from "@/shared/lib/types"

export type TypeProductDataFilters = {
  component: EnumCategory
  searchTerm?: string
  sortBy?: EnumSortBy
  minPrice?: string
  maxPrice?: string
  genderId?: string
}

export type TypeParamsFilters = {
  searchParams: TypeProductDataFilters
}

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

export default async function MySystem({ searchParams }: TypeParamsFilters) {
  const initialProducts = await BuildService.getAll(searchParams)
  const user = await UserService.getProfile()

  return <MySystemPage initialProducts={initialProducts} user={user} />
}
