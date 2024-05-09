import Image from "next/image"
import { useRouter } from "next/navigation"

import type { IBuild } from "../model/product.types"

import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card"

const BuildCard = ({ build }: { build: IBuild }) => {
  const { push } = useRouter()

  return (
    <Card key={build.id} className="aspect-square">
      <CardHeader className="font-semibold text-neutral-500">{build.name}</CardHeader>
      <CardContent className="flex justify-center cursor-pointer scale-90 hover:scale-100 transition">
        <Image
          onClick={() => push(`/i/systems/${build.id}`)}
          alt={build.id}
          src={build.components.processor?.image_url || "/default-case.png"}
          width={170}
          height={170}
        />
      </CardContent>
      <CardFooter className="py-2 justify-between items-end text-neutral-500">
        <span>Total:</span>
        <span className="text-neutral-800 font-semibold underline">{build.total}$</span>
      </CardFooter>
    </Card>
  )
}

export { BuildCard }
