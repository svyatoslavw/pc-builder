import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

import type { IBuild } from "@/shared/lib/types"
import { Card, CardContent, CardFooter } from "@/shared/ui/card"

interface IBuildCardProps {
  build: IBuild
  children?: React.ReactNode
}

const BuildCard = ({ build, children }: IBuildCardProps) => {
  const { push } = useRouter()

  return (
    <Card key={build.id}>
      {children}
      <CardContent className="flex my-2 justify-center cursor-pointer scale-95 hover:scale-100 h-60 transition">
        <Image
          onClick={() => push(`/i/my-systems/${build.id}`)}
          alt={build.id}
          src={build.components.case?.image_url || "/default-case.png"}
          width={300}
          height={300}
          className="object-contain select-none"
        />
      </CardContent>
      <CardFooter className="py-2 border-t justify-between items-end text-neutral-500">
        <span>Total:</span>
        <span className="text-neutral-800 font-semibold underline">{build.total}$</span>
      </CardFooter>
    </Card>
  )
}

export { BuildCard }
