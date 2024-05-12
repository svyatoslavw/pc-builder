import { notFound } from "next/navigation"

import { BuildService } from "@/entities/build/api/build.service"
import { SavedBuildItem } from "@/widgets/SavedBuildItem"

type TypeParamProductSlug = {
  id: string
}

interface IPageProductSlug {
  params: TypeParamProductSlug
}

export const dynamic = "force-dynamic"

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
