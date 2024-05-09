"use client"

import { useRouter } from "next/navigation"

import { BuildCard } from "@/entities/product/ui/BuildCard"
import { useActions, useTypedSelector } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"

const BuildList = () => {
  const builds = useTypedSelector((state) => state.products)
  const { createConstructor } = useActions()
  const { push } = useRouter()
  return (
    <Card className="grid grid-cols-6 filter gap-5 border-none rounded-none w-full p-5">
      {builds.map((build) => (
        <BuildCard key={build.id} build={build} />
      ))}
      <Button onClick={() => createConstructor()}>Create new System</Button>
    </Card>
  )
}

export { BuildList }
