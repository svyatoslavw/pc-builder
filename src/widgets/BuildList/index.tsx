"use client"

import { BuildItem } from "../BuildItem"

import { useTypedSelector } from "@/shared/lib/hooks"
import { Card, CardContent } from "@/shared/ui/card"
import { Empty } from "@/shared/ui/empty"

const BuildList = () => {
  const builds = useTypedSelector((state) => state.builds)
  return (
    <Card className="filter border-none shadow-none overflow-y-auto rounded-none w-full p-5">
      <CardContent className="grid grid-cols-custom p-0 gap-5 overflow-y-auto">
        {builds.length ? (
          builds.map((build) => <BuildItem key={build.id} build={build} />)
        ) : (
          <Empty reload={false} text="Create your first system" />
        )}
      </CardContent>
    </Card>
  )
}

export { BuildList }
