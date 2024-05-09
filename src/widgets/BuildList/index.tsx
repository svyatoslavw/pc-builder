"use client"

import { BuildItem } from "../BuildItem"

import { useTypedSelector } from "@/shared/lib/hooks"
import { Card, CardContent } from "@/shared/ui/card"
import { Empty } from "@/shared/ui/empty"

const BuildList = () => {
  const builds = useTypedSelector((state) => state.products)
  return (
    <Card className="filter border-none overflow-y-auto rounded-none w-full p-5">
      <CardContent className="grid grid-cols-custom gap-5 overflow-y-auto">
        {builds ? builds.map((build) => <BuildItem key={build.id} build={build} />) : <Empty />}
      </CardContent>
    </Card>
  )
}

export { BuildList }
