import { Metadata } from "next"
import { notFound } from "next/navigation"

import { BuildService } from "@/entities/build/api/build.service"
import { CREATOR, GITHUB_URL, SITE_KEYWORDS, SITE_NAME, SITE_URL } from "@/shared/lib/config/seo.config"
import { SavedBuildItem } from "@/widgets/SavedBuildItem"

type TypeParamProductSlug = {
  id: string
}

interface IPageProductSlug {
  params: TypeParamProductSlug
}

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: IPageProductSlug): Promise<Metadata> {
  const product = await BuildService.getSystemById(params.id)

  return {
    title: `${product?.name} - ${SITE_NAME}`,
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
}

export async function generateStaticParams() {
  const data = await BuildService.getAllSystems()
  const paths = data.map((system) => {
    return {
      params: { id: system.id }
    }
  })

  return paths
}

export default async function Systems({ params }: IPageProductSlug) {
  const system = await BuildService.getSystemById(params.id)
  if (!system) return notFound()
  return <SavedBuildItem build={system} />
}
